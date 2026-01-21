"use client";

import { useState } from "react";
import { db } from "@/lib/db";
import { type AppSchema } from "@/instant.schema";
import { InstaQLEntity } from "@instantdb/react";
import { AddSubItemForm } from "./AddSubItemForm";

type Item = InstaQLEntity<AppSchema, "items">;

interface ExpandableItemProps {
  item: Item;
  subItems: Item[];
}

function formatDate(timestamp: number): string {
  const date = new Date(timestamp);
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function formatDateForInput(timestamp: number): string {
  const date = new Date(timestamp);
  return date.toISOString().split("T")[0];
}

function deleteItemWithSubItems(item: Item, subItems: Item[]) {
  const transactions = [
    db.tx.items[item.id].delete(),
    ...subItems.map((subItem) => db.tx.items[subItem.id].delete()),
  ];
  db.transact(transactions);
}

function deleteSubItem(item: Item) {
  db.transact(db.tx.items[item.id].delete());
}

function toggleComplete(itemId: string, completed: boolean) {
  db.transact(db.tx.items[itemId].update({ completed }));
}

interface CheckboxProps {
  checked: boolean;
  onChange: () => void;
}

function Checkbox({ checked, onChange }: CheckboxProps) {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onChange();
      }}
      className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors shrink-0 ${
        checked
          ? "bg-rose-400 border-rose-400"
          : "bg-white border-gray-300 hover:border-rose-300"
      }`}
      aria-label={checked ? "Mark as incomplete" : "Mark as complete"}
    >
      {checked && (
        <svg
          className="w-3 h-3 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={3}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 13l4 4L19 7"
          />
        </svg>
      )}
    </button>
  );
}

function swapOrder(itemA: Item, itemB: Item) {
  db.transact([
    db.tx.items[itemA.id].update({ order: itemB.order }),
    db.tx.items[itemB.id].update({ order: itemA.order }),
  ]);
}

interface EditPopoverProps {
  item: Item;
  onClose: () => void;
}

function EditPopover({ item, onClose }: EditPopoverProps) {
  const [notes, setNotes] = useState(item.notes || "");
  const [dueDate, setDueDate] = useState(
    item.dueDate ? formatDateForInput(item.dueDate) : ""
  );

  const handleSave = () => {
    db.transact(
      db.tx.items[item.id].update({
        notes: notes.trim() || null,
        dueDate: dueDate ? new Date(dueDate).getTime() : null,
      })
    );
    onClose();
  };

  return (
    <div
      className="absolute right-0 top-full mt-1 z-50 bg-white rounded-lg shadow-lg border border-gray-200 p-3 w-64"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="space-y-3">
        <div>
          <label className="block text-xs text-gray-500 mb-1">Notes</label>
          <input
            type="text"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add notes..."
            className="w-full px-2 py-1.5 border border-gray-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-rose-200 focus:border-rose-300"
            autoFocus
          />
        </div>
        <div>
          <label className="block text-xs text-gray-500 mb-1">Due date</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full px-2 py-1.5 border border-gray-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-rose-200 focus:border-rose-300"
          />
        </div>
        <div className="flex gap-2 pt-1">
          <button
            onClick={handleSave}
            className="flex-1 px-3 py-1.5 bg-rose-500 text-white rounded text-sm hover:bg-rose-600 transition-colors"
          >
            Save
          </button>
          <button
            onClick={onClose}
            className="flex-1 px-3 py-1.5 bg-gray-100 text-gray-600 rounded text-sm hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export function ExpandableItem({ item, subItems }: ExpandableItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const sortedSubItems = [...subItems].sort((a, b) => a.order - b.order);

  const completedCount = subItems.filter((s) => s.completed).length;
  const hasSubItems = subItems.length > 0;

  const moveUp = (index: number) => {
    if (index <= 0) return;
    swapOrder(sortedSubItems[index], sortedSubItems[index - 1]);
  };

  const moveDown = (index: number) => {
    if (index >= sortedSubItems.length - 1) return;
    swapOrder(sortedSubItems[index], sortedSubItems[index + 1]);
  };

  const handleNameClick = (e: React.MouseEvent, itemId: string) => {
    e.stopPropagation();
    setEditingItemId(itemId);
  };

  return (
    <div className="space-y-1">
      <div
        className="group flex items-start justify-between px-4 py-3 bg-rose-50/50 rounded-lg transition-colors cursor-pointer relative"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-start gap-2 flex-1 min-w-0">
          <Checkbox
            checked={!!item.completed}
            onChange={() => toggleComplete(item.id, !item.completed)}
          />
          <button
            className={`${item.completed ? "text-gray-300" : "text-rose-400"} hover:text-rose-600 transition-all mt-0.5 shrink-0 ${isExpanded ? "rotate-90" : ""}`}
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded(!isExpanded);
            }}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span
                className={`text-lg font-semibold ${
                  item.completed ? "line-through text-gray-400" : "text-gray-900"
                }`}
              >
                {item.name}
              </span>
              <button
                onClick={(e) => handleNameClick(e, item.id)}
                className="opacity-100 text-rose-400 hover:text-rose-600 sm:opacity-0 sm:group-hover:opacity-100 transition-all"
                title="Edit date & notes"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </button>
            </div>
            {item.notes && (
              <p className={`text-base mt-1 truncate ${item.completed ? "text-gray-300" : "text-pink-500"}`}>
                {item.notes}
              </p>
            )}
            {!isExpanded && hasSubItems && (
              <div className="flex items-center gap-1.5 mt-1">
                <span className="text-xs text-rose-400 bg-rose-100 px-1.5 py-0.5 rounded-full">
                  {completedCount}/{subItems.length}
                </span>
                <span className="text-xs text-gray-400">steps</span>
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2 ml-4 shrink-0">
          {item.dueDate && (
            <span className="text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded whitespace-nowrap">
              {formatDate(item.dueDate)}
            </span>
          )}
          <button
            onClick={(e) => {
              e.stopPropagation();
              deleteItemWithSubItems(item, subItems);
            }}
            className="opacity-100 text-gray-500 hover:text-red-500 sm:opacity-0 sm:group-hover:opacity-100 transition-all text-lg px-1"
            title="Delete item"
          >
            ×
          </button>
        </div>
        {editingItemId === item.id && (
          <EditPopover item={item} onClose={() => setEditingItemId(null)} />
        )}
      </div>

      {isExpanded && (
        <div className="ml-6 space-y-1">
          {sortedSubItems.map((subItem, index) => (
            <div
              key={subItem.id}
              className="group flex items-start justify-between px-4 py-2 bg-gray-50 rounded-lg border border-gray-100 hover:border-gray-200 transition-colors relative"
            >
              <div className="flex items-center gap-2">
                <Checkbox
                  checked={!!subItem.completed}
                  onChange={() => toggleComplete(subItem.id, !subItem.completed)}
                />
                <div className="flex flex-col gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => moveUp(index)}
                    disabled={index === 0}
                    className={`text-xs leading-none px-0.5 transition-colors ${
                      index === 0
                        ? "text-gray-200 cursor-not-allowed"
                        : "text-gray-400 hover:text-gray-600"
                    }`}
                    title="Move up"
                  >
                    ↑
                  </button>
                  <button
                    onClick={() => moveDown(index)}
                    disabled={index === sortedSubItems.length - 1}
                    className={`text-xs leading-none px-0.5 transition-colors ${
                      index === sortedSubItems.length - 1
                        ? "text-gray-200 cursor-not-allowed"
                        : "text-gray-400 hover:text-gray-600"
                    }`}
                    title="Move down"
                  >
                    ↓
                  </button>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-sm ${
                        subItem.completed ? "line-through text-gray-400" : "text-gray-700"
                      }`}
                    >
                      {subItem.name}
                    </span>
                    <button
                      onClick={() => setEditingItemId(subItem.id)}
                      className="opacity-100 text-rose-400 hover:text-rose-600 sm:opacity-0 sm:group-hover:opacity-100 transition-all"
                      title="Edit date & notes"
                    >
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                    </button>
                  </div>
                  {subItem.notes && (
                    <p className={`text-sm mt-0.5 truncate ${
                      subItem.completed ? "text-gray-300" : "text-pink-500"
                    }`}>
                      {subItem.notes}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2 ml-4 shrink-0">
                {subItem.dueDate && (
                  <span className="text-xs text-gray-400 bg-white px-2 py-0.5 rounded whitespace-nowrap">
                    {formatDate(subItem.dueDate)}
                  </span>
                )}
                <button
                  onClick={() => deleteSubItem(subItem)}
                  className="opacity-100 text-gray-500 hover:text-red-500 sm:opacity-0 sm:group-hover:opacity-100 transition-all text-lg px-1"
                  title="Delete sub-item"
                >
                  ×
                </button>
              </div>
              {editingItemId === subItem.id && (
                <EditPopover
                  item={subItem}
                  onClose={() => setEditingItemId(null)}
                />
              )}
            </div>
          ))}

          <AddSubItemForm
            parentId={item.id}
            category={item.category}
            subItemCount={subItems.length}
          />
        </div>
      )}
    </div>
  );
}
