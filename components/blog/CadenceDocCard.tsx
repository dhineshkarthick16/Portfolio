import Link from "next/link";

interface CadenceDocCardProps {
  title: string;
  description: string;
  docUrl: string;
}

export function CadenceDocCard({
  title = "VLFF (Very Low Power Flip-Flop) Implementation Report",
  description = "Complete engineering documentation covering schematic capture, symbol creation, functional verification, post-layout delay extraction (216.7 ps Clk-Q), and comparative literature benchmarks.",
  docUrl = "https://docs.google.com/document/d/1803pUIkIiorx2D4ecUMv7YKFnaFrutkd/edit?usp=sharing",
}: Partial<CadenceDocCardProps>) {
  return (
    <div className="my-8 p-6 rounded-xl border border-emerald-500/30 bg-[#0D1318] relative overflow-hidden group">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-mono text-emerald-400 tracking-wider uppercase">
              Technical Report Document
            </span>
          </div>
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          <p className="text-sm opacity-70 mt-1 max-w-xl">{description}</p>
        </div>
        <a
          href={docUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/40 text-emerald-300 hover:text-emerald-200 font-mono text-xs transition-all shrink-0 cursor-pointer"
        >
          <span>Open Google Doc</span>
          <span className="text-sm font-sans">↗</span>
        </a>
      </div>
    </div>
  );
}
