"use client";

import { motion } from "framer-motion";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { PcbCardTraces } from "@/components/ui/PcbCardTraces";

interface QuickStatsProps {
  hackathonsCount?: number;
  projectsCount?: number;
  internshipsCount?: number;
  certificationsCount?: number;
}

export function QuickStats({
  hackathonsCount = 15,
  projectsCount = 10,
  internshipsCount = 1,
  certificationsCount = 6,
}: QuickStatsProps) {
  const effectiveProjectsCount = Math.max(10, projectsCount);
  const effectiveHackathonsCount = Math.max(15, hackathonsCount);

  // Strict order: (Internship, Projects, Hackathons, Certifications)
  const stats = [
    {
      value: internshipsCount,
      suffix: "",
      label: internshipsCount === 1 ? "Internship" : "Internships",
      code: "CADENCE_COE",
    },
    {
      value: effectiveProjectsCount,
      suffix: "+",
      label: "Technical Projects",
      code: "PROJECTS_REG",
    },
    {
      value: effectiveHackathonsCount,
      suffix: "+",
      label: "Hackathons",
      code: "HACK_REG",
    },
    {
      value: certificationsCount,
      suffix: "",
      label: certificationsCount === 1 ? "Certification" : "Certifications",
      code: "VERIF_CERTS",
    },
  ];

  return (
    <section className="cv-auto-section max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.12, margin: "-40px" }}
            transition={{ duration: 0.55, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="chip-card chip-corner-markers chip-pins-x p-5 sm:p-6 text-center group relative cursor-pointer"
          >
            {/* IC Pin 1 Orientation Notch */}
            <div className="chip-notch" title="Pin 1 Index Marker" />
            {/* Circuit Trace Substrate */}
            <PcbCardTraces variant="cyan" />

            <div className="relative z-10">
              <div className="text-xs font-mono text-emerald-400/70 mb-2 uppercase tracking-widest flex items-center justify-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/80 group-hover:bg-emerald-300 transition-colors" />
                [{stat.code}]
              </div>
              <div className="text-3xl sm:text-4xl font-semibold tracking-tight mb-1 font-mono group-hover:text-emerald-400 transition-colors">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </div>
              <p className="text-xs sm:text-sm opacity-70 font-mono tracking-tight">{stat.label}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
