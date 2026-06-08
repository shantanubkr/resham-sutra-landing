import { NextRequest } from "next/server";
import { readDatabase, writeDatabase } from "@/lib/store";
import { DEMO_OTP } from "@/lib/constants";
import { errorResponse, jsonResponse } from "@/lib/auth/guards";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { phone, role, otp, email, name } = body;

    if (!phone || !role) {
      return jsonResponse({ error: "Phone and role are required" }, 400);
    }
    if (otp !== DEMO_OTP) {
      return jsonResponse({ error: "Invalid OTP. Use 123456 for demo." }, 401);
    }

    const db = await readDatabase();
    let user = db.users.find((u) => u.phone === phone && u.role === role);

    if (
      !user &&
      role !== "admin" &&
      role !== "field_operator" &&
      role !== "cluster_head"
    ) {
      user = {
        id: crypto.randomUUID(),
        phone,
        email: email ?? null,
        role,
        clusterIds: [],
        producerId: null,
        buyerId: null,
        name: name ?? phone,
        isActive: true,
        createdAt: new Date().toISOString(),
      };
      db.users.push(user);
    }

    if (!user) {
      user = db.users.find((u) => u.role === role && u.isActive);
    }

    if (!user) {
      return jsonResponse({ error: "No demo user found for this role" }, 404);
    }

    const token = crypto.randomUUID();
    const now = new Date();
    const expiresAt = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

    db.sessions.push({
      token,
      userId: user.id,
      createdAt: now.toISOString(),
      expiresAt: expiresAt.toISOString(),
    });

    await writeDatabase(db);

    return jsonResponse({
      token,
      user: {
        id: user.id,
        phone: user.phone,
        email: user.email,
        role: user.role,
        name: user.name,
        clusterIds: user.clusterIds,
        producerId: user.producerId,
        buyerId: user.buyerId,
      },
    });
  } catch (e) {
    return errorResponse(e);
  }
}
