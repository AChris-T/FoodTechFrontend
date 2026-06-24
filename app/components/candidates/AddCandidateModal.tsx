"use client";

import { useRef, ChangeEvent } from "react";
import Modal from "../ui/Modal";
import Spinner from "../ui/Spinner";
import { inp } from "../ui/Field";
import { CANDIDATE_LEVELS, type UseCandidatesReturn } from "./useCandidates";

export default function AddCandidateModal({ ctx }: { ctx: UseCandidatesReturn }) {
  const { selectedPosition, form, setForm, saving, uploadingPhoto, photoFile, setPhotoFile, photoPreview, setPhotoPreview, handleAddCandidate, setModal, resetForm } = ctx;
  const fileRef = useRef<HTMLInputElement>(null);

  if (!selectedPosition) return null;

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; if (!file) return;
    setPhotoFile(file); setPhotoPreview(URL.createObjectURL(file));
    setForm({ ...form, photoUrl: "" });
  };

  const onClose = () => { setModal(null); resetForm(); };

  return (
    <Modal title={`Add Candidate — ${selectedPosition.title}`} onClose={onClose} size="lg">
      <form onSubmit={handleAddCandidate} className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Photo</label>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gray-50 border-2 border-dashed border-gray-200 overflow-hidden shrink-0 flex items-center justify-center">
              {photoPreview || form.photoUrl
                ? <img src={photoPreview || form.photoUrl} alt="preview" className="w-full h-full object-cover" />
                : <svg className="w-7 h-7 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>}
            </div>
            <div className="flex-1 space-y-2">
              <button type="button" onClick={() => fileRef.current?.click()}
                className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl border border-gray-200 text-sm text-gray-600 font-semibold hover:bg-gray-50 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                {photoFile ? photoFile.name.slice(0, 20) + "…" : "Choose photo"}
              </button>
              <input ref={fileRef} type="file" accept="image/*" className="hidden"
                title="Upload candidate photo" aria-label="Upload candidate photo" onChange={onFileChange} />
              <p className="text-[11px] text-gray-400 text-center">or paste URL below</p>
              <input className={inp} type="url" placeholder="https://…" value={form.photoUrl}
                onChange={e => { setForm({ ...form, photoUrl: e.target.value }); setPhotoFile(null); setPhotoPreview(""); }} />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Full Name *</label>
          <input className={inp} placeholder="e.g. Adewale John Doe" required
            value={form.fullName} onChange={e => setForm({ ...form, fullName: e.target.value })} />
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Academic Level</label>
          <div className="flex flex-wrap gap-2">
            {CANDIDATE_LEVELS.map(lvl => (
              <button key={lvl} type="button" onClick={() => setForm({ ...form, level: form.level === lvl ? "" : lvl })}
                className={`px-3 py-1.5 rounded-lg text-sm font-semibold border transition-all ${form.level === lvl ? "bg-ui-green text-white border-ui-green" : "border-gray-200 text-gray-600 hover:border-ui-green/50 hover:bg-ui-green-light"}`}>
                {lvl}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Position Interested In</label>
          <div className="px-3.5 py-2.5 rounded-xl border border-gray-100 bg-gray-50 text-sm text-gray-700 font-semibold">{selectedPosition.title}</div>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Bio / Manifesto (optional)</label>
          <textarea className={`${inp} resize-none`} rows={3} placeholder="Brief candidate bio or election manifesto…"
            value={form.bio} onChange={e => setForm({ ...form, bio: e.target.value })} />
        </div>

        <div className="flex gap-3 pt-1">
          <button type="button" onClick={onClose}
            className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors">Cancel</button>
          <button type="submit" disabled={saving || uploadingPhoto}
            className="flex-1 py-2.5 rounded-xl bg-ui-green text-white text-sm font-bold hover:bg-ui-green-mid disabled:opacity-60 transition-colors flex items-center justify-center gap-2">
            {(saving || uploadingPhoto) && <Spinner />}
            {uploadingPhoto ? "Uploading…" : saving ? "Saving…" : "Register Candidate"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
