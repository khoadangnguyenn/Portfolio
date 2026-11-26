"""Portrait -> square avatar + point cloud file for assets/js/face-cloud.js.
Depth: Depth Anything V2 Small (local Hugging Face cache), relative depth only.
Same point convention as khoa-portfolio/tools/face_cloud.py: X, Y in image-width units centred on the crop,
Z = 0.32 * normalised disparity of the person; person/background split by Otsu's threshold on disparity.
Output .bin: uint32 N, int16 xyz[N*3] (value * 20000), uint8 rgb[N*3].
Usage: python face_cloud_bin.py <photo> <cx> <cy> <side> <avatar_out.jpg> <cloud_out.bin> <debug_dir>
"""
import os, sys
os.environ["HF_HUB_OFFLINE"] = "1"
import numpy as np
from PIL import Image
import torch
from transformers import pipeline

src, cx, cy, side, av_out, bin_out, dbg = sys.argv[1], *map(int, sys.argv[2:5]), *sys.argv[5:8]
os.makedirs(dbg, exist_ok=True)
img = Image.open(src).convert("RGB")
img = img.crop((cx - side // 2, cy - side // 2, cx + side // 2, cy + side // 2))
img.resize((480, 480), Image.LANCZOS).save(av_out, quality=86, optimize=True, progressive=True)
img = img.resize((560, 560), Image.LANCZOS)

pipe = pipeline("depth-estimation", model="depth-anything/Depth-Anything-V2-Small-hf",
                device="mps" if torch.backends.mps.is_available() else "cpu")
pred = pipe(img)["predicted_depth"]
disp = torch.nn.functional.interpolate(pred.reshape(1, 1, *pred.shape[-2:]).float(), size=img.size[::-1], mode="bicubic")[0, 0].cpu().numpy()
disp = (disp - disp.min()) / (disp.max() - disp.min())
Image.fromarray((disp * 255).astype(np.uint8)).save(f"{dbg}/disp.png")

hist, edges = np.histogram(disp, 128)
best, thr = -1, 0.5
for i in range(1, 128):
    w0, w1 = hist[:i].sum(), hist[i:].sum()
    if w0 == 0 or w1 == 0: continue
    m0 = (hist[:i] * edges[:i]).sum() / w0; m1 = (hist[i:] * edges[i:-1]).sum() / w1
    v = w0 * w1 * (m0 - m1) ** 2
    if v > best: best, thr = v, edges[i]
mask = disp > thr
Image.fromarray((mask * 255).astype(np.uint8)).save(f"{dbg}/mask.png")

rgb = np.asarray(img)
H, W = disp.shape
ys, xs = np.nonzero(mask)
rng = np.random.default_rng(0)
n = min(20000, ys.size)
pick = rng.choice(ys.size, n, replace=False)
ys, xs = ys[pick], xs[pick]
dn = np.clip((disp[ys, xs] - thr) / (1 - thr), 0, 1)
X = (xs + rng.random(n) - W / 2) / W
Y = -(ys + rng.random(n) - H / 2) / W
Z = 0.32 * dn
q = np.round(np.stack([X, Y, Z], 1) * 20000).astype("<i2")
with open(bin_out, "wb") as f:
    f.write(np.array([n], "<u4").tobytes()); f.write(q.tobytes()); f.write(rgb[ys, xs].astype(np.uint8).tobytes())
print("points", n, "of", int(mask.sum()), "threshold", round(float(thr), 3))
