"use client";

import Modal from "../ui/Modal";
import Field, { inp } from "../ui/Field";
import Spinner from "../ui/Spinner";
import { VOTER_LEVELS, type UseVotersReturn } from "./useVoters";

export default function EditVoterModal({ ctx }: { ctx: UseVotersReturn }) {
  const { form, setForm, saving, closeModal, handleEdit } = ctx;
  return (
    <Modal title="Edit Voter" onClose={closeModal}>
      <form onSubmit={handleEdit} className="space-y-4">
        <Field label="Full Name">
          <input className={inp} placeholder="Full name" required
            value={form.fullName} onChange={e => setForm({ ...form, fullName: e.target.value })} />
        </Field>
        <Field label="Matric Number">
          <input className={`${inp} bg-gray-50 text-gray-400 cursor-not-allowed`} disabled
            placeholder="Matric number" value={form.matricNumber} />
          <p className="text-[11px] text-gray-400 mt-1">Matric number cannot be changed.</p>
        </Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Level">
            <select className={inp} required title="Student level"
              value={form.level} onChange={e => setForm({ ...form, level: e.target.value })}>
              {VOTER_LEVELS.map(l => <option key={l} value={l}>{l}</option>)}
            </select>
          </Field>
          <Field label="Email">
            <input className={inp} type="email" placeholder="Email address" required
              value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
          </Field>
        </div>
        <div className="flex gap-3 pt-1">
          <button type="button" onClick={closeModal}
            className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors">
            Cancel
          </button>
          <button type="submit" disabled={saving}
            className="flex-1 py-2.5 rounded-xl bg-ui-green text-white text-sm font-semibold hover:bg-ui-green-mid disabled:opacity-60 transition-colors flex items-center justify-center gap-2">
            {saving && <Spinner />}{saving ? "Saving…" : "Save Changes"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
