---
title: "D-LAPA feature analysis"
tagline: "A rerun of the feature analysis for the D-LAPA depth-injection paper: does adding depth features help a probe on LIBERO-10 frames?"
collection: portfolio
when: "Jun 2026"
start: "2026-06"
end: "2026-06"
context: "Analysis for the D-LAPA depth-injection paper"
stack: [Python, PyTorch, scikit-learn, UMAP, SciPy]
code: "https://github.com/khoadangnguyenn/D-LAPA-Feature-Analysis"
links:
  - {label: "Analysis report (PDF)", url: "https://github.com/khoadangnguyenn/D-LAPA-Feature-Analysis/blob/main/pdf/feature_analysis_redone.pdf"}
results:
  - "Ridge probe R² 0.454 for RGB alone, 0.520 for RGB plus the Model 2 or Model 6.1 depth features (+0.066)."
teaser: /images/work/d-lapa-feature-analysis/teaser.png
teaser_alt: "Bar chart of held-out Ridge R² for RGB alone and RGB combined with ground-truth depth and each model variant"
teaser_caption: "Held-out Ridge R² on LIBERO-10; the y-axis starts at 0.40."
card_summary: "Redone feature analysis for D-LAPA depth injection: Ridge probes, depth alignment and UMAP smoothness on 138,090 LIBERO-10 frame pairs."
card_result: "RGB R² 0.454 to 0.520 with depth features"
permalink: /portfolio/d-lapa-feature-analysis/
---
This is a rerun of the feature analysis behind the D-LAPA paper. It asks whether adding depth features helps a probe on LIBERO-10 frames. The earlier appendix used a finetuned-LAPA reference. The cache provided for the rerun matched the pre-VQ LAPA-LAQ scale, so the analysis was redone and its claims rewritten.

The script streams 138,090 consecutive frame pairs, split by video into 400 for training and 100 for testing, with seed 42. It runs four checks:

- Ridge probes that predict translation magnitude from RGB, from depth, and from RGB plus each of seven model variants.
- Alignment of each model's depth feature to the ground-truth one, by MSE and cosine.
- Token and sequence accuracy of the predicted depth indices.
- UMAP of 3,000 held-out pairs, scored with Moran's I.

## Results

RGB alone reaches R² 0.454. Adding Model 2 or Model 6.1 features raises it to 0.520, while ground-truth depth gives only 0.478. Model 3, an RGB-only control, gains just 0.003, so extra capacity alone does not explain the lift.

Alignment points the other way. Only Model 7.1 tracks the teacher depth feature (cosine 0.806, MSE 0.025). Models 2 and 6.1 have cosine near zero (0.023 and -0.003) yet give the largest gain. Model 4 has the smoothest UMAP (Moran's I 0.472) but a probe R² of only 0.481.

The report calls the gain modest and asks for a downstream policy evaluation. All results come from one split with one seed.
