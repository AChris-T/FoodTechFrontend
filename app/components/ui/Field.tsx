"use client";

export const inp = "w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-gray-900 placeholder-gray-400 text-sm focus:border-ui-green focus:ring-2 focus:ring-ui-green/20 outline-none transition-all bg-white";

export default function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
        {label}
      </label>
      {children}
    </div>
  );
}
