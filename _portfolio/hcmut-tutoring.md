---
title: "HCMUT Tutoring"
tagline: "A Django and MongoDB backend for a university tutoring programme: role-based login for students, tutors and managers."
collection: portfolio
when: "Nov – Dec 2025"
start: "2025-11"
end: "2025-12"
stack: [Python, Django, Django REST Framework, MongoDB, HTML, CSS, JavaScript]
code: "https://github.com/khoadangnguyenn/HCMUT-TUTORING"
card_summary: "Django REST backend on MongoDB for HCMUT's tutor programme: three-role login, password reset, and a landing page fed by API."
permalink: /portfolio/hcmut-tutoring/
---

HCMUT Tutoring is the front door of a tutor programme at HCMUT. A tutor programme has three kinds of users with different rights, so the system first has to know who is signing in. It covers sign-up, login by role (student, tutor or manager), password reset and a public home page. It runs on Django REST Framework and MongoDB. Tutor matching and scheduling are not part of this repo.

The login app has a custom user model with the three roles and hashed passwords. A login is rejected when the chosen role does not match the account. Each sign-in stores the IP and user agent, and there are endpoints for profile, password change and logout.

Password reset issues a token that expires after 30 minutes and works once. The request endpoint answers the same way whether or not the email exists, so it never reveals which addresses are registered.

A role picker leads into login. Read-only endpoints feed the home page with statistics, top categories, courses, instructors and testimonials. Four pages (home, login, role select, forgot password) are served as Django templates. A build script handles deployment, and a seed command creates one demo account per role.

After the migrations and the seed command, the dev server brings up the site with a demo account for each role. Tutor matching and scheduling are still to build. The demo's reset endpoint returns its token in the response, and a production version would send it by email.

<!--lang:vi-->

HCMUT Tutoring là cửa ngõ vào chương trình Tutor của ĐH Bách khoa. Chương trình có ba loại người dùng với quyền khác nhau, nên trước hết hệ thống phải biết ai đang đăng nhập. Phần này lo đăng ký, đăng nhập theo vai trò (sinh viên, tutor hoặc người quản lý), đặt lại mật khẩu và trang chủ công khai. Backend chạy trên Django REST Framework và MongoDB. Ghép cặp tutor và xếp lịch không nằm trong repo này.

App đăng nhập dùng model người dùng tự định nghĩa, có ba vai trò và lưu mật khẩu đã băm. Nếu vai trò người dùng chọn không khớp với tài khoản, lần đăng nhập đó bị từ chối. Mỗi lần đăng nhập, hệ thống ghi lại IP và user agent. App còn có endpoint để xem hồ sơ, đổi mật khẩu và đăng xuất.

Khi đặt lại mật khẩu, hệ thống cấp một token chỉ dùng được một lần và hết hạn sau 30 phút. Endpoint nhận yêu cầu luôn trả lời giống nhau, dù email có tồn tại hay không, nên không ai dò ra được địa chỉ nào đã đăng ký.

Người dùng chọn vai trò trước rồi mới vào màn hình đăng nhập. Trang chủ lấy số liệu thống kê, các danh mục nổi bật, khóa học, giảng viên và cảm nhận của người học từ các endpoint chỉ đọc. Bốn trang (trang chủ, đăng nhập, chọn vai trò, quên mật khẩu) dùng template Django. Một script build lo phần triển khai, còn lệnh seed tạo sẵn cho mỗi vai trò một tài khoản demo.

Chạy migration và lệnh seed xong, chỉ cần bật dev server là có trang web với một tài khoản demo cho mỗi vai trò. Ghép cặp tutor và xếp lịch thì chưa làm. Ở bản demo, endpoint đặt lại mật khẩu trả token thẳng trong response; bản production sẽ gửi token qua email.

<!--lang:ja-->

HCMUT Tutoringは、HCMUTのチューター制度の入り口となるシステムです。チューター制度には権限の異なる3種類のユーザーがいるので、まず誰がサインインしているのかを見分ける必要があります。このシステムは、ユーザー登録、ロール別のログイン（学生、チューター、管理者）、パスワード再設定、公開ホームページを受け持ち、Django REST FrameworkとMongoDBで動いています。チューターのマッチングとスケジュール管理は、このリポジトリには含まれていません。

ログイン用のアプリには、3つのロールを持ち、パスワードをハッシュ化して保存するカスタムユーザーモデルがあります。選んだロールがアカウントと合わない場合、ログインは拒否されます。サインインのたびにIPアドレスとユーザーエージェントを記録します。プロフィール、パスワード変更、ログアウト用のエンドポイントもあります。

パスワード再設定では、30分で期限が切れる1回限りのトークンを発行します。再設定を申請するエンドポイントは、メールアドレスが存在するかどうかに関係なく同じ応答を返します。そのため、どのアドレスが登録済みかは外から分かりません。

ログイン画面の前に、ロールを選ぶ画面があります。ホームページには、統計、人気カテゴリ、コース、講師、受講者の声を表示し、データは読み取り専用のエンドポイントから取得します。4つのページ（ホーム、ログイン、ロール選択、パスワードを忘れた場合）はDjangoテンプレートで配信しています。デプロイはビルドスクリプトで行い、seedコマンドでロールごとにデモアカウントを1つずつ作ります。

マイグレーションとseedコマンドを実行したあと開発サーバーを起動すると、各ロールのデモアカウントが入った状態でサイトが立ち上がります。チューターのマッチングとスケジュール管理はまだ実装していません。デモ版では再設定用のエンドポイントがトークンをレスポンスにそのまま含めて返しますが、本番版ではメールで送る形になります。
