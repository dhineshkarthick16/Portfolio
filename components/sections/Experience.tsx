"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Briefcase } from "lucide-react";
import { experience } from "@/data/experience";

export function Experience() {
  return (
    <section id="experience" className="max-w-4xl mx-auto px-4 sm:px-6 py-20 sm:py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <span className="section-tag">// SEC_05 // INDUSTRIAL_EXPERIENCE</span>
        <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-10">
          Experience
        </h2>
      </motion.div>

      <div className="space-y-8 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-[2px] before:bg-gradient-to-b before:from-cyan-400 before:via-cyan-500/20 before:to-transparent pl-8 sm:pl-10">
        {experience.map((item, index) => (
          <motion.div
            key={item.organization}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative"
          >
            {/* PCB Via Node */}
            <span className="absolute -left-[37px] sm:-left-[45px] top-1.5 flex h-4 w-4 items-center justify-center">
              <span className="h-4 w-4 rounded-full border border-cyan-400 bg-black flex items-center justify-center">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
              </span>
            </span>

            <div className="chip-card chip-corner-markers p-6 sm:p-7">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                <h3 className="text-lg font-semibold tracking-tight text-white dark:text-neutral-100">
                  {item.organization}
                </h3>
                <span className="text-xs font-mono text-cyan-400 px-2.5 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20 w-fit">
                  {item.duration}
                </span>
              </div>

              <p className="text-sm font-mono text-cyan-300/80 mb-3 flex items-center gap-1.5">
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
          </motion.div>
        ))}
      </div>
    </section>
  );
}
