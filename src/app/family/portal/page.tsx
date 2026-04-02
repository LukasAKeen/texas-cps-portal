import Link from "next/link";
import {
  Heart,
  UtensilsCrossed,
  Home,
  Brain,
  Scale,
  Baby,
  Bus,
  Pill,
  ShieldCheck,
} from "lucide-react";

const CATEGORIES = [
  {
    icon: <UtensilsCrossed className="h-8 w-8" />,
    label: "Find Food",
    desc: "Food banks and meal programs near you",
    color: "bg-orange-50 text-orange-600 border-orange-200",
    href: "/family/portal?category=BASIC_NEEDS",
  },
  {
    icon: <Brain className="h-8 w-8" />,
    label: "Get Mental Health Help",
    desc: "Counseling and therapy for you or your child",
    color: "bg-purple-50 text-purple-600 border-purple-200",
    href: "/family/portal?category=THERAPY",
  },
  {
    icon: <Home className="h-8 w-8" />,
    label: "Find Housing",
    desc: "Emergency shelter and housing programs",
    color: "bg-blue-50 text-blue-600 border-blue-200",
    href: "/family/portal?category=HOUSING",
  },
  {
    icon: <Scale className="h-8 w-8" />,
    label: "Get Legal Help",
    desc: "Free legal help with your case",
    color: "bg-slate-50 text-slate-600 border-slate-200",
    href: "/family/portal?category=LEGAL",
  },
  {
    icon: <Heart className="h-8 w-8" />,
    label: "Parenting Classes",
    desc: "Court-approved and voluntary classes",
    color: "bg-pink-50 text-pink-600 border-pink-200",
    href: "/family/portal?category=PARENTING_CLASS",
  },
  {
    icon: <ShieldCheck className="h-8 w-8" />,
    label: "Safety & DV Help",
    desc: "Domestic violence support and safety planning",
    color: "bg-red-50 text-red-600 border-red-200",
    href: "/family/portal?category=DOMESTIC_VIOLENCE",
  },
  {
    icon: <Baby className="h-8 w-8" />,
    label: "Childcare",
    desc: "Affordable childcare and after-school programs",
    color: "bg-green-50 text-green-600 border-green-200",
    href: "/family/portal?category=CHILDCARE",
  },
  {
    icon: <Pill className="h-8 w-8" />,
    label: "Medical Care",
    desc: "Doctors, clinics, and Medicaid help",
    color: "bg-teal-50 text-teal-600 border-teal-200",
    href: "/family/portal?category=MEDICAL",
  },
  {
    icon: <Bus className="h-8 w-8" />,
    label: "Transportation",
    desc: "Rides to appointments and bus passes",
    color: "bg-indigo-50 text-indigo-600 border-indigo-200",
    href: "/family/portal?category=TRANSPORTATION",
  },
];

export default function FamilyPortal() {
  return (
    <main className="flex-1 px-4 py-8 max-w-lg mx-auto w-full">
      <header className="text-center mb-8">
        <Link href="/" className="text-sm text-primary hover:underline">
          &larr; Back to Portal
        </Link>
        <h1 className="mt-4 text-2xl font-bold text-foreground">
          How Can We Help?
        </h1>
        <p className="mt-2 text-sm text-muted">
          Tap a category below to find free resources near you.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-3">
        {CATEGORIES.map((cat) => (
          <Link
            key={cat.label}
            href={cat.href}
            className={`flex items-center gap-4 rounded-xl border-2 p-4 transition-shadow hover:shadow-md ${cat.color}`}
          >
            <div className="shrink-0">{cat.icon}</div>
            <div>
              <h2 className="font-semibold text-base">{cat.label}</h2>
              <p className="text-sm opacity-80">{cat.desc}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-8 rounded-xl bg-blue-50 border border-blue-200 p-4 text-center">
        <p className="text-sm font-medium text-blue-800">
          Need help right now?
        </p>
        <a
          href="tel:211"
          className="mt-2 inline-block rounded-lg bg-primary px-6 py-3 text-white font-semibold text-lg hover:bg-primary/90 transition-colors"
        >
          Call 2-1-1
        </a>
        <p className="mt-1 text-xs text-blue-600">
          Free, confidential, 24/7 helpline for Texas
        </p>
      </div>
    </main>
  );
}
