"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, BookOpen, Cpu } from "lucide-react";
import { Project } from "@/types";

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const isCompleted = project.status === "Completed";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="chip-card chip-corner-markers overflow-hidden flex flex-col justify-between group"
    >
      <div>
        {/* Cover / Schematic Graphic Placeholder */}
        <Link href={`/projects/${project.slug}`} className="block relative overflow-hidden">
          <div className="aspect-video bg-gradient-to-br from-cyan-950/20 via-black/40 to-slate-950/40 relative flex items-center justify-center border-b border-white/5 group-hover:border-cyan-500/20 transition-colors">
            {/* Subtle grid lines in project header */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(56,189,248,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(56,189,248,0.04)_1px,transparent_1px)] bg-[size:20px_20px]" />
            
            <div className="flex flex-col items-center gap-2 text-center px-4 relative z-10">
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 group-hover:scale-105 group-hover:border-cyan-500/30 transition-all text-cyan-400">
                <Cpu size={28} />
              </div>
              <span className="font-mono text-xs opacity-70 tracking-wider">
                {project.title.toUpperCase()} // RTL
              </span>
            </div>
          </div>
        </Link>

        <div className="p-6 pb-2">
          {/* Header & Status */}
          <div className="flex items-center justify-between gap-3 mb-2.5">
            <Link href={`/projects/${project.slug}`}>
              <h3 className="text-lg font-semibold tracking-tight group-hover:text-cyan-400 transition-colors">
                {project.title}
              </h3>
            </Link>

            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono bg-white/5 border border-white/10 shrink-0">
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  isCompleted ? "bg-emerald-400" : "bg-amber-400 animate-pulse"
                }`}
              />
              <span className="opacity-80">{project.status}</span>
            </span>
          </div>

          <p className="text-sm opacity-70 mb-4 line-clamp-2 leading-relaxed">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.techStack.map((tech) => (
              <span key={tech} className="smd-pill text-[11px]">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="px-6 py-3.5 border-t border-white/5 flex items-center justify-between text-xs font-mono">
        <Link
          href={`/projects/${project.slug}`}
          className="font-medium opacity-70 hover:opacity-100 hover:text-cyan-400 transition-colors flex items-center gap-1.5"
        >
          Tech Specs <ArrowRight size={13} />
        </Link>
        <Link
          href={`/blog/${project.slug}`}
          className="font-medium text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1.5"
        >
          <BookOpen size={13} />
          Read the story →
        </Link>
      </div>
    </motion.div>
  );
}
