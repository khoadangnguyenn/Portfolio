---
title: "EduCast AI"
tagline: "A gradient-boosting ensemble that predicts the probability a student passes, from lab-report submission logs."
collection: portfolio
when: "Mar 2026"
start: "2026-03"
end: "2026-03"
stack: [Python, LightGBM, XGBoost, CatBoost, scikit-learn, pandas]
code: "https://github.com/khoadangnguyenn/EduCast-AI"
card_summary: "Predicts student pass probability from lab-report logs with LightGBM, XGBoost and CatBoost, stacked and scored by AUPRC."
permalink: /portfolio/educast-ai/
---

EduCast AI turns a log of lab submissions into one pass probability per student. Three gradient-boosting models are blended into one prediction, all in a single script. The metric is AUPRC, since the README calls the pass/fail labels imbalanced.

The input is about 25,000 lab reports with start and completion times, grades and lab types. Only 893 students have a pass label, and the task is to score the 383 students in the test set. With so few labels, one model's validation score would be noisy.

## How it works

Each submission gets signals such as duration, time of day, weekend flags and rolling grade statistics. These roll up to one row per student. That row adds a grade trend (a fitted slope), momentum (the last three grades against the first three) and the longest improvement and decline streaks. It also holds the average grade and count per lab type.

LightGBM, XGBoost and CatBoost, all at depth 4, train under stratified 7-fold cross-validation. Each fold has early stopping and its own seed.

The models are blended twice, once with fixed weights of 0.35, 0.35 and 0.30 and once with a logistic-regression meta-learner (C=0.1) trained on the out-of-fold predictions. The final score averages the two.

## Results

The script runs end to end, prints the AUPRC of each fold and the out-of-fold AUPRC, and writes 383 predictions.

Next steps: an LSTM over the submission sequence, feature selection and real-time prediction.
