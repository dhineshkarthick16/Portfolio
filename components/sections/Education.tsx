"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { education } from "@/data/education";

export function Education() {
  return (
    <section id="education" className="cv-auto-section max-w-4xl mx-auto px-6 py-24">
      <SectionHeader
        tag="// SEC_07 // ACADEMIC_TRACK"
        title="Education"
      />

      <div className="space-y-8">
        {education.map((item, index) => (
          <motion.div
            key={`${item.institution}-${item.degree}`}
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.15, margin: "-40px" }}
            transition={{ duration: 0.6, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="relative pl-8 border-l border-emerald-500/20"
          >
            {/* PCB Via Solder Node */}
            <span className="absolute -left-[7px] top-1.5 w-3 h-3 rounded-full border border-amber-500/60 bg-[#0B0F12] flex items-center justify-center shadow-[0_0_6px_rgba(245,158,11,0.25)]">
              <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
            </span>

            <h3 className="text-lg font-medium text-slate-100">{item.institution}</h3>
            <p className="text-sm text-slate-300/80 mt-1">
              {item.degree} — {item.field}
            </p>
            <p className="text-xs sm:text-sm text-emerald-400/80 mt-1 font-mono">{item.duration}</p>

            {item.coursework && item.coursework.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-4">
                {item.coursework.map((course) => (
                  <span
                    key={course}
                    className="ic-pill text-xs"
                  >
                    {course}
                  </span>
                ))}
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
