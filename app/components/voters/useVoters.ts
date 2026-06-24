import { useState, useEffect, useCallback, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { apiFetch, getAdminToken } from "../../lib/api";

export interface Voter {
  id: string; matricNumber: string; fullName: string;
  level: string; email: string; photoUrl: string | null;
  canVote: boolean; hasVoted: boolean; createdAt: string;
}
export type VoterModalType = "add" | "edit" | "delete" | "csv" | null;
export interface VoterForm { matricNumber: string; fullName: string; level: string; email: string; }
export interface CsvResult { created: number; failed: number; errors: string[]; }
export interface VoterToast { msg: string; ok: boolean; }

export const VOTER_LEVELS = ["100L", "200L", "300L", "400L", "500L"];
const EMPTY: VoterForm = { matricNumber: "", fullName: "", level: "", email: "" };
const BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api/v1";

export interface UseVotersReturn {
  voters: Voter[]; filtered: Voter[]; loading: boolean;
  search: string; setSearch: (s: string) => void;
  modal: VoterModalType; selected: Voter | null;
  form: VoterForm; setForm: (f: VoterForm) => void;
  saving: boolean; togglingId: string | null; resendingId: string | null;
  toast: VoterToast | null; clearToast: () => void;
  csvFile: File | null; setCsvFile: (f: File | null) => void;
  csvResult: CsvResult | null;
  stats: { total: number; eligible: number; voted: number; restricted: number };
  openAdd: () => void; openEdit: (v: Voter) => void;
  openDelete: (v: Voter) => void; openCSV: () => void; closeModal: () => void;
  handleAdd: (e: FormEvent) => Promise<void>;
  handleEdit: (e: FormEvent) => Promise<void>;
  handleDelete: () => Promise<void>;
  handleToggleCanVote: (v: Voter) => Promise<void>;
  handleResendCredentials: (v: Voter) => Promise<void>;
  handleCSVUpload: (e: FormEvent) => Promise<void>;
}

export function useVoters(): UseVotersReturn {
  const router = useRouter();
  const [voters, setVoters] = useState<Voter[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState<VoterModalType>(null);
  const [selected, setSelected] = useState<Voter | null>(null);
  const [form, setForm] = useState<VoterForm>(EMPTY);
  const [saving, setSaving] = useState(false);
  const [togglingId, setTogglingId] = useState<string | null>(null);
  const [resendingId, setResendingId] = useState<string | null>(null);
  const [toast, setToast] = useState<VoterToast | null>(null);
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [csvResult, setCsvResult] = useState<CsvResult | null>(null);

  const tk = () => getAdminToken() ?? "";
  const showToast = (msg: string, ok = true) => setToast({ msg, ok });

  const fetchVoters = useCallback(async () => {
    const t = tk();
    if (!t) { router.push("/admin/login"); return; }
    try { setVoters(await apiFetch<Voter[]>("/voters", { token: t })); }
    catch { router.push("/admin/login"); }
    finally { setLoading(false); }
  }, [router]);

  useEffect(() => { fetchVoters(); }, [fetchVoters]);

  const openAdd = () => { setForm(EMPTY); setModal("add"); };
  const openEdit = (v: Voter) => { setSelected(v); setForm({ matricNumber: v.matricNumber, fullName: v.fullName, level: v.level, email: v.email }); setModal("edit"); };
  const openDelete = (v: Voter) => { setSelected(v); setModal("delete"); };
  const openCSV = () => { setCsvFile(null); setCsvResult(null); setModal("csv"); };
  const closeModal = () => { setModal(null); setSelected(null); };

  const handleAdd = async (e: FormEvent) => {
    e.preventDefault(); setSaving(true);
    try { await apiFetch("/voters", { method: "POST", body: JSON.stringify(form), token: tk() }); await fetchVoters(); closeModal(); showToast("Voter added — credentials emailed."); }
    catch (err: unknown) { showToast(err instanceof Error ? err.message : "Failed", false); }
    finally { setSaving(false); }
  };

  const handleEdit = async (e: FormEvent) => {
    e.preventDefault(); if (!selected) return; setSaving(true);
    try { await apiFetch(`/voters/${selected.id}`, { method: "PATCH", body: JSON.stringify({ fullName: form.fullName, level: form.level, email: form.email }), token: tk() }); await fetchVoters(); closeModal(); showToast("Voter updated."); }
    catch (err: unknown) { showToast(err instanceof Error ? err.message : "Update failed", false); }
    finally { setSaving(false); }
  };

  const handleDelete = async () => {
    if (!selected) return; setSaving(true);
    try { await apiFetch(`/voters/${selected.id}`, { method: "DELETE", token: tk() }); await fetchVoters(); closeModal(); showToast("Voter removed."); }
    catch (err: unknown) { showToast(err instanceof Error ? err.message : "Delete failed", false); }
    finally { setSaving(false); }
  };

  const handleToggleCanVote = async (v: Voter) => {
    setTogglingId(v.id);
    try { await apiFetch(`/voters/${v.id}`, { method: "PATCH", body: JSON.stringify({ canVote: !v.canVote }), token: tk() }); setVoters(p => p.map(x => x.id === v.id ? { ...x, canVote: !v.canVote } : x)); showToast(`${v.fullName} is now ${!v.canVote ? "eligible" : "restricted"}.`); }
    catch (err: unknown) { showToast(err instanceof Error ? err.message : "Update failed", false); }
    finally { setTogglingId(null); }
  };

  const handleResendCredentials = async (v: Voter) => {
    setResendingId(v.id);
    try { const r = await fetch(`${BASE}/voters/forgot-password`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ identifier: v.matricNumber }) }); if (!r.ok) throw new Error("Failed"); showToast(`Credentials sent to ${v.email}.`); }
    catch { showToast("Could not resend credentials.", false); }
    finally { setResendingId(null); }
  };

  const handleCSVUpload = async (e: FormEvent) => {
    e.preventDefault(); if (!csvFile) return; setSaving(true); setCsvResult(null);
    try { const fd = new FormData(); fd.append("file", csvFile); const r = await fetch(`${BASE}/voters/bulk-import-csv`, { method: "POST", headers: { Authorization: `Bearer ${tk()}` }, body: fd }); const d = await r.json(); if (!r.ok) throw new Error(d.message ?? "Upload failed"); setCsvResult({ created: d.created, failed: d.failed, errors: d.errors ?? [] }); await fetchVoters(); }
    catch (err: unknown) { showToast(err instanceof Error ? err.message : "CSV upload failed", false); }
    finally { setSaving(false); }
  };

  const filtered = voters.filter(v => [v.fullName, v.matricNumber, v.email, v.level].some(f => f.toLowerCase().includes(search.toLowerCase())));
  const stats = { total: voters.length, eligible: voters.filter(v => v.canVote).length, voted: voters.filter(v => v.hasVoted).length, restricted: voters.filter(v => !v.canVote).length };

  return { voters, filtered, loading, search, setSearch, modal, selected, form, setForm, saving, togglingId, resendingId, toast, clearToast: () => setToast(null), csvFile, setCsvFile, csvResult, stats, openAdd, openEdit, openDelete, openCSV, closeModal, handleAdd, handleEdit, handleDelete, handleToggleCanVote, handleResendCredentials, handleCSVUpload };
}
