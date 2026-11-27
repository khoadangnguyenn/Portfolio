---
title: "Is it the model or the pose? Debugging a bird's-eye-view map"
excerpt: "URA × VinFast engineering project, completed. A road-map model looked broken. The cause was the car's heading in the labels."
tagline: "Debugging a bird's-eye-view road map on Vietnamese driving data: the labels' heading held mean IoU near 0.40, and the model was fine."
collection: portfolio
when: "Jan – Oct 2026"   # from CV PDF 2026-11-08
start: "2026-01"
end: "2026-10"
role: "Technical lead, 5 people"
context: "URA group, VNPT Lab × VinFast"
stack: [BEVFusion, nuScenes format, LiDAR, six cameras]
results:
  - "74.2% mIoU and 89.4% drivable-area IoU for BEVFusion trained on Vietnamese driving data."
  - "Mean IoU rose from about 0.40 to about 0.74 on the same validation frames after the label heading was corrected."
teaser: /images/fig_heading.jpg
teaser_alt: "The same drive with yaw from direction of motion (left) and from the inertial heading (right)"
teaser_caption: "The same drive with yaw from the direction of motion (left) and from the inertial heading (right)."
card_summary: "BEVFusion for bird's-eye-view lane and free-space maps on Vietnamese driving data; the failure traced to heading in the labels, and the model was fine."
card_result: "74.2% mIoU, 89.4% drivable-area IoU"
venue: "URA × VinFast"
summary: "A road map predicted from car cameras looked like a model failure. The cause was the car's heading in the training labels. Corrected labels raised mean IoU from about 0.40 to about 0.74 on the same validation frames."
thumb: /images/fig_heading.jpg
thumb_alt: "The same drive with yaw from direction of motion (left) and from the inertial heading (right)"
permalink: /portfolio/vinbevfusion/
---
We adapted BEVFusion, a model that fuses six cameras and a LiDAR into a bird's-eye-view map, to recordings from Vietnamese roads. After converting the data into the nuScenes format, validation accuracy stalled at a level that looked like the limit of the architecture. Before changing the model, we wanted to know whether the labels were telling it the truth.

## My role

I was the technical lead of a five-person team and owned benchmarking and runtime measurement. The diagnosis below was a team effort, so I write it as “we”.

## A decision: suspect the pose before the model

There were two reasonable next steps: tune the network, or audit how each label was placed. Map labels are drawn around the car using its recorded heading, so a wrong heading rotates the whole label. The recorded heading turned out to be the direction of motion, not the direction the car was facing. It read zero whenever the car stopped and pointed backwards whenever the car reversed. A gyroscope reading confirmed the car's body was not actually turning in those moments. The fix was to take heading from the inertial navigation system and fall back to the last valid value.

<figure><img src="{{ site.baseurl }}/images/fig_heading.jpg" alt="" loading="lazy" /><figcaption>The same drive seen two ways. Left: yaw taken from the direction of motion. When the car stops, the yaw snaps to a fixed value. When it reverses, it flips by 180°, and the road label rotates with it. Right: yaw from the inertial heading keeps the label on the road.</figcaption></figure>

With the same configuration, the same random seed and the same validation frames, retraining on corrected labels raised mean intersection-over-union from about 0.40 to about 0.74. The label pixels themselves barely changed, which rules out a different dataset as the explanation.

## Limits and next test

Training and validation came from the same recording, so the number says nothing yet about new roads. The model also runs well above the latency target. The next test is a validation split taken from a different drive.

<!--lang:vi-->

Chúng mình đưa BEVFusion vào chạy trên dữ liệu ghi từ đường phố Việt Nam. Đây là mô hình gộp sáu camera và một LiDAR thành bản đồ góc nhìn từ trên xuống (BEV). Sau khi chuyển dữ liệu sang định dạng nuScenes, độ chính xác trên tập kiểm định (validation) dừng lại ở một mức trông như giới hạn của kiến trúc. Trước khi đụng vào mô hình, chúng mình muốn biết nhãn có nói thật với nó hay không.

## Vai trò của mình

Mình là trưởng nhóm kỹ thuật của nhóm năm người, phụ trách benchmark và đo thời gian chạy. Phần chẩn đoán dưới đây là công sức của cả nhóm, nên mình kể bằng "chúng mình".

## Một quyết định: nghi tư thế xe (pose) trước, nghi mô hình sau

Lúc đó có hai hướng đi hợp lý: tinh chỉnh mạng, hoặc rà lại cách đặt từng nhãn. Nhãn bản đồ được vẽ quanh xe theo hướng xe đã ghi lại, nên hướng sai thì cả nhãn xoay theo. Hoá ra hướng được ghi là hướng chuyển động, không phải hướng đầu xe. Xe dừng thì giá trị này về 0, xe lùi thì nó chỉ ngược ra sau. Số đo từ con quay hồi chuyển (gyroscope) cho thấy thân xe không hề quay vào những lúc đó. Chúng mình sửa bằng cách lấy hướng từ hệ thống dẫn đường quán tính, và khi giá trị không hợp lệ thì dùng lại giá trị hợp lệ gần nhất.

<figure><img src="{{ site.baseurl }}/images/fig_heading.jpg" alt="" loading="lazy" /><figcaption>Cùng một đoạn lái, nhìn theo hai cách. Bên trái: góc yaw lấy theo hướng chuyển động. Xe dừng thì yaw nhảy về một giá trị cố định. Xe lùi thì yaw lật 180° và nhãn đường xoay theo. Bên phải: yaw lấy từ hướng của hệ quán tính, nhãn nằm đúng trên đường.</figcaption></figure>

Chúng mình giữ nguyên cấu hình, random seed và các khung hình kiểm định, rồi huấn luyện lại trên nhãn đã sửa. Mean IoU (mean intersection-over-union) tăng từ khoảng 0,40 lên khoảng 0,74. Các pixel nhãn gần như không đổi, nên không thể giải thích kết quả này bằng một bộ dữ liệu khác.

## Giới hạn và bước kiểm tra tiếp theo

Dữ liệu huấn luyện và kiểm định lấy từ cùng một bản ghi, nên con số này chưa nói được gì về những con đường mới. Độ trễ của mô hình cũng còn cao hơn mục tiêu khá xa. Bước kiểm tra tiếp theo là dùng tập kiểm định lấy từ một chuyến lái khác.

<!--lang:ja-->

BEVFusionは、6台のカメラと1台のLiDARの情報を統合して鳥瞰図（BEV）マップを作るモデルです。これをベトナムの道路で記録したデータに適用しました。データをnuScenes形式に変換したあと、検証データでの精度がある水準で頭打ちになり、アーキテクチャの限界にも見えました。モデルに手を入れる前に、ラベルがモデルに正しい情報を伝えているのかを確かめることにしました。

## 私の役割

5人チームのテクニカルリードとして、ベンチマークと実行時間の計測を担当しました。以下の原因調査はチームで進めたものなので、「私たち」の視点で書いています。

## 判断：モデルより先に姿勢（ポーズ）を疑う

次の手として考えられたのは、ネットワークを調整するか、各ラベルの置き方を検証するかの2つでした。マップのラベルは、記録された車両の向き（ヘディング）を基準に車の周りに描かれます。向きが間違っていれば、ラベル全体が回転してしまいます。調べてみると、記録されていた向きは車体の向きではなく進行方向でした。停車すると0になり、後退すると真後ろを向きます。ジャイロの値を見ると、そのとき車体は実際には回転していませんでした。そこで向きを慣性航法装置から取り、有効な値がないときは直前の有効な値を使うように直しました。

<figure><img src="{{ site.baseurl }}/images/fig_heading.jpg" alt="" loading="lazy" /><figcaption>同じ走行を2通りの方法で表示したもの。左：進行方向から求めたヨー角。停車するとヨー角が固定値に飛び、後退すると180°反転して、道路のラベルも一緒に回転します。右：慣性航法の向きから求めたヨー角。ラベルは道路の上にとどまります。</figcaption></figure>

設定、乱数シード、検証フレームをすべて同じにしたまま、修正したラベルで再学習しました。平均IoU（mean intersection-over-union）は約0.40から約0.74に上がりました。ラベルのピクセル自体はほとんど変わっていないので、データセットが別物になったことが原因とは考えられません。

## 限界と次の検証

学習データと検証データは同じ記録から取っているため、この数値からは未知の道路での性能はまだ分かりません。モデルのレイテンシも目標を大きく上回っています。次は、別の走行から取った検証データで試します。
