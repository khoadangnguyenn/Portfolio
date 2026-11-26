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

## Problem

Finding one moment in hours of video by typing a description is slow without an index. The content here is mostly Vietnamese, with on-screen text such as news tickers, and Vietnamese queries often arrive without diacritics. The system has to match all of that.

## What it does

- Embeds frames and detected objects with CLIP ViT-B/32 (512-d, OpenAI weights) in `backend/embedding_model_2.py`. Its docstring says the second version dropped the ASR, OCR and scene modalities to reduce noise.
- Searches FAISS indexes by text or by image (`backend/app/db/vector_db.py`).
- Handles on-screen-text queries in `backend/scripts/search_text_frame.py`. It detects words like "ticker" and "subtitle", filters on OCR text first, strips Vietnamese diacritics so unaccented queries match, and falls back to semantic search. An optional LLM step (`--use-llm`) expands the keywords.
- Serves the search through FastAPI routes under `/api/v1/search` (text, image, audio), `/ingest` and `/health` (`backend/app/main.py`).
- Ships a React frontend (`frontend/src/components/`) whose results open the source YouTube video at the matching frame.

The README describes a larger design: TransNetV2 scene cuts, Whisper ASR, PaddleOCR, YOLOv8, PhoBERT and Elasticsearch. The repo contains code for OCR, ASR and cross-encoder re-ranking, but the retrieval guide documents the CLIP-only path.

## Limits and next steps

The public repo is a snapshot of the competition code; the indexed data is not included, so it does not run on its own.
