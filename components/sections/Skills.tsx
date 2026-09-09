"use client";

import { motion } from "framer-motion";
import { Code2, ExternalLink } from "lucide-react";
import { skills } from "@/data/skills";
import { siteConfig } from "@/data/site";
import { GithubIcon } from "@/components/icons/BrandIcons";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { PcbCardTraces } from "@/components/ui/PcbCardTraces";

export function Skills() {
  return (
    <section id="skills" className="cv-auto-section max-w-5xl mx-auto px-4 sm:px-6 py-20 sm:py-24">
      <SectionHeader
        tag="// SEC_02 // DOMAINS & TOOLCHAIN"
        title="Technical Stack"
      />

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {skills.map((group, index) => (
          <motion.div
            key={group.category}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.12, margin: "-50px" }}
            transition={{ duration: 0.6, delay: (index % 2) * 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="chip-card chip-corner-markers chip-pins-x p-6 relative"
          >
            {/* IC Pin 1 Orientation Notch */}
            <div className="chip-notch" title="Pin 1 Index Marker" />
            {/* Circuit Trace Substrate (Modeled after Image 1) */}
            <PcbCardTraces variant="cyan" />

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-2">
                <h3 className="text-xs font-mono font-medium text-emerald-400 tracking-wider uppercase flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  {group.category}
                </h3>
                <span className="text-[10px] font-mono text-amber-500/70 border border-amber-500/20 px-1.5 py-0.5 rounded bg-amber-500/5">MODULE_0{index + 1}</span>
              </div>

              {/* Miniature IC Component Tags */}
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span key={skill} className="ic-pill">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Coding Profiles */}
      <div className="grid sm:grid-cols-2 gap-6">
        <motion.a
          href={siteConfig.links.leetcode}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.12, margin: "-50px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="chip-card chip-corner-markers p-6 flex items-center justify-between group relative overflow-hidden"
        >
          {/* Circuit Trace Substrate (Modeled after Image 1) */}
          <PcbCardTraces variant="amber" />

          <div className="relative z-10 flex items-center justify-between w-full">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                <h3 className="text-xs font-mono font-medium opacity-60 tracking-wider uppercase">
                  LeetCode Profile
                </h3>
              </div>
              <p className="text-2xl font-semibold font-mono group-hover:text-cyan-400 transition-colors">
                200+ Solved
              </p>
              <span className="inline-flex items-center gap-1 text-xs opacity-50 mt-1 font-mono group-hover:opacity-100 transition-opacity">
                leetcode.com/dhineshkarthick16 <ExternalLink size={11} />
              </span>
            </div>
            <div className="p-3 ic-chip-box text-amber-400 border-amber-500/25 shrink-0">
              <Code2 size={24} className="opacity-80" />
            </div>
          </div>
        </motion.a>

        <motion.a
          href={siteConfig.links.github}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.12, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="chip-card chip-corner-markers p-6 flex items-center justify-between group relative overflow-hidden"
        >
          {/* Circuit Trace Substrate (Modeled after Image 1) */}
          <PcbCardTraces variant="cyan" />

          <div className="relative z-10 flex items-center justify-between w-full">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                <h3 className="text-xs font-mono font-medium opacity-60 tracking-wider uppercase">
                  GitHub Repositories
                </h3>
              </div>
              <p className="text-2xl font-semibold font-mono group-hover:text-cyan-400 transition-colors">
                Open Source
              </p>
              <span className="inline-flex items-center gap-1 text-xs opacity-50 mt-1 font-mono group-hover:opacity-100 transition-opacity">
                github.com/dhineshkarthick16 <ExternalLink size={11} />
              </span>
            </div>
            <div className="p-3 ic-chip-box text-cyan-400 border-cyan-500/25 shrink-0">
              <GithubIcon size={24} className="opacity-80" />
            </div>
          </div>
        </motion.a>
      </div>
    </section>
  );
}
