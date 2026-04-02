import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.POSTGRES_PRISMA_URL!,
});
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Seeding Texas DFPS regions...");

  const regions = await Promise.all(
    [
      { number: 1, name: "Region 1 - Lubbock / High Plains" },
      { number: 2, name: "Region 2 - Abilene / Northwest Texas" },
      { number: 3, name: "Region 3 - Arlington / North Texas" },
      { number: 4, name: "Region 4 - Tyler / Northeast Texas" },
      { number: 5, name: "Region 5 - Beaumont / Deep East Texas" },
      { number: 6, name: "Region 6 - Houston / Gulf Coast" },
      { number: 7, name: "Region 7 - Austin / Central Texas" },
      { number: 8, name: "Region 8 - San Antonio / South Texas" },
      { number: 9, name: "Region 9 - Midland / Permian Basin" },
      { number: 10, name: "Region 10 - El Paso / Far West Texas" },
      { number: 11, name: "Region 11 - Edinburg / Rio Grande Valley" },
    ].map((r) =>
      prisma.region.upsert({
        where: { number: r.number },
        update: { name: r.name },
        create: r,
      })
    )
  );

  const regionMap = Object.fromEntries(regions.map((r) => [r.number, r.id]));

  console.log("Seeding mock resources...");

  const resources = [
    {
      name: "Central TX Trauma Therapy",
      description:
        "Trauma-informed individual and family therapy for DFPS-involved families. Licensed by TSBEP. Court-approved provider for CPS service plans.",
      plainLanguageDesc:
        "Free counseling to help you and your family feel safe and heal. You can talk to someone in person or by video from home.",
      category: "THERAPY" as const,
      phone: "(512) 555-0101",
      address: "1200 Congress Ave, Austin, TX 78701",
      website: "https://centralttx-therapy.example.com",
      isCourtApproved: true,
      acceptsMedicaid: true,
      isTelehealth: true,
      waitlistStatus: "AVAILABLE" as const,
      regionId: regionMap[7],
    },
    {
      name: "Capital Area Food Bank - Emergency Distribution",
      description:
        "Emergency food distribution for Travis, Williamson, and surrounding counties. No documentation or ID required. Open Mon-Fri 9am-4pm.",
      plainLanguageDesc:
        "Free groceries and meals for your family. No paperwork needed. Just walk in.",
      category: "BASIC_NEEDS" as const,
      phone: "(512) 555-0202",
      address: "8201 S Congress Ave, Austin, TX 78745",
      website: "https://cafb.example.org",
      isCourtApproved: false,
      acceptsMedicaid: false,
      isTelehealth: false,
      waitlistStatus: "AVAILABLE" as const,
      regionId: regionMap[7],
    },
    {
      name: "Lone Star Virtual BIPP Program",
      description:
        "Battering Intervention and Prevention Program. 18-week state-certified course. Available via telehealth. Court-approved in most Texas counties.",
      plainLanguageDesc:
        "An online class to help build healthy relationships. Takes 18 weeks, and you can do it from home on your phone or computer.",
      category: "DOMESTIC_VIOLENCE" as const,
      phone: "(214) 555-0303",
      website: "https://lonestar-bipp.example.com",
      isCourtApproved: true,
      acceptsMedicaid: false,
      isTelehealth: true,
      waitlistStatus: "SHORT_WAIT" as const,
      regionId: regionMap[3],
    },
    {
      name: "Bluebonnet Trails Community MHMR",
      description:
        "Community mental health center providing psychiatry, counseling, and case management. Sliding scale fees. Serves Williamson, Burnet, and surrounding counties.",
      plainLanguageDesc:
        "Mental health help including counseling and medication. You pay what you can afford.",
      category: "THERAPY" as const,
      phone: "(512) 555-0404",
      address: "1009 N Georgetown St, Round Rock, TX 78664",
      website: "https://bbtrails.example.org",
      isCourtApproved: true,
      acceptsMedicaid: true,
      isTelehealth: false,
      waitlistStatus: "LONG_WAIT" as const,
      regionId: regionMap[7],
    },
    {
      name: "Gulf Coast Legal Aid - Family Law",
      description:
        "Free legal representation for CPS cases, custody disputes, and family law matters. Income-qualified. Serves Harris, Fort Bend, and surrounding counties.",
      plainLanguageDesc:
        "Free lawyers who can help you with your CPS case or custody questions.",
      category: "LEGAL" as const,
      phone: "(713) 555-0505",
      address: "1415 Fannin St, Houston, TX 77002",
      isCourtApproved: false,
      acceptsMedicaid: false,
      isTelehealth: false,
      waitlistStatus: "CLOSED" as const,
      regionId: regionMap[6],
    },
    {
      name: "Nurturing Parenting Program - San Antonio",
      description:
        "12-week evidence-based parenting curriculum. Court-approved. Childcare and meals provided during sessions. English and Spanish available.",
      plainLanguageDesc:
        "A free 12-week parenting class. Childcare and food provided. Available in English and Spanish.",
      category: "PARENTING_CLASS" as const,
      phone: "(210) 555-0606",
      address: "300 Soledad St, San Antonio, TX 78205",
      isCourtApproved: true,
      acceptsMedicaid: false,
      isTelehealth: false,
      waitlistStatus: "SHORT_WAIT" as const,
      regionId: regionMap[8],
    },
    {
      name: "Tyler Area Substance Abuse Recovery Center",
      description:
        "Outpatient substance abuse treatment. Individual and group therapy. Certified by DSHS. Accepts Medicaid and most insurance.",
      plainLanguageDesc:
        "Help for alcohol or drug problems. Individual and group sessions. Medicaid accepted.",
      category: "SUBSTANCE_ABUSE" as const,
      phone: "(903) 555-0707",
      address: "715 S Fleishel Ave, Tyler, TX 75701",
      isCourtApproved: true,
      acceptsMedicaid: true,
      isTelehealth: false,
      waitlistStatus: "AVAILABLE" as const,
      regionId: regionMap[4],
    },
    {
      name: "El Paso Emergency Family Shelter",
      description:
        "30-day emergency housing for families with children. Case management, meals, and transition planning included. No substance use on premises.",
      plainLanguageDesc:
        "A safe place to stay with your kids for up to 30 days. Meals and help planning next steps included.",
      category: "HOUSING" as const,
      phone: "(915) 555-0808",
      address: "1500 N Oregon St, El Paso, TX 79902",
      isCourtApproved: false,
      acceptsMedicaid: false,
      isTelehealth: false,
      waitlistStatus: "SHORT_WAIT" as const,
      regionId: regionMap[10],
    },
    {
      name: "Rio Grande Valley Play Therapy Clinic",
      description:
        "Trauma-informed play therapy for children ages 3-12. Bilingual therapists. Telehealth sessions available. Medicaid accepted.",
      plainLanguageDesc:
        "Therapy for kids ages 3-12 through play. Therapists speak English and Spanish. Can be done by video.",
      category: "THERAPY" as const,
      phone: "(956) 555-0909",
      address: "2200 W University Dr, Edinburg, TX 78539",
      isCourtApproved: true,
      acceptsMedicaid: true,
      isTelehealth: true,
      waitlistStatus: "AVAILABLE" as const,
      regionId: regionMap[11],
    },
    {
      name: "Permian Basin Transportation Assistance",
      description:
        "Gas cards, bus passes, and ride coordination for DFPS-involved families attending court dates, therapy, and other appointments.",
      plainLanguageDesc:
        "Free gas cards and bus passes to help you get to court dates, doctor visits, and other appointments.",
      category: "TRANSPORTATION" as const,
      phone: "(432) 555-1010",
      address: "200 N Loraine St, Midland, TX 79701",
      isCourtApproved: false,
      acceptsMedicaid: false,
      isTelehealth: false,
      waitlistStatus: "AVAILABLE" as const,
      regionId: regionMap[9],
    },
  ];

  // Clear existing resources and re-seed
  await prisma.resource.deleteMany();
  for (const resource of resources) {
    await prisma.resource.create({ data: resource });
  }

  console.log(
    `Seeded ${regions.length} regions and ${resources.length} resources.`
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
