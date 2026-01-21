// Suggested Steps Data for Wedding Planning
// Comprehensive list covering general wedding planning AND Jewish traditions
// Designed for secular Jewish couples with ~10 month planning timeline

export interface SuggestedItem {
  key: string;
  displayName: string;
  steps: string[];
}

export interface SuggestionCategory {
  name: string;
  items: SuggestedItem[];
}

export const suggestionCategories: SuggestionCategory[] = [
  // ===================
  // GETTING STARTED
  // ===================
  {
    name: "Getting Started",
    items: [
      {
        key: "wedding website",
        displayName: "Wedding Website",
        steps: [
          "Choose platform (Zola, The Knot, Joy, Withjoy) (9-12 months out)",
          "Register your custom URL/domain (9-12 months out)",
          "Add your story and engagement photos (8-10 months out)",
          "Set up RSVP functionality with meal choices (6-8 months out)",
          "Add event details (ceremony, reception, other events) (6-8 months out)",
          "Include travel and accommodation information (6-8 months out)",
          "Add registry links (6-8 months out)",
          "Include FAQ section (dress code, parking, kids policy) (4-6 months out)",
          "Set up password protection if desired (4-6 months out)",
          "Share URL on save-the-dates (6-8 months out)",
        ],
      },
      {
        key: "wedding party",
        displayName: "Wedding Party (Bridesmaids/Groomsmen)",
        steps: [
          "Discuss with partner who to ask (9-12 months out)",
          "Decide on wedding party size (9-12 months out)",
          "Ask bridesmaids/groomsmen (consider creative proposals) (8-10 months out)",
          "Choose maid of honor and best man (8-10 months out)",
          "Decide on flower girl/ring bearer if having (6-8 months out)",
          "Communicate expectations and responsibilities (6-8 months out)",
          "Share important dates (fittings, parties, rehearsal) (4-6 months out)",
          "Create group chat for coordination (6-8 months out)",
        ],
      },
      {
        key: "budget",
        displayName: "Wedding Budget",
        steps: [
          "Have honest budget conversation with partner (10-12 months out)",
          "Determine family contributions if any (10-12 months out)",
          "Research average costs in your area (10-12 months out)",
          "Create detailed budget spreadsheet (10-12 months out)",
          "Prioritize categories (photography, food, music, etc.) (9-10 months out)",
          "Build in 10-15% buffer for unexpected costs (9-10 months out)",
          "Track all deposits and payments (ongoing)",
          "Review budget monthly and adjust as needed (ongoing)",
        ],
      },
      {
        key: "wedding style",
        displayName: "Wedding Style & Theme",
        steps: [
          "Create shared Pinterest board with partner (10-12 months out)",
          "Discuss formality level (casual, semi-formal, formal) (10-12 months out)",
          "Choose color palette (2-4 colors) (9-10 months out)",
          "Decide on overall aesthetic (rustic, modern, classic, etc.) (9-10 months out)",
          "Consider season and venue when choosing theme (9-10 months out)",
          "Share mood board with key vendors (8-9 months out)",
          "Keep style cohesive across all elements (ongoing)",
        ],
      },
      {
        key: "guest list",
        displayName: "Guest List",
        steps: [
          "Create master spreadsheet with columns for address, RSVP, etc. (10-12 months out)",
          "Gather names from both families (9-10 months out)",
          "Collect mailing addresses early (8-10 months out)",
          "Categorize (A-list must-invite, B-list if space) (8-9 months out)",
          "Determine plus-one policy (8-9 months out)",
          "Decide on children policy (8-9 months out)",
          "Finalize count based on venue capacity and budget (6-8 months out)",
          "Keep spreadsheet updated throughout planning (ongoing)",
        ],
      },
      {
        key: "save the dates",
        displayName: "Save the Dates",
        steps: [
          "Finalize wedding date and venue first (10-12 months out)",
          "Choose design that matches wedding style (8-10 months out)",
          "Include wedding website URL (8-10 months out)",
          "Order save the dates (8-10 months out)",
          "Collect all mailing addresses (8-9 months out)",
          "Mail save the dates (6-8 months out)",
          "Email digital version to international guests (6-8 months out)",
        ],
      },
    ],
  },

  // ===================
  // VENUE & VENDORS
  // ===================
  {
    name: "Venue & Vendors",
    items: [
      {
        key: "venue",
        displayName: "Venue",
        steps: [
          "Create venue wishlist (indoor, outdoor, capacity needs) (12+ months out)",
          "Schedule tours (visit at least 3-5 venues) (10-12 months out)",
          "Ask about catering requirements and restrictions (10-12 months out)",
          "Check availability for your preferred dates (10-12 months out)",
          "Compare pricing and what's included (10-12 months out)",
          "Review contract carefully (overtime fees, deposits, cancellation) (10-12 months out)",
          "Understand setup and cleanup requirements (10-12 months out)",
          "Book and pay deposit (10-12 months out)",
        ],
      },
      {
        key: "wedding planner",
        displayName: "Wedding Planner/Coordinator",
        steps: [
          "Decide on level of help needed (full planning vs day-of) (10-12 months out)",
          "Research planners/coordinators in your area (10-12 months out)",
          "Schedule consultations (most are free) (10-12 months out)",
          "Review portfolios and past weddings (10-12 months out)",
          "Ask for references from past clients (10-12 months out)",
          "Understand pricing structure (flat fee vs hourly) (10-12 months out)",
          "Review contract and services included (10-12 months out)",
          "Book planner/coordinator (10-12 months out)",
        ],
      },
      {
        key: "catering",
        displayName: "Catering",
        steps: [
          "Determine if venue requires in-house catering (10-12 months out)",
          "Research caterers if venue allows outside catering (9-10 months out)",
          "Schedule tastings with top 2-3 choices (8-10 months out)",
          "Discuss menu options and dietary restrictions (8-10 months out)",
          "Understand service style (plated, buffet, family style) (8-10 months out)",
          "Get detailed quote including staff, rentals, tax, gratuity (8-10 months out)",
          "Ask about cake cutting fees (8-10 months out)",
          "Review contract and cancellation policy (8-10 months out)",
          "Book and pay deposit (8-10 months out)",
          "Provide final guest count (2 weeks before)",
        ],
      },
      {
        key: "photographer",
        displayName: "Photographer",
        steps: [
          "Determine photography style you love (documentary, editorial, etc.) (10-12 months out)",
          "Research photographers and review portfolios (10-12 months out)",
          "Schedule consultations with top choices (9-12 months out)",
          "Discuss timeline and coverage hours needed (9-12 months out)",
          "Ask about second shooter if needed (9-12 months out)",
          "Understand deliverables (# of photos, albums, prints) (9-12 months out)",
          "Review contract (usage rights, backup policy) (9-12 months out)",
          "Book and pay deposit (9-12 months out)",
          "Schedule engagement session if included (6-8 months out)",
          "Create shot list of must-have photos (1-2 weeks before)",
        ],
      },
      {
        key: "videographer",
        displayName: "Videographer",
        steps: [
          "Decide on video style (cinematic, documentary, etc.) (10-12 months out)",
          "Research videographers and watch sample films (10-12 months out)",
          "Schedule consultations with top choices (9-12 months out)",
          "Discuss coverage hours and crew size (9-12 months out)",
          "Understand deliverables (highlight film, full ceremony, etc.) (9-12 months out)",
          "Ask about audio quality and equipment (9-12 months out)",
          "Review contract and turnaround time (9-12 months out)",
          "Book and pay deposit (9-12 months out)",
          "Share song preferences for highlight film (2-4 weeks before)",
        ],
      },
      {
        key: "florist",
        displayName: "Florist",
        steps: [
          "Gather inspiration photos of bouquets and arrangements (8-10 months out)",
          "Research florists and review portfolios (8-10 months out)",
          "Schedule consultations with top choices (6-9 months out)",
          "Discuss seasonal flower availability (6-9 months out)",
          "Get quote for all arrangements (personal flowers, ceremony, reception) (6-9 months out)",
          "Ask about rentals (vases, arches) vs purchases (6-9 months out)",
          "Understand delivery, setup, and breakdown logistics (6-9 months out)",
          "Book and pay deposit (6-9 months out)",
          "Confirm final details (2 weeks before)",
        ],
      },
      {
        key: "cake",
        displayName: "Wedding Cake",
        steps: [
          "Research bakeries and review designs (6-8 months out)",
          "Schedule tastings with top 2-3 choices (5-6 months out)",
          "Choose flavor combinations for each tier (4-6 months out)",
          "Select design, style, and decorations (4-6 months out)",
          "Discuss cake topper if having one (4-6 months out)",
          "Get quote including delivery and setup (4-6 months out)",
          "Ask about serving size (order extra dessert if needed) (4-6 months out)",
          "Book and pay deposit (4-6 months out)",
          "Confirm delivery details (1 week before)",
        ],
      },
      {
        key: "music",
        displayName: "Music (Band/DJ)",
        steps: [
          "Decide on band vs DJ vs both (10-12 months out)",
          "Research options and read reviews (9-12 months out)",
          "Watch videos or attend performances if possible (9-12 months out)",
          "Schedule consultations with top choices (9-12 months out)",
          "Discuss music style and must-play/do-not-play songs (9-12 months out)",
          "Ask about equipment and setup needs (9-12 months out)",
          "Understand pricing (overtime, travel, meals) (9-12 months out)",
          "Confirm they know hora music (9-12 months out)",
          "Review contract carefully (9-12 months out)",
          "Book and pay deposit (9-12 months out)",
          "Finalize song list (2-4 weeks before)",
        ],
      },
      {
        key: "dj",
        displayName: "DJ",
        steps: [
          "Research DJs and read reviews (9-12 months out)",
          "Watch videos of past events (9-12 months out)",
          "Schedule consultations with top choices (9-12 months out)",
          "Discuss music style and preferences (9-12 months out)",
          "Create must-play and do-not-play lists (2-4 months out)",
          "Confirm they have hora and Jewish music (9-12 months out)",
          "Understand equipment and setup needs (9-12 months out)",
          "Review contract and overtime policy (9-12 months out)",
          "Book and pay deposit (9-12 months out)",
          "Send final timeline and song list (2 weeks before)",
        ],
      },
      {
        key: "band",
        displayName: "Band",
        steps: [
          "Research bands and watch performances (9-12 months out)",
          "Attend live shows if possible (9-12 months out)",
          "Schedule consultation or demo (9-12 months out)",
          "Discuss repertoire and learn new songs policy (9-12 months out)",
          "Ask about size and instrumentation (9-12 months out)",
          "Confirm they know hora and Jewish music (9-12 months out)",
          "Understand setup, sound check, and meal needs (9-12 months out)",
          "Review contract including travel and overtime (9-12 months out)",
          "Book and pay deposit (9-12 months out)",
          "Send special song requests (4 weeks before)",
        ],
      },
      {
        key: "ceremony musicians",
        displayName: "Ceremony Musicians",
        steps: [
          "Decide on ceremony music style (string quartet, soloist, etc.) (6-9 months out)",
          "Research musicians and listen to samples (6-9 months out)",
          "Schedule auditions or consultations (6-9 months out)",
          "Discuss ceremony timeline and cues (6-9 months out)",
          "Choose songs for processional, during ceremony, recessional (4-6 months out)",
          "Confirm they can play any Jewish music needed (6-9 months out)",
          "Review contract and setup requirements (6-9 months out)",
          "Book musicians (6-9 months out)",
          "Send final song selections (4 weeks before)",
        ],
      },
      {
        key: "rentals",
        displayName: "Rentals (Tables, Chairs, Linens)",
        steps: [
          "Determine what venue provides vs what you need (6-8 months out)",
          "Create list of rental needs (tables, chairs, linens, etc.) (5-6 months out)",
          "Research rental companies (5-6 months out)",
          "Schedule showroom visits to see items in person (4-6 months out)",
          "Get quotes from 2-3 companies (4-6 months out)",
          "Review contract including delivery, setup, breakdown times (4-6 months out)",
          "Confirm damage and replacement policies (4-6 months out)",
          "Book rentals (4-6 months out)",
          "Confirm final quantities (2 weeks before)",
        ],
      },
      {
        key: "lighting",
        displayName: "Lighting & Decor",
        steps: [
          "Discuss lighting vision with venue and planner (4-6 months out)",
          "Research lighting companies if not included (4-6 months out)",
          "Consider uplighting, string lights, chandeliers (4-6 months out)",
          "Get quotes for desired look (3-6 months out)",
          "Schedule site visit with lighting vendor (3-6 months out)",
          "Book lighting vendor (3-6 months out)",
          "Confirm setup time with venue (2 weeks before)",
        ],
      },
    ],
  },

  // ===================
  // ATTIRE & BEAUTY
  // ===================
  {
    name: "Attire & Beauty",
    items: [
      {
        key: "dress",
        displayName: "Wedding Dress",
        steps: [
          "Research bridal shops and read reviews (10-12 months out)",
          "Gather inspiration and determine style preferences (10-12 months out)",
          "Book appointments (weekdays less crowded) (10-12 months out)",
          "Bring 1-2 trusted opinions (not a crowd) (10-12 months out)",
          "Try different silhouettes with open mind (10-12 months out)",
          "Consider dress timeline (some take 6-9 months to arrive) (9-10 months out)",
          "Choose dress and order (pay deposit) (9-10 months out)",
          "Order veil, belt, or other accessories (6-8 months out)",
          "Schedule first fitting (8-10 weeks before)",
          "Bring shoes and undergarments to fittings (8-10 weeks before)",
          "Schedule second fitting and alterations (4-6 weeks before)",
          "Schedule final fitting (1-2 weeks before)",
          "Learn how to bustle and care for dress (1-2 weeks before)",
        ],
      },
      {
        key: "suit",
        displayName: "Suit / Tux",
        steps: [
          "Decide on suit vs tuxedo based on formality (8-10 months out)",
          "Research suit shops and tailors (6-9 months out)",
          "Gather style inspiration (6-9 months out)",
          "Book appointments (6-9 months out)",
          "Try on different styles and fits (6-9 months out)",
          "Choose suit/tux and order (buy or rent) (5-6 months out)",
          "Order accessories (tie, pocket square, cufflinks, shoes) (4-6 months out)",
          "Schedule first fitting (6-8 weeks before)",
          "Schedule final fitting (1-2 weeks before)",
          "Pick up suit (1 week before)",
          "Steam or press before wedding day (day before)",
        ],
      },
      {
        key: "bridesmaids dresses",
        displayName: "Bridesmaids Dresses",
        steps: [
          "Decide on dress approach (same dress, same color different styles, etc.) (6-8 months out)",
          "Choose color palette that complements wedding (6-8 months out)",
          "Research dress options across price points (6-8 months out)",
          "Share options with bridesmaids for input (5-6 months out)",
          "Set order deadline (4-6 months out)",
          "Ensure all bridesmaids order correct size (4-6 months out)",
          "Recommend they schedule alterations if needed (2-3 months out)",
          "Plan accessories (jewelry, shoes) (2-3 months out)",
          "Coordinate shoe color/style if desired (2-3 months out)",
          "Remind bridesmaids to bring everything to rehearsal (1 week before)",
        ],
      },
      {
        key: "groomsmen attire",
        displayName: "Groomsmen Attire",
        steps: [
          "Decide on suit/tux style to match wedding formality (6-8 months out)",
          "Choose whether to buy, rent, or let them own (6-8 months out)",
          "Select colors and style details (5-6 months out)",
          "Share specific requirements with groomsmen early (5-6 months out)",
          "Set measurement deadline (2-3 months before)",
          "Coordinate rental company if applicable (3-4 months out)",
          "Assign someone to collect and return rentals (1 month out)",
          "Plan accessories (ties, pocket squares, socks) (2-3 months out)",
          "Confirm everyone has correct shoes (2-3 months out)",
          "Do final check at rehearsal (day before)",
        ],
      },
      {
        key: "wedding accessories",
        displayName: "Wedding Accessories",
        steps: [
          "Make list of needed accessories (4-6 months out)",
          "Shop for shoes (break them in before wedding!) (3-4 months out)",
          "Choose jewelry (something old, new, borrowed, blue) (2-3 months out)",
          "Select undergarments that work with dress (2-3 months out)",
          "Buy or make garter if having garter toss (2-3 months out)",
          "Get clutch or bag for essentials (1-2 months out)",
          "Purchase hair accessories (veil, headpiece, pins) (3-4 months out)",
          "Don't forget comfortable shoes for reception (2-3 months out)",
          "Lay out all accessories before wedding day (day before)",
        ],
      },
      {
        key: "hair",
        displayName: "Hair",
        steps: [
          "Gather hair inspiration photos (4-6 months out)",
          "Research stylists who specialize in bridal (4-6 months out)",
          "Book trial appointment (2-4 months out)",
          "Bring hair accessories and veil to trial (2-4 months out)",
          "Take photos of trial results (2-4 months out)",
          "Decide on final style (note products used) (2-3 months out)",
          "Book wedding day appointment (2-3 months out)",
          "Consider bridesmaids hair (same stylist?) (2-3 months out)",
          "Discuss timeline for wedding day (1 month out)",
          "Avoid major hair changes close to wedding (ongoing)",
        ],
      },
      {
        key: "makeup",
        displayName: "Makeup",
        steps: [
          "Gather makeup inspiration photos (4-6 months out)",
          "Research makeup artists (check if products are long-lasting) (4-6 months out)",
          "Book trial appointment (2-4 months out)",
          "Discuss desired look (natural, glam, etc.) (2-4 months out)",
          "Take photos in natural and indoor light (2-4 months out)",
          "Test for allergies and wear to see how it lasts (2-4 months out)",
          "Book wedding day appointment (2-3 months out)",
          "Consider bridesmaids makeup if desired (2-3 months out)",
          "Discuss touch-up kit for reception (1 month out)",
          "Schedule skincare appointments leading up to wedding (3-6 months out)",
        ],
      },
      {
        key: "rings",
        displayName: "Wedding Rings",
        steps: [
          "Research ring styles together (4-6 months out)",
          "Set budget for wedding bands (4-6 months out)",
          "Visit jewelers and try on styles (3-4 months out)",
          "Decide on metal type (match engagement ring if applicable) (3-4 months out)",
          "Consider custom or engraved options (3-4 months out)",
          "Order rings (2-3 months before)",
          "Allow time for sizing adjustments (6-8 weeks before)",
          "Pick up rings and store safely (2-4 weeks before)",
          "Clean rings before wedding day (day before)",
          "Designate ring bearer or best man to hold rings (1 week before)",
        ],
      },
    ],
  },

  // ===================
  // JEWISH CEREMONY
  // ===================
  {
    name: "Jewish Ceremony",
    items: [
      {
        key: "officiant",
        displayName: "Rabbi/Officiant",
        steps: [
          "Research rabbis/officiants in your area (10-12 months out)",
          "Ask for recommendations from family and friends (10-12 months out)",
          "Schedule interviews with 2-3 officiants (9-12 months out)",
          "Discuss ceremony style (traditional, egalitarian, interfaith-friendly) (9-12 months out)",
          "Ask about premarital counseling requirements (9-12 months out)",
          "Understand fees and what's included (9-12 months out)",
          "Review ceremony outline and customization options (9-12 months out)",
          "Book officiant (9-12 months out)",
          "Schedule pre-ceremony meetings to plan details (3-6 months out)",
          "Confirm arrival time and logistics before wedding (1 week before)",
        ],
      },
      {
        key: "ketubah",
        displayName: "Ketubah",
        steps: [
          "Research ketubah styles (traditional, modern, artistic) (6-8 months out)",
          "Discuss text options with rabbi (Orthodox, Conservative, Reform, egalitarian) (5-6 months out)",
          "Explore custom ketubah artists on Etsy and Jewish art sites (5-6 months out)",
          "Set budget ($200-$2000+ for custom) (5-6 months out)",
          "Order ketubah (custom takes longer) (3-4 months before)",
          "Proofread text carefully before finalizing (3-4 months before)",
          "Choose and confirm two Jewish witnesses (2-3 months out)",
          "Plan ketubah signing ceremony logistics (1 month out)",
          "Decide on framing for after wedding (after wedding)",
          "Bring ketubah to venue (day of wedding)",
        ],
      },
      {
        key: "chuppah",
        displayName: "Chuppah",
        steps: [
          "Decide on chuppah style (floral, fabric, DIY, family tallit) (6-8 months out)",
          "Discuss with florist if doing floral chuppah (5-6 months out)",
          "Research rental options if not DIY (4-6 months out)",
          "Consider meaningful elements (family heirlooms, special fabric) (4-6 months out)",
          "Designate chuppah holders if traditional four-post style (2-3 months out)",
          "Confirm venue has space and weight capacity (2-3 months out)",
          "Plan setup logistics and timing (1-2 months out)",
          "Do site visit to visualize placement (1-2 months out)",
          "Confirm all materials ready (1 week before)",
        ],
      },
      {
        key: "kippot",
        displayName: "Kippot (Yarmulkes)",
        steps: [
          "Decide on style (suede, satin, knit, leather) (3-4 months out)",
          "Choose color to match wedding palette (3-4 months out)",
          "Decide on personalization (names, date, design) (3-4 months out)",
          "Order from Judaica supplier or Etsy (2-3 months before)",
          "Order quantity: guest count + 20% extra (2-3 months before)",
          "Confirm order received (1 month out)",
          "Plan display at ceremony (basket, table) (2 weeks before)",
          "Designate someone to set up display (1 week before)",
        ],
      },
      {
        key: "breaking glass",
        displayName: "Breaking the Glass",
        steps: [
          "Source a glass or lightbulb to break (2-3 months out)",
          "Order decorative smash bag or pouch (2-3 months out)",
          "Decide if bride will also stomp (egalitarian option) (1-2 months out)",
          "Brief groom on technique (corner of heel, firmly) (1-2 weeks before)",
          "Consider having broken glass made into art after wedding (after wedding)",
          "Designate someone to clean up shards (1 week before)",
          "Practice stomp before ceremony if nervous (rehearsal day)",
        ],
      },
      {
        key: "hora",
        displayName: "Hora",
        steps: [
          "Confirm band/DJ has hora music (Hava Nagila, Siman Tov) (3-4 months out)",
          "Designate 8-12 strong chair carriers (4 per chair) (2-3 weeks before)",
          "Brief chair carriers on logistics and safety (1 week before)",
          "Get two sturdy chairs (no folding chairs!) (coordinate with venue)",
          "Decide on napkin or handkerchief for couple to hold (1-2 weeks before)",
          "Plan when in reception hora will happen (1 month out)",
          "Consider safety - keep it controlled and brief (1 month out)",
          "Warn photographer to be ready (1 week before)",
        ],
      },
      {
        key: "benchers",
        displayName: "Benchers (Birkat Hamazon)",
        steps: [
          "Decide if having benchers for birkat hamazon (3-4 months out)",
          "Choose design and personalization (3-4 months out)",
          "Include grace after meals text (3-4 months out)",
          "Consider including sheva brachot text (3-4 months out)",
          "Order from Judaica supplier (2-3 months out)",
          "Order quantity: guest count + extras (2-3 months out)",
          "Plan distribution at tables (1-2 weeks before)",
          "Coordinate with band/DJ on timing (1-2 weeks before)",
        ],
      },
      {
        key: "ceremony items",
        displayName: "Ceremony Items (Kiddush Cups, etc.)",
        steps: [
          "Get two kiddush cups (one for each blessing) (2-3 months out)",
          "Source wine/grape juice for ceremony (1-2 weeks before)",
          "Get glass and smash pouch for breaking glass (2-3 months out)",
          "Arrange table/stand for signing ketubah (1 month out)",
          "Get nice pen for ketubah signing (1-2 months out)",
          "Consider yichud room provisions (snacks for breaking fast) (1-2 weeks before)",
          "Gather any family ritual items to incorporate (1-2 months out)",
          "Create checklist and designate person to set up (1-2 weeks before)",
        ],
      },
      {
        key: "aufruf",
        displayName: "Aufruf (Optional)",
        steps: [
          "Discuss with rabbi if having aufruf (Shabbat before wedding) (2-3 months out)",
          "Choose synagogue if not your regular shul (2-3 months out)",
          "Invite close family and friends (1-2 months out)",
          "Plan kiddush lunch after services (1-2 months out)",
          "Prepare for aliyah (Torah blessing) (2-3 weeks before)",
          "Buy candy for congregation to throw (soft candy!) (1-2 weeks before)",
          "Write any speech or words to share (1-2 weeks before)",
          "Confirm logistics with synagogue (1 week before)",
        ],
      },
      {
        key: "sheva brachot",
        displayName: "Sheva Brachot Meals",
        steps: [
          "Decide on number of sheva brachot meals (up to 7 nights after wedding) (2-3 months out)",
          "Recruit hosts for each meal (1-2 months out)",
          "Create guest list for each meal (need minyan of 10 + new face) (1-2 months out)",
          "Coordinate logistics with hosts (2-4 weeks before)",
          "Prepare list of who will recite each bracha (1-2 weeks before)",
          "Send details to guests (1-2 weeks before)",
          "Bring benchers or blessings text (to each meal)",
          "Thank hosts with small gift (at each meal)",
        ],
      },
      {
        key: "vows",
        displayName: "Vows",
        steps: [
          "Discuss with rabbi what's customary and allowed (3-4 months out)",
          "Decide on style (traditional Hebrew, personal additions, both) (2-3 months out)",
          "Brainstorm meaningful moments in your relationship (2-3 months out)",
          "Write first draft (2-3 months before)",
          "Share with partner (or keep secret - your choice) (1-2 months out)",
          "Edit and refine several times (1-2 months out)",
          "Practice reading aloud multiple times (2-4 weeks before)",
          "Keep vows to 1-2 minutes each (2-4 weeks before)",
          "Print on nice paper or cards (1-2 weeks before)",
          "Give copies to officiant as backup (1 week before)",
        ],
      },
      {
        key: "ceremony music",
        displayName: "Ceremony Music Selections",
        steps: [
          "Discuss with rabbi what music is appropriate (3-4 months out)",
          "Choose music for each ceremony moment (2-3 months out)",
          "Select processional music (parents, wedding party, bride) (2-3 months out)",
          "Choose music during ketubah signing if public (2-3 months out)",
          "Select music during ceremony if desired (2-3 months out)",
          "Choose recessional music (upbeat, celebratory) (2-3 months out)",
          "Coordinate with ceremony musicians or DJ (1-2 months out)",
          "Create timing cues for musicians (2-4 weeks before)",
          "Do walkthrough with musicians if possible (day before or morning of)",
        ],
      },
    ],
  },

  // ===================
  // GUESTS & INVITATIONS
  // ===================
  {
    name: "Guests & Invitations",
    items: [
      {
        key: "invitations",
        displayName: "Invitations",
        steps: [
          "Choose style/design that matches wedding theme (4-5 months out)",
          "Order samples from top choices (4-5 months out)",
          "Proofread all wording carefully (3-4 months out)",
          "Include ceremony and reception details (3-4 months out)",
          "Add wedding website URL (3-4 months out)",
          "Order invitations (3-4 months before)",
          "Order 10-20 extra for keepsakes and mistakes (3-4 months before)",
          "Assemble invitation suite (8-10 weeks before)",
          "Weigh and buy correct postage (8-10 weeks before)",
          "Address envelopes (calligraphy optional) (8-10 weeks before)",
          "Mail invitations (6-8 weeks before)",
          "Mail international invites earlier (8-10 weeks before)",
        ],
      },
      {
        key: "rsvp tracking",
        displayName: "RSVP Tracking",
        steps: [
          "Set up tracking spreadsheet or use wedding website (4-5 months out)",
          "Set RSVP deadline (3-4 weeks before)",
          "Track RSVPs as they come in (ongoing after invites sent)",
          "Note meal choices and dietary restrictions (ongoing)",
          "Follow up with non-responders (2 weeks before deadline)",
          "Call or text close family/friends who haven't responded (1 week before deadline)",
          "Finalize guest count for caterer (2-3 weeks before)",
          "Update seating chart with final count (2 weeks before)",
          "Send final numbers to venue and caterer (2 weeks before)",
        ],
      },
      {
        key: "seating",
        displayName: "Seating Chart",
        steps: [
          "Get final RSVP count (3-4 weeks before)",
          "Decide on table shapes and sizes (2-3 months out)",
          "List guests by relationship groupings (3-4 weeks before)",
          "Consider which guests know each other (3-4 weeks before)",
          "Place family at prominent tables (2-3 weeks before)",
          "Create draft seating chart (2-3 weeks before)",
          "Get input from parents on family seating (2-3 weeks before)",
          "Finalize seating chart (1-2 weeks before)",
          "Create place cards or escort cards (1-2 weeks before)",
          "Bring backup blank cards for last-minute changes (day of)",
        ],
      },
      {
        key: "hotel blocks",
        displayName: "Hotel Blocks",
        steps: [
          "Research hotels near venue (8-10 months out)",
          "Contact hotels about room blocks (typically need 10+ rooms) (8-10 months out)",
          "Negotiate group rate (usually 10-20% off) (8-10 months out)",
          "Understand block policies (cutoff date, unused rooms) (8-10 months out)",
          "Reserve blocks at 2 price points if possible (6-8 months out)",
          "Add hotel info to wedding website (6-8 months out)",
          "Include hotel info with save-the-dates (6-8 months out)",
          "Monitor block usage and adjust if needed (ongoing)",
          "Confirm shuttle arrangements if providing (1-2 months out)",
        ],
      },
      {
        key: "welcome bags",
        displayName: "Welcome Bags",
        steps: [
          "Decide what to include (snacks, water, local treats, hangover kit) (2-3 months out)",
          "Source items and buy in bulk (1-2 months out)",
          "Add welcome note and itinerary (2-3 weeks before)",
          "Include local recommendations/map (2-3 weeks before)",
          "Order bags or baskets (1-2 months out)",
          "Assemble bags (1-2 weeks before)",
          "Arrange delivery to hotel(s) (1-2 weeks before)",
          "Confirm hotel will distribute to rooms (1 week before)",
          "Drop off bags (day before wedding)",
        ],
      },
      {
        key: "guest favors",
        displayName: "Guest Favors",
        steps: [
          "Decide if having favors (totally optional!) (3-4 months out)",
          "Choose favor type (edible, useful, charitable donation) (3-4 months out)",
          "Order favors (2-3 months before)",
          "Personalize with names/date if desired (2-3 months out)",
          "Plan display at tables or exit (1-2 months out)",
          "Consider having favors double as place cards (1-2 months out)",
          "Assemble if needed (1-2 weeks before)",
          "Designate someone to set up at reception (1 week before)",
        ],
      },
      {
        key: "guestbook",
        displayName: "Guestbook",
        steps: [
          "Decide on guestbook style (traditional book, photo, alternative) (3-4 months out)",
          "Consider alternatives (Polaroid, audio recording, puzzle) (3-4 months out)",
          "Order guestbook or supplies (2 months before)",
          "Get nice pens that show up on chosen surface (1-2 months out)",
          "Plan display table with signage (2-3 weeks before)",
          "Designate someone to remind guests to sign (1 week before)",
          "Consider prompts or questions for guests (2-3 weeks before)",
          "Display at ceremony entrance or cocktail hour (day of)",
        ],
      },
      {
        key: "thank you cards",
        displayName: "Thank You Cards",
        steps: [
          "Order thank you cards (match invitation style) (3-4 months out)",
          "Track gifts as they arrive with spreadsheet (ongoing)",
          "Write notes as gifts arrive (don't wait!) (ongoing)",
          "Personalize each note with specific gift mention (ongoing)",
          "Both partners should sign cards (ongoing)",
          "Mail within 3 months of receiving gift (ongoing)",
          "Mail all remaining cards (within 3 months after wedding)",
          "Address and stamp cards in batches (ongoing)",
        ],
      },
    ],
  },

  // ===================
  // TRANSPORTATION & LOGISTICS
  // ===================
  {
    name: "Transportation & Logistics",
    items: [
      {
        key: "transportation",
        displayName: "Wedding Day Transportation",
        steps: [
          "Determine transportation needs (ceremony to reception, getting ready) (4-6 months out)",
          "Research options (limo, classic car, shuttle, Uber) (4-6 months out)",
          "Get quotes from 2-3 companies (3-6 months out)",
          "Book transportation (3-6 months before)",
          "Confirm vehicle capacity and amenities (3-6 months out)",
          "Plan transportation for wedding party getting ready (1-2 months out)",
          "Confirm pickup times and addresses (2-3 weeks before)",
          "Review contract and overtime policies (1-2 months out)",
          "Confirm all details (1 week before)",
          "Have driver contact info on wedding day (day of)",
        ],
      },
      {
        key: "guest transportation",
        displayName: "Guest Transportation",
        steps: [
          "Determine if shuttle needed (distant venue, limited parking) (4-6 months out)",
          "Research shuttle companies (3-4 months out)",
          "Get quotes based on route and timing (3-4 months out)",
          "Book shuttle (2-3 months before)",
          "Create shuttle schedule (ceremony, reception, end of night) (1-2 months out)",
          "Communicate shuttle info on wedding website (1-2 months out)",
          "Print shuttle schedule for guests (2 weeks before)",
          "Confirm pickup locations with hotels (2 weeks before)",
          "Confirm schedule (1 week before)",
        ],
      },
      {
        key: "day-of timeline",
        displayName: "Day-of Timeline",
        steps: [
          "Start with ceremony time and work backwards/forwards (1-2 months out)",
          "Include hair and makeup schedule (1-2 months out)",
          "Add photography time (getting ready, first look if doing) (1-2 months out)",
          "Schedule family and wedding party photos (1-2 months out)",
          "Add buffer time between events (1 month out)",
          "Include vendor arrival and setup times (2-3 weeks before)",
          "Map out cocktail hour activities (2-3 weeks before)",
          "Time reception events (grand entrance, dinner, dances, hora) (2-3 weeks before)",
          "Share timeline with all vendors (2 weeks before)",
          "Share with wedding party (1-2 weeks before)",
          "Print copies for wedding day (day before)",
          "Assign point person to keep everyone on schedule (1 week before)",
        ],
      },
      {
        key: "vendor confirmations",
        displayName: "Vendor Confirmations",
        steps: [
          "Create master vendor contact list (2-3 months out)",
          "Confirm all vendors (2 weeks before)",
          "Reconfirm timing, locations, and contact info (2 weeks before)",
          "Send final timeline to all vendors (2 weeks before)",
          "Confirm final payment amounts due (2 weeks before)",
          "Prepare final payments and tips in envelopes (1 week before)",
          "Confirm setup and breakdown times with venue (2 weeks before)",
          "Double-check load-in and parking instructions (1-2 weeks before)",
          "Confirm meal counts for vendors (1-2 weeks before)",
          "Have day-of contact for each vendor (day of)",
        ],
      },
      {
        key: "emergency kit",
        displayName: "Day-of Emergency Kit",
        steps: [
          "Get a large bag or box for supplies (1-2 months out)",
          "Add sewing kit (needles, thread in dress colors, safety pins) (2-4 weeks before)",
          "Include fashion tape and hem tape (2-4 weeks before)",
          "Add stain remover pen (Tide stick) (2-4 weeks before)",
          "Pack pain relievers (Advil, Tylenol) (2-4 weeks before)",
          "Add antacids and anti-nausea meds (2-4 weeks before)",
          "Include allergy medicine (2-4 weeks before)",
          "Pack band-aids and blister pads (2-4 weeks before)",
          "Add deodorant and breath mints (2-4 weeks before)",
          "Include touch-up makeup and bobby pins (1-2 weeks before)",
          "Pack phone chargers (1-2 weeks before)",
          "Add snacks and water (day before)",
          "Include cash for emergencies (day before)",
          "Pack tissues and wet wipes (day before)",
          "Add lint roller (day before)",
          "Give kit to maid of honor or planner (day of)",
        ],
      },
    ],
  },

  // ===================
  // STATIONERY & PAPER
  // ===================
  {
    name: "Stationery & Paper",
    items: [
      {
        key: "programs",
        displayName: "Ceremony Programs",
        steps: [
          "Decide on program format (folded, flat, fan) (2-3 months out)",
          "Include ceremony order of events (1-2 months out)",
          "Add explanation of Jewish traditions for non-Jewish guests (1-2 months out)",
          "List wedding party members (1-2 months out)",
          "Add any readings or music titles (1-2 months out)",
          "Include memorial section for deceased loved ones if desired (1-2 months out)",
          "Proofread thoroughly (3-4 weeks before)",
          "Order or print (2-3 weeks before)",
          "Plan display at ceremony entrance (1-2 weeks before)",
          "Order 10% extra (2-3 weeks before)",
        ],
      },
      {
        key: "menus",
        displayName: "Menus",
        steps: [
          "Get final menu from caterer (3-4 weeks before)",
          "Design menus to match wedding stationery (3-4 weeks before)",
          "Include dietary labels (V, VG, GF) (3-4 weeks before)",
          "Decide on display (one per place setting, one per table) (3-4 weeks before)",
          "Proofread carefully (2-3 weeks before)",
          "Order or print (2 weeks before)",
          "Deliver to venue or caterer (1 week before)",
        ],
      },
      {
        key: "place cards",
        displayName: "Place Cards & Table Numbers",
        steps: [
          "Finalize seating chart first (2 weeks before)",
          "Design place cards to match stationery (3-4 weeks before)",
          "Design table numbers to match (3-4 weeks before)",
          "Order or print (1-2 weeks before)",
          "Write or print guest names (1-2 weeks before)",
          "Organize by table for easy setup (day before)",
          "Bring blank extras for last-minute changes (day of)",
          "Plan display for escort card table (1-2 weeks before)",
        ],
      },
      {
        key: "signage",
        displayName: "Wedding Signage",
        steps: [
          "List all signs needed (welcome, directions, bar, seating chart) (2-3 months out)",
          "Design signs to match wedding style (1-2 months out)",
          "Consider unplugged ceremony sign (1-2 months out)",
          "Add Instagram hashtag sign if desired (1-2 months out)",
          "Create cocktail and bar menu signs (3-4 weeks before)",
          "Design any photo booth props/signs (3-4 weeks before)",
          "Order or print (2 weeks before)",
          "Plan display stands/easels (2 weeks before)",
        ],
      },
    ],
  },

  // ===================
  // SONGS & DANCES
  // ===================
  {
    name: "Songs & Dances",
    items: [
      {
        key: "first dance",
        displayName: "First Dance",
        steps: [
          "Brainstorm song ideas together (4-6 months out)",
          "Create shortlist of meaningful songs (3-4 months out)",
          "Listen to songs together and choose one (3-4 months out)",
          "Decide on dance style (simple sway, choreographed, surprise) (2-3 months out)",
          "Book dance lessons if doing choreography (6-8 weeks before)",
          "Practice at home regularly (ongoing)",
          "Practice in wedding shoes (2-3 weeks before)",
          "Do final rehearsal at venue if possible (rehearsal day)",
          "Give final song to DJ/band (2 weeks before)",
          "Discuss any special effects (lighting, fog) (2-3 weeks before)",
        ],
      },
      {
        key: "dance lessons",
        displayName: "Dance Lessons",
        steps: [
          "Research dance studios specializing in wedding dances (3-4 months out)",
          "Schedule lessons (2-3 months before)",
          "Discuss desired style with instructor (2-3 months out)",
          "Start with 3-4 lessons and add more if needed (2-3 months out)",
          "Practice between lessons (ongoing)",
          "Bring wedding shoes to later lessons (4-6 weeks before)",
          "Record lessons for practice reference (ongoing)",
          "Schedule final lesson close to wedding (1-2 weeks before)",
        ],
      },
      {
        key: "father daughter dance",
        displayName: "Father-Daughter Dance",
        steps: [
          "Discuss song ideas with dad (2-3 months out)",
          "Choose meaningful song together (1-2 months out)",
          "Decide on dance style (simple, choreographed) (1-2 months out)",
          "Practice together 2-3 times (2-4 weeks before)",
          "Give song choice to DJ/band (2 weeks before)",
          "Decide if doing surprise elements (1 month out)",
        ],
      },
      {
        key: "mother son dance",
        displayName: "Mother-Son Dance",
        steps: [
          "Discuss song ideas with mom (2-3 months out)",
          "Choose meaningful song together (1-2 months out)",
          "Decide on dance style (simple, choreographed) (1-2 months out)",
          "Practice together 2-3 times (2-4 weeks before)",
          "Give song choice to DJ/band (2 weeks before)",
          "Decide if happening same time as father-daughter dance (1 month out)",
        ],
      },
      {
        key: "reception playlist",
        displayName: "Reception Playlist",
        steps: [
          "Discuss music preferences with partner (3-4 months out)",
          "Create must-play song list (2-3 months out)",
          "Create do-not-play list (2-3 months out)",
          "Consider genre mix for different generations (1-2 months out)",
          "Plan music for specific moments (cake cutting, bouquet toss) (1-2 months out)",
          "Include hora and Jewish celebration music (1-2 months out)",
          "Send lists to DJ/band (2-4 weeks before)",
          "Discuss volume levels for different parts of night (2-4 weeks before)",
        ],
      },
    ],
  },

  // ===================
  // EVENTS & PARTIES
  // ===================
  {
    name: "Events & Parties",
    items: [
      {
        key: "rehearsal dinner",
        displayName: "Rehearsal Dinner",
        steps: [
          "Set guest list (wedding party, immediate family, out-of-towners) (4-6 months out)",
          "Choose venue or restaurant (4-6 months out)",
          "Book venue (3-6 months before)",
          "Plan menu (sit-down, buffet, family style) (2-3 months out)",
          "Consider dietary restrictions (2-3 months out)",
          "Plan toasts/speeches (1-2 months out)",
          "Order or make invitations (2-3 months out)",
          "Send invitations (3-4 weeks before)",
          "Plan any slideshow or activities (2-3 weeks before)",
          "Distribute wedding party gifts (at dinner)",
          "Confirm final details (1 week before)",
          "Enjoy and don't stay too late! (night before wedding)",
        ],
      },
      {
        key: "bachelor party",
        displayName: "Bachelor Party",
        steps: [
          "Choose best man or friend to organize (4-6 months out)",
          "Set date (2-4 weeks before wedding ideal) (3-4 months out)",
          "Create guest list with groom (3-4 months out)",
          "Set budget per person (3-4 months out)",
          "Plan activities that groom will enjoy (2-3 months out)",
          "Book accommodations if traveling (2-3 months out)",
          "Make reservations (2-3 months out)",
          "Send invites (4-6 weeks before party)",
          "Collect money from attendees (2-3 weeks before party)",
          "Confirm all bookings (1 week before party)",
        ],
      },
      {
        key: "bachelorette party",
        displayName: "Bachelorette Party",
        steps: [
          "Choose maid of honor or friend to organize (4-6 months out)",
          "Set date (2-4 weeks before wedding ideal) (3-4 months out)",
          "Create guest list with bride (3-4 months out)",
          "Set budget per person (3-4 months out)",
          "Plan activities that bride will enjoy (2-3 months out)",
          "Book accommodations if traveling (2-3 months out)",
          "Make reservations (2-3 months out)",
          "Send invites (4-6 weeks before party)",
          "Collect money from attendees (2-3 weeks before party)",
          "Plan matching outfits or accessories (2-3 weeks before party)",
          "Confirm all bookings (1 week before party)",
        ],
      },
      {
        key: "bridal shower",
        displayName: "Bridal Shower",
        steps: [
          "Designate host (traditionally maid of honor or family) (4-5 months out)",
          "Set date (4-8 weeks before wedding) (3-4 months out)",
          "Create guest list (shower guests should be invited to wedding) (3-4 months out)",
          "Set budget with host (3-4 months out)",
          "Choose theme or style (2-3 months out)",
          "Book venue or host at home (2-3 months out)",
          "Plan games and activities (1-2 months out)",
          "Coordinate food and drinks (1-2 months out)",
          "Send invitations (4-6 weeks before shower)",
          "Arrange for registry gift opening (at shower)",
          "Plan for thank you cards (after shower)",
        ],
      },
      {
        key: "welcome party",
        displayName: "Welcome Party/Drinks",
        steps: [
          "Decide on style (casual drinks, dinner, activity) (3-4 months out)",
          "Choose venue or bar/restaurant (3-4 months out)",
          "Set guest list (out-of-town guests, wedding party) (3-4 months out)",
          "Book venue (2-3 months out)",
          "Plan food and drinks (1-2 months out)",
          "Send invitations or include on wedding website (1-2 months out)",
          "Keep it relaxed - save energy for wedding! (night before wedding)",
          "Confirm final details (1 week before)",
        ],
      },
      {
        key: "after party",
        displayName: "After Party",
        steps: [
          "Decide if having after party (2-3 months out)",
          "Book venue or space (hotel bar, suite, nearby venue) (2-3 months out)",
          "Plan for casual food and drinks (1-2 months out)",
          "Set guest list (all wedding guests? Close friends only?) (1-2 months out)",
          "Communicate location on wedding website (1-2 months out)",
          "Arrange transportation from reception (1 month out)",
          "Keep it simple - everyone will be tired! (night of wedding)",
        ],
      },
      {
        key: "honeymoon",
        displayName: "Honeymoon",
        steps: [
          "Discuss destination ideas with partner (8-10 months out)",
          "Set honeymoon budget (8-10 months out)",
          "Decide on timing (immediately after or delayed) (8-10 months out)",
          "Research destinations and options (6-8 months out)",
          "Check passport expiration (renew if needed - 6+ months validity) (6-8 months out)",
          "Book flights (3-6 months before)",
          "Book accommodations (3-6 months before)",
          "Research activities and make reservations (2-3 months out)",
          "Purchase travel insurance (2-3 months out)",
          "Create packing list (2 weeks before)",
          "Set up out-of-office messages (day before departure)",
          "Pack (1 week before - not the night before!)",
          "Arrange pet/plant care while away (2-3 weeks before)",
        ],
      },
    ],
  },

  // ===================
  // GIFTS & REGISTRY
  // ===================
  {
    name: "Gifts & Registry",
    items: [
      {
        key: "registry",
        displayName: "Registry",
        steps: [
          "Discuss what you need/want with partner (8-10 months out)",
          "Choose 2-3 stores/websites (8-10 months out)",
          "Include range of price points ($25-$500+) (6-9 months out)",
          "Add traditional items (dishes, linens, kitchen) (6-9 months out)",
          "Consider experiences or honeymoon fund (6-9 months out)",
          "Add items you'll actually use (6-9 months out)",
          "Create registry (6-9 months before)",
          "Add to wedding website (6-8 months out)",
          "Update registry as items are purchased (ongoing)",
          "Send thank you notes promptly! (ongoing)",
        ],
      },
      {
        key: "wedding party gifts",
        displayName: "Wedding Party Gifts",
        steps: [
          "Set budget per person (3-4 months out)",
          "Choose meaningful gifts (not just wedding-related items) (2-3 months out)",
          "Consider personalizing with names or initials (2-3 months out)",
          "Get gift for each bridesmaid and groomsman (2-3 months out)",
          "Don't forget flower girl and ring bearer (2-3 months out)",
          "Order gifts (1-2 months before)",
          "Write personal notes to accompany each gift (1-2 weeks before)",
          "Present at rehearsal dinner or morning of wedding (rehearsal dinner)",
        ],
      },
      {
        key: "parent gifts",
        displayName: "Parent Gifts",
        steps: [
          "Set budget for parent gifts (2-3 months out)",
          "Choose meaningful gifts that reflect relationship (2-3 months out)",
          "Consider photo gifts or personalized items (2-3 months out)",
          "Don't forget stepparents if applicable (2-3 months out)",
          "Write heartfelt cards (1-2 weeks before)",
          "Order gifts (1-2 months before)",
          "Present at rehearsal dinner or privately (rehearsal dinner)",
        ],
      },
      {
        key: "vendor tips",
        displayName: "Vendor Tips & Gratuities",
        steps: [
          "Research standard tip amounts for each vendor (1-2 months out)",
          "Create list of all vendors to tip (1-2 months out)",
          "Prepare cash in labeled envelopes (1 week before)",
          "Include thank you notes with tips (1 week before)",
          "Designate person to distribute day of (best man, planner) (1 week before)",
          "Typical tips: DJ 10-15%, caterers 15-20%, hair/makeup 15-25% (reference)",
          "Prepare envelopes (1 week before)",
          "Confirm who gratuity is already included for (2 weeks before)",
        ],
      },
    ],
  },

  // ===================
  // LEGAL & ADMIN
  // ===================
  {
    name: "Legal & Admin",
    items: [
      {
        key: "marriage license",
        displayName: "Marriage License (California)",
        steps: [
          "Research California requirements online (2-3 months out)",
          "Both partners must appear in person with valid ID (1-3 months out)",
          "No blood test or waiting period required in CA (info)",
          "Schedule appointment with county clerk (recommended) (1-3 months out)",
          "Decide on public vs confidential license (1-3 months out)",
          "Pay fee (varies by county, ~$35-$100) (1-3 months out)",
          "Get license within 90 days of wedding (it expires!) (1-3 months out)",
          "Bring license to ceremony (day of)",
          "Give to officiant for signing after ceremony (day of)",
          "Return signed license to clerk within 10 days (after wedding)",
          "Order 3-5 certified copies for name change (2-4 weeks after wedding)",
        ],
      },
      {
        key: "name change",
        displayName: "Name Change (California)",
        steps: [
          "Decide if changing name(s) (before wedding)",
          "Order 3-5 certified marriage certificates (2-4 weeks after wedding)",
          "Start Social Security name change first (SSA office) (1-2 weeks after receiving certificates)",
          "Visit SSA office with marriage certificate and ID (1-2 weeks after receiving certificates)",
          "Wait for new Social Security card (10-14 days after SSA)",
          "Update driver's license at DMV (bring marriage certificate) (after receiving new SSN card)",
          "Update passport (Form DS-5504 if within 1 year) (1-2 months after wedding)",
          "Update bank accounts (after receiving new ID)",
          "Update credit cards (after receiving new ID)",
          "Update employer/HR records (as soon as practical)",
          "Update voter registration (as soon as practical)",
          "Update vehicle registration and title (as soon as practical)",
          "Update insurance policies (as soon as practical)",
          "Update frequent flyer accounts (as soon as practical)",
          "Update subscriptions and accounts (as soon as practical)",
        ],
      },
      {
        key: "wedding insurance",
        displayName: "Wedding Insurance",
        steps: [
          "Research wedding insurance options (6-8 months out)",
          "Understand what's covered (cancellation, liability, etc.) (6-8 months out)",
          "Get quotes from multiple providers (4-6 months out)",
          "Check if venue requires liability coverage (4-6 months out)",
          "Purchase insurance (1-2 months before)",
          "Keep policy accessible (ongoing)",
          "Understand claim process (before wedding)",
        ],
      },
    ],
  },

  // ===================
  // SPEECHES & TOASTS
  // ===================
  {
    name: "Speeches & Toasts",
    items: [
      {
        key: "speeches",
        displayName: "Speeches & Toasts",
        steps: [
          "Decide who will give speeches (best man, maid of honor, parents) (3-4 months out)",
          "Limit total number of speeches (3-5 is ideal) (3-4 months out)",
          "Communicate expectations (length, tone) (2-3 months out)",
          "Set time limit per speech (3-5 minutes each) (2-3 months out)",
          "Offer to review drafts if desired (1-2 months out)",
          "Create speaking order (1-2 weeks before)",
          "Brief MC or DJ on order and timing (1-2 weeks before)",
          "Have microphone ready and tested (day of)",
          "Designate cue for end of each speech (1 week before)",
          "Prepare tissue just in case! (day of)",
        ],
      },
    ],
  },
];

// Build a flat lookup map for quick access
const itemsByKey = new Map<string, SuggestedItem>();
for (const category of suggestionCategories) {
  for (const item of category.items) {
    itemsByKey.set(item.key.toLowerCase(), item);
  }
}

/**
 * Get all suggestion categories for the dropdown
 */
export function getSuggestionCategories(): SuggestionCategory[] {
  return suggestionCategories;
}

/**
 * Find matching suggestions by keyword (for typed input)
 * Uses case-insensitive partial matching
 */
export function getSuggestedSteps(
  itemName: string
): { key: string; displayName: string; steps: string[] } | null {
  const lowerName = itemName.toLowerCase();

  // First try exact match
  const exactMatch = itemsByKey.get(lowerName);
  if (exactMatch) {
    return exactMatch;
  }

  // Then try partial match (check if item name contains any key)
  for (const [key, item] of itemsByKey) {
    if (lowerName.includes(key)) {
      return item;
    }
  }

  return null;
}

/**
 * Get steps for a specific key (for dropdown selection)
 */
export function getStepsByKey(key: string): SuggestedItem | null {
  return itemsByKey.get(key.toLowerCase()) || null;
}
