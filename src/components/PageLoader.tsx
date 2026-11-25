"use client";

import React, { useEffect, useRef, useState } from "react";

const PRELOAD_ASSETS = [
  "/hero-character-blue.png",
  "/modern-hero-texture.jpg",
  "/wet-floor-blue.jpg",
];

const BRAND_LETTERS = "THAMALPATH".split("");

const TICK_MARKS = Array.from({ length: 36 }, (_, idx) => {
  const rad = (idx * 10 * Math.PI) / 180;
  const isMajor = idx % 3 === 0;
  const r1 = isMajor ? 81 : 84;
  const r2 = 88;
  return {
    key: idx,
    x1: Number((100 + Math.cos(rad) * r1).toFixed(2)),
    y1: Number((100 + Math.sin(rad) * r1).toFixed(2)),
    x2: Number((100 + Math.cos(rad) * r2).toFixed(2)),
    y2: Number((100 + Math.sin(rad) * r2).toFixed(2)),
    stroke: isMajor ? "rgba(125, 211, 252, 0.55)" : "rgba(56, 189, 248, 0.22)",
    strokeWidth: isMajor ? "1.3" : "0.7",
  };
});

function getLoadingStage(progress: number): string {
  if (progress < 40) return "PREPARING EXPERIENCE";
  if (progress < 85) return "LOADING ASSETS";
  if (progress < 100) return "FINALIZING";
  return "WELCOME";
}

interface PageLoaderProps {
  onRevealStart: () => void;
  onComplete: () => void;
}

export function PageLoader({ onRevealStart, onComplete }: PageLoaderProps) {
  const [progress, setProgress] = useState<number>(0);
  const [phase, setPhase] = useState<"loading" | "flash" | "splitting">(
    "loading",
  );
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // 1. Subtle Ambient Cyan Micro-Ember & Dust Canvas (Synced with Hero Atmosphere)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId = 0;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const particles = Array.from({ length: 42 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vy: -(0.25 + Math.random() * 0.75),
      vx: (Math.random() - 0.5) * 0.3,
      r: 0.8 + Math.random() * 1.8,
      alpha: 0.15 + Math.random() * 0.55,
      phase: Math.random() * Math.PI * 2,
    }));

    const render = (t: number) => {
      ctx.clearRect(0, 0, width, height);
      for (const p of particles) {
        p.y += p.vy;
        p.x += p.vx + Math.sin(t * 0.0012 + p.phase) * 0.18;
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        const twinkle = 0.65 + 0.35 * Math.sin(t * 0.003 + p.phase);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(56, 189, 248, ${p.alpha * twinkle})`;
        ctx.fill();
      }
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // 2. Real Asset Preloading + Smooth Kinetic Progress + Split-Shutter Sequence
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    let assetsReady = false;
    let cancelled = false;

    const preloadImage = (src: string) =>
      new Promise<void>((resolve) => {
        const img = new window.Image();
        img.onload = () => resolve();
        img.onerror = () => resolve();
        img.src = src;
      });

    const fontsReady =
      typeof document !== "undefined" && "fonts" in document
        ? document.fonts.ready.catch(() => undefined)
        : Promise.resolve();

    const windowReady =
      document.readyState === "complete"
        ? Promise.resolve()
        : new Promise<void>((resolve) => {
            window.addEventListener("load", () => resolve(), { once: true });
          });

    const maxWaitTimeout = new Promise<void>((resolve) =>
      setTimeout(resolve, 2600),
    );

    Promise.race([
      Promise.all([
        ...PRELOAD_ASSETS.map(preloadImage),
        fontsReady,
        windowReady,
      ]),
      maxWaitTimeout,
    ]).then(() => {
      assetsReady = true;
    });

    const minDurationMs = 1850;
    const startTime = performance.now();
    let rafId = 0;
    let flashTimer: ReturnType<typeof setTimeout> | null = null;
    let splitTimer: ReturnType<typeof setTimeout> | null = null;
    let completeTimer: ReturnType<typeof setTimeout> | null = null;

    const tick = (now: number) => {
      if (cancelled) return;
      const elapsed = now - startTime;
      const timeRatio = Math.min(elapsed / minDurationMs, 1);
      const easedTime = 1 - Math.pow(1 - timeRatio, 3);
      const targetCap = assetsReady ? 100 : 92;
      const nextProgress = Math.min(
        Math.round(easedTime * targetCap),
        targetCap,
      );

      setProgress(nextProgress);

      if (assetsReady && timeRatio >= 1) {
        setProgress(100);
        // Step A: Center electric blue laser seam flash
        flashTimer = setTimeout(() => {
          if (cancelled) return;
          setPhase("flash");
          onRevealStart();
          // Step B: Dual-panel split shutter reveal
          splitTimer = setTimeout(() => {
            if (cancelled) return;
            setPhase("splitting");
            completeTimer = setTimeout(() => {
              if (cancelled) return;
              document.body.style.overflow = previousOverflow;
              onComplete();
            }, 820);
          }, 220);
        }, 160);
        return;
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelled = true;
      cancelAnimationFrame(rafId);
      if (flashTimer) clearTimeout(flashTimer);
      if (splitTimer) clearTimeout(splitTimer);
      if (completeTimer) clearTimeout(completeTimer);
      document.body.style.overflow = previousOverflow;
    };
  }, [onComplete, onRevealStart]);

  // SVG Gyroscopic Progress Ring Math
  const radius = 56;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = Number(
    (circumference * (1 - progress / 100)).toFixed(2),
  );
  const angleRad = ((progress / 100) * 360 - 90) * (Math.PI / 180);
  const sparkX = Number((100 + Math.cos(angleRad) * radius).toFixed(2));
  const sparkY = Number((100 + Math.sin(angleRad) * radius).toFixed(2));
  const isSplitting = phase === "splitting";

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Loading portfolio"
      className="fixed inset-0 z-100 pointer-events-auto overflow-hidden select-none"
    >
      {/* Top Split Shutter Panel */}
      <div
        aria-hidden="true"
        className={`absolute top-0 left-0 right-0 h-1/2 bg-[#010206] border-b border-sky-500/20 transition-transform duration-800 ease-[cubic-bezier(0.76,0,0.24,1)] ${
          isSplitting ? "-translate-y-full" : "translate-y-0"
        }`}
      />

      {/* Bottom Split Shutter Panel */}
      <div
        aria-hidden="true"
        className={`absolute bottom-0 left-0 right-0 h-1/2 bg-[#010206] border-t border-sky-500/20 transition-transform duration-800 ease-[cubic-bezier(0.76,0,0.24,1)] ${
          isSplitting ? "translate-y-full" : "translate-y-0"
        }`}
      />

      {/* Horizontal Blue Laser Seam Flash right before panels part */}
      <div
        aria-hidden="true"
        className={`absolute left-0 right-0 top-1/2 -translate-y-1/2 h-0.5 bg-linear-to-r from-transparent via-sky-300 to-transparent shadow-[0_0_24px_#38bdf8,0_0_48px_#0ea5e9] transition-all duration-300 ${
          phase === "flash" ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
        }`}
      />

      {/* Interactive Foreground Content Layer (Fades & Scales cleanly as shutters split) */}
      <div
        className={`relative z-10 w-full h-full flex flex-col justify-between p-6 sm:p-10 transition-all duration-500 ease-out ${
          isSplitting
            ? "opacity-0 scale-105"
            : phase === "flash"
              ? "opacity-90 scale-[1.01]"
              : "opacity-100 scale-100"
        }`}
      >
        {/* Ambient Cyan Ember Canvas + Architectural Grid */}
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          className="absolute inset-0 w-full h-full pointer-events-none opacity-80"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_52%_44%_at_50%_50%,rgba(14,165,233,0.16)_0%,rgba(30,64,175,0.08)_48%,transparent_80%)]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none opacity-[0.045]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #38bdf8 1px, transparent 1px), linear-gradient(to bottom, #38bdf8 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />

        {/* Oversized Kinetic Ghost Percentage Watermark */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden"
        >
          <span className="font-bebas text-[28vw] sm:text-[22vw] leading-none tracking-wider text-sky-400/[0.035] tabular-nums">
            {String(progress).padStart(2, "0")}
          </span>
        </div>

        {/* Top Minimal Editorial Header */}
        <div className="relative z-10 flex items-center justify-between text-[9px] sm:text-[10px] font-mono tracking-[0.28em] text-zinc-400 uppercase">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-400 shadow-[0_0_8px_#38bdf8]" />
            </span>
            <span className="text-zinc-300">PORTFOLIO</span>
          </div>
          <span className="text-zinc-500">EDITION · 2026</span>
        </div>

        {/* Center Gyroscopic Horological Core + Letter-by-Letter Brand Reveal */}
        <div className="relative z-10 flex flex-col items-center justify-center my-auto">
          <div className="relative w-60 h-60 sm:w-72 sm:h-72 md:w-80 md:h-80 flex items-center justify-center">
            <div className="absolute inset-6 rounded-full bg-sky-500/12 blur-2xl animate-pulse" />

            <svg
              viewBox="0 0 200 200"
              className="w-full h-full overflow-visible"
            >
              <defs>
                <linearGradient
                  id="gyroRingGrad"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#1e40af" />
                  <stop offset="50%" stopColor="#38bdf8" />
                  <stop offset="100%" stopColor="#f0f9ff" />
                </linearGradient>
                <filter
                  id="gyroGlow"
                  x="-50%"
                  y="-50%"
                  width="200%"
                  height="200%"
                >
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Outer Precision Degree Compass Ring (Slow Clockwise) */}
              <g className="origin-center animate-[spin_22s_linear_infinite]">
                <circle
                  cx="100"
                  cy="100"
                  r="88"
                  fill="none"
                  stroke="rgba(56, 189, 248, 0.16)"
                  strokeWidth="1"
                />
                {TICK_MARKS.map((tick) => (
                  <line
                    key={tick.key}
                    x1={tick.x1}
                    y1={tick.y1}
                    x2={tick.x2}
                    y2={tick.y2}
                    stroke={tick.stroke}
                    strokeWidth={tick.strokeWidth}
                  />
                ))}
              </g>

              {/* Counter-Rotating Segmented Gyro Ring */}
              <circle
                cx="100"
                cy="100"
                r="71"
                fill="none"
                stroke="rgba(56, 189, 248, 0.34)"
                strokeWidth="1.3"
                strokeDasharray="34 14 8 14"
                className="origin-center animate-[spin_10s_linear_infinite_reverse]"
              />

              {/* Progress Track Base */}
              <circle
                cx="100"
                cy="100"
                r={radius}
                fill="none"
                stroke="rgba(30, 64, 175, 0.32)"
                strokeWidth="2"
              />

              {/* Active Electric-Cyan Progress Arc */}
              <circle
                cx="100"
                cy="100"
                r={radius}
                fill="none"
                stroke="url(#gyroRingGrad)"
                strokeWidth="2.8"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                transform="rotate(-90 100 100)"
                filter="url(#gyroGlow)"
              />

              {/* Inner Geometric Diamond Frame */}
              <polygon
                points="100,62 138,100 100,138 62,100"
                fill="rgba(6, 17, 38, 0.55)"
                stroke="rgba(56, 189, 248, 0.32)"
                strokeWidth="1"
              />

              {/* Leading Luminous Spark Dot */}
              {progress > 1 && (
                <circle
                  cx={sparkX}
                  cy={sparkY}
                  r="3.6"
                  fill="#ffffff"
                  filter="url(#gyroGlow)"
                />
              )}
            </svg>

            {/* Center Monogram */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-cinzel text-5xl sm:text-6xl font-bold text-zinc-100 drop-shadow-[0_0_20px_rgba(56,189,248,0.8)]">
                T
              </span>
            </div>
          </div>

          {/* Kinetic Letter-by-Letter Illuminating Brand Title */}
          <div className="mt-6 flex items-center justify-center gap-2 sm:gap-3.5">
            {BRAND_LETTERS.map((char, idx) => {
              const letterThreshold = ((idx + 1) / BRAND_LETTERS.length) * 92;
              const isLit = progress >= letterThreshold;
              return (
                <span
                  key={idx}
                  className={`font-cinzel text-2xl sm:text-4xl md:text-[42px] font-bold transition-all duration-300 ${
                    isLit
                      ? "text-zinc-100 drop-shadow-[0_0_16px_rgba(56,189,248,0.8)] translate-y-0 opacity-100"
                      : "text-zinc-700 translate-y-0.5 opacity-45"
                  }`}
                >
                  {char}
                </span>
              );
            })}
          </div>

          <p className="mt-3 text-[10px] sm:text-xs font-mono tracking-[0.38em] text-sky-400/85 uppercase">
            FULL-STACK ENGINEER · ARCHITECT · DESIGNER
          </p>
        </div>

        {/* Bottom Bar: Clean Professional Status & Percentage Counter */}
        <div className="relative z-10 flex flex-col gap-4">
          <div className="flex items-end justify-between gap-4">
            {/* Professional Craft & Subtle Stage Status */}
            <div className="flex flex-col gap-1 text-[9px] sm:text-[10px] font-mono tracking-[0.26em] uppercase">
              <span className="text-zinc-500">
                DEVELOPER · DESIGNER · ENGINEER
              </span>
              <span className="text-sky-300/90">
                {getLoadingStage(progress)}
              </span>
            </div>

            {/* Crisp Monospace Percentage Readout */}
            <div className="flex flex-col items-end">
              <span className="font-bebas text-4xl sm:text-5xl leading-none tracking-wider text-zinc-100 tabular-nums drop-shadow-[0_0_16px_rgba(56,189,248,0.45)]">
                {String(progress).padStart(2, "0")}
                <span className="text-sky-400 text-2xl sm:text-3xl ml-0.5">
                  %
                </span>
              </span>
            </div>
          </div>

          {/* Edge-to-Edge Laser Progress Rail */}
          <div className="relative h-0.5 w-full bg-blue-950/70 overflow-hidden rounded-full">
            <div
              className="h-full bg-linear-to-r from-blue-700 via-sky-400 to-white shadow-[0_0_14px_#38bdf8] transition-[width] duration-100 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
