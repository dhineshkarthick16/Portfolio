"use client";

import { motion } from "framer-motion";
import { ShieldCheck, ExternalLink, Award } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { certifications } from "@/data/certifications";
import { PcbCardTraces } from "@/components/ui/PcbCardTraces";

export function Certifications() {
  return (
    <section id="certifications" className="cv-auto-section max-w-5xl mx-auto px-4 sm:px-6 py-20 sm:py-24">
      <SectionHeader
        tag="// SEC_06 // VERIFIED_CREDENTIALS"
        title="Certifications"
      />

      <div className="grid sm:grid-cols-2 gap-6">
        {certifications.map((item, index) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.12, margin: "-50px" }}
            transition={{ duration: 0.6, delay: (index % 2) * 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="chip-card chip-corner-markers chip-pins-x p-6 flex flex-col justify-between group relative"
          >
            {/* IC Pin 1 Orientation Notch */}
            <div className="chip-notch" title="Pin 1 Index Marker" />
            {/* Circuit Trace Substrate (Modeled after Image 1) */}
            <PcbCardTraces variant="amber" />

            <div className="relative z-10">
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 ic-chip-box bg-amber-500/10 border-amber-500/25 text-amber-400 shrink-0 group-hover:border-amber-400/50 transition-colors">
                    <ShieldCheck size={20} />
                  </div>
                  <div>
                    <h3 className="text-base font-medium leading-snug group-hover:text-emerald-400 transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-xs opacity-60 mt-0.5 font-mono">{item.issuer}</p>
                  </div>
                </div>
                <span className="text-xs px-2.5 py-1 rounded bg-white/5 border border-white/10 font-mono shrink-0 text-emerald-400">
                  {item.date}
                </span>
              </div>

              {/* Mini IC Component Tags */}
              {item.skills && item.skills.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {item.skills.map((skill) => (
                    <span key={skill} className="ic-pill ic-pill-amber">
                      {skill}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Action Footer with Laser Die Imprint */}
            <div className="mt-6 pt-3.5 border-t border-white/5 flex items-center justify-between text-xs font-mono relative z-10">
              <div className="flex items-center gap-2">
                <span className="chip-imprint">
                  {item.badge ? `ID:${item.badge}` : "AUTH_CHIP"}
                </span>
                <span className="opacity-25 text-[10px]">// SPEC_OK</span>
              </div>
              {item.credentialUrl && (
                <a
                  href={item.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  Verify Credential
                  <ExternalLink size={12} />
                </a>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
