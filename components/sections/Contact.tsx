"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { Loader2, CheckCircle2, XCircle, Send, Terminal } from "lucide-react";

import { SectionHeader } from "@/components/ui/SectionHeader";
import { PcbCardTraces } from "@/components/ui/PcbCardTraces";

type Status = "idle" | "loading" | "success" | "error";

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    // Honeypot check
    if (formData.get("company")) {
      setStatus("success");
      return;
    }

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const subject = formData.get("subject") as string;
    const message = formData.get("message") as string;

    if (!name.trim() || !email.trim() || !subject.trim() || !message.trim()) {
      setStatus("error");
      setErrorMsg("Please fill in all fields.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setStatus("error");
      setErrorMsg("Please enter a valid email address.");
      return;
    }

    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, subject, message }),
      });

      if (!res.ok) throw new Error("Failed to send message");

      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setErrorMsg("Something went wrong. Please try again or email me directly.");
    }
  }

  return (
    <section id="contact" className="cv-auto-section max-w-2xl mx-auto px-4 sm:px-6 py-20 sm:py-24">
      <SectionHeader
        tag="// SEC_08 // TRANSMIT_MESSAGE"
        title="Get In Touch"
        description="Have an engineering opportunity, silicon project, or question? Send a message directly."
      />

      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.15, margin: "-40px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="space-y-4 chip-card chip-corner-markers chip-pins-x p-6 sm:p-8 relative overflow-hidden"
      >
        {/* IC Pin 1 Orientation Notch */}
        <div className="chip-notch" title="Pin 1 Index Marker" />
        {/* Circuit Trace Substrate (Modeled after Image 1) */}
        <PcbCardTraces variant="cyan" />
          {/* Honeypot field */}
          <input
            type="text"
            name="company"
            tabIndex={-1}
            autoComplete="off"
            className="absolute -left-[9999px] w-px h-px opacity-0"
            aria-hidden="true"
          />

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-mono text-emerald-400/70 tracking-wider uppercase mb-1.5">
                // NAME_IDENTIFIER
              </label>
              <input
                type="text"
                name="name"
                placeholder="Dhinesh Karthick"
                required
                className="w-full px-4 py-2.5 rounded-lg bg-black/40 border border-white/10 focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/20 outline-none transition-all placeholder:opacity-25 text-sm font-mono text-slate-200"
              />
            </div>
            <div>
              <label className="block text-[10px] font-mono text-emerald-400/70 tracking-wider uppercase mb-1.5">
                // CONTACT_EMAIL
              </label>
              <input
                type="email"
                name="email"
                placeholder="engineer@domain.com"
                required
                className="w-full px-4 py-2.5 rounded-lg bg-black/40 border border-white/10 focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/20 outline-none transition-all placeholder:opacity-25 text-sm font-mono text-slate-200"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-mono text-emerald-400/70 tracking-wider uppercase mb-1.5">
              // SUBJECT_LINE
            </label>
            <input
              type="text"
              name="subject"
              placeholder="Hardware / Firmware / Engineering Collaboration"
              required
              className="w-full px-4 py-2.5 rounded-lg bg-black/40 border border-white/10 focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/20 outline-none transition-all placeholder:opacity-25 text-sm font-mono text-slate-200"
            />
          </div>

          <div>
            <label className="block text-[10px] font-mono text-emerald-400/70 tracking-wider uppercase mb-1.5">
              // TRANSMISSION_PAYLOAD
            </label>
            <textarea
              name="message"
              placeholder="Type your transmission payload here..."
              required
              rows={5}
              className="w-full px-4 py-2.5 rounded-lg bg-black/40 border border-white/10 focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/20 outline-none transition-all placeholder:opacity-25 resize-none text-sm font-mono text-slate-200 leading-relaxed"
            />
          </div>

          <button
            type="submit"
            disabled={status === "loading"}
            className="capacitive-btn w-full py-3 border-emerald-500/50 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 hover:text-white font-mono text-xs tracking-wider disabled:opacity-50 flex items-center justify-center gap-2 group cursor-pointer"
          >
            {status === "loading" ? (
              <Loader2 size={16} className="animate-spin text-emerald-400" />
            ) : (
              <Send size={15} className="group-hover:translate-x-0.5 transition-transform text-emerald-400" />
            )}
            {status === "loading" ? "TRANSMITTING_PAYLOAD..." : "TRANSMIT_MESSAGE"}
          </button>

          {status === "success" && (
            <div className="flex items-center gap-2 p-3.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-xs font-mono text-emerald-300">
              <CheckCircle2 size={16} className="shrink-0 text-emerald-400" />
              <span>PAYLOAD RECEIVED: Message dispatched successfully. Handshake confirmed.</span>
            </div>
          )}

          {status === "error" && (
            <div className="flex items-center gap-2 p-3.5 rounded-lg bg-rose-500/10 border border-rose-500/30 text-xs font-mono text-rose-300">
              <XCircle size={16} className="shrink-0 text-rose-400" />
              <span>{errorMsg}</span>
            </div>
          )}
        </motion.form>
    </section>
  );
}
