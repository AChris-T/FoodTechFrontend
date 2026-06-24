"use client";

import Modal from "../ui/Modal";
import Spinner from "../ui/Spinner";
import type { UseElectionsReturn } from "./useElections";

export default function DeleteElectionModal({ ctx }: { ctx: UseElectionsReturn }) {
  const { selected, saving, closeModal, handleDelete } = ctx;
  if (!selected) return null;
  return (
    <Modal title="Delete Election" onClose={closeModal} size="sm">
      <div className="text-center py-2">
        <div className="w-14 h-14 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center mx-auto mb-4">
          <svg className="w-7 h-7 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </div>
        <p className="font-bold text-gray-900 mb-1">Delete this election?</p>
        <p className="text-gray-500 text-sm">{selected.title}</p>
        <p className="text-gray-400 text-xs mt-2">All positions and votes will also be deleted.</p>
        <div className="flex gap-3 mt-6">
          <button type="button" onClick={closeModal}
            className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors">
            Cancel
          </button>
          <button type="button" onClick={handleDelete} disabled={saving}
            className="flex-1 py-2.5 rounded-xl bg-red-600 text-white text-sm font-semibold hover:bg-red-700 disabled:opacity-60 transition-colors flex items-center justify-center gap-2">
            {saving && <Spinner />}{saving ? "Deleting…" : "Yes, Delete"}
          </button>
        </div>
      </div>
    </Modal>
  );
}
