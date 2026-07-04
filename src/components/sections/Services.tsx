"use client";

import { Check, ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { services } from "@/data/site";
import { scrollToId } from "@/lib/utils";

export function Services() {
  return (
    <section id="services" className="section relative bg-surface">
      <div className="container-x">
        <SectionHeading
          eyebrow="Expertise"
          title="What I write for you"
          description="Three focused services — each engineered around hooks, pacing, and clear outcomes."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {services.map((service, i) => (
            <Reveal key={service.title} delay={i * 0.08} className="h-full">
              <div className="group flex h-full flex-col rounded-3xl border border-line bg-white p-7 shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/30 hover:shadow-lift md:p-8">
                <span className="icon-chip h-14 w-14 rounded-2xl transition-transform duration-300 group-hover:scale-105">
                  <service.icon className="h-6 w-6" />
                </span>
                <h3 className="mt-6 text-xl font-bold text-ink">
                  {service.title}
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">
                  {service.body}
                </p>
                <ul className="mt-6 space-y-2.5 border-t border-line pt-6">
                  {service.points.map((point) => (
                    <li key={point} className="flex items-center gap-2.5 text-sm">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-success/10 text-success">
                        <Check className="h-3 w-3" />
                      </span>
                      <span className="font-medium text-ink">{point}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => scrollToId("contact")}
                  className="mt-7 inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-primary-700"
                >
                  Start a project
                  <ArrowUpRight className="h-4 w-4" />
                </button>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
