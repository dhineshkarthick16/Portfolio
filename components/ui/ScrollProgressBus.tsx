"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";

export function ScrollProgressBus() {
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    restDelta: 0.001,
  });

  const percentage = useTransform(smoothProgress, (p) => Math.round(p * 100));
  const percentRef = useRef<HTMLSpanElement>(null);

  // Throttled rAF text update - zero React re-renders while scrolling
  useEffect(() => {
    let ticking = false;
    return percentage.on("change", (latest) => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (percentRef.current) {
            percentRef.current.textContent = `${latest}%`;
          }
          ticking = false;
        });
        ticking = true;
      }
    });
  }, [percentage]);

  const opacity25 = useTransform(smoothProgress, (p) => (p >= 0.25 ? 1 : 0.2));
  const opacity50 = useTransform(smoothProgress, (p) => (p >= 0.5 ? 1 : 0.2));
  const opacity75 = useTransform(smoothProgress, (p) => (p >= 0.75 ? 1 : 0.2));

  const milestones = [
    { pos: 0.25, opacity: opacity25 },
    { pos: 0.5, opacity: opacity50 },
    { pos: 0.75, opacity: opacity75 },
  ];

  return (
    <div className="fixed top-0 inset-x-0 z-50 pointer-events-none select-none contain-strict">
      {/* Background Micro-Trace Channel */}
      <div className="h-[3px] w-full bg-[#0B0F12]/80 backdrop-blur-sm border-b border-white/5 relative">
        {/* Active Charging Bus Trace (GPU ScaleX) */}
        <motion.div
          style={{ scaleX: smoothProgress }}
          className="h-full origin-left bg-gradient-to-r from-emerald-500 via-cyan-400 to-amber-400 shadow-[0_0_10px_#00FF66] will-change-transform"
        />

        {/* Milestone Solder Vias (25%, 50%, 75%) - Pure Opacity Fading */}
        {milestones.map(({ pos, opacity }) => (
          <div
            key={pos}
            style={{ left: `${pos * 100}%` }}
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full border border-white/20 bg-[#0B0F12]"
          >
            <motion.div
              style={{ opacity }}
              className="w-full h-full rounded-full bg-[#00FF66] shadow-[0_0_6px_#00FF66] will-change-[opacity]"
            />
          </div>
        ))}
      </div>

      {/* Subtle Right-Edge Telemetry Readout */}
      <div className="absolute top-2 right-4 hidden sm:flex items-center gap-2 px-2 py-0.5 rounded bg-black/60 border border-white/10 font-mono text-[9px] text-slate-400">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        <span className="text-emerald-400 font-semibold">BUS_PWR</span>
        <span className="opacity-40">|</span>
        <span ref={percentRef}>0%</span>
      </div>
    </div>
  );
}
