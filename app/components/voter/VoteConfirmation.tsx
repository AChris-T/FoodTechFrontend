"use client";

import type { VoterElection, MyVote } from "./useVoterDashboard";

interface Props { election: VoterElection; votes: MyVote[]; }

export default function VoteConfirmation({ election, votes }: Props) {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
      <div className="w-20 h-20 rounded-full bg-ui-green-light border-2 border-ui-green/20 flex items-center justify-center mb-6 shadow-lg shadow-ui-green/10">
        <svg className="w-9 h-9 text-ui-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
        </svg>
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mb-1">Ballot submitted</h2>
      <p className="text-gray-400 text-sm max-w-xs">Your vote has been securely recorded for <span className="font-medium text-gray-600">{election.title}</span></p>

      <div className="mt-8 w-full max-w-sm bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-5 py-3 border-b border-gray-50 text-left">
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">Your selections</p>
        </div>
        <div className="divide-y divide-gray-50">
          {votes.map(v => {
            const pos = election.positions.find(p => p.id === v.positionId);
            const cand = pos?.candidates.find(c => c.id === v.candidateId);
            return (
              <div key={v.positionId} className="flex items-center justify-between px-5 py-3.5 text-left">
                <span className="text-sm text-gray-400">{pos?.title ?? "—"}</span>
                <span className="text-sm font-semibold text-gray-800">{cand?.fullName ?? "—"}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-5 inline-flex items-center gap-2 text-xs text-gray-400 bg-white border border-gray-100 rounded-xl px-4 py-2.5 shadow-sm">
        <svg className="w-3.5 h-3.5 text-ui-green shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
        Your vote is anonymous and encrypted
      </div>
    </div>
  );
}
