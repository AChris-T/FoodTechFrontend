import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { apiFetch, getVoterToken } from "../../lib/api";
import { logoutVoterAction } from "../../lib/actions";

export interface Candidate { id: string; fullName: string; bio?: string; photoUrl?: string; level?: string; }
export interface Position { id: string; title: string; candidates: Candidate[]; }
export interface VoterElection {
  id: string; title: string; description?: string;
  startDate: string; endDate: string; status: string;
  positions: Position[];
}
export interface MyVote { positionId: string; candidateId: string; }
export interface VoterProfile { fullName: string; matricNumber: string; level: string; canVote: boolean; hasVoted: boolean; }

export interface UseVoterDashboardReturn {
  voter: VoterProfile | null;
  loading: boolean;
  activeElection: VoterElection | null;
  myVotes: MyVote[];
  selections: Record<string, string>;
  submitting: boolean;
  alreadyVoted: boolean;
  step: number;
  isReview: boolean;
  toast: { msg: string; ok: boolean } | null;
  clearToast: () => void;
  select: (positionId: string, candidateId: string) => void;
  nextStep: () => void;
  prevStep: () => void;
  handleSubmit: () => Promise<void>;
  handleLogout: () => Promise<void>;
}

function tk() { return getVoterToken() ?? ""; }

export function useVoterDashboard(): UseVoterDashboardReturn {
  const router = useRouter();
  const [voter, setVoter] = useState<VoterProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeElection, setActiveElection] = useState<VoterElection | null>(null);
  const [myVotes, setMyVotes] = useState<MyVote[]>([]);
  const [selections, setSelections] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [step, setStep] = useState(0);
  const [toast, setToast] = useState<{ msg: string; ok: boolean } | null>(null);

  const showToast = (msg: string, ok = true) => { setToast({ msg, ok }); setTimeout(() => setToast(null), 4000); };

  const fetchData = useCallback(async () => {
    const t = tk();
    if (!t) { router.push("/login"); return; }
    try {
      const [profile, elections] = await Promise.all([
        apiFetch<VoterProfile>("/auth/me", { token: t }),
        apiFetch<VoterElection[]>("/elections/voter", { token: t }),
      ]);
      setVoter(profile);
      const active = elections.find(e => e.status === "ACTIVE");
      if (active) {
        const positions = await Promise.all(
          (active.positions ?? []).map(p =>
            apiFetch<Candidate[]>(`/candidates/position/${p.id}`, { token: t })
              .then(cands => ({ ...p, candidates: cands }))
              .catch(() => ({ ...p, candidates: [] }))
          )
        );
        setActiveElection({ ...active, positions });
        const votes = await apiFetch<MyVote[]>(`/votes/my/${active.id}`, { token: t }).catch(() => []);
        setMyVotes(votes);
        // Auto-heal: voter has votes in DB but hasVoted flag is still false (submitted before fix)
        if (votes.length > 0 && !profile.hasVoted) {
          await apiFetch(`/votes/finalize/${active.id}`, { method: "POST", token: t }).catch(() => null);
        }
      }
    } catch { router.push("/login"); }
    finally { setLoading(false); }
  }, [router]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const totalSteps = (activeElection?.positions.length ?? 0) + 1; // positions + review
  const isReview = step === totalSteps - 1;

  const handleSubmit = async () => {
    const t = tk();
    setSubmitting(true);
    try {
      // Cast each vote — skip silently if already voted for that position (idempotent)
      for (const [positionId, candidateId] of Object.entries(selections)) {
        await apiFetch("/votes", {
          method: "POST",
          body: JSON.stringify({ electionId: activeElection!.id, positionId, candidateId }),
          token: t,
        }).catch((err: Error) => {
          if (err.message.toLowerCase().includes("already voted")) return;
          throw err;
        });
      }
      // Always finalize — sets hasVoted=true regardless of how many positions were voted
      await apiFetch(`/votes/finalize/${activeElection!.id}`, { method: "POST", token: t }).catch(() => null);
      const fresh = await apiFetch<MyVote[]>(`/votes/my/${activeElection!.id}`, { token: t }).catch(() => []);
      setMyVotes(fresh);
      setSubmitted(true);
      showToast("Your ballot has been submitted!");
    } catch (err: unknown) {
      showToast(err instanceof Error ? err.message : "Submission failed. Try again.", false);
    } finally { setSubmitting(false); }
  };

  const handleLogout = async () => { await logoutVoterAction(); router.push("/login"); };

  return {
    voter, loading, activeElection, myVotes, selections, submitting,
    alreadyVoted: myVotes.length > 0 || submitted,
    step, isReview,
    toast, clearToast: () => setToast(null),
    select: (posId, candId) => setSelections(prev => {
      if (!candId) { const next = { ...prev }; delete next[posId]; return next; }
      return { ...prev, [posId]: candId };
    }),
    nextStep: () => setStep(s => Math.min(s + 1, totalSteps - 1)),
    prevStep: () => setStep(s => Math.max(s - 1, 0)),
    handleSubmit, handleLogout,
  };
}
