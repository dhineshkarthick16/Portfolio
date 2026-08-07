"use client";

import { motion } from "framer-motion";
import { FileText, Download } from "lucide-react";
import { siteConfig } from "@/data/site";

export function Resume() {
  return (
    <section id="resume" className="max-w-4xl mx-auto px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="rounded-2xl border border-white/10 bg-white/5 p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
      >
        <div className="flex items-start gap-4">
          <div className="p-2.5 rounded-full bg-white/10 shrink-0">
            <FileText size={20} className="opacity-80" />
          </div>
          <div>
            <h3 className="text-lg font-medium mb-1">Resume</h3>
            <p className="text-sm opacity-60">View or download my full resume as a PDF.</p>
          </div>
        </div>

        <div className="flex gap-3">
          <a
            href={siteConfig.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-full border border-white/20 text-sm font-medium hover:bg-white/5 transition-colors"
          >
            View
          </a>
          <a
            href={siteConfig.resumeUrl}
            download
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black text-sm font-medium hover:opacity-90 transition-opacity"
          >
            <Download size={16} />
            Download
          </a>
        </div>
      </motion.div>
    </section>
  );
}
