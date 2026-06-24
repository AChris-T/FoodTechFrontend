"use client";

import Link from "next/link";
import { StatusBadge } from "../ui/Badge";
import type { DashElection } from "./useDashboard";

export default function ElectionsList({ elections }: { elections: DashElection[] }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-gray-50">
        <div>
          <h2 className="font-bold text-gray-900 text-[15px]">All Elections</h2>
          <p className="text-gray-400 text-xs mt-0.5">{elections.length} total</p>
        </div>
        <Link href="/admin/elections"
          className="text-xs text-ui-green font-bold hover:underline flex items-center gap-1">
          Manage
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>

      {elections.length === 0 ? (
        <div className="py-14 flex flex-col items-center gap-3 text-gray-400">
          <svg className="w-10 h-10 text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <p className="text-sm">No elections created yet</p>
          <Link href="/admin/elections" className="text-xs text-ui-green font-bold hover:underline">
            Create first election →
          </Link>
        </div>
      ) : (
        <div className="divide-y divide-gray-50">
          {elections.map((el, i) => (
            <div key={el.id} className="flex items-center gap-4 px-5 sm:px-6 py-3.5 hover:bg-gray-50/60 transition-colors">
              <span className="text-gray-300 text-xs font-mono w-5 shrink-0">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="flex-1 min-w-0 font-semibold text-gray-800 text-sm truncate">{el.title}</p>
              <div className="flex items-center gap-2 shrink-0">
                <span className="hidden sm:block text-xs text-gray-400">{el.positions.length} pos.</span>
                <StatusBadge status={el.status} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
