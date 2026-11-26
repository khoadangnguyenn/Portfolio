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

There are 12 configurations, from single-CPU scheduling to 4 CPUs with paging at 1 KB, 4 KB and 1 MB of RAM. Each has a saved output trace,. Make builds it into a single executable.
