# Electronic People & Producer System (MVP)
## Project Brief

**Status:** Demo built — May 2026  
**App:** `Producer_card/` · Run with `npm run dev` (port 3001)

---

# Project Overview

The **Electronic People & Producer System** is a lightweight digital identity and producer information platform for rural silk livelihood ecosystems — built for **Resham Sutra**.

It delivers a credible **phygital Producer Card** (QR-linked digital ID), cluster-scoped onboarding by **Resham Doot** (village coordinators), a **buyer produce catalog** (cluster and product level), scheme eligibility matching, and stakeholder visibility through dashboards and exports.

The current deliverable is a **functional demo web app** with seed data, full role-based flows, and documentation for pilot rollout.

---

# Problem Statement

Rural production ecosystems are fragmented. Information about producers lives in spreadsheets, field notes, and informal channels. This creates:

- **Visibility gap** — Buyers cannot discover cluster capacity or available produce at scale.
- **Identity gap** — Producers lack portable, verifiable digital identity.
- **Reporting gap** — Funders and government partners cannot access structured ecosystem metrics.
- **Scheme linkage gap** — Eligible producers are not mapped to available welfare and skilling schemes.

---

# Project Goal

Demonstrate a pilot-ready system that shows:

1. Digital producer identity (card + QR public profile)
2. Resham Doot–led onboarding (5-step profile builder)
3. Searchable admin producer database with filters
4. Cluster-level production metrics (monthly output aggregation)
5. Buyer catalog by **product** and **cluster** (not marketplace)
6. Express interest workflow (admin + Doot notified)
7. Scheme auto-match + manual tagging
8. Government read-only dashboard + CSV export
9. **Multi-language UI** (English, Hindi, Assamese)
10. Landing page and full documentation for stakeholder review

---

# Users & Roles

## 1. Producer / Artisan

- View own profile, card, matched schemes, skills/training
- Limited self-edit (skills, training, growth notes — not core identity)
- Onboarded by Resham Doot in pilot (no self-registration)

## 2. Buyer

- Open registration (individual or organisation)
- Browse produce catalog by product type or cluster
- View cluster origin, artisan capacity, monthly volumes
- Express interest on a product/cluster (not direct marketplace checkout)
- Save listings with private notes
- See producer phone when logged in (hidden on public/QR)

## 3. Central Admin

- System-wide dashboard, metrics, clusters, producers, schemes
- Onboard producers, tag schemes, generate cards, export CSV
- Manage buyer interest requests
- Govt dashboard link generation

## 4. Resham Doot *(demo role: `field_operator`)*

- Cluster-scoped dashboard and producer management
- Onboard and edit producers in assigned cluster
- Tag schemes, generate cards
- Receives buyer interest notifications

## 5. Government / Funding *(passive — no login)*

- Read-only aggregated dashboard via shareable link
- Anonymised CSV export

---

# Org Hierarchy (Locked)

```
Central Admin  →  Cluster (= village)  →  Resham Doot  →  Producers
```

- One **cluster** = one village (no sub-village layer).
- Buyers are a separate role with open registration.

---

# MVP Scope — Built in Demo

## Producer identity

- Name, photo (mandatory), phone, date of birth, cluster, **multiple categories** with **primary category**
- Skills (predefined tags), years of experience, training log, certificate upload
- Income baseline (range bands), household size, dependents, machine access, seller flag
- **Monthly production output** (silk woven m, produce kg, cocoons kg) — feeds cluster metrics
- **No BPL field** in pilot

## Admin & Resham Doot

- Dashboard with chart-based metrics (category, gender, skills, schemes, production)
- Cluster list with snapshot cards and drill-down
- Producer database: search, filter by category and village
- 5-step onboard flow (identity → skills → income → production → review)
- Producer detail edit, scheme tagging, card generation

## Buyer experience

- Browse by **product** (woven silk, yarn, cocoons, etc.) or **by cluster**
- Cluster origin page with production metrics and available products
- Express interest → notifies admin and Resham Doot
- Saved listings (products/clusters, not individual producer shortlists)

## Schemes

- Pre-loaded scheme database with rules-based auto-match (gender, category, age from DOB)
- Manual tag/override by admin or Doot
- Disclaimer: suggested eligibility only

## Language

- **English, Hindi, Assamese** via i18n (`translations.ts`)
- Core UI translated: nav, auth, admin, buyer, onboarding, metrics, categories

## Design

- Monochrome base UI with semantic status colors (success, warning, error, info)
- Chart kit: donut, bar, KPI tiles for metrics

---

# Producer Categories (Demo Taxonomy)

**Production:** Weaver, Stitcher, Spinner, Dyer, Silk Farmer, Machine Operator, Finisher  
**Creative:** Designer, Trainer  
**Business:** Seller, Aggregator  

*Full hierarchical tree pending leadership sign-off.*

---

# Explicitly Out of Scope

- Native mobile app (mobile browser supported)
- Marketplace, orders, payments
- Physical card printing (deferred)
- BPL collection
- Producer self-registration in pilot
- Real OTP / production database (demo uses JSON store + fixed OTP `123456`)
- Real-time government API integration
- KYC / verified badge

---

# Deliverables — Status

| Deliverable | Status |
|-------------|--------|
| Project brief | ✓ This document |
| Architecture document | ✓ [producer-system-architecture.md](./producer-system-architecture.md) |
| Stakeholder use cases | ✓ [stakeholder-usecases.md](./stakeholder-usecases.md) |
| Product Q&A + locked decisions | ✓ [questions.md](./questions.md) · [product-buildout-requirements.md](./product-buildout-requirements.md) |
| Leadership questions form | ✓ [questions-for-superior.docx](./questions-for-superior.docx) |
| Functional demo web app | ✓ `Producer_card/` |
| Landing page | ✓ `/` |
| i18n (EN / HI / AS) | ✓ Core UI |

---

# Demo Access

| Role | Phone | OTP |
|------|-------|-----|
| Central Admin | 9876543210 | 123456 |
| Resham Doot — Sualkuchi | 9876543211 | 123456 |
| Resham Doot — Barpeta | 9876543212 | 123456 |
| Producer | 9876543220 | 123456 |
| Buyer (org) | 9876543230 | 123456 |
| Buyer (individual) | 9876543231 | 123456 |

Govt dashboard: `/gov/demo-gov-2026` · Public profile: `/p/{producer_code}`

---

# Next Steps (Pilot)

1. Leadership sign-off on pending items in [product-buildout-requirements.md](./product-buildout-requirements.md)
2. Import real cluster roster and Resham Doot accounts
3. Replace JSON store with PostgreSQL + real OTP
4. Human review of HI/AS translations and scheme content

---

*Related: [README.md](./README.md) · [producer-system-architecture.md](./producer-system-architecture.md) · [stakeholder-usecases.md](./stakeholder-usecases.md)*
