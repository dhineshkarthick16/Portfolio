"use client";

import { useState, useEffect } from "react";
import { RefreshCw, ExternalLink, Cpu, CheckCircle2, Zap, ArrowUpRight } from "lucide-react";
import { VlffDocReport, VLFF_DOC_URL, parseVlffText } from "@/lib/googleDocs";
import { PcbCardTraces } from "@/components/ui/PcbCardTraces";

export function VlffLiveReport() {
  const [data, setData] = useState<VlffDocReport | null>(null);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastRefreshedTime, setLastRefreshedTime] = useState<string>("");

  async function loadData() {
    setIsRefreshing(true);
    try {
      const res = await fetch("/api/doc/vlff", { cache: "no-store" });
      if (res.ok) {
        const json: VlffDocReport = await res.json();
        setData(json);
        setLastRefreshedTime(new Date().toLocaleTimeString());
      }
    } catch (e) {
      console.error("Failed to load VLFF doc data:", e);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="my-10 chip-card chip-corner-markers chip-pins-x p-6 sm:p-8 relative overflow-hidden bg-[#0D1217]">
      {/* IC Pin 1 Orientation Notch */}
      <div className="chip-notch" title="Pin 1 Index Marker" />
      {/* Circuit Trace Background */}
      <PcbCardTraces variant="cyan" />

      <div className="relative z-10 space-y-6">
        {/* Top Control Bar & Live Telemetry Badge */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="p-2 ic-chip-box text-cyan-400">
              <Cpu size={20} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-semibold text-cyan-400 tracking-wider">
                  REAL-TIME GOOGLE DOC SYNC
                </span>
                <span className="flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  LIVE
                </span>
              </div>
              <p className="text-[11px] font-mono opacity-50 mt-0.5">
                Target Doc: Very Low Power Flip-Flop Report // {lastRefreshedTime ? `Synced at ${lastRefreshedTime}` : "Connecting..."}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={loadData}
              disabled={isRefreshing}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-slate-300 hover:text-white transition-all disabled:opacity-50 cursor-pointer"
              title="Pull latest edits from Google Doc"
            >
              <RefreshCw size={13} className={isRefreshing ? "animate-spin text-cyan-400" : ""} />
              {isRefreshing ? "Syncing..." : "Sync Now"}
            </button>
            <a
              href={VLFF_DOC_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-500/30 text-xs font-mono text-cyan-300 hover:text-cyan-200 transition-all cursor-pointer"
            >
              <span>Edit Doc</span>
              <ExternalLink size={12} />
            </a>
          </div>
        </div>

        {/* Title Header */}
        <div>
          <span className="text-[11px] font-mono text-emerald-400/80 uppercase tracking-widest block mb-1">
            // SILICON_VALIDATION // CADENCE_VIRTUOSO
          </span>
          <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-white">
            {data?.title || "VLFF (Very Low Power Flip-Flop) Implementation Report"}
          </h3>
          <p className="text-sm opacity-70 mt-1 leading-relaxed">
            Direct real-time reflection of the technical report document. When changes are made in the source Google Doc, they synchronize dynamically to this section.
          </p>
        </div>

        {/* Dynamic Telemetry Metrics Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono">
          <div className="p-3.5 rounded-lg bg-black/40 border border-emerald-500/30 relative overflow-hidden">
            <div className="text-[10px] text-emerald-400/80 uppercase tracking-wider mb-1 flex items-center gap-1">
              <Zap size={11} />
              Clk-Q Delay
            </div>
            <div className="text-lg font-bold text-white tracking-tight">
              {data?.metrics.clkQDelay || "216.7 ps"}
            </div>
            <div className="text-[9px] opacity-40 mt-0.5">Post-Layout Extracted</div>
          </div>

          <div className="p-3.5 rounded-lg bg-black/40 border border-cyan-500/30 relative overflow-hidden">
            <div className="text-[10px] text-cyan-400/80 uppercase tracking-wider mb-1 flex items-center gap-1">
              <Zap size={11} />
              D-Clk Delay
            </div>
            <div className="text-lg font-bold text-white tracking-tight">
              {data?.metrics.dClkDelay || "99.217 ps"}
            </div>
            <div className="text-[9px] opacity-40 mt-0.5">Setup / Hold Window</div>
          </div>

          <div className="p-3.5 rounded-lg bg-black/40 border border-amber-500/30 relative overflow-hidden">
            <div className="text-[10px] text-amber-400/80 uppercase tracking-wider mb-1 flex items-center gap-1">
              <Cpu size={11} />
              Custom Node
            </div>
            <div className="text-lg font-bold text-white tracking-tight">
              180 nm
            </div>
            <div className="text-[9px] opacity-40 mt-0.5">Supply VDD: 1.8V</div>
          </div>

          <div className="p-3.5 rounded-lg bg-black/40 border border-white/15 relative overflow-hidden">
            <div className="text-[10px] text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1">
              <CheckCircle2 size={11} />
              LVS / DRC
            </div>
            <div className="text-lg font-bold text-emerald-400 tracking-tight">
              CLEAN
            </div>
            <div className="text-[9px] opacity-40 mt-0.5">Cadence Assura Match</div>
          </div>
        </div>

        {/* Dynamic Sections from Google Doc */}
        {loading && !data ? (
          <div className="p-8 text-center font-mono text-xs opacity-60">
            <RefreshCw size={18} className="animate-spin mx-auto mb-2 text-cyan-400" />
            Connecting to Google Docs and parsing report sections...
          </div>
        ) : (
          <div className="space-y-4 pt-2">
            {data?.sections.map((section) => (
              <div
                key={section.id}
                className="p-4 rounded-lg bg-black/30 border border-white/10 hover:border-white/20 transition-colors"
              >
                <div className="flex items-center gap-2 mb-2 font-mono text-xs">
                  <span className="w-5 h-5 rounded flex items-center justify-center bg-cyan-500/15 border border-cyan-500/30 text-cyan-400 font-semibold text-[10px]">
                    0{section.id}
                  </span>
                  <h4 className="font-semibold text-slate-200 text-sm">
                    {section.title}
                  </h4>
                </div>
                {section.content.length > 0 ? (
                  <div className="space-y-1 pl-7 text-xs sm:text-sm text-slate-300/85 leading-relaxed font-sans">
                    {section.content.map((p, idx) => (
                      <p key={idx} className={p.startsWith("•") ? "pl-2 font-mono text-xs text-emerald-300/90" : ""}>
                        {p}
                      </p>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs opacity-50 pl-7 font-mono italic">
                    Schematic & layout waveforms captured directly in Cadence Virtuoso.
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Document Footer Callout */}
        <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/25 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-mono">
          <div className="flex items-center gap-2 text-emerald-300">
            <CheckCircle2 size={15} className="shrink-0 text-emerald-400" />
            <span>
              Real-time synchronization active via Google Docs public export bus.
            </span>
          </div>
          <a
            href={VLFF_DOC_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-400 hover:text-emerald-300 underline underline-offset-4 flex items-center gap-1 shrink-0"
          >
            Open Original Report Document <ArrowUpRight size={13} />
          </a>
        </div>
      </div>
    </div>
  );
}
