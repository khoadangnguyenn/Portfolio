---
title: "Video Retrieval AI Agent"
tagline: "A Vietnamese-first video search system: text queries find matching frames through CLIP embeddings and a FAISS index, behind a FastAPI and React app."
collection: portfolio
when: "Nov 2025 – Mar 2026"
start: "2025-11"
end: "2026-03"
context: "AI Challenge 2025"
stack: [Python, FastAPI, CLIP, FAISS, React, TypeScript, Vite, Tailwind, Docker]
code: "https://github.com/khoadangnguyenn/Video-Retrieval-AI-Agent"
card_summary: "Text-to-frame video search for Vietnamese content: CLIP embeddings, FAISS index, OCR-aware filtering, FastAPI backend and React frontend."
permalink: /portfolio/video-retrieval-ai-agent/
---
Finding one moment in hours of video by typing a description is slow without an index. The content is mostly Vietnamese, with on-screen text such as news tickers, and Vietnamese queries often arrive without diacritics. The system has to match all of that.

Frames and detected objects are embedded with CLIP ViT-B/32 (512-d, OpenAI weights) and stored in FAISS indexes that can be searched by text or by image. A later version dropped the speech, OCR and scene signals from the embedding to reduce noise.

Queries about on-screen text get their own path. It detects words like "ticker" and "subtitle", filters on OCR text first, strips Vietnamese diacritics so unaccented queries match, and falls back to semantic search. An optional LLM step expands the keywords.

A FastAPI backend serves text, image and audio search, plus ingest and health checks. The React frontend shows results, and each one opens the source YouTube video at the matching frame.

The public repo is a snapshot of the competition code. The indexed data is not included, so it does not run on its own.

<!--lang:vi-->

Không có chỉ mục thì muốn tìm một khoảnh khắc trong hàng giờ video bằng câu mô tả sẽ chậm. Nội dung phần lớn là tiếng Việt, kèm chữ hiện trên màn hình như dòng tin chạy (ticker) của bản tin. Người dùng cũng hay gõ câu truy vấn tiếng Việt không dấu. Hệ thống phải khớp được tất cả những thứ đó.

Hệ thống dùng CLIP ViT-B/32 (vector 512 chiều, trọng số của OpenAI) để tạo embedding cho khung hình và cho các vật thể phát hiện được, rồi lưu vào các chỉ mục FAISS. Có thể tìm trên các chỉ mục này bằng văn bản hoặc bằng ảnh. Một phiên bản sau bỏ tín hiệu giọng nói, OCR và cảnh ra khỏi embedding để giảm nhiễu.

Câu truy vấn hỏi về chữ trên màn hình đi theo một nhánh riêng. Nhánh này nhận ra các từ như "ticker" hay "subtitle", lọc theo văn bản OCR trước, và bỏ dấu tiếng Việt để câu gõ không dấu vẫn khớp. Tìm kiếm ngữ nghĩa là phương án dự phòng. Nếu muốn, có thể bật thêm một bước LLM để mở rộng từ khóa.

Backend FastAPI phục vụ tìm kiếm bằng văn bản, hình ảnh và âm thanh, cùng các endpoint nạp dữ liệu (ingest) và kiểm tra tình trạng (health check). Frontend React hiển thị kết quả. Bấm vào kết quả nào thì video YouTube gốc mở ra đúng tại khung hình khớp.

Repo công khai là bản chụp mã nguồn dùng trong cuộc thi. Repo không kèm dữ liệu đã lập chỉ mục, nên không tự chạy được.

<!--lang:ja-->

説明文を入力して何時間分もの動画から一場面を探すのは、インデックスがなければ時間がかかります。コンテンツは主にベトナム語で、ニュースのテロップのような画面上の文字も含まれます。しかもベトナム語の検索クエリは、声調記号などの補助記号を付けずに入力されることがよくあります。システムはこれらすべてに対応する必要があります。

フレームと検出した物体は、CLIP ViT-B/32（512次元、OpenAIの重み）で埋め込みに変換し、FAISSインデックスに保存します。検索はテキストでも画像でもできます。後のバージョンでは、ノイズを減らすために、音声・OCR・シーンの情報を埋め込みから外しました。

画面上の文字についてのクエリは、専用の経路で処理します。「ticker」や「subtitle」といった語を検出すると、まずOCRテキストで絞り込みます。このときベトナム語の補助記号を取り除くので、記号なしのクエリでも一致します。うまくいかない場合は意味検索にフォールバックします。オプションで、LLMによるキーワード拡張も使えます。

FastAPIのバックエンドは、テキスト・画像・音声による検索に加えて、データ取り込み（ingest）とヘルスチェックのエンドポイントも提供します。Reactのフロントエンドには検索結果が並び、各結果からは元のYouTube動画を該当フレームの位置で開けます。

公開リポジトリは、大会で使ったコードのスナップショットです。インデックス済みのデータは含まれていないため、リポジトリ単体では動きません。
