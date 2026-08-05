"use client";

import { motion } from "framer-motion";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";

const stats = [
  { value: 200, suffix: "+", label: "LeetCode Problems" },
  { value: 1, suffix: "", label: "Internship" },
  { value: 4, suffix: "+", label: "Hackathons" },
  { value: 15, suffix: "+", label: "Technical Projects" },
];

export function QuickStats() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-16">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center"
          >
            <div className="text-3xl md:text-4xl font-semibold tracking-tight mb-1">
              <AnimatedCounter value={stat.value} suffix={stat.suffix} />
            </div>
            <p className="text-sm opacity-60">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
