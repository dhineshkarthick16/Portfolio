"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { BookOpen, ArrowRight } from "lucide-react";

export function KnowledgeHubPreview() {
  return (
    <section className="max-w-4xl mx-auto px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="rounded-2xl border border-white/10 bg-white/5 p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
      >
        <div className="flex items-start gap-4">
          <div className="p-2.5 rounded-full bg-white/10 shrink-0">
            <BookOpen size={20} className="opacity-80" />
          </div>
          <div>
            <h3 className="text-lg font-medium mb-1">Knowledge Hub</h3>
            <p className="text-sm opacity-60">
              Technical write-ups on VLSI, embedded systems, and AI — coming soon.
            </p>
          </div>
        </div>

        <Link
          href="/knowledge-hub"
          className="inline-flex items-center gap-2 text-sm font-medium opacity-80 hover:opacity-100 transition-opacity whitespace-nowrap"
        >
          Visit Knowledge Hub
          <ArrowRight size={16} />
        </Link>
      </motion.div>
    </section>
  );
}
