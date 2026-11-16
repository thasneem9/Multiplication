# Multiplication Trainer (Tables 12–25) For aptitude and competitive exams

A fast, keyboard-friendly React web application for practicing mental multiplication across tables **12 through 25** (`×2` to `×9`). Built for rapid recall with an optional 6-second auto-submit timer, mistake review, and persistent best-score tracking.

---
<img width="612" height="530" alt="image" src="https://github.com/user-attachments/assets/9607c29e-83e7-4913-86aa-36c092ac7568" />

<img width="612" height="347" alt="image" src="https://github.com/user-attachments/assets/4595571b-70a6-486c-ae9b-d54106b1280a" />


## Features

- **Focused Table Selection (12–25):** Pick any table from `12` to `25` to practice its core multipliers (`×2` through `×9`, omitting trivial `×1` and `×10` facts).
- **Fisher–Yates Shuffled Rounds:** Every round generates all 8 facts for the chosen table in a fresh randomized order—no duplicates, no skipped numbers.
- **Toggleable 6-Second Timer Mode:** Practice under pressure with a live visual countdown bar that automatically locks and grades the question at `0.0s`, or switch Timer Mode **OFF** for relaxed practice.
- **Keyboard-First Workflow:** Auto-focuses the number input on every new question and shifts focus to the **Next** button upon submission, allowing full rounds to be completed using only the number pad and `Enter`.
- **Mistake Breakdown & Targeted Retry:** Displays a side-by-side comparison of wrong or timed-out answers against the correct answers at the end of each round, with a one-click **Retry Wrong** loop to drill missed facts.
- **Local Progress Persistence:** Automatically saves best scores per table and timer preferences in `localStorage` with zero backend setup required.

---

## Project Structure

```text
src/
├── components/
│   ├── TableMenu.jsx       # Landing grid for selecting tables 12–25 & viewing best scores
│   ├── QuizSession.jsx     # Manages round state, score calculation, and end-of-round review
│   └── QuestionCard.jsx    # Handles question display, 6s countdown timer, submit, and next flow
├── utils/
│   └── quizEngine.js       # Deterministic question generator & Fisher–Yates shuffle
├── styles/
│   └── app.css             # Responsive styling, progress bar, and feedback states
└── App.jsx                 # Top-level state, timer toggle, and localStorage persistence
