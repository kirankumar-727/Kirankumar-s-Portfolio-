"use client";

import { useState } from "react";
import { ArrowRight, ArrowUp, Mail, MessageCircle, Instagram, Copy, Check } from "lucide-react";
import { contact, brand } from "@/data/site";
import { scrollToId, copyToClipboard } from "@/lib/utils";

const socials = [
  { icon: Mail, href: `mailto:${contact.email}`, label: "Email" },
  { icon: MessageCircle, href: contact.whatsappHref, label: "WhatsApp" },
  { icon: Instagram, href: contact.instagramHref, label: "Instagram" },
];

export function Footer() {
  const [copied, setCopied] = useState(false);
  const scrollTop = () =>
    window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative overflow-hidden bg-secondary text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 grid-pattern-dark [mask-image:radial-gradient(ellipse_60%_80%_at_50%_0%,black,transparent)]" />
        <div className="absolute -top-20 left-1/4 h-72 w-72 rounded-full bg-primary/20 blur-[120px]" />
      </div>

      <div className="container-x relative">
        {/* CTA band */}
        <div className="grid items-center gap-6 border-b border-white/10 py-14 md:grid-cols-[1.4fr_1fr]">
          <div>
            <h2 className="heading-md text-white">
              Ready to write scripts that actually convert?
            </h2>
            <p className="mt-3 max-w-lg text-white/70">
              Let&apos;s turn your next idea into high-retention content — in
              English or Kannada.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 md:justify-end">
            <button onClick={() => scrollToId("contact")} className="btn-primary">
              Start a project
              <ArrowRight className="h-4 w-4" />
            </button>
            <a href={contact.whatsappHref} target="_blank" rel="noopener noreferrer" className="btn-ghost-dark">
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </a>
          </div>
        </div>

        {/* Main */}
        <div className="grid gap-10 py-14 md:grid-cols-[1.4fr_1fr]">
          <div>
            <button onClick={scrollTop} className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-sm font-bold text-white">
                KK
              </span>
              <span className="text-base font-bold">{brand.name}</span>
            </button>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
              {brand.role}. High-retention short-form scripts & personal-brand
              content in English & Kannada.
            </p>
            <div className="mt-5 flex gap-3">
              {socials.map((s) =>
                s.label === "Email" ? (
                  <button
                    key={s.label}
                    type="button"
                    onClick={() => copyToClipboard(contact.email)}
                    aria-label="Copy email address"
                    title={contact.email}
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/80 transition-colors hover:border-primary/40 hover:bg-primary/15 hover:text-white"
                  >
                    <s.icon className="h-4.5 w-4.5" />
                  </button>
                ) : (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/80 transition-colors hover:border-primary/40 hover:bg-primary/15 hover:text-white"
                  >
                    <s.icon className="h-4.5 w-4.5" />
                  </a>
                )
              )}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-white/50">
              Contact
            </h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-center justify-between gap-3">
                <span className="break-all text-white/70">{contact.email}</span>
                <button
                  type="button"
                  onClick={() => {
                    copyToClipboard(contact.email);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 1800);
                  }}
                  aria-label="Copy email address"
                  className="shrink-0 rounded-lg border border-white/10 p-1.5 text-white/60 transition-colors hover:border-primary/40 hover:text-white"
                >
                  {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                </button>
              </li>
              <li>
                <a
                  href={contact.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 transition-colors hover:text-white"
                >
                  {contact.whatsapp}
                </a>
              </li>
              <li>
                <a
                  href={contact.instagramHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 transition-colors hover:text-white"
                >
                  {contact.instagram}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 py-7 text-sm text-white/50 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {brand.name}. All rights reserved.
          </p>
          <button
            onClick={scrollTop}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-white/70 transition-colors hover:border-primary/40 hover:text-white"
          >
            Back to top
            <ArrowUp className="h-4 w-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
