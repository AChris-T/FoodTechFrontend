"use client";

import type { VoterProfile } from "./useVoterDashboard";

interface Props {
  voter: VoterProfile | null;
  onLogout: () => void;
}

export default function VoterNavbar({ voter, onLogout }: Props) {
  return (
    <header className="bg-[#0A2E1A] text-white px-5 sm:px-8 py-3 flex items-center justify-between sticky top-0 z-40">
      {/* Brand */}
      <div className="flex items-center gap-2.5">
        <div className="w-7 h-7 rounded-lg bg-ui-gold flex items-center justify-center shrink-0">
          <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5">
            <path d="M12 2L13.09 8.26L19 6L14.74 10.74L21 12L14.74 13.26L19 18L13.09 15.74L12 22L10.91 15.74L5 18L9.26 13.26L3 12L9.26 10.74L5 6L10.91 8.26L12 2Z" fill="#0A2E1A" />
          </svg>
        </div>
        <div>
          <p className="text-sm font-semibold leading-tight">FoodTech Voting</p>
          <p className="text-white/30 text-[10px]">University of Ibadan</p>
        </div>
      </div>

      {/* Right: voter info + logout */}
      <div className="flex items-center gap-3">
        {voter && (
          <div className="hidden sm:block text-right">
            <p className="text-white/80 text-xs font-medium leading-tight">{voter.fullName}</p>
            <p className="text-white/30 text-[10px] mt-0.5">{voter.matricNumber}</p>
          </div>
        )}
        <button type="button" onClick={onLogout}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/10 text-white/50 text-xs font-medium hover:bg-white/8 hover:text-white/70 transition-colors">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          <span className="hidden sm:inline">Sign out</span>
        </button>
      </div>
    </header>
  );
}
