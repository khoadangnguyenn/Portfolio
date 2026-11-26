"""Generate assets/css/palettes.css and check WCAG contrast of every text/background pair.
Each palette: (name, label, source, light tokens, optional dark tokens). Values marked * in `derived`
were computed (darker/lighter shade of a sampled colour), not taken from the source."""
import sys
P = [
 ("bilinear", "Bilinear cobalt", "Portfolio-Business design/tokens.json (your project, b2-luoi)",
  dict(scene="#0f1526", scene2="#172036", sline="#2b3550", sink="#e6eaf2", smuted="#a3adbf", saccent="#8fb0ff",
       bg="#ffffff", alt="#f3f5f8", ink="#172036", muted="#556074", rule="#d3d9e3", kicker="#1d4ed8", link="#1d4ed8"), []),
 ("cobalt", "Cobalt render", "Portfolio-Business a-cobalt-render/style.css (your project)",
  dict(scene="#06070a", scene2="#14161c", sline="#2a2d36", sink="#f3f4f6", smuted="#a3a8b4", saccent="#8fb0ff",
       bg="#ffffff", alt="#f3f4f6", ink="#06070a", muted="#5b6170", rule="#e1e2e7", kicker="#1d4ed8", link="#1d4ed8"), ["scene2", "sline", "smuted"]),
 ("github", "GitHub dark", "Current mock (GitHub Primer dark canvas #0d1117, accent #58a6ff, from memory)",
  dict(scene="#0d1117", scene2="#161b22", sline="#30363d", sink="#e6edf3", smuted="#9aa4af", saccent="#58a6ff",
       bg="#ffffff", alt="#faf7f2", ink="#1d1d1f", muted="#555a60", rule="#e7e3dc", kicker="#a0522d", link="#1f5fbf"), []),
 ("crimson", "Crimson", "alexestern.com, Best Portfolio 2023: red #951616 sampled from screenshot",
  dict(scene="#951616", scene2="#7c1111", sline="#b03a3a", sink="#ffffff", smuted="#f3d6d3", saccent="#ffd7a8",
       bg="#ffffff", alt="#f8f3f1", ink="#1a1414", muted="#5e5252", rule="#eadfdc", kicker="#951616", link="#951616"), ["scene2", "sline", "smuted", "saccent", "alt"]),
 ("harbour", "Maroon & teal", "robertavaltorta.research.st, Overall Best 2025: #841a20, #033341, #da6e65 sampled",
  dict(scene="#033341", scene2="#0a4252", sline="#1d5869", sink="#f1f5f6", smuted="#a9c1c7", saccent="#f08a80",
       bg="#ffffff", alt="#f7f1ef", ink="#14262b", muted="#52646a", rule="#e5dcd9", kicker="#841a20", link="#841a20"), ["scene2", "sline", "smuted", "saccent", "alt"]),
 ("ocean", "Ocean lab", "sinclairlab-rice.com, Best Lab 2025: #2a4e6d, #457fb0, #e9f4ff sampled",
  dict(scene="#2a4e6d", scene2="#335a7b", sline="#4a7194", sink="#ffffff", smuted="#cfe0ef", saccent="#bfe0ff",
       bg="#ffffff", alt="#e9f4ff", ink="#13293b", muted="#4b5f70", rule="#d5e3ef", kicker="#2f6a9c", link="#2a4e6d"), ["scene2", "sline", "smuted", "saccent", "kicker"]),
 ("navy", "Navy & amber", "meredithschmehl.com, Overall Best 2022: #253551, #6b3d0e sampled",
  dict(scene="#253551", scene2="#2e4062", sline="#43577c", sink="#f4f1ea", smuted="#b9c2d3", saccent="#f2b766",
       bg="#ffffff", alt="#f6f1e8", ink="#1b2333", muted="#545c6b", rule="#e6dfd2", kicker="#6b3d0e", link="#253551"), ["scene2", "sline", "smuted", "saccent", "alt"]),
 ("walnut", "Walnut", "jdillenburger.org, Overall Best 2023: wood brown #503724 sampled",
  dict(scene="#2b1d14", scene2="#3a281c", sline="#503724", sink="#f5ede3", smuted="#cdb9a5", saccent="#e8b97a",
       bg="#ffffff", alt="#f6f0e8", ink="#24190f", muted="#62564b", rule="#e7ddd0", kicker="#8a5a32", link="#7a4a22"), ["scene", "scene2", "smuted", "saccent", "kicker", "link", "alt"]),
 ("sunny", "Sunny paper", "cecibaldoni.github.io, Best Interactive 2025: #fbf4ec, #e2a96c, #f8ca5d sampled (light scene)",
  dict(scene="#fbf4ec", scene2="#ffffff", sline="#ead9c3", sink="#2d2620", smuted="#6b5d50", saccent="#9a5b12",
       bg="#ffffff", alt="#fbf4ec", ink="#2d2620", muted="#6b5d50", rule="#eee2d2", kicker="#9a5b12", link="#9a5b12"),
  ["scene2", "sline", "sink", "smuted", "saccent"]),
 ("tangerine", "Tangerine", "kantwon.com, Best Storytelling 2023: orange #e36414 sampled (on a dark scene)",
  dict(scene="#1c1714", scene2="#29211c", sline="#40342c", sink="#fbf3ec", smuted="#c4b5a9", saccent="#ff8a3d",
       bg="#ffffff", alt="#fdf3ec", ink="#1c1714", muted="#5f544c", rule="#efe1d6", kicker="#b44a08", link="#b44a08"), ["scene", "scene2", "sline", "smuted", "saccent", "kicker", "link"]),
]
# User's pick 2026-11-22: light mode from "Sunny paper", dark mode from "Cobalt render".
P.insert(0, ("sunny-cobalt", "Sunny paper + Cobalt render (chosen)", "light = sunny (Baldoni sample), dark = cobalt render (Bilinear project)",
  dict(P[[x[0] for x in P].index("sunny")][3]), ["see sunny and cobalt"]))
DARK_OVERRIDE = {"sunny-cobalt": dict(scene="#06070a", scene2="#14161c", sline="#2a2d36", sink="#f3f4f6", smuted="#a3a8b4", saccent="#8fb0ff"),
"sunny": dict(scene="#1f1a15", scene2="#2a231c", sline="#3d3329", sink="#f6eee4", smuted="#c2b4a5", saccent="#f8ca5d")}

def lum(h):
    c = [int(h[i:i+2], 16) / 255 for i in (1, 3, 5)]
    c = [x / 12.92 if x <= 0.03928 else ((x + 0.055) / 1.055) ** 2.4 for x in c]
    return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2]
def cr(a, b):
    la, lb = sorted([lum(a), lum(b)], reverse=True); return (la + 0.05) / (lb + 0.05)

bad = 0
for name, label, src, t, _ in P:
    pairs = [("sink", "scene"), ("smuted", "scene"), ("saccent", "scene2"), ("smuted", "scene2"), ("ink", "bg"), ("muted", "alt"),
             ("kicker", "alt"), ("link", "bg"), ("link", "alt")]
    for a, b in pairs:
        r = cr(t[a], t[b])
        if r < 4.5: bad += 1; print(f"LOW {name}: {a} on {b} = {r:.2f}")
print("pairs below 4.5:1 =", bad)

css = ["/* Generated by tools/make_palettes.py - edit there. Pick one with `palette:` in _config.yml. */"]
for name, label, src, t, derived in P:
    css.append(f"/* {label}: {src}. Derived shades (not in source): {', '.join(derived) or 'none'} */")
    sel = ':root' if name == 'bilinear' else ''
    css.append(f"{sel + ', ' if sel else ''}html[data-palette=\"{name}\"] {{")
    css.append("  " + " ".join(f"--st-{k}: {v};" for k, v in [("scene", t['scene']), ("scene-2", t['scene2']), ("scene-line", t['sline']), ("scene-ink", t['sink']),
        ("scene-muted", t['smuted']), ("scene-accent", t['saccent']), ("bg", t['bg']), ("bg-alt", t['alt']), ("ink", t['ink']), ("muted", t['muted']),
        ("line", t['rule']), ("kicker", t['kicker']), ("link", t['link'])]))
    css.append("}")
    d = dict(t); d.update(DARK_OVERRIDE.get(name, {}))
    css.append(f"html[data-theme=\"dark\"][data-palette=\"{name}\"]{', html[data-theme=\"dark\"]:not([data-palette])' if name=='bilinear' else ''} {{")
    css.append("  " + " ".join(f"--st-{k}: {v};" for k, v in [("scene", d['scene']), ("scene-2", d['scene2']), ("scene-line", d['sline']), ("scene-ink", d['sink']),
        ("scene-muted", d['smuted']), ("scene-accent", d['saccent']), ("bg", d['scene']), ("bg-alt", d['scene2']), ("ink", d['sink']),
        ("muted", d['smuted']), ("line", d['sline']), ("kicker", d['saccent']), ("link", d['saccent'])]))
    css.append("}")
open(sys.argv[1], "w").write("\n".join(css) + "\n")
import json; open(sys.argv[2], "w").write(json.dumps([[n, l] for n, l, *_ in P]))
