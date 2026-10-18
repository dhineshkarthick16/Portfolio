'use client';

import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';

// Same D path as DKLoader — the "infinity" loop the comet orbits
const PATH_D =
  'M180.1,224.7 C167.0,256.8 150.1,286.1 120.4,305.7 C90.7,325.3 55.4,317.3 38.8,286.0 C22.2,254.8 23.1,218.3 30.3,182.7 C37.5,147.2 66.8,128.2 100.7,139.0 C134.5,149.7 153.9,179.5 171.1,209.3 C188.3,239.1 205.7,267.6 231.4,288.6 C257.0,309.6 292.2,323.5 324.6,319.6 C357.1,315.7 387.6,296.8 410.9,272.3 C434.2,247.8 449.1,219.2 457.5,186.3 C466.0,153.4 468.4,115.8 455.2,86.4 C442.0,57.0 409.2,37.0 375.8,34.9 C342.4,32.8 306.1,40.3 277.4,54.9 C248.6,69.5 230.4,95.6 216.7,126.5 C202.9,157.4 193.1,192.7 180.1,224.7 Z';

const DOT_COUNT = 104;
const SPEED = 0.045;
/** Must match the CSS opacity transition below. */
const FADE_MS = 600;

type Phase = 'visible' | 'fading' | 'gone';

/**
 * NavLoader — shows only during client-side route transitions.
 *
 * Displays the same infinity-loop comet animation as DKLoader's "spin"
 * phase, but cropped tight (no K, no text) and scaled small.
 *
 * Lifecycle:
 *  - Starts hidden (phase = 'gone').
 *  - A global click listener detects internal-link clicks → show().
 *  - usePathname() fires when the new route is committed → exit().
 *  - Never interferes with DKLoader: skipped while #dk-static-cover exists.
 */
export default function NavLoader() {
  const pathname = usePathname();
  const [phase, setPhase] = useState<Phase>('gone');

  // Refs keep callbacks stable and avoid stale-closure bugs.
  const phaseRef = useRef<Phase>('gone');
  const pathRef = useRef<SVGPathElement>(null);
  const groupRef = useRef<SVGGElement>(null);
  const rafRef = useRef<number | null>(null);
  const fadeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const prevPathnameRef = useRef(pathname);

  // ── Animation helpers ───────────────────────────────────────────────────

  const stopAnim = useCallback(() => {
    if (rafRef.current != null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  }, []);

  const exit = useCallback(() => {
    if (phaseRef.current === 'fading' || phaseRef.current === 'gone') return;
    phaseRef.current = 'fading';
    setPhase('fading');
    fadeTimerRef.current = setTimeout(() => {
      stopAnim();
      phaseRef.current = 'gone';
      setPhase('gone');
      document.documentElement.style.overflow = '';
    }, FADE_MS);
  }, [stopAnim]);

  const show = useCallback(() => {
    if (fadeTimerRef.current) clearTimeout(fadeTimerRef.current);
    phaseRef.current = 'visible';
    setPhase('visible');
    document.documentElement.style.overflow = 'hidden';
  }, []);

  // ── Start comet animation once SVG is mounted ───────────────────────────
  useEffect(() => {
    if (phase !== 'visible') return;
    const path = pathRef.current;
    const group = groupRef.current;
    if (!path || !group) return;

    // Clear any leftover dots from a previous navigation
    while (group.firstChild) group.removeChild(group.firstChild);

    const NS = 'http://www.w3.org/2000/svg';
    const len = path.getTotalLength();
    const dots: SVGCircleElement[] = [];

    for (let i = 0; i < DOT_COUNT; i++) {
      const p = path.getPointAtLength((len * i) / DOT_COUNT);
      const c = document.createElementNS(NS, 'circle');
      c.setAttribute('cx', p.x.toFixed(2));
      c.setAttribute('cy', p.y.toFixed(2));
      c.setAttribute('r', '1');
      c.setAttribute('opacity', '0.08');
      group.appendChild(c);
      dots.push(c);
    }

    const t0 = performance.now();
    const frame = (now: number) => {
      const head = ((now - t0) * SPEED) % DOT_COUNT;
      for (let i = 0; i < DOT_COUNT; i++) {
        const behind =
          ((((head - i) % DOT_COUNT) + DOT_COUNT) % DOT_COUNT) / DOT_COUNT;
        const k = Math.pow(1 - behind, 2.3);
        dots[i].setAttribute('r', (0.8 + 4.2 * k).toFixed(2));
        dots[i].setAttribute('opacity', (0.07 + 0.93 * k).toFixed(2));
      }
      rafRef.current = requestAnimationFrame(frame);
    };
    rafRef.current = requestAnimationFrame(frame);

    return stopAnim; // cancel on cleanup
  }, [phase, stopAnim]);

  // ── Hide once navigation is complete (pathname committed) ───────────────
  useEffect(() => {
    if (prevPathnameRef.current === pathname) return; // skip initial render
    prevPathnameRef.current = pathname;
    // Brief settle so the new page's first frame paints before we reveal it
    const t = setTimeout(exit, 120);
    return () => clearTimeout(t);
  }, [pathname, exit]);

  // ── Show on internal-link clicks ────────────────────────────────────────
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      // DKLoader is still running its initial branded animation — don't show on top.
      if (document.documentElement.hasAttribute('data-initial-loading')) return;

      const anchor = (e.target as HTMLElement).closest('a');
      if (!anchor) return;

      const href = anchor.getAttribute('href') ?? '';
      const isExternal =
        href.startsWith('http') ||
        href.startsWith('mailto') ||
        href.startsWith('tel');
      const isHashOnly = href.startsWith('#');
      const isBlankTarget = anchor.getAttribute('target') === '_blank';
      const hasModifier = e.ctrlKey || e.metaKey || e.shiftKey || e.altKey;

      if (!href || isExternal || isHashOnly || isBlankTarget || hasModifier) return;

      // Same-page navigation (just a hash change): skip
      const nextPath = href.split('#')[0].split('?')[0];
      if (!nextPath || nextPath === prevPathnameRef.current) return;

      show();
    };

    document.addEventListener('click', handleClick, { capture: true });
    return () =>
      document.removeEventListener('click', handleClick, { capture: true });
  }, [show]);

  // ── Cleanup on unmount ──────────────────────────────────────────────────
  useEffect(() => {
    return () => {
      stopAnim();
      if (fadeTimerRef.current) clearTimeout(fadeTimerRef.current);
      document.documentElement.style.overflow = '';
    };
  }, [stopAnim]);

  // Don't occupy the DOM at all when not loading
  if (phase === 'gone') return null;

  return (
    <div
      className={`nav-loader${phase === 'fading' ? ' fading' : ''}`}
      role="status"
      aria-label="Loading"
      aria-live="polite"
    >
      <style>{CSS}</style>
      {/*
       * ViewBox is cropped tightly around the D path (x:10–470, y:25–330).
       * The K-group coordinates (x:467–710) are outside this box, so only
       * the infinity loop is visible — no K ever leaks in.
       */}
      <svg
        className="nav-loader-svg"
        viewBox="10 25 460 305"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Invisible measurement path — getTotalLength() requires it in the DOM */}
        <path ref={pathRef} d={PATH_D} fill="none" stroke="none" />
        {/* Faint blueprint ghost trace */}
        <path
          d={PATH_D}
          fill="none"
          stroke="rgba(62,230,240,0.12)"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Comet particle dots — populated by useEffect */}
        <g ref={groupRef} />
      </svg>
    </div>
  );
}

const CSS = `
.nav-loader {
  --dk-cyan: #3ee6f0;
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: grid;
  place-items: center;
  background: radial-gradient(circle at center, #09121a 0%, #05080a 75%);
  opacity: 1;
  transition: opacity ${FADE_MS}ms cubic-bezier(0.4, 0, 0.2, 1);
}
.nav-loader.fading {
  opacity: 0;
  pointer-events: none;
}
/* Small: roughly 240px on desktop, scales down on mobile */
.nav-loader-svg {
  width: min(55vw, 240px);
  height: auto;
  overflow: visible;
  filter: drop-shadow(0 0 10px rgba(62,230,240,.55));
}
.nav-loader-svg circle {
  fill: var(--dk-cyan);
}
@media (prefers-reduced-motion: reduce) {
  .nav-loader-svg circle {
    opacity: 0.4 !important;
  }
}
`;
