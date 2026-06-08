#!/usr/bin/env node
/**
 * Copies assets/site → public/ (Next.js served paths).
 * Edit images under assets/site/, then run: npm run sync:images
 */
import { cpSync, existsSync, mkdirSync, readdirSync, rmSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(fileURLToPath(import.meta.url), "..", "..");
const siteDir = join(root, "assets", "site");
const publicDir = join(root, "public");

const SKIP_DIRS = new Set(["_extras"]);

function walkSync(dir, base = dir) {
  const entries = readdirSync(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    if (entry.name.startsWith(".")) continue;
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      if (SKIP_DIRS.has(entry.name)) continue;
      files.push(...walkSync(full, base));
    } else {
      files.push(relative(base, full));
    }
  }
  return files;
}

function syncTree(sourceRoot, targetRoot) {
  if (!existsSync(sourceRoot)) {
    console.error(`Missing source: ${sourceRoot}`);
    process.exit(1);
  }

  mkdirSync(targetRoot, { recursive: true });

  const sourceFiles = new Set(walkSync(sourceRoot));
  const targetFiles = existsSync(targetRoot) ? new Set(walkSync(targetRoot)) : new Set();

  for (const rel of sourceFiles) {
    const src = join(sourceRoot, rel);
    const dest = join(targetRoot, rel);
    mkdirSync(join(dest, ".."), { recursive: true });
    cpSync(src, dest, { force: true });
  }

  for (const rel of targetFiles) {
    if (!sourceFiles.has(rel)) {
      rmSync(join(targetRoot, rel), { force: true });
    }
  }

  return sourceFiles.size;
}

function pruneEmptyDirs(dir) {
  if (!existsSync(dir)) return;
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) pruneEmptyDirs(join(dir, entry.name));
  }
  if (dir !== publicDir && statSync(dir).isDirectory() && readdirSync(dir).length === 0) {
    rmSync(dir, { recursive: true, force: true });
  }
}

const logoCount = syncTree(join(siteDir, "logos"), join(publicDir, "logos"));
const imageCount = syncTree(join(siteDir, "images"), join(publicDir, "images"));
pruneEmptyDirs(join(publicDir, "images"));

console.log(`Synced ${logoCount} logo(s) and ${imageCount} image(s) from assets/site → public/`);
