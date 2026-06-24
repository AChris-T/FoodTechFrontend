"use client";

import Link from "next/link";

const LINKS = [
  { label: "Manage Voters",     href: "/admin/voters",     icon: "👥" },
  { label: "Manage Elections",  href: "/admin/elections",  icon: "🗳️" },
  { label: "Manage Candidates", href: "/admin/candidates", icon: "👤" },
  { label: "View Results",      href: "/admin/results",    icon: "📊" },
];

export default function QuickLinks() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
      <h2 className="font-bold text-gray-900 text-[15px] mb-4">Quick Actions</h2>
      <div className="space-y-1">
        {LINKS.map(({ label, href, icon }) => (
          <Link key={label} href={href}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50 transition-colors">
            <span className="text-lg">{icon}</span>
            <span className="text-sm font-semibold text-gray-700">{label}</span>
            <svg className="w-4 h-4 text-gray-300 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        ))}
      </div>
    </div>
  );
}
