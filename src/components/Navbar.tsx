"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import { nav } from "@/data/site";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useScrolled } from "@/hooks/useScrolled";
import { cn, scrollToId } from "@/lib/utils";

const sectionIds = nav.map((n) => n.id);

export function Navbar() {
  const [open, setOpen] = useState(false);
  const active = useActiveSection(sectionIds);
  const scrolled = useScrolled(16);

  const handleNav = (id: string) => {
    setOpen(false);
    scrollToId(id);
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-line/80 bg-white/80 backdrop-blur-xl shadow-[0_1px_0_rgba(17,24,39,0.04)]"
          : "border-b border-transparent bg-white/0"
      )}
    >
      <nav className="container-x flex h-[68px] items-center justify-between">
        <button
          onClick={() => handleNav("home")}
          className="flex items-center gap-2.5"
          aria-label="Kirankumar K. — home"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-sm font-bold text-white shadow-[0_6px_16px_rgba(14,165,198,0.35)]">
            KK
          </span>
          <span className="text-[15px] font-bold tracking-tight text-ink">
            Kirankumar K.
          </span>
        </button>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-1 lg:flex">
          {nav
            .filter((n) => n.id !== "home" && n.id !== "contact")
            .map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => handleNav(item.id)}
                  className={cn(
                    "rounded-full px-3.5 py-2 text-sm font-medium transition-colors",
                    active === item.id
                      ? "text-primary"
                      : "text-muted hover:text-ink"
                  )}
                >
                  {item.label}
                </button>
              </li>
            ))}
        </ul>

        <div className="hidden items-center gap-3 lg:flex">
          <button
            onClick={() => handleNav("contact")}
            className="btn-primary"
          >
            Let&apos;s Talk
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-white text-ink lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden border-t border-line bg-white/95 backdrop-blur-xl lg:hidden"
          >
            <ul className="container-x flex flex-col gap-1 py-4">
              {nav
                .filter((n) => n.id !== "home")
                .map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => handleNav(item.id)}
                      className={cn(
                        "w-full rounded-xl px-4 py-3 text-left text-[15px] font-medium transition-colors",
                        active === item.id
                          ? "bg-primary/10 text-primary"
                          : "text-ink hover:bg-surface"
                      )}
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              <li className="mt-2">
                <button
                  onClick={() => handleNav("contact")}
                  className="btn-primary w-full"
                >
                  Let&apos;s Talk
                  <ArrowRight className="h-4 w-4" />
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
