"use client";

import { motion } from "framer-motion";

const currentlyExploring = [
  "Analog IC Design",
  "Digital VLSI",
  "Embedded AI",
  "PCB Design",
  "Flutter Development",
];

export function About() {
  return (
    <section id="about" className="max-w-4xl mx-auto px-4 sm:px-6 py-20 sm:py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <span className="section-tag">// SEC_01 // BACKGROUND</span>
        <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-6">About</h2>

        <p className="text-base sm:text-lg opacity-80 leading-relaxed mb-4">
          Hey there — I&apos;m an Electronics and Communication Engineering student at
          Chennai Institute of Technology, drawn to the space where silicon meets
          software — VLSI design, embedded systems, and AI-driven engineering.
        </p>

        <p className="text-base sm:text-lg opacity-80 leading-relaxed mb-4">
          I recently completed a VLSI internship at the Centre for Advanced Chip
          Design (Centre of Excellence), where I worked hands-on with Cadence tools
          across the full IC design flow — schematic design, custom layout,
          simulation, and DRC/LVS verification — in an ultra-low-power flip-flop
          design. That experience sharpened my interest in semiconductor technology
          and pushed me deeper into chip design.
        </p>

        <p className="text-base sm:text-lg opacity-80 leading-relaxed mb-10">
          Apart from VLSI, I build embedded and AI-based systems using ESP32,
          Flutter, Python, and C/C++, working at the intersection of hardware and
          software to turn ideas into systems that actually work in the real world.
          I believe engineering is learned by doing, not just studying — whether
          that&apos;s debugging a stubborn circuit, competing in a hackathon, or picking
          up a tool I&apos;ve never touched before.
        </p>

        <div className="chip-card chip-corner-markers p-6 sm:p-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-mono font-medium text-cyan-400 tracking-wider uppercase">
              Currently Exploring
            </h3>
            <span className="text-xs font-mono opacity-40">RESEARCH_FOCUS</span>
          </div>

          <div className="flex flex-wrap gap-2.5">
            {currentlyExploring.map((item) => (
              <span key={item} className="smd-pill">
                {item}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
