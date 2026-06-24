"use client";

import type { VoterStats } from "./useDashboard";

interface Props { stats: VoterStats; turnout: number; }

export default function TurnoutBar({ stats, turnout }: Props) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="font-bold text-gray-800 text-sm">Voter Turnout</p>
          <p className="text-gray-400 text-xs mt-0.5">
            {stats.voted} of {stats.eligible} eligible voters have voted
          </p>
        </div>
        <div className="text-right">
          <p className="text-3xl font-extrabold text-ui-green leading-none">{turnout}%</p>
          <p className="text-[10px] text-gray-400 font-semibold mt-0.5 uppercase tracking-wide">Participation</p>
        </div>
      </div>

      <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
        <div className="turnout-bar" style={{ width: `${turnout}%` }} />
      </div>

      <div className="flex items-center justify-between mt-3 text-[11px] font-semibold text-gray-400">
        <span>0%</span>
        <span className="text-ui-green">{turnout}% voted</span>
        <span>100%</span>
      </div>
    </div>
  );
}
