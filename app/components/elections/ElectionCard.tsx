"use client";

import Spinner from "../ui/Spinner";
import { StatusBadge } from "../ui/Badge";
import type { Election, ElectionStatus, UseElectionsReturn } from "./useElections";

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
}

interface ActionBtn {
  label: string;
  icon: string;
  next: ElectionStatus;
  className: string;
}

function getActions(status: ElectionStatus): ActionBtn[] {
  switch (status) {
    case "DRAFT":
      return [{ label: "Activate", icon: "▶", next: "ACTIVE", className: "border-ui-green text-ui-green hover:bg-ui-green-light" }];
    case "ACTIVE":
      return [
        { label: "Pause", icon: "⏸", next: "PAUSED", className: "border-amber-300 text-amber-600 hover:bg-amber-50" },
        { label: "End", icon: "⏹", next: "ENDED", className: "border-red-200 text-red-500 hover:bg-red-50" },
      ];
    case "PAUSED":
      return [
        { label: "Resume", icon: "▶", next: "ACTIVE", className: "border-ui-green text-ui-green hover:bg-ui-green-light" },
        { label: "End", icon: "⏹", next: "ENDED", className: "border-red-200 text-red-500 hover:bg-red-50" },
      ];
    case "ENDED":
    case "CLOSED":
      return [{ label: "Reopen", icon: "↩", next: "ACTIVE", className: "border-blue-200 text-blue-600 hover:bg-blue-50" }];
    default:
      return [];
  }
}

interface Props {
  election: Election;
  statusLoadingId: string | null;
  onSetStatus: UseElectionsReturn["handleSetStatus"];
  onPositions: (el: Election) => void;
  onDelete: (el: Election) => void;
}

export default function ElectionCard({ election: el, statusLoadingId, onSetStatus, onPositions, onDelete }: Props) {
  const actions = getActions(el.status);
  const isPast = new Date(el.endDate) < new Date();
  const isChanging = statusLoadingId === el.id;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col sm:flex-row sm:items-center gap-4 hover:shadow-md transition-shadow">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-3 mb-1.5 flex-wrap">
          <h2 className="font-bold text-gray-900 text-[15px] truncate">{el.title}</h2>
          <StatusBadge status={el.status} />
          {isPast && el.status === "ACTIVE" && (
            <span className="text-[10px] font-semibold text-amber-600 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
              Time elapsed
            </span>
          )}
        </div>
        {el.description && <p className="text-gray-400 text-xs mb-2 line-clamp-1">{el.description}</p>}
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-400">
          <span>Start: <span className="text-gray-600 font-medium">{fmtDate(el.startDate)}</span></span>
          <span>End: <span className="text-gray-600 font-medium">{fmtDate(el.endDate)}</span></span>
          <span><span className="text-gray-600 font-medium">{el.positions?.length ?? 0}</span> positions</span>
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0 flex-wrap">
        {actions.map(a => (
          <button key={a.next} type="button" onClick={() => onSetStatus(el, a.next)}
            disabled={isChanging}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-colors disabled:opacity-60 disabled:cursor-not-allowed ${a.className}`}>
            {isChanging
              ? <Spinner className="w-3 h-3" />
              : <span>{a.icon}</span>}
            {a.label}
          </button>
        ))}
        <button type="button" onClick={() => onPositions(el)}
          className="px-3 py-1.5 rounded-lg bg-ui-green-light text-ui-green text-xs font-semibold hover:bg-ui-green/10 transition-colors">
          Positions
        </button>
        <button type="button" onClick={() => onDelete(el)} title="Delete election" aria-label="Delete election"
          className="p-1.5 rounded-lg text-gray-300 hover:bg-red-50 hover:text-red-500 transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </div>
  );
}
