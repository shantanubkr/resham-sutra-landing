"use client";

const SESSION_KEY = "producer_session";

export interface ClientSession {
  token: string;
  user: {
    id: string;
    phone: string;
    email: string | null;
    role: string;
    name: string;
    clusterIds: string[];
    producerId: string | null;
    buyerId: string | null;
  };
}

export function getSession(): ClientSession | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? (JSON.parse(raw) as ClientSession) : null;
  } catch {
    return null;
  }
}

export function setSession(session: ClientSession) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

export function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}

export async function apiFetch<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const session = getSession();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };
  if (session?.token) headers.Authorization = `Bearer ${session.token}`;

  const res = await fetch(path, { ...options, headers });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error ?? "Request failed");
  return data as T;
}

export function roleHomePath(role: string): string {
  switch (role) {
    case "admin":
    case "cluster_head":
    case "field_operator":
      return "/admin/dashboard";
    case "producer":
      return "/producer/card";
    case "buyer":
      return "/buyer/search";
    default:
      return "/";
  }
}
