"use client";

import { useEffect, useRef } from "react";

export function PcbTraces() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;
    let lastScrollY = 0;
    const el = containerRef.current;
    if (!el) return;

    function onScroll() {
      lastScrollY = window.scrollY;
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (el) {
            const offset = Math.min(140, (lastScrollY / 3000) * 140);
            el.style.transform = `translate3d(0, -${offset}px, 0)`;
          }
          ticking = false;
        });
        ticking = true;
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden opacity-40 select-none contain-strict">
      <div
        ref={containerRef}
        className="w-full h-full will-change-transform"
        style={{ transform: "translate3d(0, 0, 0)" }}
      >
        <svg
          className="w-full h-full min-h-[1800px]"
          viewBox="0 0 1440 2400"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMin slice"
        >
          <defs>
            {/* Signal Current Linear Gradients */}
            <linearGradient id="signal-green" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10B981" stopOpacity="0" />
              <stop offset="50%" stopColor="#00FF66" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
            </linearGradient>

            <linearGradient id="signal-copper" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#D97706" stopOpacity="0" />
              <stop offset="50%" stopColor="#F59E0B" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#D97706" stopOpacity="0" />
            </linearGradient>

            <linearGradient id="signal-cyan" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#06B6D4" stopOpacity="0" />
              <stop offset="50%" stopColor="#38BDF8" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#06B6D4" stopOpacity="0" />
            </linearGradient>

            {/* Via Pad Reusable Definition */}
            <g id="via-node">
              <circle cx="0" cy="0" r="6" fill="#D97706" fillOpacity="0.3" stroke="#F59E0B" strokeWidth="1" strokeOpacity="0.5" />
              <circle cx="0" cy="0" r="2.5" fill="#0B0F12" stroke="#10B981" strokeWidth="0.8" strokeOpacity="0.6" />
            </g>
            
            <g id="via-node-green">
              <circle cx="0" cy="0" r="5.5" fill="#10B981" fillOpacity="0.25" stroke="#00FF66" strokeWidth="1" strokeOpacity="0.6" />
              <circle cx="0" cy="0" r="2.5" fill="#0B0F12" />
            </g>
          </defs>

          {/* -------------------------------------------------------------
              TRACE SYSTEM 1: Left Spine Circuit Bus (Copper + Green)
              ------------------------------------------------------------- */}
          {/* Static Background Copper Trace */}
          <path
            d="M 120 0 L 120 380 L 180 440 L 180 820 L 140 860 L 140 1420 L 200 1480 L 200 2400"
            stroke="#D97706"
            strokeWidth="1.2"
            strokeOpacity="0.18"
            strokeDasharray="4 6"
          />
          {/* Travelling Signal Pulse (Pure Compositor-Thread CSS Animation) */}
          <path
            d="M 120 0 L 120 380 L 180 440 L 180 820 L 140 860 L 140 1420 L 200 1480 L 200 2400"
            stroke="url(#signal-copper)"
            strokeWidth="2"
            fill="none"
            strokeDasharray="140 1400"
            strokeDashoffset="1540"
            className="wire-pulse"
            style={{ animationDuration: "7s" }}
          />

          {/* Parallel Green Micro-Trace */}
          <path
            d="M 136 0 L 136 372 L 196 432 L 196 812 L 156 852 L 156 1412 L 216 1472 L 216 2400"
            stroke="#10B981"
            strokeWidth="1"
            strokeOpacity="0.14"
          />

          {/* -------------------------------------------------------------
              TRACE SYSTEM 2: Right Spine Power & Logic Rail
              ------------------------------------------------------------- */}
          <path
            d="M 1320 0 L 1320 520 L 1260 580 L 1260 1100 L 1300 1140 L 1300 1780 L 1240 1840 L 1240 2400"
            stroke="#06B6D4"
            strokeWidth="1.2"
            strokeOpacity="0.16"
            strokeDasharray="6 8"
          />
          {/* Travelling Pulse along Right Rail */}
          <path
            d="M 1320 0 L 1320 520 L 1260 580 L 1260 1100 L 1300 1140 L 1300 1780 L 1240 1840 L 1240 2400"
            stroke="url(#signal-cyan)"
            strokeWidth="2"
            fill="none"
            strokeDasharray="120 1200"
            strokeDashoffset="1320"
            className="wire-pulse"
            style={{ animationDuration: "6s", animationDelay: "2s" }}
          />

          {/* -------------------------------------------------------------
              CROSS-BOARD LOGIC ROUTING (Inter-Section 45-degree Branches)
              ------------------------------------------------------------- */}
          {/* Hero to QuickStats Branch */}
          <path
            d="M 180 500 L 260 500 L 320 560 L 680 560 L 720 520 L 880 520"
            stroke="#10B981"
            strokeWidth="1.2"
            strokeOpacity="0.2"
          />
          <path
            d="M 180 500 L 260 500 L 320 560 L 680 560 L 720 520 L 880 520"
            stroke="url(#signal-green)"
            strokeWidth="2"
            fill="none"
            strokeDasharray="80 800"
            strokeDashoffset="880"
            className="wire-pulse"
            style={{ animationDuration: "4.5s", animationDelay: "1s" }}
          />

          {/* QuickStats to Education/Skills Trace */}
          <path
            d="M 1260 840 L 1120 840 L 1060 900 L 740 900 L 700 940 L 380 940"
            stroke="#D97706"
            strokeWidth="1.2"
            strokeOpacity="0.18"
          />
          <path
            d="M 1260 840 L 1120 840 L 1060 900 L 740 900 L 700 940 L 380 940"
            stroke="url(#signal-copper)"
            strokeWidth="2"
            fill="none"
            strokeDasharray="90 900"
            strokeDashoffset="990"
            className="wire-pulse"
            style={{ animationDuration: "5s", animationDelay: "3s" }}
          />

          {/* Projects to Experience Cross-Routing */}
          <path
            d="M 140 1200 L 300 1200 L 360 1260 L 600 1260 L 660 1200 L 1080 1200 L 1140 1260 L 1260 1260"
            stroke="#10B981"
            strokeWidth="1"
            strokeOpacity="0.18"
          />
          <path
            d="M 140 1200 L 300 1200 L 360 1260 L 600 1260 L 660 1200 L 1080 1200 L 1140 1260 L 1260 1260"
            stroke="url(#signal-green)"
            strokeWidth="1.8"
            fill="none"
            strokeDasharray="100 1100"
            strokeDashoffset="1200"
            className="wire-pulse"
            style={{ animationDuration: "6.5s", animationDelay: "0.5s" }}
          />

          {/* Experience to Achievements Feed */}
          <path
            d="M 1300 1520 L 1180 1520 L 1120 1580 L 820 1580 L 780 1620 L 340 1620 L 300 1660 L 200 1660"
            stroke="#06B6D4"
            strokeWidth="1.2"
            strokeOpacity="0.16"
          />
          <path
            d="M 1300 1520 L 1180 1520 L 1120 1580 L 820 1580 L 780 1620 L 340 1620 L 300 1660 L 200 1660"
            stroke="url(#signal-cyan)"
            strokeWidth="2"
            fill="none"
            strokeDasharray="110 1100"
            strokeDashoffset="1210"
            className="wire-pulse"
            style={{ animationDuration: "6s", animationDelay: "2.5s" }}
          />

          {/* -------------------------------------------------------------
              SOLDER VIA NODES (Intersections & Test Points)
              ------------------------------------------------------------- */}
          {/* Left Spine Vias */}
          <use href="#via-node" x="120" y="380" />
          <use href="#via-node-green" x="180" y="440" />
          <use href="#via-node" x="180" y="500" />
          <use href="#via-node-green" x="180" y="820" />
          <use href="#via-node" x="140" y="860" />
          <use href="#via-node" x="140" y="1200" />
          <use href="#via-node-green" x="140" y="1420" />
          <use href="#via-node" x="200" y="1480" />
          <use href="#via-node-green" x="200" y="1660" />

          {/* Right Spine Vias */}
          <use href="#via-node" x="1320" y="520" />
          <use href="#via-node-green" x="1260" y="580" />
          <use href="#via-node" x="1260" y="840" />
          <use href="#via-node-green" x="1260" y="1100" />
          <use href="#via-node" x="1300" y="1140" />
          <use href="#via-node-green" x="1300" y="1520" />
          <use href="#via-node" x="1300" y="1780" />
          <use href="#via-node-green" x="1240" y="1840" />

          {/* Junction Test Nodes */}
          <use href="#via-node" x="260" y="500" />
          <use href="#via-node-green" x="320" y="560" />
          <use href="#via-node" x="720" y="520" />
          <use href="#via-node-green" x="880" y="520" />

          <use href="#via-node" x="1120" y="840" />
          <use href="#via-node-green" x="1060" y="900" />
          <use href="#via-node" x="700" y="940" />
          <use href="#via-node-green" x="380" y="940" />

          <use href="#via-node" x="300" y="1200" />
          <use href="#via-node-green" x="660" y="1200" />
          <use href="#via-node" x="1080" y="1200" />
          <use href="#via-node-green" x="1140" y="1260" />

          <use href="#via-node" x="1120" y="1580" />
          <use href="#via-node-green" x="820" y="1580" />
          <use href="#via-node" x="780" y="1620" />
          <use href="#via-node-green" x="340" y="1620" />
          <use href="#via-node" x="300" y="1660" />
        </svg>
      </div>
    </div>
  );
}
