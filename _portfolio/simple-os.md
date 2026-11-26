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

This is the standard course simulation of an operating system's three main parts, a scheduler, synchronization and virtual-to-physical memory, with a system-call interface on top, in about 2,550 lines of C under `src/`. The license headers name the course as CO2018.

## What is in the repo

- `src/sched.c` and `src/queue.c` implement a multi-level queue with `MAX_PRIO` 140 priority queues. Queue `i` gets `MAX_PRIO` minus `i` slots per round, and the counters reset when no queue can run. A mutex guards the queues.
- `src/os.c` and `src/timer.c` run one thread per simulated CPU on a shared clock, with mutex-protected timer events.
- `src/mm.c`, `src/mm-vm.c`, `src/mm-memphy.c` and `src/libmem.c` give each process a page table with 256-byte pages, RAM plus up to four swap devices, and allocate, free, read and write operations. `find_victim_page` picks the oldest page, so replacement is FIFO.
- `src/syscall.tbl` lists three system calls: `listsyscall` (0), `memmap` (17) and `killall` (101).

## How it works

Each test is a plain-text config in `input/`. Its first line is time slice, CPU count and process count. The second is RAM size and up to four swap sizes, and the rest list start time, program name and priority. Programs live in `input/proc/` (14 files) and are lists of `calc`, `alloc`, `free`, `read`, `write` and `syscall` steps.

## Results

`input/` holds 12 configurations, from single-CPU scheduling to 4 CPUs with paging at 1 KB, 4 KB and 1 MB of RAM. The repo also carries a saved trace for each in `output/`, such as `output/os_1_mlq_paging.output`, which shows the page-table dump after a free. I did not rebuild it. Build and run are `make all` then `./os`.
