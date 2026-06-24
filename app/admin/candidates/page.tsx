"use client";

import { useCandidates } from "../../components/candidates/useCandidates";
import Toast from "../../components/ui/Toast";
import Spinner from "../../components/ui/Spinner";
import PositionPanel from "../../components/candidates/PositionPanel";
import CandidateGrid from "../../components/candidates/CandidateGrid";
import AddCandidateModal from "../../components/candidates/AddCandidateModal";
import { DeleteCandidateModal, DeletePositionModal } from "../../components/candidates/DeleteModal";

export default function CandidatesPage() {
  const ctx = useCandidates();

  if (ctx.loading) {
    return (
      <div className="admin-font flex items-center justify-center gap-3 text-gray-400 min-h-[60vh]">
        <Spinner className="w-6 h-6 text-ui-green" />
        <span className="text-sm">Loading…</span>
      </div>
    );
  }

  return (
    <div className="admin-font flex h-screen overflow-hidden">
      {ctx.toast && <Toast msg={ctx.toast.msg} ok={ctx.toast.ok} onClose={ctx.clearToast} />}

      <PositionPanel ctx={ctx} />
      <CandidateGrid ctx={ctx} />

      {ctx.modal === "addCandidate" && <AddCandidateModal ctx={ctx} />}
      {ctx.modal === "deleteCandidate" && <DeleteCandidateModal ctx={ctx} />}
      {ctx.modal === "deletePosition" && <DeletePositionModal ctx={ctx} />}
    </div>
  );
}
