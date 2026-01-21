# Phase 4 Spec: Suggested Steps for Complex Items

## Goal
Add suggested steps for complex items. When I add items like "Wedding Dress" or "Ketubah", prompt "Add suggested steps?" If yes, populate with actionable steps in logical order (e.g., Research shops → Book appointments → Try on → Choose → Order veil → Alterations → Final fitting). Steps are reorderable.

**New: Browsable Suggestions Dropdown** - Users can also browse and select from a categorized dropdown menu of all suggested items, making it easy to discover what needs to be planned without having to know what to type.

## Overview

When users add certain "complex" items that have well-known planning workflows, we'll offer to pre-populate actionable sub-items. This saves time and ensures important steps aren't forgotten.

There are two ways to add items with suggestions:
1. **Type and match** - User types an item name, and if it matches a known keyword, we offer suggestions
2. **Browse and select** - User clicks a dropdown button to browse all available suggested items by category

## Suggested Steps Data

> **See `src/lib/suggestedSteps.ts` for the complete data.**

The data file contains comprehensive wedding planning items organized into 12 categories:

1. **Getting Started** - Wedding website, wedding party, budget, style/theme, guest list, save the dates
2. **Venue & Vendors** - Venue, wedding planner, catering, photographer, videographer, florist, cake, music/band/DJ, ceremony musicians, rentals, lighting
3. **Attire & Beauty** - Wedding dress, suit/tux, bridesmaids dresses, groomsmen attire, wedding accessories, hair, makeup, rings
4. **Jewish Ceremony** - Rabbi/officiant, ketubah, chuppah, kippot, breaking the glass, hora, benchers, ceremony items, aufruf, sheva brachot meals, vows, ceremony music
5. **Guests & Invitations** - Invitations, RSVP tracking, seating chart, hotel blocks, welcome bags, guest favors, guestbook, thank you cards
6. **Transportation & Logistics** - Wedding day transportation, guest transportation, day-of timeline, vendor confirmations, emergency kit
7. **Stationery & Paper** - Ceremony programs, menus, place cards & table numbers, signage
8. **Songs & Dances** - First dance, dance lessons, father-daughter dance, mother-son dance, reception playlist
9. **Events & Parties** - Rehearsal dinner, bachelor party, bachelorette party, bridal shower, welcome party, after party, honeymoon
10. **Gifts & Registry** - Registry, wedding party gifts, parent gifts, vendor tips
11. **Legal & Admin** - Marriage license (California), name change (California), wedding insurance
12. **Speeches & Toasts**

### Data Structure

```typescript
interface SuggestedItem {
  key: string;           // keyword for matching (e.g., "dress")
  displayName: string;   // shown in dropdown (e.g., "Wedding Dress")
  steps: string[];       // suggested sub-items
}

interface SuggestionCategory {
  name: string;          // category name for dropdown header
  items: SuggestedItem[];
}
```

### Matching Behavior

- Case-insensitive partial matching (e.g., "dress" matches "Wedding Dress", "My dress", etc.)
- Display names are used in the dropdown (e.g., "Wedding Dress" instead of "dress")

## Implementation

### 1. Create Suggested Steps Module

**`src/lib/suggestedSteps.ts`**
- Export the categorized suggestions structure for dropdown
- Export the dictionary of suggested steps for matching
- Export functions:
  ```typescript
  // Get all categories with items for dropdown
  function getSuggestionCategories(): SuggestionCategory[]

  // Find matching suggestions by keyword (for typed input)
  function getSuggestedSteps(itemName: string): { displayName: string; steps: string[] } | null

  // Get steps for a specific key (for dropdown selection)
  function getStepsByKey(key: string): string[] | null
  ```
- Use case-insensitive partial matching for typed input
- Return `null` if no match found

### 2. Create Suggestion Modal Component

**`src/components/SuggestStepsModal.tsx`**
- Appears after user adds an item that has suggested steps
- Shows:
  - Title: "Add suggested steps for {itemName}?"
  - Preview list of suggested steps (scrollable if long)
  - Two buttons: "Yes, add steps" / "No thanks"
- On "Yes": create all suggested steps as sub-items
- On "No" or click outside: close modal, item remains without sub-items
- Styling: clean modal with semi-transparent backdrop, matches rose/gray palette

### 3. Create Suggestions Dropdown Component

**`src/components/SuggestionsDropdown.tsx`**
- Dropdown button next to the "Add item" input
- Button label: "Browse ideas" or just a lightbulb icon (💡)
- On click, opens dropdown with categorized list
- Categories are collapsible sections with headers
- Clicking an item:
  1. Creates the item with that display name
  2. Opens suggestion modal to confirm adding steps
- Dropdown closes when item selected or clicking outside

### 4. Update AddItemForm Component

**`src/components/AddItemForm.tsx`**
- Add SuggestionsDropdown button next to input
- After successfully creating an item (typed or from dropdown):
  1. Check if item name matches suggested steps
  2. If match found, show suggestion modal
  3. Pass item ID and matched suggestions to modal
- Store pending suggestion state: `{ itemId, itemName, steps }`

### 5. Add Reordering for Sub-Items

**Update `src/components/ExpandableItem.tsx`**
- Add drag handles (⠿) to sub-items when expanded
- Implement drag-and-drop reordering using simple mouse/touch events
- On drop, update `order` field of affected sub-items
- Visual feedback during drag (highlight drop position)

**Alternative simpler approach for MVP:**
- Add up/down arrow buttons to each sub-item
- Click up arrow: swap with previous item
- Click down arrow: swap with next item
- Less fancy but simpler to implement

## UI Design

### Add Item Form with Dropdown Button
```
┌─────────────────────────────────────────────────────────┐
│ Add new item...                              │ 💡 Ideas │
└─────────────────────────────────────────────────────────┘
```

### Suggestions Dropdown (Open)
```
┌─────────────────────────────────────────────────────────┐
│ Add new item...                              │ 💡 Ideas │
└─────────────────────────────────────────────────────────┘
  ┌───────────────────────────────────┐
  │ ▼ Attire & Beauty                 │
  │     Wedding Dress                 │
  │     Suit / Tux                    │
  │     Hair                          │
  │     Makeup                        │
  │     Wedding Rings                 │
  │                                   │
  │ ▶ Ceremony                        │
  │ ▶ Venue & Vendors                 │
  │ ▶ Guests & Invitations            │
  │ ▶ Songs & Dances                  │
  │ ▶ Events & Parties                │
  │ ▶ Other                           │
  └───────────────────────────────────┘
```

### Suggestion Modal
```
┌─────────────────────────────────────────┐
│                                         │
│   Add suggested steps for              │
│   "Wedding Dress"?                      │
│                                         │
│   ┌─────────────────────────────────┐   │
│   │ • Research bridal shops         │   │
│   │ • Book appointments             │   │
│   │ • Try on dresses                │   │
│   │ • Choose dress                  │   │
│   │ • Order veil                    │   │
│   │ • Schedule alterations          │   │
│   │ • Final fitting                 │   │
│   └─────────────────────────────────┘   │
│                                         │
│   ┌────────────────┐  ┌─────────────┐   │
│   │ Yes, add steps │  │  No thanks  │   │
│   └────────────────┘  └─────────────┘   │
│                                         │
└─────────────────────────────────────────┘
```

### Sub-Item with Reorder Controls (Arrow Approach)
```
▼ Wedding Dress                              Nov 15    ×
    ↑ ↓  Research bridal shops                         ×
    ↑ ↓  Book appointments                   Nov 1     ×
    ↑ ↓  Try on dresses                                ×
  ┌─────────────────────────────────────┐
  │ Add sub-item...                     │
  └─────────────────────────────────────┘
```

### Styling Details
- **Dropdown button:** `bg-rose-50 text-rose-600 hover:bg-rose-100 border border-rose-200`
- **Dropdown menu:** `bg-white shadow-lg rounded-lg border max-h-80 overflow-y-auto`
- **Category header:** `font-semibold text-gray-700 bg-gray-50 px-3 py-2 cursor-pointer`
- **Dropdown item:** `px-4 py-2 hover:bg-rose-50 cursor-pointer text-gray-600`
- **Modal backdrop:** `bg-black/50`
- **Modal container:** `bg-white rounded-xl shadow-xl max-w-md`
- **Suggestion list:** `bg-gray-50 rounded-lg p-4 max-h-64 overflow-y-auto`
- **Primary button (Yes):** `bg-rose-500 text-white hover:bg-rose-600`
- **Secondary button (No):** `bg-gray-100 text-gray-600 hover:bg-gray-200`
- **Reorder arrows:** `text-gray-400 hover:text-gray-600`, small size

## Data Flow

### Adding Item via Dropdown
1. User clicks "💡 Ideas" button
2. Dropdown opens with categorized suggestions
3. User expands a category and clicks an item (e.g., "First Dance")
4. Dropdown closes
5. Item created in InstantDB with display name
6. Suggestion modal opens showing steps for that item
7. User confirms → sub-items created
8. Modal closes, item auto-expands to show sub-items

### Adding Item by Typing (with match)
1. User types item name and submits
2. Item created in InstantDB
3. Check `getSuggestedSteps(itemName)`
4. If suggestions found, open modal with item info
5. User clicks "Yes, add steps"
6. Create sub-items with:
   - `name`: suggested step text
   - `parentId`: newly created item's ID
   - `category`: same as parent
   - `order`: sequential (0, 1, 2, ...)
   - `createdAt`: timestamp
7. Modal closes, item auto-expands to show sub-items

### Reordering Sub-Items
1. User clicks up/down arrow on a sub-item
2. Identify target position (swap with adjacent item)
3. Update `order` of both items in a single transaction
4. UI updates via `useQuery`

## Files to Create/Modify
- `src/lib/suggestedSteps.ts` - new: categorized suggestions data and helper functions
- `src/components/SuggestionsDropdown.tsx` - new: browsable dropdown component
- `src/components/SuggestStepsModal.tsx` - new: confirmation modal component
- `src/components/AddItemForm.tsx` - modify: add dropdown button, trigger modal after item creation
- `src/components/ExpandableItem.tsx` - modify: add reorder controls

## Verification
1. Run `npm run dev`
2. Navigate to Personal category
3. **Dropdown flow:**
   - Click "💡 Ideas" button - dropdown should appear with categories
   - Expand "Songs & Dances" category
   - Click "First Dance" - dropdown closes, item created, modal appears
   - Click "Yes, add steps" - sub-items created
   - Expand the item - all suggested steps visible in order
4. **Typed item flow:**
   - Add item "Wedding Dress" by typing - modal should appear with dress suggestions
   - Click "Yes, add steps" - sub-items should be created
5. Add item "Random Thing" - no modal should appear
6. Add item "My Ketubah" - modal should appear (partial match)
7. Click "No thanks" - item created without sub-items
8. Click outside modal - same as "No thanks"
9. Test reordering: click up arrow on step 3, it becomes step 2
10. Test reordering: click down arrow on step 1, it becomes step 2
11. Refresh page - reordered steps should persist
12. Click outside dropdown - dropdown should close

## Edge Cases
- **Multiple keyword matches:** Use first match (category order)
- **Very long item names:** Truncate in modal title if needed
- **Clicking backdrop:** Close modal (same as "No thanks")
- **Clicking outside dropdown:** Close dropdown
- **Modal already open:** Shouldn't happen (one item created at a time)
- **Sub-items already exist:** If user manually added sub-items before suggestions, suggestions should still work (add to existing)
- **First/last item reordering:** Up arrow disabled on first item, down arrow disabled on last
- **Table section items:** Suggestions do not apply to table rows (only regular items)
- **Duplicate items:** User can add same suggestion multiple times (e.g., two "First Dance" items) - this is allowed
- **Categories remember state:** Expanded/collapsed state of categories persists while dropdown is open, resets when closed
