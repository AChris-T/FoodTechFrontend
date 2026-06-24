const BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api/v1";

export async function apiFetch<T = unknown>(
  path: string,
  options: RequestInit & { token?: string } = {}
): Promise<T> {
  const { token, ...rest } = options;
  const headers: Record<string, string> = {
    ...(rest.headers as Record<string, string>),
  };
  if (token) headers["Authorization"] = `Bearer ${token}`;
  if (rest.body && typeof rest.body === "string") {
    headers["Content-Type"] = "application/json";
  }

  const res = await fetch(`${BASE}${path}`, { ...rest, headers });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const d = data as { message?: string | string[] };
    const msg = Array.isArray(d.message) ? d.message.join(', ') : (d.message ?? "Request failed");
    throw new Error(msg);
  }
  return data as T;
}

function parseCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(
    new RegExp(`(?:^|; )${name}=([^;]*)`)
  );
  return match ? decodeURIComponent(match[1]) : null;
}

function setCookie(name: string, value: string, maxAge = 60 * 60 * 8) {
  if (typeof document === "undefined") return;
  const secure =
    typeof location !== "undefined" && location.protocol === "https:"
      ? "; Secure"
      : "";
  document.cookie = `${name}=${encodeURIComponent(value)}; Path=/; SameSite=Lax; Max-Age=${maxAge}${secure}`;
}

function deleteCookie(name: string) {
  if (typeof document === "undefined") return;
  document.cookie = `${name}=; Path=/; Max-Age=0`;
}

export function getAdminToken(): string | null {
  return parseCookie("admin_token");
}

export function setAdminToken(token: string) {
  setCookie("admin_token", token);
}

export function clearAdminToken() {
  deleteCookie("admin_token");
}

export function getVoterToken(): string | null {
  return parseCookie("voter_token");
}

export function setVoterToken(token: string) {
  setCookie("voter_token", token);
}
