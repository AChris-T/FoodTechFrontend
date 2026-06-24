"use client";

import type { Candidate } from "./useVoterDashboard";

function initials(name: string) {
  return name.split(" ").filter(Boolean).slice(0, 2).map(n => n[0]).join("").toUpperCase();
}

interface Props {
  candidate: Candidate;
  selected: boolean;
  onSelect: () => void;
}

export default function CandidateCard({ candidate: c, selected, onSelect }: Props) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`w-full flex items-center gap-4 px-5 py-4 text-left transition-all duration-150 group border-b border-gray-50 last:border-0
        ${selected ? "bg-[#F0F9F4]" : "bg-white hover:bg-gray-50/70"}`}
    >
      {/* Avatar */}
      <div className="shrink-0 relative">
        {c.photoUrl ? (
          <img src={c.photoUrl} alt={c.fullName}
            className={`w-14 h-14 rounded-2xl object-cover transition-all ${selected ? "ring-2 ring-ui-green ring-offset-2" : ""}`} />
        ) : (
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-base font-bold transition-all
            ${selected ? "bg-ui-green text-white" : "bg-gray-100 text-gray-500 group-hover:bg-gray-200"}`}>
            {initials(c.fullName)}
          </div>
        )}
        {c.level && (
          <span className={`absolute -bottom-1 -right-1 text-[9px] font-bold px-1.5 py-0.5 rounded-full border
            ${selected ? "bg-ui-green text-white border-ui-green" : "bg-white text-gray-500 border-gray-200"}`}>
            {c.level}
          </span>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className={`font-semibold text-[15px] leading-snug ${selected ? "text-ui-green-dark" : "text-gray-800"}`}>
          {c.fullName}
        </p>
        {c.bio && (
          <p className="text-xs text-gray-400 mt-0.5 leading-relaxed line-clamp-2">{c.bio}</p>
        )}
      </div>

      {/* Radio */}
      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all
        ${selected ? "border-ui-green bg-ui-green" : "border-gray-300 group-hover:border-gray-400"}`}>
        {selected && <div className="w-2 h-2 rounded-full bg-white" />}
      </div>
    </button>
  );
}
