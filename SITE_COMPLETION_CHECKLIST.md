# What’s left to complete the site

## You’re providing
- Individual team headshots (Kunal, Ratan, Anugrah, Upasna)

## Launch setup
- Add `WEB3FORMS_ACCESS_KEY` or `RESEND_*` to `.env.local` and production host (see `.env.example`)
- Confirm latest **operational** totals (machines deployed, villages, producers) if newer than 2022 baseline — research PDFs updated survey outcomes in `src/lib/metrics.ts` but not org-wide deployment counts

## Content & trust
- **Trust badges** — small logo graphics for credentials shown in the footer (FCRA registered, GuideStar verified, CSR compliant, ASME iShow 2019). Right now those are text only; you need official badge artwork and links to each registry/profile.
- Privacy policy and terms pages
- Registered office / legal copy review with your lawyer

## Media (optional polish)
- Dedicated photo for Bharati Sarathi or Bilaspur programme (currently a group/field image)
- Dedicated Fakirpur centre photo (currently Odisha field image)
- India map graphic for impact geography (optional — state chips work today)
- OG/social share image (1200×630) — proper crop for link previews
- Yarn product photo (clear product shot, not only spinning in action)
- More case studies on site (Gopalpur, Kuni Dehury, CEEW study link) — PDFs are in `assets/reference/case-studies/`

## Product / marketing
- Machine brochure PDF downloads per model
- Confirm machine prices on site match current price list
- Kuldeep Singh Negi (COO) — add to team if still active

## Not needed (done or deferred)
- ~~Case study income quotes~~ — updated from `assets/Case Studies/` (Narita, Ritngen output, Fakirpur, Bharati)
- ~~Fakirpur story~~ — Maa Tarini Reeling Group on Impact + home carousel
- ~~YouTube section~~ — home (3 videos) + impact (6 videos) from [@reshamsutra](https://www.youtube.com/@reshamsutra)
- ~~Partner logos~~ — in `assets/site/images/partners/logos/` (manifest in `assets/reference/partners-manifest.json`); run `npm run sync:images` after edits
- ~~Contact form wiring~~ — code done; needs env key only
- ~~Preview form messaging~~ — removed
- ~~Research-backed impact metrics~~ — from `assets/reference/research/` (60 Decibels 2025, CEEW N=277); see `src/lib/metrics.ts`
- ~~Producer Card~~ — separate project at `../resham-sutra-producer-card` (not in this repo)
- ~~SEO basics~~ — `metadataBase`, `/sitemap.xml`, `/robots.txt`
