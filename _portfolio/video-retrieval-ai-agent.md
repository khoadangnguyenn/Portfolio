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
