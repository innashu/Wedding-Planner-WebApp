# Phase 5 Spec: Checking Off Items and Sub-Items

## Goal
Implement checking off items and sub-items. Users should be able to mark things as done. Completed items should be visually distinct but still visible.

## Overview

Users need a way to track progress through their wedding planning tasks. This phase adds checkboxes to both items and sub-items, allowing users to mark tasks as complete. Completed items remain visible but are styled differently to show they're done, giving users a sense of accomplishment while keeping the full picture visible.

## Schema Changes

Add a `completed` field to the `items` entity:

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
  parentId: i.string().indexed().optional(),
  completed: i.boolean().indexed().optional(),  // NEW
}),
```

## Implementation

### 1. Update Schema

**`src/instant.schema.ts`**
- Add `completed: i.boolean().indexed().optional()` to the `items` entity
- Push schema changes with `npx instant-cli push schema`

### 2. Update ExpandableItem Component

**`src/components/ExpandableItem.tsx`**

Add checkbox functionality to both parent items and sub-items:

#### Parent Items
- Add checkbox before the expand arrow
- Checkbox uses custom styling to match rose/gray palette
- Clicking checkbox toggles `completed` field
- When completed:
  - Item name gets strikethrough text
  - Text becomes lighter gray
  - Checkbox shows checkmark
  - Notes text also becomes lighter

#### Sub-Items
- Add checkbox at the start of each sub-item row
- Same styling and behavior as parent items
- Completion is independent (completing a parent doesn't complete children)

#### Progress Indicator
- When parent item has sub-items, show completion progress
- Format: "2/5 done" or similar
- Shows next to the sub-item count when collapsed

### 3. Visual Design

#### Checkbox Styling
```
Unchecked:
  - Border: border-gray-300
  - Background: bg-white
  - Size: w-5 h-5 (20px)
  - Rounded: rounded

Checked:
  - Border: border-rose-400
  - Background: bg-rose-400
  - Checkmark: white (stroke-white stroke-2)
```

#### Completed Item Styling
```
Parent item (completed):
  - Name: line-through text-gray-400
  - Diamond icon: text-gray-300 (instead of rose-400)
  - Notes: text-gray-300
  - Due date badge: unchanged

Sub-item (completed):
  - Name: line-through text-gray-400
  - Notes: text-gray-300
  - Due date badge: unchanged
```

### 4. Sorting/Ordering Considerations

- Completed items stay in their original position (not moved to bottom)
- This keeps the logical order of tasks intact
- Users can still reorder sub-items regardless of completion status

## UI Design

### Parent Item with Checkbox (Unchecked)
```
[ ] ▼ ◆ Wedding Dress                           Nov 15    ×
       Get alterations done
       2/7 done
```

### Parent Item with Checkbox (Checked)
```
[✓] ▼ ◆ ̶W̶e̶d̶d̶i̶n̶g̶ ̶D̶r̶e̶s̶s̶                           Nov 15    ×
       ̶G̶e̶t̶ ̶a̶l̶t̶e̶r̶a̶t̶i̶o̶n̶s̶ ̶d̶o̶n̶e̶
       7/7 done
```

### Sub-Items Expanded (Mixed State)
```
[ ] ▼ ◆ Wedding Dress                           Nov 15    ×
       Get alterations done
       2/7 done

    [✓] ↑ ↓  R̶e̶s̶e̶a̶r̶c̶h̶ ̶b̶r̶i̶d̶a̶l̶ ̶s̶h̶o̶p̶s̶                    ×
    [✓] ↑ ↓  B̶o̶o̶k̶ ̶a̶p̶p̶o̶i̶n̶t̶m̶e̶n̶t̶s̶                        ×
    [ ] ↑ ↓  Try on dresses                              ×
    [ ] ↑ ↓  Choose dress                                ×
    [ ] ↑ ↓  Order veil                                  ×
    ┌─────────────────────────────────────┐
    │ Add sub-item...                     │
    └─────────────────────────────────────┘
```

### Checkbox Component Structure
```tsx
<button
  onClick={(e) => {
    e.stopPropagation();
    toggleComplete(item.id, !item.completed);
  }}
  className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
    item.completed
      ? "bg-rose-400 border-rose-400"
      : "bg-white border-gray-300 hover:border-rose-300"
  }`}
>
  {item.completed && (
    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  )}
</button>
```

## Data Flow

### Toggling Completion
1. User clicks checkbox on an item or sub-item
2. Call `db.transact(db.tx.items[itemId].update({ completed: !currentValue }))`
3. UI updates via `useQuery` subscription
4. Styling updates based on `completed` field

### Progress Calculation
- Count sub-items where `completed === true`
- Display as "X/Y done" where X = completed, Y = total

## Files to Create/Modify

- `src/instant.schema.ts` - modify: add `completed` field to `items` entity
- `src/components/ExpandableItem.tsx` - modify: add checkboxes, completion styling, progress indicator

## Verification

1. Push schema changes: `npx instant-cli push schema --app <APP_ID> --token <ADMIN_TOKEN> --yes`
2. Run `npm run dev`
3. Navigate to any category with items

### Test Cases
1. **Check parent item:** Click checkbox - item should show strikethrough and lighter styling
2. **Uncheck parent item:** Click again - styling should return to normal
3. **Check sub-item:** Click checkbox on sub-item - only that sub-item gets strikethrough
4. **Progress indicator:** With 7 sub-items, check 2 - should show "2/7 done"
5. **All complete:** Check all sub-items - should show "7/7 done"
6. **Independence:** Checking parent doesn't check children (and vice versa)
7. **Persistence:** Refresh page - completion state should persist
8. **Collapsed view:** Collapse item - progress indicator should be visible
9. **Edit popover:** Clicking item name to edit should still work (not intercepted by checkbox)
10. **Delete:** Deleting a completed item should work normally
11. **Reordering:** Up/down arrows should work on both completed and uncompleted sub-items

## Edge Cases

- **New items:** Default to `completed: false` (or undefined, treated as false)
- **Items without sub-items:** No progress indicator shown
- **All sub-items complete:** Parent can still be incomplete (different semantics - parent might track "overall done" vs individual steps)
- **Table section items:** Checkboxes should also work for items in table sections (if applicable)
- **Checkbox click area:** Ensure checkbox has adequate click/tap target size
- **Keyboard accessibility:** Checkbox should be focusable and toggleable with Enter/Space
