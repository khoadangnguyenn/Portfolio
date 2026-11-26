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
  - "A* search takes 24–33 ms per scenario. It found a valid path in 90% of urban runs and 100% of highway and fog runs."
teaser: /images/work/neurodrive-k/teaser.png
teaser_alt: "Grid map of an overtake scenario: the ego vehicle steers around an obstacle to a goal along a cyan path"
teaser_caption: "Scenario 14 from the simulator: the planner overtakes an obstacle (risk score 0.63)."
card_summary: "A hybrid driving planner: XGBoost behaviour and risk prediction, a Bayesian risk update, safety rules and A* search on a 120×80 cost grid."
card_result: "78.1% behaviour accuracy, R² 0.9946, A* under 35 ms"
permalink: /portfolio/neurodrive-k/
---
A planner for a self-driving car has to decide what to do (follow, stop, yield, change lane or overtake) and then find a safe path fast enough for real time. Sensor noise, rain, fog and slippery roads make the risk uncertain. A purely learned model gives no safety guarantee, and rules alone do not adapt. NeuroDrive-K combines the two.

## How it works

- Physics features such as time to collision, braking urgency and kinetic danger.
- Naive Bayes, Random Forest and XGBoost predict one of five behaviours. Decision Tree and XGBoost predict a risk score.
- A Bayesian update combines a base risk from weather, road surface and visibility with the model's risk score.
- IF-THEN safety rules, for example stop when time to collision falls below a critical value.
- A 120×80 cost grid and an A* planner with a fallback. Any rule violation costs infinity.

## Results

The data is a simulated driving dataset. On it, XGBoost leads behaviour prediction in accuracy and risk regression in R². In the report's three scenarios, A* search ran in 33.4 ms (urban), 29.7 ms (highway) and 24.2 ms (fog).

## My part

I led the team of four. I designed the hybrid architecture, built the path-planning module with its heuristic and A* fallback, and trained and tuned the ML models. The other three members covered preprocessing, visualisation, the cost map, the hard and soft safety rules, and the Bayesian filter.

The simulated collision rate is high, at 35.3% in normal weather and 39.9% in fog. The planner takes a ready-made feature vector, so it never sees raw sensor data. The report lists deep reinforcement learning and sensor fusion as next steps.
