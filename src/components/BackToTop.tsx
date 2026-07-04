"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useScrolled } from "@/hooks/useScrolled";

export function BackToTop() {
  const show = useScrolled(600);
  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
          className="fixed bottom-6 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white shadow-[0_10px_30px_rgba(14,165,198,0.45)] transition-transform hover:-translate-y-1"
        >
          <ArrowUp className="h-5 w-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
