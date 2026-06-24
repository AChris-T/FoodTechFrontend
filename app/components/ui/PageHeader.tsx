"use client";

interface Props {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
}

export default function PageHeader({ title, subtitle, actions }: Props) {
  return (
    <div className="mb-7 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
      <div>
        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-0.5 hidden sm:block">
          Admin Portal
        </p>
        <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight leading-none">{title}</h1>
        {subtitle && <p className="text-gray-400 text-sm mt-1.5">{subtitle}</p>}
      </div>
      {actions && <div className="flex items-center gap-2 shrink-0">{actions}</div>}
    </div>
  );
}
