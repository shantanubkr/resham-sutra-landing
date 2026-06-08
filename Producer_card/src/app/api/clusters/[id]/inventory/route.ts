import { NextRequest } from "next/server";
import {
  canManageClusterInventory,
  canViewClusterInventory,
} from "@/lib/buyers/inventory";
import { BUYER_PRODUCT_META } from "@/lib/buyers/products";
import { syncSellerFlagsForCluster } from "@/lib/producers/seller";
import { readDatabase, writeDatabase } from "@/lib/store";
import { STAFF_MANAGE_ROLES, STAFF_VIEW_ROLES } from "@/lib/roles/staff";
import { errorResponse, jsonResponse, requireRole } from "@/lib/auth/guards";
import type { BuyerProductType, ClusterInventoryItem } from "@/lib/types";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await requireRole(request, STAFF_VIEW_ROLES);
    const { id } = await params;
    const db = await readDatabase();
    const cluster = db.clusters.find((c) => c.id === id);
    if (!cluster) return jsonResponse({ error: "Not found" }, 404);
    if (!canViewClusterInventory(user, id)) {
      return jsonResponse({ error: "Forbidden" }, 403);
    }

    const items = (db.clusterInventory ?? [])
      .filter((i) => i.clusterId === id)
      .map((item) => ({
        ...item,
        productLabel: BUYER_PRODUCT_META[item.productType].label,
        unit: BUYER_PRODUCT_META[item.productType].unit,
      }))
      .sort((a, b) =>
        BUYER_PRODUCT_META[a.productType].label.localeCompare(
          BUYER_PRODUCT_META[b.productType].label
        )
      );

    return jsonResponse({
      clusterId: id,
      items,
      canManage: canManageClusterInventory(user, id),
    });
  } catch (e) {
    return errorResponse(e);
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await requireRole(request, STAFF_MANAGE_ROLES);
    const { id } = await params;
    const db = await readDatabase();
    const cluster = db.clusters.find((c) => c.id === id);
    if (!cluster) return jsonResponse({ error: "Not found" }, 404);
    if (!canManageClusterInventory(user, id)) {
      return jsonResponse({ error: "Forbidden" }, 403);
    }

    const body = await request.json();
    const productType = body.productType as BuyerProductType;
    const quantityAvailable = Number(body.quantityAvailable);
    const pricePerUnit = Number(body.pricePerUnit);
    const isListed = body.isListed !== false;
    const notes = body.notes?.trim() || null;

    if (!productType || !BUYER_PRODUCT_META[productType]) {
      return jsonResponse({ error: "Invalid product type" }, 400);
    }
    if (!Number.isFinite(quantityAvailable) || quantityAvailable < 0) {
      return jsonResponse({ error: "Invalid quantity" }, 400);
    }
    if (!Number.isFinite(pricePerUnit) || pricePerUnit < 0) {
      return jsonResponse({ error: "Invalid price" }, 400);
    }

    if (!db.clusterInventory) db.clusterInventory = [];

    const existing = db.clusterInventory.find(
      (i) => i.clusterId === id && i.productType === productType
    );

    const now = new Date().toISOString();
    let item: ClusterInventoryItem;

    if (existing) {
      existing.quantityAvailable = quantityAvailable;
      existing.pricePerUnit = pricePerUnit;
      existing.isListed = isListed;
      existing.notes = notes;
      existing.updatedBy = user.id;
      existing.updatedAt = now;
      item = existing;
    } else {
      item = {
        id: crypto.randomUUID(),
        clusterId: id,
        productType,
        quantityAvailable,
        pricePerUnit,
        isListed,
        notes,
        updatedBy: user.id,
        updatedAt: now,
      };
      db.clusterInventory.push(item);
    }

    syncSellerFlagsForCluster(db, id);
    await writeDatabase(db);
    return jsonResponse(
      {
        item: {
          ...item,
          productLabel: BUYER_PRODUCT_META[item.productType].label,
          unit: BUYER_PRODUCT_META[item.productType].unit,
        },
      },
      existing ? 200 : 201
    );
  } catch (e) {
    return errorResponse(e);
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await requireRole(request, STAFF_MANAGE_ROLES);
    const { id } = await params;
    const { searchParams } = new URL(request.url);
    const itemId = searchParams.get("itemId");
    if (!itemId) return jsonResponse({ error: "itemId required" }, 400);

    const db = await readDatabase();
    if (!canManageClusterInventory(user, id)) {
      return jsonResponse({ error: "Forbidden" }, 403);
    }

    const before = db.clusterInventory?.length ?? 0;
    db.clusterInventory = (db.clusterInventory ?? []).filter(
      (i) => !(i.id === itemId && i.clusterId === id)
    );
    if (db.clusterInventory.length === before) {
      return jsonResponse({ error: "Not found" }, 404);
    }

    syncSellerFlagsForCluster(db, id);
    await writeDatabase(db);
    return jsonResponse({ ok: true });
  } catch (e) {
    return errorResponse(e);
  }
}
