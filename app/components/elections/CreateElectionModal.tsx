"use client";

import Modal from "../ui/Modal";
import Field, { inp } from "../ui/Field";
import Spinner from "../ui/Spinner";
import type { UseElectionsReturn } from "./useElections";

export default function CreateElectionModal({ ctx }: { ctx: UseElectionsReturn }) {
  const { form, setForm, saving, closeModal, handleCreate } = ctx;
  return (
    <Modal title="Create Election" onClose={closeModal}>
      <form onSubmit={handleCreate} className="space-y-4">
        <Field label="Title">
          <input className={inp} placeholder="e.g. SUG General Election 2026" required
            value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
        </Field>
        <Field label="Description (optional)">
          <textarea className={`${inp} resize-none`} rows={2} placeholder="Brief description…"
            value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
        </Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Start Date & Time">
            <input className={inp} type="datetime-local" required
              value={form.startDate} onChange={e => setForm({ ...form, startDate: e.target.value })} />
          </Field>
          <Field label="End Date & Time">
            <input className={inp} type="datetime-local" required
              value={form.endDate} onChange={e => setForm({ ...form, endDate: e.target.value })} />
          </Field>
        </div>
        <div className="flex gap-3 pt-1">
          <button type="button" onClick={closeModal}
            className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors">
            Cancel
          </button>
          <button type="submit" disabled={saving}
            className="flex-1 py-2.5 rounded-xl bg-ui-green text-white text-sm font-semibold hover:bg-ui-green-mid disabled:opacity-60 transition-colors flex items-center justify-center gap-2">
            {saving && <Spinner />}{saving ? "Creating…" : "Create Election"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
