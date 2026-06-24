'use server'

import { cookies } from 'next/headers'

const BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000/api/v1'

const COOKIE_OPTS = {
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  path: '/',
  maxAge: 60 * 60 * 8,
}

// Extracts a plain string from whatever NestJS / the HttpExceptionFilter returns as `message`.
// NestJS can return: string | string[] | { message: string | string[], error: string, statusCode: number }
function extractMessage(raw: unknown, fallback: string): string {
  if (!raw) return fallback
  if (typeof raw === 'string') return raw
  if (Array.isArray(raw)) return (raw as string[]).join(', ')
  if (typeof raw === 'object') {
    const r = raw as Record<string, unknown>
    const inner = r.message
    if (Array.isArray(inner)) return (inner as string[]).join(', ')
    if (typeof inner === 'string') return inner
  }
  return fallback
}

export async function loginAdminAction(email: string, password: string) {
  try {
    const res = await fetch(`${BASE}/admin-auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
    const data = await res.json().catch(() => ({})) as Record<string, unknown>
    if (!res.ok) {
      return { error: extractMessage(data.message, 'Login failed') }
    }

    const cookieStore = await cookies()
    cookieStore.set('admin_token', data.accessToken as string, COOKIE_OPTS)
    return { success: true }
  } catch {
    return { error: 'Network error. Check your connection.' }
  }
}

export async function loginVoterAction(identifier: string, password: string) {
  try {
    const res = await fetch(`${BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ identifier, password }),
    })
    const data = await res.json().catch(() => ({})) as Record<string, unknown>
    if (!res.ok) {
      return { error: extractMessage(data.message, 'Login failed') }
    }

    const cookieStore = await cookies()
    cookieStore.set('voter_token', data.accessToken as string, COOKIE_OPTS)
    return { success: true }
  } catch {
    return { error: 'Network error. Check your connection.' }
  }
}

export async function logoutAdminAction() {
  const cookieStore = await cookies()
  cookieStore.delete('admin_token')
}

export async function logoutVoterAction() {
  const cookieStore = await cookies()
  cookieStore.delete('voter_token')
}
