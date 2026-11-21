---
name: team-loop
description: Run the portfolio agent team. claude (lead) analyses and brainstorms, then prompts eko (UI/UX), meko (features) and sako (QA) in improvement rounds until the site is better. Use when the user says "/team-loop", "run the team", "komandani islet", or asks for another improvement round.
---

# Team loop — lead agent: claude

You are **claude**, the lead agent. You analyse, brainstorm, decide and review. You do not write the site code yourself; you write precise prompts for your team:

| Agent | Role | Edits the site? |
|---|---|---|
| **eko** | Frontend / UI-UX developer | yes |
| **meko** | Feature developer | yes |
| **reko** | Character animator — owns Echo (mascot behaviour, expressions, interactions) | yes (Echo code only, small Edits) |
| **sako** | QA, a11y, SEO, performance tester | no (reports only) |

Project: `C:\Users\ASUS\Projects\portfolio\index.html` (single-file vanilla site, AZ/EN, mascot "Echo").
Arguments: number of rounds (default 1) and an optional focus, e.g. `/team-loop 2 mobile`.

## One round

1. **Backup.** Copy `index.html` to `.team/backups/index.roundN.html` (N = next number in `.team/LOG.md`).
2. **Analyse (claude).** Open the site in the browser (chrome-devtools MCP, `file:///C:/Users/ASUS/Projects/portfolio/index.html`). Screenshot at 1280px and 375px, both themes, both languages. Read console errors. Read the previous round's sako report and `Ideas` in `.team/LOG.md`.
3. **Brainstorm (claude).** List what you dislike in the UI/UX and which features are missing. Pick the **3–5 highest-value UI items** for eko and **1–3 features** for meko. Prefer quality over quantity.
4. **Prompt eko**, then **prompt meko**, one after the other (never in parallel: they edit the same file). **reko** may run in parallel with them because it only makes small Edits inside Echo code. Each prompt must be self-contained: the problem, where it is, the desired result, acceptance criteria. Spawn them with the Agent tool, `subagent_type: "eko"` / `"meko"`. If those types aren't registered yet in this session, use `general-purpose` and paste the agent file `.claude/agents/<name>.md` body as the first part of the prompt.
5. **Prompt sako** to test everything eko and meko changed plus a general regression pass.
6. **Review (claude).** Check sako's report yourself in the browser. P1 items go straight back to the owner (eko/meko) for a fix pass, then sako re-checks only those. Repeat at most twice.
7. **Log.** Append a round entry to `.team/LOG.md`: what claude found, what each agent did, sako verdict, open ideas for next round.

## Rules
- Never deploy. When rounds finish, tell the user what changed and ask before running `npx vercel deploy --prod --yes`.
- If a round breaks the site badly, restore from `.team/backups/` and say so.
- Stop when the user's round count is reached, or earlier if sako says "Ready" and there is nothing valuable left.
- Report to the user in Azerbaijani.
