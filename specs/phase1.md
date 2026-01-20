# Phase 1 Spec: Basic Navigation with 5 Category Tabs

## Goal
Set up basic navigation with 5 category tabs. Each tab shows an empty page with its name. No login needed for MVP.

## Categories
1. Venue & Vendors
2. Guests
3. Ceremony
4. To-Do List
5. Personal

## Implementation

### 1. Update Layout (`src/app/layout.tsx`)
- Add a top navigation bar with 5 tabs
- Each tab links to its category page
- Active tab should be visually highlighted
- Clean, minimal styling (Tailwind)

### 2. Create Category Pages
Create 5 pages under `src/app/`:
- `src/app/venue/page.tsx` - "Venue & Vendors"
- `src/app/guests/page.tsx` - "Guests"
- `src/app/ceremony/page.tsx` - "Ceremony"
- `src/app/todos/page.tsx` - "To-Do List"
- `src/app/personal/page.tsx` - "Personal"

Each page will:
- Display the category name as a header
- Show placeholder text: "No items yet"
- Be a client component (for future InstantDB integration)

### 3. Update Home Page (`src/app/page.tsx`)
- Show a simple dashboard/landing page
- Display wedding date countdown or header ("November 8, 2026")
- Show 5 category cards/links to each section
- Clean, welcoming design

### 4. Navigation Component
Create `src/components/Navigation.tsx`:
- Horizontal tab bar
- Uses Next.js `Link` for navigation
- Uses `usePathname()` to highlight active tab
- Responsive: works on mobile

## Design Notes
- Keep it simple and clean per PRD
- Use existing Geist font
- Minimal color palette (grays, one accent)
- No overwhelming UI elements

## Files to Create/Modify
- `src/app/layout.tsx` - add navigation
- `src/components/Navigation.tsx` - new
- `src/app/venue/page.tsx` - new
- `src/app/guests/page.tsx` - new
- `src/app/ceremony/page.tsx` - new
- `src/app/todos/page.tsx` - new
- `src/app/personal/page.tsx` - new
- `src/app/page.tsx` - update or redirect

## No Schema Changes
Phase 1 is UI-only. Schema changes come in Phase 2 when we add items.

## Verification
1. Run `npm run dev`
2. Navigate to each tab - should show category name
3. Active tab should be highlighted
4. Navigation should work on all pages
