# Phase 6: To-Do List View with Standalone Categories

## Overview

The To-Do List page should have a different structure than other category pages. Instead of being a flat list of items, it should allow users to create **standalone task categories** (like "Pre-Wedding Tasks", "Day-Of Tasks", "Post-Wedding Tasks") and add tasks within each category.

This gives users flexibility to organize miscellaneous wedding tasks that don't fit neatly into the other categories (Venue & Vendors, Guests, Ceremony, Personal).

## Current State

Currently, the To-Do List page uses the same `CategoryPage` component as other pages:
- Items are added directly to the page
- Items can have sub-items
- Items can be grouped into table sections

## Target State

The To-Do List page will have a custom layout:
- Users can create **task categories** (standalone groupings)
- Each task category contains a simple checklist of tasks
- Tasks within a category can be checked off
- Categories can be collapsed/expanded
- Empty state prompts user to create their first category

## Data Model

We'll reuse the existing `sections` and `items` entities:

**Task Categories** = `sections` with `category: "todos"`
- `name`: Category name (e.g., "Pre-Wedding Tasks")
- `category`: "todos"
- `order`: Display order
- No columns needed (simple checklist, not a table)

**Tasks** = `items` with `category: "todos"` and a `section` reference
- `name`: Task name
- `category`: "todos"
- `section`: Reference to the task category's ID
- `completed`: Boolean for checkbox state
- `order`: Display order within the category

## UI/UX Design

### Layout

```
📝 To-Do List
─────────────────────────────────────────

[+ Add category]

┌─────────────────────────────────────────┐
│ ▼ Pre-Wedding Tasks              [Edit] │
│─────────────────────────────────────────│
│ ☑ Book hair trial                       │
│ ☐ Get marriage license                  │
│ ☐ Write personal vows                   │
│ [+ Add task]                            │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ ▶ Day-Of Tasks (collapsed)    2/5 done  │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ ▼ Post-Wedding Tasks             [Edit] │
│─────────────────────────────────────────│
│ ☐ Send thank you cards                  │
│ ☐ Change name on documents              │
│ [+ Add task]                            │
└─────────────────────────────────────────┘
```

### Interactions

1. **Add Category**: Button at top creates a new category with inline name input
2. **Add Task**: Each category has an "Add task" button at the bottom
3. **Toggle Complete**: Clicking checkbox marks task as done
4. **Collapse/Expand**: Clicking category header or chevron toggles visibility
5. **Edit Category**: Allows renaming or deleting the category
6. **Delete Task**: Hover reveals delete button on each task
7. **Reorder Tasks**: Up/down arrows to reorder tasks within a category (optional, show on hover)

### Empty State

When no categories exist:
```
📝 To-Do List
─────────────────────────────────────────

No task categories yet.
Create categories to organize your wedding to-dos.

[+ Create your first category]
```

## Components to Create

### `TodoListPage.tsx`
New page component (replaces `CategoryPage` usage in `/todos`)
- Queries all sections and items where `category: "todos"`
- Groups items by section
- Renders list of `TaskCategory` components
- Shows empty state if no categories
- Has "Add category" button at top

### `TaskCategory.tsx`
Collapsible category component
- Shows category name with collapse/expand toggle
- Shows progress count when collapsed (e.g., "2/5 done")
- Contains list of tasks when expanded
- Edit button for rename/delete
- "Add task" input at bottom

### `TaskItem.tsx`
Simple task row component
- Checkbox for completion
- Task name (strikethrough when completed)
- Delete button (shown on hover)
- Optional: reorder arrows on hover

## File Changes

1. **New**: `src/components/TodoListPage.tsx` - Main To-Do List page
2. **New**: `src/components/TaskCategory.tsx` - Collapsible task category
3. **New**: `src/components/TaskItem.tsx` - Individual task row
4. **Modify**: `src/app/todos/page.tsx` - Use `TodoListPage` instead of `CategoryPage`
5. **Modify**: `src/components/Navigation.tsx` - Move To-Do List to last position (after Personal)

## Implementation Steps

1. Update `src/components/Navigation.tsx`
   - Move To-Do List to last position in the nav bar (after Personal)
   - New order: Venue & Vendors, Guests, Ceremony, Personal, To-Do List

2. Create `TaskItem.tsx` component
   - Checkbox with completion toggle
   - Task name display
   - Delete functionality

3. Create `TaskCategory.tsx` component
   - Collapsible header with category name
   - Progress indicator when collapsed
   - List of TaskItems
   - Add task input
   - Edit/delete category functionality

4. Create `TodoListPage.tsx` component
   - Query sections and items for "todos" category
   - Group items by section
   - Render TaskCategory components
   - Add category functionality
   - Empty state

5. Update `src/app/todos/page.tsx`
   - Import and use `TodoListPage` instead of `CategoryPage`

## Questions for Clarification

None - the spec is self-contained and follows existing patterns in the codebase.
