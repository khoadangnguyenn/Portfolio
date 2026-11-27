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

<!--lang:vi-->

Oracle (README gọi là "V-link") là popup của một tiện ích Chrome. Bạn dán URL vào, bấm Check, và popup cho biết trang đó có an toàn không. Phép kiểm gọi thật tới Google Safe Browsing API nên tiện ích đã dùng được ngay. Dù vậy, repo vẫn là một nguyên mẫu ban đầu và còn vài phần dang dở.

Nhiều người bấm vào liên kết mà không biết trang đó có chứa mã độc hay là trang lừa đảo (phishing). README đặt ra ba mục tiêu: gợi ý liên kết, kiểm tra liên kết và hiển thị thông tin về website. Hiện mới làm xong phần kiểm tra.

Tiện ích là một gói Manifest V2 tên "Oracle Safety Checker". Quyền bổ sung duy nhất nó xin là quyền truy cập dịch vụ Safe Browsing. Khi bạn bấm Check, popup gửi URL đi và hỏi xem URL có khớp với mã độc, social engineering hay phần mềm không mong muốn trên bất kỳ nền tảng nào không.

Lớp kiểm thứ hai so tên miền với một danh sách năm trang độc hại đã biết, viết cứng trong code. Vì vậy, một tên miền mà Google không gắn cờ vẫn có thể bị báo là không an toàn.

Popup hiện "Website is safe!" hoặc "Website is unsafe!". Khi kết quả là không an toàn, popup có thêm nút Report để mở biểu mẫu báo cáo phishing của Google. Phần gợi ý liên kết và phần thông tin website vẫn chưa làm.

<!--lang:ja-->

Oracle（READMEでの名前は「V-link」）は、Chrome拡張機能のポップアップです。URLを貼り付けてCheckを押すと、そのサイトが安全かどうかを表示します。判定にはGoogle Safe Browsing APIを実際に呼び出しているので、今の時点でも動作します。ただしリポジトリは初期のプロトタイプで、未完成の部分もあります。

多くの人は、リンク先がマルウェアやフィッシングのサイトかどうかを知らないまま開いています。READMEには、リンクの提案、リンクの検証、Webサイト情報の表示という3つの目標が書かれています。このうち実装できているのは検証だけです。

拡張機能は「Oracle Safety Checker」という名前のManifest V2パッケージで、追加で求める権限はSafe Browsingサービスへのアクセスだけです。Checkを押すと、ポップアップがURLを送信し、すべてのプラットフォームを対象に、マルウェア、ソーシャルエンジニアリング、望ましくないソフトウェアのいずれかに当てはまるかを問い合わせます。

2つ目のチェックでは、コードに直接書き込んだ既知の危険サイト5件のリストとドメインを照合します。そのため、Googleが警告しないドメインでも「安全でない」と判定されることがあります。

ポップアップには「Website is safe!」か「Website is unsafe!」が表示されます。安全でないと判定された場合は、Googleのフィッシング報告フォームを開くReportボタンも出ます。リンクの提案とWebサイト情報の表示は、まだ実装していません。
