'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

const MIN_MS = 2000;   // Minimum visibility — noticeable even on localhost
const MAX_MS = 8000;   // Safety cap for failed/slow resources
const FADE_MS = 600;   // CSS opacity transition duration

type Phase = 'visible' | 'fading' | 'gone';

export default function PageLoader() {
  const pathname = usePathname();
  const [phase, setPhase] = useState<Phase>('visible');

  // Refs so callbacks always see the latest values without stale closures
  const phaseRef = useRef<Phase>('visible');
  const fadeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isNavigatingRef = useRef(false);

  /** Start the fade-out → unmount sequence. */
  const exit = () => {
    if (phaseRef.current === 'fading' || phaseRef.current === 'gone') return;
    phaseRef.current = 'fading';
    setPhase('fading');

    fadeTimerRef.current = setTimeout(() => {
      phaseRef.current = 'gone';
      setPhase('gone');
      document.documentElement.style.overflow = '';
      document.getElementById('dk-static-cover')?.remove();
    }, FADE_MS);
  };

  /** Re-show the loader (used on client-side navigations). */
  const show = () => {
    if (fadeTimerRef.current) clearTimeout(fadeTimerRef.current);
    phaseRef.current = 'visible';
    setPhase('visible');
    document.documentElement.style.overflow = 'hidden';
  };

  // ── Initial page load ───────────────────────────────────────────────────
  useEffect(() => {
    document.documentElement.style.overflow = 'hidden';

    const ready = new Promise<void>((res) => {
      if (document.readyState === 'complete') res();
      else window.addEventListener('load', () => res(), { once: true });
    });
    const min = new Promise<void>((res) => setTimeout(res, MIN_MS));
    const safety = new Promise<void>((res) => setTimeout(res, MAX_MS));

    Promise.all([Promise.race([ready, safety]), min]).then(() => {
      // If a navigation started while the initial loader was showing,
      // wait for that to complete instead of exiting now.
      if (!isNavigatingRef.current) exit();
    });

    return () => {
      document.documentElement.style.overflow = '';
      if (fadeTimerRef.current) clearTimeout(fadeTimerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Route change: hide loader once new page is committed ────────────────
  const prevPathnameRef = useRef(pathname);
  useEffect(() => {
    if (prevPathnameRef.current === pathname) return; // skip initial render
    prevPathnameRef.current = pathname;
    isNavigatingRef.current = false;

    // New page is rendered — start exit after a brief settle delay
    const t = setTimeout(exit, 100);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // ── Click listener: show loader on internal-link clicks ─────────────────
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest('a');
      if (!anchor) return;

      const href = anchor.getAttribute('href') ?? '';
      const target = anchor.getAttribute('target') ?? '';

      // Ignore: external, hash-only, mailto, tel, blank-target, and modifier keys
      if (
        !href ||
        href.startsWith('http') ||
        href.startsWith('mailto') ||
        href.startsWith('tel') ||
        href.startsWith('#') ||
        target === '_blank' ||
        e.ctrlKey || e.metaKey || e.shiftKey || e.altKey
      ) return;

      // Same-page navigation (pathname + hash) → skip
      const nextPath = href.split('#')[0].split('?')[0];
      if (nextPath === '' || nextPath === prevPathnameRef.current) return;

      isNavigatingRef.current = true;
      show();
    };

    document.addEventListener('click', handleClick, { capture: true });
    return () => document.removeEventListener('click', handleClick, { capture: true });
  }, []);

  if (phase === 'gone') return null;

  return (
    <div
      className={`dk-page-loader${phase === 'fading' ? ' fading' : ''}`}
      role="status"
      aria-label="Loading"
      aria-live="polite"
    >
      <style>{CSS}</style>
      <div className="dk-page-loader-ring" />
    </div>
  );
}

// Inline styles — guaranteed to apply immediately with no stylesheet timing gap.
const CSS = `
.dk-page-loader {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: grid;
  place-items: center;
  background: #0b0f12;
  opacity: 1;
  pointer-events: all;
  transition: opacity ${FADE_MS}ms cubic-bezier(0.4, 0, 0.2, 1);
}
.dk-page-loader.fading {
  opacity: 0;
  pointer-events: none;
}
.dk-page-loader-ring {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 2.5px solid rgba(6, 182, 212, 0.15);
  border-top-color: #06b6d4;
  animation: dk-spin 0.7s linear infinite;
  will-change: transform;
}
@keyframes dk-spin {
  to { transform: rotate(360deg); }
}
@media (prefers-reduced-motion: reduce) {
  .dk-page-loader-ring {
    animation: none;
    border-color: rgba(6, 182, 212, 0.35);
    border-top-color: #06b6d4;
  }
}
`;
