"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { Loader2, CheckCircle2, XCircle, Send, Terminal } from "lucide-react";

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
    <section id="contact" className="max-w-2xl mx-auto px-4 sm:px-6 py-20 sm:py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <span className="section-tag">// SEC_07 // TRANSMIT_MESSAGE</span>
        <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-3">
          Get In Touch
        </h2>
        <p className="text-sm opacity-60 mb-8 font-mono">
          Have an engineering opportunity, silicon project, or question? Send a message directly.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
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
              <label className="block text-[11px] font-mono opacity-50 uppercase mb-1.5">
                NAME_IDENTIFIER
              </label>
              <input
                type="text"
                name="name"
                placeholder="Dhinesh"
                required
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 outline-none transition-all placeholder:opacity-30 text-sm font-mono"
              />
            </div>
            <div>
              <label className="block text-[11px] font-mono opacity-50 uppercase mb-1.5">
                CONTACT_EMAIL
              </label>
              <input
                type="email"
                name="email"
                placeholder="engineer@domain.com"
                required
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 outline-none transition-all placeholder:opacity-30 text-sm font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-mono opacity-50 uppercase mb-1.5">
              SUBJECT_LINE
            </label>
            <input
              type="text"
              name="subject"
              placeholder="Collaboration / Engineering Role"
              required
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 outline-none transition-all placeholder:opacity-30 text-sm font-mono"
            />
          </div>

          <div>
            <label className="block text-[11px] font-mono opacity-50 uppercase mb-1.5">
              TRANSMISSION_PAYLOAD
            </label>
            <textarea
              name="message"
              placeholder="Type your message here..."
              required
              rows={5}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 outline-none transition-all placeholder:opacity-30 resize-none text-sm font-mono leading-relaxed"
            />
          </div>

          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full px-6 py-3.5 rounded-xl bg-white text-black text-sm font-mono font-medium hover:bg-neutral-200 transition-all disabled:opacity-50 flex items-center justify-center gap-2 group"
          >
            {status === "loading" ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <Send size={15} className="group-hover:translate-x-0.5 transition-transform" />
            )}
            {status === "loading" ? "TRANSMITTING..." : "TRANSMIT MESSAGE"}
          </button>

          {status === "success" && (
            <div className="flex items-center gap-2 p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono text-emerald-400">
              <CheckCircle2 size={16} className="shrink-0" />
              <span>PAYLOAD RECEIVED: Message dispatched successfully. I will get back to you shortly.</span>
            </div>
          )}

          {status === "error" && (
            <div className="flex items-center gap-2 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-xs font-mono text-rose-400">
              <XCircle size={16} className="shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}
        </form>
      </motion.div>
    </section>
  );
}
