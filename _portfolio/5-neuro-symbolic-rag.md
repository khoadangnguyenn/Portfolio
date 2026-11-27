---
title: "Neuro-Symbolic RAG"
tagline: "A retrieval and solver pipeline that answers physics and logic questions with Z3 and SymPy instead of letting a small LLM guess."
collection: portfolio
when: "Mar – Jul 2026"
start: "2026-03"
end: "2026-07"
role: "Team lead, 4 people"
context: "IEEE IJCNN 2026 EXACT challenge"
stack: [Python, Qwen3-8B, ChromaDB, NetworkX, Z3, SymPy, spaCy, Docker]
code: "https://github.com/khoadangnguyenn/Neuro-Symbolic-RAG"
links:
  - {label: "Solution report (PDF)", url: "https://github.com/khoadangnguyenn/Neuro-Symbolic-RAG/blob/main/EXACT_Pipeline_Report.pdf"}
results:
  - "22 of 25 physics problems solved (88%) in round 1 of the IEEE IJCNN 2026 EXACT challenge."
teaser: /images/work/neuro-symbolic-rag/teaser.png
teaser_alt: "Pipeline diagram: a router sends each question to a fast path or to hybrid retrieval over a vector and graph database, then on to logic or physics templates"
teaser_caption: "The routing and retrieval half of the pipeline. The solver half sits to the right."
card_summary: "A neuro-symbolic hybrid database behind retrieval-augmented generation: an 8B LLM translates, Z3 and SymPy solve."
card_result: "22/25 (88%) physics problems, EXACT round 1"
permalink: /portfolio/neuro-symbolic-rag/
---
The EXACT challenge asks physics and logic questions, and the answering model must stay within 8 billion parameters and tight latency limits. A model that size misreads logic premises and slips on arithmetic. So the LLM only translates each question, and a solver gives the answer.

## Pipeline

The knowledge layer is a hybrid database. It holds embedded text for similarity search and a graph where PageRank pulls in neighbouring premises. It also caches earlier translations to first-order logic, so repeated premises skip the LLM.

An adaptive router scores each query's complexity with spaCy and connector words, and reads CPU, memory and GPU load. It then picks a fast path or a hybrid path without calling the LLM.

Logic questions go to forward chaining when the premises are Horn clauses. Otherwise Qwen3-8B writes a first-order-logic syntax tree, a sanitizer repairs common translation errors, and Z3 proves the answer. For physics, numbers are masked so a cached script can be reused. With no match, the LLM writes a SymPy script and a repair loop fixes its errors. Generated scripts run in a sandbox that blocks system calls and dynamic code execution and kills any script after 4 seconds.

One Qwen3-8B serves every generative step, which keeps the system inside the 8B limit. The two auxiliary encoders are 0.03B and 0.56B.

## Results and my part

The team solved 22 of 25 physics problems (88%) in round 1. No logic-track score is available. I led the team of four and designed the hybrid database, the knowledge layer shared by both reasoning engines.

<!--lang:vi-->

Cuộc thi EXACT ra đề vật lý và logic, và mô hình trả lời phải gói gọn trong 8 tỷ tham số và đáp ứng giới hạn độ trễ chặt. Mô hình cỡ này hay hiểu sai tiền đề logic và tính nhầm. Vì thế LLM chỉ lo dịch từng câu hỏi sang dạng hình thức, còn đáp án do bộ giải (solver) đưa ra.

## Pipeline

Tầng tri thức là một cơ sở dữ liệu lai. Trong đó có văn bản đã embedding để tìm theo độ tương đồng, và một đồ thị dùng PageRank để kéo thêm các tiền đề lân cận. Cơ sở dữ liệu này còn cache những bản dịch sang logic bậc nhất (first-order logic) đã làm trước đó, nên gặp lại tiền đề cũ thì không phải gọi LLM.

Bộ định tuyến thích ứng (adaptive router) chấm độ phức tạp của từng truy vấn bằng spaCy và các từ nối, đồng thời đọc mức tải CPU, bộ nhớ và GPU. Dựa vào đó, nó chọn nhánh nhanh hoặc nhánh lai mà không cần gọi LLM.

Câu hỏi logic có tiền đề là mệnh đề Horn thì đi qua suy diễn tiến (forward chaining). Các câu còn lại do Qwen3-8B viết thành cây cú pháp logic bậc nhất, một bước sanitizer sửa những lỗi dịch hay gặp, rồi Z3 chứng minh đáp án. Với đề vật lý, hệ thống che các con số đi để dùng lại được script đã cache. Không khớp script nào thì LLM viết một script SymPy mới, và một vòng lặp sửa lỗi xử lý các lỗi trong script đó. Mọi script sinh ra đều chạy trong sandbox. Sandbox này chặn lời gọi hệ thống, chặn thực thi mã động và dừng mọi script chạy quá 4 giây.

Mọi bước sinh văn bản dùng chung một Qwen3-8B, nhờ vậy cả hệ thống nằm trong giới hạn 8B. Hai encoder phụ có kích thước 0,03B và 0,56B.

## Kết quả và phần mình làm

Ở vòng 1, chúng mình giải đúng 22 trên 25 bài vật lý (88%). Nhánh logic không có điểm. Mình làm trưởng nhóm bốn người và thiết kế cơ sở dữ liệu lai, tức tầng tri thức mà cả hai bộ máy suy luận cùng dùng.

<!--lang:ja-->

EXACTチャレンジでは物理と論理の問題が出題され、回答するモデルは80億パラメータ以内に収め、厳しいレイテンシ制限も守る必要があります。この規模のモデルは、論理の前提を読み違えたり計算を間違えたりします。そこでLLMには各問題の形式化だけを任せ、答えはソルバーに出させる構成にしました。

## パイプライン

知識層はハイブリッドデータベースです。類似検索用に埋め込みベクトル化したテキストと、PageRankで近くの前提を引き込むグラフを持っています。一階述語論理への過去の翻訳結果もキャッシュしているので、同じ前提が再び出てきたときはLLMを呼ばずに済みます。

適応型ルーターは、spaCyと接続語を使って各クエリの複雑さをスコア化し、CPU、メモリ、GPUの負荷も読み取ります。そのうえで、LLMを呼ばずに高速パスとハイブリッドパスのどちらを使うかを決めます。

論理問題は、前提がホーン節なら前向き推論で解きます。そうでなければQwen3-8Bが一階述語論理の構文木を書き、サニタイザがよくある翻訳ミスを直してから、Z3が答えを証明します。物理問題では数値をマスクし、キャッシュ済みのスクリプトを使い回せるようにしています。合うものがなければLLMがSymPyスクリプトを書き、修正ループがそのエラーを直します。生成したスクリプトはサンドボックスで実行します。サンドボックスはシステムコールと動的なコード実行をブロックし、4秒を超えたスクリプトは強制終了します。

生成を行うステップはすべて1つのQwen3-8Bが担当するので、システム全体が8Bの制限内に収まります。2つの補助エンコーダは0.03Bと0.56Bです。

## 成果と担当部分

第1ラウンドでは、チームで物理問題25問中22問（88%）に正解しました。論理部門のスコアはありません。4人チームのリーダーを務め、2つの推論エンジンが共有する知識層、つまりハイブリッドデータベースを設計しました。
