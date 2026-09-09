"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { BookOpen, ArrowRight } from "lucide-react";
import { PcbCardTraces } from "@/components/ui/PcbCardTraces";

export function KnowledgeHubPreview() {
  return (
    <section className="cv-auto-section max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.15, margin: "-40px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="chip-card chip-corner-markers chip-pins-x p-7 sm:p-8 relative group cursor-pointer overflow-hidden"
      >
        {/* IC Pin 1 Orientation Notch */}
        <div className="chip-notch" title="Pin 1 Index Marker" />
        {/* Circuit Trace Substrate (Modeled after Image 1) */}
        <PcbCardTraces variant="cyan" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 w-full">
          <div className="flex items-start gap-4">
            <div className="p-3 ic-chip-box bg-cyan-500/10 border-cyan-500/20 text-cyan-400 shrink-0">
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
            className="capacitive-btn text-xs py-2.5 px-5 border-cyan-500/40 text-cyan-300 hover:text-white group whitespace-nowrap"
          >
            <span>Visit Knowledge Hub</span>
            <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform text-cyan-400" />
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
