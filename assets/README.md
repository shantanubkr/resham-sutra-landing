# Resham Sutra asset library

All website images live here. **Edit files under `assets/site/`**, then sync to the live `public/` folder.

## Quick start

```bash
npm run sync:images
```

Run this after adding or replacing any image under `assets/site/`.

Image paths used by the site are defined in `src/lib/images.ts`. When you add a new image, put the file in the matching folder below and register its path there.

---

## Folder layout

### `assets/site/` — images on the website

Mirrors what Next.js serves from `public/`. Folder names match page sections.

| Folder | Purpose |
|--------|---------|
| `site/logos/` | Main logo + favicon icon |
| `site/images/global/` | Open Graph / social share image |
| `site/images/logos/` | Product logos (e.g. Gramsootra) |
| `site/images/home/` | Homepage hero, impact strip, program teasers |
| `site/images/about/` | About page photos |
| `site/images/team/` | Team group photos + leadership headshots (`kunal-vaid.jpg`, `ratan-vaid.png`, `upasna-jain.jpg`) |
| `site/images/advisors/` | Advisor headshots (`firstname-lastname.jpg`) |
| `site/images/partners/logos/` | Partner logo files (`partner-slug.png`) |
| `site/images/programs/` | Programs hub + cluster/solar/district |
| `site/images/products/` | Products hub cards and section heroes |
| `site/images/products/machines/` | One photo per machine (`slug.jpg`) |
| `site/images/products/machines/_extras/` | Spare machine photos **not** published yet |
| `site/images/products/items/` | Cocoons, yarns |
| `site/images/products/services/` | Experience centres, training, etc. |
| `site/images/impact/` | Impact hero, story photos, pillar images |
| `site/images/contact/` | Contact page hero |

**Naming rules**

- Lowercase, hyphen-separated: `sun-kargha.jpg`, `story-narita.jpg`
- Partner logos: same slug as in `src/lib/constants.ts` → `PARTNERS[].slug`
- Machine photos: same slug as in `src/lib/products.ts`

### `assets/reference/` — source documents (not served)

| Folder / file | Purpose |
|---------------|---------|
| `reference/case-studies/` | PDF/DOCX case studies used for impact copy |
| `reference/content/` | Web content doc, product specs, background docs |
| `reference/brand/` | Master logo files (PNG, EPS, BMP) |
| `reference/partners-manifest.json` | Partner logo download map from live site |
| `reference/research/` | Impact studies — 60 Decibels (2025), CEEW assessments, yarn/fabric quotes |

Site copy and metrics sourced from research live in `src/lib/metrics.ts` (`SITE_METRICS` + `RESEARCH_METRICS`).

---

## Adding a new image

1. Drop the file in the correct `assets/site/...` folder with a clear name.
2. Add the path to `src/lib/images.ts` (or `products.ts` for machines).
3. Run `npm run sync:images`.
4. Verify locally with `npm run dev`.

## Adding a partner logo

1. Save as `assets/site/images/partners/logos/{slug}.png` (or `.jpg`).
2. Add entry to `PARTNERS` in `src/lib/constants.ts` and `PARTNER_IMAGES` in `src/lib/images.ts`.
3. Run `npm run sync:images`.

## Adding a machine photo

1. Save as `assets/site/images/products/machines/{slug}.jpg`.
2. Ensure the machine exists in `src/lib/products.ts` with matching `slug`.
3. Run `npm run sync:images`.

---

## What was removed

Legacy folders (~2 GB) that duplicated or were no longer referenced by the site:

- Raw WhatsApp uploads (`IMG-*.jpg`)
- `Media/`, `Website Development/`, `Aug 22/` (content extracted to `reference/`)
- Live-site upload dumps, duplicate logo folders, zip archives

If you need an old photo, check git history or your original backup.
