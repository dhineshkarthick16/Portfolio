"use client";

import { motion } from "framer-motion";
import { FileText, Download, ExternalLink } from "lucide-react";
import { siteConfig } from "@/data/site";

export function Resume() {
  return (
    <section id="resume" className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="chip-card chip-corner-markers p-7 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
      >
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 shrink-0">
            <FileText size={22} />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-lg font-semibold">Curriculum Vitae</h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                LIVE_SYNC
              </span>
            </div>
            <p className="text-sm opacity-70">
              View or download my full engineering resume as an ATS-optimized PDF (always up-to-date).
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <a
            href={siteConfig.resumeViewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 sm:flex-initial text-center px-5 py-2.5 rounded-full border border-white/20 text-sm font-medium hover:bg-white/5 transition-colors font-mono"
          >
            View
          </a>
          <a
            href={siteConfig.resumeDownloadUrl}
            download="Dhinesh_Karthick_Resume.pdf"
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-white text-black text-sm font-medium hover:bg-neutral-200 transition-all font-mono"
          >
            <Download size={15} />
            Download
          </a>
        </div>
      </motion.div>
    </section>
  );
}
