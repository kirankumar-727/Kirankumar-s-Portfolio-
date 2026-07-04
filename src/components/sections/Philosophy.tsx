"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { philosophy } from "@/data/site";

export function Philosophy() {
  return (
    <section
      id="philosophy"
      className="section relative overflow-hidden bg-secondary text-white"
    >
      {/* Lighting + grid */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 grid-pattern-dark [mask-image:radial-gradient(ellipse_60%_60%_at_50%_40%,black,transparent)]" />
        <div className="absolute -left-20 top-0 h-80 w-80 rounded-full bg-primary/25 blur-[120px]" />
        <div className="absolute -right-10 bottom-0 h-80 w-80 rounded-full bg-primary/15 blur-[120px]" />
      </div>

      <div className="container-x relative">
        <Reveal className="mx-auto max-w-3xl text-center">
          <span className="label-eyebrow">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            My Perspective
          </span>
          <Quote className="mx-auto mt-6 h-10 w-10 text-primary" />
          <p className="mt-6 text-2xl font-semibold leading-snug tracking-tight text-white sm:text-3xl md:text-[2.1rem] md:leading-[1.25]">
            &ldquo;{philosophy.quote}&rdquo;
          </p>
        </Reveal>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {philosophy.beliefs.map((belief, i) => (
            <Reveal key={belief.title} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                className="group h-full rounded-3xl border border-white/10 bg-white/5 p-7 backdrop-blur-sm transition-colors hover:border-primary/40 hover:bg-white/[0.07]"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/20 text-base font-bold text-primary-300">
                  0{i + 1}
                </span>
                <h3 className="mt-5 text-lg font-bold text-white">
                  {belief.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/70">
                  {belief.body}
                </p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
