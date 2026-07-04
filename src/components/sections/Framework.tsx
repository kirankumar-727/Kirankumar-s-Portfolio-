"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { framework } from "@/data/site";

export function Framework() {
  return (
    <section id="framework" className="section relative">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/3 h-64 w-[640px] -translate-x-1/2 rounded-full bg-primary/5 blur-[120px]" />
      </div>
      <div className="container-x">
        <SectionHeading
          eyebrow="Framework"
          title="The 4-stage script formula"
          description="Why this matters: a repeatable structure that takes viewers from the first second all the way to action."
        />

        <div className="relative mt-16">
          {/* Connecting progress line (desktop) */}
          <div className="absolute left-0 right-0 top-7 hidden lg:block">
            <div className="mx-auto h-px max-w-[calc(100%-7rem)] bg-line" />
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, ease: "easeInOut" }}
              style={{ transformOrigin: "left" }}
              className="mx-auto -mt-px h-px max-w-[calc(100%-7rem)] bg-gradient-to-r from-primary to-primary-300"
            />
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {framework.map((stage, i) => (
              <Reveal key={stage.title} delay={i * 0.12} className="h-full">
                <div className="group relative flex h-full flex-col items-center text-center lg:items-start lg:text-left">
                  <span className="relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl border border-line bg-white text-primary shadow-soft transition-all duration-300 group-hover:-translate-y-1 group-hover:border-primary group-hover:bg-primary group-hover:text-white">
                    <stage.icon className="h-6 w-6" />
                  </span>
                  <div className="mt-5 w-full rounded-3xl border border-line bg-white p-6 shadow-soft transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-lift">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-primary">
                        {stage.step}
                      </span>
                      <span className="h-px flex-1 bg-line" />
                    </div>
                    <h3 className="mt-3 text-lg font-bold text-ink">
                      {stage.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {stage.body}
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
