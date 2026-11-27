---
title: "Real-time stock monitoring"
tagline: "A Java console service that polls prices from two exchange feeds and notifies price alerts, a live view and a ticker."
collection: portfolio
when: "May 2025"
start: "2025-05"
end: "2025-05"
stack: [Java, Maven, org.json]
code: "https://github.com/khoadangnguyenn/Real-time-Stock-Monitoring-System"
card_summary: "A Java service that pulls stock prices from HOSE and HNX adapters and pushes them to alert, real-time and ticker views."
permalink: /portfolio/real-time-stock-monitoring/
---

This small Java 8 and Maven service is built around design patterns. It polls two exchange feeds, HOSE and HNX, converts their different formats into one price type, and pushes every price to the viewers registered for that stock. The feeds are simulated, so it shows the architecture, not live market data.

The two Vietnamese exchanges return prices in their own shapes, yet an alert, a live price line and a periodic summary all want the same stream. The code keeps sources and consumers independent, so adding one touches little else.

Two patterns carry the design.

- Adapter: one adapter per exchange turns that exchange's data into the common price type behind a shared fetcher interface.
- Observer: a singleton feeder holds the stocks and the viewers of each stock code. It rejects a second viewer of the same kind per code and notifies the rest on each new price.

There are three viewers. The alert fires when the price crosses a high or low threshold, and only on the crossing, not on every tick. The real-time view logs a price when it changes. The ticker prints open, high, low, close, volume and average every 10 seconds. A fetch manager runs all fetchers once a minute.

The demo watches Vingroup (VIC) with a high and a low alert threshold. It fetches four HOSE and three HNX codes on a schedule.

Sample prices in a JSON file drive the feeds. Real-time use needs real exchange clients behind the same fetcher interface.

<!--lang:vi-->

Đây là một dịch vụ nhỏ viết bằng Java 8 và Maven, dựng quanh các mẫu thiết kế (design pattern). Dịch vụ định kỳ lấy giá từ hai nguồn dữ liệu của sàn HOSE và HNX, đưa hai định dạng khác nhau về một kiểu giá chung, rồi đẩy từng mức giá tới các màn hình đã đăng ký theo dõi mã cổ phiếu đó. Các nguồn giá đều là giả lập, nên dự án minh hoạ kiến trúc, không chạy trên dữ liệu thị trường thật.

Hai sàn ở Việt Nam trả giá theo định dạng riêng của mình, trong khi cảnh báo, dòng giá trực tiếp và bản tổng hợp định kỳ đều cần cùng một luồng giá. Code giữ nguồn dữ liệu và bên dùng dữ liệu độc lập với nhau, nên thêm một nguồn hay một bên dùng chỉ phải sửa rất ít chỗ khác.

Thiết kế dựa trên hai mẫu.

- Adapter: mỗi sàn có một adapter chuyển dữ liệu của sàn đó về kiểu giá chung, đặt sau một interface fetcher dùng chung.
- Observer: một feeder dạng singleton giữ danh sách cổ phiếu và các màn hình theo dõi từng mã. Feeder từ chối màn hình thứ hai cùng loại trên một mã, và báo cho các màn hình còn lại mỗi khi có giá mới.

Có ba loại màn hình. Cảnh báo bật khi giá vượt ngưỡng trên hoặc ngưỡng dưới, và chỉ bật đúng lúc giá vượt qua ngưỡng, không bật lại ở mỗi tick. Màn hình thời gian thực ghi log mỗi khi giá đổi. Bảng giá chạy (ticker) in giá mở cửa, cao nhất, thấp nhất, đóng cửa, khối lượng và giá trung bình sau mỗi 10 giây. Một fetch manager chạy tất cả fetcher mỗi phút một lần.

Bản demo theo dõi Vingroup (VIC) với một ngưỡng cảnh báo trên và một ngưỡng cảnh báo dưới. Demo lấy giá của bốn mã trên HOSE và ba mã trên HNX theo lịch định sẵn.

Các nguồn giá chạy bằng giá mẫu lấy từ một file JSON. Muốn dùng thời gian thực thật thì cần client thật của từng sàn, đặt sau cùng interface fetcher.

<!--lang:ja-->

Java 8とMavenで作った小さなサービスで、デザインパターンを軸に設計しています。HOSEとHNXという2つの取引所のフィードを定期的に取得し、形式の違うデータを1つの価格型にそろえ、その銘柄に登録されたビューアーにすべての価格を配信します。フィードはシミュレーションなので、このサービスで示せるのはアーキテクチャで、実際の市場データは扱っていません。

ベトナムの2つの取引所は、それぞれ独自の形式で価格を返します。一方で、アラート、リアルタイムの価格表示、定期的なサマリーはどれも同じ価格の流れを必要とします。コードはデータの取得元と利用側を切り離しているので、どちらかを追加してもほかへの影響はわずかです。

設計の中心は2つのパターンです。

- Adapter：取引所ごとにアダプタを1つ用意し、その取引所のデータを共通の価格型に変換します。アダプタは共通のフェッチャーインターフェースの背後に置いています。
- Observer：シングルトンのフィーダーが、銘柄と銘柄コードごとのビューアーを管理します。同じコードに同じ種類のビューアーが2つ目に登録されようとすると拒否し、新しい価格が届くたびに残りのビューアーに通知します。

ビューアーは3つあります。アラートは価格が上限か下限のしきい値をまたいだときに発火します。発火するのはまたいだ瞬間だけで、ティックごとではありません。リアルタイム表示は、価格が変わったときにログに出力します。ティッカーは10秒ごとに始値、高値、安値、終値、出来高、平均を表示します。フェッチマネージャーは1分に1回、すべてのフェッチャーを実行します。

デモではVingroup（VIC）を監視し、アラートのしきい値を上限と下限に1つずつ設定しています。HOSEの4銘柄とHNXの3銘柄を、スケジュールに沿って取得します。

フィードはJSONファイルのサンプル価格で動いています。リアルタイムで使うには、同じフェッチャーインターフェースの背後に実際の取引所クライアントが必要です。
