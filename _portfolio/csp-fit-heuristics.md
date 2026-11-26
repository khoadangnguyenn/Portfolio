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

Cutting stock asks for the fewest stock sheets that still yield every piece demanded; the README calls it NP-hard. In this assignment a policy receives the sheets and the remaining demand at each step and returns one placement, as `{stock_idx, size, position}`, inside the `gym-cutting-stock` environment.

## What we built

`policy.py` holds two policies, and a submission class picks one by `policy_id` (1 for FFD, 2 for BFD).

- `FFDPolicy` sorts pieces by area, largest first, and sheets by area, largest first. It scans positions on each sheet and takes the first spot where the piece fits, trying the rotated piece too.
- `BFDPolicy` keeps the same piece order but scans every sheet and position and keeps the placement with the lowest `remaining_space`. It remembers the last sheet used in `self.past` and tries it before the others.

## How it works

The environment gives each sheet as a grid in which padding, free cells and placed pieces carry different codes. The policies read that grid through `_get_stock_size_` and `_can_place_`, inherited from the base `Policy` class. The image above is the README's demo of the provided greedy baseline, not of FFD or BFD.

## Results

The repo reports no scores and no FFD-versus-BFD comparison. `main.py` runs 100 episodes per policy with the episode index as seed and prints the environment's `info`; as committed it imports a `student_submissions` module that is not in the repo, so it needs that path fixed before it runs.
