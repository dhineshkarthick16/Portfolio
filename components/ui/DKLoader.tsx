'use client';

import { useEffect, useRef, useState } from 'react';

// Perfectly convex, mathematically C2-smooth cursive D with balanced infinity loop
const PATH_D =
  'M180.1,224.7 C167.0,256.8 150.1,286.1 120.4,305.7 C90.7,325.3 55.4,317.3 38.8,286.0 C22.2,254.8 23.1,218.3 30.3,182.7 C37.5,147.2 66.8,128.2 100.7,139.0 C134.5,149.7 153.9,179.5 171.1,209.3 C188.3,239.1 205.7,267.6 231.4,288.6 C257.0,309.6 292.2,323.5 324.6,319.6 C357.1,315.7 387.6,296.8 410.9,272.3 C434.2,247.8 449.1,219.2 457.5,186.3 C466.0,153.4 468.4,115.8 455.2,86.4 C442.0,57.0 409.2,37.0 375.8,34.9 C342.4,32.8 306.1,40.3 277.4,54.9 C248.6,69.5 230.4,95.6 216.7,126.5 C202.9,157.4 193.1,192.7 180.1,224.7 Z';

const PATH_K1 =
  'M542.0,54.0 C537.3,75.0 532.5,96.7 528.0,117.0 C523.5,137.3 521.0,156.0 515.0,176.0 C509.0,196.0 500.0,215.8 492.0,237.0 C484.0,258.2 475.3,281.0 467.0,303.0';

const PATH_K2 =
  'M515.0,176.0 C531.0,168.0 546.7,161.7 563.0,152.0 C579.3,142.3 596.7,129.0 613.0,118.0 C629.3,107.0 646.0,95.3 661.0,86.0 C676.0,76.7 689.0,70.0 703.0,62.0';

const PATH_K3 =
  'M546.0,170.0 C556.0,182.3 566.0,194.3 576.0,207.0 C586.0,219.7 595.7,233.8 606.0,246.0 C616.3,258.2 626.3,271.3 638.0,280.0 C649.7,288.7 663.3,292.0 676.0,298.0';

/** Minimum time (ms) the spinner plays before starting the draw animation. */
const MIN_SPIN_MS = 2000;
/**
 * Hard cap (ms) on how long we wait for window.load.
 * Prevents a failed/slow resource from blocking the loader forever.
 */
const MAX_WAIT_MS = 8000;
const DOT_COUNT = 104;
const SPEED = 0.045;

type Phase = 'spin' | 'drawing' | 'done' | 'gone';

export default function DKLoader() {
  const pathRef = useRef<SVGPathElement>(null);
  const groupRef = useRef<SVGGElement>(null);
  const [phase, setPhase] = useState<Phase>('spin');

  useEffect(() => {
    const path = pathRef.current;
    const group = groupRef.current;
    if (!path || !group) return;

    const NS = 'http://www.w3.org/2000/svg';
    const len = path.getTotalLength();
    const dots: SVGCircleElement[] = [];

    // Pre-create SVG particle circles along the smooth infinity D trajectory
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

    let raf: number;
    const t0 = performance.now();
    const frame = (now: number) => {
      const head = ((now - t0) * SPEED) % DOT_COUNT;
      for (let i = 0; i < DOT_COUNT; i++) {
        const behind =
          ((((head - i) % DOT_COUNT) + DOT_COUNT) % DOT_COUNT) / DOT_COUNT;
        // Non-linear falloff for glowing stardust comet tail
        const k = Math.pow(1 - behind, 2.3);
        dots[i].setAttribute('r', (0.8 + 4.2 * k).toFixed(2));
        dots[i].setAttribute('opacity', (0.07 + 0.93 * k).toFixed(2));
      }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    document.documentElement.style.overflow = 'hidden';

    // Resolves when the page fires 'load', or after MAX_WAIT_MS — whichever comes first.
    // This guarantees the loader always exits even if a resource fails to load.
    const pageReady = new Promise<void>((res) => {
      if (document.readyState === 'complete') {
        res();
      } else {
        window.addEventListener('load', () => res(), { once: true });
      }
    });
    const safetyValve = new Promise<void>((res) =>
      setTimeout(res, MAX_WAIT_MS)
    );
    const minWait = new Promise<void>((res) => setTimeout(res, MIN_SPIN_MS));

    const timers: ReturnType<typeof setTimeout>[] = [];

    // Wait for both (a) minimum spin time AND (b) page ready-or-timeout
    Promise.all([Promise.race([pageReady, safetyValve]), minWait]).then(() => {
      setPhase('drawing');
      timers.push(setTimeout(() => setPhase('done'), 2700));
      timers.push(
        setTimeout(() => {
          setPhase('gone');
          document.documentElement.style.overflow = '';
          // Signal to NavLoader that the initial branded animation is done.
          document.documentElement.removeAttribute('data-initial-loading');
          // IMPORTANT: hide rather than remove — #dk-static-cover is a
          // React-managed DOM node (rendered in layout.tsx). Calling .remove()
          // on it imperatively breaks React's fiber tree and causes
          // insertBefore / removeChild crashes on subsequent reconciliations.
          const cover = document.getElementById('dk-static-cover');
          if (cover) cover.style.display = 'none';
        }, 3600)
      );
    });

    return () => {
      cancelAnimationFrame(raf);
      timers.forEach(clearTimeout);
      document.documentElement.style.overflow = '';
    };
  }, []);

  if (phase === 'gone') return null;

  return (
    <div className={`dk-loader ${phase}`} role="status" aria-label="Loading">
      <style>{CSS}</style>
      <div className="dk-card">
        {/* Caption Above */}
        <div className="dk-caption dk-caption-top">PORTFOLIO OF</div>

        {/* Logo SVG: 750×400 ViewBox */}
        <svg
          className="dk-logo"
          viewBox="0 0 750 400"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Hidden measurement path for particle comet */}
          <path ref={pathRef} d={PATH_D} fill="none" stroke="none" />

          {/* Group D: starts centred as smooth infinity spinner, glides left on load */}
          <g className="dk-group-d">
            <path className="dk-blueprint" d={PATH_D} />
            <path className="dk-stroke dk-d" pathLength="1" d={PATH_D} />
            {/* Orbital Particle Comet */}
            <g className="dk-dots" ref={groupRef} />
          </g>

          {/* Group K: reveals and draws in as D shifts */}
          <g className="dk-group-k">
            <path className="dk-blueprint" d={PATH_K1} />
            <path className="dk-blueprint" d={PATH_K2} />
            <path className="dk-blueprint" d={PATH_K3} />

            <path className="dk-stroke dk-k1" pathLength="1" d={PATH_K1} />
            <path className="dk-stroke dk-k2" pathLength="1" d={PATH_K2} />
            <path className="dk-stroke dk-k3" pathLength="1" d={PATH_K3} />
          </g>
        </svg>

        {/* Caption Below */}
        <div className="dk-caption dk-caption-bottom">Dhinesh Karthick D</div>
      </div>
    </div>
  );
}

const CSS = `
.dk-loader {
  --dk-cyan: #3ee6f0;
  --dk-blue: #38bdf8;
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: grid;
  place-items: center;
  background: radial-gradient(circle at center, #09121a 0%, #05080a 75%);
  transition: opacity .8s cubic-bezier(0.4, 0, 0.2, 1), visibility .8s;
}
.dk-loader.done {
  opacity: 0;
  visibility: hidden;
}

.dk-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 14px;
  width: 100%;
  max-width: 680px;
  padding: 20px;
}

/* Captions */
.dk-caption {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  font-weight: 500;
  opacity: 0;
  pointer-events: none;
  transition: opacity .8s ease, transform .8s cubic-bezier(0.2, 0.8, 0.2, 1);
}
.dk-caption-top {
  font-size: clamp(0.72rem, 1.8vw, 0.88rem);
  color: rgba(62, 230, 240, 0.75);
  transform: translateY(12px);
  transition-delay: .5s;
}
.dk-caption-bottom {
  font-size: clamp(0.88rem, 2.2vw, 1.15rem);
  color: #e2e8f0;
  letter-spacing: 0.22em;
  transform: translateY(-12px);
  transition-delay: .7s;
  text-shadow: 0 0 14px rgba(62, 230, 240, 0.35);
}
.dk-loader.drawing .dk-caption,
.dk-loader.done .dk-caption {
  opacity: 1;
  transform: translateY(0);
}

/* Logo SVG */
.dk-logo {
  width: min(84vw, 500px);
  height: auto;
  overflow: visible;
  filter: drop-shadow(0 0 8px rgba(62,230,240,.4));
  transition: filter .75s ease, transform .75s cubic-bezier(0.2, 0.8, 0.2, 1);
}
.dk-loader.drawing .dk-logo {
  filter: drop-shadow(0 0 16px rgba(62,230,240,.85)) drop-shadow(0 0 32px rgba(56,189,248,.45));
}
.dk-loader.done .dk-logo {
  transform: scale(1.03);
  filter: drop-shadow(0 0 24px rgba(62,230,240,.95)) drop-shadow(0 0 48px rgba(56,189,248,.65));
}

/* D group: starts centred as a balanced smooth infinity spinner, then glides left on load */
.dk-group-d {
  transform-origin: 248.5px 178px;
  transform: translate(126.5px, 22px) scale(0.72);
  transition: transform .85s cubic-bezier(0.25, 1, 0.5, 1);
}
.dk-loader.drawing .dk-group-d,
.dk-loader.done .dk-group-d {
  transform: translate(0, 0) scale(1);
}

/* K group: hidden during spin, reveals as D shifts */
.dk-group-k {
  opacity: 0;
  transition: opacity .5s ease .2s;
}
.dk-loader.drawing .dk-group-k,
.dk-loader.done .dk-group-k {
  opacity: 1;
}

/* Faint blueprint guide track during loading */
.dk-blueprint {
  fill: none;
  stroke: var(--dk-cyan);
  stroke-width: 1.8;
  stroke-linecap: round;
  stroke-linejoin: round;
  opacity: 0.12;
  transition: opacity .5s ease;
}
.dk-loader.drawing .dk-blueprint,
.dk-loader.done .dk-blueprint {
  opacity: 0;
}

/* Orbital comet particle dots */
.dk-dots {
  transition: opacity .45s ease;
}
.dk-dots circle {
  fill: var(--dk-cyan);
}
.dk-loader.drawing .dk-dots,
.dk-loader.done .dk-dots {
  opacity: 0;
}

/* Solid calligraphy strokes */
.dk-stroke {
  fill: none;
  stroke: var(--dk-cyan);
  stroke-width: 5.5;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-dasharray: 1;
  stroke-dashoffset: 1;
  opacity: 0;
}
.dk-loader.drawing .dk-stroke,
.dk-loader.done .dk-stroke {
  opacity: 1;
  stroke-dashoffset: 0;
  transition: stroke-dashoffset .85s cubic-bezier(.55, 0, .15, 1), opacity .3s ease;
}

/* Sequential calligraphy timing */
.dk-loader.drawing .dk-d  { transition-delay: 0s;   }
.dk-loader.drawing .dk-k1 { transition-delay: .45s; }
.dk-loader.drawing .dk-k2 { transition-delay: .75s; }
.dk-loader.drawing .dk-k3 { transition-delay: .95s; }

@media (prefers-reduced-motion: reduce) {
  .dk-loader.drawing .dk-stroke {
    transition: none;
    stroke-dashoffset: 0;
    opacity: 1;
  }
  .dk-group-d {
    transition: none;
    transform: translate(0, 0) scale(1);
  }
}
`;
