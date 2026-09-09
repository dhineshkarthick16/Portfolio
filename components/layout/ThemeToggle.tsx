"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";

export function ThemeToggle() {
  const { theme, toggleTheme, mounted } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="p-2 rounded-full hover:bg-white/10 transition-colors w-9 h-9 flex items-center justify-center"
    >
      {mounted ? (
        theme === "dark" ? <Sun size={18} /> : <Moon size={18} />
      ) : (
        <span className="w-[18px] h-[18px] inline-block" />
      )}
    </button>
  );
}