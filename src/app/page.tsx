import { Heart, Briefcase, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-4 py-12">
      <div className="text-center max-w-2xl">
        <div className="flex items-center justify-center gap-2 mb-4">
          <ShieldCheck className="h-10 w-10 text-primary" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Texas CPS &amp; CASA
          <br />
          Resource Portal
        </h1>
        <p className="mt-3 text-base text-muted max-w-lg mx-auto">
          Connecting families and caseworkers to verified support resources
          across all 11 Texas DFPS regions.
        </p>
      </div>

      <div className="mt-10 grid w-full max-w-lg gap-4 sm:grid-cols-2">
        <Link
          href="/family/portal"
          className="group flex flex-col items-center gap-3 rounded-2xl border-2 border-accent bg-card p-8 shadow-sm hover:shadow-lg hover:border-accent/80 transition-all text-center"
        >
          <Heart className="h-12 w-12 text-accent group-hover:scale-110 transition-transform" />
          <span className="text-lg font-semibold text-foreground">
            I am a Parent / Family Member
          </span>
          <span className="text-sm text-muted">
            Find food, housing, counseling, and other help near you.
          </span>
        </Link>

        <Link
          href="/worker/dashboard"
          className="group flex flex-col items-center gap-3 rounded-2xl border-2 border-primary bg-card p-8 shadow-sm hover:shadow-lg hover:border-primary/80 transition-all text-center"
        >
          <Briefcase className="h-12 w-12 text-primary group-hover:scale-110 transition-transform" />
          <span className="text-lg font-semibold text-foreground">
            I am a Worker / Volunteer
          </span>
          <span className="text-sm text-muted">
            Search verified resources, filter by region, and share care
            packages.
          </span>
        </Link>
      </div>

      <p className="mt-10 text-xs text-muted text-center max-w-md">
        This portal is not affiliated with the Texas Department of Family and
        Protective Services (DFPS). Resources listed are for informational
        purposes only.
      </p>
    </main>
  );
}
