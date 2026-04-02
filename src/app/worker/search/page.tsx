"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, SlidersHorizontal } from "lucide-react";
import { ResourceCard } from "@/components/resource-card";
import {
  CarePackageButton,
  CarePackageModal,
} from "@/components/care-package-modal";

const REGIONS = Array.from({ length: 11 }, (_, i) => i + 1);

const CATEGORIES = [
  "THERAPY",
  "PARENTING_CLASS",
  "BASIC_NEEDS",
  "LEGAL",
  "SUBSTANCE_ABUSE",
  "DOMESTIC_VIOLENCE",
  "HOUSING",
  "CHILDCARE",
  "MEDICAL",
  "TRANSPORTATION",
];

const MOCK_RESULTS = [
  {
    id: "1",
    name: "Central TX Trauma Therapy",
    description:
      "Trauma-informed individual and family therapy for DFPS-involved families. Licensed by TSBEP. Court-approved provider.",
    plainLanguageDesc: "Free counseling to help you and your family feel safe and heal.",
    category: "THERAPY",
    phone: "(512) 555-0101",
    address: "1200 Congress Ave, Austin, TX",
    website: "centralttx-therapy.example.com",
    waitlistStatus: "AVAILABLE" as const,
    isCourtApproved: true,
    acceptsMedicaid: true,
    isTelehealth: true,
    regionName: "Region 7 - Central Texas",
  },
  {
    id: "2",
    name: "Capital Area Food Bank",
    description:
      "Emergency food distribution for Travis, Williamson, and surrounding counties. No documentation required.",
    plainLanguageDesc: "Free groceries and meals - no paperwork needed.",
    category: "BASIC_NEEDS",
    phone: "(512) 555-0202",
    address: "8201 S Congress Ave, Austin, TX",
    waitlistStatus: "AVAILABLE" as const,
    isCourtApproved: false,
    acceptsMedicaid: false,
    isTelehealth: false,
    regionName: "Region 7 - Central Texas",
  },
  {
    id: "3",
    name: "Virtual BIPP Program",
    description:
      "Battering Intervention and Prevention Program. 18-week state-certified program. Telehealth option available.",
    plainLanguageDesc:
      "An online class to help build healthy relationships. 18 weeks.",
    category: "DOMESTIC_VIOLENCE",
    phone: "(214) 555-0303",
    waitlistStatus: "SHORT_WAIT" as const,
    isCourtApproved: true,
    acceptsMedicaid: false,
    isTelehealth: true,
    regionName: "Region 3 - North Texas",
  },
  {
    id: "4",
    name: "Bluebonnet Trails MHMR",
    description:
      "Community mental health center. Psychiatry, counseling, and case management. Sliding scale fees.",
    plainLanguageDesc:
      "Mental health help including counseling and medication. Pay what you can.",
    category: "THERAPY",
    phone: "(512) 555-0404",
    address: "1009 N Georgetown St, Round Rock, TX",
    website: "bbtrails.example.org",
    waitlistStatus: "LONG_WAIT" as const,
    isCourtApproved: true,
    acceptsMedicaid: true,
    isTelehealth: false,
    regionName: "Region 7 - Central Texas",
  },
  {
    id: "5",
    name: "Gulf Coast Legal Aid",
    description:
      "Free legal representation for CPS cases, custody disputes, and family law. Income-qualified.",
    plainLanguageDesc: "Free lawyers to help with your CPS case or custody questions.",
    category: "LEGAL",
    phone: "(713) 555-0505",
    address: "1415 Fannin St, Houston, TX",
    waitlistStatus: "CLOSED" as const,
    isCourtApproved: false,
    acceptsMedicaid: false,
    isTelehealth: false,
    regionName: "Region 6 - Gulf Coast",
  },
];

export default function WorkerSearch() {
  const [showModal, setShowModal] = useState(false);
  const [mobileFilters, setMobileFilters] = useState(false);

  return (
    <main className="flex-1 px-4 py-8 max-w-6xl mx-auto w-full">
      <header className="mb-6">
        <Link href="/worker/dashboard" className="text-sm text-primary hover:underline">
          &larr; Dashboard
        </Link>
        <h1 className="mt-3 text-2xl font-bold text-foreground">
          Resource Search
        </h1>
      </header>

      <div className="flex gap-6">
        {/* Sidebar filters */}
        <aside
          className={`${
            mobileFilters ? "block" : "hidden"
          } lg:block w-full lg:w-64 shrink-0`}
        >
          <div className="rounded-xl border border-border bg-card p-5 space-y-5">
            <h2 className="font-semibold text-foreground text-sm flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4" />
              Filters
            </h2>

            <FilterSection title="DFPS Region">
              {REGIONS.map((r) => (
                <label key={r} className="flex items-center gap-2 text-sm text-foreground">
                  <input type="checkbox" className="rounded border-border" />
                  Region {r}
                </label>
              ))}
            </FilterSection>

            <FilterSection title="Category">
              {CATEGORIES.map((c) => (
                <label key={c} className="flex items-center gap-2 text-sm text-foreground">
                  <input type="checkbox" className="rounded border-border" />
                  {c.replace(/_/g, " ").toLowerCase().replace(/\b\w/g, (l) => l.toUpperCase())}
                </label>
              ))}
            </FilterSection>

            <FilterSection title="Flags">
              <Toggle label="Accepts Medicaid" />
              <Toggle label="Court Approved" />
              <Toggle label="Telehealth Available" />
            </FilterSection>
          </div>
        </aside>

        {/* Results */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
              <input
                type="text"
                placeholder="Search resources..."
                className="w-full rounded-lg border border-border bg-card pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <button
              onClick={() => setMobileFilters(!mobileFilters)}
              className="lg:hidden rounded-lg border border-border bg-card p-2.5"
            >
              <SlidersHorizontal className="h-4 w-4" />
            </button>
            <CarePackageButton onClick={() => setShowModal(true)} />
          </div>

          <p className="text-sm text-muted mb-4">
            {MOCK_RESULTS.length} resources found
          </p>

          <div className="space-y-3">
            {MOCK_RESULTS.map((r) => (
              <ResourceCard key={r.id} {...r} variant="worker" />
            ))}
          </div>
        </div>
      </div>

      {showModal && <CarePackageModal onClose={() => setShowModal(false)} />}
    </main>
  );
}

function FilterSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="text-xs font-semibold text-muted uppercase tracking-wider mb-2">
        {title}
      </h3>
      <div className="space-y-1.5">{children}</div>
    </div>
  );
}

function Toggle({ label }: { label: string }) {
  return (
    <label className="flex items-center gap-2 text-sm text-foreground">
      <input type="checkbox" className="rounded border-border" />
      {label}
    </label>
  );
}
