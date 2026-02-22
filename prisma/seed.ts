import { PrismaClient, LeadQuality } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    await prisma.lead.createMany({
        data: [
            {
                title: "Downtown Coworking Hub",
                location: "Decatur Business District",
                city: "Decatur",
                state: "GA",
                facilityType: "Coworking Space",
                leadQuality: LeadQuality.MODERATE,
                opportunityLevel: "Moderate Opportunity",
                conversionProbability: "55%",

                cleaningStatus: "Light weekly cleaning",
                currentHelp: "1 cleaner once per week",
                desiredFrequency: "3x per week",
                decisionMaker: "Operations Manager",
                primaryContact: "Sarah Mitchell",

                upstairsRooms: 6,
                downstairsDescription: "Open desk layout + reception",
                hasConferenceRooms: true,
                hasPrivateOffices: true,

                walkthroughScheduled: true,
                walkthroughDate: new Date("2026-02-28"),

                buyingSignals: [
                    "Mentioned dissatisfaction with current cleaner"
                ],
                riskFactors: ["Budget sensitive"],

                estimatedMinValue: 1200,
                estimatedMaxValue: 2000,

                opportunityAnalysis:
                    "Strong mid-tier opportunity."
            },
            {
                title: "Downtown Coworking Hub",
                location: "Decatur Business District",
                city: "Decatur",
                state: "GA",
                facilityType: "Coworking Space",

                leadQuality: LeadQuality.MODERATE,
                opportunityLevel: "Moderate Opportunity",
                conversionProbability: "55%",

                cleaningStatus: "Light weekly cleaning",
                currentHelp: "1 cleaner once per week",
                desiredFrequency: "3x per week",
                decisionMaker: "Operations Manager",
                primaryContact: "Sarah Mitchell",

                upstairsRooms: 6,
                downstairsDescription: "Open desk layout + reception",
                hasConferenceRooms: true,
                hasPrivateOffices: true,

                walkthroughScheduled: true,
                walkthroughDate: new Date("2026-02-28"),
                walkthroughNotes: "Interested in consistent cleaning before client visits.",

                buyingSignals: [
                    "Mentioned dissatisfaction with current cleaner",
                    "Asked about long-term contract pricing"
                ],
                riskFactors: [
                    "Budget sensitive",
                    "Wants comparison quotes"
                ],

                estimatedMinValue: 1200,
                estimatedMaxValue: 2000,

                opportunityAnalysis:
                    "Strong mid-tier opportunity. Current cleaning insufficient for growth."
            },

            {
                title: "Greenwood Medical Clinic",
                location: "Greenwood Plaza",
                city: "Atlanta",
                state: "GA",
                facilityType: "Medical Clinic",

                leadQuality: LeadQuality.HIGH,
                opportunityLevel: "High Value Client",
                conversionProbability: "75%",

                cleaningStatus: "Inconsistent contractor",
                currentHelp: "Freelancer",
                desiredFrequency: "Daily cleaning",
                decisionMaker: "Clinic Administrator",
                primaryContact: "Dr. Alan Reed",

                upstairsRooms: 4,
                downstairsDescription: "Reception + 3 treatment rooms",
                hasConferenceRooms: false,
                hasPrivateOffices: true,

                walkthroughScheduled: true,
                walkthroughDate: new Date("2026-03-02"),
                walkthroughNotes: "Very concerned about hygiene compliance.",

                buyingSignals: [
                    "Needs immediate replacement",
                    "Asked for compliance certifications"
                ],
                riskFactors: [
                    "Strict quality expectations"
                ],

                estimatedMinValue: 3000,
                estimatedMaxValue: 4500,

                opportunityAnalysis:
                    "High recurring revenue. Strong urgency and compliance-driven need."
            },

            {
                title: "Oakwood Law Firm",
                location: "Peachtree Street",
                city: "Atlanta",
                state: "GA",
                facilityType: "Law Office",

                leadQuality: LeadQuality.LOW,
                opportunityLevel: "Low Priority",
                conversionProbability: "25%",

                cleaningStatus: "Satisfied with current provider",
                currentHelp: "Professional cleaning company",
                desiredFrequency: "No change",
                decisionMaker: "Office Manager",
                primaryContact: "Jessica Brown",

                upstairsRooms: 3,
                downstairsDescription: "Lobby + 5 offices",
                hasConferenceRooms: true,
                hasPrivateOffices: true,

                walkthroughScheduled: false,
                buyingSignals: [],
                riskFactors: [
                    "Happy with current contract",
                    "Long-term agreement in place"
                ],

                estimatedMinValue: 800,
                estimatedMaxValue: 1200,

                opportunityAnalysis:
                    "Weak opportunity unless dissatisfaction arises."
            },

            {
                title: "Skyline Fitness Studio",
                location: "Midtown Complex",
                city: "Atlanta",
                state: "GA",
                facilityType: "Gym / Fitness Center",

                leadQuality: LeadQuality.MODERATE,
                opportunityLevel: "Growing Business",
                conversionProbability: "60%",

                cleaningStatus: "Owner-managed cleaning",
                currentHelp: "Staff cleans after hours",
                desiredFrequency: "Daily cleaning",
                decisionMaker: "Owner",
                primaryContact: "Mike Johnson",

                upstairsRooms: 2,
                downstairsDescription: "Workout floor + locker rooms",
                hasConferenceRooms: false,
                hasPrivateOffices: false,

                walkthroughScheduled: true,
                walkthroughDate: new Date("2026-03-05"),

                buyingSignals: [
                    "Complained about staff burnout",
                    "Concerned about locker room hygiene"
                ],
                riskFactors: [
                    "Cost-conscious small business"
                ],

                estimatedMinValue: 2000,
                estimatedMaxValue: 3500,

                opportunityAnalysis:
                    "Strong need but price-sensitive. Emphasize hygiene and reliability."
            },

            {
                title: "BrightPath Tech Startup",
                location: "Innovation Tower",
                city: "Atlanta",
                state: "GA",
                facilityType: "Tech Office",

                leadQuality: LeadQuality.HIGH,
                opportunityLevel: "High Growth Potential",
                conversionProbability: "70%",

                cleaningStatus: "Irregular service",
                currentHelp: "On-demand cleaner",
                desiredFrequency: "3x per week",
                decisionMaker: "CEO",
                primaryContact: "Daniel Carter",

                upstairsRooms: 5,
                downstairsDescription: "Open workspace + breakroom",
                hasConferenceRooms: true,
                hasPrivateOffices: true,

                walkthroughScheduled: true,
                walkthroughDate: new Date("2026-03-10"),

                buyingSignals: [
                    "Expanding team",
                    "Moving to hybrid model"
                ],
                riskFactors: [
                    "Still comparing vendors"
                ],

                estimatedMinValue: 1800,
                estimatedMaxValue: 2800,

                opportunityAnalysis:
                    "Scaling startup. Good recurring mid-level contract."
            },

            {
                title: "Riverdale Retail Boutique",
                location: "Riverdale Mall",
                city: "Riverdale",
                state: "GA",
                facilityType: "Retail Store",

                leadQuality: LeadQuality.MODERATE,
                opportunityLevel: "Seasonal Potential",
                conversionProbability: "50%",

                cleaningStatus: "Occasional deep cleaning only",
                currentHelp: "Owner + part-time help",
                desiredFrequency: "Weekly cleaning",
                decisionMaker: "Store Owner",
                primaryContact: "Emily Davis",

                upstairsRooms: 0,
                downstairsDescription: "Sales floor + storage room",
                hasConferenceRooms: false,
                hasPrivateOffices: false,

                walkthroughScheduled: false,

                buyingSignals: [
                    "Upcoming seasonal sale",
                    "Foot traffic increasing"
                ],
                riskFactors: [
                    "May delay decision until after season"
                ],

                estimatedMinValue: 700,
                estimatedMaxValue: 1500,

                opportunityAnalysis:
                    "Moderate value. Seasonal upsell potential."
            }
        ]
    });
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });