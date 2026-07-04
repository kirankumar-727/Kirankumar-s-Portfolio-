"use client";

import Image from "next/image";
import { ArrowRight, Languages as LangIcon } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { languages } from "@/data/site";
import { scrollToId } from "@/lib/utils";

export function LanguagesSection() {
  return (
    <section id="languages" className="section relative bg-surface">
      <div className="container-x">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <span className="label-eyebrow">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              Languages
            </span>
            <h2 className="heading-lg mt-4 text-ink">
              Bilingual edge:{" "}
              <span className="bg-gradient-to-r from-primary to-primary-700 bg-clip-text text-transparent">
                English &amp; Kannada
              </span>
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted">
              Reach global and regional audiences with scripts written natively
              in both languages — no awkward translations, just content that
              lands.
            </p>

            <div className="mt-8 space-y-4">
              {languages.map((l) => (
                <div
                  key={l.name}
                  className="flex gap-4 rounded-2xl border border-line bg-white p-5 shadow-soft"
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 font-kannada text-lg font-bold text-primary">
                    {l.code}
                  </span>
                  <div>
                    <h3 className="text-base font-bold text-ink">{l.name}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted">
                      {l.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => scrollToId("contact")}
              className="btn-primary mt-8"
            >
              <LangIcon className="h-4 w-4" />
              Request Kannada Samples
              <ArrowRight className="h-4 w-4" />
            </button>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="relative mx-auto max-w-md">
              <div className="absolute -inset-4 -z-10 rounded-[32px] bg-gradient-to-br from-primary/15 to-transparent blur-2xl" />
              <div className="overflow-hidden rounded-3xl border border-line bg-white p-6 shadow-card">
                <Image
                  src="/assets/languages-illustration.png"
                  alt="Bilingual content writing in English and Kannada"
                  width={800}
                  height={800}
                  className="h-full w-full rounded-2xl object-cover"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
