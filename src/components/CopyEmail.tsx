"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

/** Round icon button that copies the email; shows a small "Copied" tooltip. */
export default function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      aria-label="Copy email address"
      className={`relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full border transition-colors ${
        copied
          ? "border-lime bg-lime text-on-lime"
          : "border-border-strong text-muted hover:border-lime hover:text-lime"
      }`}
    >
      {copied ? <Check size={16} aria-hidden /> : <Copy size={16} aria-hidden />}
      <span
        role="status"
        className={`pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-lime px-3 py-1 text-xs font-medium text-on-lime transition-opacity ${
          copied ? "opacity-100" : "opacity-0"
        }`}
      >
        {copied ? "Copied!" : ""}
      </span>
    </button>
  );
}
