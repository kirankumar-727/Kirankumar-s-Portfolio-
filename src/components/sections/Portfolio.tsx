"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, FileText, Globe, Languages as LangIcon, X } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { CopyButton } from "@/components/ui/CopyButton";
import { scripts, type Script } from "@/data/site";
import { cn, scrollToId } from "@/lib/utils";

const LANGUAGES = ["All", "English", "Kannada"] as const;

function getCategories(): string[] {
  const set = new Set<string>();
  scripts.forEach((s) => s.categories.forEach((c) => set.add(c)));
  return ["All", ...Array.from(set)];
}

function plainText(script: Script): string {
  const header = `${script.title}  |  ${script.category}\n${"-".repeat(40)}\n\n`;
  const body = script.breakdown
    .map((b) => `[${b.label.toUpperCase()}]\n${b.text}`)
    .join("\n\n");
  return header + body + `\n\n— Written by Kirankumar K.`;
}

export function Portfolio() {
  const categories = useMemo(getCategories, []);
  const [lang, setLang] = useState<(typeof LANGUAGES)[number]>("All");
  const [cat, setCat] = useState<string>("All");
  const [active, setActive] = useState<Script | null>(null);

  const filtered = scripts.filter((s) => {
    const langOk = lang === "All" || s.language === lang;
    const catOk = cat === "All" || s.categories.includes(cat);
    return langOk && catOk;
  });

  return (
    <section id="portfolio" className="section relative bg-surface">
      <div className="container-x">
        <SectionHeading
          eyebrow="Featured Scripts"
          title="Selected work & proof of quality"
          description="Real scripts, broken down stage by stage. Filter by language or category, then read the full annotated breakdown."
        />

        {/* Filters */}
        <Reveal className="mt-10 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="mr-1 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted">
              <LangIcon className="h-3.5 w-3.5" /> Language
            </span>
            {LANGUAGES.map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={cn("chip", lang === l && "chip-active")}
              >
                {l}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="mr-1 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted">
              <Globe className="h-3.5 w-3.5" /> Category
            </span>
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={cn("chip", cat === c && "chip-active")}
              >
                {c}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Cards */}
        <motion.div layout className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((script) => (
              <motion.article
                key={script.slug}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.3 }}
                className="group flex h-full flex-col rounded-3xl border border-line bg-white p-6 shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/30 hover:shadow-lift"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={cn(
                      "rounded-full px-2.5 py-1 text-[11px] font-bold",
                      script.language === "Kannada"
                        ? "bg-primary/10 text-primary-700"
                        : "bg-secondary/10 text-secondary"
                    )}
                  >
                    {script.language}
                  </span>
                  {script.categories.map((c) => (
                    <span
                      key={c}
                      className="rounded-full border border-line px-2.5 py-1 text-[11px] font-medium text-muted"
                    >
                      {c}
                    </span>
                  ))}
                </div>

                <h3 className="mt-4 text-lg font-bold leading-snug text-ink">
                  {script.title}
                </h3>

                <div className="mt-3 rounded-2xl border border-dashed border-line bg-surface px-4 py-3">
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-primary">
                    Hook
                  </p>
                  <p
                    className={cn(
                      "mt-1 line-clamp-3 text-sm leading-relaxed text-ink/80",
                      script.language === "Kannada" && "font-kannada"
                    )}
                  >
                    {script.snippet}
                  </p>
                </div>

                <div className="mt-auto flex flex-col gap-3 pt-6">
                  <button
                    onClick={() => setActive(script)}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-primary-700"
                  >
                    <FileText className="h-4 w-4" />
                    View Script Breakdown
                  </button>
                  <div className="flex flex-wrap gap-2">
                    <CopyButton text={plainText(script)} className="flex-1" />
                    <button
                      onClick={() => scrollToId("contact")}
                      className="btn-primary flex-1 px-4 py-2.5 text-sm"
                    >
                      Hire for this
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <p className="mt-10 text-center text-muted">
            No scripts match this combination yet. Try another filter.
          </p>
        )}
      </div>

      {/* Breakdown modal */}
      <ScriptModal script={active} onClose={() => setActive(null)} />
    </section>
  );
}

function ScriptModal({
  script,
  onClose,
}: {
  script: Script | null;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {script && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-end justify-center bg-secondary/50 p-0 backdrop-blur-sm sm:items-center sm:p-6"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={`${script.title} script breakdown`}
        >
          <motion.div
            initial={{ y: 40, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 40, opacity: 0, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 280, damping: 28 }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[88vh] w-full max-w-2xl overflow-hidden rounded-t-3xl bg-white sm:rounded-3xl"
          >
            <div className="flex items-start justify-between gap-4 border-b border-line bg-surface px-6 py-5">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={cn(
                      "rounded-full px-2.5 py-1 text-[11px] font-bold",
                      script.language === "Kannada"
                        ? "bg-primary/10 text-primary-700"
                        : "bg-secondary/10 text-secondary"
                    )}
                  >
                    {script.language}
                  </span>
                  {script.categories.map((c) => (
                    <span
                      key={c}
                      className="rounded-full border border-line bg-white px-2.5 py-1 text-[11px] font-medium text-muted"
                    >
                      {c}
                    </span>
                  ))}
                </div>
                <h3 className="mt-2 text-xl font-bold text-ink">{script.title}</h3>
              </div>
              <button
                onClick={onClose}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-line bg-white text-muted hover:text-ink"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="max-h-[55vh] space-y-5 overflow-y-auto px-6 py-6">
              {script.breakdown.map((b, i) => (
                <div key={i} className="relative pl-5">
                  <span className="absolute left-0 top-1.5 h-[calc(100%-0.4rem)] w-0.5 rounded-full bg-primary/30" />
                  <p className="text-[11px] font-bold uppercase tracking-wide text-primary">
                    {b.label}
                  </p>
                  <p
                    className={cn(
                      "mt-1.5 whitespace-pre-line text-[15px] leading-relaxed text-ink/85",
                      script.language === "Kannada" && "font-kannada"
                    )}
                  >
                    {b.text}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3 border-t border-line bg-surface px-6 py-4">
              <CopyButton text={plainText(script)} className="flex-1" />
              <button
                onClick={() => {
                  onClose();
                  scrollToId("contact");
                }}
                className="btn-primary flex-1"
              >
                Hire Kirankumar for this script
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
