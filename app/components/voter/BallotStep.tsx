"use client";

import CandidateCard from "./CandidateCard";
import type { Position } from "./useVoterDashboard";

interface Props {
  position: Position;
  stepNumber: number;
  totalSteps: number;
  selectedId: string | undefined;
  onSelect: (id: string) => void;
  onNext: () => void;
  onPrev: () => void;
  isFirst: boolean;
  isLast: boolean;
}

export default function BallotStep({ position: pos, stepNumber, totalSteps, selectedId, onSelect, onNext, onPrev, isFirst, isLast }: Props) {
  return (
    <div className="space-y-5">
      {/* Position card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

        {/* Card header */}
        <div className="px-6 py-5 border-b border-gray-50">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest mb-1">
                Position {stepNumber} of {totalSteps}
              </p>
              <h2 className="text-xl font-bold text-gray-900 leading-snug">{pos.title}</h2>
            </div>
            {selectedId ? (
              <span className="shrink-0 flex items-center gap-1.5 text-[11px] font-semibold text-ui-green bg-ui-green-light px-3 py-1.5 rounded-full mt-1">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                Selected
              </span>
            ) : (
              <span className="shrink-0 text-[11px] font-medium text-gray-400 bg-gray-50 border border-gray-100 px-3 py-1.5 rounded-full mt-1">
                Optional
              </span>
            )}
          </div>
          <p className="text-sm text-gray-400 mt-2">
            {pos.candidates.length > 0 ? `${pos.candidates.length} candidate${pos.candidates.length !== 1 ? "s" : ""} — tap to select one` : "No candidates registered"}
          </p>
        </div>

        {/* Candidate list */}
        {pos.candidates.length === 0 ? (
          <div className="px-6 py-10 text-center">
            <p className="text-sm text-gray-400">No candidates have been registered for this position yet.</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {pos.candidates.map(c => (
              <CandidateCard
                key={c.id}
                candidate={c}
                selected={selectedId === c.id}
                onSelect={() => onSelect(c.id)}
              />
            ))}
          </div>
        )}

        {/* Deselect hint */}
        {selectedId && (
          <div className="px-6 py-3 border-t border-gray-50 bg-gray-50/50">
            <button type="button" onClick={() => onSelect("")}
              className="text-xs text-gray-400 hover:text-gray-600 transition-colors">
              Clear selection for this position
            </button>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between gap-3">
        {!isFirst ? (
          <button type="button" onClick={onPrev}
            className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl border border-gray-200 bg-white text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors shadow-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            Back
          </button>
        ) : <div />}

        <button type="button" onClick={onNext}
          className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-[#0A2E1A] text-white text-sm font-semibold hover:bg-ui-green transition-colors shadow-sm">
          {isLast ? "Review Ballot" : "Next"}
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>
    </div>
  );
}
