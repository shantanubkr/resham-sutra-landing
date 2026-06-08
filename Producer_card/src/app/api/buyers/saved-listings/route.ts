import { NextRequest } from "next/server";
import { getBuyerCluster } from "@/lib/buyers/catalog";
import { BUYER_PRODUCT_META } from "@/lib/constants";
import { readDatabase, writeDatabase } from "@/lib/store";
import { errorResponse, jsonResponse, requireRole } from "@/lib/auth/guards";
import type { BuyerProductType } from "@/lib/types";

export async function GET(request: NextRequest) {
  try {
    const user = await requireRole(request, ["buyer"]);
    const db = await readDatabase();
    const saved = (db.savedListings ?? [])
      .filter((s) => s.buyerId === user.buyerId)
      .map((s) => {
        const cluster = getBuyerCluster(db, s.clusterId);
        const meta = BUYER_PRODUCT_META[s.productType];
        const listing = cluster?.listings.find(
          (l) => l.productType === s.productType
        );
        return {
          ...s,
          clusterName: cluster?.name ?? "Unknown",
          productLabel: meta.label,
          listing,
        };
      });
    return jsonResponse({ saved });
  } catch (e) {
    return errorResponse(e);
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await requireRole(request, ["buyer"]);
    const { clusterId, productType, notes } = await request.json();
    const db = await readDatabase();

    if (!clusterId || !productType) {
      return jsonResponse({ error: "clusterId and productType required" }, 400);
    }

    if (!db.savedListings) db.savedListings = [];

    const existing = db.savedListings.find(
      (s) =>
        s.buyerId === user.buyerId &&
        s.clusterId === clusterId &&
        s.productType === (productType as BuyerProductType)
    );
    if (existing) {
      existing.notes = notes ?? existing.notes;
      await writeDatabase(db);
      return jsonResponse({ saved: existing });
    }

    const saved = {
      id: crypto.randomUUID(),
      buyerId: user.buyerId!,
      clusterId,
      productType: productType as BuyerProductType,
      notes: notes ?? null,
      savedAt: new Date().toISOString(),
    };
    db.savedListings.push(saved);
    await writeDatabase(db);
    return jsonResponse({ saved }, 201);
  } catch (e) {
    return errorResponse(e);
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const user = await requireRole(request, ["buyer"]);
    const { searchParams } = new URL(request.url);
    const clusterId = searchParams.get("clusterId");
    const productType = searchParams.get("productType");
    const db = await readDatabase();
    db.savedListings = (db.savedListings ?? []).filter(
      (s) =>
        !(
          s.buyerId === user.buyerId &&
          s.clusterId === clusterId &&
          s.productType === productType
        )
    );
    await writeDatabase(db);
    return jsonResponse({ ok: true });
  } catch (e) {
    return errorResponse(e);
  }
}
