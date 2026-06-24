"use client";

interface Props {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg";
}

export default function Modal({ title, onClose, children, size = "md" }: Props) {
  const maxW = size === "sm" ? "max-w-sm" : size === "lg" ? "max-w-2xl" : "max-w-lg";
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className={`bg-white rounded-2xl shadow-2xl w-full flex flex-col max-h-[90vh] ${maxW}`}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 shrink-0">
          <h3 className="font-bold text-gray-900 text-[15px]">{title}</h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            title="Close"
            className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-6 py-5">{children}</div>
      </div>
    </div>
  );
}
