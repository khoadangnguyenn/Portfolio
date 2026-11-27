---
title: 'Reading a fisheye image'
date: 2026-11-22
thumb: /images/fig_projection.jpg
thumb_alt: "A ray on the viewing sphere, its pinhole image and its equidistant image"
permalink: /posts/2026/11/reading-a-fisheye-image/
math: true   # loads MathJax (_includes/footer/custom.html)
excerpt: 'Why a pinhole model breaks past 90°, what the equidistant model does instead, and what that means for stereo depth.'
tags:
  - fisheye
  - stereo
  - geometry
---

A fisheye lens bends a whole hemisphere, sometimes more, onto one flat sensor. To get depth out of such an image you first need a rule that says which direction in the world each pixel looks at. That rule is the camera model, and the familiar one stops working at the edge of the picture.

## The pinhole rule, and where it ends

A pinhole camera maps a ray that makes angle $$\theta$$ with the optical axis to a point at distance

$$
r = f \tan\theta
$$

from the image centre, where $$f$$ is the focal length in pixels. With $$f = 300$$ px, a ray at 45° lands at 300 px. At 80° it lands at about 1,700 px. At 90° it would land at infinity. A pinhole image can never show anything at or beyond 90° off-axis, however large the sensor.

## The equidistant rule

Many fisheye lenses follow, approximately, the equidistant model:

$$
r = f\,\theta
$$

Distance from the centre grows *linearly* with angle. With the same $$f = 300$$ px, 45° lands at 236 px, 90° at 471 px, and 97.5° (the edge of a 195° lens) at 511 px. Nothing runs off to infinity, so the whole field of view fits on the sensor. The price is that straight lines in the world bend in the image, which is the familiar fisheye look.

| Angle off-axis | Pinhole $$f\tan\theta$$ | Equidistant $$f\theta$$ |
| --- | --- | --- |
| 30° | 173 px | 157 px |
| 60° | 520 px | 314 px |
| 80° | 1,701 px | 419 px |
| 90° | ∞ | 471 px |

Real lenses drift from the ideal, so calibration fits a few extra polynomial terms in $$\theta$$. The idea stays the same: radius as a function of angle.

<figure><img src="{{ site.baseurl }}/images/fig_projection.jpg" alt="" loading="lazy" /><figcaption>One ray at 82.3° off the optical axis, imaged by two models on the same sensor (f = 300 px, half-width 511 px). The pinhole model puts it at about 2,200 px, far off the sensor; past 90° it has no image point at all. The equidistant model puts it at 431 px, inside the sensor.</figcaption></figure>

{% include fisheye-demo.html uid="en" %}

## Why this matters for depth

Stereo depth comes from the angle between two views of the same point. The usual pipeline cuts a fisheye image into pinhole views, because standard stereo matchers expect pinhole geometry. By the table above, each pinhole view can only use a cone well under 90°, so the widest part of the image, often where two cameras overlap most, gets thrown away.

Matching on the fisheye geometry directly keeps those pixels.

In a later post I will look at calibration: why a rotation error of a tenth of a degree between cameras matters more than you would expect at long range.

<!--lang:vi-->

Ống kính mắt cá bẻ cả một bán cầu, có khi rộng hơn, lên một cảm biến phẳng. Muốn lấy độ sâu từ ảnh như vậy, trước hết cần một quy tắc cho biết mỗi pixel nhìn về hướng nào trong thế giới thực. Quy tắc đó là mô hình camera, và mô hình quen thuộc thì không dùng được ở rìa ảnh.

## Mô hình pinhole và giới hạn của nó

Camera pinhole (camera lỗ kim) đưa một tia sáng hợp với trục quang góc $$\theta$$ tới điểm cách tâm ảnh một khoảng

$$
r = f \tan\theta
$$

trong đó $$f$$ là tiêu cự tính bằng pixel. Với $$f = 300$$ px, tia ở góc 45° rơi vào điểm cách tâm 300 px. Ở 80°, nó rơi vào khoảng 1.700 px. Ở 90°, nó rơi ra vô cực. Dù cảm biến lớn đến đâu, ảnh pinhole cũng không bao giờ hiện được vật nào lệch khỏi trục từ 90° trở lên.

## Mô hình equidistant

Nhiều ống kính mắt cá đi theo mô hình equidistant, dù chỉ gần đúng:

$$
r = f\,\theta
$$

Khoảng cách tới tâm tăng *tuyến tính* theo góc. Vẫn với $$f = 300$$ px, góc 45° rơi vào 236 px, 90° vào 471 px, còn 97,5° (rìa của một ống kính 195°) vào 511 px. Không điểm nào chạy ra vô cực, nên toàn bộ góc nhìn nằm gọn trên cảm biến. Cái giá phải trả là đường thẳng ngoài đời bị cong trong ảnh, và đó chính là vẻ mắt cá quen thuộc.

| Góc lệch khỏi trục | Pinhole $$f\tan\theta$$ | Equidistant $$f\theta$$ |
| --- | --- | --- |
| 30° | 173 px | 157 px |
| 60° | 520 px | 314 px |
| 80° | 1.701 px | 419 px |
| 90° | ∞ | 471 px |

Ống kính thật lệch khỏi mô hình lý tưởng, nên khi hiệu chỉnh (calibration) người ta khớp thêm vài số hạng đa thức theo $$\theta$$. Ý tưởng vẫn giữ nguyên: bán kính là một hàm của góc.

<figure><img src="{{ site.baseurl }}/images/fig_projection.jpg" alt="" loading="lazy" /><figcaption>Hai mô hình chiếu cùng một tia, lệch 82,3° khỏi trục quang, lên cùng một cảm biến (f = 300 px, nửa chiều rộng 511 px). Mô hình pinhole đặt tia này ở khoảng 2.200 px, xa ngoài cảm biến; với tia lệch quá 90°, mô hình này không cho điểm ảnh nào. Mô hình equidistant đặt tia ở 431 px, nằm trong cảm biến.</figcaption></figure>

{% include fisheye-demo.html uid="vi" %}

## Vì sao chuyện này quan trọng khi tính độ sâu

Stereo tính độ sâu từ góc giữa hai hướng nhìn tới cùng một điểm. Pipeline thường gặp cắt ảnh mắt cá thành các ảnh pinhole, vì các bộ so khớp stereo chuẩn giả định hình học pinhole. Theo bảng trên, mỗi ảnh pinhole chỉ dùng được một hình nón hẹp hơn 90° khá nhiều. Kết quả là pipeline vứt bỏ phần rộng nhất của ảnh, mà đó thường là chỗ hai camera chồng lấn nhiều nhất.

So khớp thẳng trên hình học mắt cá thì giữ lại được những pixel đó.

Ở bài sau, mình sẽ bàn về hiệu chỉnh: vì sao sai số xoay chỉ một phần mười độ giữa hai camera lại ảnh hưởng ở tầm xa nhiều hơn bạn nghĩ.

<!--lang:ja-->

魚眼レンズは、半球ぶん、ときにはそれ以上の範囲を、1枚の平らなセンサーに曲げて写し込みます。こうした画像から奥行きを求めるには、まず各ピクセルが現実世界のどの方向を見ているかを決めるルールが必要です。そのルールがカメラモデルですが、おなじみのモデルは画像の端で使えなくなります。

## ピンホールモデルとその限界

ピンホールカメラでは、光軸と角度 $$\theta$$ をなす光線が、画像中心から次の距離にある点に写ります。

$$
r = f \tan\theta
$$

ここで $$f$$ はピクセル単位の焦点距離です。$$f = 300$$ px とすると、45°の光線は300 pxの位置に写ります。80°では約1,700 pxになり、90°では無限遠に飛んでしまいます。センサーをどれだけ大きくしても、光軸から90°以上離れたものはピンホール画像には写りません。

## 等距離射影モデル

多くの魚眼レンズは、おおよそ等距離射影モデルに従います。

$$
r = f\,\theta
$$

中心からの距離は、角度に対して*線形に*増えます。同じ $$f = 300$$ px なら、45°は236 px、90°は471 px、97.5°（195°レンズの端）は511 pxに写ります。無限遠に飛ぶ点がないので、画角全体がセンサーに収まります。その代わり、現実の直線が画像では曲がります。これがおなじみの魚眼らしい見た目です。

| 光軸からの角度 | ピンホール $$f\tan\theta$$ | 等距離射影 $$f\theta$$ |
| --- | --- | --- |
| 30° | 173 px | 157 px |
| 60° | 520 px | 314 px |
| 80° | 1,701 px | 419 px |
| 90° | ∞ | 471 px |

実際のレンズは理想からずれるので、キャリブレーションでは $$\theta$$ の多項式の項をいくつか追加してフィッティングします。考え方は変わらず、半径を角度の関数として表します。

<figure><img src="{{ site.baseurl }}/images/fig_projection.jpg" alt="" loading="lazy" /><figcaption>光軸から82.3°傾いた1本の光線を、2つのモデルで同じセンサー（f = 300 px、半幅511 px）に写した図。ピンホールモデルでは約2,200 pxの位置になり、センサーから大きくはみ出します。90°を超えると、像点そのものがありません。等距離射影モデルでは431 pxで、センサー内に収まります。</figcaption></figure>

{% include fisheye-demo.html uid="ja" %}

## 奥行き推定への影響

ステレオでは、同じ点を2つの視点から見たときの視線のなす角から奥行きを求めます。一般的なパイプラインでは、魚眼画像をいくつかのピンホール画像に切り出します。標準的なステレオマッチャーがピンホールの幾何を前提にしているためです。上の表のとおり、ピンホール画像1枚で使えるのは90°よりかなり狭い円錐の範囲だけです。そのため、画像のいちばん広い部分が捨てられてしまいます。そこは2台のカメラの重なりが最も大きくなりやすい部分でもあります。

魚眼の幾何のままマッチングすれば、それらのピクセルを残せます。

次の記事ではキャリブレーションを取り上げます。カメラ間の回転誤差がわずか0.1°でも、遠距離では思った以上に効いてくる理由を説明する予定です。
