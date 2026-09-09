"use client";

import { motion } from "framer-motion";
import { Award, Trophy } from "lucide-react";
import { achievements as defaultAchievements } from "@/data/achievements";
import { Achievement } from "@/types";

export function Achievements({ items = defaultAchievements }: { items?: Achievement[] }) {
  const displayItems = items && items.length > 0 ? items : defaultAchievements;

  return (
    <section id="achievements" className="max-w-5xl mx-auto px-4 sm:px-6 py-20 sm:py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <span className="section-tag">// SEC_06 // COMPETITIONS_&_AWARDS</span>
        <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-10">
          Achievements & Hackathons
        </h2>
      </motion.div>

      <div className="grid sm:grid-cols-2 gap-6">
        {displayItems.map((item, index) => (
          <motion.div
            key={item.id || item.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            className="chip-card chip-corner-markers p-6 flex items-start gap-4 group"
          >
            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 shrink-0 group-hover:scale-105 transition-transform">
              <Trophy size={20} />
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-base font-semibold group-hover:text-cyan-400 transition-colors">
                  {item.title}
                </h3>
              </div>
              <p className="text-xs opacity-60 mt-1 font-mono">{item.organization}</p>
              <div className="mt-3 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-mono font-medium">
                <Award size={12} />
                {item.result}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
