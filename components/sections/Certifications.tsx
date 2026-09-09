"use client";

import { motion } from "framer-motion";
import { ShieldCheck, ExternalLink, Award } from "lucide-react";
import { certifications } from "@/data/certifications";

export function Certifications() {
  return (
    <section id="certifications" className="max-w-5xl mx-auto px-4 sm:px-6 py-20 sm:py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <span className="section-tag">// SEC_03 // VERIFIED_CREDENTIALS</span>
        <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-10">
          Certifications
        </h2>
      </motion.div>

      <div className="grid sm:grid-cols-2 gap-6">
        {certifications.map((item, index) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            className="chip-card chip-corner-markers p-6 flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 shrink-0">
                    <ShieldCheck size={20} />
                  </div>
                  <div>
                    <h3 className="text-base font-medium leading-snug group-hover:text-cyan-400 transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-xs opacity-60 mt-0.5 font-mono">{item.issuer}</p>
                  </div>
                </div>
                <span className="text-xs px-2.5 py-1 rounded bg-white/5 border border-white/10 opacity-70 font-mono shrink-0 text-cyan-300">
                  {item.date}
                </span>
              </div>

              {item.skills && item.skills.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {item.skills.map((skill) => (
                    <span key={skill} className="smd-pill text-[11px]">
                      {skill}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {item.credentialUrl && (
              <div className="mt-6 pt-3.5 border-t border-white/5 flex items-center justify-between text-xs font-mono">
                <span className="opacity-40 text-[11px]">CRED_ID: VERIFIED</span>
                <a
                  href={item.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  Verify Credential
                  <ExternalLink size={12} />
                </a>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
