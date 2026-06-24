"use client";

import Spinner from "../ui/Spinner";
import { BoolBadge } from "../ui/Badge";
import type { Voter } from "./useVoters";

function initials(name: string) {
  return name.split(" ").map(n => n[0]).filter(Boolean).slice(0, 2).join("").toUpperCase();
}
function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}

interface Props {
  voter: Voter; index: number;
  toggling: boolean; resending: boolean;
  onEdit: (v: Voter) => void; onDelete: (v: Voter) => void;
  onToggle: (v: Voter) => void; onResend: (v: Voter) => void;
}

export default function VoterTableRow({ voter: v, index, toggling, resending, onEdit, onDelete, onToggle, onResend }: Props) {
  const voted = v.hasVoted;

  return (
    <tr className="border-b border-gray-50 hover:bg-gray-50/70 transition-colors last:border-0">
      <td className="px-4 py-3.5 pl-5 text-gray-300 text-xs font-mono">{index + 1}</td>

      <td className="px-4 py-3.5">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-ui-green-light flex items-center justify-center shrink-0">
            <span className="text-[10px] font-bold text-ui-green">{initials(v.fullName)}</span>
          </div>
          <div className="min-w-0">
            <p className="font-semibold text-gray-900 text-[13px] truncate">{v.fullName}</p>
            <p className="text-gray-400 text-[11px] truncate">{v.email}</p>
          </div>
        </div>
      </td>

      <td className="px-4 py-3.5">
        <span className="font-mono text-[11px] bg-gray-100 text-gray-600 px-2 py-1 rounded-lg whitespace-nowrap">{v.matricNumber}</span>
      </td>

      <td className="px-4 py-3.5">
        <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-ui-green-light text-ui-green">{v.level}</span>
      </td>

      {/* Eligibility toggle */}
      <td className="px-4 py-3.5">
        <button type="button" onClick={() => !toggling && onToggle(v)}
          disabled={toggling}
          title={toggling ? "Updating…" : v.canVote ? "Click to restrict" : "Click to allow"}
          className="focus:outline-none disabled:cursor-not-allowed">
          {toggling
            ? <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold border bg-gray-50 border-gray-200 text-gray-400">
                <Spinner className="w-3 h-3" />Updating…
              </span>
            : <BoolBadge ok={v.canVote} label={v.canVote ? "Eligible" : "Restricted"} />}
        </button>
      </td>

      {/* Voted status */}
      <td className="px-4 py-3.5">
        <BoolBadge ok={voted} label={voted ? "Voted" : "Pending"} />
      </td>

      <td className="px-4 py-3.5 text-gray-400 text-xs whitespace-nowrap">{fmtDate(v.createdAt)}</td>

      {/* Actions — locked once voter has voted */}
      <td className="px-4 py-3.5">
        <div className="flex items-center gap-0.5">

          {/* Edit */}
          <button type="button" onClick={() => onEdit(v)}
            title="Edit voter"
            className="p-1.5 rounded-lg transition-colors text-gray-400 hover:bg-blue-50 hover:text-blue-600">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>

          {/* Resend credentials */}
          <button type="button" onClick={() => !resending && onResend(v)}
            disabled={resending}
            title={resending ? "Sending email…" : "Resend credentials"}
            className={`p-1.5 rounded-lg transition-colors ${resending ? "text-amber-400 cursor-not-allowed" : "text-gray-400 hover:bg-amber-50 hover:text-amber-600"}`}>
            {resending
              ? <Spinner className="w-4 h-4 text-amber-500" />
              : <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>}
          </button>

          {/* Delete */}
          <button type="button" onClick={() => onDelete(v)}
            title="Delete voter"
            className="p-1.5 rounded-lg transition-colors text-gray-400 hover:bg-red-50 hover:text-red-500">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>

        </div>
      </td>
    </tr>
  );
}
