"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { logoutAdminAction } from "../../lib/actions";
import Spinner from "../ui/Spinner";

export default function SignOutCard() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleLogout() {
    setLoading(true);
    await logoutAdminAction();
    router.push("/admin/login");
  }

  return (
    <div className="bg-white rounded-2xl border border-red-100 shadow-sm p-6">
      <h2 className="font-bold text-red-600 text-[15px] mb-1">Sign Out</h2>
      <p className="text-gray-400 text-sm mb-4">You will be redirected to the admin login page.</p>
      <button
        type="button"
        onClick={handleLogout}
        disabled={loading}
        className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-50 text-red-600 border border-red-200 text-sm font-semibold hover:bg-red-100 disabled:opacity-60 transition-colors"
      >
        {loading
          ? <Spinner className="w-4 h-4 text-red-500" />
          : <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>}
        {loading ? "Signing out…" : "Sign Out"}
      </button>
    </div>
  );
}
