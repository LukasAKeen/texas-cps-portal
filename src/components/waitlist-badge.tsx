import { clsx } from "clsx";

type WaitlistStatus = "AVAILABLE" | "SHORT_WAIT" | "LONG_WAIT" | "CLOSED";

const config: Record<
  WaitlistStatus,
  { label: string; bg: string; text: string }
> = {
  AVAILABLE: {
    label: "Available Now",
    bg: "bg-green-100",
    text: "text-green-800",
  },
  SHORT_WAIT: {
    label: "Short Wait",
    bg: "bg-yellow-100",
    text: "text-yellow-800",
  },
  LONG_WAIT: { label: "Long Wait", bg: "bg-orange-100", text: "text-orange-800" },
  CLOSED: { label: "Closed", bg: "bg-red-100", text: "text-red-800" },
};

export function WaitlistBadge({ status }: { status: WaitlistStatus }) {
  const c = config[status];
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        c.bg,
        c.text
      )}
    >
      {c.label}
    </span>
  );
}
