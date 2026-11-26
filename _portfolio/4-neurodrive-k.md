---
title: "NeuroDrive-K"
tagline: "A modular path planner for autonomous driving that predicts behaviour, scores risk, applies safety rules and plans with A*."
collection: portfolio
when: "Jan – May 2026"
start: "2026-01"
end: "2026-05"
role: "Team lead, 4 people"
context: "Course project, Introduction to AI, HCMUT"
stack: [Python, XGBoost, scikit-learn, SHAP, A*, Bayesian inference]
code: "https://github.com/khoadangnguyenn/NeuroDrive-K"
links:
  - {label: "Report (PDF, Vietnamese)", url: "https://github.com/khoadangnguyenn/NeuroDrive-K/blob/main/reports/A%20Path%20Planning%20Modular%20Framework%20for%20Autonomous%20Driving%20Systems.pdf"}
results:
  - "XGBoost reaches 78.1% accuracy on five-class traffic-behaviour prediction (Random Forest 76.0%, Naive Bayes 67.9%)."
  - "XGBoost risk regression reaches R² 0.9946 and MAE 0.0078 (Decision Tree R² 0.9549)."
  - "A* search takes 24–33 ms per scenario; it found a valid path in 90% of urban runs and 100% of highway and fog runs."
teaser: /images/work/neurodrive-k/teaser.png
teaser_alt: "Grid map of an overtake scenario: the ego vehicle steers around an obstacle to a goal along a cyan path"
teaser_caption: "Scenario 14 from the simulator: the planner overtakes an obstacle (risk score 0.63)."
card_summary: "A hybrid driving planner: XGBoost behaviour and risk prediction, a Bayesian risk update, safety rules and A* search on a 120×80 cost grid."
card_result: "78.1% behaviour accuracy, R² 0.9946, A* under 35 ms"
permalink: /portfolio/neurodrive-k/
---

## Problem

A planner must decide what the car should do (follow, stop, yield, change lane or overtake) and then find a safe path fast enough for real time. Sensor noise, rain, fog and slippery roads make the risk uncertain. A pure learned model gives no safety guarantee, and rules alone do not adapt.

## What we built

- Physics features (`modules/feature_engineering.py`) such as time to collision, braking urgency and kinetic danger.
- Behaviour and risk models (`modules/perception_ml.py`): Naive Bayes, Random Forest and XGBoost for the five behaviours; Decision Tree and XGBoost for the risk score. The code keeps XGBoost when it beats the other model.
- A Bayesian update (`modules/bayes.py`): a base risk from weather, road surface and visibility is combined with the ML risk score as an odds update.
- IF-THEN safety rules (`modules/rule_based.py`), for example stop when time to collision is below a critical value.
- A 120×80 cost grid (`modules/knowledge_base.py`) and an A* planner with a fallback (`modules/path_planner.py`). Rule violations get infinite cost.

## Results

The data is a simulated driving dataset. On it, XGBoost leads behaviour prediction in accuracy and risk regression in R². In the report's three scenarios, A* search ran in 33.4 ms (urban), 29.7 ms (highway) and 24.2 ms (fog). The CV's "sub-35 ms" figure is this search time.

## My part

I led the team of four. Per the report's task table, I designed the hybrid architecture, built the path-planning module with its heuristic and A* fallback, and trained and tuned the ML models. The other three members covered preprocessing, visualisation, the cost map, the hard and soft safety rules, and the Bayesian filter.

## Limits and next steps

The simulated collision rate is high: 35.3% in normal weather and 39.9% in fog. The planner takes a ready-made feature vector, so it never touches raw sensor data. The report lists deep reinforcement learning and sensor fusion as next steps.
