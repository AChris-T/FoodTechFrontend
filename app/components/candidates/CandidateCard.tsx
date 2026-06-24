"use client";

import type { Candidate } from "./useCandidates";

function initials(name: string) {
  return name.split(" ").filter(Boolean).slice(0, 2).map(n => n[0]).join("").toUpperCase();
}

interface Props {
  candidate: Candidate;
  positionTitle: string;
  onDelete: () => void;
}

export default function CandidateCard({ candidate: c, positionTitle, onDelete }: Props) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden group hover:shadow-md transition-shadow">
      <div className="relative h-44 bg-linear-to-br from-ui-green-light to-gray-100">
        {c.photoUrl ? (
          <img src={c.photoUrl} alt={c.fullName} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-ui-green flex items-center justify-center">
              <span className="text-white text-xl font-black">{initials(c.fullName)}</span>
            </div>
          </div>
        )}
        <button type="button" onClick={onDelete}
          aria-label={`Remove ${c.fullName}`} title={`Remove ${c.fullName}`}
          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 p-1.5 rounded-lg bg-red-600/90 text-white hover:bg-red-700 transition-all">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        {c.level && (
          <span className="absolute bottom-2 left-2 text-[10px] font-bold bg-ui-green text-white px-2 py-0.5 rounded-full">
            {c.level}
          </span>
        )}
      </div>
      <div className="p-4">
        <p className="font-bold text-gray-900 text-[15px] leading-tight">{c.fullName}</p>
        <p className="text-ui-green text-xs font-semibold mt-0.5">{positionTitle}</p>
        {c.bio && <p className="text-gray-400 text-xs mt-2 leading-relaxed line-clamp-2">{c.bio}</p>}
      </div>
    </div>
  );
}
