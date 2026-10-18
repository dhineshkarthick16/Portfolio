'use client';

import { useEffect, useRef } from 'react';

// The mathematical C2-smooth cursive D / balanced infinity loop path
const PATH_D =
  'M180.1,224.7 C167.0,256.8 150.1,286.1 120.4,305.7 C90.7,325.3 55.4,317.3 38.8,286.0 C22.2,254.8 23.1,218.3 30.3,182.7 C37.5,147.2 66.8,128.2 100.7,139.0 C134.5,149.7 153.9,179.5 171.1,209.3 C188.3,239.1 205.7,267.6 231.4,288.6 C257.0,309.6 292.2,323.5 324.6,319.6 C357.1,315.7 387.6,296.8 410.9,272.3 C434.2,247.8 449.1,219.2 457.5,186.3 C466.0,153.4 468.4,115.8 455.2,86.4 C442.0,57.0 409.2,37.0 375.8,34.9 C342.4,32.8 306.1,40.3 277.4,54.9 C248.6,69.5 230.4,95.6 216.7,126.5 C202.9,157.4 193.1,192.7 180.1,224.7 Z';

const DOT_COUNT = 104;
const SPEED = 0.045;

/**
 * Pure Infinity Loader Component
 * Renders ONLY the continuous looping comet animation on the infinity path.
 * No "K", no text, no branding.
 */
export default function InfinityLoader({
  size = 200,
  fullScreen = true,
}: {
  size?: number;
  fullScreen?: boolean;
}) {
  const pathRef = useRef<SVGPathElement>(null);
  const groupRef = useRef<SVGGElement>(null);

  useEffect(() => {
    const path = pathRef.current;
    const group = groupRef.current;
    if (!path || !group) return;

    // Clear any previous child nodes
    while (group.firstChild) {
      group.removeChild(group.firstChild);
    }

    const NS = 'http://www.w3.org/2000/svg';
    const len = path.getTotalLength();
    const dots: SVGCircleElement[] = [];

    // Pre-create SVG particle circles along the smooth infinity trajectory
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

    return () => {
      cancelAnimationFrame(raf);
    };
  }, []);

  const content = (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
      }}
    >
      <svg
        style={{
          width: size,
          maxWidth: '80vw',
          height: 'auto',
          overflow: 'visible',
          filter: 'drop-shadow(0 0 12px rgba(62,230,240,0.65))',
        }}
        viewBox="10 20 465 315"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path ref={pathRef} d={PATH_D} fill="none" stroke="none" />
        <path
          d={PATH_D}
          fill="none"
          stroke="rgba(62, 230, 240, 0.16)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <g style={{ fill: '#3ee6f0' }} ref={groupRef} />
      </svg>
    </div>
  );

  if (!fullScreen) return content;

  return (
    <div
      role="status"
      aria-label="Loading"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#05080a',
        background: 'radial-gradient(circle at center, #09121a 0%, #05080a 75%)',
      }}
    >
      {content}
    </div>
  );
}
