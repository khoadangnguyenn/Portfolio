---
title: "Started VinBEVFusion with VinFast"
date: 2026-01-01
month_only: true
summary: "I became technical lead of a five-person team building bird's-eye-view maps from VinFast driving data."
thumb: /images/fig_heading.jpg
images:
  - src: /images/fig_heading.jpg
    alt: "The same drive with yaw from the direction of motion (left) and from the inertial heading (right)"
---
In January 2026 I started [VinBEVFusion](/portfolio/vinbevfusion/), a project between the URA group at VNPT Lab and VinFast. I was the technical lead of a team of five.

The goal was to adapt BEVFusion, a model that fuses six cameras and a LiDAR into a bird's-eye-view map, to recordings from Vietnamese roads. The finished model reached 74.2% mIoU and 89.4% drivable-area IoU.

Along the way we found that a wrong heading in the training labels, not the model, was holding accuracy back. The project page tells that story.

<!--lang:vi-->

Tháng 1/2026, mình bắt đầu [VinBEVFusion](/portfolio/vinbevfusion/), một dự án giữa nhóm URA, VNPT Lab và VinFast. Mình làm trưởng nhóm kỹ thuật của một nhóm năm người.

Mục tiêu là điều chỉnh BEVFusion, mô hình ghép sáu camera và một LiDAR thành bản đồ góc nhìn từ trên xuống, cho phù hợp với dữ liệu quay trên đường ở Việt Nam. Mô hình hoàn chỉnh đạt mIoU 74,2% và IoU vùng xe đi được 89,4%.

Trong lúc làm, nhóm phát hiện nhãn huấn luyện ghi sai hướng xe mới là thứ kéo độ chính xác xuống, không phải mô hình. Trang dự án kể lại câu chuyện này.

<!--lang:ja-->

2026年1月、VNPT LabのURAグループとVinFastの共同プロジェクト[VinBEVFusion](/portfolio/vinbevfusion/)を開始しました。5人チームのテクニカルリードを務めました。

目標は、6台のカメラとLiDARを統合して鳥瞰図を作るモデルBEVFusionを、ベトナムの道路で収録したデータに適応させることでした。完成したモデルは、mIoU 74.2%、走行可能領域のIoU 89.4%に達しました。

開発の途中で、精度の足を引っ張っていたのはモデルではなく、学習用ラベルのヘディング（向き）の誤りだと分かりました。この経緯はプロジェクトページに書いています。
