"use client";

import { useEffect } from "react";

interface Props { msg: string; ok: boolean; onClose: () => void; }

export default function Toast({ msg, ok, onClose }: Props) {
  useEffect(() => {
    const t = setTimeout(onClose, 3500);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <div className={`fixed top-4 right-4 z-100 flex items-center gap-3 px-4 py-3 rounded-xl shadow-xl text-sm font-semibold max-w-sm ${ok ? "bg-ui-green text-white" : "bg-red-600 text-white"}`}>
      {ok
        ? <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
        : <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
      }
      <span className="flex-1">{msg}</span>
    </div>
  );
}
