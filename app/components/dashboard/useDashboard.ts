import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { apiFetch, getAdminToken } from "../../lib/api";

export interface DashElection { id: string; title: string; status: string; positions: { id: string }[]; }
export interface VoterStats { total: number; eligible: number; voted: number; restricted: number; }

export interface UseDashboardReturn {
  elections: DashElection[];
  stats: VoterStats | null;
  loading: boolean;
  activeElection: DashElection | undefined;
  draftCount: number;
  turnout: number;
  refresh: () => void;
}

export function useDashboard(): UseDashboardReturn {
  const router = useRouter();
  const [elections, setElections] = useState<DashElection[]>([]);
  const [stats, setStats] = useState<VoterStats | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    const t = getAdminToken();
    if (!t) { router.push("/admin/login"); return; }
    setLoading(true);
    try {
      const [elecs, voters] = await Promise.all([
        apiFetch<DashElection[]>("/elections", { token: t }),
        apiFetch<{ canVote: boolean; hasVoted: boolean }[]>("/voters", { token: t }),
      ]);
      setElections(elecs);
      setStats({
        total: voters.length,
        eligible: voters.filter(v => v.canVote).length,
        voted: voters.filter(v => v.hasVoted).length,
        restricted: voters.filter(v => !v.canVote).length,
      });
    } catch { router.push("/admin/login"); }
    finally { setLoading(false); }
  }, [router]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const activeElection = elections.find(e => e.status === "ACTIVE");
  const draftCount = elections.filter(e => e.status === "DRAFT").length;
  const turnout = stats && stats.eligible > 0
    ? Math.round((stats.voted / stats.eligible) * 100)
    : 0;

  return { elections, stats, loading, activeElection, draftCount, turnout, refresh: fetchData };
}
