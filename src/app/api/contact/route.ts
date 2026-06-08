import { NextResponse } from "next/server";
import { CONTACT } from "@/lib/constants";
import { VISITOR_TYPES, type VisitorTypeId } from "@/lib/contact";

export type ContactSubmission = {
  visitorType: VisitorTypeId;
  name: string;
  organization?: string;
  email: string;
  phone?: string;
  state?: string;
  message: string;
  program?: string | null;
  product?: string | null;
  category?: string | null;
  /** Honeypot — must stay empty */
  website?: string;
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidVisitorType(value: string): value is VisitorTypeId {
  return VISITOR_TYPES.some((t) => t.id === value);
}

function buildEmailBody(data: ContactSubmission) {
  const visitorLabel =
    VISITOR_TYPES.find((t) => t.id === data.visitorType)?.label ?? data.visitorType;

  const lines = [
    `Visitor type: ${visitorLabel}`,
    `Name: ${data.name}`,
    data.organization ? `Organization: ${data.organization}` : null,
    `Email: ${data.email}`,
    data.phone ? `Phone: ${data.phone}` : null,
    data.state ? `State / region: ${data.state}` : null,
    data.program ? `Program: ${data.program}` : null,
    data.product ? `Product interest: ${data.product}` : null,
    data.category ? `Category: ${data.category}` : null,
    "",
    "Message:",
    data.message,
  ].filter(Boolean);

  return lines.join("\n");
}

async function sendViaWeb3Forms(data: ContactSubmission, accessKey: string) {
  const visitorLabel =
    VISITOR_TYPES.find((t) => t.id === data.visitorType)?.label ?? data.visitorType;

  const response = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      access_key: accessKey,
      subject: `Resham Sutra enquiry — ${visitorLabel} — ${data.name}`,
      from_name: data.name,
      email: data.email,
      name: data.name,
      organization: data.organization ?? "",
      phone: data.phone ?? "",
      state: data.state ?? "",
      visitor_type: visitorLabel,
      program: data.program ?? "",
      product: data.product ?? "",
      category: data.category ?? "",
      message: data.message,
    }),
  });

  const result = (await response.json()) as { success?: boolean; message?: string };

  if (!response.ok || !result.success) {
    throw new Error(result.message ?? "Web3Forms rejected the submission");
  }
}

async function sendViaResend(
  data: ContactSubmission,
  apiKey: string,
  from: string,
  to: string,
) {
  const visitorLabel =
    VISITOR_TYPES.find((t) => t.id === data.visitorType)?.label ?? data.visitorType;
  const text = buildEmailBody(data);

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: data.email,
      subject: `Website enquiry — ${visitorLabel} — ${data.name}`,
      text,
    }),
  });

  if (!response.ok) {
    const err = (await response.json().catch(() => ({}))) as { message?: string };
    throw new Error(err.message ?? `Resend error (${response.status})`);
  }
}

export async function POST(request: Request) {
  let body: ContactSubmission;

  try {
    body = (await request.json()) as ContactSubmission;
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  if (body.website) {
    return NextResponse.json({ ok: true });
  }

  if (
    !body.visitorType ||
    !isValidVisitorType(body.visitorType) ||
    !body.name?.trim() ||
    !body.email?.trim() ||
    !body.message?.trim()
  ) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  if (!isValidEmail(body.email.trim())) {
    return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
  }

  const payload: ContactSubmission = {
    visitorType: body.visitorType,
    name: body.name.trim(),
    organization: body.organization?.trim(),
    email: body.email.trim(),
    phone: body.phone?.trim(),
    state: body.state?.trim(),
    message: body.message.trim(),
    program: body.program?.trim() || null,
    product: body.product?.trim() || null,
    category: body.category?.trim() || null,
  };

  const web3Key = process.env.WEB3FORMS_ACCESS_KEY;
  const resendKey = process.env.RESEND_API_KEY;
  const resendFrom = process.env.RESEND_FROM_EMAIL;
  const contactTo = process.env.CONTACT_TO_EMAIL ?? CONTACT.email;

  try {
    if (web3Key) {
      await sendViaWeb3Forms(payload, web3Key);
    } else if (resendKey && resendFrom) {
      await sendViaResend(payload, resendKey, resendFrom, contactTo);
    } else {
      return NextResponse.json(
        {
          error:
            "Contact form is not configured. Set WEB3FORMS_ACCESS_KEY or RESEND_API_KEY on the server.",
        },
        { status: 503 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[contact]", error);
    return NextResponse.json(
      { error: "Failed to send your message. Please try WhatsApp or email us directly." },
      { status: 500 },
    );
  }
}
