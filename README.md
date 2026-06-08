# Resham Sutra — Marketing Site

Landing site for [Resham Sutra](https://www.reshamsutra.com) — silk livelihood ecosystems for rural women across India.

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Local dev server |
| `npm run build` | Production build |
| `npm run start` | Run production build |
| `npm run sync:images` | Copy `assets/site/` → `public/` after image edits |

## Assets

Edit website images in `assets/site/`, then run `npm run sync:images`. See `assets/README.md`.

Reference docs (case studies, research PDFs) live in `assets/reference/`.

## Contact form

Copy `.env.example` to `.env.local` and set `WEB3FORMS_ACCESS_KEY` or Resend credentials.

## Deploy

Deploy to Vercel (or any Node host). Set production env vars for the contact form. See `SITE_COMPLETION_CHECKLIST.md` for launch items.
