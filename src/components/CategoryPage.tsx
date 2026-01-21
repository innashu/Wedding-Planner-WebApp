"use client";

import { useState, useMemo } from "react";
import { db } from "@/lib/db";
import { AddItemForm } from "./AddItemForm";
import { ItemList } from "./ItemList";
import { SortFilter, SortOption } from "./SortFilter";
import { TableSection, CreateTableSection } from "./TableSection";

interface CategoryPageProps {
  title: string;
  emoji: string;
  category: string;
}

export function CategoryPage({ title, emoji, category }: CategoryPageProps) {
  const [sortOption, setSortOption] = useState<SortOption>("default");
  const [showAddTable, setShowAddTable] = useState(false);
  const [editingSectionId, setEditingSectionId] = useState<string | null>(null);

  const { isLoading, error, data } = db.useQuery({
    items: {
      $: {
        where: { category },
        order: { order: "asc" },
      },
    },
    sections: {
      $: {
        where: { category },
        order: { order: "asc" },
      },
    },
  });

  const sortItems = (items: NonNullable<typeof data>["items"]) => {
    if (!items) return [];
    const sorted = [...items];

    if (sortOption === "due-asc") {
      return sorted.sort((a, b) => {
        if (!a.dueDate && !b.dueDate) return 0;
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return a.dueDate - b.dueDate;
      });
    }

    if (sortOption === "due-desc") {
      return sorted.sort((a, b) => {
        if (!a.dueDate && !b.dueDate) return 0;
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return b.dueDate - a.dueDate;
      });
    }

    return sorted;
  };

  const { unsectionedItems, itemsBySection } = useMemo(() => {
    if (!data?.items) return { unsectionedItems: [], itemsBySection: {} };

    const unsectioned = data.items.filter((item) => !item.section);
    const bySection: Record<string, typeof data.items> = {};

    data.items.forEach((item) => {
      if (item.section) {
        if (!bySection[item.section]) {
          bySection[item.section] = [];
        }
        bySection[item.section].push(item);
      }
    });

    return {
      unsectionedItems: sortItems(unsectioned),
      itemsBySection: Object.fromEntries(
        Object.entries(bySection).map(([sectionId, items]) => [
          sectionId,
          sortItems(items),
        ])
      ),
    };
  }, [data?.items, sortOption]);

  const handleDeleteSection = (sectionId: string) => {
    const sectionItems = itemsBySection[sectionId] ?? [];
    const itemTxns = sectionItems.map((item) => db.tx.items[item.id].delete());
    const sectionTxn = db.tx.sections[sectionId].delete();
    db.transact([...itemTxns, sectionTxn]);
  };

  if (isLoading) {
    return (
      <div className="animate-pulse">
        <div className="h-8 bg-gray-100 rounded w-48 mb-6"></div>
        <div className="h-12 bg-gray-100 rounded mb-4"></div>
        <div className="space-y-2">
          <div className="h-12 bg-gray-50 rounded"></div>
          <div className="h-12 bg-gray-50 rounded"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500">Error: {error.message}</div>;
  }

  const items = data?.items ?? [];
  const sections = data?.sections ?? [];

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">
        <span className="mr-2">{emoji}</span>
        {title}
      </h1>

      {/* Unsectioned items */}
      <AddItemForm category={category} itemCount={items.length} />

      {items.length > 0 && (
        <SortFilter value={sortOption} onChange={setSortOption} />
      )}

      <ItemList items={unsectionedItems} hideEmptyMessage={sections.length > 0} />

      {/* Table Sections */}
      {sections.map((section) => (
        <div key={section.id} className="mt-10 pt-8 border-t-2 border-gray-200">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <span className="text-rose-400">◆</span>
              {section.name}
            </h2>
            <div className="flex items-center gap-3 text-xs">
              <button
                onClick={() => setEditingSectionId(section.id)}
                className="text-gray-400 hover:text-rose-500 transition-colors"
              >
                ✎ Edit
              </button>
              <button
                onClick={() => handleDeleteSection(section.id)}
                className="text-gray-400 hover:text-red-500 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
          <TableSection
            section={section}
            items={itemsBySection[section.id] ?? []}
            category={category}
            totalItemCount={items.length}
            onDelete={() => handleDeleteSection(section.id)}
            isEditingColumns={editingSectionId === section.id}
            onEditColumnsChange={(editing) => setEditingSectionId(editing ? section.id : null)}
          />
        </div>
      ))}

      {/* Add table button */}
      <div className="mt-8 pt-6 border-t border-gray-100">
        {showAddTable ? (
          <CreateTableSection
            category={category}
            sectionCount={sections.length}
            onCancel={() => setShowAddTable(false)}
          />
        ) : (
          <button
            onClick={() => setShowAddTable(true)}
            className="w-full py-3 border-2 border-dashed border-gray-200 rounded-lg text-gray-400 hover:border-rose-300 hover:text-rose-500 transition-colors"
          >
            + Add a new table
          </button>
        )}
      </div>
    </div>
  );
}
