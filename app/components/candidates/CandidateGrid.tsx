"use client";

import CandidateCard from "./CandidateCard";
import type { UseCandidatesReturn } from "./useCandidates";

export default function CandidateGrid({ ctx }: { ctx: UseCandidatesReturn }) {
  const { selectedPosition, selectedElection, setDeletingCandidate, setModal, resetForm } = ctx;
  const isEnded = selectedElection?.status === "ENDED" || selectedElection?.status === "CLOSED";

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-[#F4F7F5]">
      <div className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between gap-4 shrink-0">
        <div>
          {selectedPosition ? (
            <>
              <h2 className="font-extrabold text-gray-900 text-[17px]">{selectedPosition.title}</h2>
              <p className="text-xs text-gray-400 mt-0.5">
                {selectedElection?.title} · {selectedPosition.candidates.length} candidate{selectedPosition.candidates.length !== 1 ? "s" : ""}
              </p>
            </>
          ) : (
            <p className="text-sm text-gray-400">Select a position from the left</p>
          )}
        </div>
        {selectedPosition && !isEnded && (
          <button type="button"
            onClick={() => { resetForm(); ctx.setModal("addCandidate"); }}
            className="shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-ui-green text-white text-sm font-bold hover:bg-ui-green-mid transition-colors shadow-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" /></svg>
            Add Candidate
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        {!selectedPosition ? (
          <div className="h-full flex flex-col items-center justify-center gap-4 text-center">
            <div className="w-20 h-20 rounded-2xl bg-white border border-gray-100 shadow flex items-center justify-center">
              <svg className="w-10 h-10 text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
            </div>
            <p className="text-gray-400 text-sm">Select a position to manage its candidates</p>
          </div>
        ) : selectedPosition.candidates.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center gap-3 text-center">
            <div className="w-20 h-20 rounded-2xl bg-white border border-gray-100 shadow flex items-center justify-center">
              <svg className="w-10 h-10 text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" /></svg>
            </div>
            <p className="font-semibold text-gray-600 text-sm">No candidates yet</p>
            <p className="text-gray-400 text-xs">Click &ldquo;Add Candidate&rdquo; to register one</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {selectedPosition.candidates.map(c => (
              <CandidateCard key={c.id} candidate={c} positionTitle={selectedPosition.title}
                onDelete={() => { setDeletingCandidate(c); setModal("deleteCandidate"); }} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
