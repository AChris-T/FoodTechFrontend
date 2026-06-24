"use client";

import { useResults } from "../../components/results/useResults";
import PageHeader from "../../components/ui/PageHeader";
import Spinner from "../../components/ui/Spinner";
import SummaryCards from "../../components/results/SummaryCards";
import WinnersOverview from "../../components/results/WinnersOverview";
import PositionResultCard from "../../components/results/PositionResultCard";

export default function ResultsPage() {
  const { elections, selected, selectedElection, setSelected, results, loadingElec, loadingRes, totalVotes, voterCount } = useResults();
  const isEnded = selectedElection?.status === "ENDED" || selectedElection?.status === "CLOSED";

  return (
    <div className="admin-font bg-[#F5F7F5] min-h-screen p-4 sm:p-6 lg:p-8 max-w-[1400px]">
      <PageHeader
        title="Results"
        subtitle="Live vote tallies per election."
        actions={
          !loadingElec ? (
            <select title="Select election"
              className="px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm text-gray-700 font-semibold focus:border-ui-green focus:ring-2 focus:ring-ui-green/20 outline-none min-w-[200px] shadow-sm"
              value={selected} onChange={e => setSelected(e.target.value)}>
              <option value="">Select election…</option>
              {elections.map(e => (
                <option key={e.id} value={e.id}>
                  {e.title}{e.status === "ENDED" ? " (Ended)" : e.status === "ACTIVE" ? " (Active)" : ""}
                </option>
              ))}
            </select>
          ) : undefined
        }
      />

      {!selected ? (
        <div className="py-24 flex flex-col items-center gap-3 text-gray-400">
          <svg className="w-12 h-12 text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          <p className="text-sm">Select an election to view results</p>
        </div>
      ) : loadingRes ? (
        <div className="py-24 flex items-center justify-center gap-3 text-gray-400">
          <Spinner className="w-6 h-6 text-ui-green" />
          <span className="text-sm">Loading results…</span>
        </div>
      ) : results.length === 0 ? (
        <div className="py-24 flex flex-col items-center gap-3 text-gray-400">
          <p className="text-sm">No votes recorded yet for this election.</p>
        </div>
      ) : (
        <>
          {/* Ended elections: winners overview banner + winner cards */}
          {isEnded && selectedElection ? (
            <WinnersOverview election={selectedElection} results={results} voterCount={voterCount} />
          ) : (
            <SummaryCards results={results} voterCount={voterCount} />
          )}

          {/* Per-position breakdown — always shown */}
          <div className="space-y-6">
            {results.map(pos => <PositionResultCard key={pos.positionId} pos={pos} />)}
          </div>
        </>
      )}
    </div>
  );
}
