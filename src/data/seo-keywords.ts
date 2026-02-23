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

// US state 2-letter codes (same order as US_STATES)
export const US_STATE_CODES = [
  "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY",
] as const;

export function stateToCode(stateName: string): string | undefined {
  const i = US_STATES.findIndex((s) => s === stateName);
  return i >= 0 ? US_STATE_CODES[i] : undefined;
}

/** Returns [fullName, code] for use in DB queries (state may be stored as either). */
export function getStateQueryValues(stateName: string): string[] {
  const code = stateToCode(stateName);
  const values = [stateName];
  if (code) values.push(code);
  return values;
}

/** Given state as either full name or code, returns [fullName, code] for matching (e.g. "NY" or "New York" → ["New York", "NY"]). */
export function getStateMatchValues(state: string): string[] {
  const trimmed = state.trim();
  if (!trimmed) return [];
  const fromName = getStateQueryValues(trimmed);
  if (fromName.length > 1 || (fromName.length === 1 && stateToCode(trimmed) !== undefined)) return fromName;
  const code = trimmed.toUpperCase();
  const idx = (US_STATE_CODES as readonly string[]).indexOf(code);
  if (idx >= 0) return [US_STATES[idx], US_STATE_CODES[idx]];
  return [trimmed];
}

/** Resolve state input (code or full name) to full state name for storage. */
export function toFullStateName(state: string): string {
  const vals = getStateMatchValues(state);
  return vals[0] ?? state.trim();
}

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
