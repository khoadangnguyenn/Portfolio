---
title: "E-Commerce Chatbot AI"
tagline: "A FastAPI chatbot backend that answers users with an OpenAI assistant, stores chat history and token usage in MongoDB, and replies on Facebook Messenger."
collection: portfolio
stack: [Python, FastAPI, OpenAI Assistants API, MongoDB, Docker, pytest]
code: "https://github.com/khoadangnguyenn/E-Commerce-Chatbot-AI"
card_summary: "A FastAPI chatbot service for e-commerce: OpenAI assistant replies, MongoDB chat history and token tracking, Facebook Messenger webhook."
permalink: /portfolio/e-commerce-chatbot-ai/
---

A shop chatbot has to answer on Facebook Messenger, remember each conversation, and show how many tokens each user costs. This repo is the backend that does all three.

A user message of 1 to 4,000 characters hits a single chat endpoint. The service creates or loads the session, saves both sides of the exchange and records token usage. For the reply, it sends the last five messages to an OpenAI Assistant thread and waits for the run to finish. If the run fails, the user gets a fallback message.

The Messenger webhook answers Facebook's verification handshake and checks the HMAC-SHA256 signature when an app secret is configured. Text messages go to the chatbot, and the reply goes back through the Graph API.

Chat history and token counts, per user and per session, live in MongoDB. A Docker Compose file starts MongoDB together with Mongo Express.

18 pytest tests cover the chat flow, MongoDB access and token tracking.

Connectors to Shopee, TikTok Shop and Amazon, and monitoring with Prometheus, are planned but not built yet.
