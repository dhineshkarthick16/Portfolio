"use client";

import { useState, useEffect } from "react";
import { LogOut, RefreshCw, Trophy, ExternalLink, Check, AlertCircle } from "lucide-react";
import Link from "next/link";
import { CompetitionRow } from "@/lib/supabase";

export function AdminDashboard() {
  const [competitions, setCompetitions] = useState<CompetitionRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [togglingId, setTogglingId] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const fetchCompetitions = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/competitions");
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to load hackathons");
      }
      setCompetitions(data.competitions || []);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Error fetching competitions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompetitions();
  }, []);

  const handleToggle = async (id: string, currentStatus: boolean | undefined) => {
    const nextStatus = !currentStatus;
    setTogglingId(id);

    // Optimistic update
    setCompetitions((prev) =>
      prev.map((c) => (c.id === id ? { ...c, featured_on_portfolio: nextStatus } : c))
    );

    try {
      const res = await fetch("/api/admin/toggle-hackathon", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, featured: nextStatus }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Toggle failed");
      }
    } catch (err: unknown) {
      // Revert on failure
      setCompetitions((prev) =>
        prev.map((c) => (c.id === id ? { ...c, featured_on_portfolio: currentStatus } : c))
      );
      alert(err instanceof Error ? err.message : "Failed to toggle item");
    } finally {
      setTogglingId(null);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.reload();
  };

  const filtered = competitions.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.organizer.toLowerCase().includes(search.toLowerCase())
  );

  const featuredCount = competitions.filter((c) => c.featured_on_portfolio).length;

  return (
    <div className="space-y-8">
      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">HackTracker Integration</h1>
          <p className="text-sm opacity-60 mt-1">
            Toggle which hackathons from your HackTracker database appear on your public portfolio.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchCompetitions}
            disabled={loading}
            className="p-2.5 rounded-full border border-white/10 hover:bg-white/5 transition-colors disabled:opacity-50"
            title="Refresh"
          >
            <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
          </button>
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 hover:bg-white/5 transition-colors text-sm"
          >
            <LogOut size={15} />
            Logout
          </button>
        </div>
      </div>

      {/* Stats and Search */}
      <div className="grid sm:grid-cols-3 gap-4">
        <div className="rounded-xl border border-white/10 bg-white/5 p-4">
          <span className="text-xs opacity-60 uppercase font-mono tracking-wider">Total in Database</span>
          <p className="text-2xl font-semibold mt-1 font-mono">{competitions.length}</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 p-4">
          <span className="text-xs opacity-60 uppercase font-mono tracking-wider">Featured on Portfolio</span>
          <p className="text-2xl font-semibold mt-1 font-mono text-emerald-400">{featuredCount}</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 p-4 flex flex-col justify-center">
          <input
            type="text"
            placeholder="Search hackathons..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-white/30"
          />
        </div>
      </div>

      {/* Error state */}
      {error && (
        <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-5 flex items-start gap-3">
          <AlertCircle size={20} className="text-amber-400 shrink-0 mt-0.5" />
          <div>
            <h3 className="text-sm font-medium text-amber-300">Supabase Connection Notice</h3>
            <p className="text-xs opacity-80 mt-1 leading-relaxed">{error}</p>
            <p className="text-xs opacity-70 mt-2 font-mono">
              Tip: Verify SUPABASE_SERVICE_ROLE_KEY is set in .env.local and that the column featured_on_portfolio exists.
            </p>
          </div>
        </div>
      )}

      {/* Hackathons Table / List */}
      <div className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
        <div className="p-4 border-b border-white/10 flex items-center justify-between text-xs font-mono opacity-60 uppercase">
          <span>Hackathon Details</span>
          <span>Featured on Portfolio</span>
        </div>

        {loading ? (
          <div className="p-12 text-center opacity-60 text-sm">
            Loading hackathons from HackTracker...
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center opacity-60 text-sm">
            {competitions.length === 0
              ? "No competitions found in your HackTracker Supabase database."
              : "No competitions match your search query."}
          </div>
        ) : (
          <div className="divide-y divide-white/5">
            {filtered.map((comp) => {
              const isFeatured = !!comp.featured_on_portfolio;
              const isBusy = togglingId === comp.id;

              return (
                <div
                  key={comp.id}
                  className={`p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors ${
                    isFeatured ? "bg-white/[0.03]" : ""
                  }`}
                >
                  <div className="flex items-start gap-3.5">
                    <div className="p-2 rounded-full bg-white/10 shrink-0 mt-0.5">
                      <Trophy size={18} className="opacity-80" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-base font-medium">{comp.name}</h3>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 font-mono opacity-70">
                          {comp.status}
                        </span>
                        {comp.result && comp.result !== "Pending" && (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-mono border border-emerald-500/20">
                            {comp.position ? `${comp.position} - ` : ""}
                            {comp.result}
                          </span>
                        )}
                      </div>
                      <p className="text-xs opacity-60 mt-1">{comp.organizer}</p>
                      {comp.prize && (
                        <p className="text-xs text-amber-300 opacity-80 mt-1 font-mono">
                          Prize: {comp.prize}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-4 sm:self-center">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isFeatured}
                        disabled={isBusy}
                        onChange={() => handleToggle(comp.id, comp.featured_on_portfolio)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                      <span className="ml-3 text-xs font-mono opacity-80">
                        {isBusy ? "Updating..." : isFeatured ? "Featured" : "Hidden"}
                      </span>
                    </label>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="flex items-center justify-between text-xs opacity-60 pt-4">
        <Link href="/" className="hover:opacity-100 flex items-center gap-1.5">
          View public portfolio <ExternalLink size={12} />
        </Link>
        <span className="font-mono">Connected to HackTracker Supabase</span>
      </div>
    </div>
  );
}
