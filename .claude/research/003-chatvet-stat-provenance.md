# 003 — ChatVET case-stall statistics: source ledger

**Date:** 2026-07-25 · **Method:** five parallel fact-check agents, one per cited figure,
verifying each numeric component separately against primary literature (WebSearch + WebFetch
to publisher pages). Triggered by the rebuild of `CaseStallTimeline` from Andrew's Figma
diagram "Where an average case stalls" (`CwHbrO2k4Euk4s3MDviQMy`, node `6956:7164`).

**Why this file exists:** the ChatVET study's thesis is "in clinical software, provenance
isn't polish; it's what makes an answer usable." Every number the study prints has to
survive the same standard. Four of the diagram's original figures did not. This is the
ledger of what shipped, what was cut, and why — so nobody re-introduces a cut number later.

---

## What ships on the figure now

Each stall card renders its own citation and study population. This is deliberate: the
figure demonstrates the study's argument instead of asserting it.

| Card | Figure | Source | Population | Status |
|---|---|---|---|---|
| Protocol search | **2 min** to answer a clinical question; **64%** not pursued during the visit | Ely JW et al., *BMJ* 1999;319(7206):358-61 | **Human** — 103 US family physicians, 1,101 questions | The one human proxy. Labelled as such on the card. |
| Dose calculation | **63%** of reported perianesthetic med errors are wrong dose; **80%** of those are calculation errors | Pinho RH, Tscheng D, Cheema JS, Pang DSJ, *Am J Vet Res* 2024;85(9):ajvr.24.04.0119 | **Veterinary** — 48 voluntary reports, 6 small-animal practices, Calgary | Exactly attested, same sentence for both halves. |
| Client translation | **29%** correctly recall medication side effects; **68.9%** of discharge instructions overall | Flegel T et al., *J Vet Intern Med* 2024;38(3):1639-1650 | **Veterinary** — 151 owners at discharge, 70 at 2 weeks | Open access. Replaced the borrowed human figures. |
| History re-entered | **9 min 49 s** median consult; note-writing excluded from the measurement | Robinson NJ, Dean RS, Cobb M, Brennan ML, *Vet Record* 2014 | **Veterinary** — 182 consultations, direct stopwatch observation | The card's argument is the *absence* of a measurement. |

Also cited, in `PainOverlap` and the S3 body copy:

| Figure | Source | Population |
|---|---|---|
| **47%** of owners noncompliant; **47%** report nobody showed them how to give the medication | Odom TF, Riley CB, Benschop J, Hill KE, *Animals* 2024;14(17):2557 | **Veterinary** — dog owners, New Zealand |

---

## Cut, and why — do not re-introduce

### 1. "32 min if the question gets deferred" — REFUTED
Traced to Daei A et al., *Int J Med Inform* 2020;139:104144, which says: *"The time taken to
find the answers to the questions was between 2 to 32 min."* That is **a range across 73
different studies** — the spread of reported average search times *between* studies. The
diagram split the two endpoints of one range into two invented scenarios (lower bound = "in
the room", upper bound = "deferred"). The source does not merely fail to support the
construction, it refutes it: the 2 and the 32 are the same sentence's endpoints and cannot
be a before/after pair. No located study measures how long a *deferred* clinical question
takes to resolve.

*If a contrast figure is ever wanted:* Chambliss ML, Conley J, *J Fam Pract* 1996;43(2):140-4
— MEDLINE searches averaged 27 min/question. But those searches were performed by **medical
librarians**, not by the clinician who deferred the question, so it is not "what deferral
costs a vet" either.

### 2. "5–10 min per patient" re-entering history — UNATTESTED
No peer-reviewed source, veterinary or human. Every occurrence traces to AI-scribe **vendor
marketing** (PawfectNotes, HappyDoc, whiskr.ai, Digitail, co.vet, VetGeni), citing each
other in a loop. Two specific rot markers found in that chain:
- A **fabricated citation**: "JAVMA, Vol. 264, 2024" attached to an adjacent claim. JAVMA
  Vol. 262 is 2024; Vol. 264 is 2026. No such article exists.
- The one real citation a vendor did supply (Steffey MA et al., *Front Vet Sci* 2023,
  doi:10.3389/fvets.2023.1184526) was checked directly and **quantifies no time at all** —
  it is a narrative review of burnout that discusses administrative burden qualitatively.

Measured human documentation time contradicts the range anyway: **3.9 min/encounter**
(Overhage & McCallie, *Ann Intern Med* 2020;172(3):169-174 — EHR logs, ~155,000 physicians;
16 min 14 s total EHR time per encounter, of which 24% documentation), with ambient-scribe
control arms at 5.1–5.4 min/note. The likely origin of the inflation is a category slip:
total per-encounter EHR time remembered as documentation time.

### 3. "64% are never pursued at all" — OVERSTATED WORDING (number kept)
702/1101 = 63.8% is exact. But Ely's wording is *"not **immediately** pursued"*, and the
Results say *"not pursued **during the observation period**"* — two half-days per physician.
"Never pursued at all" asserts permanent abandonment, which the study structurally could not
measure. Now rendered as **"aren't pursued during the visit."**

Note also 64% is a single-study point, not a settled rate. The literature spans ~45–70%:
Ely's own later study (*JAMIA* 2005;12(2):217-24) found 45% not pursued; Gorman & Helfand
(*Med Decis Making* 1995;15(2):113-9) found ~70%.

### 4. "Written instructions lift correct dosing to 71%" — OUTCOME SWAP
Hoek AE et al., *Eur J Emerg Med* 2013;20(3):210-213 measured **recall/comprehension of
instructions** by questionnaire (40% verbal-only → 71% verbal + written). It did **not**
measure dosing behaviour, pill counts, refills, or adherence. Describing 71% as "correct
dosing" asserts a behavioural outcome that was never observed. Two further problems: the
design is a non-randomised sequential before/after, so "was associated with" is the
defensible verb, not "lifts"; and the bare 71% without its 40% baseline reads as an absolute
compliance rate in the wild, which it is not.

This error was **inherited, not introduced** — Flegel et al. 2024 itself drifts from "recall"
to "correct use" when citing Hoek as its ref 10.

Replaced with the veterinary equivalent (Flegel's own measured numbers) rather than reworded.

---

## Scope caveats on figures that DID survive

- **Pinho 63%/80%** is genuinely veterinary and exactly attested — but the denominator is 48
  **voluntarily reported** **perianesthetic** medication errors from 6 small-animal practices
  in one city. It excludes dispensing, take-home prescriptions and ward medication. Wilson
  95% CI on 30/48 is roughly 48–75%. Do not render it as "of veterinary medication errors"
  full stop; the published wrong-dose share across veterinary studies spans ~51–68%
  (Wallis 2019 ~57.8%; Frontiers 2025 68.0%; teaching-hospital 2025 51%).
  **Also:** 69% of those reports were near misses and **none caused harm**. Never pair these
  numbers with copy or imagery implying patient harm — but "the system depends on humans
  catching mistakes downstream" is both supported and the better design argument.
- **Ely 2 min** is a *ceiling* in the paper's own abstract ("less than 2 minutes"), and the
  distribution is heavily right-skewed — **median 60 s**, mean 118 s, SD 169 s. If the study
  ever wants the typical clinician experience rather than the mean, 1 minute is more honest.
  This is *not* Sackett's "2-minute rule" (a normative rule of thumb, not a measurement) —
  do not cite Sackett for it.
- **Sinsky et al.** *Ann Intern Med* 2016;165(11):753-760 (nearly 2 h desk work per 1 h face
  time) is solid and correctly identified, but: published as "**nearly** 2 additional hours",
  underlying ratio 1.82:1 (27.0% face time vs 49.2% EHR/desk), scoped "**within the clinic
  day**", and human ambulatory physicians. The separate "1–2 hours after-hours each night"
  finding is self-reported diary, n=21 — do not silently fold it in. Currently cut from the
  figure; retained here in case it is ever wanted.
  *More interesting unused number from the same paper:* physicians spend **37.0% of in-room
  time on EHR and desk work** — that is screen time *during* the visit, i.e. the thing a
  better interface actually touches.

## Still outstanding

- The stall map renders **`n = __ PENDING`** — the case-walkthrough count is Andrew's to fill.
- `PainOverlap`'s client row is the vets' account of their clients plus published veterinary
  data. **No pet owners were interviewed.** The figure footnote says so and must keep saying
  so unless that changes.

---

## Addendum 2026-08-05 — MAU updated to 1,100 across 20+ countries

Andrew (in chat, 2026-08-05): "the MAUs is actually 1,100 across 20+
countries." Source: his product analytics; supersedes the 2026-07-29
figure "500 registered users signed in over the past month" everywhere
on the page (stats strip, closer heading, closer lede, stat card).
Terminology shift is deliberate: MONTHLY ACTIVE USERS, not registered
users. The countries figure is written as "more than 20 countries" in
prose. Stat card re-exported from Andrew's Figma card with the new
number (new filename per versioning rule; cv-stat-users.webp retired in
place, recoverable in git).
