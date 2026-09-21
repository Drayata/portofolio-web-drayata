"use client";

import { Check, Copy } from "lucide-react";
import { useEffect, useState } from "react";

export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timeout = window.setTimeout(() => setCopied(false), 2400);
    return () => window.clearTimeout(timeout);
  }, [copied]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="copy-wrap">
      <button className="button button-secondary" type="button" onClick={copy} aria-label={`Copy ${email}`}>
        {copied ? <Check size={17} aria-hidden="true" /> : <Copy size={17} aria-hidden="true" />}
        {copied ? "Copied" : "Copy email"}
      </button>
      <span className="sr-only" aria-live="polite">
        {copied ? "Email address copied to clipboard." : ""}
      </span>
    </div>
  );
}
