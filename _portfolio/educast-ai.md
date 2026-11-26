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

EduCast AI turns a log of lab submissions into one pass probability per student, using three gradient-boosting models blended into a single prediction. The whole pipeline is one script, `main.py`, and its metric is AUPRC because the README describes the pass/fail labels as imbalanced.

## Problem

The input is a table of lab reports (about 25,000 rows in `lab_reports_train.csv`) with start and completion times, grades and lab types. Only 893 students have a pass label in `results_train.csv`, and the task is to score the 383 students in the test file. With so few labelled rows, a single model's validation score would be noisy.

## What was built

- `feature_engineering()` computes per-submission signals (duration, hour, weekday, night and weekend flags, rolling grade mean and std, grade change, gap since the previous submission) and aggregates them to one row per student.
- The student-level features include grade trend (a fitted slope), momentum (mean of the last three grades minus the first three), longest improvement and decline streaks, and average grade and count per lab type.
- `training()` fits LightGBM, XGBoost and CatBoost, all at depth 4, under stratified 7-fold cross-validation, with early stopping on the validation fold and a different seed for each fold.
- Predictions are blended twice: fixed weights of 0.35, 0.35 and 0.30, and a logistic-regression meta-learner (C=0.1) trained on the out-of-fold predictions. The final score is the average of the two.

## Results

`main.py` runs end to end: it trains the three models with stratified 7-fold cross-validation, prints the AUPRC of each fold and the out-of-fold AUPRC, and writes `submission.csv` with 383 predictions.

## Limits and next steps

The next steps in the README are an LSTM over the sequence of submissions, feature selection, and real-time prediction.
