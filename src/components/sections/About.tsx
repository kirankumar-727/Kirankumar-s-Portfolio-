"use client";

import { CheckCircle2, Quote } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { aboutHighlights, proofPoints, brand } from "@/data/site";

export function About() {
  return (
    <section id="about" className="section relative">
      <div className="container-x">
        <SectionHeading
          eyebrow="About"
          title="Strategy-led scriptwriting, not just words on a page"
          description="I help creators and brands turn ideas into content that people actually finish watching — and act on."
        />

        <div className="mt-14 grid items-start gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Premium feature card */}
          <Reveal className="relative overflow-hidden rounded-3xl border border-line bg-gradient-to-br from-surface to-white p-8 shadow-soft md:p-10">
            <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-primary/10 blur-3xl" />
            <Quote className="h-9 w-9 text-primary" />
            <p className="mt-5 text-xl font-medium leading-relaxed text-ink md:text-2xl">
              {brand.shortName} understands audience psychology, not just
              scriptwriting — every script is structured, easy to execute, and
              matched to your brand voice.
            </p>
            <p className="mt-4 text-sm text-muted">
              That&apos;s the foundation behind 100+ high-retention scripts across
              7+ industries, in both English &amp; Kannada.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {proofPoints.map((point) => (
                <div key={point} className="flex items-start gap-2.5">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-success" />
                  <span className="text-sm font-medium text-ink">{point}</span>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Three highlight cards */}
          <div className="grid gap-4">
            {aboutHighlights.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.08}>
                <div className="group card-base flex gap-4 p-6 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lift">
                  <span className="icon-chip transition-transform duration-300 group-hover:scale-105">
                    <item.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="text-base font-bold text-ink">{item.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted">
                      {item.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
