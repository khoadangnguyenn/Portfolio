---
title: "WeApRous"
excerpt: "Course assignment. An HTTP server, a virtual-host reverse proxy with round-robin and a peer-to-peer chat, all written on raw TCP sockets in Python."
tagline: "A small HTTP stack on raw TCP sockets: a virtual-host reverse proxy with round-robin, a REST router and two peer-to-peer chats."
collection: portfolio
when: "Nov 2025"   # first/last push month on GitHub, from _data/projects.yml
start: "2025-11"
end: "2025-11"
context: "Course assignment, CO3093/CO3094 (HCMUT)"
stack: [Python, TCP sockets, threading, Flask]
code: "https://github.com/khoadangnguyenn/WeApRous"
card_summary: "Network programming assignment: a threaded HTTP backend, a round-robin reverse proxy and two peer-to-peer chats on raw Python sockets."
permalink: /portfolio/weaprous/
---

WeApRous is a networking course assignment (CO3093/CO3094 at HCMUT) on the client-server and peer-to-peer models. The core is built directly on TCP sockets, and the repo contains both models.

The client-server half is a threaded HTTP backend. It accepts a connection, starts one thread for that client, parses the request, calls the matching route handler and builds the reply. Routes are registered with a decorator that takes a method and a path, much like a small web framework.

In front of it sits a reverse proxy that picks a backend from the Host header. One virtual host in the config lists two backends and uses round-robin, with a counter per host to choose the next one. An unknown host or an unreachable backend gets a 404.

The peer-to-peer half has two chats:

- A one-to-one TCP chat where one side listens on a port and the other connects to it.
- A tracker-based chat where each peer registers with a tracker, asks it for the peer list as JSON, and then messages every peer directly.

A Flask demo adds login and registration. It issues a signed token valid for one hour and serves a chat page.

<!--lang:vi-->

WeApRous là bài tập lớn của môn mạng máy tính (CO3093/CO3094 ở ĐH Bách khoa), xoay quanh hai mô hình client-server và peer-to-peer. Phần lõi viết thẳng trên socket TCP, và repo có đủ cả hai mô hình.

Nửa client-server là một backend HTTP đa luồng. Mỗi khi nhận một kết nối, backend mở riêng một thread cho client đó, phân tích request, gọi handler của route tương ứng rồi dựng response. Route được đăng ký bằng một decorator nhận method và path, cách làm giống một web framework thu nhỏ.

Đứng trước backend là một reverse proxy, chọn backend dựa vào header Host. Trong file cấu hình, một virtual host khai báo hai backend và chia request theo round-robin, với một bộ đếm riêng cho từng host để chọn backend kế tiếp. Request tới host lạ, hoặc tới backend không kết nối được, sẽ nhận về 404.

Nửa peer-to-peer có hai ứng dụng chat:

- Chat TCP một-một: một bên lắng nghe trên một cổng, bên kia kết nối vào cổng đó.
- Chat qua tracker: mỗi peer đăng ký với tracker, xin tracker danh sách peer dạng JSON, rồi nhắn trực tiếp cho từng peer.

Một bản demo Flask bổ sung đăng nhập và đăng ký. Bản này cấp token có chữ ký, hiệu lực một giờ, và phục vụ một trang chat.

<!--lang:ja-->

WeApRousは、HCMUTのネットワーク科目（CO3093/CO3094）の課題で、クライアント・サーバ型とピアツーピア型の2つのモデルを扱います。中核部分はTCPソケットの上に直接組んでいて、リポジトリには両方のモデルが入っています。

クライアント・サーバ側は、マルチスレッドのHTTPバックエンドです。接続を受け付けるとそのクライアント専用のスレッドを1つ立て、リクエストを解析し、対応するルートのハンドラを呼んでレスポンスを組み立てます。ルートはメソッドとパスを受け取るデコレータで登録するので、小さなWebフレームワークに近い使い心地です。

その手前には、Hostヘッダーを見て転送先のバックエンドを選ぶリバースプロキシがあります。設定ファイルでは1つのバーチャルホストに2つのバックエンドを割り当て、ラウンドロビンで振り分けます。次の転送先は、ホストごとに持つカウンタで決めます。未知のホスト宛てのリクエストや、接続できないバックエンドへのリクエストには404を返します。

ピアツーピア側には2種類のチャットがあります。

- 1対1のTCPチャット：一方がポートで待ち受け、もう一方がそこに接続します。
- トラッカー型のチャット：各ピアがトラッカーに登録し、ピアの一覧をJSONで受け取ってから、それぞれのピアに直接メッセージを送ります。

Flaskのデモでは、ログインとユーザー登録を追加しています。有効期限1時間の署名付きトークンを発行し、チャットページを配信します。
