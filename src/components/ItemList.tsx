"use client";

import { type AppSchema } from "@/instant.schema";
import { InstaQLEntity } from "@instantdb/react";
import { ExpandableItem } from "./ExpandableItem";

type Item = InstaQLEntity<AppSchema, "items">;

interface ItemListProps {
  items: Item[];
  hideEmptyMessage?: boolean;
}

export function ItemList({ items, hideEmptyMessage }: ItemListProps) {
  // Separate top-level items from sub-items
  const topLevelItems = items.filter((item) => !item.parentId);
  const subItemsByParent = items.reduce<Record<string, Item[]>>((acc, item) => {
    if (item.parentId) {
      if (!acc[item.parentId]) acc[item.parentId] = [];
      acc[item.parentId].push(item);
    }
    return acc;
  }, {});

  // Sort top-level items by order
  const sortedTopLevelItems = [...topLevelItems].sort((a, b) => a.order - b.order);

  if (sortedTopLevelItems.length === 0) {
    if (hideEmptyMessage) return null;
    return <p className="text-gray-400 text-center py-8">No items yet</p>;
  }

  return (
    <div className="space-y-2">
      {sortedTopLevelItems.map((item) => (
        <ExpandableItem
          key={item.id}
          item={item}
          subItems={subItemsByParent[item.id] || []}
        />
      ))}
    </div>
  );
}
