"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import AdminSidebar from "./AdminSidebar";

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close drawer on route change
  useEffect(() => { setOpen(false); }, [pathname]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const pageTitle = pathname === "/admin" ? "Dashboard"
    : pathname.startsWith("/admin/voters") ? "Voters"
    : pathname.startsWith("/admin/elections") ? "Elections"
    : pathname.startsWith("/admin/candidates") ? "Candidates"
    : pathname.startsWith("/admin/results") ? "Results"
    : pathname.startsWith("/admin/settings") ? "Settings"
    : "Admin";

  return (
    <div className="admin-font flex min-h-screen bg-[#F5F7F5]">

      {/* ── Desktop sidebar (lg+) ── */}
      <div className="hidden lg:block">
        <AdminSidebar />
      </div>

      {/* ── Mobile drawer overlay ── */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* ── Mobile drawer ── */}
      <div className={`fixed inset-y-0 left-0 z-50 lg:hidden transition-transform duration-300 ease-out ${open ? "translate-x-0" : "-translate-x-full"}`}>
        <AdminSidebar onClose={() => setOpen(false)} mobile />
      </div>

      {/* ── Main content area ── */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">

        {/* ── Mobile topbar ── */}
        <header className="lg:hidden sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-gray-100 px-4 h-14 flex items-center justify-between gap-3 shadow-sm">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open navigation menu"
              className="w-9 h-9 flex items-center justify-center rounded-xl text-gray-600 hover:bg-gray-100 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-ui-green-dark flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5">
                  <path d="M12 2L13.09 8.26L19 6L14.74 10.74L21 12L14.74 13.26L19 18L13.09 15.74L12 22L10.91 15.74L5 18L9.26 13.26L3 12L9.26 10.74L5 6L10.91 8.26L12 2Z" fill="#C9A84C" />
                </svg>
              </div>
              <span className="font-bold text-gray-900 text-sm">{pageTitle}</span>
            </div>
          </div>
          <div className="w-8 h-8 rounded-full bg-ui-green flex items-center justify-center">
            <span className="text-white text-[11px] font-bold">AD</span>
          </div>
        </header>

        {/* ── Page content ── */}
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}
