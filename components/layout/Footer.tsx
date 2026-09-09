import { Code2, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons/BrandIcons";
import { siteConfig } from "@/data/site";

export function Footer() {
  return (
    <footer className="relative mt-32 border-t border-white/10 bg-[#0B0F12]/80 backdrop-blur-sm">
      {/* PCB Trace Top Accent */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent" />
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#00FF66]" />
          <p className="text-xs font-mono text-slate-400">
            © {new Date().getFullYear()} {siteConfig.name} <span className="opacity-40">// SYS_VCC: 3.3V // TERM: 50Ω</span>
          </p>
        </div>

        <div className="flex items-center gap-5 font-mono text-xs text-slate-400">
          <a href={siteConfig.links.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="hover:text-emerald-400 transition-colors">
            <GithubIcon size={18} />
          </a>
          <a href={siteConfig.links.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-cyan-400 transition-colors">
            <LinkedinIcon size={18} />
          </a>
          <a href={siteConfig.links.leetcode} target="_blank" rel="noopener noreferrer" aria-label="LeetCode" className="hover:text-amber-400 transition-colors">
            <Code2 size={18} />
          </a>
          <a href={`mailto:${siteConfig.email}`} aria-label="Email" className="hover:text-emerald-400 transition-colors">
            <Mail size={18} />
          </a>
          <a href={siteConfig.resumeDownloadUrl} download="Dhinesh_Karthick_Resume.pdf" className="hover:text-white transition-colors text-xs">
            [RESUME_DL]
          </a>
        </div>
      </div>
    </footer>
  );
}
