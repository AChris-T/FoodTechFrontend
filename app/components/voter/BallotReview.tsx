"use client";

import Spinner from "../ui/Spinner";
import type { VoterElection } from "./useVoterDashboard";

interface Props {
  election: VoterElection;
  selections: Record<string, string>;
  submitting: boolean;
  onPrev: () => void;
  onSubmit: () => void;
  onEdit: () => void;
}

export default function BallotReview({ election, selections, submitting, onPrev, onSubmit, onEdit }: Props) {
  const skipped = election.positions.filter(p => !selections[p.id]);

  return (
    <div className="space-y-5">
      <div className="text-center">
        <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest mb-1">Final step</p>
        <h2 className="text-xl font-bold text-gray-900">Review your ballot</h2>
        <p className="text-sm text-gray-400 mt-1">Confirm before submitting — this cannot be undone</p>
      </div>

      {/* Warning for skipped */}
      {skipped.length > 0 && (
        <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3.5">
          <svg className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
          </svg>
          <div>
            <p className="text-xs font-semibold text-amber-700">
              {skipped.length} position{skipped.length !== 1 ? "s" : ""} left blank
            </p>
            <p className="text-xs text-amber-600 mt-0.5">
              {skipped.map(p => p.title).join(", ")} — you can still go back and vote.
            </p>
          </div>
        </div>
      )}

      {/* Review card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-50 bg-gray-50/50">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{election.title}</p>
          <button type="button" onClick={onEdit}
            className="text-xs text-ui-green font-semibold hover:underline">
            Edit
          </button>
        </div>

        <div className="divide-y divide-gray-50">
          {election.positions.map(pos => {
            const cand = pos.candidates.find(c => c.id === selections[pos.id]);
            const voted = !!cand;
            return (
              <div key={pos.id} className="flex items-center gap-4 px-5 py-4">
                {/* Candidate photo / empty */}
                <div className={`w-10 h-10 rounded-xl shrink-0 flex items-center justify-center overflow-hidden ${voted ? "" : "bg-gray-100"}`}>
                  {voted && cand.photoUrl
                    ? <img src={cand.photoUrl} alt={cand.fullName} className="w-full h-full object-cover" />
                    : <span className={`text-xs font-bold ${voted ? "text-ui-green" : "text-gray-300"}`}>
                        {voted ? cand!.fullName.split(" ").map(n => n[0]).slice(0, 2).join("").toUpperCase() : "—"}
                      </span>}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] text-gray-400 font-medium leading-none mb-0.5">{pos.title}</p>
                  <p className={`text-sm font-semibold leading-snug ${voted ? "text-gray-800" : "text-gray-300 italic"}`}>
                    {voted ? cand!.fullName : "No selection"}
                  </p>
                </div>
                {voted
                  ? <div className="w-5 h-5 rounded-full bg-ui-green shrink-0 flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                    </div>
                  : <div className="w-5 h-5 rounded-full border-2 border-dashed border-gray-200 shrink-0" />}
              </div>
            );
          })}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between gap-3 pt-1">
        <button type="button" onClick={onPrev}
          className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl border border-gray-200 bg-white text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors shadow-sm">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          Back
        </button>

        <button type="button" onClick={onSubmit} disabled={submitting}
          className="flex items-center gap-2 px-7 py-2.5 rounded-xl bg-ui-gold text-[#0A2E1A] text-sm font-bold hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-ui-gold/20 transition-all">
          {submitting
            ? <><Spinner className="w-4 h-4" />Submitting…</>
            : <><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>Submit Ballot</>}
        </button>
      </div>
    </div>
  );
}
