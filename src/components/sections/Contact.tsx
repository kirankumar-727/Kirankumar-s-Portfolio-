"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Send, Copy, Check } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { contactCards, projectNiches, budgets, contact } from "@/data/site";
import { cn, copyToClipboard } from "@/lib/utils";

type FormState = {
  name: string;
  email: string;
  niche: string;
  budget: string;
  brief: string;
};

type Errors = Partial<Record<keyof FormState, string>>;

const initial: FormState = {
  name: "",
  email: "",
  niche: "",
  budget: "",
  brief: "",
};

export function Contact() {
  const [form, setForm] = useState<FormState>(initial);
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);
  const [sent, setSent] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);

  const validate = (data: FormState): Errors => {
    const e: Errors = {};
    if (!data.name.trim()) e.name = "Please enter your name.";
    if (!data.email.trim()) {
      e.email = "Please enter your email.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      e.email = "Please enter a valid email address.";
    }
    if (!data.niche) e.niche = "Select a project niche.";
    if (!data.brief.trim()) e.brief = "Tell me a little about your project.";
    return e;
  };

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
    // Clear that field's error live only after a failed submit
    if (submitted) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    const found = validate(form);
    setErrors(found);
    if (Object.keys(found).length === 0) {
      // Open a prefilled email as the delivery mechanism (no backend required).
      const subject = encodeURIComponent(
        `New project enquiry — ${form.niche || "Content"} (${form.name})`
      );
      const bodyLines = [
        `Name: ${form.name}`,
        `Email: ${form.email}`,
        `Project Niche: ${form.niche}`,
        `Estimated Budget: ${form.budget || "Not specified"}`,
        "",
        "Project Brief:",
        form.brief,
      ];
      const body = encodeURIComponent(bodyLines.join("\n"));
      window.location.href = `mailto:${contact.email}?subject=${subject}&body=${body}`;
      setSent(true);
      setTimeout(() => setSent(false), 6000);
    }
  };

  return (
    <section id="contact" className="section relative">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-72 w-[640px] -translate-x-1/2 rounded-full bg-primary/5 blur-[120px]" />
      </div>
      <div className="container-x">
        <SectionHeading
          eyebrow="Contact"
          title="Send a message / book a project"
          description="Tell me what you're building. I'll reply with ideas, timelines, and next steps."
        />

        {/* Contact cards */}
        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          {contactCards.map((card, i) => {
            const isEmail = card.label === "Email Address";
            const cardCls =
              "group flex h-full items-center gap-4 rounded-2xl border border-line bg-white p-5 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lift";
            return (
              <Reveal key={card.label} delay={i * 0.08}>
                {isEmail ? (
                  <button
                    type="button"
                    onClick={() => {
                      copyToClipboard(card.value);
                      setEmailCopied(true);
                      setTimeout(() => setEmailCopied(false), 1800);
                    }}
                    className={cardCls + " w-full cursor-pointer text-left"}
                  >
                    <span className="icon-chip transition-transform duration-300 group-hover:scale-105">
                      <card.icon className="h-5 w-5" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-[11px] font-semibold uppercase tracking-wide text-muted">
                        {card.label}
                      </p>
                      <p className="truncate text-sm font-bold text-ink">
                        {card.value}
                      </p>
                    </div>
                    <span className="shrink-0 text-muted transition-colors group-hover:text-primary">
                      {emailCopied ? (
                        <Check className="h-4 w-4 text-success" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </span>
                  </button>
                ) : (
                  <a
                    href={card.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cardCls}
                  >
                    <span className="icon-chip transition-transform duration-300 group-hover:scale-105">
                      <card.icon className="h-5 w-5" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-[11px] font-semibold uppercase tracking-wide text-muted">
                        {card.label}
                      </p>
                      <p className="truncate text-sm font-bold text-ink">
                        {card.value}
                      </p>
                    </div>
                  </a>
                )}
              </Reveal>
            );
          })}

          <p className="mt-3 text-center text-xs text-muted">
            Tip: tap the email card to copy the address — then paste it anywhere.
          </p>
        </div>

        {/* Form */}
        <Reveal className="mt-6">
          <form
            onSubmit={handleSubmit}
            noValidate
            className="rounded-3xl border border-line bg-white p-6 shadow-card sm:p-8 md:p-10"
          >
            <div className="grid gap-6 md:grid-cols-2">
              <Field label="Your Name" error={errors.name}>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => update("name", e.target.value)}
                  placeholder="e.g. Vishal Sharma"
                  className={inputCls(!!errors.name)}
                  aria-invalid={!!errors.name}
                />
              </Field>
              <Field label="Email Address" error={errors.email}>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  placeholder="you@example.com"
                  className={inputCls(!!errors.email)}
                  aria-invalid={!!errors.email}
                />
              </Field>
            </div>

            <Field
              label="Select Project Niche"
              error={errors.niche}
              className="mt-6"
            >
              <div className="flex flex-wrap gap-2">
                {projectNiches.map((n) => (
                  <button
                    type="button"
                    key={n}
                    onClick={() => update("niche", n)}
                    className={cn(
                      "rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200",
                      form.niche === n
                        ? "border-primary bg-primary text-white shadow-[0_6px_16px_rgba(14,165,198,0.35)]"
                        : "border-line bg-white text-muted hover:border-primary/40 hover:text-ink"
                    )}
                  >
                    + {n}
                  </button>
                ))}
              </div>
            </Field>

            <Field label="Project Brief" error={errors.brief} className="mt-6">
              <textarea
                value={form.brief}
                onChange={(e) => update("brief", e.target.value)}
                placeholder="What are you creating? Audience, goals, format, deadline…"
                rows={6}
                className={cn(inputCls(!!errors.brief), "resize-y leading-loose")}
                aria-invalid={!!errors.brief}
              />
            </Field>

            <Field label="Estimated Budget Range" className="mt-6">
              <div className="flex flex-wrap gap-2">
                {budgets.map((b) => (
                  <button
                    type="button"
                    key={b}
                    onClick={() => update("budget", b)}
                    className={cn(
                      "rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200",
                      form.budget === b
                        ? "border-primary bg-primary/10 text-primary-700"
                        : "border-line bg-white text-muted hover:border-primary/40 hover:text-ink"
                    )}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </Field>

            <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
              <button type="submit" className="btn-primary w-full sm:w-auto">
                <Send className="h-4 w-4" />
                Send Message
                <ArrowRight className="h-4 w-4" />
              </button>

              <AnimatePresence>
                {sent && (
                  <motion.p
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2 text-sm font-medium text-success"
                  >
                    <CheckCircle2 className="h-4 w-4" />
                    Opening your email client… I&apos;ll reply soon!
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

function inputCls(hasError: boolean): string {
  return cn(
    "w-full rounded-2xl border bg-surface px-4 py-3 text-[15px] text-ink outline-none transition-all duration-200 placeholder:text-muted/70",
    hasError
      ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-200"
      : "border-line focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/20"
  );
}

function Field({
  label,
  error,
  children,
  className,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label className="mb-2 block text-sm font-semibold text-ink">
        {label}
      </label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-1.5 text-sm text-red-500"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
