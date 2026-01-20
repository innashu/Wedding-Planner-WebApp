"use client";

import { useState } from "react";
import { db } from "@/lib/db";
import { id } from "@instantdb/react";

interface AddItemFormProps {
  category: string;
  itemCount: number;
  sectionId?: string;
}

export function AddItemForm({ category, itemCount, sectionId }: AddItemFormProps) {
  const [name, setName] = useState("");
  const [notes, setNotes] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [showOptions, setShowOptions] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    db.transact(
      db.tx.items[id()].update({
        name: name.trim(),
        category,
        order: itemCount,
        createdAt: Date.now(),
        ...(notes.trim() ? { notes: notes.trim() } : {}),
        ...(dueDate ? { dueDate: new Date(dueDate).getTime() } : {}),
        ...(sectionId ? { section: sectionId } : {}),
      })
    );

    setName("");
    setNotes("");
    setDueDate("");
    setShowOptions(false);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex gap-2">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Add an item..."
          className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-200 focus:border-rose-300 bg-white"
        />
        <button
          type="button"
          onClick={() => setShowOptions(!showOptions)}
          className={`px-3 py-2 border rounded-lg transition-colors ${
            showOptions || notes || dueDate
              ? "border-rose-300 bg-rose-50 text-rose-600"
              : "border-gray-200 text-gray-400 hover:text-gray-600 hover:border-gray-300"
          }`}
          title="Add details"
        >
          +
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors"
        >
          Add
        </button>
      </div>
      {showOptions && (
        <div className="mt-3 p-4 bg-gray-50 rounded-lg space-y-3">
          <div>
            <label className="block text-xs text-gray-500 mb-1">Notes (price, availability, etc.)</label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g., $2,500 - Available Nov 8"
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-200 focus:border-rose-300 text-sm bg-white"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Due date</label>
            <div className="flex items-center gap-2">
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-200 focus:border-rose-300 text-sm bg-white"
              />
              {dueDate && (
                <button
                  type="button"
                  onClick={() => setDueDate("")}
                  className="text-sm text-gray-400 hover:text-gray-600"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </form>
  );
}
