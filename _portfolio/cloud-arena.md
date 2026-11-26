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
card_summary: "A game-server rental platform in PHP and MySQL: product shop, cart, news with comments, and an admin dashboard."
permalink: /portfolio/cloud-arena/
---

Cloud Arena is a website for renting game servers, written in plain PHP 8.2 on a custom MVC framework, with a dark Tailwind front end and a separate admin dashboard. It was a web programming course project for four students.

## Problem

The course asked for a complete web application rather than a set of pages. A rental site needs a catalogue of server plans, a cart and orders, content pages, and an admin side to manage all of it, so the work had to be split across four people on one shared codebase.

## What we built

- A small MVC core in `app/core/`: `public/index.php` is the single entry point, `App.php` routes URLs (including `/admin/<name>` to `Admin<Name>` controllers), and `Database.php` wraps PDO.
- A shop: server plans in `products`, a cart and an order flow (`Cart.php`, `Order.php`, tables `carts`, `cart_items`, `orders`, `order_items`).
- Content and support: news posts, comments, reviews, FAQs, ads and a contact form.
- An admin dashboard with CRUD controllers for products, orders, posts, FAQs, ads, users and settings.
- `SecureUpload.php` for image uploads: MIME check with `finfo`, `getimagesize` on rasters, random file names and SVG sanitising.

## Results

The repo ships `database.sql` with 25 tables, 16 controllers and 12 models. The README gives a local setup on XAMPP (PHP 8.2 or later, MySQL, Apache `mod_rewrite`): create a `cloud_arena` database, import the SQL file, edit `app/config/config.php`. The repo has no test results, load figures or UI screenshot.

## My part

I built the news section. In the current code that is `Posts.php`, `AdminPosts.php` and `Post.php`. Readers get a list with keyword and category filters, breaking and trending items, and article pages that count views by IP and referrer, with comments and likes. The admin side adds, edits and deletes articles, uploads images and shows per-article analytics and an SEO score.
