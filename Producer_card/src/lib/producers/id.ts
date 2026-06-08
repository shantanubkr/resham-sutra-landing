import type { Database } from "@/lib/types";
import { readDatabase, writeDatabase } from "@/lib/store";

export function nextProducerCode(db: Database): string {
  const code = `RS-2026-${String(db.producerCodeCounter).padStart(4, "0")}`;
  db.producerCodeCounter += 1;
  return code;
}
