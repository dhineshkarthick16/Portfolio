"use client";

interface PcbCardTracesProps {
  className?: string;
  variant?: "cyan" | "emerald" | "amber" | "mixed";
}

export function PcbCardTraces({
  className = "",
  variant = "cyan",
}: PcbCardTracesProps) {
  // Color configuration inspired by Image 1 (electric cyan/blue) with theme variants
  const colorMap = {
    cyan: {
      trace: "#38BDF8",
      traceSecondary: "#0EA5E9",
      via: "#38BDF8",
      viaFill: "#0B1015",
      glow: "rgba(56, 189, 248, 0.15)",
    },
    emerald: {
      trace: "#10B981",
      traceSecondary: "#059669",
      via: "#34D399",
      viaFill: "#0B1015",
      glow: "rgba(16, 185, 129, 0.15)",
    },
    amber: {
      trace: "#F59E0B",
      traceSecondary: "#D97706",
      via: "#FBBF24",
      viaFill: "#0B1015",
      glow: "rgba(245, 158, 11, 0.15)",
    },
    mixed: {
      trace: "#38BDF8",
      traceSecondary: "#10B981",
      via: "#38BDF8",
      viaFill: "#0B1015",
      glow: "rgba(56, 189, 248, 0.15)",
    },
  };

  const colors = colorMap[variant];

  return (
    <div
      className={`absolute inset-0 pointer-events-none overflow-hidden rounded-[inherit] select-none z-0 ${className}`}
      aria-hidden="true"
    >
      <svg
        className="w-full h-full opacity-[0.14] group-hover:opacity-[0.28] transition-opacity duration-500 ease-out"
        viewBox="0 0 600 350"
        fill="none"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g strokeLinecap="round" strokeLinejoin="round">
          {/* ================================================================
              TOP-LEFT CORNER TRACE BUS (4 Parallel Tracks with 45° Chamfers)
              Directly modeled after top-left region of Image 1
              ================================================================ */}
          <path
            d="M 15 90 L 65 40 H 130"
            stroke={colors.trace}
            strokeWidth="1.2"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d="M 15 105 L 75 45 H 150"
            stroke={colors.trace}
            strokeWidth="1.2"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d="M 15 120 L 85 50 H 170"
            stroke={colors.trace}
            strokeWidth="1.2"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d="M 15 135 L 95 55 H 190"
            stroke={colors.trace}
            strokeWidth="1.2"
            vectorEffect="non-scaling-stroke"
          />

          {/* Annular Via Donuts on Top-Left Bus Terminals */}
          <circle cx="130" cy="40" r="3.5" stroke={colors.via} strokeWidth="1.2" fill={colors.viaFill} vectorEffect="non-scaling-stroke" />
          <circle cx="150" cy="45" r="3.5" stroke={colors.via} strokeWidth="1.2" fill={colors.viaFill} vectorEffect="non-scaling-stroke" />
          <circle cx="170" cy="50" r="3.5" stroke={colors.via} strokeWidth="1.2" fill={colors.viaFill} vectorEffect="non-scaling-stroke" />
          <circle cx="190" cy="55" r="3.5" stroke={colors.via} strokeWidth="1.2" fill={colors.viaFill} vectorEffect="non-scaling-stroke" />

          {/* Vertical 3-Via Cluster (ooo) near top-left */}
          <circle cx="45" cy="18" r="2.5" stroke={colors.via} strokeWidth="1" fill={colors.viaFill} vectorEffect="non-scaling-stroke" />
          <circle cx="45" cy="28" r="2.5" stroke={colors.via} strokeWidth="1" fill={colors.viaFill} vectorEffect="non-scaling-stroke" />
          <circle cx="45" cy="38" r="2.5" stroke={colors.via} strokeWidth="1" fill={colors.viaFill} vectorEffect="non-scaling-stroke" />

          {/* Test Solder Pads */}
          <circle cx="85" cy="18" r="1.5" fill={colors.via} vectorEffect="non-scaling-stroke" />
          <circle cx="110" cy="25" r="1.5" fill={colors.via} vectorEffect="non-scaling-stroke" />

          {/* ================================================================
              TOP-CENTER DESCENDING BUS (Modeled after center-top of Image 1)
              ================================================================ */}
          <path
            d="M 280 0 V 65 L 310 95 H 350"
            stroke={colors.traceSecondary}
            strokeWidth="1.2"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d="M 295 0 V 60 L 325 90 H 375"
            stroke={colors.traceSecondary}
            strokeWidth="1.2"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d="M 310 0 V 55 L 340 85 H 400"
            stroke={colors.traceSecondary}
            strokeWidth="1.2"
            vectorEffect="non-scaling-stroke"
          />

          <circle cx="350" cy="95" r="3.5" stroke={colors.via} strokeWidth="1.2" fill={colors.viaFill} vectorEffect="non-scaling-stroke" />
          <circle cx="375" cy="90" r="3.5" stroke={colors.via} strokeWidth="1.2" fill={colors.viaFill} vectorEffect="non-scaling-stroke" />
          <circle cx="400" cy="85" r="3.5" stroke={colors.via} strokeWidth="1.2" fill={colors.viaFill} vectorEffect="non-scaling-stroke" />

          {/* Horizontal 3-Via Cluster (ooo) at top-center */}
          <circle cx="330" cy="35" r="2.5" stroke={colors.via} strokeWidth="1" fill={colors.viaFill} vectorEffect="non-scaling-stroke" />
          <circle cx="342" cy="35" r="2.5" stroke={colors.via} strokeWidth="1" fill={colors.viaFill} vectorEffect="non-scaling-stroke" />
          <circle cx="354" cy="35" r="2.5" stroke={colors.via} strokeWidth="1" fill={colors.viaFill} vectorEffect="non-scaling-stroke" />

          {/* ================================================================
              TOP-RIGHT DIAGONAL BUS & 4-VIA TERMINAL CLUSTER (Image 1 top-right)
              ================================================================ */}
          <path
            d="M 470 0 V 45 L 435 80 V 140"
            stroke={colors.trace}
            strokeWidth="1.2"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d="M 485 0 V 50 L 450 85 V 155"
            stroke={colors.trace}
            strokeWidth="1.2"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d="M 500 0 V 55 L 465 90 V 170"
            stroke={colors.trace}
            strokeWidth="1.2"
            vectorEffect="non-scaling-stroke"
          />

          <circle cx="435" cy="140" r="3.5" stroke={colors.via} strokeWidth="1.2" fill={colors.viaFill} vectorEffect="non-scaling-stroke" />
          <circle cx="450" cy="155" r="3.5" stroke={colors.via} strokeWidth="1.2" fill={colors.viaFill} vectorEffect="non-scaling-stroke" />
          <circle cx="465" cy="170" r="3.5" stroke={colors.via} strokeWidth="1.2" fill={colors.viaFill} vectorEffect="non-scaling-stroke" />

          {/* Diagonal 4-Via Cluster (oooo) in top-right */}
          <circle cx="530" cy="35" r="2.5" stroke={colors.via} strokeWidth="1" fill={colors.viaFill} vectorEffect="non-scaling-stroke" />
          <circle cx="542" cy="45" r="2.5" stroke={colors.via} strokeWidth="1" fill={colors.viaFill} vectorEffect="non-scaling-stroke" />
          <circle cx="554" cy="55" r="2.5" stroke={colors.via} strokeWidth="1" fill={colors.viaFill} vectorEffect="non-scaling-stroke" />
          <circle cx="566" cy="65" r="2.5" stroke={colors.via} strokeWidth="1" fill={colors.viaFill} vectorEffect="non-scaling-stroke" />

          {/* ================================================================
              BOTTOM-LEFT ASCENDING BUS (Image 1 bottom-left)
              ================================================================ */}
          <path
            d="M 55 350 V 285 L 90 250 H 150"
            stroke={colors.trace}
            strokeWidth="1.2"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d="M 70 350 V 280 L 105 245 H 170"
            stroke={colors.trace}
            strokeWidth="1.2"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d="M 85 350 V 275 L 120 240 H 190"
            stroke={colors.trace}
            strokeWidth="1.2"
            vectorEffect="non-scaling-stroke"
          />

          <circle cx="150" cy="250" r="3.5" stroke={colors.via} strokeWidth="1.2" fill={colors.viaFill} vectorEffect="non-scaling-stroke" />
          <circle cx="170" cy="245" r="3.5" stroke={colors.via} strokeWidth="1.2" fill={colors.viaFill} vectorEffect="non-scaling-stroke" />
          <circle cx="190" cy="240" r="3.5" stroke={colors.via} strokeWidth="1.2" fill={colors.viaFill} vectorEffect="non-scaling-stroke" />

          {/* Vertical 3-Via Cluster near bottom-left */}
          <circle cx="25" cy="290" r="2.5" stroke={colors.via} strokeWidth="1" fill={colors.viaFill} vectorEffect="non-scaling-stroke" />
          <circle cx="25" cy="302" r="2.5" stroke={colors.via} strokeWidth="1" fill={colors.viaFill} vectorEffect="non-scaling-stroke" />
          <circle cx="25" cy="314" r="2.5" stroke={colors.via} strokeWidth="1" fill={colors.viaFill} vectorEffect="non-scaling-stroke" />

          {/* ================================================================
              CENTER-BOTTOM DOGLEG BUS & INTERCONNECTS (Image 1 center)
              ================================================================ */}
          <path
            d="M 210 160 H 250 L 280 190 V 250"
            stroke={colors.traceSecondary}
            strokeWidth="1.2"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d="M 195 175 H 235 L 265 205 V 265"
            stroke={colors.traceSecondary}
            strokeWidth="1.2"
            vectorEffect="non-scaling-stroke"
          />

          <circle cx="280" cy="250" r="3.5" stroke={colors.via} strokeWidth="1.2" fill={colors.viaFill} vectorEffect="non-scaling-stroke" />
          <circle cx="265" cy="265" r="3.5" stroke={colors.via} strokeWidth="1.2" fill={colors.viaFill} vectorEffect="non-scaling-stroke" />

          {/* Horizontal 3-Via Cluster at center */}
          <circle cx="250" cy="225" r="2.5" stroke={colors.via} strokeWidth="1" fill={colors.viaFill} vectorEffect="non-scaling-stroke" />
          <circle cx="262" cy="225" r="2.5" stroke={colors.via} strokeWidth="1" fill={colors.viaFill} vectorEffect="non-scaling-stroke" />
          <circle cx="274" cy="225" r="2.5" stroke={colors.via} strokeWidth="1" fill={colors.viaFill} vectorEffect="non-scaling-stroke" />

          {/* Solder Via Pair */}
          <circle cx="120" cy="315" r="2" fill={colors.via} vectorEffect="non-scaling-stroke" />
          <circle cx="132" cy="315" r="2" fill={colors.via} vectorEffect="non-scaling-stroke" />

          {/* ================================================================
              BOTTOM-RIGHT 4-LANE HORIZONTAL BUS & VIA CLUSTERS (Image 1 bottom-right)
              ================================================================ */}
          <path
            d="M 600 235 H 500 L 465 270 V 320"
            stroke={colors.trace}
            strokeWidth="1.2"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d="M 600 250 H 510 L 480 280 V 335"
            stroke={colors.trace}
            strokeWidth="1.2"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d="M 600 265 H 520 L 495 290 H 420"
            stroke={colors.trace}
            strokeWidth="1.2"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d="M 600 280 H 530 L 510 300 H 400"
            stroke={colors.trace}
            strokeWidth="1.2"
            vectorEffect="non-scaling-stroke"
          />

          <circle cx="465" cy="320" r="3.5" stroke={colors.via} strokeWidth="1.2" fill={colors.viaFill} vectorEffect="non-scaling-stroke" />
          <circle cx="480" cy="335" r="3.5" stroke={colors.via} strokeWidth="1.2" fill={colors.viaFill} vectorEffect="non-scaling-stroke" />
          <circle cx="420" cy="290" r="3.5" stroke={colors.via} strokeWidth="1.2" fill={colors.viaFill} vectorEffect="non-scaling-stroke" />
          <circle cx="400" cy="300" r="3.5" stroke={colors.via} strokeWidth="1.2" fill={colors.viaFill} vectorEffect="non-scaling-stroke" />

          {/* Vertical 4-Via Cluster (oooo) along right edge */}
          <circle cx="585" cy="180" r="2.5" stroke={colors.via} strokeWidth="1" fill={colors.viaFill} vectorEffect="non-scaling-stroke" />
          <circle cx="585" cy="192" r="2.5" stroke={colors.via} strokeWidth="1" fill={colors.viaFill} vectorEffect="non-scaling-stroke" />
          <circle cx="585" cy="204" r="2.5" stroke={colors.via} strokeWidth="1" fill={colors.viaFill} vectorEffect="non-scaling-stroke" />
          <circle cx="585" cy="216" r="2.5" stroke={colors.via} strokeWidth="1" fill={colors.viaFill} vectorEffect="non-scaling-stroke" />

          {/* Horizontal 4-Via Cluster (oooo) along bottom-right edge */}
          <circle cx="505" cy="335" r="2.5" stroke={colors.via} strokeWidth="1" fill={colors.viaFill} vectorEffect="non-scaling-stroke" />
          <circle cx="517" cy="335" r="2.5" stroke={colors.via} strokeWidth="1" fill={colors.viaFill} vectorEffect="non-scaling-stroke" />
          <circle cx="529" cy="335" r="2.5" stroke={colors.via} strokeWidth="1" fill={colors.viaFill} vectorEffect="non-scaling-stroke" />
          <circle cx="541" cy="335" r="2.5" stroke={colors.via} strokeWidth="1" fill={colors.viaFill} vectorEffect="non-scaling-stroke" />
        </g>
      </svg>
    </div>
  );
}
