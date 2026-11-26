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
teaser_caption: "Held-out Ridge R² on LIBERO-10; the y-axis starts at 0.40, not at zero."
card_summary: "Redone feature analysis for D-LAPA depth injection: Ridge probes, depth alignment and UMAP smoothness on 138,090 LIBERO-10 frame pairs."
card_result: "RGB R² 0.454 to 0.520 with depth features"
permalink: /portfolio/d-lapa-feature-analysis/
---

## Problem

The earlier appendix compared depth features against a finetuned-LAPA RGB reference. The feature cache provided for the rerun matched the pre-VQ LAPA-LAQ scale instead, so the analysis had to be redone on that cache and its claims rewritten.

## What it does

`feature_analysis/redo_feature_analysis.py` streams 138,090 consecutive LIBERO-10 frame pairs and splits them by video: 400 train videos (111,284 pairs) and 100 test videos (26,806 pairs), seed 42. It then runs four checks:

- Ridge probes (alpha 1000) that predict the xyz translation magnitude from RGB (4096-d), ground-truth depth (1024-d) and RGB plus each of seven model variants, Model 1 to Model 7.1.
- Alignment of each model's depth feature to the ground-truth depth feature, by MSE and cosine.
- Token and sequence accuracy of the predicted depth indices.
- UMAP of 3,000 held-out pairs, scored with Moran's I.

## Results

RGB alone reaches R² 0.454. Adding Model 2 or Model 6.1 features raises it to 0.520, while adding the ground-truth depth gives only 0.478. Model 3, an RGB-only control, gains just 0.003, so extra capacity alone does not explain the lift.

Alignment tells a different story. Only Model 7.1 tracks the teacher depth feature (cosine 0.806, MSE 0.025). Models 2 and 6.1 have cosine near zero (0.023 and -0.003) yet give the largest probe gain. Model 4 has the smoothest UMAP (Moran's I 0.472) but a probe R² of only 0.481.

## Limits and next steps

The report calls the gain modest decodability, not a policy-success claim, and says it should be paired with downstream policy evaluation. The cache reflects the pre-finetune representation, so this does not reproduce the old finetuned-LAPA baseline. The results come from one split with one seed.
