# Producer System — Resham Sutra MVP

Standalone Next.js demo for the Electronic People & Producer System.

## Quick start

```bash
cd Producer_card
npm install
npm run dev
```

Open [http://localhost:3001](http://localhost:3001)

## Demo login

Use OTP **`123456`** for all accounts. Language switcher available on login and in app header (English / Hindi / Assamese).

| Role | Phone | Notes |
|------|-------|-------|
| Central Admin | 9876543210 | Full access |
| Resham Doot — Sualkuchi | 9876543211 | Cluster-scoped |
| Resham Doot — Barpeta | 9876543212 | Cluster-scoped |
| Producer | 9876543220 | Priya Barman (weaver) |
| Buyer — Organisation | 9876543230 | Meera Handlooms |
| Buyer — Individual | 9876543231 | Rajesh Kumar |

## Features

- **Admin:** Dashboard with charts, clusters, producer database, onboard, schemes, CSV export, buyer interest inbox
- **Resham Doot:** Same admin UI scoped to assigned cluster (role `field_operator` in code)
- **Producer:** Profile, phygital card with QR, matched schemes, skills/training, limited self-edit
- **Buyer:** Browse catalog by product or cluster, cluster origin pages, express interest, saved listings
- **Government:** Read-only dashboard at `/gov/demo-gov-2026` (no login)
- **Public profiles:** `/p/RS-2026-0001` (no phone on public view)
- **i18n:** English, Hindi, Assamese for core UI

## Data storage

- **Server:** `data/producer-db.json` (auto-created from seed on first run)
- **Client:** `localStorage` session token (`producer_session`) + locale preference (`producer_locale`)

Reset to seed data (dev only):

```bash
curl -X POST http://localhost:3001/api/dev/reset
```

## Project structure

```
src/
  app/              # Pages (admin, producer, buyer, auth, public, gov)
  app/api/          # REST API routes
  components/       # UI, charts, admin, buyer, producer
  lib/
    i18n/           # translations.ts, provider, nav
    types/          # TypeScript models
    store/          # JSON persistence + seed
    auth/           # Guards, metrics computation
    buyers/         # Catalog aggregation logic
    schemes/        # Eligibility matcher
data/seed/          # Initial JSON seed data
```

## Related docs

| Document | Purpose |
|----------|---------|
| [project_brief.md](./project_brief.md) | Overview, scope, demo access |
| [producer-system-architecture.md](./producer-system-architecture.md) | Architecture, data model, flows |
| [stakeholder-usecases.md](./stakeholder-usecases.md) | Role-based use cases |
| [product-buildout-requirements.md](./product-buildout-requirements.md) | Locked decisions + pending superior items |
| [questions.md](./questions.md) | Full Q&A with answers |
| [questions-for-superior.docx](./questions-for-superior.docx) | Blank leadership form |
