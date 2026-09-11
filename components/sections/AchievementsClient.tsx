"use client";

import { motion } from "framer-motion";
import { Award, Trophy, Medal, CheckCircle2 } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Achievement } from "@/types";
import { PcbCardTraces } from "@/components/ui/PcbCardTraces";

function getTierStyle(rawResult?: string, result?: string) {
  const text = (rawResult || result || "").toLowerCase();

  // 1. Winner (Gold / Amber Accent)
  if (text.includes("winner") || text.includes("won") || text.includes("1st")) {
    return {
      tier: "Winner",
      icon: Trophy,
      iconContainer:
        "bg-amber-500/15 border-amber-500/30 text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.15)]",
      badge: "bg-amber-500/15 border-amber-500/30 text-amber-300",
      cardBorder: "hover:border-amber-500/40",
    };
  }

  // 2. Runner-up (Silver / Slate Secondary)
  if (text.includes("runner-up") || text.includes("runner up") || text.includes("2nd")) {
    return {
      tier: "Runner-up",
      icon: Medal,
      iconContainer:
        "bg-slate-300/10 border-slate-300/30 text-slate-200 shadow-[0_0_15px_rgba(203,213,225,0.1)]",
      badge: "bg-slate-300/10 border-slate-300/25 text-slate-200",
      cardBorder: "hover:border-slate-300/40",
    };
  }

  // 3. Finalist (Bronze / Copper Accent)
  if (
    text.includes("finalist") ||
    text.includes("top 10") ||
    text.includes("top 30") ||
    text.includes("top 50") ||
    text.includes("3rd")
  ) {
    return {
      tier: "Finalist",
      icon: Award,
      iconContainer:
        "bg-orange-500/15 border-orange-500/30 text-orange-400 shadow-[0_0_15px_rgba(249,115,22,0.15)]",
      badge: "bg-orange-500/15 border-orange-500/30 text-orange-300",
      cardBorder: "hover:border-orange-500/40",
    };
  }

  // 4. Shortlisted (Muted / Neutral Treatment)
  return {
    tier: "Shortlisted",
    icon: CheckCircle2,
    iconContainer: "bg-white/5 border-white/10 text-slate-400",
    badge: "bg-white/5 border-white/10 text-slate-300",
    cardBorder: "hover:border-white/20",
  };
}

export function AchievementsClient({ items }: { items: Achievement[] }) {
  return (
    <section id="achievements" className="cv-auto-section max-w-5xl mx-auto px-4 sm:px-6 py-20 sm:py-24">
      <SectionHeader
        tag="// SEC_05 // COMPETITIONS_&_AWARDS"
        title="Achievements & Hackathons"
      />

      <div className="grid sm:grid-cols-2 gap-6">
        {items.map((item, index) => {
          const style = getTierStyle(item.rawResult, item.result);
          const IconComponent = style.icon;

          return (
            <motion.div
              key={item.id || item.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.12, margin: "-50px" }}
              transition={{ duration: 0.6, delay: (index % 2) * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className={`chip-card chip-corner-markers chip-pins-x relative p-6 flex items-start gap-4 group transition-colors overflow-hidden ${style.cardBorder}`}
            >
              {/* IC Pin 1 Orientation Notch */}
              <div className="chip-notch" title="Pin 1 Index Marker" />
              {/* Circuit Trace Substrate (Modeled after Image 1) */}
              <PcbCardTraces variant={style.tier === "Winner" ? "amber" : "cyan"} />

              {item.date && (
                <span className="absolute top-4 right-4 sm:top-5 sm:right-5 text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-slate-400 shrink-0 select-none z-20">
                  {item.date}
                </span>
              )}
              <div className="relative z-10 flex items-start gap-4 w-full">
                <div
                  className={`p-3 ic-chip-box border shrink-0 ${style.iconContainer}`}
                >
                  <IconComponent size={20} />
                </div>
                <div className="flex-1 min-w-0 pr-16 sm:pr-20">
                  <h3 className="text-base font-semibold group-hover:text-cyan-400 transition-colors leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs opacity-60 font-mono mt-1">{item.organization}</p>
                  <div
                    className={`mt-3 ic-pill ${style.badge}`}
                  >
                    <Award size={12} />
                    {item.result}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
