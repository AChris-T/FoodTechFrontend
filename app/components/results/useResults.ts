import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { apiFetch, getAdminToken } from "../../lib/api";

export interface ResultElection { id: string; title: string; status: "DRAFT" | "ACTIVE" | "PAUSED" | "ENDED" | "CLOSED"; }
export interface CandidateResult { candidateId: string; fullName: string; photoUrl?: string; voteCount: number; }
export interface PositionResult { positionId: string; positionTitle: string; candidates: CandidateResult[]; }

export interface UseResultsReturn {
  elections: ResultElection[];
  selected: string;
  selectedElection: ResultElection | null;
  setSelected: (id: string) => void;
  results: PositionResult[];
  loadingElec: boolean;
  loadingRes: boolean;
  totalVotes: number;
  voterCount: number;
}

const tk = () => getAdminToken() ?? "";

export function useResults(): UseResultsReturn {
  const router = useRouter();
  const [elections, setElections] = useState<ResultElection[]>([]);
  const [selected, setSelected] = useState("");
  const [results, setResults] = useState<PositionResult[]>([]);
  const [voterCount, setVoterCount] = useState(0);
  const [loadingElec, setLoadingElec] = useState(true);
  const [loadingRes, setLoadingRes] = useState(false);

  const fetchElections = useCallback(async () => {
    const t = tk();
    if (!t) { router.push("/admin/login"); return; }
    try {
      const data = await apiFetch<ResultElection[]>("/elections", { token: t });
      setElections(data);
      const active = data.find(e => e.status === "ACTIVE");
      if (active) setSelected(active.id);
    } catch { router.push("/admin/login"); }
    finally { setLoadingElec(false); }
  }, [router]);

  useEffect(() => { fetchElections(); }, [fetchElections]);

  useEffect(() => {
    if (!selected) { setResults([]); setVoterCount(0); return; }
    setLoadingRes(true);
    apiFetch<{ voterCount: number; positions: PositionResult[] }>(`/results/${selected}`)
      .then(data => { setResults(data.positions); setVoterCount(data.voterCount); })
      .catch(() => { setResults([]); setVoterCount(0); })
      .finally(() => setLoadingRes(false));
  }, [selected]);

  const totalVotes = results.reduce((sum, pos) => sum + pos.candidates.reduce((s, c) => s + c.voteCount, 0), 0);

  const selectedElection = elections.find(e => e.id === selected) ?? null;

  return { elections, selected, selectedElection, setSelected, results, loadingElec, loadingRes, totalVotes, voterCount };
}
