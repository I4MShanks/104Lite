# 104Lite

A study site for **BITS U104 — Foundations of Measurement & Experimentation** (BITS Pilani, Semester I 2026–27).

**Live site:** https://i4mshanks.github.io/104Lite/

## What's inside

| Page | What it has |
|---|---|
| **Home** (`index.html`) | Course mastery ring, progress stats, the **4 comprehensive sample tests** (27 questions each, 3 from every lecture) and all lecture cards |
| **Lecture** (`lecture.html?id=…`) | For each of the 9 lectures: **video overview**, **podcast**, **Notes**, **Lab Manual**, **Result Booklet** (editable observation table + live calculator + worked example) and a 12-question **quiz** |
| **Lectures** | Searchable lecture library |
| **Practice** | All sample tests and lecture quizzes with best scores |
| **Test** (`test.html?id=…`) | Timed assessment: question navigator, flagging, formula sheet, scoring, per-lecture breakdown and explanations |
| **Vault** | Original lecture slide PDFs, Compre Guide chapters 1–3 and any podcast/video files |

### Lectures
1. Foundations of Measurement & Experiments — Dr. Biswadip Shome (ME)
2. Measurement of Biological Systems — Prof. S. K. Verma (Bio) · *BMI vs BP*
3. Industrial Instrumentation: Pressure & Flow — Prof. A. K. Pani (Chem Engg) · *Venturi & orifice*
4. Analytical Chemistry — Prof. Bibhas R. Sarkar (Chem) · *pH scale with turmeric*
5. Surface Tension by Capillary Rise — Prof. Raj Kumar Gupta (Physics)
6. Basics of Measurement & the LVDT — Dr. Sujan Yenuganti (EEE)
7. Uncertainty & the Ostwald Viscometer — Dr. Biswadip Shome (ME)
8. Evaluation of Tablets — Dr. Jagpreet Singh Sidhu (Pharmacy)
9. Introduction to Surveying — Dr. Saurabh Gupta (Civil) · *Theodolite*

## Podcasts & video overviews
- When a Gemini Notebook (NotebookLM) audio or video overview has been added to `assets/media/` and listed in `assets/js/media.js`, the lecture page plays it.
- Otherwise the page uses a **narrated slide video** (the real lecture slides with synced narration and captions) and a **two-host podcast**, both voiced by the browser's text-to-speech. Transcripts are included.
- `assets/notebooklm/*.txt` are the source text packs used to generate the NotebookLM overviews.

## Editing
Content lives in `assets/js/lectures.js` (notes, narration, podcast scripts, lab manual, booklet) and `assets/js/questions.js` (108 MCQs).
Page markup lives in `src/*.body.html`; run `./build.sh` to rebuild the root HTML files.
Progress, scores and booklet entries are stored only in your browser (localStorage).

## Credits
Lecture slides © their respective instructors and BITS Pilani. They are shared here for course study only.
Design system: *Foundations of Measurement* (Plus Jakarta Sans / Inter / JetBrains Mono, slate + precision cyan).
