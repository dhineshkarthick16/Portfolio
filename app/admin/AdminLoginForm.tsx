"use client";

import { useState } from "react";
import { Lock, KeyRound, ArrowRight, ShieldAlert } from "lucide-react";

export function AdminLoginForm({ onLoginSuccess }: { onLoginSuccess?: () => void }) {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Incorrect password");
      }

      if (onLoginSuccess) {
        onLoginSuccess();
      } else {
        window.location.reload();
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto my-12 p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm">
      <div className="flex flex-col items-center text-center mb-8">
        <div className="p-3 rounded-full bg-white/10 mb-4 text-emerald-400">
          <Lock size={28} />
        </div>
        <h1 className="text-2xl font-semibold tracking-tight">Admin Authentication</h1>
        <p className="text-xs opacity-60 mt-2 max-w-xs">
          Enter your portfolio administrator password to access the HackTracker integration controls.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-mono opacity-60 uppercase mb-2">
            Password
          </label>
          <div className="relative">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-white/40 font-mono tracking-widest pl-10"
            />
            <KeyRound size={16} className="absolute left-3.5 top-3.5 opacity-40" />
          </div>
        </div>

        {error && (
          <div className="flex items-center gap-2 text-xs text-rose-400 p-3 rounded-lg bg-rose-500/10 border border-rose-500/20">
            <ShieldAlert size={14} className="shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <button
          type="submit"
          disabled={loading || !password}
          className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white text-black text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {loading ? "Verifying..." : "Unlock Dashboard"}
          <ArrowRight size={15} />
        </button>
      </form>
    </div>
  );
}
