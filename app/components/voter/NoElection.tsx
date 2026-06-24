"use client";

import type { VoterProfile } from "./useVoterDashboard";

export default function NoElection({ voter }: { voter: VoterProfile | null }) {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6">
      <div className="w-16 h-16 rounded-2xl bg-white border border-gray-100 shadow-sm flex items-center justify-center mb-5">
        <svg className="w-7 h-7 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      </div>
      <h2 className="text-lg font-semibold text-gray-700 mb-1.5">No active election</h2>
      <p className="text-gray-400 text-sm max-w-xs leading-relaxed">
        There is no election currently open for voting. Check back when one is activated.
      </p>
      {voter && (
        <p className="text-xs text-gray-300 mt-6">
          Signed in as <span className="text-gray-400 font-medium">{voter.fullName}</span>
        </p>
      )}
    </div>
  );
}
