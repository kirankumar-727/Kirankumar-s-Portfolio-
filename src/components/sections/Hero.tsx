"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Play, Sparkles, Star, TrendingUp } from "lucide-react";
import { brand, stats } from "@/data/site";
import { scrollToId } from "@/lib/utils";

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden pt-28 md:pt-32">
      {/* Decorative gradients + grid */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 grid-pattern [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)]" />
        <div className="absolute -top-32 left-1/2 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-primary/15 blur-[120px]" />
        <div className="absolute right-0 top-40 h-[320px] w-[320px] rounded-full bg-primary/10 blur-[100px]" />
      </div>

      <div className="container-x grid items-center gap-12 pb-20 md:pb-28 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
        {/* Left */}
        <div className="max-w-xl">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-1.5 text-xs font-semibold text-muted"
          >
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            {brand.tagline}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="heading-xl mt-5 text-ink"
          >
            Scripts that hold attention&nbsp;&amp;{" "}
            <span className="bg-gradient-to-r from-primary to-primary-700 bg-clip-text text-transparent">
              build trust.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="mt-5 text-lg leading-relaxed text-muted"
          >
            {brand.intro}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.18 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <button onClick={() => scrollToId("contact")} className="btn-primary">
              Connect with me
              <ArrowRight className="h-4 w-4" />
            </button>
            <button
              onClick={() => scrollToId("portfolio")}
              className="btn-secondary"
            >
              <Play className="h-4 w-4" />
              View Sample Scripts
            </button>
          </motion.div>

          {/* Social proof */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.24 }}
            className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3"
          >
            <div className="flex items-center gap-1 text-amber-400">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-current" />
              ))}
            </div>
            <p className="text-sm text-muted">
              <span className="font-semibold text-ink">35+ brands &amp; creators</span>{" "}
              trust Kirankumar&apos;s scripts
            </p>
          </motion.div>
        </div>

        {/* Right — masked portrait + floating stat cards */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-[440px]"
        >
          <div className="absolute -inset-4 -z-10 rounded-[32px] bg-gradient-to-br from-primary/20 via-primary/5 to-transparent blur-2xl" />
          <div className="relative overflow-hidden rounded-[28px] border border-line bg-surface shadow-card">
            <div className="absolute inset-0 grid-pattern opacity-40" />
            <Image
              src="/assets/hero-portrait.png"
              alt="Kirankumar K., Content Strategist & Scriptwriter"
              width={880}
              height={1100}
              priority
              className="relative h-full w-full object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-secondary/30 via-transparent to-transparent" />
          </div>

          {/* Floating stat card — top */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -left-4 top-10 hidden rounded-2xl border border-line bg-white/90 px-4 py-3 shadow-lift backdrop-blur-md sm:flex md:-left-8"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <TrendingUp className="h-5 w-5" />
              </span>
              <div>
                <p className="text-lg font-bold leading-none text-ink">
                  {stats[0].value}
                  {stats[0].suffix}
                </p>
                <p className="text-xs text-muted">Scripts written</p>
              </div>
            </div>
          </motion.div>

          {/* Floating stat card — bottom */}
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -right-3 bottom-12 hidden rounded-2xl border border-line bg-white/90 px-4 py-3 shadow-lift backdrop-blur-md sm:block md:-right-8"
          >
            <p className="text-xs font-medium text-muted">Languages</p>
            <p className="mt-0.5 text-sm font-bold text-ink">
              English <span className="text-primary">&amp;</span> Kannada
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
