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

<!--lang:vi-->

Bộ lập kế hoạch của xe tự lái phải chọn hành động (bám xe trước, dừng, nhường đường, chuyển làn hay vượt), rồi tìm một đường đi an toàn đủ nhanh để chạy thời gian thực. Nhiễu cảm biến, mưa, sương mù và mặt đường trơn khiến rủi ro khó đoán chắc. Mô hình chỉ học từ dữ liệu thì không bảo đảm được an toàn, còn chỉ dùng luật thì không thích nghi được. NeuroDrive-K kết hợp cả hai.

## Cách hoạt động

- Đặc trưng vật lý như thời gian đến va chạm, mức khẩn cấp khi phanh và mức nguy hiểm theo động năng.
- Naive Bayes, Random Forest và XGBoost dự đoán một trong năm hành vi. Decision Tree và XGBoost dự đoán điểm rủi ro.
- Một bước cập nhật Bayes gộp rủi ro nền (tính từ thời tiết, mặt đường và tầm nhìn) với điểm rủi ro của mô hình.
- Luật an toàn dạng IF-THEN, ví dụ dừng xe khi thời gian đến va chạm xuống dưới ngưỡng tới hạn.
- Lưới chi phí 120×80 và bộ lập đường đi A* có phương án dự phòng (fallback). Mọi vi phạm luật đều có chi phí vô cùng.

## Kết quả

Dữ liệu là một bộ dữ liệu lái xe mô phỏng. Trên bộ này, XGBoost dẫn đầu cả về độ chính xác khi dự đoán hành vi lẫn R² khi hồi quy rủi ro. Trong ba kịch bản của báo cáo, tìm kiếm A* chạy mất 33,4 ms (đô thị), 29,7 ms (cao tốc) và 24,2 ms (sương mù).

## Phần việc của mình

Mình làm trưởng nhóm bốn người. Mình thiết kế kiến trúc lai, viết mô-đun lập đường đi cùng heuristic và phương án dự phòng cho A*, rồi huấn luyện và tinh chỉnh các mô hình học máy. Ba bạn còn lại lo tiền xử lý, trực quan hoá, bản đồ chi phí, luật an toàn cứng và mềm, và bộ lọc Bayes.

Tỷ lệ va chạm trong mô phỏng còn cao: 35,3% khi thời tiết bình thường và 39,9% khi có sương mù. Bộ lập kế hoạch nhận một vector đặc trưng tính sẵn, nên nó chưa bao giờ thấy dữ liệu cảm biến thô. Báo cáo đề ra hai bước tiếp theo là học tăng cường sâu và hợp nhất cảm biến (sensor fusion).

<!--lang:ja-->

自動運転車のプランナーは、どう動くか（追従、停止、譲る、車線変更、追い越し）を決めたうえで、安全な経路をリアルタイムに間に合う速さで見つけなければなりません。センサーのノイズ、雨、霧、滑りやすい路面があると、リスクを確実には見積もれません。学習だけのモデルでは安全を保証できず、ルールだけでは状況に適応できません。NeuroDrive-Kはこの2つを組み合わせています。

## 仕組み

- 衝突までの時間、ブレーキの緊急度、運動エネルギーに基づく危険度などの物理的な特徴量。
- Naive Bayes、Random Forest、XGBoostが5種類の行動から1つを予測します。Decision TreeとXGBoostはリスクスコアを予測します。
- ベイズ更新で、天候・路面・視界から求めたベースリスクとモデルのリスクスコアを統合します。
- IF-THEN形式の安全ルール。たとえば、衝突までの時間が臨界値を下回ったら停止します。
- 120×80のコストグリッドと、フォールバック付きのA*プランナー。ルール違反のコストは無限大です。

## 結果

データはシミュレーションで作った走行データセットです。このデータでは、行動予測の精度でもリスク回帰のR²でもXGBoostが最も高い値でした。レポートの3つのシナリオでは、A*探索にかかった時間は33.4 ms（市街地）、29.7 ms（高速道路）、24.2 ms（霧）でした。

## 担当したこと

4人チームのリーダーを務めました。ハイブリッドアーキテクチャを設計し、ヒューリスティックとA*のフォールバックを含む経路計画モジュールを作り、機械学習モデルの学習とチューニングを行いました。残りの3人は、前処理、可視化、コストマップ、ハード・ソフトの安全ルール、ベイズフィルタを担当しました。

シミュレーションでの衝突率は高く、通常の天候で35.3%、霧では39.9%でした。プランナーは用意済みの特徴ベクトルを受け取るだけなので、生のセンサーデータは一度も扱っていません。レポートでは、次のステップとして深層強化学習とセンサーフュージョンを挙げています。
