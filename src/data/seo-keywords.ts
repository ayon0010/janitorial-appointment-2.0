/**
 * Keyword research & programmatic SEO data
 * Focus: janitorial appointments, commercial cleaning leads
 */

export const SITE_NAME = "Janitorial Appointments";

// Primary keywords (homepage, brand)
export const primaryKeywords = [
  "janitorial appointments",
  "commercial cleaning leads",
  "commercial cleaning appointments",
  "janitorial leads",
  "cleaning company leads",
];

// Secondary / service-type keywords
export const secondaryKeywords = [
  "office cleaning leads",
  "medical cleaning leads",
  "day care cleaning leads",
  "janitorial lead generation",
  "commercial cleaning lead generation",
  "pre-qualified cleaning appointments",
  "exclusive janitorial leads",
];

// Long-tail (for content, FAQs, programmatic titles)
export const longTailKeywords = [
  "book commercial cleaning appointments for my company",
  "get exclusive janitorial leads",
  "commercial cleaning leads for janitorial companies",
  "janitorial appointment booking service",
  "buy commercial cleaning leads",
  "qualified cleaning service leads",
];

// US states for programmatic location pages (name → slug)
export const US_STATES = [
  "Alabama",
  "Alaska",
  "Arizona",
  "Arkansas",
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "Florida",
  "Georgia",
  "Hawaii",
  "Idaho",
  "Illinois",
  "Indiana",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maine",
  "Maryland",
  "Massachusetts",
  "Michigan",
  "Minnesota",
  "Mississippi",
  "Missouri",
  "Montana",
  "Nebraska",
  "Nevada",
  "New Hampshire",
  "New Jersey",
  "New Mexico",
  "New York",
  "North Carolina",
  "North Dakota",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Pennsylvania",
  "Rhode Island",
  "South Carolina",
  "South Dakota",
  "Tennessee",
  "Texas",
  "Utah",
  "Vermont",
  "Virginia",
  "Washington",
  "West Virginia",
  "Wisconsin",
  "Wyoming",
] as const;

export function stateToSlug(state: string): string {
  return state.toLowerCase().replace(/\s+/g, "-");
}

export function slugToState(slug: string): string {
  const found = US_STATES.find((s) => stateToSlug(s) === slug);
  return found ?? slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

export function getAllStateSlugs(): string[] {
  return US_STATES.map(stateToSlug);
}

// Default meta description for programmatic pages
export const defaultProgrammaticDescription =
  "Get exclusive commercial cleaning leads and janitorial appointments. Pre-qualified businesses ready to meet. No cold calling — we book appointments for you.";
