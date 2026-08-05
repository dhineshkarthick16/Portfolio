"use client";

import { motion } from "framer-motion";
import { Code2 } from "lucide-react";
import { skills } from "@/data/skills";
import { siteConfig } from "@/data/site";
import { GithubIcon } from "@/components/icons/BrandIcons";

export function Skills() {
  return (
    <section id="skills" className="max-w-5xl mx-auto px-6 py-24">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-semibold tracking-tight mb-10"
      >
        Skills
      </motion.h2>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {skills.map((group, index) => (
          <motion.div
            key={group.category}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            className="rounded-2xl border border-white/10 bg-white/5 p-6"
          >
            <h3 className="text-sm font-medium opacity-60 mb-4 tracking-wide uppercase">
              {group.category}
            </h3>
            <div className="flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1.5 rounded-full text-sm bg-white/10 border border-white/10"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Coding Profiles */}
      <div className="grid md:grid-cols-2 gap-6">
        <motion.a
          href={siteConfig.links.leetcode}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl border border-white/10 bg-white/5 p-6 flex items-center justify-between hover:bg-white/10 transition-colors"
        >
          <div>
            <h3 className="text-sm font-medium opacity-60 mb-2 tracking-wide uppercase">
              LeetCode
            </h3>
            <p className="text-2xl font-semibold">200+ Problems Solved</p>
          </div>
          <Code2 size={24} className="opacity-50" />
        </motion.a>

        <motion.a
          href={siteConfig.links.github}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.08 }}
          className="rounded-2xl border border-white/10 bg-white/5 p-6 flex items-center justify-between hover:bg-white/10 transition-colors"
        >
          <div>
            <h3 className="text-sm font-medium opacity-60 mb-2 tracking-wide uppercase">
              GitHub
            </h3>
            <p className="text-2xl font-semibold">View Profile</p>
          </div>
          <GithubIcon size={24} className="opacity-50" />
        </motion.a>
      </div>
    </section>
  );
}
