"use client";

import Spinner from "../ui/Spinner";
import type { UseCandidatesReturn, Position } from "./useCandidates";

interface Props { ctx: UseCandidatesReturn; }

function PositionRow({ pos, active, ctx }: { pos: Position; active: boolean; ctx: UseCandidatesReturn }) {
  return (
    <div
      className={`group flex items-center justify-between gap-2 px-3 py-2.5 rounded-xl cursor-pointer transition-all ${active ? "bg-ui-green-light border border-ui-green/20" : "hover:bg-gray-50"}`}
      onClick={() => ctx.setSelectedPositionId(pos.id)}
    >
      <div className="flex items-center gap-2.5 min-w-0">
        <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${active ? "bg-ui-green" : "bg-gray-300"}`} />
        <span className={`text-sm font-semibold truncate ${active ? "text-ui-green-dark" : "text-gray-700"}`}>{pos.title}</span>
      </div>
      <div className="flex items-center gap-1.5 shrink-0">
        <span className={`text-[10px] font-bold ${active ? "text-ui-green/70" : "text-gray-400"}`}>{pos.candidates.length}</span>
        <button type="button" aria-label={`Delete ${pos.title}`} title={`Delete ${pos.title}`}
          onClick={ev => { ev.stopPropagation(); ctx.setDeletingPosition(pos); ctx.setModal("deletePosition"); }}
          className="opacity-0 group-hover:opacity-100 p-1 rounded-lg text-gray-300 hover:text-red-500 hover:bg-red-50 transition-all">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
        </button>
      </div>
    </div>
  );
}

export default function PositionPanel({ ctx }: Props) {
  const { elections, positions, selectedElectionId, selectedPositionId, posLoading, newPositionTitle, setNewPositionTitle, addingPos, handleAddPosition, setSelectedElectionId } = ctx;

  return (
    <div className="w-72 shrink-0 border-r border-gray-100 flex flex-col bg-white overflow-hidden">
      <div className="px-5 py-5 border-b border-gray-50">
        <h1 className="text-lg font-extrabold text-gray-900">Candidates</h1>
        <p className="text-xs text-gray-400 mt-0.5">Manage positions & candidates</p>
      </div>

      <div className="px-4 pt-4 pb-3 border-b border-gray-50">
        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">Election</label>
        {elections.length === 0 ? (
          <p className="text-xs text-gray-400">No elections yet.</p>
        ) : (
          <select title="Select election" className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm text-gray-700 font-semibold focus:border-ui-green focus:ring-2 focus:ring-ui-green/20 outline-none bg-white"
            value={selectedElectionId} onChange={e => setSelectedElectionId(e.target.value)}>
            {elections.map(e => <option key={e.id} value={e.id}>{e.title}</option>)}
          </select>
        )}
      </div>

      <div className="flex-1 overflow-y-auto">
        {posLoading ? (
          <div className="flex items-center justify-center py-8 gap-2 text-gray-400">
            <Spinner className="w-4 h-4 text-ui-green" /><span className="text-xs">Loading…</span>
          </div>
        ) : positions.length === 0 ? (
          <div className="text-center py-8 px-4">
            <p className="text-xs text-gray-400">No positions yet. Add one below.</p>
          </div>
        ) : (
          <div className="p-2 space-y-1">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider px-2 pt-1 pb-1">Positions</p>
            {positions.map(pos => (
              <PositionRow key={pos.id} pos={pos} active={pos.id === selectedPositionId} ctx={ctx} />
            ))}
          </div>
        )}
      </div>

      {selectedElectionId && (
        <div className="p-3 border-t border-gray-100">
          <form onSubmit={handleAddPosition} className="flex gap-2">
            <input className="flex-1 px-3 py-2 rounded-xl border border-gray-200 text-sm placeholder-gray-400 text-gray-900 focus:border-ui-green focus:ring-2 focus:ring-ui-green/20 outline-none bg-white"
              placeholder="New position title…" required
              value={newPositionTitle} onChange={e => setNewPositionTitle(e.target.value)} />
            <button type="submit" disabled={addingPos}
              className="px-3 py-2 rounded-xl bg-ui-green text-white text-sm font-bold hover:bg-ui-green-mid disabled:opacity-60 transition-colors flex items-center gap-1 shrink-0">
              {addingPos ? <Spinner /> : <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" /></svg>}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
