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
