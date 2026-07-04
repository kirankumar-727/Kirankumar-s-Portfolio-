"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  text: string;
  label?: string;
  className?: string;
};

export function CopyButton({ text, label = "Copy Annotated Script", className }: Props) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // Fallback for non-secure contexts
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand("copy");
      } catch {
        /* noop */
      }
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <button
      onClick={handleCopy}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full border px-4 py-2.5 text-sm font-semibold transition-all duration-200",
        copied
          ? "border-success bg-success/10 text-success"
          : "border-line bg-white text-ink hover:border-primary/40 hover:text-primary",
        className
      )}
      aria-live="polite"
    >
      {copied ? (
        <>
          <Check className="h-4 w-4" /> Copied!
        </>
      ) : (
        <>
          <Copy className="h-4 w-4" /> {label}
        </>
      )}
    </button>
  );
}
