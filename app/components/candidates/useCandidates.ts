import { useState, useEffect, useCallback, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { apiFetch, getAdminToken } from "../../lib/api";

export interface CandidateElection { id: string; title: string; status: string; }
export interface Candidate { id: string; fullName: string; bio?: string; photoUrl?: string; level?: string; positionId: string; }
export interface Position { id: string; title: string; electionId: string; candidates: Candidate[]; }
export type CandidateModal = "addCandidate" | "deleteCandidate" | "deletePosition" | null;
export interface CandidateForm { fullName: string; bio: string; level: string; photoUrl: string; }

export interface UseCandidatesReturn {
  elections: CandidateElection[]; positions: Position[];
  selectedElectionId: string; setSelectedElectionId: (id: string) => void;
  selectedPositionId: string; setSelectedPositionId: (id: string) => void;
  selectedPosition: Position | undefined; selectedElection: CandidateElection | undefined;
  loading: boolean; posLoading: boolean; saving: boolean; uploadingPhoto: boolean;
  modal: CandidateModal; setModal: (m: CandidateModal) => void;
  deletingCandidate: Candidate | null; setDeletingCandidate: (c: Candidate | null) => void;
  deletingPosition: Position | null; setDeletingPosition: (p: Position | null) => void;
  newPositionTitle: string; setNewPositionTitle: (s: string) => void;
  addingPos: boolean; form: CandidateForm; setForm: (f: CandidateForm) => void;
  photoFile: File | null; setPhotoFile: (f: File | null) => void;
  photoPreview: string; setPhotoPreview: (s: string) => void;
  toast: { msg: string; ok: boolean } | null; clearToast: () => void;
  handleAddPosition: (e: FormEvent) => Promise<void>;
  confirmDeletePosition: () => Promise<void>;
  handleAddCandidate: (e: FormEvent) => Promise<void>;
  confirmDeleteCandidate: () => Promise<void>;
  resetForm: () => void;
}

export const CANDIDATE_LEVELS = ["100L", "200L", "300L", "400L", "500L", "PG"];
const BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api/v1";
const tk = () => getAdminToken() ?? "";
const EMPTY_FORM: CandidateForm = { fullName: "", bio: "", level: "", photoUrl: "" };

export function useCandidates(): UseCandidatesReturn {
  const router = useRouter();
  const [elections, setElections] = useState<CandidateElection[]>([]);
  const [positions, setPositions] = useState<Position[]>([]);
  const [selectedElectionId, setSelectedElectionId] = useState("");
  const [selectedPositionId, setSelectedPositionId] = useState("");
  const [loading, setLoading] = useState(true);
  const [posLoading, setPosLoading] = useState(false);
  const [modal, setModal] = useState<CandidateModal>(null);
  const [deletingCandidate, setDeletingCandidate] = useState<Candidate | null>(null);
  const [deletingPosition, setDeletingPosition] = useState<Position | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [toast, setToast] = useState<{ msg: string; ok: boolean } | null>(null);
  const [newPositionTitle, setNewPositionTitle] = useState("");
  const [addingPos, setAddingPos] = useState(false);
  const [form, setForm] = useState<CandidateForm>(EMPTY_FORM);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState("");

  const showToast = (msg: string, ok = true) => setToast({ msg, ok });

  useEffect(() => {
    const t = tk(); if (!t) { router.push("/admin/login"); return; }
    apiFetch<CandidateElection[]>("/elections", { token: t })
      .then(d => { setElections(d); if (d.length > 0) setSelectedElectionId(d[0].id); })
      .catch(() => router.push("/admin/login"))
      .finally(() => setLoading(false));
  }, [router]);

  const fetchPositions = useCallback(async (electionId: string) => {
    if (!electionId) return; setPosLoading(true);
    try { const d = await apiFetch<Position[]>(`/positions/election/${electionId}`, { token: tk() }); setPositions(d); if (d.length > 0) setSelectedPositionId(d[0].id); else setSelectedPositionId(""); }
    catch { showToast("Failed to load positions", false); }
    finally { setPosLoading(false); }
  }, []);

  useEffect(() => { if (selectedElectionId) { setSelectedPositionId(""); fetchPositions(selectedElectionId); } }, [selectedElectionId, fetchPositions]);

  const resetForm = () => { setForm(EMPTY_FORM); setPhotoFile(null); setPhotoPreview(""); };

  const handleAddPosition = async (e: FormEvent) => {
    e.preventDefault(); if (!newPositionTitle.trim() || !selectedElectionId) return; setAddingPos(true);
    try { const pos = await apiFetch<Position>("/positions", { method: "POST", body: JSON.stringify({ electionId: selectedElectionId, title: newPositionTitle.trim() }), token: tk() }); setPositions(p => [...p, pos]); setSelectedPositionId(pos.id); setNewPositionTitle(""); showToast("Position added."); }
    catch (err: unknown) { showToast(err instanceof Error ? err.message : "Failed", false); }
    finally { setAddingPos(false); }
  };

  const confirmDeletePosition = async () => {
    if (!deletingPosition) return; setSaving(true);
    try { await apiFetch(`/positions/${deletingPosition.id}`, { method: "DELETE", token: tk() }); setPositions(p => p.filter(x => x.id !== deletingPosition.id)); if (selectedPositionId === deletingPosition.id) setSelectedPositionId(""); setModal(null); setDeletingPosition(null); showToast("Position deleted."); }
    catch (err: unknown) { showToast(err instanceof Error ? err.message : "Failed", false); }
    finally { setSaving(false); }
  };

  const handleAddCandidate = async (e: FormEvent) => {
    e.preventDefault(); if (!selectedPositionId) return; setSaving(true);
    try {
      let url = form.photoUrl;
      if (photoFile) {
        setUploadingPhoto(true);
        const fd = new FormData(); fd.append("file", photoFile);
        const r = await fetch(`${BASE}/upload/image`, { method: "POST", headers: { Authorization: `Bearer ${tk()}` }, body: fd });
        const d = await r.json(); if (!r.ok) throw new Error(d.message ?? "Upload failed");
        url = d.url; setUploadingPhoto(false);
      }
      const body: Record<string, string> = { positionId: selectedPositionId, fullName: form.fullName };
      if (form.bio) body.bio = form.bio; if (form.level) body.level = form.level; if (url) body.photoUrl = url;
      const created = await apiFetch<Candidate>("/candidates", { method: "POST", body: JSON.stringify(body), token: tk() });
      setPositions(p => p.map(x => x.id === selectedPositionId ? { ...x, candidates: [...x.candidates, created] } : x));
      setModal(null); resetForm(); showToast("Candidate registered.");
    }
    catch (err: unknown) { showToast(err instanceof Error ? err.message : "Failed", false); setUploadingPhoto(false); }
    finally { setSaving(false); }
  };

  const confirmDeleteCandidate = async () => {
    if (!deletingCandidate) return; setSaving(true);
    try { await apiFetch(`/candidates/${deletingCandidate.id}`, { method: "DELETE", token: tk() }); setPositions(p => p.map(x => x.id === selectedPositionId ? { ...x, candidates: x.candidates.filter(c => c.id !== deletingCandidate.id) } : x)); setModal(null); setDeletingCandidate(null); showToast("Candidate removed."); }
    catch (err: unknown) { showToast(err instanceof Error ? err.message : "Failed", false); }
    finally { setSaving(false); }
  };

  return { elections, positions, selectedElectionId, setSelectedElectionId, selectedPositionId, setSelectedPositionId, selectedPosition: positions.find(p => p.id === selectedPositionId), selectedElection: elections.find(e => e.id === selectedElectionId), loading, posLoading, saving, uploadingPhoto, modal, setModal, deletingCandidate, setDeletingCandidate, deletingPosition, setDeletingPosition, newPositionTitle, setNewPositionTitle, addingPos, form, setForm, photoFile, setPhotoFile, photoPreview, setPhotoPreview, toast, clearToast: () => setToast(null), handleAddPosition, confirmDeletePosition, handleAddCandidate, confirmDeleteCandidate, resetForm };
}
