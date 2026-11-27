---
title: "Cutting stock heuristics"
excerpt: "Course assignment. First Fit Decreasing and Best Fit Decreasing policies for a 2D cutting stock environment."
tagline: "First Fit Decreasing and Best Fit Decreasing policies that decide where each piece is cut in a 2D cutting stock environment."
collection: portfolio
when: "Nov 2025"   # first/last push month on GitHub, from _data/projects.yml
start: "2025-11"
end: "2025-11"
context: "University course assignment"
stack: [Python, NumPy, Gymnasium, gym-cutting-stock]
code: "https://github.com/khoadangnguyenn/CSP-FitHeuristics"
teaser: /images/work/csp-fit-heuristics/teaser.jpg
teaser_alt: "Grid of stock sheets with coloured rectangles packed into the top rows and empty grey sheets below"
teaser_caption: "The README's greedy-policy demo: each cell is a stock sheet, coloured blocks are placed pieces."
card_summary: "Two bin-packing heuristics, First Fit Decreasing and Best Fit Decreasing, written as policies for a 2D cutting stock Gymnasium environment."
permalink: /portfolio/csp-fit-heuristics/
---

Cutting stock asks for the fewest stock sheets that still yield every piece demanded, a problem the README calls NP-hard. In this assignment, a policy sees the sheets and the remaining demand at each step and returns one placement: which sheet, what piece size and where. It runs inside the gym-cutting-stock environment.

We wrote two greedy policies, and a submission class picks one by an id. Both sort pieces by area, largest first, and differ in how they choose a spot.

First Fit Decreasing also sorts the sheets by area, largest first. It scans positions on each sheet and takes the first spot where the piece fits, trying the rotated piece too.

Best Fit Decreasing scans every sheet and every position and keeps the placement that leaves the least free space. It remembers the last sheet it used and tries that one before the others.

The environment describes each sheet as a grid, with different codes for padding, free cells and placed pieces. The policies read that grid to test whether a piece fits. The image above is the README's demo of the provided greedy baseline, so it does not show First Fit or Best Fit.

The repo reports no scores and no comparison of the two. A test script runs 100 episodes per policy, using the episode index as the seed, and prints the environment's info.

<!--lang:vi-->

Bài toán cắt vật liệu (cutting stock) tìm số tấm vật liệu ít nhất mà vẫn cắt đủ mọi mảnh được yêu cầu; README của repo gọi đây là bài toán NP-khó. Trong bài tập này, ở mỗi bước, chính sách (policy) nhìn các tấm vật liệu cùng số mảnh còn phải cắt, rồi trả về đúng một lần đặt mảnh: tấm nào, mảnh kích thước bao nhiêu và đặt ở đâu. Chính sách chạy trong môi trường gym-cutting-stock.

Chúng mình viết hai chính sách tham lam (greedy), và lớp dùng để nộp bài chọn một trong hai theo id. Cả hai đều xếp các mảnh theo diện tích, mảnh lớn trước, và chỉ khác nhau ở cách chọn chỗ đặt.

First Fit Decreasing xếp cả các tấm vật liệu theo diện tích, tấm lớn trước. Nó dò lần lượt các vị trí trên từng tấm và đặt mảnh vào chỗ vừa đầu tiên tìm được, có thử cả khi xoay mảnh.

Best Fit Decreasing dò mọi tấm và mọi vị trí, rồi giữ cách đặt để lại ít chỗ trống nhất. Nó nhớ tấm vừa dùng gần nhất và thử tấm đó trước các tấm khác.

Môi trường biểu diễn mỗi tấm vật liệu thành một lưới, dùng mã riêng cho ô đệm (padding), ô trống và ô đã có mảnh. Hai chính sách đọc lưới này để kiểm xem mảnh có vừa hay không. Hình phía trên là demo trong README cho chính sách tham lam baseline mà đề bài cho sẵn, nên hình không minh hoạ First Fit hay Best Fit.

Repo không ghi điểm số nào và cũng không so sánh hai chính sách. Một script kiểm thử chạy 100 episode cho mỗi chính sách, lấy chỉ số của episode làm seed, rồi in ra info mà môi trường trả về.

<!--lang:ja-->

カッティングストック問題は、要求されたピースをすべて切り出しつつ、使う素材シートの枚数をできるだけ少なくする問題です。READMEではNP困難な問題とされています。この課題では、ポリシーが各ステップで素材シートと残りの需要を見て、配置を1つ返します。どのシートの、どこに、どのサイズのピースを置くかという配置です。実行環境はgym-cutting-stockです。

チームで貪欲法のポリシーを2つ書き、提出用のクラスがidでどちらを使うかを切り替えます。どちらもピースを面積の大きい順に並べ、違うのは置き場所の選び方だけです。

First Fit Decreasingは、素材シートも面積の大きい順に並べます。各シート上の位置を順に調べ、ピースが収まる最初の場所に置きます。ピースを回転させた向きも試します。

Best Fit Decreasingは、すべてのシートのすべての位置を調べ、残る空きが最も少ない配置を選びます。最後に使ったシートを覚えておき、ほかのシートより先にそのシートを試します。

環境は各シートをグリッドで表し、パディング、空きセル、配置済みのピースにそれぞれ別のコードを割り当てています。ポリシーはこのグリッドを読んで、ピースが収まるかどうかを判定します。上の画像はREADMEにあるデモで、課題で用意された貪欲法のベースラインの動作です。First FitやBest Fitの動作ではありません。

リポジトリにはスコアも、2つのポリシーの比較も載っていません。テストスクリプトはポリシーごとに100エピソードを実行し、エピソード番号をシードにして、環境が返すinfoを出力します。
