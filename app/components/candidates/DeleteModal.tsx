"use client";

import Modal from "../ui/Modal";
import Spinner from "../ui/Spinner";
import type { UseCandidatesReturn } from "./useCandidates";

export function DeleteCandidateModal({ ctx }: { ctx: UseCandidatesReturn }) {
  const { deletingCandidate, saving, setModal, setDeletingCandidate, confirmDeleteCandidate } = ctx;
  if (!deletingCandidate) return null;
  const onClose = () => { setModal(null); setDeletingCandidate(null); };
  return (
    <Modal title="Remove Candidate" onClose={onClose} size="sm">
      <div className="text-center py-2">
        <div className="w-14 h-14 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center mx-auto mb-4">
          <svg className="w-7 h-7 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
        </div>
        <p className="font-bold text-gray-900 mb-1">Remove {deletingCandidate.fullName}?</p>
        <p className="text-gray-400 text-xs">This will also delete their votes.</p>
        <div className="flex gap-3 mt-6">
          <button type="button" onClick={onClose} className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors">Cancel</button>
          <button type="button" onClick={confirmDeleteCandidate} disabled={saving}
            className="flex-1 py-2.5 rounded-xl bg-red-600 text-white text-sm font-bold hover:bg-red-700 disabled:opacity-60 transition-colors flex items-center justify-center gap-2">
            {saving && <Spinner />}{saving ? "Removing…" : "Yes, Remove"}
          </button>
        </div>
      </div>
    </Modal>
  );
}

export function DeletePositionModal({ ctx }: { ctx: UseCandidatesReturn }) {
  const { deletingPosition, saving, setModal, setDeletingPosition, confirmDeletePosition } = ctx;
  if (!deletingPosition) return null;
  const onClose = () => { setModal(null); setDeletingPosition(null); };
  return (
    <Modal title="Delete Position" onClose={onClose} size="sm">
      <div className="text-center py-2">
        <div className="w-14 h-14 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center mx-auto mb-4">
          <svg className="w-7 h-7 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
        </div>
        <p className="font-bold text-gray-900 mb-1">Delete &ldquo;{deletingPosition.title}&rdquo;?</p>
        <p className="text-gray-400 text-xs">{deletingPosition.candidates.length} candidate{deletingPosition.candidates.length !== 1 ? "s" : ""} and all votes will be deleted.</p>
        <div className="flex gap-3 mt-6">
          <button type="button" onClick={onClose} className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors">Cancel</button>
          <button type="button" onClick={confirmDeletePosition} disabled={saving}
            className="flex-1 py-2.5 rounded-xl bg-red-600 text-white text-sm font-bold hover:bg-red-700 disabled:opacity-60 transition-colors flex items-center justify-center gap-2">
            {saving && <Spinner />}{saving ? "Deleting…" : "Yes, Delete"}
          </button>
        </div>
      </div>
    </Modal>
  );
}
