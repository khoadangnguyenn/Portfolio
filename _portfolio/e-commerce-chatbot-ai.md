---
title: "E-Commerce Chatbot AI"
tagline: "A FastAPI chatbot backend that answers users with an OpenAI assistant, stores chat history and token usage in MongoDB, and replies on Facebook Messenger."
collection: portfolio
stack: [Python, FastAPI, OpenAI Assistants API, MongoDB, Docker, pytest]
code: "https://github.com/khoadangnguyenn/E-Commerce-Chatbot-AI"
card_summary: "A FastAPI chatbot service for e-commerce: OpenAI assistant replies, MongoDB chat history and token tracking, Facebook Messenger webhook."
permalink: /portfolio/e-commerce-chatbot-ai/
---

## Problem

A shop chatbot has to answer on Facebook Messenger, remember each conversation, and show how many tokens each user costs. This repo builds that backend.

## What it does

`POST /api/chatbot/chatbot/interact` (`app/routes/chatbot.py`) accepts a message of 1 to 4,000 characters, creates or loads the session, saves both sides of the exchange and records token usage. The reply comes from `app/api/chatbot_tool.py`, which sends the last five messages to an OpenAI Assistant thread and polls the run; if the run fails, the user gets a fallback message.

The Messenger webhook (`app/api/messenger_webhook.py`) answers Facebook's verification handshake and checks the HMAC-SHA256 signature when `FB_APP_SECRET` is set. It passes text messages to the chatbot and replies through the Graph API. Chat history and token counts per user and session live in MongoDB (`app/api/chat_history.py`, `app/api/token_tracker.py`, via `motor` and `pymongo`), and `docker-compose.yaml` starts MongoDB with Mongo Express.

## Results

18 pytest tests cover the chat flow, MongoDB access and token tracking.

## Limits and next steps

Connectors to Shopee, TikTok Shop and Amazon, and monitoring with Prometheus, are planned but not built yet.
