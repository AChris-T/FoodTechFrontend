"use client";

import type { PositionResult } from "./useResults";

export default function PositionResultCard({ pos }: { pos: PositionResult }) {
  const posTotal = pos.candidates.reduce((s, c) => s + c.voteCount, 0);
  const sorted = [...pos.candidates].sort((a, b) => b.voteCount - a.voteCount);
  const winner = sorted[0];

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-50">
        <h2 className="font-bold text-gray-900">{pos.positionTitle}</h2>
        <span className="text-xs text-gray-400">{posTotal} vote{posTotal !== 1 ? "s" : ""}</span>
      </div>

      <div className="p-6 space-y-4">
        {sorted.map((c, i) => {
          const pct = posTotal > 0 ? Math.round((c.voteCount / posTotal) * 100) : 0;
          const isLeading = c.candidateId === winner?.candidateId && c.voteCount > 0;
          return (
            <div key={c.candidateId}>
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2.5">
                  {isLeading && i === 0 && <span className="text-base">🏆</span>}
                  <span className="text-sm font-semibold text-gray-800">{c.fullName}</span>
                  {isLeading && i === 0 && (
                    <span className="text-[10px] font-bold text-amber-600 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
                      Leading
                    </span>
                  )}
                </div>
                <div className="text-right shrink-0">
                  <span className="text-sm font-bold text-gray-900">{c.voteCount}</span>
                  <span className="text-xs text-gray-400 ml-1">({pct}%)</span>
                </div>
              </div>
              <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${isLeading && i === 0 ? "bg-ui-green" : "bg-gray-300"}`}
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
