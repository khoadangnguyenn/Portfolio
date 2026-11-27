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

<!--lang:vi-->

EduCast AI đọc nhật ký nộp bài thí nghiệm rồi tính cho mỗi sinh viên một xác suất qua môn. Toàn bộ nằm trong một script, trộn ba mô hình gradient boosting thành một dự đoán duy nhất. Thước đo là AUPRC, vì README ghi rằng nhãn qua/không qua môn bị mất cân bằng.

Đầu vào là khoảng 25.000 báo cáo thí nghiệm, kèm thời điểm bắt đầu, thời điểm hoàn thành, điểm và loại bài thí nghiệm. Chỉ 893 sinh viên có nhãn qua môn, còn đề bài yêu cầu chấm điểm 383 sinh viên trong tập test. Nhãn ít như vậy thì điểm validation của một mô hình đơn lẻ sẽ nhiễu.

## Cách hoạt động

Từ mỗi lần nộp bài, script rút ra các tín hiệu như thời lượng làm bài, giờ trong ngày, cờ cuối tuần và các thống kê điểm theo cửa sổ trượt. Các tín hiệu này gộp lại thành một dòng cho mỗi sinh viên. Dòng đó có thêm xu hướng điểm (độ dốc của đường khớp với chuỗi điểm), đà tiến bộ (ba điểm gần nhất so với ba điểm đầu tiên), cùng chuỗi tăng điểm và chuỗi giảm điểm dài nhất. Nó cũng chứa điểm trung bình và số bài theo từng loại bài thí nghiệm.

LightGBM, XGBoost và CatBoost, cả ba đều độ sâu 4, huấn luyện theo kiểm định chéo 7 phần phân tầng. Mỗi fold có early stopping và seed riêng.

Ba mô hình được trộn theo hai cách. Cách thứ nhất dùng trọng số cố định 0,35, 0,35 và 0,30. Cách thứ hai dùng một meta-learner hồi quy logistic (C=0.1) huấn luyện trên các dự đoán out-of-fold. Điểm cuối cùng là trung bình của hai cách.

## Kết quả

Script chạy trọn từ đầu đến cuối, in AUPRC của từng fold và AUPRC out-of-fold, rồi ghi ra 383 dự đoán.

Những việc định làm tiếp là dựng một LSTM trên chuỗi các lần nộp bài, chọn lọc đặc trưng, và dự đoán theo thời gian thực.

<!--lang:ja-->

EduCast AIは、実験レポートの提出ログから、学生一人ひとりの合格確率を出すモデルです。3つの勾配ブースティングモデルをブレンドして1つの予測にまとめており、処理はすべて1本のスクリプトに収まっています。READMEで合否ラベルが不均衡だとされているため、評価指標にはAUPRCを使います。

入力は約25,000件の実験レポートで、開始時刻と完了時刻、成績、実験の種類が含まれます。合否ラベルが付いているのは893人だけで、テストセットの383人をスコアリングするのが課題です。ラベルがこれだけ少ないと、モデル1つの検証スコアはぶれやすくなります。

## 仕組み

提出ごとに、所要時間、時間帯、週末フラグ、成績のローリング統計といったシグナルを作ります。これらを学生ごとに1行へ集約し、成績のトレンド（回帰で求めた傾き）、勢い（直近3回と最初の3回の成績の比較）、成績が上がり続けた最長回数と下がり続けた最長回数を加えます。実験の種類ごとの平均成績と提出数も、この行に持たせます。

LightGBM、XGBoost、CatBoostはいずれも深さ4で、層化7分割交差検証で学習します。各foldでアーリーストッピングを使い、シードもfoldごとに変えています。

ブレンドは2通り行います。1つは0.35、0.35、0.30の固定重み、もう1つはout-of-fold予測で学習したロジスティック回帰のメタ学習器（C=0.1）です。最終スコアは、この2つの平均です。

## 結果

スクリプトは最初から最後まで通して動き、各foldのAUPRCとout-of-foldのAUPRCを出力したうえで、383件の予測を書き出します。

今後は、提出の系列を扱うLSTM、特徴量選択、リアルタイム予測に取り組む予定です。
