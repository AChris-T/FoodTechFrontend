"use client";

import Modal from "../ui/Modal";
import Spinner from "../ui/Spinner";
import { inp } from "../ui/Field";
import type { UseElectionsReturn } from "./useElections";

export default function PositionsModal({ ctx }: { ctx: UseElectionsReturn }) {
  const { selected, saving, positionTitle, setPositionTitle, closeModal, handleAddPosition, handleDeletePosition } = ctx;
  if (!selected) return null;
  return (
    <Modal title={`Positions — ${selected.title}`} onClose={closeModal} size="lg">
      <div className="space-y-5">
        <form onSubmit={handleAddPosition} className="flex gap-2">
          <input className={`${inp} flex-1`} placeholder="Position title, e.g. President" required
            value={positionTitle} onChange={e => setPositionTitle(e.target.value)} />
          <button type="submit" disabled={saving}
            className="px-4 py-2.5 rounded-xl bg-ui-green text-white text-sm font-semibold hover:bg-ui-green-mid disabled:opacity-60 transition-colors flex items-center gap-1.5 shrink-0">
            {saving
              ? <Spinner />
              : <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" /></svg>}
            Add
          </button>
        </form>

        {(selected.positions?.length ?? 0) === 0 ? (
          <p className="text-center text-gray-400 text-sm py-6">No positions yet — add one above.</p>
        ) : (
          <div className="space-y-2">
            {selected.positions.map((pos, i) => (
              <div key={pos.id} className="flex items-center justify-between px-4 py-3 bg-gray-50 rounded-xl border border-gray-100">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-gray-300 font-mono w-5">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-sm font-semibold text-gray-800">{pos.title}</span>
                </div>
                <button type="button" onClick={() => handleDeletePosition(pos.id)}
                  title={`Remove ${pos.title}`} aria-label={`Remove ${pos.title}`}
                  className="p-1 rounded-lg text-gray-300 hover:bg-red-50 hover:text-red-500 transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </Modal>
  );
}
