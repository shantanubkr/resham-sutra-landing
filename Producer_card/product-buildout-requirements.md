# Product Buildout Requirements
## Electronic People & Producer System — Demo → MVP

**Status:** Living document (last updated May 2026 — post demo build + Q&A)  
**Demo app:** `Producer_card/` · `npm run dev` on port 3001

---

## Locked decisions (from product Q&A)

These are **confirmed** — build toward these unless leadership overrides.

### Org hierarchy

```
Resham Sutra Admin  →  Cluster (= village)  →  Resham Doot  →  Producers
```

- **Cluster** = one village (no separate village layer below cluster).
- **Resham Doot** replaces demo “field operator” in UI — full cluster management: onboard, edit, scheme tagging, card generation, cluster-scoped dashboard.
- **Central admin** — system-wide access, manages Resham Doots, exports, scheme database.

### Onboarding & roles

| Decision | Choice |
|----------|--------|
| Who onboard producers | **Resham Doot only** (not self-registration in pilot) |
| Photo at onboarding | **Mandatory** |
| Pilot size | **Under 50 producers** |
| Buyer registration | **Open** |
| Buyer discovery | **Cluster/product catalog** (not individual producer marketplace) |
| Buyer → producer contact | **Express interest** — notifies **both admin and Resham Doot** |
| Producer self-edit | **Non-identity only** (skills, training, growth notes — not name, phone, village, etc.) |
| Existing data | **Net-new entry**; demo continues with dummy/seed data until pilot |

### Profile & data

| Decision | Choice |
|----------|--------|
| BPL status | **Not collected in MVP** (scheme match runs without BPL rules) |
| Age | **Date of birth** (replace age-group buckets) |
| Income | **Range bands** (exact bands → superior) |
| Training certificates | **Photo/PDF upload in MVP** |
| Categories | **Multiple per producer** + **primary category** (exact tree → superior) |
| Phone visibility | **Hidden on public/QR**; **visible to logged-in buyers** |
| Production | **Monthly output** per producer (silk m, produce kg, cocoons kg) → cluster aggregation |

### Schemes & reporting

| Decision | Choice |
|----------|--------|
| Scheme matching in pilot | **Yes** — auto-match + manual tag (no BPL criterion) |
| Govt/funder export (interim) | **Aggregated dashboard** + **anonymised CSV** (code, village, category, skills, gender, schemes — no name/phone/income) unless leadership overrides |

### Language

| Decision | Choice |
|----------|--------|
| Physical card print | **Not in MVP yet** — problem to solve later |
| Digital app UI languages | **English, Hindi, Assamese** — i18n implemented in demo (nav, auth, admin lists, dashboard, buyer catalog, onboarding, metrics, categories/gender) |

### Admin navigation (built in demo)

**Dashboard → Clusters → Cluster metrics + producer list → Producer detail**

Metrics: total producers, sellers/non-sellers, category, gender, skills, schemes, new enrolments, incomplete profiles, **monthly production totals**, buyer interest requests, assigned Resham Doot.

---

## Built in demo (engineering complete)

| Item | Status |
|------|--------|
| Resham Doot UI labelling | Done |
| Cluster drill-down + snapshot cards | Done |
| 5-step profile builder (+ production step) | Done |
| DOB field; age groups removed | Done |
| BPL removed from forms and matching | Done |
| Multi-category + primary category | Done |
| Monthly output + production metrics charts | Done |
| Buyer catalog (by product / by cluster) | Done |
| Express interest API + admin inbox | Done |
| Saved listings (not producer shortlist) | Done |
| Certificate upload field | Done |
| i18n EN / HI / AS (core UI) | Done |
| Chart-based metrics dashboard | Done |
| Monochrome UI + semantic status colors | Done |
| Govt read-only dashboard + CSV export | Done |
| JSON store + seed data + demo OTP | Done |

---

## Pending — needs superior (information, content, rules)

Only these require **leadership sign-off or content delivery**.

### A. Geography & roster (content)

1. **Official pilot cluster list** — each village name = one cluster (using demo geography until confirmed).
2. **Resham Doot roster** — name, phone, email, assigned cluster (one Doot per cluster or shared?).
3. **Central admin roster** — name, phone, email for production accounts.

### B. Taxonomies (content)

4. **Producer category tree** — full hierarchical list (skill-level based); rules for primary vs secondary when multiple selected.
5. **Skill tags list** — aligned to category hierarchy; predefined only or allow free text?
6. **Income range bands** — exact rupee brackets Resham Sutra uses in the field.

### C. Required fields sign-off (rules)

7. **Mandatory vs optional at onboarding** — confirm minimum set beyond: name, photo, phone, DOB, cluster, category(ies), at least one skill.

   Suggested for superior to rule on each:
   - Alternate / family phone?
   - Household size & dependents?
   - Primary livelihood (text)?
   - Machine access?
   - SHG / cooperative name?
   - Growth pathway notes?

### D. Schemes (content)

8. **Scheme list for pilot** — 10–15 real schemes with eligibility rules **excluding BPL** (gender, category, age from DOB).
9. **Disclaimer copy** — e.g. “Suggested eligibility only — not a guarantee of benefit.” *(demo uses this)*
10. **Who maintains scheme list** — named owner + review cadence.

### E. Producer card — digital (content + design)

11. **Digital card fields** — exact fields on screen (front/back equivalent) pending brand/design sign-off.
12. **Card visual design** — logo, colours, layout approval (print spec deferred).

### F. Pilot plan (rules)

13. **Pilot timeline** — start date, review milestones.
14. **Success criteria** — e.g. “X producers with photo + card + 1 skill.”
15. **Named funders / govt partners** — who receives read-only dashboard links and on what cadence.

### G. Language (rules)

16. **Language priority** — confirm EN + HI + AS all in MVP v1, or phased rollout. *(demo ships all three for core UI)*
17. **Translation approach** — human-reviewed strings vs machine translation for dynamic content (scheme names, skill labels, landing copy).

### H. Metrics (rules)

18. **Leadership dashboard review set** — confirm the 8–10 numbers reviewed in monthly pilot meetings (add/remove from demo metrics).

---

## Not pending — engineering for pilot (no content input needed)

| Item | Notes |
|------|--------|
| PostgreSQL migration | Replace JSON store |
| Real SMS OTP | Replace demo OTP `123456` |
| S3 / Cloudinary | Photo and certificate storage |
| Per-cluster CSV export | Extend existing export |
| Landing page full i18n | After marketing copy approved |
| Auth hardening | Session refresh, rate limits |

---

## Explicitly out of MVP

- Marketplace, orders, payments  
- Physical card printing (deferred)  
- BPL collection  
- Producer self-registration in pilot  
- Full scheme application tracking  
- KYC / verified badge  
- Native mobile app (mobile browser must work for Resham Doot)  
- Real-time government API integration  

---

## Recommended superior meeting agenda (45 min)

1. Pilot cluster names + Resham Doot assignments (15 min)  
2. Category + skill taxonomy on one page (15 min)  
3. Mandatory fields + income bands (10 min)  
4. Scheme list + disclaimer (5 min)  

---

## Documentation index

| Document | Purpose |
|----------|---------|
| [project_brief.md](./project_brief.md) | Executive overview + demo access |
| [producer-system-architecture.md](./producer-system-architecture.md) | Technical architecture |
| [stakeholder-usecases.md](./stakeholder-usecases.md) | Role use cases |
| [questions.md](./questions.md) | Full Q&A with answers |
| [questions-for-superior.docx](./questions-for-superior.docx) | Leadership blank form |
| [README.md](./README.md) | Developer quick start |

---

*Last synced with demo codebase: May 2026*
