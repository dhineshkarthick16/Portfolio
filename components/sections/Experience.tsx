"use client";

import { motion } from "framer-motion";
import { experience } from "@/data/experience";

export function Experience() {
  return (
    <section id="experience" className="max-w-4xl mx-auto px-6 py-24">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-semibold tracking-tight mb-10"
      >
        Experience
      </motion.h2>

      <div className="space-y-8">
        {experience.map((item, index) => (
          <motion.div
            key={item.organization}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative pl-8 border-l border-white/10"
          >
            <span className="absolute -left-[5px] top-1.5 w-[9px] h-[9px] rounded-full bg-white" />

            <h3 className="text-lg font-medium">{item.organization}</h3>
            <p className="text-sm opacity-70 mt-1">{item.role}</p>
            <p className="text-sm opacity-50 mt-1">{item.duration}</p>
            <p className="text-base opacity-80 leading-relaxed mt-3">
              {item.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
