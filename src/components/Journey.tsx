"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Milestone {
  year: string;
  chapter: string;
  role: string;
  institution: string;
  image: string;
  highlights: string[];
  clockAngle: number; // positive SVG degrees pointing downward toward each card
  beamLength: number; // distance from clock pivot to top edge of each stepped card
  stepOffsetY: number; // stepped diagonal cascade offset on desktop
}

const MILESTONES: Milestone[] = [
  {
    year: "2021",
    chapter: "BEGINNING",
    role: "HND Computing & Software Engineering",
    institution: "Cardiff Metropolitan University",
    image: "/images/journey/2021-color.jpg",
    highlights: [
      "STARTED HND (2021 – 2023)",
      "CORE JAVA, HTML5, CSS3 & JS",
      "RELATIONAL DATABASE DESIGN",
    ],
    clockAngle: 148,
    beamLength: 500,
    stepOffsetY: -64,
  },
  {
    year: "2022",
    chapter: "EXPLORATION",
    role: "Full-Stack Foundations",
    institution: "Cardiff Met & Univ. of Moratuwa",
    image: "/images/journey/2022-color.jpg",
    highlights: [
      "PHP, LARAVEL & MYSQL STACK",
      "FULL-STACK WEB CERTIFICATIONS",
      "MVC & RESTFUL API PATTERNS",
    ],
    clockAngle: 136,
    beamLength: 430,
    stepOffsetY: -38,
  },
  {
    year: "2023",
    chapter: "TRANSITION",
    role: "HND Completed → BSc Top-Up",
    institution: "Cardiff Metropolitan University",
    image: "/images/journey/2023-color.jpg",
    highlights: [
      "COMPLETED HND COMPUTING",
      "STARTED BSC (HONS) TOP-UP",
      "SMART SCHOOL SYSTEM (REACT)",
    ],
    clockAngle: 121,
    beamLength: 390,
    stepOffsetY: -12,
  },
  {
    year: "2024",
    chapter: "DEGREE & INTERN",
    role: "BSc (Hons) Graduate & Intern",
    institution: "Intellect Choice (Pvt) Ltd",
    image: "/images/journey/2024-color.jpg",
    highlights: [
      "BSC (HONS) 2ND CLASS DIV II",
      "INTERN FULL-STACK DEVELOPER",
      "+30% WORKFLOW AUTOMATION",
    ],
    clockAngle: 104,
    beamLength: 375,
    stepOffsetY: 14,
  },
  {
    year: "2025",
    chapter: "ENGINEER",
    role: "Full-Stack Software Engineer",
    institution: "Onimta Information Technology",
    image: "/images/journey/2025-color.jpg",
    highlights: [
      "JULY 2025 – PRESENT",
      "25+ MODULE ERP, CRM & ECOMMERCE",
      "REACT, NEXT.JS, LARAVEL & NODE",
    ],
    clockAngle: 86,
    beamLength: 385,
    stepOffsetY: 40,
  },
  {
    year: "2026",
    chapter: "NEXT CHAPTER",
    role: "Enterprise & Cloud Scale",
    institution: "Onimta IT · Present",
    image: "/images/journey/2026-dev.jpg",
    highlights: [
      "PAYHERE & VENPAA PLATFORMS",
      "RBAC, JWT & MYSQL OPTIMIZATION",
      "AWS, DOCKER & CI/CD PIPELINES",
    ],
    clockAngle: 69,
    beamLength: 425,
    stepOffsetY: 66,
  },
];

function MilestoneVisual({
  year,
  chapter,
  image,
  isActive,
}: {
  year: string;
  chapter: string;
  image: string;
  isActive: boolean;
}) {
  return (
    <div className="relative w-full h-28 sm:h-32 overflow-hidden rounded-t-lg bg-[#040914] border-b border-cyan-500/20">
      <Image
        src={image}
        alt={`${year} - ${chapter}`}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 18vw"
        className={`object-cover transition-all duration-700 ease-out ${
          isActive
            ? "scale-105 saturate-115 contrast-105 brightness-105"
            : "scale-100 saturate-105 brightness-95 group-hover:scale-105 group-hover:saturate-115 group-hover:brightness-105"
        }`}
      />

      {/* Simple Subtle Overlay on Card Images */}
      <div
        className={`absolute inset-0 transition-opacity duration-500 pointer-events-none ${
          isActive
            ? "bg-linear-to-t from-[#040914]/85 via-[#061126]/25 to-[#0ea5e9]/10 opacity-90"
            : "bg-linear-to-t from-[#040914]/90 via-[#040914]/40 to-[#040914]/25 opacity-100 group-hover:opacity-85"
        }`}
      />
    </div>
  );
}

export function Journey() {
  const [activeIndex, setActiveIndex] = useState<number>(4); // Default highlight on 2025/Engineer or user-selected
  const [isInView, setIsInView] = useState<boolean>(false);
  const activeMilestone = MILESTONES[activeIndex];
  const sectionRef = useRef<HTMLElement | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const clockLayerRef = useRef<HTMLDivElement | null>(null);
  const leftHeaderRef = useRef<HTMLDivElement | null>(null);
  const rightHeaderRef = useRef<HTMLDivElement | null>(null);
  const cardMotionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const footerRef = useRef<HTMLDivElement | null>(null);

  const [clockMetrics, setClockMetrics] = useState<{
    cx: number;
    cy: number;
    targets: { angleDeg: number; beamLen: number }[];
  }>(() => ({
    cx: 740,
    cy: 72,
    targets: MILESTONES.map((m) => ({
      angleDeg: m.clockAngle,
      beamLen: m.beamLength,
    })),
  }));

  const measureClockTargets = useCallback(() => {
    const section = sectionRef.current;
    if (!section) return;
    const sectionRect = section.getBoundingClientRect();
    if (sectionRect.width === 0) return;

    const nextCx = sectionRect.width * 0.62;
    const nextCy = 72;

    const nextTargets = MILESTONES.map((m, idx) => {
      const cardEl = cardRefs.current[idx];
      if (!cardEl) {
        return { angleDeg: m.clockAngle, beamLen: m.beamLength };
      }
      const cardRect = cardEl.getBoundingClientRect();
      if (cardRect.width === 0) {
        return { angleDeg: m.clockAngle, beamLen: m.beamLength };
      }
      const targetX = cardRect.left - sectionRect.left + cardRect.width / 2;
      const targetY = cardRect.top - sectionRect.top + 8;
      const dx = targetX - nextCx;
      const dy = targetY - nextCy;
      return {
        angleDeg: (Math.atan2(dy, dx) * 180) / Math.PI,
        beamLen: Math.hypot(dx, dy),
      };
    });

    setClockMetrics({ cx: nextCx, cy: nextCy, targets: nextTargets });
  }, []);

  useEffect(() => {
    const rafId = requestAnimationFrame(measureClockTargets);
    const section = sectionRef.current;
    const observer =
      typeof ResizeObserver !== "undefined" && section
        ? new ResizeObserver(() => measureClockTargets())
        : null;
    if (observer && section) {
      observer.observe(section);
    }
    window.addEventListener("resize", measureClockTargets);
    return () => {
      cancelAnimationFrame(rafId);
      observer?.disconnect();
      window.removeEventListener("resize", measureClockTargets);
    };
  }, [measureClockTargets]);

  // Modern 60fps scroll-scrubbed & spring-smoothed entrance animation for clock, headers, and staggered cards
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let rafId = 0;
    let current = 0;
    let target = 0;
    let handsTriggered = false;

    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
    const clamp01 = (v: number) => Math.min(Math.max(v, 0), 1);

    const applyVisuals = (p: number) => {
      // 1. Clock Dial: unfolds, scales & rotates gracefully into place with scroll
      const clockP = easeOutCubic(clamp01((p - 0.02) / 0.85));
      if (clockLayerRef.current) {
        clockLayerRef.current.style.opacity = (clockP * 0.95).toFixed(3);
        clockLayerRef.current.style.transform = `translate3d(0, ${((1 - clockP) * -90).toFixed(1)}px, 0) scale(${(0.72 + clockP * 0.28).toFixed(4)}) rotate(${((1 - clockP) * -14).toFixed(2)}deg)`;
      }

      // 2. Left & Right Editorial Headers: glide inward smoothly
      const headerP = easeOutCubic(clamp01((p - 0.05) / 0.72));
      if (leftHeaderRef.current) {
        leftHeaderRef.current.style.opacity = headerP.toFixed(3);
        leftHeaderRef.current.style.transform = `translate3d(${((1 - headerP) * -68).toFixed(1)}px, ${((1 - headerP) * 36).toFixed(1)}px, 0)`;
      }
      if (rightHeaderRef.current) {
        rightHeaderRef.current.style.opacity = headerP.toFixed(3);
        rightHeaderRef.current.style.transform = `translate3d(${((1 - headerP) * 68).toFixed(1)}px, ${((1 - headerP) * 36).toFixed(1)}px, 0)`;
      }

      // 3. Staggered 2021–2026 Cards Wave Cascade (noticeable unhurried wave)
      MILESTONES.forEach((_, idx) => {
        const el = cardMotionRefs.current[idx];
        if (!el) return;
        const start = 0.08 + idx * 0.085;
        const span = 0.48;
        const cardP = easeOutCubic(clamp01((p - start) / span));
        el.style.opacity = cardP.toFixed(3);
        el.style.transform = `translate3d(0, ${((1 - cardP) * 110).toFixed(1)}px, 0) scale(${(0.86 + cardP * 0.14).toFixed(4)})`;
      });

      // 4. Bottom Footnotes
      const footP = easeOutCubic(clamp01((p - 0.62) / 0.36));
      if (footerRef.current) {
        footerRef.current.style.opacity = footP.toFixed(3);
        footerRef.current.style.transform = `translate3d(0, ${((1 - footP) * 30).toFixed(1)}px, 0)`;
      }
    };

    const computeTarget = () => {
      const rect = section.getBoundingClientRect();
      const vh = Math.max(window.innerHeight, 1);
      // Progress 0 when section top enters bottom of viewport -> 1 when section top reaches near top of viewport
      target = clamp01((vh - rect.top) / (vh * 0.92));

      // Trigger the clock hands sweep once the user has scrolled halfway into Journey
      if (target >= 0.45 && !handsTriggered) {
        handsTriggered = true;
        setIsInView(true);
        setTimeout(measureClockTargets, 600);
        setTimeout(measureClockTargets, 1400);
      } else if (target < 0.12 && handsTriggered) {
        handsTriggered = false;
        setIsInView(false);
      }
    };

    const tick = () => {
      const diff = target - current;
      if (Math.abs(diff) < 0.001) {
        current = target;
        applyVisuals(current);
        rafId = 0;
        if (current >= 0.98) {
          measureClockTargets();
        }
        return;
      }
      // Slower silky spring damping so the user clearly sees every element glide in
      current += diff * 0.045;
      applyVisuals(current);
      rafId = requestAnimationFrame(tick);
    };

    const onScroll = () => {
      computeTarget();
      if (!rafId) {
        rafId = requestAnimationFrame(tick);
      }
    };

    computeTarget();
    current = target;
    applyVisuals(current);

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [measureClockTargets]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : MILESTONES.length - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev < MILESTONES.length - 1 ? prev + 1 : 0));
  };

  const { cx, cy, targets } = clockMetrics;
  const activeTarget = targets[activeIndex] ?? {
    angleDeg: activeMilestone.clockAngle,
    beamLen: activeMilestone.beamLength,
  };
  const BASE_BEAM_LEN = 400;
  const CONE_HALF_WIDTH = Math.tan((8.5 * Math.PI) / 180) * BASE_BEAM_LEN;
  const targetNeedleDeg = activeTarget.angleDeg - 90;
  const needleRotationDeg = isInView ? targetNeedleDeg : 82;
  const beamScaleY = isInView ? activeTarget.beamLen / BASE_BEAM_LEN : 0.15;
  // Maintain an exact 60° angle between small hand and big hand
  const smallHandRotationDeg = needleRotationDeg - 60;
  const handTransition = isInView
    ? "transform 1150ms cubic-bezier(0.22, 1, 0.36, 1)"
    : "transform 500ms ease-out";

  return (
    <section
      ref={sectionRef}
      id="journey"
      className="relative w-full overflow-hidden bg-[#010206] text-white pt-14 sm:pt-18 pb-8 sm:pb-10 px-4 sm:px-8 md:px-12 flex flex-col border-t border-cyan-950/50 select-none"
    >
      {/* 1. Atmospheric Background Glow (Synced with Hero Cyan/Sapphire Palette) */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_75%_55%_at_55%_25%,rgba(14,165,233,0.14)_0%,rgba(30,64,175,0.08)_45%,transparent_80%)]"
      />

      {/* 2. Giant Horological Clock Dial & Glowing Cyan Flashlight Beam SVG */}
      <div
        ref={clockLayerRef}
        aria-hidden="true"
        className="hidden lg:block absolute inset-0 pointer-events-none overflow-hidden z-10 origin-top will-change-transform"
      >
        <svg className="w-full h-full">
          <defs>
            <linearGradient
              id="beamGrad"
              x1="0%"
              y1="0%"
              x2="0%"
              y2="100%"
              gradientUnits="objectBoundingBox"
            >
              <stop offset="0%" stopColor="#f0f9ff" stopOpacity="1" />
              <stop offset="45%" stopColor="#38bdf8" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#7dd3fc" stopOpacity="0.92" />
            </linearGradient>
            <linearGradient
              id="flashlightConeGrad"
              x1="0%"
              y1="0%"
              x2="0%"
              y2="100%"
              gradientUnits="objectBoundingBox"
            >
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.22" />
              <stop offset="65%" stopColor="#0ea5e9" stopOpacity="0.14" />
              <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
            </linearGradient>
            <radialGradient id="hotspotGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
              <stop offset="28%" stopColor="#7dd3fc" stopOpacity="0.7" />
              <stop offset="65%" stopColor="#0ea5e9" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#0284c7" stopOpacity="0" />
            </radialGradient>
            <linearGradient
              id="modernHandGrad"
              x1="0%"
              y1="0%"
              x2="0%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#e0f2fe" stopOpacity="0.95" />
              <stop offset="55%" stopColor="#7dd3fc" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.85" />
            </linearGradient>
            <filter id="cyanGlow" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Stylish Classic Horological Clock Dial, Railroad Chapter Ring & Roman Numerals */}
          {/* Outer Architectural Bezel & Double Railroad Chapter Track */}
          <circle
            cx={cx}
            cy={cy}
            r="310"
            fill="none"
            stroke="rgba(56, 189, 248, 0.18)"
            strokeWidth="1"
          />
          <circle
            cx={cx}
            cy={cy}
            r="302"
            fill="none"
            stroke="rgba(125, 211, 252, 0.42)"
            strokeWidth="1.7"
          />
          <circle
            cx={cx}
            cy={cy}
            r="286"
            fill="none"
            stroke="rgba(56, 189, 248, 0.34)"
            strokeWidth="1.2"
          />

          {/* Inner Numeral Track & Filigree Rings */}
          <circle
            cx={cx}
            cy={cy}
            r="244"
            fill="none"
            stroke="rgba(56, 189, 248, 0.24)"
            strokeWidth="1.1"
          />
          <circle
            cx={cx}
            cy={cy}
            r="236"
            fill="none"
            stroke="rgba(125, 211, 252, 0.25)"
            strokeWidth="1"
            strokeDasharray="2 6"
          />
          <circle
            cx={cx}
            cy={cy}
            r="172"
            fill="none"
            stroke="rgba(30, 64, 175, 0.32)"
            strokeWidth="1"
          />
          <circle
            cx={cx}
            cy={cy}
            r="48"
            fill="none"
            stroke="rgba(56, 189, 248, 0.28)"
            strokeWidth="1"
          />
          <circle
            cx={cx}
            cy={cy}
            r="35"
            fill="none"
            stroke="rgba(125, 211, 252, 0.32)"
            strokeWidth="1"
            strokeDasharray="3 4"
          />

          {/* 12 Classic Radial Hour Division Hairlines */}
          {Array.from({ length: 12 }, (_, idx) => {
            const angle = idx * 30 * (Math.PI / 180);
            return (
              <line
                key={`spoke-${idx}`}
                x1={cx + Math.cos(angle) * 48}
                y1={cy + Math.sin(angle) * 48}
                x2={cx + Math.cos(angle) * 236}
                y2={cy + Math.sin(angle) * 236}
                stroke="rgba(56, 189, 248, 0.1)"
                strokeWidth="0.9"
              />
            );
          })}

          {/* Full Railroad Chapter Ring Ticks & Classic Diamond Hour Pips */}
          {Array.from({ length: 72 }, (_, idx) => {
            const deg = -15 + idx * 3;
            const angle = deg * (Math.PI / 180);
            const isMajor = idx % 5 === 0;
            const r1 = isMajor ? 279 : 286;
            const r2 = 302;
            const pipX = cx + Math.cos(angle) * 272;
            const pipY = cy + Math.sin(angle) * 272;
            return (
              <g key={`tick-${idx}`}>
                <line
                  x1={cx + Math.cos(angle) * r1}
                  y1={cy + Math.sin(angle) * r1}
                  x2={cx + Math.cos(angle) * r2}
                  y2={cy + Math.sin(angle) * r2}
                  stroke={
                    isMajor
                      ? "rgba(186, 230, 253, 0.72)"
                      : "rgba(56, 189, 248, 0.28)"
                  }
                  strokeWidth={isMajor ? "1.9" : "0.9"}
                />
                {isMajor && (
                  <circle
                    cx={pipX}
                    cy={pipY}
                    r="1.9"
                    fill="rgba(186, 230, 253, 0.75)"
                  />
                )}
              </g>
            );
          })}

          {/* Classic Roman Numerals Along the Lower Chapter Ring */}
          {[
            { numeral: "III", deg: 0 },
            { numeral: "IV", deg: 30 },
            { numeral: "V", deg: 60 },
            { numeral: "VI", deg: 90 },
            { numeral: "VII", deg: 120 },
            { numeral: "VIII", deg: 150 },
            { numeral: "IX", deg: 180 },
          ].map(({ numeral, deg }) => {
            const rad = (deg * Math.PI) / 180;
            const rNum = 260;
            const nx = cx + Math.cos(rad) * rNum;
            const ny = cy + Math.sin(rad) * rNum;
            const rot = deg - 90;
            return (
              <text
                key={numeral}
                x={nx}
                y={ny}
                fill="rgba(125, 211, 252, 0.38)"
                fontSize="12.5"
                fontWeight="600"
                letterSpacing="0.12em"
                textAnchor="middle"
                dominantBaseline="central"
                transform={`rotate(${rot}, ${nx}, ${ny})`}
                className="font-cinzel select-none"
              >
                {numeral}
              </text>
            );
          })}

          {/* Pivot-Anchored Hands & Center Joint (0,0 local origin for buttery 60fps CSS transforms) */}
          <g transform={`translate(${cx}, ${cy})`}>
            {/* Stylish Classic Breguet / Wall-Clock Ornamental Small Hand ("Podi Katta") */}
            <g
              style={{
                transform: `rotate(${smallHandRotationDeg}deg)`,
                transformOrigin: "0px 0px",
                transition: handTransition,
                willChange: "transform",
              }}
              filter="url(#cyanGlow)"
            >
              {/* Classic ornamental counterweight tail */}
              <polygon
                points="-1.5,0 1.5,0 2.6,-20 0,-30 -2.6,-20"
                fill="url(#modernHandGrad)"
              />
              <circle
                cx="0"
                cy="-20"
                r="3.8"
                fill="#010206"
                stroke="url(#modernHandGrad)"
                strokeWidth="1.5"
              />

              {/* Sculpted main shaft with decorative collar */}
              <polygon
                points="-2.8,0 2.8,0 2.1,37 4.2,42 1.7,47 1.7,78 -1.7,78 -1.7,47 -4.2,42 -2.1,37"
                fill="url(#modernHandGrad)"
              />

              {/* Classic Breguet / antique wall-clock hollow medallion ring */}
              <circle
                cx="0"
                cy="90"
                r="11.5"
                fill="#010206"
                stroke="url(#modernHandGrad)"
                strokeWidth="2.8"
              />
              <circle
                cx="0"
                cy="90"
                r="7.2"
                fill="none"
                stroke="rgba(186, 230, 253, 0.6)"
                strokeWidth="0.85"
              />

              {/* Elongated diamond-spear blade tapering to a sharp needle point */}
              <polygon
                points="-1.9,101 1.9,101 3.8,117 0,170 -3.8,117"
                fill="url(#modernHandGrad)"
              />
            </g>

            {/* Sweeping Big Clock Hand ("Loku Katta") & Flashlight Cone */}
            <g
              style={{
                transform: `rotate(${needleRotationDeg}deg)`,
                transformOrigin: "0px 0px",
                transition: handTransition,
                willChange: "transform",
              }}
            >
              {/* Scaled Beam & Flashlight Cone */}
              <g
                style={{
                  transform: `scaleY(${beamScaleY})`,
                  transformOrigin: "0px 0px",
                  transition: handTransition,
                  willChange: "transform",
                }}
              >
                <polygon
                  points={`0,0 ${-CONE_HALF_WIDTH},${BASE_BEAM_LEN} ${CONE_HALF_WIDTH},${BASE_BEAM_LEN}`}
                  fill="url(#flashlightConeGrad)"
                />
                <line
                  x1="0"
                  y1="0"
                  x2="0"
                  y2={BASE_BEAM_LEN}
                  stroke="url(#beamGrad)"
                  strokeWidth="4"
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                  filter="url(#cyanGlow)"
                />
              </g>

              {/* Classic Horological Base Ornament on the Big Hand */}
              <g filter="url(#cyanGlow)">
                <polygon
                  points="-1.8,0 1.8,0 2.8,-24 0,-32 -2.8,-24"
                  fill="url(#modernHandGrad)"
                />
                <polygon points="-2.8,0 2.8,0 2,43 -2,43" fill="#e0f2fe" />
                <circle
                  cx="0"
                  cy="52"
                  r="7.5"
                  fill="#010206"
                  stroke="#e0f2fe"
                  strokeWidth="2.2"
                />
              </g>

              {/* Flashlight Impact Hotspot Burst on Active Card Top Edge */}
              <g
                style={{
                  transform: `translateY(${activeTarget.beamLen}px)`,
                  transition: handTransition,
                  willChange: "transform",
                }}
              >
                <circle cx="0" cy="0" r="52" fill="url(#hotspotGrad)" />
                <circle
                  cx="0"
                  cy="0"
                  r="5"
                  fill="#ffffff"
                  filter="url(#cyanGlow)"
                />
              </g>
            </g>

            {/* Classic Ornate Center Rosette & Arbor Joint Point */}
            <g>
              <circle
                cx="0"
                cy="0"
                r="14"
                fill="#020617"
                stroke="rgba(56, 189, 248, 0.4)"
                strokeWidth="1"
              />
              <circle
                cx="0"
                cy="0"
                r="10.5"
                fill="none"
                stroke="rgba(186, 230, 253, 0.65)"
                strokeWidth="1.2"
                strokeDasharray="2 2.5"
              />
              <circle
                cx="0"
                cy="0"
                r="7"
                fill="#0f172a"
                stroke="#7dd3fc"
                strokeWidth="1.4"
              />
              <circle cx="0" cy="0" r="3" fill="#f0f9ff" />
            </g>
          </g>
        </svg>
      </div>

      {/* 3. Top Header Row: Left Editorial Title & Right Interactive Prompt */}
      <div className="relative z-20 w-full max-w-7xl mx-auto flex items-start justify-between gap-6">
        {/* Top-Left Stacked Editorial Title */}
        <div ref={leftHeaderRef} className="flex flex-col will-change-transform">
          <h2 className="font-cinzel text-2xl sm:text-3xl md:text-4xl font-bold tracking-[0.18em] leading-[1.15] text-zinc-100 uppercase">
            A
            <br />
            JOURNEY
            <br />
            THROUGH
            <br />
            <span className="text-cyan-400 drop-shadow-[0_0_15px_rgba(56,189,248,0.65)]">
              TIME
            </span>
          </h2>

          <div className="mt-5 pl-0.5 border-l border-cyan-500/40 flex flex-col gap-1.5 text-[9px] sm:text-[10px] font-mono tracking-[0.28em] text-zinc-500 uppercase">
            <span className={activeIndex <= 1 ? "text-cyan-300" : ""}>
              2021–2023 · HND
            </span>
            <span className={activeIndex === 2 ? "text-cyan-300" : ""}>
              2023–2024 · TOP-UP
            </span>
            <span className={activeIndex === 3 ? "text-cyan-300" : ""}>
              2024–2025 · INTERN
            </span>
            <span className={activeIndex >= 4 ? "text-cyan-300" : ""}>
              2025–PRESENT · SOFTWARE ENGINEER
            </span>
          </div>
        </div>

        {/* Top-Right Interactive Control Prompt */}
        <div
          ref={rightHeaderRef}
          className="flex flex-col items-end text-right gap-3 will-change-transform"
        >
          <p className="font-cinzel text-[10px] sm:text-xs tracking-[0.26em] text-zinc-400 uppercase leading-relaxed">
            SELECT A YEAR TO TRAVEL
            <br />
            <span className="text-cyan-400">THROUGH TIME</span>
          </p>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous year"
              className="p-2 rounded-sm border border-cyan-900/70 bg-[#050b18]/80 text-zinc-300 hover:text-cyan-300 hover:border-cyan-400/70 transition cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="font-cinzel text-sm font-bold tracking-[0.2em] text-cyan-300 min-w-13.5 text-center">
              {activeMilestone.year}
            </span>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next year"
              className="p-2 rounded-sm border border-cyan-900/70 bg-[#050b18]/80 text-zinc-300 hover:text-cyan-300 hover:border-cyan-400/70 transition cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 4. Stepped Year Headers & Milestone Cards (2021 – 2026) with Uniform Modern Spacing */}
      <div className="relative z-20 w-full max-w-7xl mx-auto mt-10 lg:mt-20 mb-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6 sm:gap-5 lg:gap-3 items-start lg:pb-8">
          {MILESTONES.map((item, idx) => {
            const isActive = idx === activeIndex;
            return (
              <div
                key={item.year}
                onClick={() => setActiveIndex(idx)}
                onMouseEnter={() => setActiveIndex(idx)}
                style={{
                  // Stepped diagonal cascade applied to both year header & card together for uniform gap
                  ["--step-y" as string]: `${item.stepOffsetY}px`,
                }}
                className={`group flex flex-col items-center cursor-pointer lg:translate-y-(--step-y) ${
                  isActive ? "z-20" : "z-10"
                }`}
              >
                {/* Year Header & Modern Glowing Accent Bar (Uniform Distance Above Every Card) */}
                <div
                  ref={(el) => {
                    cardMotionRefs.current[idx] = el;
                  }}
                  className="w-full flex flex-col items-center will-change-transform"
                >
                  <button
                    type="button"
                    onClick={() => setActiveIndex(idx)}
                    className="flex flex-col items-center gap-1.5 mb-3 cursor-pointer focus:outline-none"
                  >
                    <span
                      className={`font-cinzel text-lg sm:text-xl md:text-2xl font-bold tracking-[0.14em] transition-all duration-300 ${
                        isActive
                          ? "text-cyan-300 scale-110 drop-shadow-[0_0_14px_rgba(56,189,248,0.9)]"
                          : "text-zinc-400 opacity-75 group-hover:opacity-100 group-hover:text-zinc-200"
                      }`}
                    >
                      {item.year}
                    </span>
                    <span
                      aria-hidden="true"
                      className={`h-0.5 rounded-full transition-all duration-500 ${
                        isActive
                          ? "w-12 bg-cyan-400 shadow-[0_0_12px_#38bdf8]"
                          : "w-6 bg-cyan-900/60 group-hover:w-9 group-hover:bg-cyan-500/70"
                      }`}
                    />
                  </button>

                  {/* Milestone Card */}
                  <div
                    ref={(el) => {
                      cardRefs.current[idx] = el;
                    }}
                    className={`relative w-full rounded-lg border transition-all duration-500 backdrop-blur-md ${
                      isActive
                        ? "bg-[#061126]/95 border-cyan-400/85 shadow-[0_0_28px_rgba(56,189,248,0.32)] scale-[1.03]"
                        : "bg-[#040914]/85 border-cyan-950/70 group-hover:border-cyan-600/60 opacity-85 group-hover:opacity-100"
                    }`}
                  >
                    {/* Flashlight beam impact flare along the top edge of the targeted card */}
                    <div
                      aria-hidden="true"
                      className={`pointer-events-none absolute -top-2 inset-x-0 h-14 rounded-t-lg transition-opacity duration-500 ${
                        isActive ? "opacity-100" : "opacity-0"
                      }`}
                      style={{
                        background:
                          "radial-gradient(ellipse 65% 95% at 50% 0%, rgba(165, 243, 252, 0.45) 0%, rgba(56, 189, 248, 0.22) 45%, transparent 80%)",
                      }}
                    />
                    <MilestoneVisual
                      year={item.year}
                      chapter={item.chapter}
                      image={item.image}
                      isActive={isActive}
                    />

                    <div className="p-3.5 sm:p-4">
                      <div className="flex items-baseline justify-between gap-2">
                        <span
                          className={`font-cinzel text-lg font-bold tracking-wider ${
                            isActive ? "text-cyan-300" : "text-zinc-200"
                          }`}
                        >
                          {item.year}
                        </span>
                        <span className="text-[9px] font-mono tracking-[0.2em] text-cyan-400/90 uppercase">
                          {item.chapter}
                        </span>
                      </div>

                      <h3 className="mt-1.5 text-xs font-bold text-white leading-snug">
                        {item.role}
                      </h3>
                      <p className="text-[10px] text-cyan-300/80 font-medium mt-0.5">
                        {item.institution}
                      </p>

                      <ul className="mt-3 space-y-1 border-t border-cyan-950/80 pt-2.5">
                        {item.highlights.map((line, lIdx) => (
                          <li
                            key={lIdx}
                            className="text-[9px] font-mono tracking-wider text-zinc-400 leading-relaxed"
                          >
                            {line}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 5. Bottom Row: Editorial Footnotes */}
      <div
        ref={footerRef}
        className="relative z-20 w-full max-w-7xl mx-auto flex items-end justify-between pt-2 will-change-transform"
      >
        <p className="font-cinzel text-[9px] sm:text-[10px] tracking-[0.28em] text-zinc-500 uppercase leading-relaxed">
          SAME
          <br />
          CURIOSITY
          <br />
          A BRIGHTER
          <br />
          <span className="text-zinc-300">TOMORROW</span>
        </p>

        <p className="font-cinzel text-[9px] sm:text-[10px] tracking-[0.28em] text-zinc-500 uppercase text-right leading-relaxed">
          STILL
          <br />
          BUILDING
          <br />
          WHAT&apos;S
          <br />
          <span className="text-cyan-400">NEXT</span>
        </p>
      </div>
    </section>
  );
}
