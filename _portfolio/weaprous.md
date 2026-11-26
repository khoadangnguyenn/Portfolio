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

WeApRous is a networking course assignment (CO3093/CO3094 at HCMUT) on the client-server and peer-to-peer models. The core is built directly on TCP sockets, and the repo contains both models.

The client-server half is a threaded HTTP backend. It accepts a connection, starts one thread for that client, parses the request, calls the matching route handler and builds the reply. Routes are registered with a decorator that takes a method and a path, much like a small web framework.

In front of it sits a reverse proxy that picks a backend from the Host header. One virtual host in the config lists two backends and uses round-robin, with a counter per host to choose the next one. An unknown host or an unreachable backend gets a 404.

The peer-to-peer half has two chats:

- A one-to-one TCP chat where one side listens on a port and the other connects to it.
- A tracker-based chat where each peer registers with a tracker, asks it for the peer list as JSON, and then messages every peer directly.

A Flask demo adds login and registration. It issues a signed token valid for one hour and serves a chat page.
