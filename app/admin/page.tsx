"use client";

import { useDashboard } from "../components/dashboard/useDashboard";
import Spinner from "../components/ui/Spinner";
import PageHeader from "../components/ui/PageHeader";
import ActiveElectionBanner from "../components/dashboard/ActiveElectionBanner";
import StatCards from "../components/dashboard/StatCards";
import TurnoutBar from "../components/dashboard/TurnoutBar";
import QuickActions from "../components/dashboard/QuickActions";
import ElectionsList from "../components/dashboard/ElectionsList";

export default function AdminDashboardPage() {
  const { elections, stats, loading, activeElection, draftCount, turnout, refresh } = useDashboard();

  if (loading) {
    return (
      <div className="admin-font min-h-screen bg-[#F5F7F5] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4 text-gray-400">
          <Spinner className="w-7 h-7 text-ui-green" />
          <p className="text-sm font-medium">Loading dashboard…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-font min-h-screen bg-[#F5F7F5] p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto space-y-6 lg:space-y-7">
        <PageHeader
          title="Overview"
          actions={
            <button type="button" onClick={refresh}
              className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 bg-white text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors shadow-sm">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Refresh
            </button>
          }
        />
        <ActiveElectionBanner activeElection={activeElection} draftCount={draftCount} />
        {stats && <StatCards stats={stats} />}
        {stats && stats.eligible > 0 && <TurnoutBar stats={stats} turnout={turnout} />}
        <QuickActions />
        <ElectionsList elections={elections} />
        <p className="text-center text-[11px] text-gray-300 pb-2">
          FoodTech Voting Platform · University of Ibadan · {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
}
