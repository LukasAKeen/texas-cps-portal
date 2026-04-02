import Link from "next/link";
import {
  Search,
  MapPin,
  ClipboardList,
  Package,
  ArrowRight,
} from "lucide-react";

export default function WorkerDashboard() {
  return (
    <main className="flex-1 px-4 py-8 max-w-5xl mx-auto w-full">
      <header className="mb-8">
        <Link href="/" className="text-sm text-primary hover:underline">
          &larr; Back to Portal
        </Link>
        <h1 className="mt-3 text-2xl font-bold text-foreground">
          Worker Dashboard
        </h1>
        <p className="text-sm text-muted mt-1">
          Welcome back. Search and manage verified resources for your cases.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <DashCard
          icon={<Search className="h-6 w-6 text-primary" />}
          title="Search Resources"
          desc="Filter by region, category, Medicaid, and more."
          href="/worker/search"
        />
        <DashCard
          icon={<MapPin className="h-6 w-6 text-accent" />}
          title="My Region"
          desc="Browse resources in your assigned DFPS region."
          href="/worker/search"
        />
        <DashCard
          icon={<Package className="h-6 w-6 text-warning" />}
          title="Care Packages"
          desc="Create and send curated resource lists to families."
          href="/worker/search"
        />
        <DashCard
          icon={<ClipboardList className="h-6 w-6 text-muted" />}
          title="Recently Verified"
          desc="Resources updated in the last 30 days."
          href="/worker/search"
        />
      </div>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-foreground mb-4">
          Quick Stats
        </h2>
        <div className="grid gap-4 sm:grid-cols-3">
          <StatCard label="Total Resources" value="--" />
          <StatCard label="Verified This Month" value="--" />
          <StatCard label="Regions Covered" value="11" />
        </div>
      </section>
    </main>
  );
}

function DashCard({
  icon,
  title,
  desc,
  href,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="flex items-start gap-4 rounded-xl border border-border bg-card p-5 shadow-sm hover:shadow-md transition-shadow group"
    >
      <div className="shrink-0 mt-0.5">{icon}</div>
      <div className="flex-1">
        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-sm text-muted mt-0.5">{desc}</p>
      </div>
      <ArrowRight className="h-4 w-4 text-muted group-hover:text-primary mt-1 shrink-0 transition-colors" />
    </Link>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border bg-card p-5 text-center">
      <p className="text-2xl font-bold text-foreground">{value}</p>
      <p className="text-sm text-muted mt-1">{label}</p>
    </div>
  );
}
