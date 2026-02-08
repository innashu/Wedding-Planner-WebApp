// Timeline Seed Data for Wedding Planning
// Based on research from The Knot, Zola, WeddingWire, and Joy
// Wedding: November 8, 2026 in Half Moon Bay, CA

export interface TimelineTaskSeed {
  text: string;
  category: "venue" | "guests" | "ceremony" | "personal" | "todo";
}

export interface TimelineMonthSeed {
  month: number; // 1-12
  year: number;
  tasks: TimelineTaskSeed[];
}

// Category display info
export const CATEGORY_INFO: Record<string, { name: string; emoji: string }> = {
  venue: { name: "Venue & Vendors", emoji: "🏰" },
  guests: { name: "Guests", emoji: "👥" },
  ceremony: { name: "Ceremony (Jewish)", emoji: "✡️" },
  personal: { name: "Personal", emoji: "👗" },
  todo: { name: "To-Do", emoji: "📝" },
};

// Get current date in PST timezone
export function getCurrentPSTDate(): { month: number; year: number } {
  const now = new Date();
  const pstString = now.toLocaleString("en-US", {
    timeZone: "America/Los_Angeles",
  });
  const pstDate = new Date(pstString);
  return {
    month: pstDate.getMonth() + 1, // 1-indexed
    year: pstDate.getFullYear(),
  };
}

// Get month name
export function getMonthName(month: number): string {
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  return months[month - 1];
}

// Get countdown label
export function getCountdownLabel(month: number, year: number): string {
  const weddingMonth = 11; // November
  const weddingYear = 2026;

  if (month === weddingMonth && year === weddingYear) {
    return "WEDDING";
  }

  // Post-wedding month
  if (year > weddingYear || (year === weddingYear && month > weddingMonth)) {
    return "POST-WEDDING";
  }

  const monthsOut = (weddingYear - year) * 12 + (weddingMonth - month);
  if (monthsOut === 1) return "1 MONTH";
  return `${monthsOut} MONTHS`;
}

// Comprehensive seed data based on research from wedding planning websites
export const timelineSeedData: TimelineMonthSeed[] = [
  // February 2026 (9 Months Out)
  {
    month: 2,
    year: 2026,
    tasks: [
      // Venue & Vendors
      { text: "Book wedding venue (Half Moon Bay area)", category: "venue" },
      { text: "Research and book photographer", category: "venue" },
      { text: "Research and book videographer", category: "venue" },
      { text: "Book caterer or confirm venue catering", category: "venue" },
      { text: "Schedule catering tastings", category: "venue" },
      { text: "Research florists and schedule consultations", category: "venue" },
      { text: "Research and book DJ or band", category: "venue" },
      { text: "Consider hiring a wedding planner/coordinator", category: "venue" },
      // Guests
      { text: "Finalize preliminary guest list", category: "guests" },
      { text: "Create wedding website", category: "guests" },
      { text: "Set up wedding registry", category: "guests" },
      { text: "Reserve hotel room blocks for out-of-town guests", category: "guests" },
      // Ceremony
      { text: "Research and contact rabbis/officiants", category: "ceremony" },
      { text: "Discuss ceremony requirements with potential officiants", category: "ceremony" },
      { text: "Confirm wedding date doesn't conflict with Jewish holidays", category: "ceremony" },
      // Personal
      { text: "Start wedding dress shopping", category: "personal" },
      { text: "Research bridal shops and book appointments", category: "personal" },
      { text: "Begin looking at bridesmaid dress styles", category: "personal" },
      // To-Do
      { text: "Set overall wedding budget", category: "todo" },
      { text: "Open joint wedding savings account", category: "todo" },
      { text: "Start Pinterest board for style/theme inspiration", category: "todo" },
    ],
  },

  // March 2026 (8 Months Out)
  {
    month: 3,
    year: 2026,
    tasks: [
      // Venue & Vendors
      { text: "Book florist", category: "venue" },
      { text: "Book ceremony musicians", category: "venue" },
      { text: "Research and book hair and makeup artists", category: "venue" },
      { text: "Book transportation (limos, shuttles)", category: "venue" },
      { text: "Research rental companies", category: "venue" },
      // Guests
      { text: "Send save-the-dates", category: "guests" },
      { text: "Continue refining guest list", category: "guests" },
      { text: "Update wedding website with travel info", category: "guests" },
      // Ceremony
      { text: "Book rabbi/officiant", category: "ceremony" },
      { text: "Begin discussing ceremony structure", category: "ceremony" },
      { text: "Research ketubah artists and styles", category: "ceremony" },
      // Personal
      { text: "Continue wedding dress appointments", category: "personal" },
      { text: "Groom: start researching suits/tuxedos", category: "personal" },
      { text: "Discuss wedding party attire expectations", category: "personal" },
      // To-Do
      { text: "Research and book honeymoon destination", category: "todo" },
      { text: "Book engagement photos session", category: "todo" },
    ],
  },

  // April 2026 (7 Months Out)
  {
    month: 4,
    year: 2026,
    tasks: [
      // Venue & Vendors
      { text: "Book cake baker and schedule tasting", category: "venue" },
      { text: "Finalize rental orders", category: "venue" },
      { text: "Book lighting designer if desired", category: "venue" },
      { text: "Confirm all major vendor contracts are signed", category: "venue" },
      // Guests
      { text: "Finalize guest list", category: "guests" },
      { text: "Begin addressing save-the-dates if not yet sent", category: "guests" },
      // Ceremony
      { text: "Order ketubah (custom ones can take months)", category: "ceremony" },
      { text: "Discuss ketubah text options with rabbi", category: "ceremony" },
      { text: "Plan chuppah design", category: "ceremony" },
      // Personal
      { text: "Order wedding dress", category: "personal" },
      { text: "Order bridesmaids dresses", category: "personal" },
      { text: "Schedule groom's suit fitting appointments", category: "personal" },
      // To-Do
      { text: "Plan bachelor/bachelorette party timing", category: "todo" },
      { text: "Research wedding bands/rings", category: "todo" },
    ],
  },

  // May 2026 (6 Months Out)
  {
    month: 5,
    year: 2026,
    tasks: [
      // Venue & Vendors
      { text: "Work with caterer on preliminary menu ideas", category: "venue" },
      { text: "Schedule menu tasting with caterer", category: "venue" },
      { text: "Confirm florist on centerpiece concepts", category: "venue" },
      { text: "Meet with DJ/band to discuss music preferences", category: "venue" },
      // Guests
      { text: "Order wedding invitations and stationery suite", category: "guests" },
      { text: "Finalize wording for invitations", category: "guests" },
      { text: "Gather all guest addresses", category: "guests" },
      // Ceremony
      { text: "Order kippot (yarmulkes) for guests", category: "ceremony" },
      { text: "Order breaking glass and cloth pouch", category: "ceremony" },
      { text: "Discuss sheva brachot (seven blessings) honorees", category: "ceremony" },
      // Personal
      { text: "Choose and order wedding rings", category: "personal" },
      { text: "Finalize groomsmen attire", category: "personal" },
      { text: "Schedule hair and makeup trial", category: "personal" },
      // To-Do
      { text: "Plan rehearsal dinner venue and guest list", category: "todo" },
      { text: "Start writing personal vows if doing", category: "todo" },
    ],
  },

  // June 2026 (5 Months Out)
  {
    month: 6,
    year: 2026,
    tasks: [
      // Venue & Vendors
      { text: "Finalize menu selections with caterer", category: "venue" },
      { text: "Confirm beverage package and bar setup", category: "venue" },
      { text: "Discuss day-of timeline with venue coordinator", category: "venue" },
      { text: "Meet with florist to finalize designs", category: "venue" },
      // Guests
      { text: "Order ceremony programs", category: "guests" },
      { text: "Design and order menus", category: "guests" },
      { text: "Plan welcome bags for hotel guests", category: "guests" },
      // Ceremony
      { text: "Confirm ceremony order with rabbi", category: "ceremony" },
      { text: "Select ceremony music (processional, recessional)", category: "ceremony" },
      { text: "Plan bedeken (veiling ceremony) if including", category: "ceremony" },
      { text: "Arrange for yichud room", category: "ceremony" },
      // Personal
      { text: "First wedding dress fitting", category: "personal" },
      { text: "Hair and makeup trial", category: "personal" },
      { text: "Purchase wedding shoes and accessories", category: "personal" },
      // To-Do
      { text: "Book wedding night accommodations", category: "todo" },
      { text: "Plan after-party if having one", category: "todo" },
    ],
  },

  // July 2026 (4 Months Out)
  {
    month: 7,
    year: 2026,
    tasks: [
      // Venue & Vendors
      { text: "Finalize all floral arrangements and bouquets", category: "venue" },
      { text: "Confirm photo shot list with photographer", category: "venue" },
      { text: "Discuss must-have video moments with videographer", category: "venue" },
      { text: "Order or rent any remaining decor items", category: "venue" },
      // Guests
      { text: "Mail wedding invitations", category: "guests" },
      { text: "Set up RSVP tracking system", category: "guests" },
      { text: "Plan seating chart draft", category: "guests" },
      // Ceremony
      { text: "Order benchers (grace after meals booklets)", category: "ceremony" },
      { text: "Select and confirm witnesses for ketubah signing", category: "ceremony" },
      { text: "Practice any Hebrew readings or prayers", category: "ceremony" },
      // Personal
      { text: "Second dress fitting", category: "personal" },
      { text: "Finalize bridesmaids accessories", category: "personal" },
      { text: "Groom's final suit fitting", category: "personal" },
      // To-Do
      { text: "Finalize honeymoon bookings and itinerary", category: "todo" },
      { text: "Arrange pet/house sitter for honeymoon", category: "todo" },
    ],
  },

  // August 2026 (3 Months Out)
  {
    month: 8,
    year: 2026,
    tasks: [
      // Venue & Vendors
      { text: "Confirm all vendor contracts and final payment schedule", category: "venue" },
      { text: "Finalize day-of timeline and share with all vendors", category: "venue" },
      { text: "Order or confirm signage (welcome signs, table numbers)", category: "venue" },
      { text: "Finalize rentals order", category: "venue" },
      // Guests
      { text: "Track RSVPs and follow up with non-responders", category: "guests" },
      { text: "Finalize seating chart", category: "guests" },
      { text: "Order place cards and table numbers", category: "guests" },
      // Ceremony
      { text: "Final meeting with rabbi to review ceremony", category: "ceremony" },
      { text: "Confirm all ceremony items are ordered", category: "ceremony" },
      { text: "Rehearse hora dance playlist with DJ", category: "ceremony" },
      // Personal
      { text: "Final dress fitting with accessories and shoes", category: "personal" },
      { text: "Break in wedding shoes", category: "personal" },
      { text: "Finalize day-of jewelry", category: "personal" },
      // To-Do
      { text: "Book SF City Hall appointments for Nov 9 (license + ceremony)", category: "todo" },
      { text: "Plan morning-of logistics", category: "todo" },
      { text: "Create wedding day emergency kit list", category: "todo" },
    ],
  },

  // September 2026 (2 Months Out)
  {
    month: 9,
    year: 2026,
    tasks: [
      // Venue & Vendors
      { text: "Submit final guest count to caterer", category: "venue" },
      { text: "Submit final meal selections and dietary restrictions", category: "venue" },
      { text: "Confirm setup and breakdown times with venue", category: "venue" },
      { text: "Finalize any DIY projects", category: "venue" },
      // Guests
      { text: "Send rehearsal dinner invitations", category: "guests" },
      { text: "Finalize seating chart", category: "guests" },
      { text: "Prepare guest favors", category: "guests" },
      { text: "Confirm hotel room block pickup", category: "guests" },
      // Ceremony
      { text: "Finalize processional order", category: "ceremony" },
      { text: "Confirm all sheva brachot readers", category: "ceremony" },
      { text: "Review ceremony script one final time", category: "ceremony" },
      // Personal
      { text: "Pick up wedding dress", category: "personal" },
      { text: "Write vows if not already done", category: "personal" },
      { text: "Schedule final beauty appointments (facials, etc.)", category: "personal" },
      // To-Do
      { text: "Prepare final vendor payments and tip envelopes", category: "todo" },
      { text: "Confirm honeymoon reservations", category: "todo" },
      { text: "Arrange wedding party gifts", category: "todo" },
    ],
  },

  // October 2026 (1 Month Out)
  {
    month: 10,
    year: 2026,
    tasks: [
      // Venue & Vendors
      { text: "Final walkthrough with venue", category: "venue" },
      { text: "Confirm all vendor arrival times", category: "venue" },
      { text: "Provide final timeline to all vendors", category: "venue" },
      { text: "Confirm day-of contact phone numbers", category: "venue" },
      // Guests
      { text: "Print final seating chart", category: "guests" },
      { text: "Finalize place cards", category: "guests" },
      { text: "Assemble and deliver welcome bags to hotel", category: "guests" },
      // Ceremony
      { text: "Pack ceremony items (ketubah, kippot, glass, rings)", category: "ceremony" },
      { text: "Confirm yichud room setup", category: "ceremony" },
      { text: "Prepare ketubah signing table setup", category: "ceremony" },
      // Personal
      { text: "Final grooming appointments (hair color, nails)", category: "personal" },
      { text: "Spray tan or final facial (1-2 weeks before)", category: "personal" },
      { text: "Pack for wedding night and honeymoon", category: "personal" },
      // To-Do
      { text: "Confirm SF City Hall appointments for Nov 9", category: "todo" },
      { text: "Gather documents for City Hall (photo IDs, payment)", category: "todo" },
      { text: "Decide on witness for civil ceremony", category: "todo" },
      { text: "Confirm transportation pickup times", category: "todo" },
      { text: "Create day-of packing list", category: "todo" },
      { text: "Delegate day-of responsibilities to wedding party", category: "todo" },
    ],
  },

  // November 2026 (Wedding Month)
  {
    month: 11,
    year: 2026,
    tasks: [
      // Week Before
      { text: "Confirm all vendor details one final time", category: "venue" },
      { text: "Finalize wedding party assignments", category: "todo" },
      { text: "Prepare toasts and speeches", category: "todo" },
      { text: "Break in shoes one more time", category: "personal" },
      // 2-3 Days Before
      { text: "Pack for wedding day", category: "personal" },
      { text: "Lay out all accessories and outfit components", category: "personal" },
      { text: "Confirm rehearsal dinner details", category: "todo" },
      // Day Before (November 7)
      { text: "Wedding rehearsal", category: "ceremony" },
      { text: "Rehearsal dinner", category: "todo" },
      { text: "Deliver final payments and tips to coordinator", category: "todo" },
      { text: "Get to bed early!", category: "personal" },
      // Wedding Day (November 8)
      { text: "Ketubah signing", category: "ceremony" },
      { text: "Bedeken (veiling ceremony)", category: "ceremony" },
      { text: "Wedding ceremony under the chuppah", category: "ceremony" },
      { text: "Mazel tov and glass breaking!", category: "ceremony" },
      { text: "Yichud (private moment)", category: "ceremony" },
      { text: "Reception and hora!", category: "ceremony" },
      { text: "First dance and celebrations", category: "ceremony" },
      // Day After - SF City Hall (November 9)
      { text: "SF City Hall: Marriage license appointment (Room 160)", category: "todo" },
      { text: "SF City Hall: Civil ceremony", category: "todo" },
      { text: "Request certified marriage certificate copies (5-10)", category: "todo" },
      // Later That Week
      { text: "Brunch with guests (if planned)", category: "guests" },
      { text: "Pack gifts and cards", category: "todo" },
      { text: "Begin honeymoon adventure!", category: "personal" },
    ],
  },

  // December 2026 (Post-Honeymoon: Name Change)
  {
    month: 12,
    year: 2026,
    tasks: [
      // Name Change Tasks
      { text: "Social Security Administration: Update card (do FIRST)", category: "todo" },
      { text: "Social Security: Bring marriage cert + photo ID + Form SS-5", category: "todo" },
      { text: "Wait 48 hours after Social Security before going to DMV", category: "todo" },
      { text: "DMV: Update driver's license (bring Social Security card, marriage cert, proof of address)", category: "todo" },
      { text: "DMV: Update voter registration while there", category: "todo" },
      { text: "DMV: Update vehicle title if applicable", category: "todo" },
      { text: "Update passport (Form DS-82 or DS-11)", category: "todo" },
      { text: "Update bank accounts and credit cards", category: "todo" },
      { text: "Update employer/HR and payroll", category: "todo" },
      { text: "Update health, car, and home insurance", category: "todo" },
      { text: "Update utilities and subscriptions", category: "todo" },
    ],
  },
];
