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
