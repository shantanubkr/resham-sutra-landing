# Electronic People & Producer System
## Architecture & System Reference

**Project:** Resham Sutra — Electronic People & Producer System  
**Version:** 2.0  
**Date:** May 2026  
**Status:** Demo built — pilot-ready proof of concept

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Problem Being Solved](#2-problem-being-solved)
3. [Stakeholder Map](#3-stakeholder-map)
4. [Role Definitions & Access Model](#4-role-definitions--access-model)
5. [System Architecture](#5-system-architecture)
6. [Application Modules](#6-application-modules)
7. [Data Model](#7-data-model)
8. [Screen Inventory](#8-screen-inventory)
9. [User Flows](#9-user-flows)
10. [Producer Card System](#10-producer-card-system)
11. [Schemes Linkage System](#11-schemes-linkage-system)
12. [Admin Hierarchy](#12-admin-hierarchy)
13. [Production Metrics](#13-production-metrics)
14. [Internationalization](#14-internationalization)
15. [Govt & Funding Export Layer](#15-govt--funding-export-layer)
16. [MVP Scope Boundaries](#16-mvp-scope-boundaries)
17. [Future Roadmap](#17-future-roadmap)
18. [Implementation Notes](#18-implementation-notes)

---

## 1. Project Overview

The Electronic People & Producer System is Resham Sutra's digital backbone for producer identity, cluster-level production visibility, buyer discovery, and stakeholder reporting in rural silk livelihood ecosystems.

### Core pillars

| Pillar | Description | Demo status |
|--------|-------------|-------------|
| Producer Card | Phygital ID with QR → public profile | Built |
| Income & Demographic | DOB, household, income bands (no BPL) | Built |
| Skills & Capacity | Skill tags, training log, certificate upload | Built |
| Schemes Linkage | Static DB + rules-based auto-match + manual tag | Built |
| Production Metrics | Monthly output per producer → cluster aggregation | Built |
| Buyer Catalog | Browse by product/cluster, express interest | Built |
| i18n | English, Hindi, Assamese UI | Built (core strings) |

### What this system is not

- Not a marketplace, payments, or order system
- Not a native mobile app (mobile web supported)
- Not connected to live government APIs
- Not a production ERP

---

## 2. Problem Being Solved

Four gaps addressed in one platform:

1. **Visibility** — Buyers see cluster capacity and available produce, not only individual artisan profiles.
2. **Identity** — Producers get portable QR-linked digital cards.
3. **Reporting** — Admins and funders get chart-based dashboards and CSV export.
4. **Scheme linkage** — Profiles auto-match against eligibility rules; Doot/admin can override.

---

## 3. Stakeholder Map

### Active roles (accounts)

| Stakeholder | System role | Profile |
|-------------|-------------|---------|
| Producer | `producer` | Producer profile + card |
| Buyer | `buyer` | Buyer profile |
| Resham Doot | `field_operator` | Cluster-scoped admin |
| Central Admin | `admin` | Full admin |

### Passive stakeholders (no login)

| Stakeholder | Access |
|-------------|--------|
| Government / funders / CSR | Read-only dashboard link, CSV export |
| Public visitors | Landing page, public producer profile via QR |

---

## 4. Role Definitions & Access Model

### Producer

- View own card, profile, schemes, skills
- **Cannot self-register in pilot** — onboarded by Resham Doot
- **Limited edit:** skills, training, growth notes; core identity via edit request
- Phone hidden on public profile

### Buyer

- Open registration (individual / organisation)
- Browse **product/cluster catalog** (not raw producer database)
- Express interest → creates `InterestRequest` for admin + Doot
- Save **listings** (product + cluster), not individual producer shortlists
- Phone visible for producers when logged in (pilot decision)

### Central Admin

- All clusters, producers, schemes, metrics, exports
- Buyer interest inbox on dashboard
- Scheme database view, manual tagging

### Resham Doot (`field_operator`)

- Cluster-scoped: dashboard, producers, onboard, schemes, cards
- UI labelled **Resham Doot** throughout (code role unchanged for compatibility)

### Access summary

| Action | Producer | Buyer | Resham Doot | Admin |
|--------|:--------:|:-----:|:-----------:|:-----:|
| View own profile | ✓ | ✓ | ✓ | ✓ |
| Browse buyer catalog | — | ✓ | — | — |
| List all producers (API) | — | — | ✓ (cluster) | ✓ |
| Onboard producer | — | — | ✓ | ✓ |
| Tag schemes | — | — | ✓ | ✓ |
| System metrics | — | — | ✓ (cluster) | ✓ |
| Export CSV | — | — | — | ✓ |
| Express interest | — | ✓ | — | — |

---

## 5. System Architecture

### Demo stack (as built)

| Layer | Technology |
|-------|------------|
| Framework | Next.js 16 (App Router) |
| UI | React, Tailwind CSS |
| Charts | Custom components (`src/components/charts/`) |
| i18n | Client-side `I18nProvider` + `translations.ts` |
| API | Next.js Route Handlers (`src/app/api/`) |
| Persistence | JSON file (`data/producer-db.json`) + seed |
| Auth | Demo JWT in localStorage; OTP `123456` |
| Session | `producer_session` in localStorage |

### Production stack (recommended for pilot)

| Layer | Recommendation |
|-------|----------------|
| Database | PostgreSQL |
| File storage | S3 / Cloudinary (photos, certificates) |
| Auth | Real SMS OTP + JWT |
| Hosting | Vercel or similar |

### Architecture diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    Next.js App (Producer_card)              │
│  ┌─────────┐ ┌─────────┐ ┌──────────────┐ ┌─────────────┐  │
│  │  Admin  │ │ Producer│ │    Buyer     │ │ Public / Gov│  │
│  │  pages  │ │  pages  │ │    pages     │ │   pages     │  │
│  └────┬────┘ └────┬────┘ └──────┬───────┘ └──────┬──────┘  │
│       └───────────┴─────────────┴────────────────┘          │
│                         │                                    │
│              ┌──────────▼──────────┐                          │
│              │   API Routes      │                          │
│              │  auth, producers, │                          │
│              │  clusters, buyers,│                          │
│              │  interest, metrics  │                          │
│              └──────────┬──────────┘                          │
│                         │                                    │
│              ┌──────────▼──────────┐                          │
│              │  lib/store (JSON)   │                          │
│              │  guards, matcher,   │                          │
│              │  catalog, i18n      │                          │
│              └─────────────────────┘                          │
└─────────────────────────────────────────────────────────────┘
```

---

## 6. Application Modules

### Module 1 — Authentication

- Demo: phone + role + OTP → JWT session
- Login skip buttons for demo personas
- Buyer register at `/register` (producer reg disabled with message)
- Roles: `admin`, `field_operator`, `producer`, `buyer`

### Module 2 — Producer Profile Builder (5 steps)

1. **Identity** — name, phone, photo, cluster, categories (multi + primary), seller flag  
2. **Skills** — skill tags, experience, machine access, growth notes  
3. **Income** — gender, DOB, household, dependents, income baseline, livelihood  
4. **Production** — monthly output (silk m, produce kg, cocoons kg)  
5. **Review** — submit  

Resham Doot or admin runs this via `/admin/onboard`.

### Module 3 — Producer Card

- On-screen card at `/producer/card` and `/admin/card/[id]`
- QR links to `/p/{producer_code}`
- Public profile: no phone; skills, category, village visible
- PDF print deferred

### Module 4 — Schemes

- Static scheme list with eligibility rules
- Auto-match on save: gender, category, age from **DOB** (no BPL)
- Manual tag/remove on producer detail
- Disclaimer on scheme views

### Module 5 — Admin Dashboard & Metrics

- KPI tiles + donut/bar charts (`MetricsOverview`)
- Production panel (`ProductionMetricsPanel`)
- Cluster snapshot cards
- Buyer interest request inbox

### Module 6 — Producer Database

- Search by name, ID, village
- Filter: category, village
- Table with translated category badges

### Module 7 — Buyer Catalog

- `/buyer/search` — by product or by cluster
- `/buyer/clusters/[id]` — cluster origin + products + metrics
- `ProductListingCard`, express interest
- `/buyer/saved` — saved listings with notes

### Module 8 — Clusters

- Admin cluster list with production snapshots
- Cluster detail: metrics + producer table
- Hierarchy: cluster = village

### Module 9 — i18n

- Locales: `en`, `hi`, `as`
- `useI18n()` + `tr()` + `trCategory()` + `trGender()`
- Language switcher in header and auth pages
- `document.documentElement.lang` synced on change

### Module 10 — Govt Export

- Read-only dashboard at `/gov/[token]`
- CSV export from admin
- Anonymised fields per locked decision

---

## 7. Data Model

Key types in `src/lib/types/index.ts`:

### User

```
id, phone, email, role, name, clusterIds[], producerId?, buyerId?
```

### Producer (highlights)

```
producerCode, fullName, photoUrl, phone, village, clusterId
category, categoryIds[], primaryCategoryId
isSeller, gender, dateOfBirth          // not age_group
householdSize, dependentsCount, incomeBaseline, primaryLivelihood
yearsOfExperience, machineAccess, growthPathwayNotes
monthlyOutput: { silkWovenMeters, produceKg, cocoonsKg }
editRequestPending, editRequestNotes
skillIds[] (via relations)
```

**Removed from pilot:** `bpl_status`, `age_group`

### Cluster

```
id, name, villageNames[], reshamDootName, reshamDootPhone
```

### Buyer catalog types

```
BuyerCatalogCluster, BuyerProductListing, SavedListing, InterestRequest
InterestRequest: buyerId, clusterId, productType, clusterName, productLabel, ...
```

### Metrics (computed)

```
Metrics: totalProducers, sellerCount, byCategory, byGender, topSkills,
         schemeCoverage, newEnrolments30Days, incompleteProfiles,
         pendingInterests, production: ProductionMetrics
ProductionMetrics: weaverCount, spinnerCount, artisanCount,
                   totalSilkWovenMeters, totalProduceKg, totalCocoonsKg, ...
```

### Persistence

Demo uses a single JSON document loaded/saved by `lib/store/index.ts`. Seed in `lib/store/seed.ts`.

---

## 8. Screen Inventory

### Public / Auth

| Route | Description |
|-------|-------------|
| `/` | Landing page |
| `/login` | Demo login + language switcher |
| `/register` | Buyer registration only |
| `/p/[code]` | Public producer profile |
| `/gov/[token]` | Govt read-only dashboard |

### Admin / Resham Doot

| Route | Description |
|-------|-------------|
| `/admin/dashboard` | Metrics, interests, cluster previews |
| `/admin/clusters` | Cluster list |
| `/admin/clusters/[id]` | Cluster metrics + producers |
| `/admin/producers` | Producer database |
| `/admin/producers/[id]` | Producer detail + edit |
| `/admin/onboard` | 5-step profile builder |
| `/admin/schemes` | Scheme list |
| `/admin/card/[id]` | Card preview |

### Producer

| Route | Description |
|-------|-------------|
| `/producer/card` | My card |
| `/producer/profile` | My profile |
| `/producer/schemes` | Matched schemes |
| `/producer/skills` | Skills & training |

### Buyer

| Route | Description |
|-------|-------------|
| `/buyer/search` | Catalog browse |
| `/buyer/clusters/[id]` | Cluster origin |
| `/buyer/saved` | Saved listings |
| `/buyer/profile` | Buyer profile |

---

## 9. User Flows

### Resham Doot onboarding (pilot primary path)

```
Login as Resham Doot
  → Dashboard (cluster metrics)
    → Onboard producer
      → 5-step ProfileBuilder
        → Submit → producer code + scheme auto-match
          → Producer detail / generate card
```

### Buyer discovery (current demo)

```
Register / Login as buyer
  → Browse produce (by product or cluster)
    → View cluster origin + available volumes
      → Express interest (admin + Doot notified)
        → Save listing + notes (optional)
```

### Scheme matching

```
Profile saved
  → matcher.ts evaluates gender, category, age from DOB
  → Matched schemes attached (taggedBy: auto_match)
  → Admin/Doot can add/remove manual tags
```

---

## 10. Producer Card System

- QR URL: `/p/{producer_code}`
- **Public:** name, photo, skills, category, village — **no phone**
- **Logged-in buyer:** phone visible per pilot rule
- Card generation: web view; physical print out of scope

---

## 11. Schemes Linkage System

- Pre-loaded schemes (PMKVY, MUDRA, etc. in seed)
- Rules: gender, skill category, min/max age from DOB
- **No BPL criterion** in pilot
- UI disclaimer: suggested eligibility only

---

## 12. Admin Hierarchy

```
Central Admin
├── Cluster: Sualkuchi  →  Resham Doot: Anita Sharma
└── Cluster: Barpeta    →  Resham Doot: Renu Das
```

Doot queries scoped by `clusterIds` on user record via `lib/auth/guards.ts`.

---

## 13. Production Metrics

- Each producer reports **monthly output** at onboarding/edit
- `computeMetrics()` aggregates to cluster and system level
- Charts: artisans by role, silk/produce/cocoons totals
- Buyer catalog surfaces **available monthly volume** per product/cluster

---

## 14. Internationalization

| Item | Detail |
|------|--------|
| Locales | English, Hindi, Assamese |
| Storage | `localStorage` key `producer_locale` |
| Files | `src/lib/i18n/translations.ts`, `provider.tsx`, `nav.ts` |
| Coverage | Nav, auth, admin lists, dashboard charts, buyer catalog, profile builder |
| Not translated | Scheme names, skill names, village names, landing marketing body (partial) |

---

## 15. Govt & Funding Export Layer

- Shareable token URL (demo: `demo-gov-2026`)
- Aggregated metrics only on dashboard
- CSV: anonymised producer codes, village, category, skills, gender, schemes
- No name/phone/income in default export

---

## 16. MVP Scope Boundaries

### Built in demo

- All modules in §6
- Role-based access + cluster scoping
- i18n (EN/HI/AS)
- Chart-based metrics
- Express interest + saved listings
- DOB, multi-category, monthly output
- BPL removed

### Out of scope

- PostgreSQL, real OTP, S3
- Marketplace / payments
- Physical card printing
- Producer self-registration (pilot)
- Native app
- Govt API integration

---

## 17. Future Roadmap

| Feature | Priority |
|---------|----------|
| PostgreSQL + real auth | High (pilot) |
| Physical card printing | High |
| Skill/category content translation | Medium |
| Producer search filters (skill, experience) | Medium |
| Offline field entry | High (field reality) |
| Scheme application tracking | Low |
| Native Android app | Post-pilot |

---

## 18. Implementation Notes

### Demo data

- Seed: ~dozen producers across Sualkuchi and Barpeta clusters
- Reset: `POST /api/dev/reset`

### Mobile field use

- Profile builder supports camera capture on photo input
- Responsive layout for Doot mobile browser use

### Privacy

- Public/QR: no phone
- Income/household: admin + producer only
- Buyer phone visibility: confirm with leadership before production

### Code conventions

- UI label: **Resham Doot**; API role: `field_operator`
- Semantic colors: `success`, `warning`, `error`, `info` in `globals.css`
- Monochrome chrome (black/white/gray base)

---

*Related: [project_brief.md](./project_brief.md) · [stakeholder-usecases.md](./stakeholder-usecases.md) · [product-buildout-requirements.md](./product-buildout-requirements.md)*
