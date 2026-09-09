"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { BookOpen, ArrowRight } from "lucide-react";

export function KnowledgeHubPreview() {
  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="chip-card chip-corner-markers p-7 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
      >
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 shrink-0">
            <BookOpen size={22} />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-lg font-semibold">Knowledge Hub</h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                NOTES & PAPERS
              </span>
            </div>
            <p className="text-sm opacity-70 leading-relaxed max-w-xl">
              Technical write-ups and design notes on CMOS flip-flop architectures, RTOS drivers, and edge anomaly detection.
            </p>
          </div>
        </div>

        <Link
          href="/knowledge-hub"
          className="inline-flex items-center gap-2 text-sm font-mono font-medium text-cyan-400 hover:text-cyan-300 transition-colors whitespace-nowrap"
        >
          Visit Knowledge Hub
          <ArrowRight size={15} />
        </Link>
      </motion.div>
    </section>
  );
}
