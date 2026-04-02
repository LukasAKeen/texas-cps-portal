import { WaitlistBadge } from "./waitlist-badge";
import {
  Phone,
  Globe,
  MapPin,
  ShieldCheck,
  Video,
  CreditCard,
} from "lucide-react";

type WaitlistStatus = "AVAILABLE" | "SHORT_WAIT" | "LONG_WAIT" | "CLOSED";

interface ResourceCardProps {
  id: string;
  name: string;
  description: string;
  plainLanguageDesc: string;
  category: string;
  phone?: string | null;
  website?: string | null;
  address?: string | null;
  waitlistStatus: WaitlistStatus;
  isCourtApproved: boolean;
  acceptsMedicaid: boolean;
  isTelehealth: boolean;
  regionName?: string;
  variant: "worker" | "family";
}

export function ResourceCard({
  id,
  name,
  description,
  plainLanguageDesc,
  category,
  phone,
  website,
  address,
  waitlistStatus,
  isCourtApproved,
  acceptsMedicaid,
  isTelehealth,
  regionName,
  variant,
}: ResourceCardProps) {
  if (variant === "family") {
    return (
      <a
        href={`/family/resource/${id}`}
        className="block rounded-xl border border-border bg-card p-5 shadow-sm hover:shadow-md transition-shadow"
      >
        <h3 className="text-lg font-semibold text-foreground">{name}</h3>
        <p className="mt-1 text-sm text-muted">{plainLanguageDesc}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          <WaitlistBadge status={waitlistStatus} />
        </div>
        {phone && (
          <div className="mt-3 flex items-center gap-2 text-sm text-primary font-medium">
            <Phone className="h-4 w-4" />
            {phone}
          </div>
        )}
      </a>
    );
  }

  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-base font-semibold text-foreground">{name}</h3>
          <p className="text-xs text-muted mt-0.5">
            {formatCategory(category)}
            {regionName && ` \u00b7 ${regionName}`}
          </p>
        </div>
        <WaitlistBadge status={waitlistStatus} />
      </div>

      <p className="mt-2 text-sm text-foreground/80">{description}</p>

      <div className="mt-3 flex flex-wrap gap-2">
        {isCourtApproved && (
          <Tag icon={<ShieldCheck className="h-3.5 w-3.5" />} label="Court Approved" />
        )}
        {acceptsMedicaid && (
          <Tag icon={<CreditCard className="h-3.5 w-3.5" />} label="Medicaid" />
        )}
        {isTelehealth && (
          <Tag icon={<Video className="h-3.5 w-3.5" />} label="Telehealth" />
        )}
      </div>

      <div className="mt-3 flex flex-col gap-1 text-sm text-muted">
        {phone && (
          <span className="flex items-center gap-1.5">
            <Phone className="h-3.5 w-3.5" /> {phone}
          </span>
        )}
        {address && (
          <span className="flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5" /> {address}
          </span>
        )}
        {website && (
          <span className="flex items-center gap-1.5">
            <Globe className="h-3.5 w-3.5" /> {website}
          </span>
        )}
      </div>
    </div>
  );
}

function Tag({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-md bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-700">
      {icon}
      {label}
    </span>
  );
}

function formatCategory(cat: string) {
  return cat
    .replace(/_/g, " ")
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}
