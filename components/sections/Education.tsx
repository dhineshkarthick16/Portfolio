"use client";

import { motion } from "framer-motion";
import { education } from "@/data/education";

export function Education() {
  return (
    <section id="education" className="max-w-4xl mx-auto px-6 py-24">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-semibold tracking-tight mb-10"
      >
        Education
      </motion.h2>

      <div className="space-y-8">
        {education.map((item, index) => (
          <motion.div
            key={`${item.institution}-${item.degree}`}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative pl-8 border-l border-white/10"
          >
            <span className="absolute -left-[5px] top-1.5 w-[9px] h-[9px] rounded-full bg-white" />

            <h3 className="text-lg font-medium">{item.institution}</h3>
            <p className="text-sm opacity-70 mt-1">
              {item.degree} — {item.field}
            </p>
            <p className="text-xs sm:text-sm opacity-50 mt-1 font-mono">{item.duration}</p>

            {item.coursework && item.coursework.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-4">
                {item.coursework.map((course) => (
                  <span
                    key={course}
                    className="px-2.5 py-0.5 rounded-full text-xs bg-white/5 border border-white/10 opacity-80 font-mono"
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
