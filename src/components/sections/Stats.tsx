"use client";

import { Reveal } from "@/components/ui/Reveal";
import { Counter } from "@/components/ui/Counter";
import { stats } from "@/data/site";

export function Stats() {
  return (
    <section className="relative -mt-8 md:-mt-10">
      <div className="container-x">
        <Reveal>
          <div className="grid grid-cols-2 gap-4 rounded-3xl border border-line bg-white p-6 shadow-card md:grid-cols-4 md:gap-6 md:p-8">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className="relative flex flex-col items-center text-center md:items-start md:text-left"
              >
                {i !== 0 && (
                  <span className="absolute -left-2 top-1/2 hidden h-10 w-px -translate-y-1/2 bg-line md:block md:-left-3" />
                )}
                <p className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
                  <span className="bg-gradient-to-r from-primary to-primary-700 bg-clip-text text-transparent">
                    <Counter value={stat.value} suffix={stat.suffix} />
                  </span>
                </p>
                <p className="mt-1.5 text-sm font-medium text-muted">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
