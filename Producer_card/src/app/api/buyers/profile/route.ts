import { NextRequest } from "next/server";
import { readDatabase, writeDatabase } from "@/lib/store";
import { errorResponse, jsonResponse } from "@/lib/auth/guards";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { phone, role, name, email, buyerType, organisationName, interestCategories } = body;

    if (!phone || !role || !name) {
      return jsonResponse({ error: "Phone, role, and name required" }, 400);
    }

    const db = await readDatabase();
    const existing = db.users.find((u) => u.phone === phone && u.role === role);
    if (existing) {
      return jsonResponse({ error: "User already exists" }, 409);
    }

    const userId = crypto.randomUUID();
    let producerId: string | null = null;
    let buyerId: string | null = null;

    if (role === "buyer") {
      buyerId = crypto.randomUUID();
      db.buyers.push({
        id: buyerId,
        userId,
        fullName: name,
        buyerType: buyerType ?? "individual",
        organisationName: organisationName ?? null,
        phone,
        email: email ?? "",
        interestCategories: interestCategories ?? [],
        createdAt: new Date().toISOString(),
      });
    }

    db.users.push({
      id: userId,
      phone,
      email: email ?? null,
      role,
      clusterIds: [],
      producerId,
      buyerId,
      name,
      isActive: true,
      createdAt: new Date().toISOString(),
    });

    await writeDatabase(db);
    return jsonResponse({ userId, producerId, buyerId }, 201);
  } catch (e) {
    return errorResponse(e);
  }
}

export async function GET(request: NextRequest) {
  try {
    const db = await readDatabase();
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    if (!userId) return jsonResponse({ error: "userId required" }, 400);

    const buyer = db.buyers.find((b) => b.userId === userId);
    return jsonResponse({ buyer });
  } catch (e) {
    return errorResponse(e);
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const db = await readDatabase();
    const buyer = db.buyers.find((b) => b.id === body.buyerId);
    if (!buyer) return jsonResponse({ error: "Not found" }, 404);

    Object.assign(buyer, {
      fullName: body.fullName ?? buyer.fullName,
      buyerType: body.buyerType ?? buyer.buyerType,
      organisationName: body.organisationName ?? buyer.organisationName,
      phone: body.phone ?? buyer.phone,
      email: body.email ?? buyer.email,
      interestCategories: body.interestCategories ?? buyer.interestCategories,
    });

    await writeDatabase(db);
    return jsonResponse({ buyer });
  } catch (e) {
    return errorResponse(e);
  }
}
