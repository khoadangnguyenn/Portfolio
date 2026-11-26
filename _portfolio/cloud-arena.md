---
title: "Cloud Arena"
tagline: "A game-server rental website with a shop, news section and admin dashboard, on a hand-written PHP MVC core."
collection: portfolio
when: "May 2026"
start: "2026-05"
end: "2026-05"
role: "Team of four; owner of the news module"
context: "Web programming course project"
stack: [PHP, MySQL, Tailwind CSS, JavaScript]
code: "https://github.com/khoadangnguyenn/Cloud-Arena"
links:
  - label: "Live site"
    url: "https://cloud-arena.vercel.app/"
teaser: /images/work/cloud-arena/home.jpg
teaser_alt: "Cloud Arena home page: a dark hero with server plans and a live server console"
gallery:
  - src: /images/work/cloud-arena/products.jpg
    caption: "Server plans, with search, category and price filters."
  - src: /images/work/cloud-arena/news.jpg
    caption: "The news section I built: categories, search and a featured story."
  - src: /images/work/cloud-arena/article.jpg
    caption: "An article page with view count, likes, sharing and trending posts."
card_summary: "A game-server rental platform in PHP and MySQL: product shop, cart, news with comments, and an admin dashboard."
permalink: /portfolio/cloud-arena/
---

Cloud Arena is a website for renting game servers. It runs on plain PHP 8.2 with a custom MVC framework, a dark Tailwind front end and a separate admin dashboard. Four of us built it for a web programming course, and it is live on Vercel under the brand G-SERVER.

The course asked for a complete web application. A rental site needs a catalogue, a cart and orders, content pages and an admin side, so we split the work four ways.

What we built:

- A small MVC core with one entry point, a router and a thin database layer over PDO.
- A shop with server plans, a cart and an order flow.
- News posts, comments, reviews, FAQs, ads and a contact form.
- An admin dashboard to manage products, orders, posts, FAQs, ads, users and settings.
- Image uploads that check the MIME type, validate raster images, use random file names and sanitise SVGs.

The database schema has 25 tables, and the code has 16 controllers and 12 models. The README describes a local setup on XAMPP with PHP 8.2 or later, MySQL and Apache rewrite rules.

I built the news section. Readers get a list with keyword and category filters and breaking and trending items. Article pages count views by IP and referrer and carry comments and likes. In the admin side, editors add, edit and delete articles, upload images, and see per-article analytics and an SEO score.
