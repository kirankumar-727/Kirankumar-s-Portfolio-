"use client";

import { ArrowUpRight, Clock } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { insights } from "@/data/site";
import { scrollToId } from "@/lib/utils";

const gradients = [
  "from-primary/20 to-primary/5",
  "from-secondary/15 to-secondary/5",
  "from-success/15 to-success/5",
];

export function Insights() {
  return (
    <section id="insights" className="section relative">
      <div className="container-x">
        <SectionHeading
          eyebrow="Insights"
          title="Ideas behind the scripts"
          description="Short reads on the psychology, structure, and storytelling that make content convert."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {insights.map((post, i) => (
            <Reveal key={post.title} delay={i * 0.08} className="h-full">
              <button
                onClick={() => scrollToId("contact")}
                className="group flex h-full w-full flex-col overflow-hidden rounded-3xl border border-line bg-white text-left shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/30 hover:shadow-lift"
              >
                <div
                  className={`relative aspect-[16/9] w-full overflow-hidden bg-gradient-to-br ${gradients[i % gradients.length]}`}
                >
                  <div className="absolute inset-0 grid-pattern opacity-40" />
                  <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[11px] font-bold text-primary shadow-soft backdrop-blur">
                    {post.category}
                  </span>
                  <div className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white text-primary shadow-soft transition-transform duration-300 group-hover:rotate-45">
                    <ArrowUpRight className="h-5 w-5" />
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <span className="flex items-center gap-1.5 text-xs text-muted">
                    <Clock className="h-3.5 w-3.5" /> {post.readTime}
                  </span>
                  <h3 className="mt-2 text-lg font-bold leading-snug text-ink">
                    {post.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                    {post.body}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                    Read more
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
