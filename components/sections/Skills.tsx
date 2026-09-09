"use client";

import { motion } from "framer-motion";
import { Code2, ExternalLink } from "lucide-react";
import { skills } from "@/data/skills";
import { siteConfig } from "@/data/site";
import { GithubIcon } from "@/components/icons/BrandIcons";

export function Skills() {
  return (
    <section id="skills" className="max-w-5xl mx-auto px-4 sm:px-6 py-20 sm:py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <span className="section-tag">// SEC_02 // DOMAINS & TOOLCHAIN</span>
        <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-10">
          Technical Stack
        </h2>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {skills.map((group, index) => (
          <motion.div
            key={group.category}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            className="chip-card p-6"
          >
            <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-2">
              <h3 className="text-xs font-mono font-medium text-cyan-400 tracking-wider uppercase">
                {group.category}
              </h3>
              <span className="text-[10px] font-mono opacity-40">MODULE_0{index + 1}</span>
            </div>

            <div className="flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <span key={skill} className="smd-pill">
                  {skill}
                </span>
              ))}
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
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="chip-card chip-corner-markers p-6 flex items-center justify-between group"
        >
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
          <div className="p-3 rounded-xl bg-white/5 group-hover:bg-white/10 transition-colors">
            <Code2 size={24} className="opacity-60 text-amber-400" />
          </div>
        </motion.a>

        <motion.a
          href={siteConfig.links.github}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.08 }}
          className="chip-card chip-corner-markers p-6 flex items-center justify-between group"
        >
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
          <div className="p-3 rounded-xl bg-white/5 group-hover:bg-white/10 transition-colors">
            <GithubIcon size={24} className="opacity-60 text-cyan-400" />
          </div>
        </motion.a>
      </div>
    </section>
  );
}
