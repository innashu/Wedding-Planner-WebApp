"use client";

export type SortOption = "default" | "due-asc" | "due-desc";

interface SortFilterProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

export function SortFilter({ value, onChange }: SortFilterProps) {
  return (
    <div className="flex justify-end mb-4">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as SortOption)}
        className="text-sm text-gray-500 bg-white border border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-rose-200 focus:border-rose-300"
      >
        <option value="default">Default order</option>
        <option value="due-asc">Due date (earliest first)</option>
        <option value="due-desc">Due date (latest first)</option>
      </select>
    </div>
  );
}
