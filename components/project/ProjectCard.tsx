"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, BookOpen, Cpu } from "lucide-react";
import { Project } from "@/types";
import { PcbCardTraces } from "@/components/ui/PcbCardTraces";

export function ProjectCard({
  project,
  index,
  hasStory = false,
}: {
  project: Project;
  index: number;
  hasStory?: boolean;
}) {
  const isCompleted = project.status === "Completed";

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.12, margin: "-50px" }}
      transition={{ duration: 0.6, delay: (index % 2) * 0.12, ease: [0.16, 1, 0.3, 1] }}
      className="chip-card chip-corner-markers chip-pins-x overflow-hidden flex flex-col justify-between group relative will-change-transform"
    >
      {/* IC Pin 1 Orientation Notch */}
      <div className="chip-notch" title="Pin 1 Index Marker" />
      {/* Circuit Trace Substrate (Modeled after Image 1) */}
      <PcbCardTraces variant="cyan" />

      <div className="relative z-10">
        {/* Cover / Schematic Graphic Placeholder */}
        <Link href={`/projects/${project.slug}`} className="block relative overflow-hidden">
          <div className="aspect-video bg-gradient-to-br from-emerald-950/25 via-[#0D1217] to-amber-950/20 relative flex items-center justify-center border-b border-white/5 group-hover:border-emerald-500/30 transition-colors">
            {/* Subtle circuit grid in project header */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(16,185,129,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(16,185,129,0.06)_1px,transparent_1px)] bg-[size:20px_20px]" />
            
            {/* Top-right metallic via pad & die coordinate stamp */}
            <div className="absolute top-3 right-3 flex items-center gap-2">
              <span className="chip-imprint text-[8px] opacity-40 group-hover:opacity-75">
                DIE_0x{index}F
              </span>
              <div className="flex items-center gap-1 opacity-70">
                <span className="w-2 h-2 rounded-full border border-amber-500/60 bg-amber-500/20" />
                <span className="w-1.5 h-1.5 rounded-full border border-emerald-500/60 bg-emerald-500/20" />
              </div>
            </div>

            <div className="flex flex-col items-center gap-2 text-center px-4 relative z-10">
              <div className="p-3 ic-chip-box group-hover:scale-105 transition-transform duration-200 text-emerald-400">
                <Cpu size={28} />
              </div>
              <span className="font-mono text-xs text-slate-300 group-hover:text-emerald-300 transition-colors tracking-widest">
                {project.title.toUpperCase()} // RTL_CORE
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

          {/* Mini IC Component Tags */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.techStack.map((tech) => (
              <span key={tech} className="ic-pill">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Action Footer with Laser Silkscreen Imprint */}
      <div className="px-6 py-3 border-t border-white/5 flex items-center justify-between text-xs font-mono">
        <div className="flex items-center gap-3">
          <Link
            href={`/projects/${project.slug}`}
            className="font-medium opacity-70 hover:opacity-100 hover:text-cyan-400 transition-colors flex items-center gap-1.5"
          >
            Tech Specs <ArrowRight size={13} />
          </Link>
          {hasStory ? (
            <Link
              href={`/blog/${project.slug}`}
              className="font-medium text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1.5"
            >
              <BookOpen size={13} />
              Story →
            </Link>
          ) : (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1.5"
            >
              GitHub →
            </a>
          )}
        </div>

        {/* Die Serial Silkscreen Imprint */}
        <span className="chip-imprint hidden sm:inline-block">
          PKG:QFP-64 // LOT#0{index + 1}
        </span>
      </div>
    </motion.div>
  );
}
