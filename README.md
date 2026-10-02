# Isla Weddings technical assessment: starter repository

This repository goes with the assessment document you received by email. The document has the scenario and the questions; this repository has the code for **Part 1** (code review and fix), the manifest for **Part 2**, and the data for **Part 3** (detector). Parts 4 and 5 are written answers.

Isla Weddings is a fictional company. Nothing here connects to real systems: the database runs in memory, and the CRM client is a stub.

## Setup

First, make your own private copy. Don't work in this template directly.

1. Click **Use this template → Create a new repository** at the top of this page.
2. Choose your own GitHub account as the owner and set visibility to **Private**, so other candidates can't see your work.
3. Clone your new repository.

You need Node.js 20 or later.

```bash
npm ci
npm run check      # typecheck, lint and tests; all pass on a fresh clone
```

| Command | What it does |
| --- | --- |
| `npm test` | Runs the tests in `tests/` |
| `npm run typecheck` | TypeScript type check |
| `npm run lint` | ESLint |
| `npm run check` | All three, in order |
| `npm run detector` | Runs `detector/detector.sql` against the seed data and prints the result |

## What's in the repository

| Path | What it is |
| --- | --- |
| `lib/pricing/quote.ts` | Existing code: the quote shown to guests and accepted at checkout |
| `lib/pricing/config.ts` | Existing pricing configuration |
| `lib/pricing/payInFull.ts` | **From the PR (new file).** Part 1 |
| `app/api/stripe/webhook/route.ts` | **From the PR (modified).** Part 1 |
| `lib/db.ts` | In-memory Postgres (PGlite) with the same `db.query(sql, params)` shape as production |
| `lib/crm.ts` | Stubbed legacy CRM client |
| `data/schema.sql`, `data/seed.sql` | Tables and sample data for Part 3 |
| `detector/detector.sql` | Your Part 3 detector goes here |
| `k8s/booking-api-deployment.yaml` | The Part 2 manifest |
| `tests/` | Existing tests; add yours here |
| `SUBMISSION.md` | Optional template for your written answers |

## Contracts reviewers rely on

Reviewers run additional automated tests against your work, so please keep these stable:

1. **`getAmountDue`** stays exported from `lib/pricing/payInFull.ts` with the same two parameters (`bookingId: string, payInFull: boolean`). It must resolve to the amount due now, as an integer in Stripe's smallest currency unit. If the amount can't be determined (for example, the booking doesn't exist), it must reject with an `Error` instead of resolving.
2. **`detector/detector.sql`** contains one Postgres query that returns one row per flagged booking, with a column named `booking_id`. Other columns are up to you.
3. **Don't change** `lib/db.ts`, `data/schema.sql` or `data/seed.sql`.

Everything else, including refactoring other files, is your call. If you change something outside Part 1's scope, say why in your written answers.

## Submitting

1. Commit as you go and push to your private repository. Your commit history is part of the review, so please don't squash it.
2. Make sure `npm run check` passes on your final commit.
3. Add the reviewer GitHub accounts listed in your invitation email as collaborators: **Settings → Collaborators → Add people**.
4. Put your written answers (Parts 1 to 5) in `SUBMISSION.md`, or in a separate PDF or Markdown file attached to your email.
5. Reply to your invitation email with your repository link and your final commit ID (run `git rev-parse HEAD`). Reviewers review that commit.

Keep your repository private until the hiring process is over.