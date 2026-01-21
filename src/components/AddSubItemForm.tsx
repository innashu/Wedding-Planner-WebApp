"use client";

import { useState } from "react";
import { db } from "@/lib/db";
import { id } from "@instantdb/react";

interface AddSubItemFormProps {
  parentId: string;
  category: string;
  subItemCount: number;
}

export function AddSubItemForm({ parentId, category, subItemCount }: AddSubItemFormProps) {
  const [name, setName] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    db.transact(
      db.tx.items[id()].update({
        name: name.trim(),
        category,
        parentId,
        order: subItemCount,
        createdAt: Date.now(),
        ...(dueDate ? { dueDate: new Date(dueDate).getTime() } : {}),
      })
    );

    setName("");
    setDueDate("");
    setShowDatePicker(false);
  };

  return (
    <form onSubmit={handleSubmit} className="mt-2">
      <div className="flex gap-2">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Add sub-item..."
          className="flex-1 px-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-200 focus:border-rose-300 bg-white"
        />
        <button
          type="button"
          onClick={() => setShowDatePicker(!showDatePicker)}
          className={`px-2 py-1.5 text-sm border rounded-lg transition-colors ${
            showDatePicker || dueDate
              ? "border-rose-300 bg-rose-50 text-rose-600"
              : "border-gray-200 text-gray-400 hover:text-gray-600 hover:border-gray-300"
          }`}
          title="Add due date"
        >
          📅
        </button>
        <button
          type="submit"
          className="px-3 py-1.5 text-sm bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors"
        >
          Add
        </button>
      </div>
      {showDatePicker && (
        <div className="mt-2 flex items-center gap-2">
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="px-2 py-1 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-200 focus:border-rose-300 bg-white"
          />
          {dueDate && (
            <button
              type="button"
              onClick={() => setDueDate("")}
              className="text-xs text-gray-400 hover:text-gray-600"
            >
              Clear
            </button>
          )}
        </div>
      )}
    </form>
  );
}
