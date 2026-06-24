"use client";

import { useVoters } from "../../components/voters/useVoters";
import Toast from "../../components/ui/Toast";
import PageHeader from "../../components/ui/PageHeader";
import VoterStats from "../../components/voters/VoterStats";
import VoterTable from "../../components/voters/VoterTable";
import AddVoterModal from "../../components/voters/AddVoterModal";
import EditVoterModal from "../../components/voters/EditVoterModal";
import DeleteVoterModal from "../../components/voters/DeleteVoterModal";
import CsvImportModal from "../../components/voters/CsvImportModal";

export default function VotersPage() {
  const v = useVoters();

  return (
    <div className="admin-font bg-[#F5F7F5] min-h-screen p-4 sm:p-6 lg:p-8">
      {v.toast && <Toast msg={v.toast.msg} ok={v.toast.ok} onClose={v.clearToast} />}

      <PageHeader
        title="Voters"
        subtitle="Manage registered voters, import in bulk, and control voting eligibility."
        actions={
          <>
            <button type="button" onClick={v.openCSV}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm font-semibold text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
              Import CSV
            </button>
            <button type="button" onClick={v.openAdd}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-ui-green text-white text-sm font-semibold hover:bg-ui-green-mid transition-colors shadow-sm shadow-ui-green/20">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" /></svg>
              Add Voter
            </button>
          </>
        }
      />

      <VoterStats stats={v.stats} />

      <VoterTable
        voters={v.filtered}
        loading={v.loading}
        search={v.search}
        totalCount={v.voters.length}
        togglingId={v.togglingId}
        resendingId={v.resendingId}
        onSearch={v.setSearch}
        onEdit={v.openEdit}
        onDelete={v.openDelete}
        onToggle={v.handleToggleCanVote}
        onResend={v.handleResendCredentials}
        onAddFirst={v.openAdd}
      />

      {v.modal === "add" && <AddVoterModal ctx={v} />}
      {v.modal === "edit" && v.selected && <EditVoterModal ctx={v} />}
      {v.modal === "delete" && v.selected && <DeleteVoterModal ctx={v} />}
      {v.modal === "csv" && <CsvImportModal ctx={v} />}
    </div>
  );
}
