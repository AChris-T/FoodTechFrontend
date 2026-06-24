"use client";

const statusMap: Record<string, { cls: string; dot?: string; label?: string }> = {
  ACTIVE: { cls: "bg-green-50 text-green-700 border-green-200",   dot: "bg-green-500 animate-pulse" },
  DRAFT:  { cls: "bg-amber-50 text-amber-700 border-amber-200" },
  PAUSED: { cls: "bg-orange-50 text-orange-600 border-orange-200", dot: "bg-orange-400", label: "Paused" },
  ENDED:  { cls: "bg-gray-100 text-gray-500 border-gray-200" },
  CLOSED: { cls: "bg-gray-100 text-gray-500 border-gray-200" },
};

export function StatusBadge({ status }: { status: string }) {
  const cfg = statusMap[status] ?? statusMap.DRAFT;
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${cfg.cls}`}>
      {cfg.dot && <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${cfg.dot}`} />}
      {cfg.label ?? status}
    </span>
  );
}

export function BoolBadge({ ok, label }: { ok: boolean; label: string }) {
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold border ${ok ? "bg-green-50 text-green-700 border-green-200" : "bg-red-50 text-red-600 border-red-200"}`}>
      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${ok ? "bg-green-500" : "bg-red-400"}`} />
      {label}
    </span>
  );
}
