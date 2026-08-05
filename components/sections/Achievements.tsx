"use client";

import { motion } from "framer-motion";
import { Award } from "lucide-react";
import { achievements } from "@/data/achievements";

export function Achievements() {
  return (
    <section id="achievements" className="max-w-5xl mx-auto px-6 py-24">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-semibold tracking-tight mb-10"
      >
        Achievements
      </motion.h2>

      <div className="grid sm:grid-cols-2 gap-6">
        {achievements.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            className="rounded-2xl border border-white/10 bg-white/5 p-6 flex items-start gap-4"
          >
            <div className="p-2.5 rounded-full bg-white/10 shrink-0">
              <Award size={20} className="opacity-80" />
            </div>
            <div>
              <h3 className="text-base font-medium">{item.title}</h3>
              <p className="text-sm opacity-60 mt-1">{item.organization}</p>
              <p className="text-sm opacity-80 mt-2 font-medium">{item.result}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
