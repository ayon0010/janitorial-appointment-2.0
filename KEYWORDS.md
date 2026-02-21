# Keyword Research & Programmatic SEO

## Primary keywords (brand & homepage)
- **janitorial appointments**
- **commercial cleaning leads**
- **commercial cleaning appointments**
- **janitorial leads**
- **cleaning company leads**

## Secondary / service-type keywords
- office cleaning leads
- medical cleaning leads
- day care cleaning leads
- janitorial lead generation
- commercial cleaning lead generation
- pre-qualified cleaning appointments
- exclusive janitorial leads

## Long-tail (content, CTAs, programmatic copy)
- book commercial cleaning appointments for my company
- get exclusive janitorial leads
- commercial cleaning leads for janitorial companies
- janitorial appointment booking service
- buy commercial cleaning leads
- qualified cleaning service leads

## Programmatic SEO

### Location pages (50 US states)
- **URL pattern:** `/commercial-cleaning-leads/[state]`  
  Examples: `/commercial-cleaning-leads/california`, `/commercial-cleaning-leads/new-york`
- **Hub page:** `/commercial-cleaning-leads` — lists all states and links to each state page.
- **Per-page title:** `Commercial Cleaning Leads [State] | Janitorial Appointments`
- **Per-page description:** Unique for each state, includes “commercial cleaning leads” and “[State]”.
- **Content:** Short, unique intro per state + shared Preferred plan section.

### Implementation
- **Data:** `src/data/seo-keywords.ts` — US states, slug helpers, keyword lists.
- **Static generation:** All 50 state pages are pre-rendered via `generateStaticParams`.
- **Sitemap:** `src/app/sitemap.ts` includes homepage, contact, pricing, about, faqs, hub, and all 50 state URLs.

### Optional next steps
- **City-level pages:** e.g. `/commercial-cleaning-leads/[state]/[city]` if you have city data.
- **Service-type programmatic:** e.g. `/services/office-cleaning-leads`, `/services/medical-cleaning-leads` using existing `boxData` slugs.
- **Blog content:** Target long-tail keywords in blog titles and body copy.
- **Internal linking:** Add “Commercial cleaning leads by state” (or per-state) links in header/footer and relevant pages.
