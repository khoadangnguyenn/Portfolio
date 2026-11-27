---
title: "Simple operating system"
excerpt: "Course assignment. A C simulation of an OS with a multi-level queue scheduler, paged virtual memory with swap, and system calls."
tagline: "A C simulation of an operating system: multi-level queue scheduling on several CPUs, paged virtual memory with swap, and system calls."
collection: portfolio
when: "Apr – May 2025"   # first/last push month on GitHub, from _data/projects.yml
start: "2025-04"
end: "2025-05"
context: "Course assignment, CO2018 (HCMUT)"
stack: [C, pthreads, Make]
code: "https://github.com/khoadangnguyenn/Simple-Operation-System"
card_summary: "C simulation of an OS: a 140-level multi-level queue scheduler on several CPUs, paged memory with swap, and system calls."
card_result: "12 test configurations, each with a saved output"
permalink: /portfolio/simple-os/
---

This is the standard course simulation of an operating system, about 2,550 lines of C for CO2018 at HCMUT. It covers a scheduler, synchronization and virtual-to-physical memory, with a system-call interface on top.

The scheduler is a multi-level queue with 140 priority queues, guarded by a mutex. Queue number i gets 140 minus i time slots per round, and the counters reset once no queue can run. Each simulated CPU is its own thread, and all of them share one clock with mutex-protected timer events.

Memory gives each process a page table with 256-byte pages, plus RAM and up to four swap devices. Processes can allocate, free, read and write memory. When RAM is full, the oldest page is swapped out, so replacement is FIFO. Three system calls exist: one lists the available calls, one maps memory and one kills all processes.

Each test is a plain-text config. The first line gives time slice, CPU count and process count. The second gives RAM size and up to four swap sizes. The remaining lines list start time, program and priority for each process. The 14 program files list calculate, allocate, free, read, write and system-call steps.

There are 12 configurations, from single-CPU scheduling to 4 CPUs with paging at 1 KB, 4 KB and 1 MB of RAM. Each has a saved output trace. Make builds it into a single executable.

<!--lang:vi-->

Đây là bài mô phỏng hệ điều hành chuẩn của môn CO2018 ở ĐH Bách khoa, viết bằng C, khoảng 2.550 dòng. Bài gồm bộ lập lịch, phần đồng bộ hoá và phần chuyển địa chỉ bộ nhớ ảo sang bộ nhớ vật lý, bên trên là một giao diện lời gọi hệ thống.

Bộ lập lịch là một hàng đợi đa mức (multi-level queue) gồm 140 hàng đợi ưu tiên, có mutex bảo vệ. Mỗi vòng, hàng đợi thứ i được chạy 140 trừ i khe thời gian; khi không còn hàng đợi nào chạy được thì các bộ đếm đặt lại từ đầu. Mỗi CPU mô phỏng là một thread riêng, và mọi CPU dùng chung một đồng hồ, các sự kiện hẹn giờ của đồng hồ đều có mutex bảo vệ.

Phần bộ nhớ cấp cho mỗi tiến trình một bảng trang, trang dài 256 byte, cùng với RAM và tối đa bốn thiết bị swap. Tiến trình có thể cấp phát, giải phóng, đọc và ghi bộ nhớ. Khi RAM đầy, trang cũ nhất bị đẩy ra swap, tức là thay trang theo FIFO. Có ba lời gọi hệ thống: một lời gọi liệt kê các lời gọi hiện có, một lời gọi ánh xạ bộ nhớ, một lời gọi kết thúc mọi tiến trình.

Mỗi bài kiểm thử là một file cấu hình dạng văn bản thuần. Dòng đầu ghi time slice, số CPU và số tiến trình. Dòng thứ hai ghi dung lượng RAM và tối đa bốn dung lượng swap. Các dòng còn lại ghi thời điểm bắt đầu, chương trình và độ ưu tiên của từng tiến trình. Có 14 file chương trình, mỗi file liệt kê các bước tính toán, cấp phát, giải phóng, đọc, ghi và gọi hệ thống.

Bộ kiểm thử có 12 cấu hình, từ lập lịch trên một CPU đến 4 CPU có phân trang với RAM 1 KB, 4 KB và 1 MB. Cấu hình nào cũng có sẵn output trace đã lưu. Make build toàn bộ thành một file thực thi duy nhất.

<!--lang:ja-->

HCMUTの授業CO2018で使われる標準的なOSシミュレーションで、C言語で約2,550行あります。スケジューラ、同期、仮想アドレスから物理アドレスへのメモリ変換を扱い、その上にシステムコールのインターフェースがあります。

スケジューラはマルチレベルキューで、140個の優先度キューをmutexで保護しています。i番目のキューには1ラウンドごとに140 − i個のタイムスロットが割り当てられ、どのキューも実行できなくなるとカウンタがリセットされます。シミュレートするCPUはそれぞれ独立したスレッドで、すべてのCPUが1つのクロックを共有します。タイマーイベントはmutexで保護しています。

メモリ管理では、各プロセスが256バイト単位のページを使うページテーブルを持ち、RAMと最大4台のスワップデバイスを使えます。プロセスはメモリの確保、解放、読み出し、書き込みができます。RAMがいっぱいになると最も古いページをスワップアウトするので、ページ置換はFIFOです。システムコールは3つで、使えるシステムコールの一覧表示、メモリのマッピング、全プロセスの終了です。

テストはそれぞれプレーンテキストの設定ファイルです。1行目はタイムスライス、CPU数、プロセス数です。2行目はRAMのサイズと、最大4つのスワップサイズです。残りの行には、プロセスごとに開始時刻、プログラム、優先度を書きます。14個のプログラムファイルには、計算、確保、解放、読み出し、書き込み、システムコールの各ステップが並んでいます。

設定は12種類あり、1 CPUでのスケジューリングから、4 CPUでRAMを1 KB、4 KB、1 MBにしたページングまでそろっています。どの設定にも保存済みの出力トレースがあります。Makeで1つの実行ファイルにビルドします。
