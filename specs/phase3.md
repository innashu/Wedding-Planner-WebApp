# Phase 3 Spec: Expanding Items into Sub-Items

## Goal
Implement expanding items into sub-items. Clicking an item should let me add sub-items underneath it. Keep the UI minimal - just indented text.

## Schema Changes

### Update `instant.schema.ts`
Add a `parentId` field to the existing `items` entity to support hierarchy:

```typescript
items: i.entity({
  name: i.string(),
  category: i.string().indexed(),
  section: i.string().indexed().optional(),
  order: i.number().indexed(),
  createdAt: i.number().indexed(),
  dueDate: i.number().indexed().optional(),
  notes: i.string().optional(),
  columnValues: i.string().optional(),
  parentId: i.string().indexed().optional(),  // NEW: reference to parent item ID
}),
```

**Note:** Using a string field for `parentId` rather than a link because:
- Simpler querying (filter by `parentId` directly)
- Easier to check if item is a sub-item (`parentId` is set or not)
- No need to manage link entities

## Implementation

### 1. Update Schema (`src/instant.schema.ts`)
- Add `parentId` field to items entity (string, indexed, optional)
- Push schema to InstantDB

### 2. Create Expandable Item Component

**`src/components/ExpandableItem.tsx`**
- Displays a single item with expand/collapse capability
- Shows chevron icon (▶/▼) when item has sub-items or is expandable
- Clicking the item row toggles expand/collapse state
- When expanded:
  - Shows all sub-items indented below
  - Shows inline form to add new sub-item
- When collapsed:
  - Hides sub-items
  - Shows count of sub-items as subtle indicator (e.g., "3 sub-items")

### 3. Update ItemList Component

**`src/components/ItemList.tsx`**
- Filter to show only top-level items (where `parentId` is null/undefined)
- Replace flat item rendering with `ExpandableItem` component
- Pass sub-items to each parent item

### 4. Create Sub-Item Add Form

**`src/components/AddSubItemForm.tsx`**
- Minimal inline input that appears when parent is expanded
- Smaller/more subtle than main AddItemForm
- Placeholder: "Add sub-item..."
- On submit, creates item with `parentId` set to parent's ID
- Auto-inherits category from parent

### 5. Update Deletion Logic
- When deleting a parent item, also delete all its sub-items
- Use batch transaction for atomic deletion

## UI Design

### Collapsed State
```
▶ Wedding Dress                              Nov 15    ×
  └─ 3 sub-items
```

### Expanded State
```
▼ Wedding Dress                              Nov 15    ×
    Research bridal shops                              ×
    Book appointments                        Nov 1     ×
    Try on dresses                                     ×
  ┌─────────────────────────────────────┐
  │ Add sub-item...                     │
  └─────────────────────────────────────┘
```

### Styling Details
- **Chevron:** Small arrow icon (▶ collapsed, ▼ expanded), subtle gray, clickable area
- **Sub-item count:** Tiny text below item when collapsed (muted gray, italic)
- **Indentation:** 24px left margin for sub-items
- **Sub-item row:** Same styling as parent but slightly smaller text
- **Add sub-item form:** Indented inline input, appears at bottom of sub-items list
- **Smooth transition:** Optional fade/slide when expanding/collapsing

### Colors
- Match existing rose/gray palette
- Chevron: `text-gray-400` normal, `text-gray-600` on hover
- Sub-item count: `text-gray-400 text-sm italic`
- Sub-items: Same as parent items (maintain consistency)

## Data Flow

### Adding a Sub-Item
1. User clicks parent item to expand
2. User types in "Add sub-item..." input
3. Create item in InstantDB with:
   - `name`: user input
   - `category`: inherited from parent
   - `parentId`: parent item's ID
   - `order`: next order number within parent's sub-items
   - `createdAt`: timestamp
4. Sub-item appears in list via `useQuery`

### Deleting a Parent Item
1. User clicks delete on parent item
2. Query all items where `parentId` equals this item's ID
3. Batch transaction: delete parent + all sub-items
4. All items removed from UI

### Querying Items
```typescript
// In CategoryPage, fetch all items for category
const { data } = db.useQuery({
  items: {
    $: { where: { category } }
  }
});

// In component, separate into parents and children
const items = data?.items || [];
const topLevelItems = items.filter(item => !item.parentId);
const subItemsByParent = items.reduce((acc, item) => {
  if (item.parentId) {
    if (!acc[item.parentId]) acc[item.parentId] = [];
    acc[item.parentId].push(item);
  }
  return acc;
}, {});
```

## Files to Create/Modify
- `src/instant.schema.ts` - add parentId field
- `src/components/ExpandableItem.tsx` - new
- `src/components/AddSubItemForm.tsx` - new
- `src/components/ItemList.tsx` - update to use ExpandableItem

## Verification
1. Run `npm run dev`
2. Navigate to any category page
3. Add a new item - should appear as expandable (chevron visible)
4. Click item to expand - should show "Add sub-item..." input
5. Add a sub-item - should appear indented below parent
6. Add multiple sub-items - all should appear in order
7. Collapse parent - sub-items should hide, show count indicator
8. Expand again - sub-items should reappear
9. Delete a sub-item - only that sub-item should disappear
10. Delete a parent item - parent and all sub-items should disappear
11. Refresh page - hierarchy should persist
12. Sub-items should not appear in the main list (only under parents)

## Edge Cases
- Item with no sub-items: Show chevron but no count indicator
- Deeply nested items: Not supported in Phase 3 (sub-items cannot have sub-items)
- Items in table sections: Sub-items only apply to regular list items, not table rows
- Moving sub-items: Not in scope for Phase 3 (future enhancement)
