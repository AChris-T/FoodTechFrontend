"use client";

import Link from "next/link";
import type { DashElection } from "./useDashboard";

interface Props {
  activeElection: DashElection | undefined;
  draftCount: number;
}

export default function ActiveElectionBanner({ activeElection, draftCount }: Props) {
  if (!activeElection) {
    return (
      <div className="rounded-2xl border-2 border-dashed border-amber-200 bg-amber-50/50 p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="w-10 h-10 rounded-2xl bg-amber-100 flex items-center justify-center shrink-0">
          <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
          </svg>
        </div>
        <div className="flex-1">
          <p className="font-bold text-amber-900 text-sm">No Active Election</p>
          <p className="text-amber-700 text-xs mt-0.5">
            {draftCount} draft{draftCount !== 1 ? "s" : ""} waiting — activate one to open voting.
          </p>
        </div>
        <Link href="/admin/elections" className="shrink-0 px-4 py-2 rounded-xl bg-amber-600 text-white text-sm font-bold hover:bg-amber-700 transition-colors">
          Go to Elections
        </Link>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-2xl bg-[#071710] p-6 sm:p-7 text-white shadow-xl shadow-ui-green-dark/20">
      <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-ui-gold opacity-10" />
      <div className="absolute -bottom-8 right-16 w-32 h-32 rounded-full bg-ui-green opacity-20" />
      <div className="relative flex flex-col sm:flex-row sm:items-center gap-5">
        <div className="flex-1 min-w-0">
          <div className="inline-flex items-center gap-2 bg-emerald-500/15 border border-emerald-500/25 text-emerald-400 text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Election Live
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold leading-snug tracking-tight pr-4">
            {activeElection.title}
          </h2>
          <p className="text-white/40 text-sm mt-1.5">
            {activeElection.positions.length} position{activeElection.positions.length !== 1 ? "s" : ""} · Voting in progress
          </p>
        </div>
        <div className="flex sm:flex-col gap-3 sm:gap-2 shrink-0">
          <Link href="/admin/results"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-ui-gold text-[#071710] text-sm font-extrabold hover:opacity-90 transition-all shadow-lg shadow-ui-gold/25">
            Live Results
          </Link>
          <Link href="/admin/elections"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/8 border border-white/12 text-white/80 text-sm font-semibold hover:bg-white/14 transition-all">
            Manage
          </Link>
        </div>
      </div>
    </div>
  );
}
