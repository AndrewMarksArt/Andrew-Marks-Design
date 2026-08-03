# 006 — AI-writing audit of the three case studies

**Date:** 2026-08-02 · **Method:** the global `flag-ai-writing` skill (catalog 2026-08-01.1),
profile `web-and-portfolio`. Pass A mechanical scanner over prose extracted from the TSX with
line numbers preserved; Passes B (structural) and C (substantive) by a 13-agent workflow —
3 studies × 2 lenses, each finding put through an adversarial refuter, then synthesized.
45 of 98 raw findings survived refutation; 33 made the report.

**Why this file exists:** the July 2026 de-slop pass cleaned the *lexical* layer and it has
held — all three studies scan clean, 0 tier A, 0 tier B families. This audit covers what a
scanner cannot see: whether the copy claims more than its own evidence supports. Every flag
below is an accuracy or evidence-placement defect, **not** a suspicion about authorship.

**Standing corrections applied after the workflow returned** (main-loop verification, do not
re-litigate):

- The finding on `KnowledgeOs.tsx:352` ("Design links now clear 40%") originally read
  "40% appears nowhere in the figure, nowhere else on the page." **That is wrong** — the
  caption at line 364 explicitly bridges it: "The 5% to 40% in the copy is the share of all
  design links reaching HIGH, the same fix measured two ways." The surviving, narrower point:
  the figure sources its other four numbers precisely (`GOLD SET N=50, INDEPENDENT LABELER`;
  `BASELINE, 987 DESIGN LINKS: 5.0% REACHED HIGH VS A 20% TARGET`; `MIGRATION 068`) and the
  40% carries no date or source. Ledger 004 addendum 2 line 120 records it as "His number."
  It is a sourcing asymmetry, not a missing number.
- `PlatformOne.tsx:172` was re-verified by hand against `TicketTaxonomyChart.tsx` and
  confirmed exactly as written: the chart's row 1 is 40%, line 149 correctly says "nearly half"
  for the 40% + 8% union, line 172 attaches "nearly half" to the 40% row alone.
- The "day two vs week one" and "~300/wk AVG" findings were confirmed against ledger 004
  addendum 2 lines 122–129, which record both as open items rather than settled choices.

---

AI WRITING FLAG REPORT
catalog: 2026-08-01.1   profile: web-and-portfolio
scope: three case studies, Andrew-Marks-Design, branch dev
passes: A mechanical (scanner, already run) · B structural · C substantive

---

## 1. VERDICT

**This is a quality audit, not a provenance accusation.** Nothing in these three pages
supports a claim that a model wrote them, and I am not making one. The copy is
overwhelmingly Andrew's — hand-synced from Figma, revised against its own evidence, and
corrected downward against interest in at least three documented places. Every flag below
is a defect in what the copy *claims*, not a suspicion about who typed it.

| study | verdict | confidence | words | tier A | tier B families | density |
|---|---|---|---|---|---|---|
| Knowledge OS | **none** | high | 1,696 | 0 | 0 | 0 / 1k |
| ChatVET | **none** | high | 917 | 0 | 0 | 0 / 1k |
| Platform One | **none** | high | 1,051 | 0 | 0 | 0 / 1k |

The July 2026 de-slop pass holds. The mechanical layer scans clean on all three: no banned
lexicon, no negative parallelism, no format furniture, no machine artifacts. The one A-05
"abrupt cutoff" reported on PlatformOne line 394 is an **extraction artifact** — the UpNext
card description truncated by the prose extractor, not a cutoff in the page. It is not a
finding and is not counted.

Only tier C lexical residue: `L-05` "rather than" ×6 on Knowledge OS, below the meaningful
threshold and, on inspection, the page's deliberate argumentative spine rather than a habit
worth breaking.

**Read the tiers below correctly.** Tier B on an individual finding here means *this defect
is expensive*, not *this is provenance cluster evidence*. There is no cluster. Zero tier B
provenance families is what the scanner found and what I found; the substantive findings are
accuracy and evidence-placement defects that would cost Andrew credibility with a hiring
manager whether a human or a model wrote the sentence.

**33 flags across 3 studies.** 15 tier B, 18 tier C.

---

## 2. FLAGS

### Knowledge OS — `src/components/case/content/KnowledgeOs.tsx`
Full path: `C:\Users\andre\Desktop\code\Andrew-Marks-Design\src\components\case\content\KnowledgeOs.tsx`

**[PROFILE:web-portfolio:claim-without-capture]** (tier B, high) **line 254 — the system diagram prints a different headline total than the rest of the page**
> quote: "over 4,250 sources measured 7/27 and growing by about 300 per week"

problem: The drawn system diagram says 4,250 for 7/27; the hero (78), the analytics capture
(136/140), the closer (377) and the stat card (393) all say 4,339 for that same date. One page,
one date, two totals, no research required to catch it — on the page whose method note promises
every number comes from dated records. Capture-precedence doesn't resolve it, because the 4,339
also comes from a capture. The diagram is simply a stale export.
repair hint: Re-export `kos-system-overview.webp` with 4,339, or drop the count from the band and
let the adjacent copy own it (the decision already taken for RagArchitecture on 07-26). Fix
"Per-Topi" in the same export. New filename per replace-means-replace.
**mechanical fix** (re-export; no copy decision needed)

**[PROFILE:web-portfolio:claim-without-capture]** (tier B, high) **line 334 — the sentence is disproved by the figure directly beneath it**
> quote: "Almost none of the pipeline's tools are the ones it started with"

problem: TechStackMap shows four struck-through swaps against roughly thirteen components listed
as unchanged in the same frame — including four extractor tools (fxtwitter, Cosmos, LinkedIn OG,
design portfolios), so the narrow reading doesn't rescue it either. The true version is the
stronger engineering argument: four hostile swaps landed as single row changes with no deploy
while the rest of the registry never moved. The exaggeration costs the section its actual point.
repair hint: "Four of the pipeline's tools are not the ones it started with, and none of the
swaps needed a deploy." The invariant is the point; the churn count is not.
**Andrew's call** (one-sentence rewrite of his copy)

**[C-09] Unverifiable or fabricated specifics** (tier B, high) **line 352 — the before-number is cited and the after-number is not, in one sentence**
> quote: "Design links now clear 40%, and the floor moved up with the ceiling."

problem: The 5% baseline is printed on the adjacent figure with a repo-eval-docs footnote
("FROM THE REPO'S OWN EVAL DOCS — JUN 17–18, 2026"); 40% appears nowhere in the figure, nowhere
else on the page, and ledger 004 addendum 2 records it as a new author-supplied metric. That
asymmetry sits under a heading whose whole argument is that measurement is what makes a fix real
— the first thing a technical interviewer pulls on.
repair hint: Cite it the way the 5% is cited ("re-measured on the same 987-link Design set after
migration 068: 40%"), or mark it as an estimate pending the re-run.
**Andrew's call** (needs the number's real source)

**[C-09] Unverifiable or fabricated specifics** (tier B, high) **line 401 — "AVG" is refuted by arithmetic the page hands the reader**
> quote: "// LINKS SAVED AND ADDED TO THE CORPUS AS OF 7/27 + AVG NUMBER OF NEW SOURCES PER WEEK"

problem: The number is ledger-backed; the label is not. 4,339 sources (78) from Feb 23 (150) is
~22 weeks ≈ 197/wk, and the analytics capture in the same eyeline reads "this week 101". The
ledger sanctions ~300 explicitly as *the rate when he's operating normally* — a window, not a
mean. One word, in the last element a reader sees, turns a defensible figure into a checkable
overstatement. (The ALL-CAPS mono "//" form is house idiom and is not what's flagged.)
repair hint: "NEW SOURCES IN A TYPICAL OPERATING WEEK" or "RECENT WEEKLY RATE (LIFETIME AVG ~197)".
Naming the lifetime figure yourself removes the only arithmetic a skeptic can run against you.
**mechanical fix** (label swap, Figma re-export)

**[C-10] Citation theater** (tier B, high) **line 126 — an absolute provenance promise with three known exceptions on the same page**
> quote: "Every number comes from the project's own dated records: commit history, migrations, eval reports, and the product's analytics, shown as captured."

problem: Not citation theater in the classic sense — the sourcing is real. The absolute
quantifier is the defect. Ledger 004 addendum 2 records three figures on this page as Andrew's
own estimates rather than dated records: 45 sources (195), 40% HIGH share (352), ~300/week (401).
One uncovered number under a blanket promise costs more than the number would alone, because the
honesty apparatus is what this page trades on.
repair hint: Narrow the promise and name the exception in the same breath: "…shown as captured.
Three figures are my own estimates and are marked as such." Then mark 45, 40% and ~300 inline.
**Andrew's call**

**[C-09] Unverifiable or fabricated specifics** (tier C, high) **line 105 — the strip disagrees with the hero, the origin and the closer**
> quote: "Deployed in week one · 4½ months shipping"

problem: Not fabrication — week one is true. But "day two" is repo-confirmed (baa7d59) and used
at 77, 150 and 375, and the strip is the most-scanned element on the page and the version that
undersells. Ledger addendum 2 records it as "flagged to Andrew for consistency, not changed", so
it's a pending fix, not a preserved choice.
repair hint: "Deployed on day two · 4½ months shipping". One word, and it matches the closer
heading verbatim.
**Andrew's call** (a yes/no he hasn't given yet)

**[C-12] Specifics smoothed into generic praise** (tier C, high) **lines 237, 240 — the composition heading is never cashed**
> quote: "Twelve specialist agents compose into behavior none of them has alone." / "Each one is simple in isolation. What makes them useful is composition."

problem: Not a real C-12 — the paragraph carries a dated anchor (~960 signals at ~1,000 sources)
and a real design decision (signals reviewed like proposals, never auto-applied). The defect is
an uncashed heading: it promises emergence and the section delivers a roster, a mechanism and a
volume count. The one composed chain on the page — gap agent flags at 627 sources → research
agent runs capped searches → 45 sources through the same scored pipeline (194-195) — sits under
a different heading. A director who reads headings-then-first-lines is promised the study's most
senior claim and handed an output metric. Partly mitigated: the section diagram does show agents
triggering research runs.
repair hint: One sentence naming the Mar 30 chain, so the signals count becomes supporting detail
instead of the payload.
**Andrew's call**

**[C-09] Unverifiable or fabricated specifics** (tier C, medium) **line 353 — an unreconciled tension the reader has to resolve himself**
> quote: "Both failures ran for weeks without being visible in normal use."

problem: The duration is defensible (the retrieval break ran migration 045 → the Jun 16 audit;
the scoring miscalibration ran months, so "weeks" understates). The problem is that the page says
elsewhere that chat was in daily use (266) and is where he starts every project (378), so
"not visible in normal use" reads as inattention unless the reader assembles the
refusal-degradation explanation from 351 himself. The sharper fact — the system degraded to
honest refusal, so a total outage read as a thin corpus — is the study's best insight and it is
left implicit.
repair hint: Take the reframe. "The system kept answering honestly that it couldn't cover the
question, so a total retrieval failure read as a thin corpus. That is the failure mode of a good
invariant." Then give the outage a date range from migration 045 → 064.
**Andrew's call**

**[R-06] Restatement paragraphs** (tier C, medium) **line 377 — the closing slot is all input metrics**
> quote: "Knowledge Hub is live: 865 commits and 249 merged PRs between February 23 and early July, a corpus measured at 4,339 sources in late July and still growing, cited chat on top, and 12 agents on call."

problem: Not restatement — 865/249 appear only here, deliberately moved out of the strip. The
defect is metric class: every number in the closing slot and both stat cards is an input (commits,
PRs, corpus size, agent count, weekly rate), while the two measured outcomes that separate this
study from a build log (5%→40% HIGH share at 352, 93% extraction at 136) never return. A hiring
manager's last impression is how much was built, not what it does better.
repair hint: Keep one effort number, promote one result: "865 commits later, design links reach
HIGH at 40% against a 5% baseline, and every answer still cites a saved source or says it can't."
**Andrew's call**

**[R-06] Restatement paragraphs** (tier C, medium) **line 378 — the thesis repeated with three synonyms swapped**
> quote: "The system reads everything so the things I read closely are chosen rather than whatever surfaced that day."

problem: Near-verbatim duplicate of line 125 ("…so the handful I read closely is chosen rather
than whatever happened to surface"). The two differ only by synonym substitution, which is what
makes it read as restatement rather than bookend — a real callback repeats the words exactly so
the reader recognises it. It also crowds the paragraph's honest opening ("the part I did not
build a metric for"), which is the strongest material in the closer.
repair hint: Pick one. Bookend → repeat 125 word for word. Not a bookend → cut it from 378.
**Andrew's call** (his sentence twice; the call is his)

**[R-04] Rigid outline shape** (tier C, medium) **line 262 — four repo-verified features arrive under a heading that promises something else**
> quote: "Chat answers only from the corpus, and says when the corpus falls short."

problem: The heading covers paragraphs 1-3; paragraph 4 (267) delivers the conversation-graph work
— truncate-on-edit bug, sibling branches, version pager, outline rail with preview-approve-undo
auto-sort — which lost its own heading in the recorded merge (comment at 270-273). On a page whose
entire skim layer is claim-headings, this is the one place the device fails to advertise its own
material. A director skimming headings under-counts the chat work.
repair hint: Restore a short heading — "Nothing in a conversation is ever overwritten" is already
the paragraph's first sentence and is a better claim-heading than most on the page — or extend
this heading to name both invariants.
**Andrew's call**

**[PROFILE:web-portfolio:claim-without-capture]** (tier C, medium) **line 379 — the only design-craft argument has no artifact**
> quote: "Designing a read-only surface for people who did not build the system was its own problem, and it is the reason the interface had to make sense to someone other than me."

problem: On a designer's portfolio, the study's one pure design-craft claim is the one significant
claim with no figure. It also says a constraint changed the interface without naming a single
thing that changed, so even without a capture there is nothing checkable in it. The eight figures
cover pipeline, scoring, agents, retrieval, branching and infrastructure; none covers design work.
repair hint: One guest-view capture, or a two-panel owner-vs-guest crop showing what disappears.
Failing that, name one affordance the guest constraint forced.
**Andrew's call** (needs a capture or a specific)

**[C-12] Specifics smoothed into generic praise** (tier C, medium) **line 158 — a spec-register caption on a single-user system**
> quote: "Telegram is the main ingest pipeline: the bot must acknowledge the link, then return the status to the user. This lets the user see a quick score and classification and catch errors early."

problem: Register only, and only a slip in his own copy. This is the page's only third-person
"the user" construction, on a system whose method note (126) says "I am the only person who can
write to the system". The reader hits a requirements-doc sentence in the middle of a first-person
study. The provenance half of this is withdrawn: the figure already marks itself as a redraw
("MIRRORS THE BOT'S REAL TWO-STEP REPLY") and its label deliberately omits the "· live" suffix
every real capture carries.
repair hint: His voice: "Most links come in through Telegram. The bot has to answer instantly or I
stop trusting it, so it acks in seconds and the pipeline reports the graded save a moment later —
I catch a bad classification right there in the chat."
**Andrew's call**

**[PROFILE:web-portfolio:claim-without-capture]** (tier C, medium) **line 207 — the caption rounds its own screenshot down**
> quote: "eight thin subtopics the pipeline scored 0.82–0.92, one link each"

problem: The product string in the capture hedges at "eight-plus"; the caption commits to eight.
Trivial in isolation. It registers because this page's method is quoting its artifacts exactly,
and a close reader who spots one rounded caption starts checking the others.
repair hint: "Eight or more thin subtopics…" — matches the capture verbatim, costs a word.
**mechanical fix**

**[PROFILE:web-portfolio:claim-without-capture]** (tier C, low) **line 250 — the caption drops a qualifier the body already uses**
> quote: "The research loop is the only path to the open web."

problem: As written it says nothing on the page reaches the open web except the research loop —
immediately above a diagram whose extraction stage lists 11-plus tools that fetch from the internet
on every save (plus opt-in transitive ingest, migration 047). The body at 195 uses the precise
word: "the only sanctioned path to the open internet". The distinction is his; the caption dropped it.
repair hint: "The research loop is the only path that goes looking for new sources — everything
else only fetches what it was handed."
**mechanical fix**

**[C-09] Unverifiable or fabricated specifics** (tier C, low) **line 195 — the only unrecorded number in the study's best anecdote is its payoff**
> quote: "supports per-run rollback"

problem: Ledger 004 records it verbatim as "his number, not in the repo audit; verify against run
logs if ever challenged". Every other figure in the anecdote (627, 5 weeks, five subtopics, 8 links,
corpus-max priority) is ledger-confirmed. Low cost on its own — it is a first-person claim about
his own system — and it matters mainly because line 126 promises dated records for every number.
repair hint: Confirm it exists on main. If it does, name the mechanism ("every run is one reversible
batch") and ideally show the control in the research-panel capture. If not, cut it.
**Andrew's call** (a one-line verification)

---

### ChatVET — `src/components/case/content/ChatVet.tsx`
Full path: `C:\Users\andre\Desktop\code\Andrew-Marks-Design\src\components\case\content\ChatVet.tsx`

**[C-09] Unverifiable or fabricated specifics** (tier B, high) **line 168 — every figure on the stall diagram is one the project's own research file cut or restricted**
> quote (alt text, and transcribed from the shipped `cv-stall-flow2.webp`): "protocol search, 5 minutes in room, 30-plus if questions get deferred, and up to 60 percent never pursued; dose calculation, cited in 80 percent of medication errors as miscalculations … client communication, up to 75 percent of what the doctor says lost immediately, with written instructions lifting the correct-treatment rate but costing time; and history re-entered, 10 minutes per patient after the visit, up to 2 hours of desk work per hour of face time"

problem: I opened the image. The "Minutses" typo is fixed; the numbers are not. Against ledger 003:
(a) **5 mins in room** — the only measured search time is Ely's ceiling of under 2 minutes, median
60 s; 5 appears nowhere. (b) **30-plus if deferred** — REFUTED; 2 and 32 are the two endpoints of one
sentence's range across 73 studies, and "no located study measures how long a deferred clinical
question takes to resolve." (c) **up to 60% aren't pursued at all** — the exact barred wording (the
study could not measure permanent abandonment; ships as "during the visit"), and the measured value
is 63.8%, so it is both the barred claim and the wrong number. (d) **80% of medication errors** —
collapses a nested denominator (63% of 48 voluntarily reported perianesthetic errors were wrong-dose;
80% *of those* were calculation errors); the ledger says in terms "do not render it as of veterinary
medication errors full stop." (e) **75% lost immediately** — absent from the ledger entirely, a human
folk figure; the veterinary numbers are Flegel's 29% / 68.9%. (f) **written instructions lift correct
treatment** — the recorded outcome swap; Hoek measured questionnaire recall, not treatment behaviour.
(g) **10 mins per patient** — UNATTESTED, traced to an AI-scribe vendor-marketing citation loop
containing a fabricated JAVMA volume, against 3.9 min/encounter measured. (h) **2 hours desk work per
hour of face time** — Sinsky, human ambulatory physicians, 1.82:1, within-clinic-day, and recorded as
currently cut from this figure. This is the first evidence a screener meets, on a study whose thesis
is that provenance is what makes an answer usable. One checkable figure collapses the thesis. The
file's own header at 39-43 already concedes the contradiction; the fix has not shipped.
repair hint: Re-export from the four figures the ledger clears, each with its population on the card:
2 min / 64% not pursued *during the visit* (Ely, human proxy, labelled); 63% wrong-dose of which 80%
calculation errors, scoped to voluntarily reported perianesthetic errors (Pinho); 29% recall of
medication side effects (Flegel, veterinary); and for the last card state the absence — 9 min 49 s
median consult with note-writing excluded from the measurement (Robinson). Drop the deferred
multiplier, the 75%, the correct-treatment lift and the 10 minutes rather than resourcing them.
New filename per replace-means-replace.
**Andrew's call to approve, then a mechanical re-export** — highest-cost item in this report

**[C-10] Citation theater** (tier B, high) **line 168 — the sourcing footnote is false for the figures it covers**
> quote (printed on the image and in the alt): "Stalls identified in case walkthroughs. Minutes come from published benchmarks. Veterinary sources for dose error and client recall."

problem: A distinct defect from the numbers above, and worse than printing them bare. "Minutes come
from published benchmarks" is attached to 5 mins (the published number is 2), 30-plus mins (refuted
construction) and 10 mins (no peer-reviewed source in any species). "Veterinary sources for … client
recall" is attached to a human-medicine figure the ledger does not hold at all. The footnote is the
artifact that makes the numbers *look checked*, so one reader spot-check converts eight soft errors
into a demonstrated claim of diligence that does not hold — and that discredits the honesty apparatus
everywhere else on the page. The ledger's shipped design (per-card citation and population) is absent
from the image entirely.
repair hint: After the re-export, make the footnote per-card. Each stall carries its own citation and
population. If a card has no source, say the stall came from the walkthroughs and print no number.
**mechanical fix** (in the same re-export)

**[PROFILE:web-portfolio:claim-without-capture]** (tier B, high) **line 222 — the load-bearing trust claim of an AI product, asserted and never shown**
> quote: "Answers are restricted to the Merck Veterinary Manual and leading journals."

problem: "Restricted to" asserts a retrieval boundary and an implied refusal behaviour. Nothing on
the page demonstrates either: no capture shows a citation on an answer, and none shows a refusal when
the corpus returns nothing. The one capture of the source claim states it more weakly — "Powered by
MSD Veterinary Manual", "data sourced from leading veterinary journals and companies". The page's most
detailed answer capture (the lab read) shows a narrative clinical answer with no citation affordance
anywhere in it. This is the first question any AI-native screener asks about a grounded assistant.
repair hint: Name the mechanism and its failure mode in one clause — how retrieval scope was enforced
and what happens when the corpus returns nothing — or downgrade the verb to what the banner supports
("sourced from", "grounded in"). If any capture shows a citation or a refusal, that screenshot is
worth more than the sentence.
**Andrew's call** (only he knows the mechanism)

**[PROFILE:web-portfolio:claim-without-capture]** (tier B, high) **line 231 — the caption claims carry-over; the capture beneath it shows the opposite**
> quote: "Dose calculator, lab interpreter and discharge generator, opened from the chat so nothing has to be re-typed."

problem: I opened `cv-dose-calculator.webp`. Every field is placeholder text ("e.g. Canine, Feline",
"e.g. 20 kg, 45 lbs", "e.g. Cerenia, Gabapentin"), the Calculate button is in the disabled state, the
dialog's own subtitle reads "Enter the patient details to generate a dosage calculation prompt", and
the blurred background is the home screen, not a consultation. So the frame does not merely fail to
show carry-over — it shows five fields being hand-typed, which is the re-entry stall the study opens
with. Carry-over *is* demonstrated by the discharge generator (step two, three of four fields filled)
and by the lab interpreter from an uploaded PDF. The caption is true for two of three tools and false
for the one the page itself calls the most-asked.
repair hint: Scope the claim to the captures: the discharge generator reads the consultation back, the
lab interpreter fills from the uploaded report, the dose calculator is entered by hand. Or re-capture
the dialog opened mid-case with species and weight already populated.
**Andrew's call** (rewrite or re-capture)

**[C-09] Unverifiable or fabricated specifics** (tier B, high) **lines 386, 412 — two incompatible definitions of the study's only hard outcome number**
> quote (412): "// ACTIVE USERS CURRENTLY ON THE PLATFORM, TIME SAVED SELF-REPORTED FROM PILOT USERS."

problem: The recorded fact is *registered users who signed in over the past month*. "Active users
currently on the platform" is a present-tense concurrent-usage metric — a different metric, not a
rephrasing, and the looser one. Andrew's documented leave-it covers the three *phrasings* of 500 in
the strip, heading and lede; it does not cover this note, which contains no 500 and states a different
thing. The note's own second clause ("TIME SAVED SELF-REPORTED FROM PILOT USERS") is exactly the right
construction, so the note demonstrates the standard and misses it in the same breath.
repair hint: Match the note to the fact: registered users who signed in during the past month, with
the month named. Keep the second clause verbatim.
**mechanical fix** (this note is Figma text — a re-export, not a copy edit)

**[C-09] Unverifiable or fabricated specifics** (tier C, medium) **line 220 — a magnitude carried by an intensifier, in the one section that claims instrumentation**
> quote: "Dosing was the most-asked question by a wide margin."

problem: The preceding sentence says "We logged what vets asked for", which tells the reader a count
exists; not giving it reads as a number withheld rather than a number absent. The file's own pending-
facts block (46-48) lists the denominator as an unfilled fact that must not be invented, so the page
is knowingly asserting a margin it has no count for. The ranking itself is plausibly true and
corroborated by the Tools menu (dose calc listed first) — the defect is the unquantified intensifier.
repair hint: Give the count or ratio if the log survives. If it does not, cut "by a wide margin" and
let "the most-asked question" stand, or attribute the ranking to the pilot vets. **Do not invent a number.**
**Andrew's call**

**[R-04] Rigid outline shape** (tier C, medium) **line 385 — the closer is the same apparatus on all three studies**
> quote: "If I ran this again, I would instrument the discharge flow before shipping it. We never set up a way to find out whether those handouts changed anything after the client left."

problem: Not an authorship signal, and the copy inside is specific and his. The reused closer layout
is a deliberate design-system decision, named in the code (`PlatformOne.tsx:243-303`). The residual
cost is portfolio-level sameness: a screener reading two or three studies in one sitting meets the
identical closing apparatus each time — bolded first-person retro last, two stat cards, one mono
method note — so the honesty of the retro reads progressively more like the slot it always occupies.
repair hint: Vary the closer per study rather than the copy inside it. This study has an ending the
other two do not: the role shift, and the fact that the shipped screens are a version that no longer
exists. Let the retro land inside beat 5, next to the flow it is about.
**Andrew's call** (a portfolio-level design decision, not a copy fix)

**[R-07] Slot symmetry** (tier C, medium) **line 150 and 11 others — the label-colon-enumeration construction runs the page**
> quote: "We mapped where a visit stalls and found four points: searching protocols, calculating doses, explaining the plan to the client, and re-entering the history once the room is empty."

problem: Texture only, not truth, and explicitly not evidence of machine authorship. Twelve of the
page's most substantive sentences run abstract-label, colon, enumeration: ledes at 149, 150, 179, 181,
220, 305; the heading at 217; captions at 190, 258, 314, 340, 367. Across roughly twenty-five
sentences, that means every claim arrives, pauses, and unpacks, so the five beats read more alike than
their material is, and the reader's ear has flattened by the closer, where the honest material lives.
repair hint: Break four or five. The four stalls are the study's core finding and deserve one clause,
not a list. Some want the list first and the label after. Beat 3 already shows the alternative and is
the best-paced section on the page: 11 / 6 / 17 / 9 / 22 / 11 words, one colon.
**Andrew's call** (pure cadence)

**[PROFILE:web-portfolio:claim-without-capture]** (tier C, low) **line 90 — the copy and the capture that proves it use different brand names**
> quote: "ChatVET is an AI copilot powered by the Merck Veterinary Manual and leading journals, built to return those answers in seconds."

problem: Copy names Merck three times (89, 90, 222); the only capture of the source claim reads
"Powered by MSD Veterinary Manual", with the Merck logo present in the strip but clipped at the
capture's edge. A veterinarian reads past it; a non-veterinary screener — most of the hiring audience
— sees the headline source claim and the screenshot that proves it carrying different names with
nothing connecting them.
repair hint: One appositive, six words, wherever the pairing first appears: *the Merck Veterinary
Manual, published as the MSD Veterinary Manual outside North America.*
**mechanical fix**

---

### Platform One — `src/components/case/content/PlatformOne.tsx`
Full path: `C:\Users\andre\Desktop\code\Andrew-Marks-Design\src\components\case\content\PlatformOne.tsx`

**[PROFILE:web-portfolio:claim-without-capture]** (tier B, high) **line 172 — the headline stat is restated ~20% high beside the chart that prints it**
> quote: "Most of those tickets should never have existed: in the sample audit, nearly half were answers already on the site."

problem: `TicketTaxonomyChart.tsx` row 1 reads "Answer on site or in docs — 60 (40%)". Line 285 defines
the number exactly: "The 40% is the share of the hand-coded sample whose answers already lived on the
site." The stat-card alt says "minus 40 percent". Line 172 attaches "nearly half" to that same single
category. "Nearly half" is *correct* twenty-three lines earlier at 149, where it unions two rows
(40% answerable + 8% resets = 48%) — so one phrase now labels two denominators on one page. An
interviewer who does the obvious check finds the pitch section rounding the study's load-bearing stat
up, on a page whose entire differentiator is evidence discipline.
repair hint: Say "40%" or "two in five" at 172 to match the chart and the closer. If "most" is wanted,
cash it with the arithmetic the chart supports: 40% answerable + 8% resets + 37% belonging to another
team = 85% that never needed that team. That is a stronger sentence than the one on the page.
**mechanical fix** (one word) — cheapest high-value fix in this report

**[PROFILE:web-portfolio:claim-without-capture]** (tier B, high) **line 204 — the section's trust claim, with no capture and no mechanism**
> quote: "If the assistant has no source for a question, it says so instead of filling the gap, and the handoff path takes over."

problem: The section's only figure shows three screens — a cited Iron Bank answer, a follow-up menu, a
rate-your-experience closer. No refusal state, no no-source case, and no mechanism named anywhere (no
retrieval-returns-no-hit, no refusal template), so the claim is neither shown nor falsifiable. The
section's own code comment (210-212) says the passage "claims only what the shipped captures show" —
abstention is not on that list. The page's central argument is that an unsourced answer is a liability
on a DoD platform (203); the one assertion in that argument with nothing behind it is the assertion
about what happens when there is nothing to cite. The heading above it — "Every answer shows where it
came from" — is a universal quantifier evidenced by one screenshot of one answer.
repair hint: Ship the refusal-state crop and name what enforces it, or downgrade to what the captures
show: sources appear inline; refusal is the designed behaviour pending test.
**Andrew's call** (capture or downgrade)

**[PROFILE:web-portfolio:claim-without-capture]** (tier B, high) **line 232 — a whole section's thesis rests on a resize animation**
> quote: "Different system prompt, code handling, and no handoff prompts, because a debugging session runs long by design"

problem: The section argues that one assistant behaves as two genuinely different products; its only
media is a GIF whose alt describes "the compact widget, then expands to the full-view workspace and
back" — geometry, not behaviour. Nothing shows a different system prompt, code handling, or suppressed
handoffs, and the only assistant content shown anywhere on the page is account-access basics
("I need to access Iron Bank"). The file's own header states the debt at 46-47: the two-postures
capture "must show the developer posture doing developer work, not account-access basics."
repair hint: Capture the full-view posture answering a real technical question — code block, no CTA at
turn four. The Big Bang working shots need a sanitized re-export first.
**Andrew's call** (needs a sanitized capture)

**[PROFILE:web-portfolio:claim-without-capture]** (tier B, high) **line 257 — the only work on this page that reached users has no pixels**
> quote: "When the team chose a partner's chat widget to launch sooner, I documented the UX gaps and worked with the developer to re-skin and customize it as much as we could."

problem: Every figure shows unshipped or staged material — the hero is labelled "in staging", the demo
GIF is the custom assistant, the Vuetify board is a design system, and the launch-sequence alt marks
"Behind SSO with the interim widget" as the current stop with the custom front-end still ahead. The
re-skinned partner widget is what is behind SSO today, it is claimed in the SCOPE strip ("Interim
widget re-skin"), and it appears in no capture. A reviewer's fair summary of the page as it stands is
"nothing here shipped" — which is false, and which one crop would disprove.
repair hint: Add the as-delivered vs re-skinned crop, and state in one clause that the re-skinned
widget is what users hit today behind SSO while the custom assistant waits on CtF.
**Andrew's call** (needs an asset)

**[PROFILE:web-portfolio:claim-without-capture]** (tier B, high) **line 123 — the setup premise is refuted by the figure placed there to prove it**
> quote: "Users who gave up searching had nowhere to go, because the site had no Contact Us form."

problem: The alt of the figure directly beside it says users "loop back, and most end up at the Contact
Us form." Nothing in the label ("Two simplified examples of users giving up") or the alt says which era
the diagram depicts. `P1-SITE-FLOW-MAP.md` line 7 confirms the map depicts the *current* site while the
case-study figure is meant to depict project-start state, and §6 Q1/Q2 are still open. The contradiction
is one glance wide, in the first content section a reader hits.
repair hint: Label the figure as post-fix ("after we added the form"), or move the Contact Us node out
of a diagram used to illustrate the before state. Settle §6 Q1 first.
**Andrew's call** (settles an open research question)

**[C-10] Citation theater** (tier B, high) **line 308 — one provenance note sources two cards that have two different provenances**
> quote: "// PROJECTION FROM THE HAND-CODED 150-TICKET SAMPLE — NOT YET A MEASUREMENT"

problem: The 40% card derives from the 150-ticket taxonomy. The capacity card ("about one full-time
role") cannot — a taxonomy of ticket categories yields shares, not time-on-task. The actual source
exists only in a code comment (36-37): "the CS lead's 40-60% triage stat summarized to 'close to a full
role'", an interview estimate. So the rendered page never states where the FTE figure comes from at
all, and its one honesty label points a technical reviewer at the wrong source for the number they will
most want to check. This is the page's honesty apparatus in the one place a skimmer sees it, and it is
crediting an interview estimate to a hand-coded sample. (The "//" mono form is house idiom and is not
what's flagged; the content of the note is.)
repair hint: Split the note — 40% to the sample, the capacity figure to the CS lead's estimate, showing
the conversion — or move the capacity source into line 150 where the claim is first made. Better still,
replace the FTE card with the measured staging-replay rate once it exists.
**Andrew's call**

**[R-03] Aphoristic close** (tier B, medium) **line 175 — the one completed-past outcome verb on a page that has not shipped**
> quote: "The routing burden moved from an overworked team to a system."

problem: Simple past asserts a completed operational change for a product the page twice says is in
staging (258, 285). Nothing has moved; the design that would move it is in staging. The section around
it is uniformly present-tense design description, and this sits in the closing slot the profile calls
the most-remembered line in portfolio copy — immediately after 174 already closed on a real fact
("every did-this-help answer is data for tuning them"). On a page where a method note exists to say
NOT YET A MEASUREMENT, the one unhedged completed-action sentence is the one an interviewer probes.
repair hint: State it as a property of the design with the status attached, or cut it and let 174 close
the section. "The design moves the routing burden off the team and into the system — pending launch."
**Andrew's call**

**[PROFILE:web-portfolio:claim-without-capture]** (tier C, medium) **line 285 — half the FTE claim has no routing target on the page**
> quote: "the misrouted remainder reaching the right team through routing rather than a person forwarding email"

problem: "The misrouted remainder" is the chart's 37% "Belonged to another team" row, which line 148
describes as "emails forwarded between product teams" — many teams. The escalation figure routes to
exactly two destinations, "the helpdesk or Customer Success". The documented flow does not reach the
population this half of the stat card recovers. Downgraded to C because it takes cross-referencing a
closer sentence against an alt two sections up, and the escalation figure is explicitly simplified.
repair hint: Show routing to the other product teams in the escalation figure, or scope the claim and
say the cross-team share needs a routing target that does not exist yet.
**Andrew's call**

---

## 3. CROSS-STUDY PATTERNS

These are habits. Each one is fixable once, and each shows up on at least two studies.

**1. Copy is written from intent; the figure is exported from an earlier state; nobody re-reads
one against the other after a re-export.** This is the single most common defect in the report and
accounts for 12 of the 33 flags. KOS 254 (4,250 vs 4,339), 334 ("almost none" vs thirteen unchanged
rows), 250, 207. ChatVET 231 (carry-over vs an empty form), 168. P1 123 (no Contact Us form vs a
diagram containing one), 204, 232, 257. The fix is procedural, not editorial: **any figure re-export
triggers a re-read of the caption, the label, and the sentence directly above and below it.** Andrew's
own capture-beats-prose rule already decides the outcome every time; it just isn't being run.

**2. The honesty apparatus over-claims in all three studies.** KOS 126 ("Every number comes from…"),
ChatVET's stall footnote and 412 card note, P1 308. In each case a single provenance line covers a set
of figures with mixed provenance, and in each case the *sourced* figures are real — the defect is scope.
This is the most expensive pattern in the report, because the honesty apparatus is what the portfolio
trades on: a reader who catches one over-scoped provenance line discounts every other one on the site.
Rule to adopt: **a provenance note may only cover figures that share a provenance. Two sources, two notes.**

**3. Absolutes and intensifiers where a window, a count, or a scope would be both true and stronger.**
"Every number" (KOS 126), "AVG" (KOS 401), "Almost none" (KOS 334), "the only path to the open web"
(KOS 250), "restricted to" (CV 222), "by a wide margin" (CV 220), "nearly half" (P1 172), "Every answer
shows where it came from" (P1 201). Every one of these is a case where the accurate version is the
better sentence. This is a writing habit, not an accuracy problem per se — Andrew reaches for the
absolute at the moment of emphasis, and the absolute is exactly what a skeptical reader tests.

**4. The load-bearing trust claim of an AI product is asserted, never shown.** ChatVET 222 ("restricted
to"), P1 204 (abstention). Both are the first question an AI-native screener asks; both have no capture
and no named mechanism; both are already ranked open in the 005 record. Two of three studies, same slot,
same gap. One refusal-state screenshot per product would close both.

**5. The closing slot carries inputs, status drift, or a repeat rather than the study's own outcome.**
KOS 377 (all input metrics; the two measured outcomes never return), KOS 378 (thesis restated with
synonyms), P1 175 (completed-past tense on unshipped work), ChatVET 385 (the same closer apparatus three
times). The closer is the most-remembered slot in portfolio copy and it is the weakest slot on all three
pages.

**6. Same-page numeric restatement drift.** KOS: week one vs day two, 4,250 vs 4,339. ChatVET: 500
described four ways, one of them a different metric. P1: 40% vs "nearly half", plus "roughly 40%" still
live on four other surfaces of the site. Each individually trivial; together they mean a reader who
catches one starts auditing the rest, which is the expensive outcome on pages this careful.

---

## 4. OPEN QUESTIONS FOR ANDREW

Each answerable in one line.

**Knowledge OS**
1. Does the ~300/wk label become "typical operating week" or "recent weekly rate (lifetime avg ~197)"?
2. Can `kos-system-overview.webp` be re-exported at 4,339 with "Per-Topi" fixed — new filename?
3. Where does the 40% HIGH share come from: a re-run on the 987-link Design set, or your own read?
4. Does per-run rollback exist on `main` today?
5. Strip says "week one", hero and closer say "day two" — change the strip?
6. Is line 378 a deliberate bookend (repeat 125 verbatim) or a cut?
7. Is there a guest-view capture, or a specific affordance the guest constraint changed?

**ChatVET**
8. Approve re-exporting the stall diagram from the four ledger-cleared figures, dropping the other four?
9. Does any capture show a citation on an answer or a refusal on no-hit — and if not, does "restricted to" become "sourced from"?
10. Can the "ACTIVE USERS CURRENTLY ON THE PLATFORM" note be re-exported as "registered users who signed in in <month>"?
11. Is there a count behind "most-asked by a wide margin", or does that phrase come out?
12. Re-capture the dose calculator mid-case, or scope the caption to the two tools that do carry over?

**Platform One**
13. Does line 172 become "40%"?
14. What sourcing line should the ~1 FTE card carry in the rendered page?
15. Is the site-flow figure the current site or project-start state? (P1-SITE-FLOW-MAP §6 Q1)
16. Refusal-state crop available, or does abstention get downgraded to designed-behaviour-pending-test?
17. Can the developer-posture capture be sanitized and re-exported?
18. Is there an as-delivered vs re-skinned widget crop?

**Cross-site**
19. "roughly 40%" still lives in `page.tsx` ×3, `CaseStudies.tsx:35` and `ResumeSection.tsx:20` while the H1 says "40%" — propagate one way?

---

## 5. COUNTER-EVIDENCE

The honest other half. This is what argues against machine authorship, and it is substantial enough
that the "none" verdict is not a courtesy.

**Corrections against interest, documented in the files themselves.** KOS line 240 replaced an earlier
"3,400+ signals … nearly two per source" with "about 960 signals, roughly one per source" — revised
*downward* to the weaker figure the record supports. ChatVET retired a weight-only-input line because
the dose-calculator capture contradicted it, and deleted a 2h-to-10s headline, paragraph and graphic
when the user turned out to have been exaggerating. P1's line 257 was rewritten *from* an agentless
construction *to* first-person ownership ("The miss was ours"). Models inflate; these are authors
losing arguments to their own evidence.

**Opinions with a cost, volunteered.** "my reading had not kept up" (KOS 194). "What changed for me is
the part I did not build a metric for" (KOS 378). "A study I would rate a 9 sat at 0.30" (KOS 352).
"That was never instrumented, so it is what they told us and nothing more" (CV 389). "My role shifted
in June from design to investor and marketing material" (CV 390). "The miss was ours: we brought
security in too late" (P1 257). "NOT YET A MEASUREMENT" and "It is a ceiling" (P1 308, 285).

**Unglamorous specifics nobody invents and no ledger needs.** `/retry` from Telegram; yt-dlp and ffmpeg;
a Turnstile challenge on the public cobalt API; "the only cron left is a 10-cent digest"; "a
reading-queue prioritizer that never calls a model at all"; "a CRM that could not talk to Jira";
`/party-bus`; Vuetify's defaults; 24.5 kg carried from a lab import into a printed handout header.

**Domain fluency that is load-bearing rather than decorative.** ChatVET names urine specific gravity as
the discriminator between a renal cause and dehydration *and flags it as absent from the panel*; reads
azotemia + hyperphosphatemia + non-regenerative anemia as one CKD cluster; sends aluminium hydroxide
home as the phosphate binder. A model asked to write a vet case study does not produce the
absent-analyte observation.

**Human editorial residue.** Mixed numeral conventions two sentences apart (KOS 194: "5 weeks in" then
"Five security subtopics"). Subject-verb disagreement shipped inside a hand-built Figma diagram
("Written instructions lift correct treatment rate but is very time consuming"). Source typos preserved
in git-visible comments on P1 ("hav eto" → "have to"; "could find" → "couldn't find"). Text that arrived
with typos was typed by a person.

**Structure is lumpy, not slotted.** KOS paragraph counts run 4/2/2/3/3/4/2/3/4. ChatVET lede counts
3/3/4/3/2/4 and figure counts 1/2/5/1/3/2. P1 headings run 6 words to 14, with fragments and
two-sentence forms. No Background / Key Features / Challenges / Future Outlook shape anywhere.
Sentence-length variance is wide in every section sampled (KOS S1: 9/7/28; P1: 4 to 35). **R-02 does not
fire anywhere in any of the three studies.**

**Lists default to the true number, not to three.** ChatVET reaches for four repeatedly, and every four
is attested against a figure. P1's TEAM lists four, SCOPE five, the chart five rows. R-01 does not fire.

**Zero C-03 trailing participial analysis across ~3,600 words.** That family is usually the last to
leave a de-slopped document. It is simply not here; sentences end on facts.

**Deliberate craft that should not be touched.** The claims-as-headings system on KOS — nine falsifiable
declarative headings, eight of nine cashed by the material beneath them — is the strongest structural
asset in the portfolio. The bolded through-line ("ground the answer or say you cannot") is a checkable
claim about his own practice followed by a real constraint, not an R-03 reach. The ALL-CAPS mono labels,
"//" comment furniture and middot separators are house idiom and were not counted against anything.

---

## 6. WHAT I DID NOT CHECK

- **No rendered pages.** Nothing was screenshotted, no page was loaded in a browser, and the actual
  visual skim order, mobile reflow and figure-to-copy adjacency were inferred from TSX order, not seen.
- **Most figure images were not opened.** Three ChatVET images were opened directly
  (`cv-stall-flow2.webp`, `cv-dose-calculator.webp`, `cv-discharge-step2.webp`). Every other figure claim
  in this report — all of Knowledge OS, all of Platform One — is read from alt text, figure labels and
  captions in the TSX. Where a finding says "the figure shows X", that means the alt says X.
- **Platform One is password-gated in production**, so nothing was verified against the live page; all
  P1 findings are source-and-research-file only.
- **The fact ledgers were treated as ground truth.** 003, 004 and 005 were used to adjudicate whether a
  number is supported. Their underlying sources were not independently re-verified — the ChatVET
  literature claims in particular are trusted as the ledger records them.
- **Figma sources were not opened.** Where a repair is marked "re-export", I could not confirm the Figma
  file still exists or is editable.
- **The repo itself was not audited.** Claims about migrations, PRs and commits are taken from ledger 004,
  not re-run against git.
- **No baseline sample of Andrew's pre-2022 writing was requested or used.** For a provenance call that
  mattered, it would be the first thing to ask for. It did not matter here: the mechanical pass is clean
  and the counter-evidence is dense.

---

## CONTESTED

Findings the adversarial pass killed where I think the kill was wrong, or right for the wrong reason.
None of these are being re-filed; they are one line each so Andrew can overrule me.

- **P1 line 60, the CST-lead quote.** Killed as "quoted speech is off limits, no reader-facing defect."
  That reasoning is fine for an *AI-detection* report and wrong for a portfolio: approximate words inside
  quotation marks, attributed to a real person identifiable by role at a named employer, is a real-world
  risk regardless of whether a reader can detect it — and the repo's own ⚠ at `P1-ASSET-CHECKLIST.md:7`
  and `:30` is still open. It belongs on the pre-publish checklist even though it is not an AI flag.
- **P1 hero, "projected to cut support tickets by 40%".** Correctly killed as a sanctioned panel edit —
  but the kill dismissed the cross-surface inconsistency as mere hygiene. Four other surfaces still read
  "roughly 40%" while the H1 and `KnowledgeOs.tsx:426` read "40%". That is one commit, and it is question 19 above.
- **ChatVET line 151, "it was the largest of the four".** Correctly killed: the attribution to the five
  DVM walkthroughs is in the two sentences directly above. But the ranking's only *quantitative* support
  on the page is the 5-min and 10-min cards, both of which are coming off the diagram. Re-check that the
  ranking still reads as a walkthrough finding after the stall figure is re-exported.
- **ChatVET line 363, "CASE: RUGER, END TO END".** Killed twice on the case-tag convention, and the
  convention does hold — the discharge dialogs deliberately carry no Ruger tag. But the pharmacology
  mismatch was independently confirmed real (obstruction rule-out inputs, CKD output), and the kill
  depends on a reader parsing a tagging convention that is nowhere explained. Low cost; worth knowing it
  rests on that.
