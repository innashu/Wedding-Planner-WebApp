"use client";

import { db } from "@/lib/db";
import { type AppSchema } from "@/instant.schema";
import { InstaQLEntity } from "@instantdb/react";

type Item = InstaQLEntity<AppSchema, "items">;

interface ItemListProps {
  items: Item[];
  hideEmptyMessage?: boolean;
}

function formatDate(timestamp: number): string {
  const date = new Date(timestamp);
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function deleteItem(item: Item) {
  db.transact(db.tx.items[item.id].delete());
}

export function ItemList({ items, hideEmptyMessage }: ItemListProps) {
  if (items.length === 0) {
    if (hideEmptyMessage) return null;
    return <p className="text-gray-400 text-center py-8">No items yet</p>;
  }

  return (
    <div className="space-y-2">
      {items.map((item) => (
        <div
          key={item.id}
          className="group flex items-start justify-between px-4 py-3 bg-white rounded-lg border border-gray-100 hover:border-gray-200 transition-colors"
        >
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-gray-900 font-medium">{item.name}</span>
            </div>
            {item.notes && (
              <p className="text-sm text-gray-500 mt-1 truncate">{item.notes}</p>
            )}
          </div>
          <div className="flex items-center gap-2 ml-4 shrink-0">
            {item.dueDate && (
              <span className="text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded whitespace-nowrap">
                {formatDate(item.dueDate)}
              </span>
            )}
            <button
              onClick={() => deleteItem(item)}
              className="opacity-0 group-hover:opacity-100 text-gray-300 hover:text-red-500 transition-all text-lg px-1"
              title="Delete item"
            >
              ×
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
