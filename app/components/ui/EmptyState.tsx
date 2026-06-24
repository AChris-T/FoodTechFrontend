"use client";

interface Props {
  icon?: React.ReactNode;
  title: string;
  subtitle?: string;
  action?: { label: string; onClick: () => void };
}

export default function EmptyState({ icon, title, subtitle, action }: Props) {
  return (
    <div className="py-20 flex flex-col items-center gap-4 text-gray-400">
      {icon && (
        <div className="w-16 h-16 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center mb-1">
          {icon}
        </div>
      )}
      <div className="text-center">
        <p className="text-sm font-semibold text-gray-600">{title}</p>
        {subtitle && <p className="text-xs text-gray-400 mt-1">{subtitle}</p>}
      </div>
      {action && (
        <button
          type="button"
          onClick={action.onClick}
          className="mt-1 px-5 py-2.5 rounded-xl bg-ui-green text-white text-sm font-semibold hover:bg-ui-green-mid transition-colors"
        >
          {action.label}
        </button>
      )}
    </div>
  );
}
