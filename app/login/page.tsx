"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { loginVoterAction } from "../lib/actions";

export default function VoterLoginPage() {
  const router = useRouter();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const result = await loginVoterAction(identifier, password);
      if (result?.error) {
        setError(result.error);
      } else {
        router.push("/dashboard");
      }
    } catch {
      setError("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="h-screen overflow-hidden flex bg-[#F6F8F6]">

      {/* ══ LEFT — Brand Panel ═══════════════════════════════════ */}
      <div className="hidden lg:flex lg:w-[44%] xl:w-[42%] bg-[#050D07] flex-col h-full overflow-hidden relative shrink-0">

        {/* Background */}
        <div className="absolute inset-0 hero-dot-grid opacity-[0.14]" />
        <div className="absolute -top-20 -right-20 w-72 h-72 hero-decor-circle opacity-[0.07]" />
        <div className="absolute -bottom-10 -left-10 w-52 h-52 hero-decor-circle opacity-[0.05]" />

        <div className="relative z-10 flex flex-col h-full px-10 py-8 xl:px-12 xl:py-10">

          {/* Logo */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-8 h-8 rounded-lg bg-ui-gold flex items-center justify-center shrink-0 shadow-md shadow-ui-gold/20">
              <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
                <path
                  d="M12 2L13.09 8.26L19 6L14.74 10.74L21 12L14.74 13.26L19 18L13.09 15.74L12 22L10.91 15.74L5 18L9.26 13.26L3 12L9.26 10.74L5 6L10.91 8.26L12 2Z"
                  fill="#0A2E1A"
                />
              </svg>
            </div>
            <div>
              <p className="text-white font-bold text-[13px] leading-tight">FoodTech Voting</p>
              <p className="text-ui-gold text-[9px] tracking-widest uppercase leading-tight">University of Ibadan</p>
            </div>
          </div>

          {/* Centre content */}
          <div className="flex-1 flex flex-col justify-center min-h-0 py-6">

            {/* Live badge */}
            <div className="badge-highlight inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold w-fit mb-5 tracking-wide">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
              ELECTIONS LIVE · 2025/2026
            </div>

            {/* Headline */}
            <h2 className="font-black text-white leading-[1.06] mb-4">
              <span className="block text-[2.4rem]">Make Your</span>
              <span className="block text-[2.4rem]">Voice</span>
              <span className="block text-[2.4rem] text-ui-gold">Heard.</span>
            </h2>

            <p className="text-white/40 text-[12px] leading-relaxed mb-7 max-w-[230px]">
              Cast your ballot for the Dept. of Food Technology student elections.
            </p>

            {/* Trust row */}
            <div className="mt-6 flex flex-wrap gap-2">
              {["End-to-end encrypted", "Fully anonymous", "One vote only"].map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] text-white/35 border border-white/10 rounded-full px-2.5 py-0.5"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Footer */}
          <p className="text-white/20 text-[10px] shrink-0">
            © {new Date().getFullYear()} University of Ibadan — Dept. of Food Technology
          </p>
        </div>
      </div>

      {/* ══ RIGHT — Form Panel ═══════════════════════════════════ */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">

        {/* Top bar */}
        <div className="flex items-center justify-between px-8 py-3.5 shrink-0">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-gray-400 hover:text-gray-700 text-[12px] font-medium transition-colors group"
          >
            <svg className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to home
          </Link>
         {/*  <Link href="/admin/login" className="text-[11px] text-gray-400 hover:text-ui-green font-semibold transition-colors">
            Admin Portal →
          </Link> */}
        </div>

        {/* Form — centred */}
        <div className="flex-1 flex items-center justify-center px-8 min-h-0">
          <div className="w-full max-w-[390px]">

            {/* Mobile logo */}
            <div className="lg:hidden flex items-center gap-3 mb-7">
              <div className="w-8 h-8 rounded-lg bg-ui-green-dark flex items-center justify-center shrink-0">
                <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
                  <path d="M12 2L13.09 8.26L19 6L14.74 10.74L21 12L14.74 13.26L19 18L13.09 15.74L12 22L10.91 15.74L5 18L9.26 13.26L3 12L9.26 10.74L5 6L10.91 8.26L12 2Z" fill="#C9A84C" />
                </svg>
              </div>
              <div>
                <p className="font-bold text-[13px] text-gray-900 leading-tight">FoodTech Voting</p>
                <p className="text-ui-gold text-[9px] tracking-wide uppercase">University of Ibadan</p>
              </div>
            </div>

            {/* Header */}
            <div className="mb-7">
              <h1 className="text-[1.7rem] font-black text-gray-900 leading-tight mb-1.5">
                Welcome back, Voter
              </h1>
              <p className="text-gray-400 text-[13px]">
                Enter your credentials to cast your ballot.
              </p>
            </div>

            {/* Error */}
            {error && (
              <div className="mb-5 px-4 py-3 rounded-xl bg-red-50 border border-red-100 flex items-center gap-3">
                <svg className="w-4 h-4 text-red-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                </svg>
                <p className="text-red-600 text-[12px] font-medium">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3.5">

              {/* Matric / Email */}
              <div>
                <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">
                  Matric Number or Email
                </label>
                <div className="relative">
                  <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder="UG/22/01234 or email@ui.edu.ng"
                    required
                    autoComplete="username"
                    className="w-full pl-10 pr-4 py-3 bg-white border border-gray-100 rounded-xl text-gray-900 text-[13px] placeholder-gray-300 shadow-sm focus:border-ui-green focus:ring-2 focus:ring-ui-green/10 outline-none transition-all"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                    Password
                  </label>
                </div>
                <div className="relative">
                  <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                    autoComplete="current-password"
                    className="w-full pl-10 pr-11 py-3 bg-white border border-gray-100 rounded-xl text-gray-900 text-[13px] placeholder-gray-300 shadow-sm focus:border-ui-green focus:ring-2 focus:ring-ui-green/10 outline-none transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500 transition-colors"
                  >
                    {showPassword ? (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 mt-1 rounded-xl bg-ui-gold text-[#0A2E1A] font-black text-[14px] hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-ui-gold/20 hover:scale-[1.01] transition-all"
              >
                {loading ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Signing in…
                  </>
                ) : (
                  <>
                    Login to Vote
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </>
                )}
              </button>
            </form>

            {/* Footer note */}
            <p className="mt-6 text-center text-[11px] text-gray-300 leading-relaxed">
              Password was sent to your registered email.{" "}
              <span className="text-gray-400 font-medium">Contact your admin if you need help.</span>
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="shrink-0 px-8 py-3 border-t border-gray-100 flex items-center justify-between">
          <p className="text-[11px] text-gray-300">
            © {new Date().getFullYear()} University of Ibadan
          </p>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[11px] text-emerald-500 font-medium">Elections Live</span>
          </div>
        </div>
      </div>
    </div>
  );
}
