"use client";

interface Stats { total: number; eligible: number; voted: number; restricted: number; }

function StatCard({ label, value, iconBg, border, icon }: { label: string; value: number; iconBg: string; border: string; icon: React.ReactNode; }) {
  return (
    <div className={`bg-white rounded-2xl border p-5 flex items-center gap-4 shadow-sm ${border}`}>
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${iconBg}`}>{icon}</div>
      <div>
        <p className="text-2xl font-extrabold text-gray-900 leading-none">{value}</p>
        <p className="text-xs text-gray-500 mt-1">{label}</p>
      </div>
    </div>
  );
}

export default function VoterStats({ stats }: { stats: Stats }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-7">
      <StatCard label="Total Voters" value={stats.total} border="border-gray-100" iconBg="bg-ui-green-light"
        icon={<svg className="w-5 h-5 text-ui-green" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>}
      />
      <StatCard label="Eligible to Vote" value={stats.eligible} border="border-green-100" iconBg="bg-green-50"
        icon={<svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
      />
      <StatCard label="Has Voted" value={stats.voted} border="border-blue-100" iconBg="bg-blue-50"
        icon={<svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>}
      />
      <StatCard label="Restricted" value={stats.restricted} border="border-red-100" iconBg="bg-red-50"
        icon={<svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" /></svg>}
      />
    </div>
  );
}
