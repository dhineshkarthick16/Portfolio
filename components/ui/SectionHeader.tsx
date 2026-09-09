"use client";

import { motion } from "framer-motion";

interface SectionHeaderProps {
  tag: string;
  title: string;
  description?: string;
  className?: string;
}

export function SectionHeader({
  tag,
  title,
  description,
  className = "mb-10",
}: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.15, margin: "-40px" }}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      className={`${className} will-change-transform`}
    >
      <div className="flex items-center gap-3 mb-2">
        <span className="section-tag mb-0">{tag}</span>
        {/* Animated Expanding PCB Circuit Trace Line */}
        <div className="flex-1 h-px relative overflow-hidden bg-white/5 max-w-xs">
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: false, amount: 0.15, margin: "-40px" }}
            transition={{ duration: 0.75, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="origin-left h-full bg-gradient-to-r from-emerald-400 via-cyan-400 to-transparent will-change-transform"
          />
        </div>
      </div>

      <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">
        {title}
      </h2>

      {description && (
        <p className="text-sm opacity-60 mt-2 font-mono max-w-xl">
          {description}
        </p>
      )}
    </motion.div>
  );
}
