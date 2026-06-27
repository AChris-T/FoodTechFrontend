"use client";

import { useRef } from "react";
import Modal from "../ui/Modal";
import Spinner from "../ui/Spinner";
import type { UseVotersReturn } from "./useVoters";

export default function CsvImportModal({ ctx }: { ctx: UseVotersReturn }) {
  const { csvFile, setCsvFile, csvResult, saving, closeModal, handleCSVUpload } = ctx;
  const ref = useRef<HTMLInputElement>(null);

  return (
    <Modal title="Import Voters from CSV" onClose={closeModal}>
      <div className="space-y-4">
        <div className="bg-ui-green-light rounded-xl p-4">
          <p className="text-xs font-bold text-ui-green-dark uppercase tracking-wide mb-2">Required columns</p>
          <code className="block text-xs font-mono text-ui-green bg-ui-green/10 px-3 py-2 rounded-lg">
            matricNumber, fullName, level, email
          </code>
          <p className="text-[11px] text-ui-green/70 mt-2">Each row creates a voter and queues a credentials email.</p>
        </div>

        <form onSubmit={handleCSVUpload} className="space-y-4">
          <div role="button" tabIndex={0}
            onClick={() => ref.current?.click()}
            onKeyDown={e => e.key === "Enter" && ref.current?.click()}
            className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center cursor-pointer hover:border-ui-green hover:bg-ui-green-light/20 transition-all">
            <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
            </div>
            {csvFile ? (
              <>
                <p className="text-sm font-bold text-ui-green">{csvFile.name}</p>
                <p className="text-xs text-gray-400 mt-0.5">{(csvFile.size / 1024).toFixed(1)} KB</p>
              </>
            ) : (
              <>
                <p className="text-sm font-semibold text-gray-700">Click to select CSV file</p>
                <p className="text-xs text-gray-400 mt-1">Max 5 MB · .csv only</p>
              </>
            )}
            <input ref={ref} type="file" accept="text" className="hidden"
              title="Upload CSV file" aria-label="Upload CSV file"
              onChange={e => { setCsvFile(e.target.files?.[0] ?? null); }} />
          </div>

          {csvResult && (
            <div className={`rounded-xl p-4 text-sm border ${csvResult.failed === 0 ? "bg-green-50 border-green-200" : "bg-amber-50 border-amber-200"}`}>
              <p className="font-bold text-gray-800">{csvResult.created} imported{csvResult.failed > 0 ? ` · ${csvResult.failed} failed` : ""}</p>
              {csvResult.errors.length > 0 && (
                <ul className="mt-2 space-y-0.5 max-h-28 overflow-y-auto">
                  {csvResult.errors.map((er, i) => <li key={i} className="text-[11px] font-mono text-amber-800">{er}</li>)}
                </ul>
              )}
            </div>
          )}

          <div className="flex gap-3">
            <button type="button" onClick={closeModal}
              className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors">
              {csvResult ? "Close" : "Cancel"}
            </button>
            {!csvResult && (
              <button type="submit" disabled={!csvFile || saving}
                className="flex-1 py-2.5 rounded-xl bg-ui-green text-white text-sm font-semibold hover:bg-ui-green-mid disabled:opacity-50 transition-colors flex items-center justify-center gap-2">
                {saving && <Spinner />}{saving ? "Importing…" : "Upload & Import"}
              </button>
            )}
          </div>
        </form>
      </div>
    </Modal>
  );
}
