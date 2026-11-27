---
title: "MARS accepted at IAAA 2026"
date: 2026-07-01
month_only: true
summary: "Our paper on a lightweight model for predicting robot trajectories and collision risk was accepted at IAAA 2026."
---
Our paper [MARS](/publication/mars) was accepted at IAAA 2026, the conference on Intelligent Aerial Access and Applications towards 6G and Beyond. The conference took place in Ho Chi Minh City on 27 to 29 July 2026. The proceedings will appear in Springer's Lecture Notes in Networks and Systems.

MARS predicts two things at once for a robot that navigates without a map: where it will go next, and how likely a collision with a moving obstacle is. It reads point-cloud features in a bird's-eye view and uses a Mamba backbone to follow how the scene changes over time.

It is also fast. On an RTX 4080S it runs in 3.398 ms, the lowest latency among the four backbones we compared. I worked on it with the URA group at VNPT Lab, advised by Assoc. Prof. Quan Thanh Tho.

<!--lang:vi-->

Bài báo [MARS](/publication/mars) của nhóm mình đã được nhận đăng tại IAAA 2026, hội nghị Intelligent Aerial Access and Applications towards 6G and Beyond. Hội nghị diễn ra tại Thành phố Hồ Chí Minh từ ngày 27 đến 29/7/2026. Kỷ yếu sẽ nằm trong bộ Lecture Notes in Networks and Systems của Springer.

MARS dự đoán cùng lúc hai điều cho một robot đi mà không cần bản đồ: robot sẽ đi đâu tiếp theo, và khả năng va chạm với vật cản đang di chuyển là bao nhiêu. Mô hình đọc đặc trưng đám mây điểm ở góc nhìn từ trên xuống, và dùng backbone Mamba để theo dõi cảnh thay đổi theo thời gian.

Mô hình cũng chạy nhanh. Trên RTX 4080S, MARS mất 3,398 ms, độ trễ thấp nhất trong bốn backbone mà nhóm so sánh. Mình làm nghiên cứu này cùng nhóm URA, VNPT Lab, do PGS.TS. Quản Thành Thơ hướng dẫn.

<!--lang:ja-->

論文[MARS](/publication/mars)が、IAAA 2026（Intelligent Aerial Access and Applications towards 6G and Beyond）に採択されました。会議は2026年7月27日から29日にホーチミン市で開催されました。論文集はSpringerのLecture Notes in Networks and Systemsに掲載される予定です。

MARSは、地図を使わずに移動するロボットについて、次の進路と、動く障害物との衝突確率を同時に予測します。鳥瞰図上の点群特徴を読み取り、Mambaバックボーンでシーンの時間変化を追います。

処理も速く、RTX 4080Sで3.398 msと、比較した4種類のバックボーンの中で最も低い遅延でした。VNPT LabのURAグループで、Quan Thanh Tho 准教授の指導のもと取り組みました。
