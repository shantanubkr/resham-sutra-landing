import { promises as fs } from "fs";
import path from "path";
import type { Database } from "@/lib/types";
import { createSeedDatabase } from "@/lib/store/seed";
import { migrateDatabase } from "@/lib/store/migrate";

const DB_PATH = path.join(process.cwd(), "data", "producer-db.json");

let memoryCache: Database | null = null;

async function ensureDataDir() {
  const dir = path.dirname(DB_PATH);
  await fs.mkdir(dir, { recursive: true });
}

export async function readDatabase(): Promise<Database> {
  if (memoryCache) return structuredClone(memoryCache);

  await ensureDataDir();

  try {
    const raw = await fs.readFile(DB_PATH, "utf-8");
    const parsed = JSON.parse(raw) as Database;
    const migrated = migrateDatabase(parsed);
    const dirty = (migrated as Database & { _migrated?: boolean })._migrated;
    if (dirty) {
      delete (migrated as Database & { _migrated?: boolean })._migrated;
      await writeDatabase(migrated);
    } else {
      memoryCache = migrated;
    }
    return structuredClone(memoryCache!);
  } catch {
    const seed = createSeedDatabase();
    memoryCache = seed;
    await writeDatabase(seed);
    return structuredClone(seed);
  }
}

export async function writeDatabase(db: Database): Promise<void> {
  await ensureDataDir();
  memoryCache = structuredClone(db);
  await fs.writeFile(DB_PATH, JSON.stringify(db, null, 2), "utf-8");
}

export async function resetDatabase(): Promise<Database> {
  memoryCache = null;
  const seed = createSeedDatabase();
  await writeDatabase(seed);
  return seed;
}

export function invalidateCache() {
  memoryCache = null;
}
