import { NextRequest } from "next/server";
import { getBuyerCluster } from "@/lib/buyers/catalog";
import { BUYER_PRODUCT_META } from "@/lib/constants";
import { readDatabase, writeDatabase } from "@/lib/store";
import {
  errorResponse,
  jsonResponse,
  requireAuth,
  requireRole,
} from "@/lib/auth/guards";
import type { BuyerProductType } from "@/lib/types";

export async function GET(request: NextRequest) {
  try {
    const user = await requireAuth(request);
    const db = await readDatabase();

    let requests = db.interestRequests ?? [];

    if (user.role === "admin") {
      requests = requests.filter((r) => !r.readByAdmin);
    } else if (
      user.role === "field_operator" ||
      user.role === "cluster_head"
    ) {
      requests = requests.filter(
        (r) => user.clusterIds.includes(r.clusterId) && !r.readByDoot
      );
    } else {
      return jsonResponse({ error: "Forbidden" }, 403);
    }

    return jsonResponse({
      interests: requests.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      ),
    });
  } catch (e) {
    return errorResponse(e);
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await requireRole(request, ["buyer"]);
    const body = await request.json();
    const db = await readDatabase();
    const buyer = db.buyers.find((b) => b.id === user.buyerId);

    let clusterId: string;
    let clusterName: string;
    let productType: BuyerProductType | null = null;
    let productLabel: string | null = null;
    let producerId: string | null = null;
    let producerName: string | null = null;

    if (body.clusterId && body.productType) {
      const cluster = getBuyerCluster(db, body.clusterId);
      if (!cluster) return jsonResponse({ error: "Cluster not found" }, 404);
      const listing = cluster.listings.find(
        (l) => l.productType === body.productType
      );
      if (!listing) {
        return jsonResponse({ error: "Product not available in cluster" }, 404);
      }
      clusterId = cluster.id;
      clusterName = cluster.name;
      productType = body.productType as BuyerProductType;
      productLabel = BUYER_PRODUCT_META[productType].label;
    } else if (body.producerId) {
      const producer = db.producers.find((p) => p.id === body.producerId);
      if (!producer) return jsonResponse({ error: "Not found" }, 404);
      const cluster = db.clusters.find((c) => c.id === producer.clusterId);
      clusterId = producer.clusterId;
      clusterName = cluster?.name ?? producer.village;
      producerId = producer.id;
      producerName = producer.fullName;
    } else {
      return jsonResponse(
        { error: "clusterId + productType or producerId required" },
        400
      );
    }

    const interest = {
      id: crypto.randomUUID(),
      buyerId: user.buyerId!,
      buyerName: buyer?.fullName ?? user.name,
      producerId,
      producerName,
      clusterId,
      clusterName,
      productType,
      productLabel,
      message: body.message ?? null,
      createdAt: new Date().toISOString(),
      readByAdmin: false,
      readByDoot: false,
    };

    if (!db.interestRequests) db.interestRequests = [];
    db.interestRequests.push(interest);
    await writeDatabase(db);

    return jsonResponse({ interest }, 201);
  } catch (e) {
    return errorResponse(e);
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const user = await requireAuth(request);
    const { id } = await request.json();
    const db = await readDatabase();
    const item = db.interestRequests?.find((r) => r.id === id);
    if (!item) return jsonResponse({ error: "Not found" }, 404);

    if (user.role === "admin") item.readByAdmin = true;
    if (user.role === "field_operator" || user.role === "cluster_head") {
      item.readByDoot = true;
    }

    await writeDatabase(db);
    return jsonResponse({ ok: true });
  } catch (e) {
    return errorResponse(e);
  }
}
