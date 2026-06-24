"use client";

const INFO = [
  { label: "Platform",    value: "FoodTech Voting Platform" },
  { label: "Institution", value: "University of Ibadan" },
  { label: "Department",  value: "Food Technology" },
  { label: "Session",     value: "2025/2026" },
];

export default function PlatformInfo() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
      <h2 className="font-bold text-gray-900 text-[15px] mb-4">Platform Info</h2>
      <div className="space-y-0">
        {INFO.map(({ label, value }) => (
          <div key={label} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
            <span className="text-sm text-gray-500">{label}</span>
            <span className="text-sm font-semibold text-gray-800">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
