"use client";

import { useState, useRef, useEffect } from "react";
import {
  getSuggestionCategories,
  type SuggestedItem,
} from "@/lib/suggestedSteps";

interface SuggestionsDropdownProps {
  onSelect: (item: SuggestedItem) => void;
}

export function SuggestionsDropdown({ onSelect }: SuggestionsDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set()
  );
  const dropdownRef = useRef<HTMLDivElement>(null);
  const categories = getSuggestionCategories();

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
        setExpandedCategories(new Set());
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const toggleCategory = (categoryName: string) => {
    setExpandedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(categoryName)) {
        next.delete(categoryName);
      } else {
        next.add(categoryName);
      }
      return next;
    });
  };

  const handleItemClick = (item: SuggestedItem) => {
    setIsOpen(false);
    setExpandedCategories(new Set());
    onSelect(item);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`px-3 py-2 border rounded-lg transition-colors flex items-center gap-1.5 ${
          isOpen
            ? "border-rose-300 bg-rose-50 text-rose-600"
            : "border-rose-200 bg-rose-50 text-rose-600 hover:bg-rose-100"
        }`}
        title="Browse suggested items"
      >
        <span className="text-base">💡</span>
        <span className="text-sm font-medium hidden sm:inline">Ideas</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-72 bg-white shadow-lg rounded-lg border border-gray-200 max-h-80 overflow-y-auto z-50">
          {categories.map((category) => (
            <div key={category.name}>
              <button
                type="button"
                onClick={() => toggleCategory(category.name)}
                className="w-full flex items-center justify-between px-3 py-2.5 bg-rose-50 hover:bg-rose-100 transition-colors text-left border-b border-rose-100"
              >
                <span className="font-bold text-rose-700 text-sm">
                  {category.name}
                </span>
                <span className="text-rose-400 text-xs">
                  {expandedCategories.has(category.name) ? "▼" : "▶"}
                </span>
              </button>

              {expandedCategories.has(category.name) && (
                <div className="py-1">
                  {category.items.map((item) => (
                    <button
                      key={item.key}
                      type="button"
                      onClick={() => handleItemClick(item)}
                      className="w-full text-left px-5 py-2 text-gray-600 hover:bg-rose-50 hover:text-rose-700 transition-colors text-sm"
                    >
                      {item.displayName}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
