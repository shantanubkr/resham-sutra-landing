# Stakeholder Use Cases
## Electronic People & Producer System (MVP)

**Project:** Resham Sutra — Electronic People & Producer System  
**Version:** 2.0  
**Date:** May 2026  
**Status:** Demo built — reflects implemented flows

---

## Table of Contents

1. [Overview](#1-overview)
2. [Stakeholder Summary](#2-stakeholder-summary)
3. [Producer Use Cases](#3-producer-use-cases)
4. [Buyer Use Cases](#4-buyer-use-cases)
5. [Central Admin Use Cases](#5-central-admin-use-cases)
6. [Resham Doot Use Cases](#6-resham-doot-use-cases)
7. [Government & Funding Use Cases](#7-government--funding-use-cases)
8. [Cross-Stakeholder Use Cases](#8-cross-stakeholder-use-cases)
9. [Feature-to-Stakeholder Matrix](#9-feature-to-stakeholder-matrix)
10. [Use Case Index by Screen](#10-use-case-index-by-screen)

---

## 1. Overview

This document describes stakeholder use cases as **implemented in the demo app** (`Producer_card/`), aligned with locked product decisions from the Q&A session.

### Core pillars

| Pillar | Coverage |
|--------|----------|
| Producer Card | QR-linked phygital ID |
| Income & Demographic | DOB, household, income bands — **no BPL** |
| Skills & Capacity | Tags, training log, certificate upload |
| Schemes | Auto-match + manual tag |
| Production | Monthly output → cluster metrics |
| Buyer Catalog | Product/cluster browse, express interest |

### Terminology

| Term | Meaning |
|------|---------|
| **Resham Doot** | Village cluster coordinator (system role: `field_operator`) |
| **Cluster** | One village — top geographic unit |
| **Listing** | A product available from a cluster (not an individual producer SKU) |

---

## 2. Stakeholder Summary

| Stakeholder | Registration | Primary surface |
|-------------|--------------|-----------------|
| **Producer** | By Resham Doot only (pilot) | `/producer/*` |
| **Buyer** | Open self-registration | `/buyer/*` |
| **Central Admin** | Demo account | `/admin/*` |
| **Resham Doot** | Demo account, cluster-scoped | `/admin/*` (filtered) |
| **Govt / Funding** | None | `/gov/[token]` + CSV |

---

## 3. Producer Use Cases

*Pilot note: producers do not self-register. These use cases apply after Doot onboarding.*

### UC-P01 — View own profile and card

| Field | Detail |
|-------|--------|
| **Goal** | See digital identity and QR card |
| **Screens** | `/producer/profile`, `/producer/card` |

### UC-P02 — View matched schemes

| Field | Detail |
|-------|--------|
| **Goal** | See auto-matched and admin-tagged schemes |
| **Logic** | Gender, category, age from DOB (no BPL) |
| **Screen** | `/producer/schemes` |

### UC-P03 — Manage skills and training

| Field | Detail |
|-------|--------|
| **Goal** | View/update skills, training log, certificates |
| **Constraint** | Non-identity edits only in pilot |
| **Screen** | `/producer/skills` |

### UC-P04 — Request profile edit (identity)

| Field | Detail |
|-------|--------|
| **Goal** | Flag that core identity needs updating |
| **Flow** | `editRequestPending` on profile → Doot/admin resolves |
| **Screen** | Admin producer detail |

### UC-P05 — Report monthly production

| Field | Detail |
|-------|--------|
| **Goal** | Enter silk woven (m), produce (kg), cocoons (kg) |
| **Impact** | Feeds cluster production metrics and buyer catalog volumes |
| **Screen** | Onboard step 4, admin producer detail |

---

## 4. Buyer Use Cases

### UC-B01 — Register and authenticate

| Field | Detail |
|-------|--------|
| **Goal** | Create buyer account (individual or organisation) |
| **Note** | Producer registration disabled with explanatory message |
| **Screens** | `/register`, `/login` |

### UC-B02 — Browse produce catalog

| Field | Detail |
|-------|--------|
| **Goal** | Discover available products by type or by cluster |
| **Filters** | Product type, cluster, search text |
| **Screen** | `/buyer/search` |

### UC-B03 — View cluster origin

| Field | Detail |
|-------|--------|
| **Goal** | See where produce comes from — village, artisan count, monthly output |
| **Screen** | `/buyer/clusters/[id]` |

### UC-B04 — Express interest

| Field | Detail |
|-------|--------|
| **Goal** | Signal buying interest on a product/cluster |
| **Outcome** | `InterestRequest` created; **admin and Resham Doot** notified |
| **Screen** | Product listing card, cluster page |

### UC-B05 — Save listings with notes

| Field | Detail |
|-------|--------|
| **Goal** | Track products/clusters of interest privately |
| **Screen** | `/buyer/saved` |

### UC-B06 — View producer public profile

| Field | Detail |
|-------|--------|
| **Goal** | See producer identity via QR or link |
| **Public fields** | Name, photo, skills, category, village — **no phone** |
| **Logged-in buyer** | Phone visible (pilot rule) |
| **Screen** | `/p/[code]` |

### UC-B07 — Use app in preferred language

| Field | Detail |
|-------|--------|
| **Goal** | Switch UI between English, Hindi, Assamese |
| **Screen** | Language switcher in header / login |

---

## 5. Central Admin Use Cases

### UC-A01 — View system dashboard

| Field | Detail |
|-------|--------|
| **Metrics** | Producers, sellers, category/gender charts, skills, schemes, production, new enrolments, incomplete profiles |
| **Also** | Buyer interest request inbox |
| **Screen** | `/admin/dashboard` |

### UC-A02 — Manage clusters

| Field | Detail |
|-------|--------|
| **Goal** | View all clusters with production snapshots; drill into cluster detail |
| **Screens** | `/admin/clusters`, `/admin/clusters/[id]` |

### UC-A03 — Onboard producer

| Field | Detail |
|-------|--------|
| **Goal** | Complete 5-step profile builder for new producer |
| **Post-submit** | Producer code, scheme auto-match |
| **Screen** | `/admin/onboard` |

### UC-A04 — Manage producer database

| Field | Detail |
|-------|--------|
| **Filters** | Search, category, village |
| **Actions** | View detail, open card |
| **Screen** | `/admin/producers` |

### UC-A05 — Edit producer and tag schemes

| Field | Detail |
|-------|--------|
| **Includes** | Identity edit, monthly output, manual scheme tag/remove, training view |
| **Screen** | `/admin/producers/[id]` |

### UC-A06 — Manage scheme database (view)

| Field | Detail |
|-------|--------|
| **Screen** | `/admin/schemes` |

### UC-A07 — Generate producer card

| Field | Detail |
|-------|--------|
| **Screen** | `/admin/card/[id]` |

### UC-A08 — Export data and share govt link

| Field | Detail |
|-------|--------|
| **Formats** | CSV export button; govt dashboard at `/gov/demo-gov-2026` |
| **Screen** | Dashboard actions |

### UC-A09 — Dismiss buyer interest requests

| Field | Detail |
|-------|--------|
| **Goal** | Mark interest as read after follow-up |
| **Screen** | `/admin/dashboard` |

---

## 6. Resham Doot Use Cases

Resham Doot uses the same admin UI with **cluster-scoped data** (role `field_operator`).

### UC-D01 — View cluster dashboard

Cluster-filtered metrics and production charts. Same dashboard component, scoped queries.

### UC-D02 — Onboard producer in own cluster

Same 5-step builder; cluster selection limited to assigned cluster(s).

### UC-D03 — Manage cluster producers

Search, edit, tag schemes, generate cards — **own cluster only**.

### UC-D04 — Receive buyer interest

Interest requests for their cluster appear on dashboard; link to cluster detail.

### Resham Doot vs Central Admin

| Capability | Resham Doot | Central Admin |
|------------|:-----------:|:-------------:|
| All clusters | ✗ | ✓ |
| System-wide export | ✗ | ✓ |
| Scheme DB management | View only | ✓ |
| Onboard / edit producers | ✓ (cluster) | ✓ (all) |
| Buyer interest inbox | ✓ (own clusters) | ✓ (all) |

---

## 7. Government & Funding Use Cases

No login. Access via shareable link or admin-provided export.

### UC-G01 — View read-only dashboard

Aggregated metrics, charts — no individual PII at dashboard level.

### UC-G02 — Export anonymised CSV

Producer code, village, category, skills, gender, schemes — no name/phone/income by default.

---

## 8. Cross-Stakeholder Use Cases

### UC-X01 — Public profile via QR

Anyone scans QR on card → `/p/{code}` → limited public view.

### UC-X02 — Automated scheme matching

On profile save → rules engine → schemes attached → visible to producer and admin.

### UC-X03 — Production aggregation

Producer monthly output → cluster `ProductionMetrics` → buyer catalog "available volume".

### UC-X04 — Multi-language UI

Any authenticated or auth-screen user switches locale; preference persisted in browser.

---

## 9. Feature-to-Stakeholder Matrix

| Feature | Producer | Buyer | Resham Doot | Admin | Govt |
|---------|:--------:|:-----:|:-----------:|:-----:|:----:|
| Profile builder | — | — | ✓ | ✓ | — |
| Producer card | ✓ | ✓ (public) | ✓ | ✓ | — |
| Monthly output | ✓ | ✓ (aggregated) | ✓ | ✓ | ✓ (agg) |
| Scheme view/tag | ✓ | — | ✓ | ✓ | ✓ (coverage) |
| Product catalog | — | ✓ | — | — | — |
| Express interest | — | ✓ | ✓ (inbox) | ✓ | — |
| Saved listings | — | ✓ | — | — | — |
| Producer database | — | — | ✓ (cluster) | ✓ | — |
| Metrics dashboard | — | — | ✓ (cluster) | ✓ | ✓ (RO) |
| CSV export | — | — | — | ✓ | ✓ |
| i18n | ✓ | ✓ | ✓ | ✓ | — |

---

## 10. Use Case Index by Screen

### Public / Auth

| Screen | Use cases |
|--------|-----------|
| `/` | Landing |
| `/login` | All roles, UC-B07 |
| `/register` | UC-B01 |

### Producer

| Screen | Use cases |
|--------|-----------|
| `/producer/card` | UC-P01 |
| `/producer/profile` | UC-P01, UC-P04 |
| `/producer/schemes` | UC-P02 |
| `/producer/skills` | UC-P03 |

### Buyer

| Screen | Use cases |
|--------|-----------|
| `/buyer/search` | UC-B02, UC-B07 |
| `/buyer/clusters/[id]` | UC-B03, UC-B04 |
| `/buyer/saved` | UC-B05 |
| `/buyer/profile` | UC-B01 |

### Admin / Resham Doot

| Screen | Use cases |
|--------|-----------|
| `/admin/dashboard` | UC-A01, UC-A09, UC-D01, UC-D04 |
| `/admin/clusters` | UC-A02 |
| `/admin/clusters/[id]` | UC-A02, UC-D03 |
| `/admin/producers` | UC-A04, UC-D03 |
| `/admin/producers/[id]` | UC-A05, UC-P04, UC-P05 |
| `/admin/onboard` | UC-A03, UC-D02 |
| `/admin/schemes` | UC-A06 |
| `/admin/card/[id]` | UC-A07 |

### Shared / Export

| Screen | Use cases |
|--------|-----------|
| `/p/[code]` | UC-B06, UC-X01 |
| `/gov/[token]` | UC-G01, UC-G02 |

---

## Appendix: Profile Fields (Pilot)

| Field | Producer | Buyer (public) | Logged-in buyer | Admin | Export |
|-------|:--------:|:--------------:|:---------------:|:-----:|:------:|
| Name | ✓ | ✓ | ✓ | ✓ | Optional |
| Photo | ✓ | ✓ | ✓ | ✓ | — |
| Producer code | ✓ | ✓ | ✓ | ✓ | ✓ |
| Phone | ✓ | ✗ | ✓ | ✓ | ✗ |
| DOB | ✓ | ✗ | ✗ | ✓ | — |
| Categories (multi) | ✓ | ✓ | ✓ | ✓ | ✓ |
| Monthly output | ✓ | ✓ (agg) | ✓ (agg) | ✓ | ✓ (agg) |
| Income baseline | ✓ | ✗ | ✗ | ✓ | Aggregated |
| BPL | **Removed** | — | — | — | — |

---

*Related: [producer-system-architecture.md](./producer-system-architecture.md) · [questions.md](./questions.md) · [product-buildout-requirements.md](./product-buildout-requirements.md)*
