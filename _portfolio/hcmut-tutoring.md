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

HCMUT Tutoring is the account layer and landing page for a tutor programme at HCMUT: sign-up, login by role (student, tutor, manager), password reset and a public home page. It runs on Django REST Framework with MongoDB through `django-mongodb-backend`. The repo has no code for matching tutors to students or for scheduling, so it is the front door of the system and not the whole system.

## Problem

A tutor programme has three kinds of users with different rights, so the system first has to know who is signing in and as what.

## What was built

- `apps/login`: a custom `User` model with the roles `student`, `tutor` and `manager`, hashed passwords, and a service that rejects a login when the chosen role does not match the account. A `SessionActivity` record stores IP and user agent for each sign-in, and there are endpoints for profile, password change and logout.
- `apps/forgetpassword`: reset tokens that expire after 30 minutes and can be used once. The request endpoint answers the same way whether or not the email exists, so it does not reveal which addresses are registered.
- `apps/roleselect` and `apps/home`: a role picker, and read-only endpoints for statistics, top categories, courses, instructors and testimonials.
- `frontend/`: four pages (home, login, role select, forgot password) served as Django templates.
- `config/`: settings for MongoDB, WhiteNoise for static files, `build.sh` for deployment, and a `seed_users` command that creates one demo account per role.

## Results

After the migrations and the `seed_users` command, `manage.py runserver` brings up the site with demo accounts for each role.

## Limits and next steps

Tutor matching and scheduling are not built yet. Password reset returns its token in the response for the demo; a production version would send it by email.
