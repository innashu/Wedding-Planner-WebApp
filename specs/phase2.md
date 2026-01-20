# Phase 2 Spec: Adding Items to Categories

## Goal
Implement adding items to any category. Each category page should have a simple way to add items with a name. Items display as a clean list.

## Schema Changes

### Update `instant.schema.ts`
Add a new `items` entity:

```typescript
items: i.entity({
  name: i.string(),
  category: i.string().indexed(),  // "venue", "guests", "ceremony", "todos", "personal"
  order: i.number().indexed(),      // for maintaining order
  createdAt: i.number().indexed(),
  dueDate: i.number().indexed().optional(),  // optional due date as timestamp
}),
```

## Implementation

### 1. Update Schema (`src/instant.schema.ts`)
- Add `items` entity with name, category, order, and createdAt fields
- Push schema to InstantDB

### 2. Create Shared Item Components

**`src/components/ItemList.tsx`**
- Displays list of items for a category
- Shows "No items yet" when empty
- Each item has a delete button (subtle, appears on hover)
- Shows due date next to item name if set (formatted nicely, e.g., "Nov 8")
- Clean, minimal styling matching the wedding theme

**`src/components/AddItemForm.tsx`**
- Simple input field to add new items
- Optional date picker for due date
- On submit, creates item in InstantDB with category
- Clear input after adding

**`src/components/SortFilter.tsx`**
- Dropdown to sort items by due date
- Options: "Default", "Due date (earliest first)", "Due date (latest first)"
- Appears at top of item list

### 3. Update Category Pages
Update each category page to:
- Query items for that category from InstantDB
- Display items using `ItemList` component
- Include `AddItemForm` at the top or bottom

Pages to update:
- `src/app/venue/page.tsx`
- `src/app/guests/page.tsx`
- `src/app/ceremony/page.tsx`
- `src/app/todos/page.tsx`
- `src/app/personal/page.tsx`

## UI Design
- Input placeholder: "Add an item..."
- Optional date picker next to input (small calendar icon)
- Items display as simple text in a clean list
- Due date shown as subtle badge (e.g., "Nov 8" in gray text)
- Delete button: small "×" that appears on hover (subtle gray, turns red on hover)
- Sort dropdown: simple select in top-right of item list
- Subtle hover states
- Match existing soft color palette

## Data Flow
1. User types item name and presses Enter
2. Create item in InstantDB with:
   - `name`: user input
   - `category`: current page category
   - `order`: next order number
   - `createdAt`: timestamp
   - `dueDate`: optional timestamp if date selected
3. InstantDB syncs automatically
4. Item appears in list via `useQuery`

## Files to Create/Modify
- `src/instant.schema.ts` - add items entity
- `src/components/ItemList.tsx` - new
- `src/components/AddItemForm.tsx` - new
- `src/components/SortFilter.tsx` - new
- `src/app/venue/page.tsx` - update
- `src/app/guests/page.tsx` - update
- `src/app/ceremony/page.tsx` - update
- `src/app/todos/page.tsx` - update
- `src/app/personal/page.tsx` - update

## Verification
1. Run `npm run dev`
2. Navigate to any category page
3. Add an item - should appear in list
4. Add an item with a due date - should show date badge
5. Hover over item - delete button should appear
6. Delete item - should disappear immediately
7. Use sort dropdown - items should reorder by due date
8. Refresh page - items should persist (deleted items gone)
9. Add items in different categories - should stay separate
