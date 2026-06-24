"use client";

import { useElections } from "../../components/elections/useElections";
import Toast from "../../components/ui/Toast";
import PageHeader from "../../components/ui/PageHeader";
import Spinner from "../../components/ui/Spinner";
import EmptyState from "../../components/ui/EmptyState";
import ElectionCard from "../../components/elections/ElectionCard";
import CreateElectionModal from "../../components/elections/CreateElectionModal";
import PositionsModal from "../../components/elections/PositionsModal";
import DeleteElectionModal from "../../components/elections/DeleteElectionModal";

export default function ElectionsPage() {
  const ctx = useElections();

  return (
    <div className="admin-font bg-[#F5F7F5] min-h-screen p-4 sm:p-6 lg:p-8">
      {ctx.toast && <Toast msg={ctx.toast.msg} ok={ctx.toast.ok} onClose={ctx.clearToast} />}

      <PageHeader
        title="Elections"
        subtitle="Create elections, add positions, and manage status."
        actions={
          <button type="button" onClick={ctx.openCreate}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-ui-green text-white text-sm font-semibold hover:bg-ui-green-mid transition-colors shadow-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" /></svg>
            New Election
          </button>
        }
      />

      {ctx.loading ? (
        <div className="py-24 flex items-center justify-center gap-3 text-gray-400">
          <Spinner className="w-6 h-6 text-ui-green" />
          <span className="text-sm">Loading elections…</span>
        </div>
      ) : ctx.elections.length === 0 ? (
        <EmptyState
          title="No elections yet"
          subtitle="Create your first election to get started"
          action={{ label: "Create First Election", onClick: ctx.openCreate }}
          icon={<svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>}
        />
      ) : (
        <div className="grid gap-4">
          {ctx.elections.map(el => (
            <ElectionCard key={el.id} election={el}
              statusLoadingId={ctx.statusLoadingId}
              onSetStatus={ctx.handleSetStatus}
              onPositions={ctx.openPositions}
              onDelete={ctx.openDelete}
            />
          ))}
        </div>
      )}

      {ctx.modal === "create" && <CreateElectionModal ctx={ctx} />}
      {ctx.modal === "positions" && ctx.selected && <PositionsModal ctx={ctx} />}
      {ctx.modal === "delete" && ctx.selected && <DeleteElectionModal ctx={ctx} />}
    </div>
  );
}
