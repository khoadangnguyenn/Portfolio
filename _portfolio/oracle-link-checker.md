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

Oracle, titled "V-link" in its README, is a Chrome extension popup. You paste a URL, press Check, and it tells you whether the site is safe. The check is a real call to the Google Safe Browsing API, so the extension works today, though the repo is an early prototype and parts of it are unfinished.

People follow links without knowing whether a site hosts malware or phishing. The README sets three aims: suggest links, verify them, and show information about the website. Only verification is built.

The extension is a Manifest V2 package named "Oracle Safety Checker", and its only extra permission is access to the Safe Browsing service. When you press Check, the popup sends the URL and asks for malware, social engineering and unwanted software matches on any platform.

A second check compares the domain with a hard-coded list of five known bad sites. A domain Google does not flag can therefore still be marked unsafe.

The popup shows "Website is safe!" or "Website is unsafe!". An unsafe result also gets a Report button that opens Google's phishing-report form. Link suggestions and website information are not built yet.
