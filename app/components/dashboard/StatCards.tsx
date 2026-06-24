"use client";

import Link from "next/link";
import type { VoterStats } from "./useDashboard";

const icons = {
  total: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
  eligible: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  voted: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7l2 2 4-4" /></svg>,
  restricted: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" /></svg>,
};

export default function StatCards({ stats }: { stats: VoterStats }) {
  const cards = [
    { label: "Total Voters",    value: stats.total,      icon: icons.total,      iconBg: "bg-slate-100 text-slate-600",   valueCls: "text-gray-900",  href: "/admin/voters" },
    { label: "Eligible to Vote",value: stats.eligible,   icon: icons.eligible,   iconBg: "bg-emerald-50 text-emerald-600",valueCls: "text-emerald-700",href: "/admin/voters" },
    { label: "Votes Cast",      value: stats.voted,      icon: icons.voted,      iconBg: "bg-blue-50 text-blue-600",      valueCls: "text-blue-700",  href: "/admin/results" },
    { label: "Restricted",      value: stats.restricted, icon: icons.restricted, iconBg: "bg-red-50 text-red-500",         valueCls: "text-red-600",   href: "/admin/voters" },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      {cards.map(({ label, value, icon, iconBg, valueCls, href }) => (
        <Link key={label} href={href}
          className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all p-4 sm:p-5 flex flex-col gap-4">
          <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${iconBg}`}>
            {icon}
          </div>
          <div>
            <p className={`text-2xl sm:text-3xl font-extrabold leading-none tracking-tight ${valueCls}`}>{value}</p>
            <p className="text-gray-400 text-xs font-semibold mt-1 leading-tight">{label}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
