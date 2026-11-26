---
title: "Oracle (V-link): link safety checker"
tagline: "A Chrome extension popup that asks Google Safe Browsing whether a URL is malware or phishing, with a local blocklist as a second check."
collection: portfolio
when: "Apr – Dec 2024"
start: "2024-04"
end: "2024-12"
stack: [JavaScript, HTML, CSS, Google Safe Browsing API, Flask]
code: "https://github.com/khoadangnguyenn/oracle-project"
card_summary: "A browser extension popup that checks a pasted URL against Google Safe Browsing and a small blocklist, then shows safe or unsafe."
permalink: /portfolio/oracle-link-checker/
---

Oracle, titled "V-link" in the README, is a browser extension popup: paste a URL, press Check, and it says whether the site is safe. The check is a real call to the Google Safe Browsing API, so the extension works, but the repo is an early prototype and parts of it are unfinished.

## Problem

People follow links without knowing whether a site hosts malware or phishing. The README sets three aims: suggest links, verify them, and show information about the website. The code implements the verification part only.

## What was built

- `manifest.json` declares a Manifest V2 extension named "Oracle Safety Checker" with a popup (`oracle.html`) and permission for `safebrowsing.googleapis.com`.
- `oracle.js` reads the URL from the popup and posts it to the Safe Browsing `threatMatches:find` endpoint, asking for `MALWARE`, `SOCIAL_ENGINEERING` and `UNWANTED_SOFTWARE` matches on any platform.
- A second check compares the domain with a hard-coded list of five known bad sites, so a domain Google does not flag can still be marked unsafe.
- The popup shows "Website is safe!" or "Website is unsafe!", and for unsafe results adds a Report button that opens Google's phishing-report form.

## Limits and next steps

Link suggestions and website information, both listed in the README, are not built yet.
