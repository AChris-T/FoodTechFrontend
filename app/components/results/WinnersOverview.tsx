"use client";

import type { PositionResult, ResultElection } from "./useResults";

function initials(name: string) {
  return name.split(" ").filter(Boolean).slice(0, 2).map(n => n[0]).join("").toUpperCase();
}

interface Props {
  election: ResultElection;
  results: PositionResult[];
  voterCount: number;
}

export default function WinnersOverview({ election, results, voterCount }: Props) {
  const winners = results.map(pos => {
    const sorted = [...pos.candidates].sort((a, b) => b.voteCount - a.voteCount);
    const winner = sorted[0];
    const posTotal = pos.candidates.reduce((s, c) => s + c.voteCount, 0);
    const pct = posTotal > 0 ? Math.round((winner.voteCount / posTotal) * 100) : 0;
    return { positionTitle: pos.positionTitle, winner, pct, posTotal };
  }).filter(w => w.winner && w.winner.voteCount > 0);

  const totalPositions = results.length;
  const totalCandidates = results.reduce((s, p) => s + p.candidates.length, 0);

  return (
    <div className="mb-8 space-y-4">
      {/* Election ended banner */}
      <div className="bg-[#0A2E1A] rounded-2xl px-6 py-5 shadow-md">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-widest text-white/40 bg-white/10 px-2.5 py-1 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-gray-400 shrink-0" />
                Election Ended
              </span>
            </div>
            <h2 className="text-white text-xl font-bold leading-snug">{election.title}</h2>
            <p className="text-white/40 text-xs mt-1">Final results — all votes counted</p>
          </div>
          <div className="flex gap-5 shrink-0 mt-1">
            <div className="text-right">
              <p className="text-white text-2xl font-extrabold leading-none">{voterCount}</p>
              <p className="text-white/40 text-[10px] mt-1 uppercase tracking-wide">Voters</p>
            </div>
            <div className="text-right">
              <p className="text-white text-2xl font-extrabold leading-none">{totalPositions}</p>
              <p className="text-white/40 text-[10px] mt-1 uppercase tracking-wide">Positions</p>
            </div>
            <div className="text-right">
              <p className="text-white text-2xl font-extrabold leading-none">{totalCandidates}</p>
              <p className="text-white/40 text-[10px] mt-1 uppercase tracking-wide">Candidates</p>
            </div>
          </div>
        </div>
      </div>

      {/* Winners grid */}
      {winners.length > 0 && (
        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3 px-1">
            Position Winners
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {winners.map(({ positionTitle, winner, pct, posTotal }) => (
              <div key={positionTitle}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow group">

                {/* Gold top bar */}
                <div className="h-1 bg-ui-gold" />

                <div className="p-4">
                  {/* Trophy + position */}
                  <div className="flex items-center gap-1.5 mb-3">
                    <svg className="w-3.5 h-3.5 text-ui-gold shrink-0" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2L13.09 8.26L19 6L14.74 10.74L21 12L14.74 13.26L19 18L13.09 15.74L12 22L10.91 15.74L5 18L9.26 13.26L3 12L9.26 10.74L5 6L10.91 8.26L12 2Z" />
                    </svg>
                    <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide truncate">{positionTitle}</p>
                  </div>

                  {/* Winner avatar */}
                  <div className="flex flex-col items-center text-center mb-3">
                    {winner.photoUrl ? (
                      <img src={winner.photoUrl} alt={winner.fullName}
                        className="w-16 h-16 rounded-2xl object-cover mb-2.5 shadow-sm ring-2 ring-ui-gold/30" />
                    ) : (
                      <div className="w-16 h-16 rounded-2xl bg-[#0A2E1A] flex items-center justify-center text-white text-lg font-bold mb-2.5 shadow-sm ring-2 ring-ui-gold/30">
                        {initials(winner.fullName)}
                      </div>
                    )}
                    <p className="text-sm font-bold text-gray-900 leading-snug line-clamp-2">{winner.fullName}</p>
                  </div>

                  {/* Vote bar */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-ui-green">{pct}%</span>
                      <span className="text-[10px] text-gray-400">{winner.voteCount}/{posTotal} votes</span>
                    </div>
                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div className="vote-progress-bar"
                        style={{ "--vote-pct": `${pct}%` } as React.CSSProperties} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {winners.length === 0 && (
        <div className="py-8 text-center text-gray-400 text-sm">
          No votes were cast in this election.
        </div>
      )}

      {/* Divider before breakdown */}
      <div className="flex items-center gap-3 pt-2">
        <div className="h-px flex-1 bg-gray-200" />
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest shrink-0">Full Breakdown</p>
        <div className="h-px flex-1 bg-gray-200" />
      </div>
    </div>
  );
}
