#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
ASSETS="$ROOT/assets"
SITE="$ASSETS/site"
REF="$ASSETS/reference"
PUBLIC="$ROOT/public"

echo "→ Building assets/site from current public/ (site images only)..."

mkdir -p "$SITE/logos" "$SITE/images"
rsync -a "$PUBLIC/logos/" "$SITE/logos/"
rsync -a "$PUBLIC/images/" "$SITE/images/"

echo "→ Removing unused files from assets/site..."

# Root-level orphans
rm -f "$SITE/images/hero.jpg" "$SITE/images/impact.png"
rm -f "$SITE/images"/IMG-*

# Section orphans not referenced in src/lib/images.ts
rm -f "$SITE/images/about/workshop.jpg"
rm -f "$SITE/images/impact/collective.jpg" "$SITE/images/impact/meena.jpg" "$SITE/images/impact/sunita.jpg"
rm -f "$SITE/images/logos/gramsootra-alt.jpg"
rm -f "$SITE/images/team/leadership.jpg"
rm -f "$SITE/images/products/machines/sunkargha.jpg"
rm -f "$SITE/images/products/items/hero.jpg"
rm -f "$SITE/images/products/services/hero.jpg" \
      "$SITE/images/products/services/gramsootra.jpg" \
      "$SITE/images/products/services/gramsootra-booth.jpg"
rm -f "$SITE/images/programs/gramsootra.jpg"
rm -f "$SITE/images/partners/logos/eriweave.jpg"
rm -f "$SITE/images/partners"/*.jpg "$SITE/images/partners"/*.jpeg 2>/dev/null || true

# Spare machine photo (not on site yet)
mkdir -p "$SITE/images/products/machines/_extras"
if [[ -f "$ASSETS/machines/twin_charkha.jpg" ]]; then
  cp "$ASSETS/machines/twin_charkha.jpg" "$SITE/images/products/machines/_extras/twin-charkha.jpg"
fi

echo "→ Copying reference documents..."

mkdir -p "$REF/case-studies" "$REF/content" "$REF/brand"
cp -R "$ASSETS/Case Studies/." "$REF/case-studies/" 2>/dev/null || true

for doc in \
  "Website Development/Aug 22/Resham Sutra Web Content_280622.docx" \
  "Website Development/Product details.docx" \
  "Website Development/Aug 22/Pepper Des/RSPL Machines Features.docx" \
  "Website Development/1 Who are we.docx" \
  "Website Development/2 The Problem + Background - Revised RV.docx" \
  "Website Development/4 Future Initiatives.docx"
do
  if [[ -f "$ASSETS/$doc" ]]; then
    base="$(basename "$doc")"
    cp "$ASSETS/$doc" "$REF/content/$base"
  fi
done

if [[ -f "$ASSETS/partner-logos-from-live-site/manifest.json" ]]; then
  cp "$ASSETS/partner-logos-from-live-site/manifest.json" "$REF/partners-manifest.json"
fi

if [[ -d "$ASSETS/Resham Sutra Logo Files" ]]; then
  cp -R "$ASSETS/Resham Sutra Logo Files/." "$REF/brand/"
fi

echo "→ Removing legacy asset folders and archives..."

LEGACY=(
  "$ASSETS/Aug 22"
  "$ASSETS/Case Studies"
  "$ASSETS/Logos"
  "$ASSETS/Media"
  "$ASSETS/Our Advisors"
  "$ASSETS/Partner Logo"
  "$ASSETS/Resham Sutra Logo Files"
  "$ASSETS/Website Development"
  "$ASSETS/machines"
  "$ASSETS/partner-logos-from-live-site"
  "$ASSETS/reshamsutra-live-uploads"
)

for path in "${LEGACY[@]}"; do
  rm -rf "$path"
done

rm -f "$ASSETS"/*.zip "$ASSETS"/IMG-*.jpg "$ASSETS/impact.png" "$ASSETS/logos.zip"
rm -f "$ASSETS/shantanu_borkar_projectbrief.pdf"
rm -f "$ASSETS/.DS_Store"

echo "→ Syncing assets/site → public/..."
node "$ROOT/scripts/sync-public-images.mjs"

echo "Done. Edit images in assets/site/ and run: npm run sync:images"
