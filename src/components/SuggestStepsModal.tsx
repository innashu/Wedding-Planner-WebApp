"use client";

import { useEffect, useRef, useState } from "react";
import { db } from "@/lib/db";
import { id } from "@instantdb/react";

interface SuggestStepsModalProps {
  isOpen: boolean;
  itemId: string;
  itemName: string;
  category: string;
  steps: string[];
  onClose: () => void;
  onConfirm: () => void;
}

// Remove timing guidance from step name (e.g., "Book venue (3-6 months before)" -> "Book venue")
function stripTiming(step: string): string {
  return step.replace(/\s*\([^)]*(?:month|week|day|before|after|out|ongoing|info|reference|of|practical)[^)]*\)\s*$/i, "").trim();
}

export function SuggestStepsModal({
  isOpen,
  itemId,
  itemName,
  category,
  steps,
  onClose,
  onConfirm,
}: SuggestStepsModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const [includeTiming, setIncludeTiming] = useState(true);

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleConfirm = () => {
    // Create all sub-items, optionally stripping timing
    const transactions = steps.map((step, index) =>
      db.tx.items[id()].update({
        name: includeTiming ? step : stripTiming(step),
        category,
        parentId: itemId,
        order: index,
        createdAt: Date.now(),
      })
    );

    db.transact(transactions);
    onConfirm();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div
        ref={modalRef}
        className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 animate-in fade-in zoom-in-95 duration-200"
      >
        <h2 className="text-lg font-semibold text-gray-900 mb-1">
          Add suggested steps for
        </h2>
        <p className="text-rose-600 font-medium mb-4">"{itemName}"?</p>

        <div className="bg-gray-50 rounded-lg p-4 max-h-64 overflow-y-auto mb-4">
          <ul className="space-y-2">
            {steps.map((step, index) => (
              <li key={index} className="flex items-start gap-2 text-gray-600">
                <span className="text-gray-400 mt-0.5">•</span>
                <span>{step}</span>
              </li>
            ))}
          </ul>
        </div>

        <label className="flex items-center gap-2 mb-6 cursor-pointer">
          <input
            type="checkbox"
            checked={includeTiming}
            onChange={(e) => setIncludeTiming(e.target.checked)}
            className="w-4 h-4 text-rose-500 border-gray-300 rounded focus:ring-rose-500"
          />
          <span className="text-sm text-gray-600">Include timing guidance (e.g., "3-4 months out")</span>
        </label>

        <div className="flex gap-3">
          <button
            onClick={handleConfirm}
            className="flex-1 px-4 py-2.5 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors font-medium"
          >
            Yes, add {includeTiming ? "steps" : "ideas"}
          </button>
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2.5 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors font-medium"
          >
            No thanks
          </button>
        </div>
      </div>
    </div>
  );
}
