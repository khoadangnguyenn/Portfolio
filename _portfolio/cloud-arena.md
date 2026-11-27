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
live: "https://cloud-arena.vercel.app/"
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

<!--lang:vi-->

Cloud Arena là website cho thuê máy chủ game. Trang chạy trên PHP 8.2 thuần với một framework MVC tự viết, giao diện tông tối dựng bằng Tailwind và một trang quản trị riêng. Bốn người chúng mình làm dự án này cho môn lập trình web, và trang đang chạy thật trên Vercel dưới thương hiệu G-SERVER.

Môn học yêu cầu một ứng dụng web hoàn chỉnh. Trang cho thuê thì cần danh mục sản phẩm, giỏ hàng và đơn hàng, các trang nội dung và phần quản trị, nên chúng mình chia việc cho bốn người.

Những phần chúng mình đã làm:

- Một lõi MVC nhỏ gồm một điểm vào duy nhất, một router và một lớp truy cập cơ sở dữ liệu mỏng bọc quanh PDO.
- Cửa hàng với các gói máy chủ, giỏ hàng và luồng đặt hàng.
- Tin tức, bình luận, đánh giá, FAQ, quảng cáo và form liên hệ.
- Trang quản trị để quản lý sản phẩm, đơn hàng, bài viết, FAQ, quảng cáo, người dùng và phần cài đặt.
- Tải ảnh lên có kiểm tra kiểu MIME, xác thực ảnh raster, đặt tên file ngẫu nhiên và làm sạch file SVG.

Lược đồ cơ sở dữ liệu có 25 bảng, còn mã nguồn có 16 controller và 12 model. README hướng dẫn cài để chạy cục bộ trên XAMPP với PHP 8.2 trở lên, MySQL và rewrite rule của Apache.

Phần mình làm là mục tin tức. Người đọc có danh sách bài lọc được theo từ khoá và chuyên mục, kèm tin nóng và tin đang thịnh hành. Trang bài viết đếm lượt xem theo IP và referrer, có bình luận và lượt thích. Ở phía quản trị, biên tập viên thêm, sửa, xoá bài, tải ảnh lên, và xem số liệu thống kê cùng điểm SEO của từng bài.

<!--lang:ja-->

Cloud Arenaは、ゲームサーバーをレンタルできるWebサイトです。素のPHP 8.2と自作のMVCフレームワークで動いていて、フロントエンドはTailwindによるダークなデザイン、管理ダッシュボードは別に用意しています。Webプログラミングの授業で4人で作ったもので、G-SERVERというブランド名でVercel上に公開中です。

授業の課題は、ひととおり動くWebアプリケーションを作ることでした。レンタルサイトには商品カタログ、カートと注文、コンテンツページ、管理画面が必要なので、作業を4人で分担しました。

作ったものは次のとおりです。

- エントリポイントを1つにまとめた小さなMVCコア。ルーターと、PDOを薄くラップしたデータベース層を備えています。
- サーバープラン、カート、注文フローを持つショップ。
- ニュース記事、コメント、レビュー、FAQ、広告、お問い合わせフォーム。
- 商品、注文、記事、FAQ、広告、ユーザー、設定を管理する管理ダッシュボード。
- 画像アップロード。MIMEタイプの確認、ラスター画像の検証、ランダムなファイル名の付与、SVGのサニタイズを行います。

データベースのスキーマは25テーブルで、コードには16のコントローラーと12のモデルがあります。READMEでは、PHP 8.2以降、MySQL、Apacheのリライトルールを使ってXAMPP上にローカル環境を作る手順を説明しています。

担当したのはニュースセクションです。読者向けには、キーワードとカテゴリで絞り込める記事一覧と、速報やトレンドの記事を用意しました。記事ページではIPとリファラーをもとに閲覧数を数え、コメントといいねも付けられます。管理側では、編集者が記事の追加・編集・削除や画像のアップロードを行え、記事ごとのアクセス分析とSEOスコアも確認できます。
