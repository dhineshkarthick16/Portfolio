"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Briefcase } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { experience } from "@/data/experience";
import { PcbCardTraces } from "@/components/ui/PcbCardTraces";

export function Experience() {
  return (
    <section id="experience" className="cv-auto-section max-w-4xl mx-auto px-4 sm:px-6 py-20 sm:py-24">
      <SectionHeader
        tag="// SEC_03 // INDUSTRIAL_EXPERIENCE"
        title="Experience"
      />

      <div className="space-y-8 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-[2px] before:bg-gradient-to-b before:from-emerald-400 before:via-emerald-500/20 before:to-transparent pl-8 sm:pl-10">
        {experience.map((item, index) => (
          <motion.div
            key={item.organization}
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.15, margin: "-40px" }}
            transition={{ duration: 0.6, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            {/* PCB Via Node */}
            <span className="absolute -left-[37px] sm:-left-[45px] top-1.5 flex h-4 w-4 items-center justify-center">
              <span className="h-4 w-4 rounded-full border border-amber-500/70 bg-[#0B0F12] flex items-center justify-center shadow-[0_0_8px_rgba(245,158,11,0.3)]">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              </span>
            </span>

            <div className="chip-card chip-corner-markers chip-pins-x p-6 sm:p-7 relative group overflow-hidden">
              {/* IC Pin 1 Orientation Notch */}
              <div className="chip-notch" title="Pin 1 Index Marker" />
              {/* Circuit Trace Substrate (Modeled after Image 1) */}
              <PcbCardTraces variant="cyan" />

              <div className="relative z-10">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                <h3 className="text-lg font-semibold tracking-tight text-white">
                  {item.organization}
                </h3>
                <span className="text-xs font-mono text-emerald-400 px-2.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 w-fit">
                  {item.duration}
                </span>
              </div>

              <p className="text-sm font-mono text-amber-300/80 mb-3 flex items-center gap-1.5">
                <Briefcase size={14} className="shrink-0" />
                {item.role}
              </p>

              <p className="text-base opacity-80 leading-relaxed">
                {item.description}
              </p>

              {item.slug && (
                <div className="mt-5 pt-3.5 border-t border-white/5 flex justify-end">
                  <Link
                    href={`/blog/${item.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-cyan-400 hover:text-cyan-300 transition-colors"
                  >
                    Read the internship narrative <ArrowRight size={13} />
                  </Link>
                </div>
              )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
