---
title: "E-Commerce Chatbot AI"
tagline: "A FastAPI chatbot backend that answers users with an OpenAI assistant, stores chat history and token usage in MongoDB, and replies on Facebook Messenger."
collection: portfolio
stack: [Python, FastAPI, OpenAI Assistants API, MongoDB, Docker, pytest]
code: "https://github.com/khoadangnguyenn/E-Commerce-Chatbot-AI"
card_summary: "A FastAPI chatbot service for e-commerce: OpenAI assistant replies, MongoDB chat history and token tracking, Facebook Messenger webhook."
permalink: /portfolio/e-commerce-chatbot-ai/
---

A shop chatbot has to answer on Facebook Messenger, remember each conversation, and show how many tokens each user costs. This repo is the backend that does all three.

A user message of 1 to 4,000 characters hits a single chat endpoint. The service creates or loads the session, saves both sides of the exchange and records token usage. For the reply, it sends the last five messages to an OpenAI Assistant thread and waits for the run to finish. If the run fails, the user gets a fallback message.

The Messenger webhook answers Facebook's verification handshake and checks the HMAC-SHA256 signature when an app secret is configured. Text messages go to the chatbot, and the reply goes back through the Graph API.

Chat history and token counts, per user and per session, live in MongoDB. A Docker Compose file starts MongoDB together with Mongo Express.

18 pytest tests cover the chat flow, MongoDB access and token tracking.

Connectors to Shopee, TikTok Shop and Amazon, and monitoring with Prometheus, are planned but not built yet.

<!--lang:vi-->

Chatbot của một cửa hàng phải trả lời trên Facebook Messenger, nhớ từng cuộc hội thoại và cho biết mỗi người dùng tốn bao nhiêu token. Repo này là phần backend lo cả ba việc đó.

Tin nhắn của người dùng, dài từ 1 đến 4.000 ký tự, đi vào một endpoint chat duy nhất. Dịch vụ tạo mới hoặc nạp lại phiên, lưu tin nhắn của cả hai phía và ghi lại lượng token đã dùng. Để soạn câu trả lời, dịch vụ gửi năm tin nhắn gần nhất vào một thread của OpenAI Assistant rồi chờ lượt chạy (run) hoàn tất. Nếu run lỗi, người dùng nhận một tin nhắn dự phòng.

Webhook Messenger trả lời bước bắt tay xác minh của Facebook. Khi có cấu hình app secret, webhook còn kiểm chữ ký HMAC-SHA256. Tin nhắn văn bản được chuyển cho chatbot, còn câu trả lời đi ngược lại qua Graph API.

MongoDB lưu lịch sử chat và số token theo từng người dùng và từng phiên. Một file Docker Compose khởi động MongoDB cùng Mongo Express.

Bộ test gồm 18 bài pytest, kiểm luồng chat, phần truy cập MongoDB và phần theo dõi token.

Kết nối với Shopee, TikTok Shop và Amazon, cùng phần giám sát bằng Prometheus, đã có trong kế hoạch nhưng chưa làm.

<!--lang:ja-->

ショップのチャットボットには、Facebook Messengerで返信すること、会話ごとの内容を覚えておくこと、ユーザーごとのトークン消費量を見えるようにすることが求められます。このリポジトリは、その3つを担うバックエンドです。

ユーザーのメッセージ（1〜4,000文字）は、1つのチャット用エンドポイントに届きます。サービスはセッションを新しく作るか読み込み、ユーザーとボット双方のメッセージを保存して、トークン使用量を記録します。返信を作るときは、直近5件のメッセージをOpenAI Assistantのスレッドに送り、run（実行）の完了を待ちます。runが失敗した場合は、ユーザーに代わりのメッセージを返します。

Messengerのwebhookは、Facebookの検証用ハンドシェイクに応答します。アプリシークレットが設定されていれば、HMAC-SHA256署名も検証します。テキストメッセージはチャットボットに渡し、返信はGraph API経由で送り返します。

チャット履歴とトークン数は、ユーザー単位・セッション単位でMongoDBに保存します。Docker Composeファイルを使うと、MongoDBとMongo Expressをまとめて起動できます。

pytestのテスト18件で、チャットの流れ、MongoDBへのアクセス、トークンの記録を確認しています。

Shopee、TikTok Shop、Amazonとの連携や、Prometheusによる監視は計画中で、まだ実装していません。
