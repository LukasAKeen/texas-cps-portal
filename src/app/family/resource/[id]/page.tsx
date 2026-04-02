import Link from "next/link";
import {
  Phone,
  Globe,
  MapPin,
  ArrowLeft,
  CheckCircle,
  Clock,
} from "lucide-react";
import { WaitlistBadge } from "@/components/waitlist-badge";

// Mock resource lookup — will be replaced with Prisma query
const MOCK_RESOURCE = {
  id: "1",
  name: "Central TX Trauma Therapy",
  plainLanguageDesc:
    "Free counseling to help you and your family feel safe and heal. You can talk to someone in person or on video chat from home.",
  category: "THERAPY",
  phone: "(512) 555-0101",
  address: "1200 Congress Ave, Austin, TX 78701",
  website: "centralttx-therapy.example.com",
  waitlistStatus: "AVAILABLE" as const,
  acceptsMedicaid: true,
  isTelehealth: true,
  lastVerified: "2026-03-15",
};

export default async function FamilyResourcePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  // In production, fetch resource by `id` from Prisma
  const resource = MOCK_RESOURCE;

  return (
    <main className="flex-1 px-4 py-8 max-w-lg mx-auto w-full">
      <Link
        href="/family/portal"
        className="inline-flex items-center gap-1 text-sm text-primary hover:underline mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to categories
      </Link>

      <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
        <WaitlistBadge status={resource.waitlistStatus} />
        <h1 className="mt-3 text-xl font-bold text-foreground">
          {resource.name}
        </h1>
        <p className="mt-2 text-base text-foreground/80 leading-relaxed">
          {resource.plainLanguageDesc}
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {resource.acceptsMedicaid && (
            <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700">
              <CheckCircle className="h-3.5 w-3.5" />
              Accepts Medicaid
            </span>
          )}
          {resource.isTelehealth && (
            <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
              <CheckCircle className="h-3.5 w-3.5" />
              Available by Video
            </span>
          )}
        </div>
      </div>

      {/* Giant CTA */}
      {resource.phone && (
        <a
          href={`tel:${resource.phone.replace(/\D/g, "")}`}
          className="mt-6 flex items-center justify-center gap-3 rounded-2xl bg-accent p-5 text-white font-bold text-xl shadow-lg hover:bg-accent/90 transition-colors"
        >
          <Phone className="h-7 w-7" />
          Call {resource.phone}
        </a>
      )}

      <div className="mt-4 space-y-3">
        {resource.address && (
          <a
            href={`https://maps.google.com/?q=${encodeURIComponent(resource.address)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 hover:shadow-sm transition-shadow"
          >
            <MapPin className="h-5 w-5 text-primary shrink-0" />
            <div>
              <p className="text-sm font-medium text-foreground">
                Get Directions
              </p>
              <p className="text-xs text-muted">{resource.address}</p>
            </div>
          </a>
        )}

        {resource.website && (
          <a
            href={`https://${resource.website}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 hover:shadow-sm transition-shadow"
          >
            <Globe className="h-5 w-5 text-primary shrink-0" />
            <div>
              <p className="text-sm font-medium text-foreground">
                Visit Website
              </p>
              <p className="text-xs text-muted">{resource.website}</p>
            </div>
          </a>
        )}
      </div>

      <p className="mt-6 text-center text-xs text-muted flex items-center justify-center gap-1">
        <Clock className="h-3 w-3" />
        Last verified: {resource.lastVerified}
      </p>

      {/* Resource ID reference for debugging */}
      <p className="mt-2 text-center text-xs text-muted/50">
        Resource #{id}
      </p>
    </main>
  );
}
