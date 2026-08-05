"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Project } from "@/types";

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      <Link
        href={`/projects/${project.slug}`}
        className="group block rounded-2xl border border-white/10 bg-white/5 overflow-hidden hover:bg-white/10 transition-colors"
      >
        <div className="aspect-video bg-white/5 relative overflow-hidden">
          {/* Replace with real cover image once available */}
          <div className="absolute inset-0 flex items-center justify-center opacity-30 text-sm">
            {project.title}
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-medium">{project.title}</h3>
            <span className="text-xs px-2 py-1 rounded-full bg-white/10 opacity-70">
              {project.status}
            </span>
          </div>

          <p className="text-sm opacity-70 mb-4 line-clamp-2">{project.description}</p>

          <div className="flex flex-wrap gap-2">
            {project.techStack.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 rounded-full text-xs bg-white/5 border border-white/10 opacity-70"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
