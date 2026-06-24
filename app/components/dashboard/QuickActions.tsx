"use client";

import Link from "next/link";

const LINKS = [
  { label: "Voters",     href: "/admin/voters",     desc: "Add, edit & manage voter accounts",    color: "from-slate-800 to-slate-900" },
  { label: "Elections",  href: "/admin/elections",  desc: "Create elections & set positions",      color: "from-ui-green-dark to-ui-green" },
  { label: "Candidates", href: "/admin/candidates", desc: "Register candidates per position",      color: "from-violet-700 to-violet-900" },
  { label: "Results",    href: "/admin/results",    desc: "Live tallies & vote breakdowns",         color: "from-amber-600 to-amber-800" },
];

export default function QuickActions() {
  return (
    <div>
      <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3">Quick Actions</p>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {LINKS.map(({ label, href, desc, color }) => (
          <Link key={href} href={href}
            className={`group relative overflow-hidden rounded-2xl bg-linear-to-br ${color} p-5 text-white hover:scale-[1.02] hover:shadow-xl transition-all duration-200 shadow-md`}>
            <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity bg-white" />
            <p className="font-extrabold text-sm leading-tight mb-1">{label}</p>
            <p className="text-white/55 text-[11px] leading-relaxed">{desc}</p>
            <svg className="absolute bottom-4 right-4 w-4 h-4 text-white/30 group-hover:text-white/60 group-hover:translate-x-0.5 transition-all"
              fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        ))}
      </div>
    </div>
  );
}
