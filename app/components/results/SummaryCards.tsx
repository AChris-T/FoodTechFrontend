"use client";

import type { PositionResult } from "./useResults";

export default function SummaryCards({ results, voterCount }: { results: PositionResult[]; voterCount: number }) {
  const cards = [
    { label: "Voters Who Voted",  value: voterCount,                                           color: "text-ui-green" },
    { label: "Positions",         value: results.length,                                        color: "text-blue-600" },
    { label: "Candidates",        value: results.reduce((s, p) => s + p.candidates.length, 0), color: "text-violet-600" },
  ];

  return (
    <div className="grid grid-cols-3 gap-4 mb-7">
      {cards.map(({ label, value, color }) => (
        <div key={label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-shadow">
          <p className={`text-2xl sm:text-3xl font-extrabold leading-none ${color}`}>{value}</p>
          <p className="text-xs text-gray-500 mt-1.5 font-semibold">{label}</p>
        </div>
      ))}
    </div>
  );
}
