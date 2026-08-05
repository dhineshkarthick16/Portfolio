import { Code2, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons/BrandIcons";
import { siteConfig } from "@/data/site";

export function Footer() {
  return (
    <footer className="border-t border-white/10 mt-32">
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="text-sm opacity-60">
          © {new Date().getFullYear()} {siteConfig.name}
        </p>

        <div className="flex items-center gap-5">
          <a href={siteConfig.links.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <GithubIcon size={18} className="opacity-70 hover:opacity-100 transition-opacity" />
          </a>
          <a href={siteConfig.links.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <LinkedinIcon size={18} className="opacity-70 hover:opacity-100 transition-opacity" />
          </a>
          <a href={siteConfig.links.leetcode} target="_blank" rel="noopener noreferrer" aria-label="LeetCode">
            <Code2 size={18} className="opacity-70 hover:opacity-100 transition-opacity" />
          </a>
          <a href={`mailto:${siteConfig.email}`} aria-label="Email">
            <Mail size={18} className="opacity-70 hover:opacity-100 transition-opacity" />
          </a>
          <a href={siteConfig.resumeUrl} target="_blank" rel="noopener noreferrer" className="text-sm opacity-70 hover:opacity-100 transition-opacity">
            Resume
          </a>
        </div>
      </div>
    </footer>
  );
}
