"use client";

import { useAnimatedCounter } from "@/hooks/useAnimatedCounter";

interface StatCardProps {
  value: number;
  suffix?: string;
  label: string;
}

export function StatCard({ value, suffix = "", label }: StatCardProps) {
  const { count, ref } = useAnimatedCounter(value);

  return (
    <div
      ref={ref}
      className="border border-white/10 rounded-2xl p-6 text-center bg-white/5"
    >
      <div className="text-4xl font-semibold tracking-tight mb-2">
        {count}
        {suffix}
      </div>
      <div className="text-sm opacity-60">{label}</div>
    </div>
  );
}
