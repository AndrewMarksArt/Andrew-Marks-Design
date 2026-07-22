# P1.dso.mil — Site Flow Map & Stuck-Point Inventory

**Purpose:** ground the Platform One case study's IA diagram (`IaPathDiagram`) in the *real* site structure — where users trying to accomplish the five common goals actually get stuck, and why "contact a human" became the default path.
**Method:** headless crawl (Edge/Playwright, 1440×900, full-page screenshots) of 9 pages + 6 parallel journey-trace agents following trails into the public docs/auth ecosystem + synthesis. 2026-07-16/20.
**Evidence:** screenshots + link map + fetched HTML in `design/assets/p1-site-capture/` (home, about, contact-us, iron-bank ×2, big-bang, party-bus, resources, solutions, login.dso.mil; `crawl.json`; `faq.html`/`reg.html`/`sup.html` from login.dso.mil onboarding).

> ⚠ **This maps the CURRENT site (July 2026).** The case-study diagram depicts **project-start** state — Andrew's corrections needed before the figure is rebuilt (see Questions, bottom). Known delta already: Contact Us is now a 4-tab funnel; at project start it was a bare form straight to the CST team.

---

## 1. Current-site IA, journeys overlaid

Legend — journeys: **L**earn/evaluate · **I**ron Bank · **B**ig Bang · **P**arty Bus · **W** password/lockout · **A**ccount creation.
Walls: `[AUTH]` login before value · `[DEAD]` dead end · `[AMB]` ambiguous label/fork · `[EXT]` external jump · `[CTX]` context loss (silent domain change, no way back) · ◆ buried real answer · ★ page's primary CTA.

```
p1.dso.mil  (client-rendered SPA — deep routes serve an empty shell to crawlers/previews [DEAD])
├─ UTILITY BAR (every page)
│  ├─ "Sign in ⌄" — ~14 per-tool, per-IL links; NO "my account"/SSO/password entry [AMB] ... W-start
│  │  ├─ Chat/Code/Confluence/Jira × IL2|IL4|IL5 → tool domain → bounces to login.dso.mil [CTX]
│  │  ├─ Marketplace: Industry → p1-marketplace.com [EXT] · Government → acqbot.mil login [AUTH]
│  │  └─ Repo One → repo1.dso.mil (public GitLab)
│  └─ "Create account ↗" → login.dso.mil registration wizard [CTX] ................ A-start
├─ NAV: About · Solutions ⌄ · Resources · Contact Us · Careers → afciviliancareers.com [EXT]
├─ /  hero "Build. Secure. Deploy. }unbound." .................................... L1 I1 B1 P1
│  ├─ "Our Core Offerings" grid — Iron Bank card never says "registry" [AMB]
│  ├─ "Who we are" → "Meet Platform One" → /about ................................ L2 (happy path)
│  └─ ★ "Get Started with P1" → forms.osi.apps.mil Office Form [EXT]
├─ /about — WHAT + WHO answered ✓ best page on the site
│  └─ "Join Platform One" → sole CTA "Careers" → AF job listings [AMB][EXT]
├─ /solutions — 6-product grid; "Share Your Mission" → SAME Office Form [EXT]
├─ /iron-bank ..................................................................... I2
│  ├─ ★ "Access the Iron Bank Repository" → ironbank.dso.mil/about → 302 →
│  │    login.dso.mil T&C [AUTH]  ← walled before the user sees ONE container
│  ├─ "IB Mission Essentials" chips — 3 near-synonyms [AMB]:
│  │  ├─ "Onboarding" → 2nd Office Form [EXT]
│  │  ├─ "Consumer Guide" → docs-ironbank stub; step 1 = "create a P1 account" [AUTH]
│  │  └─ "Contribute to IB" → the real accreditation path (label never says so)
│  ├─ "Technical Docs"/"Learn more" → docs-ironbank.dso.mil/overview/ ◆ BURIED SECURITY ANSWER
│  │    (page says "Iron Bank is publicly accessible" — contradicting the walled ★)
│  └─ "Talk to an expert" → SAME Office Form [EXT]
├─ /big-bang — never says Kubernetes/Helm/what it deploys [AMB] ................... B2
│  ├─ "Keep Things Open (Source)" → repo1…/bbtoc (governance cmte, NOT the code) [AMB]
│  └─ "Technical Docs" → docs-bigbang.dso.mil [CTX] → Quick Start → prerequisite:
│       Registry1 account + CLI secret [AUTH]  ← discovered 4–5 clicks deep
├─ /party-bus ..................................................................... P2 L4
│  ├─ "Save Big. Scale Bigger." — "cuts costs by up to 80%", "pay-as-you-use":
│  │    ZERO numbers anywhere on the site [DEAD]
│  ├─ ★ "Request a Quote" → SAME Office Form [EXT]
│  ├─ "Take Party Bus for a test drive" → pb-test-drive.dso.mil (bare JS shell) [CTX]
│  ├─ "Check out the service catalog" → client-rendered, no pricing [AMB]
│  └─ NO link to the real onboarding doc on p1docs [DEAD by omission]
├─ /resources — best self-serve hub, hidden behind a generic label ............... L6
│  ├─ P1 col: DISA Container Hardening Guide → dl.dod.cyber.mil raw PDF [EXT] ◆
│  ├─ Party Bus col: "tech documentation" → p1docs.dso.mil (FALSE IL2 badge — it's
│  │    public [AMB]) → ◆ "Prerequisites: How to Join Party Bus" = THE PB answer
│  ├─ Big Bang col: "Quick Start" → repo1…/bigbang#getting-started ✓ only zero-auth path
│  ├─ Iron Bank col: "Contributor Onboarding Guide" → points at generic overview
│  │    (WRONG TARGET [AMB]) · "Repo One" → ironbank.dso.mil/repomap — same label as
│  │    footer's Repo One → repo1.dso.mil: one label, two domains [AMB]
│  └─ MarketPlace col: P1 Customer Handbook + Acquisition Guide → azure-gov blob raw
│       PDFs [CTX] ◆ ← the cost/engagement answer, filed under the wrong product
└─ /contact-us (tabs: Build with P1 | Help & Support | Marketplace | Feedback)
   ├─ ★ "Get started with Platform One" → SAME Office Form [EXT] .... W-DEAD: no
   │    account-recovery path; SSO helpdesk email appears NOWHERE on p1.dso.mil
   └─ "Prefer a self-guided approach?" → /resources + p1docs.dso.mil

OFF-DOMAIN (no breadcrumb back from any [CTX]):
├─ login.dso.mil — Keycloak realm "baby-yoda", rebranded "DevSecOps Collaboration
│    Workspace" + USG monitoring T&C wall [AUTH]; Decline → bounced to p1.dso.mil
│  ├─ Registration "Prerequisites (1 of 4)" ◆ THE account answer: P1 SSO; CAC
│  │    optional at IL2 (authenticator MFA); default access = Big Bang + Iron Bank
│  │    ONLY; Party Bus/ChatOps ⇒ back to Contact Us + "onboarding supervisor"
│  ├─ "Forgot Password?" → reset form — silently useless if locked/MFA lost [DEAD];
│  │    real remedy = a helpdesk email that exists only on login.dso.mil screens
│  └─ onboarding FAQ (circular) · MFA Troubleshooting (requires login while locked
│       out — circular [DEAD]) · supervisor · documents · Appgate → docs-cnap [EXT]
├─ registry1.dso.mil — Harbor, the ACTUAL pull registry; ZERO links from p1.dso.mil;
│    hostname first appears 3 hops deep in a docs tutorial; no anonymous pulls [AUTH]
├─ repo1.dso.mil — public GitLab ✓ the one zero-friction surface, never framed as such
├─ docs-ironbank / docs-bigbang / p1docs — 3 docs properties, no index of which
│    covers what [CTX]
└─ ironbank.dso.mil — catalog; /about 302 → login [AUTH]
```

## 2. The six journeys — click paths (current site)

| # | Journey | Clicks to "answer" | Where it actually ends |
|---|---------|--------------------|------------------------|
| L | Learn/evaluate P1 | 2 to WHAT/WHO (/about ✓) | Cost/engagement: raw PDFs on an azure-gov blob under the wrong /resources heading; every CTA → Office Form |
| I | Iron Bank: pull + accredit | ★ CTA walls at click 2 | Registry name (registry1.dso.mil) surfaces 3 hops deep in docs; pull requires account + CLI secret |
| B | Big Bang: install + source | 4–5 to quickstart | Docs finally define the product; Registry1 prerequisite revealed at the end; only zero-auth eval path is via /resources → repo1 |
| P | Party Bus: onboard + cost | never (on-site) | Real 6-step onboarding doc lives on p1docs, unlinked from /party-bus, behind a falsely IL2-badged /resources link; "Request a Quote" → Office Form |
| W | Password/lockout | 5 if account healthy | If locked or MFA lost: reset silently fails; remedy is emailing the SSO helpdesk — an address that appears nowhere on p1.dso.mil; Contact Us offers only sales intake |
| A | Create account | 5 (wizard works ✓) | The complete answer (CAC optional, default scope = BB+IB only) exists ONLY inside the Keycloak wizard — invisible to anyone researching before committing |

## 3. Systemic stuck points (recur across journeys — the diagram's raw material)

1. **The Office-Form funnel (all 6 journeys).** Six differently-labeled CTAs — "Get Started with P1", "Request a Quote", "Talk to an expert" (×2 pages), "Schedule a consultation", "Share Your Mission", "Get started with Platform One" — all resolve to the **same** `forms.osi.apps.mil` form (URL-verified 2026-07-20: identical form id). The seventh, IB "Onboarding" (`/r/s8rtWD1eCP`), 301s to a **second, different form id on the same platform** — §6 Q10 is hereby ANSWERED: different form, same intake pattern. Contacting a human is the designed terminus of every path. → *diagram punchline node.*
2. **Keycloak rebrand + T&C wall (5 journeys).** Every account-shaped action lands on login.dso.mil realm `baby-yoda`, rebranded "DevSecOps Collaboration Workspace", fronted by a USG monitoring-consent wall; eligibility is stated nowhere; Decline bounces you home.
3. **Docs fan-out, no way back (5 journeys).** Answers split across 6+ subdomains with independent nav/branding, zero breadcrumbs; three docs properties with no index.
4. **Auth before value (4 journeys).** Iron Bank's primary CTA 302s to login before showing one container; Registry1 refuses anonymous pulls; PB docs' support channels require IL2; footer "Government" goes straight to a login.
5. **Real answers off-site under wrong headings.** Cost answer = 2 raw PDFs under "MarketPlace"; security answer = DISA hardening PDF under generic "Platform One"; PB onboarding under a false IL2 badge.
6. **Labels that lie.** "Contributor Onboarding Guide" → generic overview; "Repo One" → two different domains; "Join Platform One" → job listings; IB chips "Onboarding"/"Consumer Guide"/"Contribute" — three near-synonyms, three wildly different destinations.
7. **Sign-in matrix with no account path.** ~14 per-tool/per-IL sign-in links, IL2/IL4/IL5 never defined on-site, no "my account" or password entry; the only header route to SSO is "Create account" — the wrong verb for a locked-out user.
8. **Circular self-service.** MFA troubleshooting requires logging in while locked out; FAQ answers "How do I register?" with "click Register"; unlock requires emailing the helpdesk with a magic keyword, documented only in that FAQ.
9. **Contact Us is sales-only.** No account recovery, no helpdesk pointer, no consumer-docs routing — a locked-out user's natural fallback dead-ends in a sales intake form.
10. **Public/private contradiction.** docs-ironbank overview says "Iron Bank is publicly accessible" while the site's front door to Iron Bank 302s to a login wall.
11. **SPA empty shells.** Deep routes render client-side only — crawlers/previews/no-JS get an empty "Platform One" shell.
12. Minor: duplicate slug inventories (`/ironbank`→`/iron-bank` etc., body vs nav); stat scatter (84% vs 90-day vs 30-day vs "10M+" with no comparison surface).

## 4. Recommended diagram spine (for IaPathDiagram rebuild)

**Trunk — Party Bus cost/onboarding** (story-truest "why users defaulted to a human"):
home → Solutions → **PARTY BUS** → "cuts costs by up to 80%", zero numbers → three forks, all fail: service catalog (client-rendered, no pricing — dead end) · test drive (bare JS shell on a new domain — context loss) · **"Request a Quote" → the Office Form (the human)**. Ghost path (dashed): the real answer — p1docs "Prerequisites: How to Join Party Bus" — never linked from /party-bus, hiding behind a false IL2 badge on /resources. The user can't even discover that contacting a human IS step 1 of the documented process.

**Rail — Iron Bank security leg** (hosts the buried-answer beat): /iron-bank → ★ "Access the Iron Bank Repository" → 302 → Keycloak T&C wall, while the public page that answers the hardening question (docs-ironbank overview — which itself says "publicly accessible") hides behind developer-scented labels and a mislabeled /resources link.

**Convergence punchline:** one Office-Form node fed by all seven CTA labels.

**Contingency:** if Andrew's ticket taxonomy says CST drowned in account/MFA lockouts rather than pricing, promote the password rail instead (sign-in matrix → Keycloak rebrand → reset silently useless → helpdesk email that exists nowhere on p1.dso.mil → user files a sales form).

## 5. Buried-answer pick (for the BURIED_ANSWER figure)

**Primary: `docs-ironbank.dso.mil/overview/`** — public (verified 200, no auth), answers the leader-level security questions (what "DoD-hardened" means, scanning/accreditation process, who may use it). Triple-buried: (1) the Iron Bank ★ CTA auth-walls before this content is ever seen; (2) on-page routes wear developer-scented labels ("Technical Docs"/"Learn more") a program leader won't click mid-incident; (3) /resources' link to it is mislabeled "Contributor Onboarding Guide". Caption irony: the page says "Iron Bank is publicly accessible" while the site's front door 302s to a login. Capture pair: the CTA → Keycloak wall beside the public overview page.
**Runner-up:** DISA "DevSecOps Enterprise Container Hardening Guide v1.2" — public raw PDF at dl.dod.cyber.mil, one anonymous link among ~30 on /resources.
*Both provisional until Andrew confirms the actual page from the security event.*

## 6. Questions only Andrew can answer (blocking the figure rebuild)

1. **Project-start Contact Us:** describe the bare CST form — fields, where submissions landed (inbox? Jira?), and whether any of today's structure (tabs, self-guided block, the Office Form) existed then. Did all seven CTAs already converge on one destination?
2. **Start-state inventory:** which of today's surfaces existed at project start — /resources, /solutions, tabbed /contact-us, p1docs, roadmap, current product pages? Every diagram node needs an existed-then verdict.
3. **Ticket taxonomy → journeys:** the 150-sample audit's top categories (~60/55/14/12/9) — which of the six journeys map to them? Which flow did CST actually drown in? (Decides trunk vs contingency rail.)
4. **THE security page:** which exact public page held the answer the leader couldn't find? Does the docs-ironbank overview pick match? Was it public then; is it live for capture now?
5. **Diagram boundary:** which domains counted as "the site" for the assistant's scope — p1.dso.mil only, or also login.dso.mil onboarding, the docs subdomains, repo1?
6. **CST quote:** verbatim wording still owed — does it reference a specific journey/failure I can anchor a node to?
7. **Sign-in dropdown:** header contents inferred from the footer matrix — one manual click to confirm before the diagram states it.
8. **Lockout routing:** did password/MFA tickets actually reach CST (the "wrong human" story)? At project start, was there ANY account-help path on the site?
9. **Auth-walled asks:** which frequent questions could the assistant NOT answer because sources were behind login (IB catalog, Registry1 scan results, IL2 Jira/Mattermost)? These become hard-wall annotations.
10. **IB forms:** the IB "Onboarding" chip Office Form vs the contributor docs' "Getting Started" form — same or different, and which existed at project start?

## 7. Method caveats (annotate before publishing anything)

- p1.dso.mil is a client-rendered SPA; the **Help & Support tab body (`/contactus#help`) was NOT captured** — its captured link set shows no account-recovery links, but confirm by hand before claiming "no help path" in print.
- The header **"Sign in ⌄" dropdown contents are inferred** from the footer SIGN IN matrix (visible in screenshots), not clicked.
- IL4/IL5 sign-in targets not crawled (separate enclaves; Appgate prerequisite inferred from login-page resources).
- Trace agents fetched only **public, unauthenticated** pages (marketing, docs, Keycloak onboarding/FAQ/registration info pages — all HTTP 200, no login performed). Two subagent fetches of login.dso.mil help pages tripped an automated security heuristic (pattern-matched as auth-system recon); scope was and is UX research on public pages for this case study. Keep it that way: no authenticated areas, no credential testing, ever.
- Current-vs-project-start delta is unresolved everywhere until Andrew answers §6 — **do not rebuild IaPathDiagram from this map alone.**
