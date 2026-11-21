# Team log — portfolio

Team: **claude** (lead: analysis, brainstorming, review) · **eko** (UI/UX) · **meko** (features) · **sako** (QA)

## Round 1 — 2026-11-17
Backup: `.team/backups/index.round0.html`

### claude — analysis & brainstorm
- No console errors, no horizontal overflow, meta/OG present.
- Mobile 375px: robot fills the whole first screen; name + CTA below the fold.
- Desktop: certificates grid leaves a lone card on the last row.
- Project cards are text-only and visually flat.
- Feature ideas chosen: Ctrl+K command palette; Echo as a quick-answer assistant built from CONTENT.
- Feature ideas parked: project detail modal, CV download (needs cv.pdf from Ahad), GitHub/LinkedIn (links still empty).

### eko — done
- Mobile hero (<700px): text first, Echo shrunk 170→104px below the meta row. Verified by claude at 375px: name + CTA above the fold.
- Certificates: flex-wrap with `--cols` (4/2/1), last row centered.
- Project cards: `data-cat` accent strip + tinted icon per category, hover border/strip.
- `.to-top` hides while mobile menu is open; footer bottom padding on phones.
- Ideas: hide "Echo · klik et" hint on mobile; featured wide first certificate; fade edges on project filter row.

### meko — done
- Command palette: `#cmdBtn` + Ctrl/⌘K, `<dialog id="cmdDialog">`, `cmdBuild/cmdOpen/cmdRun`, diacritic-insensitive `fold()`, sections/theme/lang/copy email/socials. Shared `copyEmail()` extracted.
- Ask Echo: `#askBtn` + `#askPanel`, 5 questions (`ASK`), answers built in `askAnswer()` from CONTENT, typing effect, re-renders on lang switch.
- Strings: `CONTENT.ui.az/en` → `cmd.*`, `ask.*`, `nav.home`.
- Ideas: CV + projects-by-tag commands; free-text Ask Echo; recent commands first.

### sako — verdict: Needs another round
- P2: Ask Echo panel causes desktop hero layout shift (+173px) and overflows 800px viewport.
- P3: light-theme contrast (#askBtn 4.01:1, status chip ~3.6:1); tap targets <44px on phones (.ask-q, #askBtn, filters); #askLog scrollbar overlaps user bubbles.
- OK: palette end-to-end, Ask Echo a11y + lang switch, i18n complete, no console errors, no overflow at 360/768/1280, cert grid, mobile hero.
- Not covered: cert modal gallery arrows, focus return after cert modal, project filters live.

### fix pass 1 → eko — done, reviewed by claude
- Ask panel absolute-positioned ≥701px: h1 shift 0px at 1280×800, panel fits viewport (y 163–626).
- Light `--accent-text` → #A44A2B: #askBtn 5.84:1 (light) / 6.02:1 (dark). `.badge.live` ≈6:1.
- 44px tap targets on phones; `#askLog` scrollbar-gutter.
- Round 1 result backup: `.team/backups/index.round1.html`

### Open for round 2
- Desktop Ask panel covers the robot + "Ask Echo" button → anchor it beside the robot.
- Featured wide first certificate; fade edges on project filter row; hide "Echo · klik et" on mobile.
- Palette: CV + projects-by-tag commands, recent commands first. Ask Echo: free-text questions.
- QA not yet covered: cert modal gallery arrows, focus return after cert modal, project filters live.
- Needs Ahad: cv.pdf, GitHub/LinkedIn links.

## Round 2 — 2026-11-17
Backup: `.team/backups/index.round1.html`. Ahad's priorities: features must be excellent on phones; add his professional photo; deploy after the round.

### claude
- Added LinkedIn URL to CONTENT.socials.
- Fetched Ahad's LinkedIn profile photo (800×800) → `images/ahad.jpg`.
- Brief to eko: photo in About (portrait card) + Contact (avatar), Ask panel beside robot on desktop, mobile pass (palette sheet, Ask Echo bottom sheet, 44px targets), featured first certificate.
- Planned for meko: Save-contact vCard + Web Share on phones, free-text Ask Echo, palette recent commands / projects-by-tag.

### eko — done
- Photo: `CONTENT.photo`, `initPhoto()` (hides on empty/error), About 4:5 portrait card with caption (phones: 180px beside caption), Contact `.c-who` 64px avatar. i18n `photo.alt`, `photo.role`, `data-i18n-alt`.
- Desktop Ask: `.asking` shrinks Echo to 128px, panel below button, 0px h1 shift at 1280 & 1024.
- Phones: Ask Echo bottom sheet (75svh, handle, `#askBackdrop`, safe-area); palette near top, 16px input, 44px rows; tap-target sweep ≥44px.
- Featured first certificate (540px horizontal card) on ≥1001px; "Echo · klik et" hidden on phones.
- Ideas: portrait lightbox; filter-row edge fade; swipe-down to close sheets.

### meko — done
- Save contact: `#saveContact`, `saveContact()` vCard 3.0 UTF-8, `vcPhoto()` canvas 320px photo (none under file://). Also palette command + Ask Echo contact action.
- Share: `shareSite()` (navigator.share → copy fallback), `copyText()` shared helper; `CONTENT.site`.
- Free-text Ask Echo: form, `askMatch()` + `ASK_KW`, new topics projects/certs, visualViewport lift on phones.
- Palette: recents (localStorage `cmdRecent`), "Projects: <tag>" commands; LinkedIn command auto.
- Ideas: CV action once cv.pdf exists; QR code for vCard on desktop; quick-reply follow-ups in Ask Echo.

### sako — verdict: Needs another round (do not deploy before P1s)
- P1: Ask sheet trapped under content on phones (.hero-grid z-index:2 stacking context) → eko.
- P1: Ask "Go to section: undefined" for projects/certs (ASK_SEC missing keys) → meko.
- P2: no scroll lock; log too small at 360; light accent-button text 4.23:1; 768 tablet panel covers hero.
- P3: email wraps mid-word, tel link 19px, tablet tap targets, avatar chin crop + redundant alt, FAB overlaps Save contact, cert count 5 vs 7 mismatch, nested parentheses in study answer, no greeting handler, vCard folding by chars, og:image placeholder, BASKO http link.
- OK: photo crop, vCard (CRLF, UTF-8, photo ~20KB), share fallback, free-text matching, palette on phones, i18n 134/134, cert modal, filters, menu, no overflow.

### fix pass → eko + meko — done
- eko: `askPortal()` moves sheet to <body> (sheet everywhere except ≥1001px+hover), `html.ask-lock` scroll lock, `.asked` single-row chips, light `--btn-bg` #B4532F (4.98:1), email `<wbr>`, 44px on `(pointer:coarse)`, avatar crop + alt="", FAB clearance.
- meko: ASK_SEC labels, 5 certs + 2 seminars wording, study formatting, greeting topic, byte-based vCard folding, canonical/og/twitter → ahadzamanli.vercel.app + images/ahad.jpg, Person JSON-LD, BASKO https.
- claude check at 390×844: sheet on top (hit-test in sheet), free-text answer OK, no overflow, no console errors.

### Deployed 2026-11-17 → https://ahadzamanli.vercel.app (backup `.team/backups/index.round2.html`)
Live check: site 200, images/ahad.jpg 200, .team/ and .claude/ 404 (not published).

### Open for round 3
- Swipe-down to close sheets; fade edge on chips/filters rows; open Ask from hero bubble.
- Quick-reply follow-ups in Ask Echo; QR code for vCard on desktop; portrait lightbox.
- JSON-LD generated from CONTENT; sitemap.xml + robots.txt; 1200×630 og image.
- Untested: real phone keyboard (visualViewport lift), real share sheet, vCard import on device.
- Needs Ahad: cv.pdf, GitHub link.

## Round 3 — 2026-11-18 — Velar-style cinematic scroll redesign (branch `scroll-redesign`)
Trigger: Ahad liked an Instagram ad (cybervault.az "Velar" site): scroll-scrubbed scenes, glass pill nav, horizontal gallery. Old site kept in git: `main` + tag `v1-original` (GitHub private repo zamanliahad/portfolio).

- meko: scroll scene engine (`data-scene`, `pin`, `hscroll`, `--p`, `--hx`, `html.reduced`, `Scenes.refresh()`), section rail.
- eko: pinned cinematic hero + outro "Öyrən. Qur. Paylaş.", glass pill nav, split-word headings, clip-path media unmasks, certificates hscroll gallery, rail styling. **Ask Echo removed completely** (Ahad disliked it on phone).
- sako: 3 P1 (per-frame `--scroll` jank, refresh scroll jump, cert focusin scroll) + P2/P3 → all fixed by meko (d96d0aa) and eko (399a58d).
- Deployed at Ahad's request: 252f439, then d96d0aa (jank fix). **399a58d (eko fixes) is committed + pushed but NOT deployed yet.**

### Paused here by Ahad (to resume later)
- Next: sako targeted re-check of meko+eko fixes (was stopped mid-run), then deploy 399a58d.
- Ahad still has to say whether he likes the redesign → then merge `scroll-redesign` into `main`; if not, redeploy `v1-original`.
- Ideas: cert gallery counter "03 / 07", Echo eyes follow scroll, BASKO scrubbed scene, cert modal prev/next, trim hero at 1280×720.

## Round 4 — 2026-11-19 — flow + Echo + colours (branch `round4-flow`, UNCOMMITTED)
Backup: `.team/backups/index.round4.html` (= state before round 4). Power outage mid-round; resumed.
- meko: hold-to-autoscroll button (hold = accelerate/gentle stop, tap = tour mode), scene smoothing.
- eko: motion system, mobile perf, soft seams; then full vivid palette (terracotta/teal/sun/plum/berry, plum dark theme, gradient heading words, hero glows, BASKO restyle).
- reko (new 5th agent): Echo expressions/acrobatics/touch reactions/sleep, no text; fixed stuck hug (pointerup on window), sticky hover wave on touch, dizzy clash; new Echo palette (--echo-* tokens).
- sako QA was started then stopped (not run).

### Paused here by Ahad
- Ahad did NOT like the new site colours (eko's vivid palette): "too much" — wants something different, direction not yet given. Ask him for direction (references/screenshots) before redoing colours.
- Echo colours/behaviour: no verdict yet.
- Working tree changes are uncommitted on `round4-flow`; nothing deployed. Next: decide colours → sako QA → Ahad approval → merge/deploy.

## Round 5 — 2026-11-19 — new style attempt → reverted; spring Echo (branch `round5-newstyle`, merged to main, DEPLOYED)
- Round 4 archived as a commit on `round4-flow` (not adopted).
- eko: cool cobalt restyle (first attempt truncated index.html via script → restored from backup; agents now Edit-only). Ahad rejected cobalt too → eko reverted all visuals to main's cream/terracotta.
- reko: new Echo engine — one rAF damped-spring loop, varied tap reactions + dizzy, hold ♥, elastic drag, eye follow/lean, idle glances, sleep after 25s, symbols only (text bubble removed).
- meko: motion tokens (--ease-*, --dur-*), will-change cleanup, mobile blur reductions, rAF tilt + magnetic buttons, card lift, html.reduced rules.
- sako: static QA (no P1), added og:site_name + twitter:* metas. Open: meta description language (EN vs lang=az), twitter handle @ahadzamanli unconfirmed.
- Agent office: `.team/office/` (node server.js → http://localhost:4747), agents report with say.js.
- claude: browser-checked desktop + Echo interactions, no console errors. Deployed 6035b54 to production.
