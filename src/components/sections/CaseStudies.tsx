"use client";

import { AlertCircle, ArrowRight, Lightbulb, Target } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { caseStudies } from "@/data/site";

const steps = [
  { key: "challenge", label: "Challenge", icon: AlertCircle },
  { key: "solution", label: "Solution", icon: Lightbulb },
  { key: "results", label: "Results", icon: Target },
] as const;

export function CaseStudies() {
  return (
    <section id="case-studies" className="section relative">
      <div className="container-x">
        <SectionHeading
          eyebrow="Case Studies"
          title="How the right story changes outcomes"
          description="From challenge to measurable impact — the thinking behind two standout scripts."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {caseStudies.map((cs, i) => (
            <Reveal key={cs.title} delay={i * 0.1} className="h-full">
              <article className="flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-white shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
                <div className="border-b border-line bg-gradient-to-br from-surface to-white px-7 py-6">
                  <span className="text-xs font-semibold uppercase tracking-wide text-primary">
                    {cs.tag}
                  </span>
                  <h3 className="mt-2 text-xl font-bold text-ink">{cs.title}</h3>
                </div>

                <div className="flex flex-1 flex-col gap-5 px-7 py-6">
                  {steps.map((step) => (
                    <div key={step.key} className="flex gap-3.5">
                      <span className="icon-chip h-9 w-9 rounded-xl">
                        <step.icon className="h-4 w-4" />
                      </span>
                      <div>
                        <p className="text-[11px] font-bold uppercase tracking-wide text-primary">
                          {step.label}
                        </p>
                        <p className="mt-1 text-sm leading-relaxed text-muted">
                          {cs[step.key]}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-3 gap-px border-t border-line bg-line">
                  {cs.metrics.map((m) => (
                    <div
                      key={m.label}
                      className="bg-white px-4 py-5 text-center"
                    >
                      <p className="text-base font-extrabold leading-tight text-primary sm:text-lg">
                        {m.value}
                      </p>
                      <p className="mt-1 text-[11px] leading-tight text-muted">
                        {m.label}
                      </p>
                    </div>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10 text-center">
          <a href="#contact" className="btn-secondary">
            Want results like these?
            <ArrowRight className="h-4 w-4" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
