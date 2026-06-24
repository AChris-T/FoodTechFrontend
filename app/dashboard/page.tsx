"use client";

import { useVoterDashboard } from "../components/voter/useVoterDashboard";
import Toast from "../components/ui/Toast";
import Spinner from "../components/ui/Spinner";
import VoterNavbar from "../components/voter/VoterNavbar";
import NoElection from "../components/voter/NoElection";
import VoteConfirmation from "../components/voter/VoteConfirmation";
import StepIndicator from "../components/voter/StepIndicator";
import BallotStep from "../components/voter/BallotStep";
import BallotReview from "../components/voter/BallotReview";

export default function DashboardPage() {
  const ctx = useVoterDashboard();
  const {
    voter, loading, activeElection, myVotes,
    selections, submitting, alreadyVoted,
    step, isReview,
    toast, clearToast,
    select, nextStep, prevStep,
    handleSubmit, handleLogout,
  } = ctx;

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F4F7F5] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Spinner className="w-7 h-7 text-ui-green" />
          <p className="text-sm text-gray-400">Loading ballot…</p>
        </div>
      </div>
    );
  }

  const positions = activeElection?.positions ?? [];
  const selectedCount = Object.keys(selections).length;

  return (
    <div className="min-h-screen bg-[#F4F7F5]">
      {toast && <Toast msg={toast.msg} ok={toast.ok} onClose={clearToast} />}

      <VoterNavbar voter={voter} onLogout={handleLogout} />

      {!activeElection && <NoElection voter={voter} />}

      {activeElection && alreadyVoted && (
        <VoteConfirmation election={activeElection} votes={myVotes} />
      )}

      {activeElection && !alreadyVoted && (
        <div className="max-w-xl mx-auto px-4 py-7 pb-16">

          {/* Election header card */}
          <div className="bg-[#0A2E1A] rounded-2xl px-5 py-5 mb-5 shadow-md">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                  <span className="text-emerald-400 text-[10px] font-semibold uppercase tracking-widest">Active Election</span>
                </div>
                <h1 className="text-white font-bold text-lg leading-snug">{activeElection.title}</h1>
                {activeElection.description && (
                  <p className="text-white/50 text-xs mt-1 leading-relaxed line-clamp-2">{activeElection.description}</p>
                )}
              </div>
              <div className="shrink-0 text-right">
                <p className="text-white/40 text-[10px] leading-none mb-1">Positions</p>
                <p className="text-white text-2xl font-bold leading-none">{positions.length}</p>
              </div>
            </div>

            {voter && (
              <div className="mt-4 pt-3.5 border-t border-white/10 flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold text-white/80 shrink-0">
                  {voter.fullName.split(" ").map(n => n[0]).slice(0, 2).join("").toUpperCase()}
                </div>
                <div className="min-w-0">
                  <p className="text-white/80 text-xs font-semibold leading-none truncate">{voter.fullName}</p>
                  <p className="text-white/35 text-[10px] mt-0.5">{voter.matricNumber} · {voter.level}</p>
                </div>
              </div>
            )}
          </div>

          {/* Progress card */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-5 py-4 mb-5">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs text-gray-500 font-medium">
                {isReview ? "Review & Submit" : `Position ${step + 1} of ${positions.length}`}
              </p>
              <p className="text-xs text-gray-400">
                {selectedCount}/{positions.length} selected
              </p>
            </div>
            <StepIndicator
              positions={positions}
              currentStep={step}
              selections={selections}
              onGoTo={ctx.prevStep}
            />
          </div>

          {/* Position step */}
          {!isReview && positions[step] && (
            <BallotStep
              position={positions[step]}
              stepNumber={step + 1}
              totalSteps={positions.length}
              selectedId={selections[positions[step].id]}
              onSelect={(candId) => select(positions[step].id, candId)}
              onNext={nextStep}
              onPrev={prevStep}
              isFirst={step === 0}
              isLast={step === positions.length - 1}
            />
          )}

          {/* Review step */}
          {isReview && (
            <BallotReview
              election={activeElection}
              selections={selections}
              submitting={submitting}
              onPrev={prevStep}
              onSubmit={handleSubmit}
              onEdit={prevStep}
            />
          )}
        </div>
      )}
    </div>
  );
}
