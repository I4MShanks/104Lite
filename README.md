# 104Lite

Compre prep for **BITS U104 — Foundations of Measurement & Experimentation** (BITS Pilani, Sem I 2026–27).

**Live:** https://i4mshanks.github.io/104Lite/

## What's inside
- **10 mixed mock tests**: 20 questions in 30 minutes (60 marks). Each mock has 4 questions from Lecture 1 and 2 from each of the 8 experiments. About 14 of the 20 are numericals.
- **27 topic quizzes**: 3 for each topic (Lecture 1 plus the eight experiments). Each has 10 questions (6 numerical, 4 conceptual) in 15 minutes.
- **Marking**: +3 correct, −1 wrong, 0 unattempted.
- **Built-in scientific calculator** (DEG/RAD, log/ln, powers, √, scientific notation), plus a **formula sheet** for every topic.
- Results show a marks breakdown, topic-wise performance and worked solutions. "New numbers" gives a fresh variant of any quiz.
- **Log in or continue as a guest.** Accounts live on this device and browser, and each one has its own scores. Passwords are stored as a PBKDF2-SHA256 salted hash, never in plain text. There is no server, so accounts do not sync across devices.
- Dark and light mode.

## Topics
L1 Measurement Fundamentals · E1 BMI & BP (Bio) · E2 Venturi & Orifice (Chem Engg) · E3 pH & Analytical Chemistry · E4 Theodolite & Surveying (Civil) · E5 LVDT & Sensors (EEE) · E6 Ostwald Viscometer (Mech) · E7 Tablet Quality (Pharmacy) · E8 Surface Tension (Physics)

## How questions work
`assets/js/bank.js` holds two kinds of question for each topic:
- **Conceptual problems**, written by hand.
- **Numerical generators**, which create a question with new values each time, compute the correct answer in code, and build the wrong options from common mistakes (forgetting h, LC/2 vs LC/√2, not squaring, unit slips…).

Quizzes are seeded, so a given quiz stays the same until you ask for new numbers.

Edit pages in `src/*.body.html`, then run `./build.sh`.
