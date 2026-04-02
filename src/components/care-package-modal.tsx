"use client";

import { useState } from "react";
import { X, Send, Package } from "lucide-react";

export function CarePackageButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white hover:bg-accent/90 transition-colors"
    >
      <Package className="h-4 w-4" />
      Share Care Package
    </button>
  );
}

export function CarePackageModal({ onClose }: { onClose: () => void }) {
  const [phone, setPhone] = useState("");
  const [sent, setSent] = useState(false);

  function handleSend() {
    if (phone.trim().length >= 10) {
      setSent(true);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="relative w-full max-w-md rounded-2xl bg-card p-6 shadow-xl mx-4">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-muted hover:text-foreground"
        >
          <X className="h-5 w-5" />
        </button>

        <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <Package className="h-5 w-5 text-accent" />
          Share Care Package
        </h2>
        <p className="mt-1 text-sm text-muted">
          Text a curated list of saved resources to a family member&apos;s phone.
        </p>

        {sent ? (
          <div className="mt-6 rounded-lg bg-green-50 p-4 text-center">
            <p className="text-sm font-medium text-green-800">
              Care package sent to {phone}!
            </p>
            <p className="text-xs text-green-600 mt-1">
              (Demo only &mdash; no message was actually sent)
            </p>
          </div>
        ) : (
          <div className="mt-4 space-y-4">
            <div className="rounded-lg border border-border bg-background p-3">
              <p className="text-xs font-medium text-muted mb-2">
                Resources in package:
              </p>
              <ul className="space-y-1 text-sm text-foreground">
                <li>&#x2022; Selected resources will appear here</li>
              </ul>
            </div>
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-foreground"
              >
                Recipient phone number
              </label>
              <input
                id="phone"
                type="tel"
                placeholder="(512) 555-0123"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <button
              onClick={handleSend}
              disabled={phone.trim().length < 10}
              className="w-full flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-white hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Send className="h-4 w-4" />
              Send via Text
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
