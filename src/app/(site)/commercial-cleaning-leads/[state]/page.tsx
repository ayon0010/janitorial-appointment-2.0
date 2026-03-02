import HeroSub from "@/components/SharedComponent/HeroSub";
import Preferred from "@/components/Home/preferred-plan";
import {
  getAllStateSlugs,
  slugToState,
  getStateQueryValues,
  SITE_NAME,
} from "@/data/seo-keywords";
import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import {
  buildCanonical,
  getBreadcrumbJsonLd,
  getServiceJsonLd,
} from "@/lib/seo";

type Props = {
  params: Promise<{ state: string }>;
};

export const revalidate = 60;

export async function generateStaticParams() {
  return getAllStateSlugs().map((state) => ({ state }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { state: stateSlug } = await params;
  const stateName = slugToState(stateSlug);

  const title = `Commercial Cleaning & Janitorial Lead Generation in ${stateName}`;
  const description = `Get exclusive ${stateName} janitorial leads, pre-qualified office cleaning appointments, and commercial cleaning contracts booked with decision-makers.`;
  const canonical = buildCanonical(`/commercial-cleaning-leads/${stateSlug}`);

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description,
      type: "website",
      url: canonical,
      siteName: SITE_NAME,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    robots: { index: true, follow: true },
  };
}

type StateMarketData = {
  cities: string[];
  industries: string[];
  buildingTypes: string[];
  description: string;
  neighboringStates?: string[];
};

const STATE_MARKET_DATA: Record<string, StateMarketData> = {
  Alabama: {
    cities: ["Birmingham", "Montgomery", "Mobile", "Huntsville", "Tuscaloosa"],
    industries: [
      "automotive manufacturing",
      "healthcare",
      "higher education",
      "logistics",
      "government services",
    ],
    buildingTypes: [
      "medical office buildings",
      "university campuses",
      "corporate offices",
      "industrial plants",
      "municipal complexes",
    ],
    description:
      "Alabama combines legacy manufacturing, healthcare systems, and public institutions, creating steady demand for reliable commercial janitorial partners able to support compliance and appearance standards.",
    neighboringStates: ["Georgia", "Mississippi", "Tennessee", "Florida"],
  },
  Alaska: {
    cities: ["Anchorage", "Fairbanks", "Juneau", "Wasilla"],
    industries: [
      "energy and natural resources",
      "transportation",
      "healthcare",
      "government",
    ],
    buildingTypes: [
      "airport facilities",
      "government buildings",
      "medical centers",
      "logistics hubs",
    ],
    description:
      "Alaska’s commercial market revolves around energy, logistics, and government, with facilities operating in demanding climates that require dependable, safety-focused cleaning programs.",
  },
  Arizona: {
    cities: ["Phoenix", "Tucson", "Mesa", "Scottsdale", "Tempe"],
    industries: [
      "technology",
      "healthcare",
      "logistics",
      "education",
      "financial services",
    ],
    buildingTypes: [
      "Class A office towers",
      "medical pavilions",
      "call centers",
      "distribution facilities",
    ],
    description:
      "Arizona’s fast-growing metros, corporate campuses, and healthcare corridors create continuous demand for office and specialty cleaning services that can scale alongside expanding footprints.",
    neighboringStates: ["California", "Nevada", "New Mexico"],
  },
  Arkansas: {
    cities: ["Little Rock", "Fayetteville", "Fort Smith", "Springdale"],
    industries: [
      "retail headquarters",
      "manufacturing",
      "healthcare",
      "logistics",
    ],
    buildingTypes: [
      "corporate headquarters",
      "distribution centers",
      "regional hospitals",
      "government buildings",
    ],
    description:
      "Arkansas blends corporate headquarters, logistics hubs, and public sector facilities, all of which rely on consistent janitorial programs to protect brand and operational uptime.",
  },
  California: {
    cities: ["Los Angeles", "San Francisco", "San Diego", "San Jose", "Sacramento"],
    industries: [
      "technology",
      "entertainment",
      "finance",
      "healthcare",
      "professional services",
    ],
    buildingTypes: [
      "high-rise office towers",
      "studio and production campuses",
      "medical centers",
      "research facilities",
      "corporate campuses",
    ],
    description:
      "California’s diverse economy spans technology, media, finance, healthcare, and higher education, with dense clusters of Class A buildings that expect premium, detail-oriented commercial cleaning.",
    neighboringStates: ["Nevada", "Oregon", "Arizona"],
  },
  Colorado: {
    cities: ["Denver", "Colorado Springs", "Aurora", "Fort Collins", "Boulder"],
    industries: [
      "technology",
      "aerospace",
      "healthcare",
      "education",
      "professional services",
    ],
    buildingTypes: [
      "downtown office towers",
      "research labs",
      "medical campuses",
      "university facilities",
    ],
    description:
      "Colorado’s mix of corporate offices, research hubs, and healthcare systems requires janitorial partners who understand security, sustainability, and multi-tenant service expectations.",
  },
  Connecticut: {
    cities: ["Hartford", "New Haven", "Stamford", "Bridgeport"],
    industries: [
      "insurance",
      "financial services",
      "healthcare",
      "higher education",
    ],
    buildingTypes: [
      "corporate headquarters",
      "medical complexes",
      "university buildings",
      "historic office properties",
    ],
    description:
      "Connecticut’s corridor of financial, insurance, and healthcare institutions prioritizes image and compliance, making consistent commercial cleaning a board-level concern.",
  },
  Delaware: {
    cities: ["Wilmington", "Dover", "Newark"],
    industries: ["finance", "chemical manufacturing", "logistics", "healthcare"],
    buildingTypes: [
      "corporate offices",
      "research facilities",
      "distribution hubs",
      "medical offices",
    ],
    description:
      "Delaware’s concentration of financial and industrial operations demands high standards for cleanliness, safety, and regulatory readiness in every facility.",
  },
  Florida: {
    cities: ["Miami", "Orlando", "Tampa", "Jacksonville", "Fort Lauderdale"],
    industries: [
      "hospitality",
      "healthcare",
      "logistics",
      "professional services",
      "education",
    ],
    buildingTypes: [
      "office towers",
      "resort and conference facilities",
      "medical campuses",
      "logistics warehouses",
    ],
    description:
      "Florida’s blend of hospitality, healthcare, and logistics corridors means facilities face high traffic and strict appearance standards that only disciplined janitorial programs can sustain.",
    neighboringStates: ["Georgia", "Alabama"],
  },
  Georgia: {
    cities: ["Atlanta", "Savannah", "Augusta", "Columbus", "Athens"],
    industries: [
      "logistics",
      "corporate services",
      "healthcare",
      "higher education",
      "manufacturing",
    ],
    buildingTypes: [
      "downtown office towers",
      "distribution centers",
      "university campuses",
      "medical facilities",
    ],
    description:
      "Georgia’s role as a logistics and corporate hub makes clean, well-run facilities critical for brand perception and employee experience across the state.",
    neighboringStates: ["Alabama", "Florida", "South Carolina", "Tennessee"],
  },
  Hawaii: {
    cities: ["Honolulu", "Hilo", "Kailua"],
    industries: ["hospitality", "government", "healthcare", "education"],
    buildingTypes: [
      "resort properties",
      "government complexes",
      "medical centers",
      "campus facilities",
    ],
    description:
      "Hawaii’s hospitality-driven economy and public institutions depend on spotless facilities to maintain reputation and guest satisfaction in a highly competitive market.",
  },
  Idaho: {
    cities: ["Boise", "Meridian", "Nampa", "Idaho Falls"],
    industries: [
      "technology",
      "agriculture services",
      "healthcare",
      "manufacturing",
    ],
    buildingTypes: [
      "office campuses",
      "regional hospitals",
      "light industrial facilities",
    ],
    description:
      "Idaho’s growing business centers and healthcare networks need commercial cleaning partners who can match their pace of expansion with reliable, scalable service.",
  },
  Illinois: {
    cities: ["Chicago", "Aurora", "Naperville", "Rockford", "Joliet"],
    industries: [
      "finance",
      "logistics",
      "healthcare",
      "legal services",
      "manufacturing",
    ],
    buildingTypes: [
      "high-rise office buildings",
      "medical centers",
      "industrial facilities",
      "government properties",
    ],
    description:
      "Illinois—anchored by the Chicago metro—hosts dense clusters of office, healthcare, and industrial assets where professional janitorial operations are non-negotiable.",
  },
  Indiana: {
    cities: ["Indianapolis", "Fort Wayne", "Evansville", "South Bend"],
    industries: [
      "manufacturing",
      "logistics",
      "healthcare",
      "education",
      "professional services",
    ],
    buildingTypes: [
      "corporate offices",
      "light industrial buildings",
      "medical campuses",
      "university buildings",
    ],
    description:
      "Indiana’s mix of manufacturing, logistics, and service-sector offices requires adaptable cleaning programs that support both production and executive environments.",
  },
  Iowa: {
    cities: ["Des Moines", "Cedar Rapids", "Davenport", "Iowa City"],
    industries: [
      "insurance",
      "finance",
      "healthcare",
      "agriculture services",
      "education",
    ],
    buildingTypes: [
      "office towers",
      "regional hospitals",
      "university facilities",
      "government buildings",
    ],
    description:
      "Iowa’s financial, healthcare, and education sectors operate from campuses and office cores that rely on consistent janitorial support to deliver a safe, professional environment.",
  },
  Kansas: {
    cities: ["Wichita", "Overland Park", "Kansas City", "Topeka"],
    industries: [
      "aviation",
      "manufacturing",
      "healthcare",
      "government",
      "education",
    ],
    buildingTypes: [
      "office campuses",
      "industrial plants",
      "medical centers",
      "government facilities",
    ],
    description:
      "Kansas balances aviation, manufacturing, healthcare, and government operations, each with specialized cleaning requirements and expectations for reliability.",
  },
  Kentucky: {
    cities: ["Louisville", "Lexington", "Bowling Green", "Covington"],
    industries: [
      "manufacturing",
      "logistics",
      "healthcare",
      "education",
      "bourbon and food production",
    ],
    buildingTypes: [
      "corporate offices",
      "production facilities",
      "medical complexes",
      "campus buildings",
    ],
    description:
      "Kentucky’s distribution, manufacturing, and healthcare clusters rely on janitorial partners who can work safely in active, regulated environments.",
  },
  Louisiana: {
    cities: ["New Orleans", "Baton Rouge", "Lafayette", "Shreveport"],
    industries: [
      "energy",
      "port and logistics",
      "hospitality",
      "healthcare",
      "government",
    ],
    buildingTypes: [
      "office towers",
      "port facilities",
      "medical centers",
      "hospitality venues",
      "government complexes",
    ],
    description:
      "Louisiana’s energy, port, and hospitality operations depend on resilient janitorial providers that can support high-traffic facilities and strict safety standards.",
  },
  Maine: {
    cities: ["Portland", "Bangor", "Augusta"],
    industries: ["healthcare", "government", "education", "port logistics"],
    buildingTypes: [
      "medical campuses",
      "state buildings",
      "university facilities",
      "office properties",
    ],
    description:
      "Maine’s mix of healthcare, public sector, and regional business centers values consistent building care that protects staff and visitor experience year-round.",
  },
  Maryland: {
    cities: ["Baltimore", "Silver Spring", "Rockville", "Annapolis"],
    industries: [
      "government",
      "defense contracting",
      "healthcare",
      "biotech",
      "education",
    ],
    buildingTypes: [
      "federal and state buildings",
      "research campuses",
      "medical centers",
      "office complexes",
    ],
    description:
      "Maryland’s federal, defense, and healthcare footprint requires janitorial partners with strong processes, clear security protocols, and attention to detail.",
  },
  Massachusetts: {
    cities: ["Boston", "Cambridge", "Worcester", "Springfield"],
    industries: [
      "technology",
      "biotech",
      "education",
      "finance",
      "healthcare",
    ],
    buildingTypes: [
      "research labs",
      "university campuses",
      "hospital networks",
      "financial district offices",
    ],
    description:
      "Massachusetts is defined by innovation, higher education, and healthcare, all of which operate in environments that demand immaculate cleanliness and strict protocols.",
  },
  Michigan: {
    cities: ["Detroit", "Grand Rapids", "Ann Arbor", "Lansing"],
    industries: [
      "automotive",
      "advanced manufacturing",
      "healthcare",
      "education",
    ],
    buildingTypes: [
      "corporate offices",
      "R&D facilities",
      "industrial plants",
      "medical campuses",
    ],
    description:
      "Michigan’s evolving mix of manufacturing, R&D, and service-sector offices relies on flexible janitorial programs that understand both production floors and executive suites.",
  },
  Minnesota: {
    cities: ["Minneapolis", "Saint Paul", "Rochester", "Bloomington"],
    industries: [
      "medical technology",
      "healthcare",
      "finance",
      "retail headquarters",
      "education",
    ],
    buildingTypes: [
      "corporate campuses",
      "medical and research centers",
      "office towers",
      "university facilities",
    ],
    description:
      "Minnesota’s healthcare and corporate headquarters clusters demand meticulous, reliable commercial cleaning to protect brand reputation and patient safety.",
  },
  Mississippi: {
    cities: ["Jackson", "Gulfport", "Biloxi", "Hattiesburg"],
    industries: [
      "manufacturing",
      "logistics",
      "healthcare",
      "government",
      "hospitality",
    ],
    buildingTypes: [
      "government buildings",
      "regional hospitals",
      "industrial facilities",
      "office properties",
    ],
    description:
      "Mississippi’s industrial, healthcare, and government facilities depend on consistent janitorial coverage to support safety, compliance, and professional image.",
  },
  Missouri: {
    cities: ["St. Louis", "Kansas City", "Springfield", "Columbia"],
    industries: [
      "healthcare",
      "logistics",
      "manufacturing",
      "higher education",
      "professional services",
    ],
    buildingTypes: [
      "downtown office towers",
      "medical campuses",
      "industrial parks",
      "university facilities",
    ],
    description:
      "Missouri bridges logistics, healthcare, and education, creating steady demand for janitorial teams who can support complex, multi-building portfolios.",
  },
  Montana: {
    cities: ["Billings", "Missoula", "Bozeman"],
    industries: ["healthcare", "education", "energy", "government"],
    buildingTypes: [
      "medical centers",
      "university campuses",
      "government buildings",
      "office properties",
    ],
    description:
      "Montana’s regional business centers and institutional campuses rely on trusted janitorial partners who can deliver consistent quality across large footprints.",
  },
  Nebraska: {
    cities: ["Omaha", "Lincoln", "Bellevue", "Grand Island"],
    industries: [
      "finance",
      "insurance",
      "logistics",
      "healthcare",
      "education",
    ],
    buildingTypes: [
      "corporate offices",
      "call centers",
      "medical campuses",
      "campus facilities",
    ],
    description:
      "Nebraska’s finance, logistics, and healthcare sectors rely on stable janitorial support to keep operations efficient and client-facing spaces immaculate.",
  },
  Nevada: {
    cities: ["Las Vegas", "Reno", "Henderson", "Sparks"],
    industries: [
      "hospitality",
      "gaming",
      "logistics",
      "data centers",
      "healthcare",
    ],
    buildingTypes: [
      "resort properties",
      "class A offices",
      "medical centers",
      "distribution hubs",
    ],
    description:
      "Nevada’s hospitality-driven economy runs on 24/7 operations, requiring responsive janitorial teams who can maintain immaculate, guest-ready facilities at scale.",
  },
  "New Hampshire": {
    cities: ["Manchester", "Nashua", "Concord"],
    industries: ["manufacturing", "healthcare", "education", "technology"],
    buildingTypes: [
      "office properties",
      "industrial facilities",
      "medical centers",
      "campus buildings",
    ],
    description:
      "New Hampshire’s manufacturing and service economies rely on professional cleaning to protect staff, students, and visitors in high-use facilities.",
  },
  "New Jersey": {
    cities: ["Newark", "Jersey City", "Princeton", "Edison"],
    industries: [
      "pharmaceuticals",
      "logistics",
      "finance",
      "healthcare",
      "education",
    ],
    buildingTypes: [
      "research labs",
      "corporate campuses",
      "medical centers",
      "class A offices",
    ],
    description:
      "New Jersey’s pharmaceutical, logistics, and corporate corridors require disciplined janitorial programs that align with strict regulatory expectations.",
  },
  "New Mexico": {
    cities: ["Albuquerque", "Santa Fe", "Las Cruces", "Rio Rancho"],
    industries: [
      "government",
      "research",
      "healthcare",
      "energy",
      "education",
    ],
    buildingTypes: [
      "government campuses",
      "research facilities",
      "medical centers",
      "office buildings",
    ],
    description:
      "New Mexico’s blend of research, government, and healthcare facilities values janitorial partners who understand security and specialized cleaning needs.",
  },
  "New York": {
    cities: ["New York City", "Buffalo", "Rochester", "Albany", "Syracuse"],
    industries: [
      "finance",
      "media",
      "technology",
      "healthcare",
      "legal and professional services",
    ],
    buildingTypes: [
      "high-rise office towers",
      "medical campuses",
      "media production spaces",
      "institutional buildings",
    ],
    description:
      "New York’s global business centers and institutional campuses demand white-glove commercial cleaning that aligns with world-class brand expectations.",
  },
  "North Carolina": {
    cities: ["Charlotte", "Raleigh", "Durham", "Greensboro"],
    industries: [
      "banking",
      "technology",
      "biotech",
      "logistics",
      "education",
    ],
    buildingTypes: [
      "uptown office towers",
      "research campuses",
      "medical centers",
      "university facilities",
    ],
    description:
      "North Carolina’s banking, tech, and life sciences corridors rely on janitorial teams who understand high-security and high-sensitivity environments.",
  },
  "North Dakota": {
    cities: ["Fargo", "Bismarck", "Grand Forks"],
    industries: ["energy", "healthcare", "education", "agriculture services"],
    buildingTypes: [
      "medical centers",
      "campus buildings",
      "office properties",
      "industrial facilities",
    ],
    description:
      "North Dakota’s healthcare and energy operations require reliable janitorial support to keep complex facilities clean, safe, and compliant.",
  },
  Ohio: {
    cities: ["Columbus", "Cleveland", "Cincinnati", "Toledo", "Akron"],
    industries: [
      "healthcare",
      "finance",
      "manufacturing",
      "education",
      "logistics",
    ],
    buildingTypes: [
      "office towers",
      "hospital networks",
      "industrial parks",
      "campus facilities",
    ],
    description:
      "Ohio’s healthcare, manufacturing, and service hubs rely on scalable janitorial programs that can support both corporate and industrial environments.",
  },
  Oklahoma: {
    cities: ["Oklahoma City", "Tulsa", "Norman", "Broken Arrow"],
    industries: ["energy", "aerospace", "healthcare", "government"],
    buildingTypes: [
      "office buildings",
      "industrial facilities",
      "medical centers",
      "public buildings",
    ],
    description:
      "Oklahoma’s energy and aerospace sectors are supported by office, industrial, and public facilities where clean, safe environments are mission-critical.",
  },
  Oregon: {
    cities: ["Portland", "Eugene", "Salem", "Beaverton"],
    industries: [
      "technology",
      "manufacturing",
      "logistics",
      "healthcare",
      "education",
    ],
    buildingTypes: [
      "corporate campuses",
      "manufacturing facilities",
      "medical centers",
      "university buildings",
    ],
    description:
      "Oregon’s tech, manufacturing, and logistics operations require janitorial partners who can balance sustainability goals with stringent cleanliness standards.",
  },
  Pennsylvania: {
    cities: ["Philadelphia", "Pittsburgh", "Harrisburg", "Allentown"],
    industries: [
      "healthcare",
      "education",
      "finance",
      "manufacturing",
      "government",
    ],
    buildingTypes: [
      "hospital networks",
      "university campuses",
      "office towers",
      "government complexes",
    ],
    description:
      "Pennsylvania’s healthcare, education, and government institutions rely on long-term janitorial partners to keep extensive building portfolios running smoothly.",
  },
  "Rhode Island": {
    cities: ["Providence", "Warwick", "Cranston"],
    industries: ["healthcare", "education", "manufacturing", "government"],
    buildingTypes: [
      "medical centers",
      "university buildings",
      "government facilities",
      "office properties",
    ],
    description:
      "Rhode Island’s institutional and manufacturing base requires consistent commercial cleaning to support staff, students, and visitors.",
  },
  "South Carolina": {
    cities: ["Columbia", "Charleston", "Greenville", "Spartanburg"],
    industries: [
      "manufacturing",
      "logistics",
      "hospitality",
      "healthcare",
      "education",
    ],
    buildingTypes: [
      "industrial facilities",
      "distribution centers",
      "hospital campuses",
      "office properties",
    ],
    description:
      "South Carolina’s manufacturing and hospitality corridors depend on reliable cleaning teams to protect both production floors and guest-facing environments.",
  },
  "South Dakota": {
    cities: ["Sioux Falls", "Rapid City", "Aberdeen"],
    industries: ["healthcare", "finance", "education", "government"],
    buildingTypes: [
      "medical centers",
      "office properties",
      "campus buildings",
      "public facilities",
    ],
    description:
      "South Dakota’s healthcare and finance sectors operate from regional hubs where professional janitorial support is crucial for smooth daily operations.",
  },
  Tennessee: {
    cities: ["Nashville", "Memphis", "Knoxville", "Chattanooga"],
    industries: [
      "healthcare",
      "music and entertainment",
      "logistics",
      "manufacturing",
    ],
    buildingTypes: [
      "medical campuses",
      "office towers",
      "distribution facilities",
      "industrial plants",
    ],
    description:
      "Tennessee’s healthcare, logistics, and entertainment centers rely on experienced janitorial teams who can support busy, high-profile facilities.",
  },
  Texas: {
    cities: ["Houston", "Dallas", "Austin", "San Antonio", "Fort Worth"],
    industries: [
      "energy",
      "technology",
      "healthcare",
      "logistics",
      "finance",
    ],
    buildingTypes: [
      "corporate campuses",
      "medical centers",
      "industrial facilities",
      "office towers",
    ],
    description:
      "Texas combines global energy headquarters, fast-growing tech hubs, and extensive healthcare networks—each expecting janitorial partners who can deliver at enterprise scale.",
    neighboringStates: ["Oklahoma", "Louisiana", "New Mexico"],
  },
  Utah: {
    cities: ["Salt Lake City", "Provo", "Ogden", "Lehi"],
    industries: [
      "technology",
      "finance",
      "logistics",
      "healthcare",
      "education",
    ],
    buildingTypes: [
      "tech campuses",
      "office towers",
      "medical centers",
      "distribution hubs",
    ],
    description:
      "Utah’s tech corridor and financial services sectors operate from modern campuses that expect high-caliber, consistent janitorial support.",
  },
  Vermont: {
    cities: ["Burlington", "Montpelier", "Rutland"],
    industries: ["healthcare", "education", "government", "professional services"],
    buildingTypes: [
      "medical centers",
      "campus buildings",
      "government facilities",
      "office properties",
    ],
    description:
      "Vermont’s institutional and professional services economy requires reliable cleaning coverage across hospitals, campuses, and civic buildings.",
  },
  Virginia: {
    cities: ["Richmond", "Virginia Beach", "Arlington", "Tysons"],
    industries: [
      "government",
      "defense contracting",
      "technology",
      "healthcare",
      "finance",
    ],
    buildingTypes: [
      "federal and state complexes",
      "office towers",
      "medical centers",
      "data centers",
    ],
    description:
      "Virginia’s dense network of government, defense, and technology facilities depends on janitorial teams who can meet strict security and quality standards.",
  },
  Washington: {
    cities: ["Seattle", "Spokane", "Tacoma", "Bellevue"],
    industries: [
      "technology",
      "logistics",
      "healthcare",
      "aerospace",
      "professional services",
    ],
    buildingTypes: [
      "tech campuses",
      "downtown offices",
      "medical centers",
      "industrial facilities",
    ],
    description:
      "Washington’s tech, logistics, and aerospace sectors operate from sophisticated facilities where professional janitorial programs are essential.",
  },
  "West Virginia": {
    cities: ["Charleston", "Morgantown", "Huntington"],
    industries: ["healthcare", "energy", "education", "government"],
    buildingTypes: [
      "medical centers",
      "campus facilities",
      "government buildings",
      "office properties",
    ],
    description:
      "West Virginia’s healthcare, education, and energy sectors rely on consistent janitorial partners to protect staff safety and visitor confidence.",
  },
  Wisconsin: {
    cities: ["Milwaukee", "Madison", "Green Bay", "Appleton"],
    industries: [
      "manufacturing",
      "healthcare",
      "education",
      "financial services",
    ],
    buildingTypes: [
      "industrial facilities",
      "office properties",
      "medical campuses",
      "university buildings",
    ],
    description:
      "Wisconsin’s manufacturing and institutional base requires janitorial teams who can service both production environments and executive offices with equal consistency.",
  },
  Wyoming: {
    cities: ["Cheyenne", "Casper", "Laramie"],
    industries: ["energy", "government", "education", "tourism"],
    buildingTypes: [
      "government buildings",
      "industrial facilities",
      "campus properties",
      "office spaces",
    ],
    description:
      "Wyoming’s government, education, and energy facilities rely on dependable janitorial partners to support long-term building performance and occupant comfort.",
  },
};

type FaqItem = {
  question: string;
  answer: string;
};

function getStateMarketData(stateName: string): StateMarketData {
  if (STATE_MARKET_DATA[stateName]) return STATE_MARKET_DATA[stateName];

  return {
    cities: [`${stateName} City`, `Greater ${stateName} Metro`],
    industries: [
      "professional services",
      "healthcare",
      "education",
      "light industrial",
    ],
    buildingTypes: [
      "multi-tenant office buildings",
      "medical offices",
      "campus facilities",
      "industrial properties",
    ],
    description: `The commercial economy in ${stateName} spans offices, healthcare facilities, education campuses, and light industrial properties, all of which rely on dependable janitorial partners.`,
  };
}

function getFaqItems(stateName: string): FaqItem[] {
  return [
    {
      question: `How do commercial cleaning leads in ${stateName} work?`,
      answer: `We build targeted outreach campaigns into decision-makers at offices, medical practices, industrial facilities, and other commercial properties in ${stateName}. Each opportunity is qualified for budget, scope, and timing before we ever book a meeting, so every conversation on your calendar is a serious discussion about hiring a new janitorial partner in ${stateName}.`,
    },
    {
      question: `What makes your ${stateName} janitorial appointment setting different?`,
      answer: `Instead of sending shared lists or low-intent web form inquiries, we operate as a dedicated appointment setting team for your janitorial company in ${stateName}. We speak the language of facility management, map the buying process, confirm who signs the contract, and only schedule appointments when key stakeholders in ${stateName} are prepared to review proposals.`,
    },
    {
      question: `What types of commercial facilities in ${stateName} do you target?`,
      answer: `We tailor each campaign to the commercial facilities in ${stateName} that match your ideal client profile—whether that is multi-story office buildings, medical campuses, industrial parks, logistics hubs, or institutional properties. During onboarding we document your preferred industries, square footage ranges, and service mix so every lead reflects the janitorial contracts you most want to win in ${stateName}.`,
    },
    {
      question: `How many janitorial leads can I expect each month in ${stateName}?`,
      answer: `Lead volume in ${stateName} depends on your selected plan, the service radius you want to cover, competition within your market, and the specific facility types you focus on. During strategy setup we create a realistic forecast for your ${stateName} territory, then refine the campaign each month based on performance data and your closed-won deals.`,
    },
    {
      question: `Are the commercial cleaning leads in ${stateName} exclusive to our company?`,
      answer: `Yes. Every commercial cleaning lead and appointment we generate in ${stateName} is exclusive to your company. We do not resell lists or send the same opportunity to multiple janitorial providers in ${stateName}, so you can invest confidently in long-term client relationships without worrying about competing against other vendors we work with.`,
    },
    {
      question: `Can you support multi-location cleaning contracts across ${stateName}?`,
      answer: `We regularly work with janitorial companies that manage multi-location portfolios across ${stateName}. Our team can prioritize regional and statewide accounts, coordinate appointments with centralized decision-makers, and ensure your pipeline includes the kind of multi-site opportunities that support long-term, recurring revenue growth.`,
    },
  ];
}

export default async function CommercialCleaningLeadsStatePage({
  params,
}: Props) {
  const { state: stateSlug } = await params;
  const stateName = slugToState(stateSlug);
  const stateQueryValues = getStateQueryValues(stateName);
  const marketData = getStateMarketData(stateName);

  const stateFilter = { state: { in: stateQueryValues } };

  const [leads, totalCount] = await Promise.all([
    prisma.lead.findMany({
      where: stateFilter,
      orderBy: { createdAt: "desc" },
      take: 25,
      select: {
        id: true,
        title: true,
        city: true,
        state: true,
        leadQuality: true,
        facilityType: true,
      },
    }),
    prisma.lead.count({ where: stateFilter }),
  ]);

  const highQualityCount = await prisma.lead.count({
    where: { ...stateFilter, leadQuality: "HIGH" },
  });

  const statePageUrl = buildCanonical(`/commercial-cleaning-leads/${stateSlug}`);
  const serviceJsonLd = getServiceJsonLd({
    name: `Commercial Cleaning Lead Generation in ${stateName}`,
    description: `Pre-qualified commercial cleaning leads and janitorial appointments for ${stateName}. We book meetings with decision-makers so you can close more contracts.`,
    url: statePageUrl,
    areaServed: stateName,
  });
  const breadcrumbJsonLd = getBreadcrumbJsonLd([
    { name: SITE_NAME, path: "" },
    { name: "Commercial Cleaning Leads", path: "/commercial-cleaning-leads" },
    { name: stateName, path: `/commercial-cleaning-leads/${stateSlug}` },
  ]);

  const faqItems = getFaqItems(stateName);
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  const neighboringStateLinks =
    marketData.neighboringStates?.map((neighbor) => ({
      name: neighbor,
      href: `/commercial-cleaning-leads/${neighbor
        .toLowerCase()
        .replace(/\s+/g, "-")}`,
    })) ?? [];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <main id="main-content">
        <HeroSub
          title={`Commercial Cleaning Leads in ${stateName}`}
          description={`Get exclusive ${stateName} janitorial leads, pre-qualified office cleaning appointments, and commercial cleaning contracts booked directly on your calendar.`}
        />

        {/* Intro + market overview */}
        <section
          className="dark:bg-darkmode py-12 md:py-16"
          aria-labelledby="commercial-cleaning-market"
        >
          <div className="container">
            <header className="max-w-4xl mx-auto flex flex-col gap-4 text-base md:text-lg text-SlateBlue dark:text-darktext">
              <h2
                id="commercial-cleaning-market"
                className="text-2xl md:text-3xl font-bold text-secondary dark:text-white"
              >
                Commercial Cleaning Market in {stateName}
              </h2>
              <p>{marketData.description}</p>
              <p>
                In and around{" "}
                <strong className="text-secondary dark:text-white">
                  {marketData.cities.slice(0, 3).join(", ")}
                </strong>
                , facility and property managers oversee portfolios that include{" "}
                <strong className="font-semibold">
                  {marketData.buildingTypes.slice(0, 3).join(", ")}
                </strong>
                . They are under constant pressure to maintain clean, compliant,
                and client-ready spaces while controlling operating costs.
              </p>
              <p>
                Our role is to help janitorial companies in {stateName} step
                directly into those conversations with{" "}
                <strong className="font-semibold">
                  pre-qualified commercial cleaning and janitorial leads
                </strong>
                —decision-makers who are actively evaluating new vendors and
                ready to discuss contracts, not just pricing.
              </p>
            </header>
          </div>
        </section>

        {/* Appointment setting H2 */}
        <section
          className="dark:bg-darklight py-16 md:py-20"
          aria-labelledby="janitorial-appointment-setting"
        >
          <div className="container">
            <h2
              id="janitorial-appointment-setting"
              className="text-2xl md:text-3xl font-bold text-secondary dark:text-white mb-4"
            >
              {stateName} Janitorial Appointment Setting Services
            </h2>
            <div className="grid gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(0,1.2fr)] items-start">
              <div className="flex flex-col gap-5 text-base md:text-lg text-SlateBlue dark:text-darktext">
                <p>
                  Our janitorial appointment setting team acts as a senior sales
                  development function for your company in {stateName}. We
                  research ideal accounts, reach out to decision-makers, and
                  position your services as a strategic solution rather than
                  just another cleaning quote.
                </p>
                <p>
                  Every outreach sequence is tailored to the{" "}
                  <strong className="font-semibold">
                    commercial facilities in {stateName}
                  </strong>{" "}
                  you want to serve, using language that resonates with
                  facilities directors, property managers, and operations
                  leaders.
                </p>
                <ul className="list-disc list-inside flex flex-col gap-2">
                  <li>
                    Dedicated outbound campaigns into high-value buildings in{" "}
                    {marketData.cities[0]} and surrounding markets
                  </li>
                  <li>
                    Discovery calls that surface current pain points with
                    existing janitorial vendors
                  </li>
                  <li>
                    Qualification based on scope, budget, timing, and decision
                    process
                  </li>
                  <li>
                    Calendar-ready appointments with stakeholders who can sign
                    multi-year contracts in {stateName}
                  </li>
                </ul>
              </div>
              <aside className="rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-darkmode p-6 flex flex-col gap-4">
                <h3 className="text-lg font-semibold text-secondary dark:text-white">
                  From first touch to booked meeting
                </h3>
                <p className="text-sm text-SlateBlue dark:text-darktext">
                  We manage the entire janitorial lead generation and appointment
                  setting workflow in {stateName}, so your best salespeople can
                  focus on closing contracts instead of chasing unqualified
                  inquiries.
                </p>
                <p className="text-sm text-SlateBlue dark:text-darktext">
                  You can deploy us as a standalone{" "}
                  <Link
                    href="/janitorial-lead-generation"
                    className="text-primary hover:underline"
                  >
                    janitorial lead generation program
                  </Link>{" "}
                  in {stateName} or plug us into the sales process you already
                  run with your internal team.
                </p>
              </aside>
            </div>
          </div>
        </section>

        {/* Leads + table H2 */}
        <section
          className="dark:bg-darkmode py-16 md:py-20"
          aria-labelledby="prequalified-leads"
        >
          <div className="container">
            <h2
              id="prequalified-leads"
              className="text-2xl md:text-3xl font-bold text-secondary dark:text-white mb-4"
            >
              Pre-Qualified Janitorial Leads &amp; Office Cleaning Leads in{" "}
              {stateName}
            </h2>
            <p className="text-SlateBlue dark:text-darktext mb-8 max-w-3xl text-base md:text-lg">
              {totalCount > 0 ? (
                <>
                  We currently have{" "}
                  <strong className="text-secondary dark:text-white">
                    {totalCount}
                  </strong>{" "}
                  commercial cleaning and janitorial lead
                  {totalCount !== 1 ? "s" : ""} in {stateName}
                  {highQualityCount > 0 && (
                    <>
                      , including{" "}
                      <strong className="text-primary">
                        {highQualityCount}
                      </strong>{" "}
                      high-priority opportunit
                      {highQualityCount !== 1 ? "ies" : "y"}
                    </>
                  )}
                  . Choose a plan below to unlock exclusive access and have our
                  team book appointments directly with decision-makers.
                </>
              ) : (
                <>
                  Be the first to receive commercial cleaning and janitorial
                  leads in {stateName}. When you come on board, we immediately
                  launch campaigns into your ideal accounts and start booking
                  office cleaning appointments as soon as qualified demand is
                  identified.
                </>
              )}
            </p>

            {leads.length > 0 && (
              <div className="rounded-xl border border-gray-200 dark:border-white/10 overflow-hidden bg-white dark:bg-darkmode">
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5">
                        <th className="px-4 py-3 text-sm font-semibold text-secondary dark:text-white">
                          Lead
                        </th>
                        <th className="px-4 py-3 text-sm font-semibold text-secondary dark:text-white">
                          City
                        </th>
                        <th className="px-4 py-3 text-sm font-semibold text-secondary dark:text-white">
                          State
                        </th>
                        <th className="px-4 py-3 text-sm font-semibold text-secondary dark:text-white">
                          Facility type
                        </th>
                        <th className="px-4 py-3 text-sm font-semibold text-secondary dark:text-white">
                          Quality
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {leads.map((lead) => (
                        <tr
                          key={lead.id}
                          className="border-b border-gray-100 dark:border-white/5 last:border-0 hover:bg-gray-50/50 dark:hover:bg-white/5"
                        >
                          <td className="px-4 py-3 text-sm font-medium text-secondary dark:text-white">
                            <Link
                              href={`/commercial-cleaning-leads/${stateSlug}/${lead.id}`}
                              className="hover:text-primary hover:underline"
                            >
                              {lead.title}
                            </Link>
                          </td>
                          <td className="px-4 py-3 text-sm text-SlateBlue dark:text-darktext">
                            {lead.city ?? "—"}
                          </td>
                          <td className="px-4 py-3 text-sm text-SlateBlue dark:text-darktext">
                            {lead.state ?? stateName}
                          </td>
                          <td className="px-4 py-3 text-sm text-SlateBlue dark:text-darktext">
                            {lead.facilityType ?? "—"}
                          </td>
                          <td className="px-4 py-3">
                            <span
                              className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${lead.leadQuality === "HIGH"
                                ? "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300"
                                : lead.leadQuality === "MODERATE"
                                  ? "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300"
                                  : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                                }`}
                            >
                              {lead.leadQuality}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {totalCount > leads.length && (
                  <p className="px-4 py-3 text-sm text-SlateBlue dark:text-darktext border-t border-gray-100 dark:border-white/5">
                    Showing the latest 25 of {totalCount} commercial cleaning
                    and janitorial leads in {stateName}. Get full access with a
                    plan below.
                  </p>
                )}
              </div>
            )}
          </div>
        </section>

        {/* Lead gen process H2 */}
        <section
          className="dark:bg-darklight py-16 md:py-20"
          aria-labelledby="lead-generation-process"
        >
          <div className="container">
            <h2
              id="lead-generation-process"
              className="text-2xl md:text-3xl font-bold text-secondary dark:text-white mb-6"
            >
              How Our Janitorial Lead Generation Process Works
            </h2>
            <div className="grid gap-10 lg:grid-cols-2">
              <div className="flex flex-col gap-5 text-base md:text-lg text-SlateBlue dark:text-darktext">
                <p>
                  We combine market data, outbound sales expertise, and
                  industry-specific messaging to build a repeatable janitorial
                  lead generation engine for your {stateName} territory. Every
                  step is designed to protect your brand while filling your
                  pipeline with contract-ready opportunities.
                </p>
                <ol className="list-decimal list-inside flex flex-col gap-3">
                  <li>
                    <strong className="font-semibold">
                      Strategy and ideal client profile.
                    </strong>{" "}
                    We define your target verticals, contract values, and
                    service mix in {stateName}, then align messaging to the
                    expectations of local decision-makers.
                  </li>
                  <li>
                    <strong className="font-semibold">
                      Prospect list development.
                    </strong>{" "}
                    Our research team sources verified contacts at high-value
                    commercial facilities in{" "}
                    {marketData.cities.slice(0, 3).join(", ")} and surrounding
                    areas, including direct lines to facility and property
                    managers.
                  </li>
                  <li>
                    <strong className="font-semibold">
                      Multi-channel outreach.
                    </strong>{" "}
                    We combine phone, email, and social touchpoints to start
                    quality conversations, always positioning your brand as a
                    consultative partner—not a discount bidder.
                  </li>
                  <li>
                    <strong className="font-semibold">
                      Qualification and appointment setting.
                    </strong>{" "}
                    Only when we confirm fit, intent, and timing do we book a
                    meeting on your calendar with stakeholders ready to discuss
                    janitorial services in {stateName}.
                  </li>
                </ol>
                <p>
                  Throughout the campaign, you receive transparent reporting on
                  activity, pipeline, and conversion rates, so you can see
                  exactly how your investment in janitorial lead generation is
                  performing in {stateName}.
                </p>
              </div>
              <div className="flex flex-col gap-6">
                <article className="rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-darkmode p-6">
                  <h3 className="text-lg font-semibold text-secondary dark:text-white mb-2">
                    Seamless handoff to your sales team
                  </h3>
                  <p className="text-sm text-SlateBlue dark:text-darktext">
                    We include detailed notes on each appointment—scope, facility
                    type, square footage, budget, and timing—so your team can
                    step into the meeting prepared with a relevant proposal for
                    that specific property in {stateName}.
                  </p>
                </article>
                <article className="rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-darkmode p-6">
                  <h3 className="text-lg font-semibold text-secondary dark:text-white mb-2">
                    Continuous optimization
                  </h3>
                  <p className="text-sm text-SlateBlue dark:text-darktext">
                    We review closed-won and closed-lost deals with you to
                    refine targeting, messaging, and qualification criteria,
                    ensuring we keep improving lead quality in {stateName} over
                    time.
                  </p>
                </article>
              </div>
            </div>
          </div>
        </section>

        {/* Major cities H2 */}
        <section
          className="dark:bg-darkmode py-16 md:py-20"
          aria-labelledby="major-cities-served"
        >
          <div className="container">
            <h2
              id="major-cities-served"
              className="text-2xl md:text-3xl font-bold text-secondary dark:text-white mb-6"
            >
              Major Cities We Serve in {stateName}
            </h2>
            <div className="grid gap-8 md:grid-cols-2 text-base md:text-lg text-SlateBlue dark:text-darktext">
              <div className="flex flex-col gap-4">
                <p>
                  Our janitorial lead generation campaigns cover the major
                  business centers across {stateName}, including:
                </p>
                <ul className="list-disc list-inside flex flex-col gap-1">
                  {marketData.cities.map((city) => (
                    <li key={city}>{city}</li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col gap-4">
                <p>
                  Within each city, we can prioritize the districts and
                  submarkets that matter most to your janitorial company—central
                  business districts, medical corridors, industrial parks, or
                  fast-growing suburban office clusters.
                </p>
                <p>
                  If your team already has an established footprint in one or
                  more of these cities, we can build campaigns that layer on top
                  of your brand awareness to accelerate appointment volume and
                  contract wins.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Industries H2 */}
        <section
          className="dark:bg-darklight py-16 md:py-20"
          aria-labelledby="industries-we-target"
        >
          <div className="container">
            <h2
              id="industries-we-target"
              className="text-2xl md:text-3xl font-bold text-secondary dark:text-white mb-6"
            >
              Industries We Target in {stateName}
            </h2>
            <p className="text-base md:text-lg text-SlateBlue dark:text-darktext mb-6 max-w-3xl">
              Every market has its own mix of industries and property types. We
              design your campaigns around the{" "}
              <strong className="font-semibold">
                commercial facilities in {stateName}
              </strong>{" "}
              where you can deliver the most value and win profitable,
              long-term contracts.
            </p>
            <div className="grid gap-6 md:grid-cols-3 text-sm text-SlateBlue dark:text-darktext">
              <ul className="flex flex-col gap-2">
                {marketData.industries.slice(0, 5).map((industry) => (
                  <li key={industry}>{industry}</li>
                ))}
              </ul>
              <ul className="flex flex-col gap-2">
                {marketData.buildingTypes.slice(0, 4).map((type) => (
                  <li key={type}>{type}</li>
                ))}
              </ul>
              <ul className="flex flex-col gap-2">
                <li>
                  Multi-tenant office buildings and corporate headquarters in{" "}
                  {stateName}
                </li>
                <li>
                  Regional medical centers and specialty outpatient facilities
                </li>
                <li>
                  Education, municipal, and other institutional properties across{" "}
                  {stateName}
                </li>
                <li>
                  High-traffic commercial properties that require consistent
                  daily cleaning
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Why choose us H2 */}
        <section
          className="dark:bg-darkmode py-16 md:py-20"
          aria-labelledby="why-choose-us"
        >
          <div className="container">
            <h2
              id="why-choose-us"
              className="text-2xl md:text-3xl font-bold text-secondary dark:text-white mb-6"
            >
              Why Cleaning Companies in {stateName} Choose Us
            </h2>
            <div className="grid gap-8 lg:grid-cols-3 flex flex-col gap-2">
              <article className="rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-darklight p-6 flex flex-col gap-2">
                <h3 className="text-lg font-semibold text-secondary dark:text-white">
                  Built for premium B2B sales
                </h3>
                <p className="text-sm text-SlateBlue dark:text-darktext">
                  Our messaging, scripts, and processes are designed for
                  high-value commercial contracts—not low-margin, transactional
                  work—so your brand attracts the right kind of clients in{" "}
                  {stateName}.
                </p>
              </article>
              <article className="rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-darklight p-6 flex flex-col gap-2">
                <h3 className="text-lg font-semibold text-secondary dark:text-white">
                  Market-specific targeting
                </h3>
                <p className="text-sm text-SlateBlue dark:text-darktext">
                  We customize campaigns to the realities of {stateName}
                  &apos;s business landscape—from dense urban corridors to
                  regional hubs—so your pipeline reflects the opportunities that
                  fit your operations.
                </p>
              </article>
              <article className="rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-darklight p-6 flex flex-col gap-2">
                <h3 className="text-lg font-semibold text-secondary dark:text-white">
                  Partnership, not a vendor
                </h3>
                <p className="text-sm text-SlateBlue dark:text-darktext">
                  We collaborate with your leadership team, share insights from
                  hundreds of conversations with buyers, and act as a strategic
                  growth partner for your janitorial brand in {stateName}.
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* Plans / CTA */}
        <section className="dark:bg-darklight py-16 md:py-20">
          <div className="container">
            <Preferred />
          </div>
        </section>

        {/* FAQ H2 + schema-backed content */}
        <section
          className="dark:bg-darkmode py-16 md:py-20"
          aria-labelledby="faq-janitorial-leads"
        >
          <div className="container max-w-4xl">
            <h2
              id="faq-janitorial-leads"
              className="text-2xl md:text-3xl font-bold text-secondary dark:text-white mb-6"
            >
              Frequently Asked Questions About Janitorial Leads in {stateName}
            </h2>
            <div className="flex flex-col gap-6">
              {faqItems.map((item) => (
                <article
                  key={item.question}
                  className="rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-darkmode p-6"
                >
                  <h3 className="text-lg font-semibold text-secondary dark:text-white mb-2">
                    {item.question}
                  </h3>
                  <p className="text-sm md:text-base text-SlateBlue dark:text-darktext">
                    {item.answer}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Global + internal links */}
        <section className="dark:bg-darklight py-12 pb-20">
          <div className="container text-center flex flex-col gap-4">
            <p className="text-SlateBlue dark:text-darktext">
              Serving commercial cleaning companies across all 50 states,
              including {stateName}.
            </p>
            <p className="text-SlateBlue dark:text-darktext">
              Explore our{" "}
              <Link
                href="/janitorial-lead-generation"
                className="text-primary dark:text-lightPrimary font-medium hover:underline"
              >
                janitorial lead generation services
              </Link>{" "}
              or browse our latest{" "}
              <Link
                href="/blog"
                className="text-primary dark:text-lightPrimary font-medium hover:underline"
              >
                janitorial sales and marketing insights
              </Link>
              .
            </p>
            {neighboringStateLinks.length > 0 && (
              <p className="text-sm text-SlateBlue dark:text-darktext">
                You can also explore nearby markets such as{" "}
                {neighboringStateLinks.map((neighbor, index) => (
                  <span key={neighbor.href}>
                    {index > 0 && (index === neighboringStateLinks.length - 1 ? " and " : ", ")}
                    <Link
                      href={neighbor.href}
                      className="text-primary dark:text-lightPrimary font-medium hover:underline"
                    >
                      {neighbor.name}
                    </Link>
                  </span>
                ))}
                .
              </p>
            )}
            <p className="text-SlateBlue dark:text-darktext">
              Prefer to browse by geography?{" "}
              <Link
                href="/commercial-cleaning-leads"
                className="text-primary dark:text-lightPrimary font-medium hover:underline inline-flex items-center justify-center"
              >
                View all commercial cleaning leads by state
              </Link>
              .
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
