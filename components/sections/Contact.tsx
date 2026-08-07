"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { Loader2, CheckCircle2, XCircle } from "lucide-react";

type Status = "idle" | "loading" | "success" | "error";

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    // Honeypot check — bots fill every field, humans never see or fill this one
    if (formData.get("company")) {
      // Silently pretend success to not tip off the bot
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
    <section id="contact" className="max-w-2xl mx-auto px-6 py-24">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-semibold tracking-tight mb-10"
      >
        Contact
      </motion.h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Honeypot field — hidden from real users via CSS, bots fill it anyway */}
        <input
          type="text"
          name="company"
          tabIndex={-1}
          autoComplete="off"
          className="absolute -left-[9999px] w-px h-px opacity-0"
          aria-hidden="true"
        />

        <input
          type="text"
          name="name"
          placeholder="Name"
          required
          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-white/30 outline-none transition-colors placeholder:opacity-40"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-white/30 outline-none transition-colors placeholder:opacity-40"
        />

        <input
          type="text"
          name="subject"
          placeholder="Subject"
          required
          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-white/30 outline-none transition-colors placeholder:opacity-40"
        />

        <textarea
          name="message"
          placeholder="Message"
          required
          rows={5}
          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-white/30 outline-none transition-colors placeholder:opacity-40 resize-none"
        />

        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full px-6 py-3 rounded-full bg-white text-black text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {status === "loading" && <Loader2 size={16} className="animate-spin" />}
          {status === "loading" ? "Sending..." : "Send Message"}
        </button>

        {status === "success" && (
          <p className="flex items-center gap-2 text-sm text-green-400">
            <CheckCircle2 size={16} />
            Message sent — I&apos;ll get back to you soon.
          </p>
        )}

        {status === "error" && (
          <p className="flex items-center gap-2 text-sm text-red-400">
            <XCircle size={16} />
            {errorMsg}
          </p>
        )}
      </form>
    </section>
  );
}
