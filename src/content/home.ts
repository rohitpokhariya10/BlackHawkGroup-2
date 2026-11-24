// Approved homepage wording: Blackhawk Realty Group.pdf, pages 1–2.
export const home = {
  hero: {
    title: "Property Decisions, Made Personal",
    description: "Looking for a place to live, a location for your business, or a property to hold as an investment? Tell Blackhawk Realty Group what you have in mind.",
    cta: "See Property Options",
  },
  about: {
    title: "A Different Search for Every Client",
    paragraphs: [
      "Some people know exactly what they want. Others are weighing several possibilities, from a first home to a storefront or an income-producing property. Blackhawk Realty Group works with buyers, sellers, renters, and investors who arrive with different questions and different timelines.",
      "We start with the details that affect your decision: how the property will be used, what you can comfortably spend, and what needs to happen before you move forward. Our role is to help you sort through those considerations without losing sight of why you started looking.",
    ],
  },
  values: [
    { title: "Care", description: "Important details deserve a second look, not a rushed answer." },
    { title: "Candor", description: "We would rather explain an uncertainty than gloss over it." },
    { title: "Flexibility", description: "A change in budget or timing may call for a different plan." },
    { title: "Attention", description: "The small questions often matter as much as the big ones." },
    { title: "Respect", description: "Your priorities set the direction of the conversation." },
    { title: "Curiosity", description: "We ask what a property needs to do for you before discussing what comes next." },
  ],
  features: [
    { title: "Residential Real Estate", description: "Explore homes and property options with guidance shaped around your priorities." },
    { title: "Commercial Opportunities", description: "Consider spaces and properties that fit your business or investment plans." },
    { title: "Rentals & Investments", description: "Discover options for leasing or building a property portfolio." },
  ],
  owners: {
    title: "Basil & Betty Sullivan",
    paragraphs: [
      "Basil Sullivan and Betty Sullivan are the owners of Blackhawk Realty Group. The company works with people considering residential properties, commercial spaces, rentals, and real estate investments.",
      "The reasons behind those decisions can be very different. One client may need more room at home. Another may be looking at a location for a business. Someone else may be deciding whether to keep a property or put it on the market.",
      "Blackhawk Realty Group invites clients to explain the situation first, including any concerns about budget, timing, or property type. That conversation helps establish which questions need answers before the next step.",
    ],
    note: "Professional biographies and licensing details will be added after they are provided and approved.",
  },
  properties: { title: "Explore Available Properties", description: "Browse current opportunities and find a property that aligns with your plans.", cta: "View Listings" },
  communities: { title: "Find Your Next Location", description: "Explore property possibilities in the areas that matter to you. Connect with Blackhawk Realty Group to discuss locations, property types, and availability." },
  office: { title: "Visit or Contact Blackhawk Realty Group" },
  team: { title: "People Behind Your Property Journey", description: "Get to know the professionals supporting your next real estate decision.", cta: "Meet the Team" },
  connections: { title: "Connect With Blackhawk", description: "Strong real estate relationships begin with shared goals and meaningful conversations. Reach out to learn more about connecting with our company.", cta: "Start a Conversation" },
  buyers: { title: "Start With How You Want to Live", description: "Think beyond the number of bedrooms. What would an ordinary weekday look like in the property? How much travel, upkeep, or renovation would you accept? Bring those questions to Blackhawk Realty Group as you begin comparing options.", cta: "Discuss Buying" },
  sellers: { title: "Selling Starts Before the Sign Goes Up", description: "What needs attention before you list? How soon do you hope to move? What would a successful sale make possible? Discuss those details with Blackhawk Realty Group before deciding on your next step.", cta: "Discuss Selling" },
  closing: { title: "Your next property decision begins with a conversation.", description: "Whether you are buying, selling, leasing, or investing, connect with Blackhawk Realty Group to explore your options.", cta: "Contact Our Team" },
} as const;

// Editorial image categories, not geographic coverage or available listings.
export const locationInspiration = [
  { title: "City living", image: "city" },
  { title: "Room to grow", image: "residential" },
  { title: "A place to work", image: "commercial" },
  { title: "Quiet surroundings", image: "neighborhood" },
  { title: "Close to everyday life", image: "interior" },
  { title: "A different perspective", image: "hero" },
  { title: "Space for what’s next", image: "living" },
  { title: "A place to call home", image: "exterior" },
] as const;
