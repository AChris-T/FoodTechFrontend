import { useState, useEffect, useCallback, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { apiFetch, getAdminToken } from "../../lib/api";

export interface Position { id: string; title: string; maxVotes: number; }
export type ElectionStatus = "DRAFT" | "ACTIVE" | "PAUSED" | "ENDED" | "CLOSED";
export interface Election { id: string; title: string; description?: string; startDate: string; endDate: string; status: ElectionStatus; positions: Position[]; }
export type ElectionModal = "create" | "positions" | "delete" | null;
export interface ElectionForm { title: string; description: string; startDate: string; endDate: string; }

export interface UseElectionsReturn {
  elections: Election[]; loading: boolean; saving: boolean;
  statusLoadingId: string | null;
  modal: ElectionModal; selected: Election | null;
  form: ElectionForm; setForm: (f: ElectionForm) => void;
  positionTitle: string; setPositionTitle: (s: string) => void;
  toast: { msg: string; ok: boolean } | null; clearToast: () => void;
  openCreate: () => void; openPositions: (el: Election) => void;
  openDelete: (el: Election) => void; closeModal: () => void;
  handleCreate: (e: FormEvent) => Promise<void>;
  handleDelete: () => Promise<void>;
  handleAddPosition: (e: FormEvent) => Promise<void>;
  handleDeletePosition: (posId: string) => Promise<void>;
  handleSetStatus: (el: Election, status: ElectionStatus) => Promise<void>;
}

const EMPTY_FORM: ElectionForm = { title: "", description: "", startDate: "", endDate: "" };
const tk = () => getAdminToken() ?? "";

export function useElections(): UseElectionsReturn {
  const router = useRouter();
  const [elections, setElections] = useState<Election[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [statusLoadingId, setStatusLoadingId] = useState<string | null>(null);
  const [modal, setModal] = useState<ElectionModal>(null);
  const [selected, setSelected] = useState<Election | null>(null);
  const [form, setForm] = useState<ElectionForm>(EMPTY_FORM);
  const [positionTitle, setPositionTitle] = useState("");
  const [toast, setToast] = useState<{ msg: string; ok: boolean } | null>(null);

  const showToast = (msg: string, ok = true) => setToast({ msg, ok });

  const fetchElections = useCallback(async () => {
    const t = tk();
    if (!t) { router.push("/admin/login"); return; }
    try { setElections(await apiFetch<Election[]>("/elections", { token: t })); }
    catch { router.push("/admin/login"); }
    finally { setLoading(false); }
  }, [router]);

  useEffect(() => { fetchElections(); }, [fetchElections]);

  const openCreate = () => { setForm(EMPTY_FORM); setModal("create"); };
  const openPositions = (el: Election) => { setSelected(el); setPositionTitle(""); setModal("positions"); };
  const openDelete = (el: Election) => { setSelected(el); setModal("delete"); };
  const closeModal = () => { setModal(null); setSelected(null); };

  const handleCreate = async (e: FormEvent) => {
    e.preventDefault(); setSaving(true);
    try { await apiFetch("/elections", { method: "POST", body: JSON.stringify(form), token: tk() }); await fetchElections(); closeModal(); setForm(EMPTY_FORM); showToast("Election created."); }
    catch (err: unknown) { showToast(err instanceof Error ? err.message : "Failed", false); }
    finally { setSaving(false); }
  };

  const handleDelete = async () => {
    if (!selected) return; setSaving(true);
    try { await apiFetch(`/elections/${selected.id}`, { method: "DELETE", token: tk() }); await fetchElections(); closeModal(); showToast("Election deleted."); }
    catch (err: unknown) { showToast(err instanceof Error ? err.message : "Failed", false); }
    finally { setSaving(false); }
  };

  const handleAddPosition = async (e: FormEvent) => {
    e.preventDefault(); if (!selected || !positionTitle.trim()) return; setSaving(true);
    try {
      await apiFetch("/positions", { method: "POST", body: JSON.stringify({ title: positionTitle, electionId: selected.id }), token: tk() });
      const updated = await apiFetch<Election>(`/elections/${selected.id}`, { token: tk() });
      setSelected(updated); await fetchElections(); setPositionTitle(""); showToast("Position added.");
    }
    catch (err: unknown) { showToast(err instanceof Error ? err.message : "Failed", false); }
    finally { setSaving(false); }
  };

  const handleDeletePosition = async (posId: string) => {
    try {
      await apiFetch(`/positions/${posId}`, { method: "DELETE", token: tk() });
      const updated = await apiFetch<Election>(`/elections/${selected!.id}`, { token: tk() });
      setSelected(updated); await fetchElections(); showToast("Position removed.");
    }
    catch (err: unknown) { showToast(err instanceof Error ? err.message : "Failed", false); }
  };

  const handleSetStatus = async (el: Election, status: ElectionStatus) => {
    setStatusLoadingId(el.id);
    try { await apiFetch(`/elections/${el.id}`, { method: "PATCH", body: JSON.stringify({ status }), token: tk() }); await fetchElections(); showToast(`Election ${status.toLowerCase()}.`); }
    catch (err: unknown) { showToast(err instanceof Error ? err.message : "Failed", false); }
    finally { setStatusLoadingId(null); }
  };

  return { elections, loading, saving, statusLoadingId, modal, selected, form, setForm, positionTitle, setPositionTitle, toast, clearToast: () => setToast(null), openCreate, openPositions, openDelete, closeModal, handleCreate, handleDelete, handleAddPosition, handleDeletePosition, handleSetStatus };
}
