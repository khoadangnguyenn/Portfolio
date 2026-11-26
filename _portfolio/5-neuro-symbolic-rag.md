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
teaser_caption: "The routing and retrieval half of the pipeline; the solver half sits to the right."
card_summary: "A neuro-symbolic hybrid database behind retrieval-augmented generation: an 8B LLM translates, Z3 and SymPy solve."
card_result: "22/25 (88%) physics problems, EXACT round 1"
permalink: /portfolio/neuro-symbolic-rag/
---

## Problem

The EXACT challenge asks physics and logic questions, and the answering model must stay within 8 billion parameters and tight latency limits. A model that size misreads logic premises and slips on arithmetic. We let it translate the question and left the answer to a solver.

## What we built

- A shared `HybridDB` (`knowledge/knowledge.py`): ChromaDB vectors with `bge-small-en-v1.5` embeddings, plus a NetworkX graph where PageRank pulls in neighbouring premises. It also caches earlier translations to first-order logic, so repeated premises skip the LLM.
- An adaptive router (`orchestration/router.py`) that scores query complexity with spaCy and connector words, reads CPU, memory and GPU load, and picks a fast path or a hybrid path without calling the LLM.
- A logic engine: forward chaining (`engines/horn_reasoner.py`) when the premises are Horn clauses. Otherwise Qwen3-8B writes a first-order-logic AST, a sanitizer repairs common translation errors, and Z3 proves the answer.
- A physics engine (`engines/physics.py`): numbers are masked as `<NUM>` to reuse a cached script; if there is no match, the LLM writes a SymPy script and a repair loop fixes errors.
- A sandbox (`engines/executors.py`) that blocks `os`, `sys`, `exec` and `eval` by AST inspection and kills any script after 4 seconds.

One Qwen3-8B serves every generative step, which keeps the system inside the 8B limit; the two auxiliary encoders are 0.03B and 0.56B.

## Results

The team solved 22 of 25 physics problems (88%) in round 1. The sources give no score for the logic track, so none is claimed here. The repo has 21 test files, including tests for the Horn reasoner and the AST-to-Z3 path.

## My part

I led the team of four and designed the Neuro-Symbolic HybridDB, the knowledge layer shared by both reasoning engines.
