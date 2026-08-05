"use client";

import { motion } from "framer-motion";

const currentlyExploring = [
  "Analog IC Design",
  "Digital VLSI",
  "Embedded AI",
  "PCB Design",
  "Flutter Development",
];

export function About() {
  return (
    <section id="about" className="max-w-4xl mx-auto px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-semibold tracking-tight mb-6">About</h2>

        <p className="text-base md:text-lg opacity-80 leading-relaxed mb-4">
          I&apos;m an Electronics and Communication Engineering student with a
          deep interest in semiconductor engineering, embedded systems, and
          AI-powered hardware. I enjoy solving real-world engineering problems
          by combining rigorous fundamentals with hands-on building.
        </p>

        <p className="text-base md:text-lg opacity-80 leading-relaxed mb-10">
          From VLSI design to on-device machine learning, I&apos;m drawn to
          projects that sit at the intersection of hardware and software —
          where understanding the physics matters as much as writing the code.
        </p>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h3 className="text-sm font-medium opacity-60 mb-4 tracking-wide uppercase">
            Currently Exploring
          </h3>
          <div className="flex flex-wrap gap-2">
            {currentlyExploring.map((item) => (
              <span
                key={item}
                className="px-3 py-1.5 rounded-full text-sm bg-white/10 border border-white/10"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
