"use client";

import Spinner from "../ui/Spinner";
import VoterTableRow from "./VoterTableRow";
import type { Voter } from "./useVoters";

interface Props {
  voters: Voter[]; loading: boolean; search: string; totalCount: number;
  togglingId: string | null; resendingId: string | null;
  onSearch: (s: string) => void; onEdit: (v: Voter) => void;
  onDelete: (v: Voter) => void; onToggle: (v: Voter) => void;
  onResend: (v: Voter) => void; onAddFirst: () => void;
}

const COLS = ["#", "Voter", "Matric No.", "Level", "Status", "Voted", "Joined", "Actions"];

export default function VoterTable({ voters, loading, search, totalCount, togglingId, resendingId, onSearch, onEdit, onDelete, onToggle, onResend, onAddFirst }: Props) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      {/* Toolbar */}
      <div className="px-5 py-4 border-b border-gray-100 flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <div className="relative w-full sm:max-w-xs">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input type="text" value={search} onChange={e => onSearch(e.target.value)}
            placeholder="Search name, matric, email, level…"
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-gray-200 text-sm text-gray-900 placeholder-gray-400 focus:border-ui-green focus:ring-2 focus:ring-ui-green/20 outline-none transition-all" />
        </div>
        <span className="text-xs text-gray-400 sm:ml-auto shrink-0">{voters.length} / {totalCount} voters</span>
      </div>

      {/* Body */}
      {loading ? (
        <div className="py-24 flex flex-col items-center gap-3 text-gray-400">
          <Spinner className="w-7 h-7 text-ui-green" />
          <span className="text-sm">Loading voters…</span>
        </div>
      ) : voters.length === 0 ? (
        <div className="py-24 flex flex-col items-center gap-3 text-gray-400">
          <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center mb-1">
            <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
          </div>
          <p className="text-sm font-semibold text-gray-600">{search ? "No voters match your search" : "No voters registered yet"}</p>
          {!search && <button type="button" onClick={onAddFirst} className="mt-1 px-5 py-2.5 rounded-xl bg-ui-green text-white text-sm font-semibold hover:bg-ui-green-mid transition-colors">Add First Voter</button>}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50/80 border-b border-gray-100">
                {COLS.map(h => (
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap first:pl-5">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {voters.map((v, i) => (
                <VoterTableRow key={v.id} voter={v} index={i} toggling={togglingId === v.id} resending={resendingId === v.id} onEdit={onEdit} onDelete={onDelete} onToggle={onToggle} onResend={onResend} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
