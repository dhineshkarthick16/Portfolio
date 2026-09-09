"use client";

import { motion } from "framer-motion";
import { FileText, Download, ExternalLink } from "lucide-react";
import { siteConfig } from "@/data/site";
import { PcbCardTraces } from "@/components/ui/PcbCardTraces";

export function Resume() {
  return (
    <section id="resume" className="cv-auto-section max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.15, margin: "-40px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="chip-card chip-corner-markers chip-pins-x p-7 sm:p-8 relative group cursor-pointer overflow-hidden"
      >
        {/* IC Pin 1 Orientation Notch */}
        <div className="chip-notch" title="Pin 1 Index Marker" />
        {/* Circuit Trace Substrate (Modeled after Image 1) */}
        <PcbCardTraces variant="emerald" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 w-full">
          <div className="flex items-start gap-4">
            <div className="p-3 ic-chip-box bg-emerald-500/10 border-emerald-500/20 text-emerald-400 shrink-0">
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
              className="capacitive-btn capacitive-btn-copper flex-1 sm:flex-initial text-center text-xs py-2.5 px-5"
            >
              <ExternalLink size={14} className="text-amber-400" />
              View
            </a>
            <a
              href={siteConfig.resumeDownloadUrl}
              download="Dhinesh_Karthick_Resume.pdf"
              className="capacitive-btn flex-1 sm:flex-initial text-center text-xs py-2.5 px-5 border-emerald-500/50 text-emerald-300 hover:text-white"
            >
              <Download size={14} className="text-emerald-400" />
              Download
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
