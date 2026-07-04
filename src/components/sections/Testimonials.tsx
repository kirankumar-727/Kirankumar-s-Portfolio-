"use client";

import { Star } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { testimonials } from "@/data/site";

function initials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function Testimonials() {
  return (
    <section id="testimonials" className="section relative bg-surface">
      <div className="container-x">
        <SectionHeading
          eyebrow="Client Reviews"
          title="Trusted by creators & brands"
          description="What clients say after working with Kirankumar on their content."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.08} className="h-full">
              <figure className="flex h-full flex-col rounded-3xl border border-line bg-white p-7 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lift md:p-8">
                <div className="flex items-center gap-1 text-amber-400">
                  {Array.from({ length: t.rating }).map((_, s) => (
                    <Star key={s} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-ink/85">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-line pt-5">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary-700 text-sm font-bold text-white">
                    {initials(t.name)}
                  </span>
                  <div>
                    <p className="text-sm font-bold text-ink">{t.name}</p>
                    <p className="text-xs text-muted">
                      {t.role}
                      {t.company ? ` · ${t.company}` : ""}
                    </p>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
