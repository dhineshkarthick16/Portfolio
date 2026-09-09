"use client";

import { motion } from "framer-motion";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";

const stats = [
  { value: 200, suffix: "+", label: "LeetCode Problems", code: "ALGO_01" },
  { value: 1, suffix: "", label: "Internship", code: "CADENCE_COE" },
  { value: 5, suffix: "+", label: "Hackathons", code: "HACK_REG" },
  { value: 10, suffix: "+", label: "Technical Projects", code: "PROJECTS_REG" },
];

export function QuickStats() {
  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            className="chip-card chip-corner-markers p-5 sm:p-6 text-center group"
          >
            <div className="text-xs font-mono text-cyan-400/60 mb-2 uppercase tracking-widest">
              [{stat.code}]
            </div>
            <div className="text-3xl sm:text-4xl font-semibold tracking-tight mb-1 font-mono group-hover:text-cyan-400 transition-colors">
              <AnimatedCounter value={stat.value} suffix={stat.suffix} />
            </div>
            <p className="text-xs sm:text-sm opacity-70 font-mono tracking-tight">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
