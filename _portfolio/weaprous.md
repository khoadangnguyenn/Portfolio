---
title: "WeApRous"
excerpt: "Course assignment. An HTTP server, a virtual-host reverse proxy with round-robin and a peer-to-peer chat, all written on raw TCP sockets in Python."
tagline: "A small HTTP stack on raw TCP sockets: a virtual-host reverse proxy with round-robin, a REST router and two peer-to-peer chats."
collection: portfolio
when: "Nov 2025"   # first/last push month on GitHub, from _data/projects.yml
start: "2025-11"
end: "2025-11"
context: "Course assignment, CO3093/CO3094 (HCMUT)"
stack: [Python, TCP sockets, threading, Flask]
code: "https://github.com/khoadangnguyenn/WeApRous"
card_summary: "Network programming assignment: a threaded HTTP backend, a round-robin reverse proxy and two peer-to-peer chats on raw Python sockets."
permalink: /portfolio/weaprous/
---

This is a networking course assignment on the client–server and peer-to-peer paradigms, and the repo shows both built from sockets rather than a web framework. Course: CO3093/CO3094 at HCMUT.

## What is in the repo

- `daemon/backend.py` accepts TCP connections and starts one thread per client. `daemon/httpadapter.py` then parses the request (`request.py`), calls the route hook and builds the reply (`response.py`).
- `daemon/weaprous.py` is a decorator router: `@app.route('/user', methods=['GET'])` registers a handler for a method and path.
- `daemon/proxy.py` and `config/proxy.conf` route by the `Host` header. The `app2.local` block lists two backends with `dist_policy round-robin`, and a per-host counter picks the next one. An unknown host or an unreachable backend gets a 404.
- `p2p_chat.py` is a one-to-one TCP chat (`--listen PORT` on one side, `--peer HOST:PORT` on the other). `apps/chat_peer.py` instead registers with a tracker, asks it for the peer list as JSON, and messages each peer directly.
- `server_login.py` and `www/` hold a Flask login and registration demo that issues a signed token valid for one hour, plus a chat page.
