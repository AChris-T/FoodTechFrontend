"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { logoutAdminAction } from "../../lib/actions";

const NAV = [
  {
    href: "/admin",
    label: "Dashboard",
    exact: true,
    icon: (
      <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    href: "/admin/voters",
    label: "Voters",
    icon: (
      <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    href: "/admin/elections",
    label: "Elections",
    icon: (
      <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
  },
  {
    href: "/admin/candidates",
    label: "Candidates",
    icon: (
      <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
  },
  {
    href: "/admin/results",
    label: "Results",
    icon: (
      <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
];

interface Props {
  onClose?: () => void;
  mobile?: boolean;
}

export default function AdminSidebar({ onClose, mobile }: Props) {
  const pathname = usePathname();
  const router = useRouter();

  async function logout() {
    await logoutAdminAction();
    router.push("/admin/login");
  }

  function isActive(href: string, exact?: boolean) {
    if (exact) return pathname === href;
    return pathname.startsWith(href);
  }

  return (
    <aside className={`admin-sidebar ${mobile ? "w-[272px]" : "w-64 sticky top-0 h-screen"} flex flex-col overflow-hidden ${mobile ? "h-full" : ""}`}>

      {/* ── Brand header ── */}
      <div className="px-5 pt-6 pb-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-ui-gold shadow-lg shadow-ui-gold/30 flex items-center justify-center shrink-0">
            <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
              <path d="M12 2L13.09 8.26L19 6L14.74 10.74L21 12L14.74 13.26L19 18L13.09 15.74L12 22L10.91 15.74L5 18L9.26 13.26L3 12L9.26 10.74L5 6L10.91 8.26L12 2Z" fill="#071710" />
            </svg>
          </div>
          <div>
            <p className="text-white font-extrabold text-[13.5px] leading-tight tracking-tight">FoodTech</p>
            <p className="text-ui-gold/70 text-[9.5px] leading-tight tracking-widest uppercase font-semibold">Admin Portal</p>
          </div>
        </div>

        {/* Mobile close button */}
        {mobile && onClose && (
          <button type="button" onClick={onClose} aria-label="Close menu"
            className="w-8 h-8 rounded-lg flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* ── Divider ── */}
      <div className="mx-5 h-px bg-white/8" />

      {/* ── Navigation ── */}
      <nav className="flex-1 px-3 py-5 space-y-0.5 overflow-y-auto">
        <p className="text-white/25 text-[9px] font-bold uppercase tracking-[0.18em] px-3 pb-2">
          Navigation
        </p>

        {NAV.map((item) => {
          const active = isActive(item.href, item.exact);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`group flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13.5px] font-semibold transition-all duration-150 ${
                active
                  ? "admin-nav-item-active"
                  : "admin-nav-item hover:bg-white/8 hover:text-white"
              }`}
            >
              <span className={`shrink-0 transition-colors ${active ? "text-ui-gold" : "text-white/40 group-hover:text-white/70"}`}>
                {item.icon}
              </span>
              <span className="leading-none">{item.label}</span>

              {/* Active indicator dot */}
              {active && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-ui-gold shrink-0" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* ── Divider ── */}
      <div className="mx-5 h-px bg-white/8" />

      {/* ── Footer actions ── */}
      <div className="px-3 py-4 space-y-0.5">
        <Link
          href="/admin/settings"
          className={`group flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13.5px] font-semibold transition-all ${
            isActive("/admin/settings")
              ? "admin-nav-item-active"
              : "admin-nav-item hover:bg-white/8 hover:text-white"
          }`}
        >
          <span className={`shrink-0 transition-colors ${isActive("/admin/settings") ? "text-ui-gold" : "text-white/40 group-hover:text-white/70"}`}>
            <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </span>
          Settings
        </Link>

        <button
          type="button"
          onClick={logout}
          className="admin-nav-item w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13.5px] font-semibold hover:bg-red-500/12 hover:text-red-400 transition-all group"
        >
          <span className="shrink-0 text-white/40 group-hover:text-red-400 transition-colors">
            <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </span>
          Sign Out
        </button>
      </div>

      {/* ── Bottom session info ── */}
      <div className="mx-4 mb-4 mt-1 px-3 py-3 rounded-xl bg-white/5 border border-white/8">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-full bg-ui-gold/20 border border-ui-gold/30 flex items-center justify-center shrink-0">
            <span className="text-ui-gold text-[10px] font-black">AD</span>
          </div>
          <div className="min-w-0">
            <p className="text-white text-[12px] font-semibold leading-tight">Super Admin</p>
            <p className="text-white/35 text-[10px] truncate leading-tight">University of Ibadan</p>
          </div>
          <div className="ml-auto w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" title="Online" />
        </div>
      </div>
    </aside>
  );
}
