"use client";

interface Props {
  positions: { id: string; title: string }[];
  currentStep: number;
  selections: Record<string, string>;
  onGoTo: (idx: number) => void;
}

export default function StepIndicator({ positions, currentStep, selections, onGoTo }: Props) {
  const isReview = currentStep === positions.length;

  return (
    <div className="flex items-center gap-0 px-1">
      {positions.map((pos, idx) => {
        const done = !!selections[pos.id];
        const active = currentStep === idx;
        const canNav = idx < currentStep || done;
        return (
          <div key={pos.id} className="flex items-center flex-1 min-w-0">
            <button
              type="button"
              title={pos.title}
              onClick={() => canNav && onGoTo(idx)}
              className={`w-7 h-7 rounded-full shrink-0 flex items-center justify-center text-[11px] font-semibold transition-all border-2
                ${active ? "bg-[#0A2E1A] border-[#0A2E1A] text-white scale-110 shadow-md"
                  : done ? "bg-ui-green border-ui-green text-white"
                  : "bg-white border-gray-200 text-gray-400"}`}
            >
              {done && !active
                ? <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                : idx + 1}
            </button>
            {idx < positions.length - 1 && (
              <div className={`h-0.5 flex-1 mx-1 rounded-full transition-all ${done ? "bg-ui-green" : "bg-gray-200"}`} />
            )}
          </div>
        );
      })}
      {/* Review dot */}
      <div className="flex items-center">
        <div className={`h-0.5 w-4 rounded-full mx-1 ${Object.keys(selections).length === positions.length ? "bg-ui-green" : "bg-gray-200"}`} />
        <div className={`w-7 h-7 rounded-full shrink-0 flex items-center justify-center border-2 transition-all
          ${isReview ? "bg-[#0A2E1A] border-[#0A2E1A] text-white scale-110 shadow-md" : "bg-white border-gray-200"}`}>
          <svg className={`w-3 h-3 ${isReview ? "text-ui-gold" : "text-gray-300"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        </div>
      </div>
    </div>
  );
}
