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
