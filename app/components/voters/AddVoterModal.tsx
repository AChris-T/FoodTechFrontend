"use client";

import Modal from "../ui/Modal";
import Field, { inp } from "../ui/Field";
import Spinner from "../ui/Spinner";
import { VOTER_LEVELS, type UseVotersReturn } from "./useVoters";

export default function AddVoterModal({ ctx }: { ctx: UseVotersReturn }) {
  const { form, setForm, saving, closeModal, handleAdd } = ctx;
  return (
    <Modal title="Register New Voter" onClose={closeModal}>
      <form onSubmit={handleAdd} className="space-y-4">
        <Field label="Full Name">
          <input className={inp} placeholder="e.g. Adewale John Doe" required
            value={form.fullName} onChange={e => setForm({ ...form, fullName: e.target.value })} />
        </Field>
        <Field label="Matric Number">
          <input className={inp} placeholder="e.g. UG/22/01234" required
            value={form.matricNumber} onChange={e => setForm({ ...form, matricNumber: e.target.value })} />
        </Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Level">
            <select className={inp} required title="Student level"
              value={form.level} onChange={e => setForm({ ...form, level: e.target.value })}>
              <option value="">Select level</option>
              {VOTER_LEVELS.map(l => <option key={l} value={l}>{l}</option>)}
            </select>
          </Field>
          <Field label="Email">
            <input className={inp} type="email" placeholder="john@stu.ui.edu.ng" required
              value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
          </Field>
        </div>
        <div className="flex items-start gap-2 bg-ui-green-light rounded-xl px-3.5 py-3 text-xs text-ui-green-dark">
          <svg className="w-3.5 h-3.5 text-ui-green mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          A password will be auto-generated and emailed to this voter upon registration.
        </div>
        <div className="flex gap-3 pt-1">
          <button type="button" onClick={closeModal}
            className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors">
            Cancel
          </button>
          <button type="submit" disabled={saving}
            className="flex-1 py-2.5 rounded-xl bg-ui-green text-white text-sm font-semibold hover:bg-ui-green-mid disabled:opacity-60 transition-colors flex items-center justify-center gap-2">
            {saving && <Spinner />}{saving ? "Registering…" : "Register Voter"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
