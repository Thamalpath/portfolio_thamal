"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

/* ============================================================================
   Self-Contained Pure SVG Icons
   ============================================================================ */

function IconRocket({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </svg>
  );
}

function IconLayers({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z" />
      <path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65" />
      <path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65" />
    </svg>
  );
}

function IconBuilding({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" />
      <path d="M6 12H4a2 2 0 0 0-2 2v8h4" />
      <path d="M18 9h2a2 2 0 0 1 2 2v11h-4" />
      <path d="M10 6h4" />
      <path d="M10 10h4" />
      <path d="M10 14h4" />
      <path d="M10 18h4" />
    </svg>
  );
}

function IconGraduationCap({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z" />
      <path d="M22 10v6" />
      <path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5" />
    </svg>
  );
}

function IconCalendar({ className = "w-3 h-3" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
    </svg>
  );
}

function IconChevronDown({
  className = "w-3.5 h-3.5",
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function IconCheckCircle({ className = "w-3 h-3" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function renderMilestoneIcon(
  type: "rocket" | "layers" | "building" | "education",
) {
  switch (type) {
    case "rocket":
      return <IconRocket className="w-4 h-4 text-sky-400" />;
    case "layers":
      return <IconLayers className="w-4 h-4 text-sky-400" />;
    case "building":
      return <IconBuilding className="w-4 h-4 text-sky-400" />;
    case "education":
      return <IconGraduationCap className="w-4 h-4 text-sky-400" />;
    default:
      return <IconRocket className="w-4 h-4 text-sky-400" />;
  }
}

interface ExperienceItem {
  id: string;
  year: string;
  period: string;
  role: string;
  company: string;
  iconType: "rocket" | "layers" | "building" | "education";
  summary: string;
  bullets: string[];
  tags: string[];
  metricBadge: string;
}

const EXPERIENCES: ExperienceItem[] = [
  {
    id: "onimta",
    year: "2026",
    period: "July 2025 – Present",
    role: "Full-Stack Software Engineer",
    company: "Onimta Information Technology (Pvt) Ltd",
    iconType: "rocket",
    summary:
      "Delivering scalable full-stack platforms across CRM, ERP, eCommerce & distribution platforms consisting of 25+ business modules.",
    bullets: [
      "Architected 25+ business modules using React.js, Next.js, Laravel, Node.js, and MySQL for enterprise operations.",
      "Designed secure RESTful APIs with validation layers supporting real-time cross-platform communication.",
      "Implemented Role-Based Access Control (RBAC) and JWT authentication across high-volume platforms.",
      "Optimized relational database schemas and indexing strategies, enhancing query efficiency under heavy load.",
    ],
    tags: [
      "REACT.JS",
      "NEXT.JS",
      "LARAVEL",
      "NODE.JS",
      "MYSQL",
      "REST APIS",
      "RBAC / JWT",
      "DOCKER",
    ],
    metricBadge: "25+ Enterprise Modules · High Scale",
  },
  {
    id: "venpaa",
    year: "2025",
    period: "2025 · Production Platform",
    role: "Venpaa Bookstore CRM & eCommerce Platform",
    company: "Enterprise E-Commerce & Distribution Infrastructure",
    iconType: "layers",
    summary:
      "Engineered secure eCommerce infrastructure with PayHere Payment Gateway integration and dual backend microservices.",
    bullets: [
      "Accelerated response times by 30% via dual backend microservices (Laravel & Node.js) communicating through REST APIs.",
      "Built enterprise CRM platform with 25+ operational modules (Inventory, Procurement, Finance, Sales, Analytics).",
      "Integrated PayHere Payment Gateway and automated transactional SMS/Email workflows.",
    ],
    tags: [
      "NEXT.JS",
      "REACT.JS",
      "TAILWIND CSS",
      "LARAVEL",
      "NODE.JS",
      "PAYHERE API",
      "MICROSERVICES",
    ],
    metricBadge: "+30% Response Velocity · PayHere Gateway",
  },
  {
    id: "intellect",
    year: "2025",
    period: "June 2024 – June 2025",
    role: "Intern – Full-Stack Web Developer",
    company: "Intellect Choice (Pvt) Ltd",
    iconType: "building",
    summary:
      "Improved operational efficiency by 30% by automating reporting, CRUD workflows, and notification services across education platforms.",
    bullets: [
      "Automated core workflows and email notification pipelines, boosting organizational efficiency by 30%.",
      "Built interactive analytics dashboards enabling real-time administrative decision-making.",
      "Maintained 99.9% data integrity during production database updates across high-traffic platforms.",
    ],
    tags: [
      "REACT.JS",
      "EXPRESS.JS",
      "TAILWIND CSS",
      "BOOTSTRAP",
      "MYSQL",
      "CRUD AUTOMATION",
    ],
    metricBadge: "+30% Operational Efficiency · 99.9% Integrity",
  },
  {
    id: "cardiff",
    year: "2024",
    period: "Graduated 2024",
    role: "BSc (Hons) Software Engineering",
    company: "Cardiff Metropolitan University",
    iconType: "education",
    summary:
      "Graduated with Second Class Honours (Division II) following Higher Diploma in Computing (2021–2023) with strong software architecture foundations.",
    bullets: [
      "Second Class Honours (Division II) in Software Engineering; HND in Computing & Software Engineering (2021–2023).",
      "Developed Samudra Distribution Management Platform and Web Hotel Reservation System with real-time room availability calendar.",
      "Completed certified Full Stack Web Development courses at University of Moratuwa & Laravel masterclass at eLearning.lk.",
    ],
    tags: [
      "SOFTWARE ARCHITECTURE",
      "DISTRIBUTED SYSTEMS",
      "DATABASE DESIGN",
      "REST APIS",
      "OOP & MVC",
    ],
    metricBadge: "BSc (Hons) 2nd Class (Div II) · Cardiff Met",
  },
];

export function Experience() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const horizonSeamRef = useRef<HTMLDivElement | null>(null);
  const horizonGlowRef = useRef<HTMLDivElement | null>(null);
  const bgLayerRef = useRef<HTMLDivElement | null>(null);
  const leftColRef = useRef<HTMLDivElement | null>(null);
  const rightColRef = useRef<HTMLDivElement | null>(null);
  const timelineLineRef = useRef<HTMLDivElement | null>(null);
  const metricsBarRef = useRef<HTMLDivElement | null>(null);
  const [expandedCardId, setExpandedCardId] = useState<string | null>("onimta");

  // Silky 60fps spring-smoothed entrance transition from Skills into Experience
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let rafId = 0;
    let target = 0;
    let current = 0;

    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
    const easeOutQuad = (t: number) => 1 - (1 - t) * (1 - t);
    const clamp01 = (v: number) => Math.min(Math.max(v, 0), 1);

    const applyVisuals = (p: number) => {
      const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
      const isTablet =
        typeof window !== "undefined" &&
        window.innerWidth >= 768 &&
        window.innerWidth < 1024;

      // 1. Dynamic Electric Cyan Horizon Seam on the boundary from Skills to Experience
      const seamP = easeOutCubic(clamp01(p * 1.6));
      if (horizonSeamRef.current) {
        horizonSeamRef.current.style.transform = `scaleX(${(0.08 + seamP * 0.92).toFixed(4)})`;
        horizonSeamRef.current.style.opacity = (0.2 + seamP * 0.8).toFixed(3);
      }
      if (horizonGlowRef.current) {
        horizonGlowRef.current.style.opacity = (seamP * 0.95).toFixed(3);
        horizonGlowRef.current.style.transform = `translate(-50%, 0) scale(${(0.6 + seamP * 0.4).toFixed(3)})`;
      }

      // 2. Cinematic 2K Background Depth Camera & Parallax (experience-bg-1.jpg)
      // Smooth vertical parallax with gentle, refined left alignment for subject
      const bgP = easeOutQuad(clamp01(p * 1.35));
      if (bgLayerRef.current) {
        const bgY = ((1 - bgP) * 14).toFixed(1);
        const bgX = isMobile ? -14 : isTablet ? -26 : -38;
        bgLayerRef.current.style.transform = `translate3d(${bgX}px, ${bgY}px, 0)`;
        bgLayerRef.current.style.opacity = (0.45 + bgP * 0.55).toFixed(3);
      }

      // 3. Left Column Entrance (EXPERIENCE BUILDS PERSPECTIVE + Narrative Quote)
      const leftP = easeOutCubic(clamp01((p - 0.06) / 0.65));
      if (leftColRef.current) {
        leftColRef.current.style.opacity = leftP.toFixed(3);
        if (isMobile) {
          leftColRef.current.style.transform = `translate3d(0, ${((1 - leftP) * 26).toFixed(1)}px, 0)`;
        } else {
          leftColRef.current.style.transform = `translate3d(${((1 - leftP) * -45).toFixed(1)}px, 0, 0)`;
        }
      }

      // 4. Right Column Entrance (Philosophy Quote & Milestone Cards)
      const rightP = easeOutCubic(clamp01((p - 0.12) / 0.68));
      if (rightColRef.current) {
        rightColRef.current.style.opacity = rightP.toFixed(3);
        if (isMobile) {
          rightColRef.current.style.transform = `translate3d(0, ${((1 - rightP) * 34).toFixed(1)}px, 0)`;
        } else {
          rightColRef.current.style.transform = `translate3d(${((1 - rightP) * 45).toFixed(1)}px, 0, 0)`;
        }
      }

      // 5. Vertical Cyber Timeline Line Draw-Down
      const lineP = easeOutQuad(clamp01((p - 0.18) / 0.75));
      if (timelineLineRef.current) {
        timelineLineRef.current.style.transform = `scaleY(${lineP.toFixed(3)})`;
        timelineLineRef.current.style.opacity = (0.3 + lineP * 0.7).toFixed(3);
      }

      // 6. Bottom Career Metrics Strip Entrance
      const metricsP = easeOutCubic(clamp01((p - 0.28) / 0.65));
      if (metricsBarRef.current) {
        metricsBarRef.current.style.opacity = metricsP.toFixed(3);
        metricsBarRef.current.style.transform = `translate3d(0, ${((1 - metricsP) * 20).toFixed(1)}px, 0)`;
      }
    };

    const computeTarget = () => {
      const rect = section.getBoundingClientRect();
      const vh = Math.max(window.innerHeight, 1);
      const isMobile = window.innerWidth < 768;

      if (isMobile) {
        // On mobile, trigger smoothly as Experience enters from bottom of screen
        const startY = vh * 0.96;
        const endY = vh * 0.25;
        target = clamp01((startY - rect.top) / (startY - endY));
      } else {
        // Desktop / tablet: full viewport transition
        target = clamp01((vh - rect.top) / (vh * 0.9));
      }
    };

    const tick = () => {
      const diff = target - current;
      if (Math.abs(diff) < 0.001) {
        current = target;
        applyVisuals(current);
        rafId = 0;
        return;
      }
      current += diff * 0.08;
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
  }, []);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative w-full overflow-hidden bg-[#010206] text-white pt-4 sm:pt-6 lg:pt-8 pb-12 sm:pb-16 px-3 sm:px-6 md:px-8 lg:px-10 xl:px-12 select-none min-h-187.5"
    >
      {/* ==================================================================== */}
      {/* Dynamic Animated Horizon Seam Bridge from Skills to Experience        */}
      {/* ==================================================================== */}
      <div
        ref={horizonSeamRef}
        aria-hidden="true"
        className="pointer-events-none absolute top-0 inset-x-0 h-0.5 bg-linear-to-r from-transparent via-sky-400 to-transparent shadow-[0_0_24px_rgba(56,189,248,0.85),0_0_48px_rgba(14,165,233,0.5)] origin-center will-change-transform z-30"
      />
      <div
        ref={horizonGlowRef}
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-150 h-20 bg-[radial-gradient(ellipse_at_top,rgba(56,189,248,0.32)_0%,rgba(14,165,233,0.12)_45%,transparent_75%)] origin-top will-change-transform z-20"
      />

      {/* Dedicated Section Top Horizon Fade — Anchored to section top to blend 100% seamlessly into pure #010206 */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-44 sm:h-56 md:h-72 bg-linear-to-b from-[#010206] from-28% via-[#010206]/85 via-62% to-transparent z-10"
      />

      {/* ==================================================================== */}
      {/* 1. Executive Cinematic 2K Background Image Layer                     */}
      {/* Reduced scale, left aligned, with multi-stage top & bottom blend     */}
      {/* ==================================================================== */}
      <div
        ref={bgLayerRef}
        className="absolute -top-14 sm:-top-18 md:-top-24 -bottom-24 md:-bottom-32 -left-5 sm:-left-8 md:-left-12 lg:-left-14 -right-3 sm:-right-5 md:-right-8 pointer-events-none select-none overflow-hidden z-0 will-change-transform"
      >
        {/* Proportional Scaled Subject Container - Refined scale, anchored left */}
        <div className="relative w-full h-full origin-left scale-[0.75] sm:scale-[0.72] lg:scale-[0.70]">
          <Image
            src="/experience-bg-1.jpg"
            alt="Thamalpath Sathimantha — Executive Perspective Background"
            fill
            priority
            sizes="100vw"
            className="object-cover object-top-left filter brightness-[0.92] contrast-[1.04]"
          />
        </div>

        {/* Left Edge Soft Feather: Ensures zero hard edge crop when aligned left */}
        <div
          aria-hidden="true"
          className="absolute inset-y-0 left-0 w-12 sm:w-20 bg-linear-to-r from-[#010206] to-transparent pointer-events-none z-1"
        />

        {/* Mobile Scrim (< sm): Soft ambient darkening so timeline content remains 100% readable on phones */}
        <div
          aria-hidden="true"
          className="sm:hidden absolute inset-0 bg-linear-to-b from-[#010206]/15 via-[#010206]/75 to-[#010206] via-22% to-55% pointer-events-none"
        />

        {/* Tablet & Desktop Scrim (>= sm): Smooth horizontal feathering - crystal clear on left for portrait, darkening right for timeline */}
        <div
          aria-hidden="true"
          className="hidden sm:block absolute inset-0 bg-linear-to-r from-transparent from-20% via-[#010206]/70 via-45% to-[#010206]/98 to-70% pointer-events-none"
        />

        {/* Atmospheric Cyan / Sapphire Radial Spotlight on Subject */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(circle_at_16%_32%,rgba(14,165,233,0.15)_0%,transparent_50%)] pointer-events-none"
        />

        {/* Top Multi-Stage Horizon Fade - Seamlessly melts top edge into pure #010206 background */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-44 sm:h-56 md:h-72 bg-linear-to-b from-[#010206] from-25% via-[#010206]/85 via-60% to-transparent pointer-events-none z-1"
        />

        {/* Bottom Multi-Stage Seamless Horizon Fade - Dissolves smoothly into pure #010206 */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-72 sm:h-96 md:h-120 bg-linear-to-t from-[#010206] from-25% via-[#010206]/85 via-60% to-transparent pointer-events-none z-1"
        />
      </div>

      {/* ==================================================================== */}
      {/* 2. Main Executive 2-Column Showcase Content                          */}
      {/* ==================================================================== */}
      <div className="relative z-10 w-full max-w-7xl xl:max-w-screen-2xl 2xl:max-w-[1760px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 lg:grid-cols-12 gap-6 md:gap-8 lg:gap-10 xl:gap-12 items-start">
          {/* ============================================================== */}
          {/* LEFT COLUMN: Clean Stacked Typography in Top Area              */}
          {/* Positioned higher above, inline in row with Core Philosophy    */}
          {/* ============================================================== */}
          <div
            ref={leftColRef}
            className="md:col-span-5 lg:col-span-6 xl:col-span-6 flex flex-col justify-between self-stretch will-change-transform pb-4 md:pb-2 text-left items-start pt-0 mt-0"
          >
            {/* The Exact Clean Title Stack (Top Area - Inline in One Row & Left-Aligned) */}
            <div className="flex flex-col text-left items-start pt-0 mt-0">
              <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.32em] text-sky-400 uppercase mb-1.5 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] leading-tight">
                PERSPECTIVE &amp; MASTERY
              </span>

              <h2 className="font-cinzel text-2xl sm:text-3xl md:text-3xl lg:text-4xl xl:text-[2.75rem] font-extrabold tracking-widest lg:tracking-[0.12em] leading-tight md:leading-[1.1] uppercase text-zinc-100 drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)] mt-0">
                <span className="inline-block whitespace-nowrap">
                  <span>EXPERIENCE</span>{" "}
                  <span className="relative inline-block font-cinzel font-black tracking-[0.12em] lg:tracking-[0.16em] text-transparent bg-clip-text bg-linear-to-r from-white via-sky-300 via-50% to-blue-400 drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]">
                    BUILDS
                  </span>
                </span>
                <br />
                <span className="inline-block">PERSPECTIVE</span>
              </h2>
            </div>

            {/* Reflection Narrative — Left Bottom Area before the Bottom Line */}
            <div className="hidden md:flex flex-col text-left items-start mt-auto pt-8 max-w-sm">
              <p className="font-montserrat text-xs sm:text-[13px] leading-relaxed text-zinc-300/90 drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]">
                Every project, collaboration, and challenge has shaped the
                person I am today. Grateful for the journey, excited for
                what&rsquo;s next.
              </p>

              {/* Author signature underline */}
              <div className="mt-4 flex items-center gap-2 text-sky-400/80 font-mono text-[9.5px] tracking-widest uppercase">
                <span className="w-6 h-px bg-sky-400/50" />
                <span>Thamalpath Sathimantha</span>
              </div>
            </div>
          </div>

          {/* ============================================================== */}
          {/* RIGHT COLUMN: Right Side Top Quote + Cyber Blue Timeline      */}
          {/* ============================================================== */}
          <div
            ref={rightColRef}
            className="md:col-span-7 lg:col-span-6 xl:col-span-6 flex flex-col will-change-transform pt-0 mt-0"
          >
            {/* Right Side Top Quote (Inline in row with Left Title) */}
            <div className="mb-5 sm:mb-7 flex flex-wrap items-baseline gap-x-2.5 gap-y-1 pl-6 sm:pl-16 md:pl-20 text-left pt-0 mt-0">
              <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.32em] text-sky-400 uppercase leading-tight shrink-0">
                CORE PHILOSOPHY
              </span>
              <span className="text-zinc-600 hidden sm:inline">•</span>
              <p className="font-playfair italic text-sm sm:text-base lg:text-lg text-zinc-200 drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)] mt-0 inline">
                &ldquo;Not just experiences, but lessons for a better me.&rdquo;
              </p>
            </div>

            {/* Vertical Cyber Blue Timeline */}
            <div className="relative pl-6 sm:pl-16 md:pl-20 flex flex-col gap-5 sm:gap-6">
              {/* Luminous Vertical Blue Line with Dynamic Scroll Draw-Down & Contrast Shadow */}
              <div
                ref={timelineLineRef}
                aria-hidden="true"
                className="pointer-events-none absolute left-2 sm:left-6 md:left-8 top-3 bottom-3 w-[1.5px] bg-linear-to-b from-sky-400/40 via-sky-400 to-blue-500/20 shadow-[0_0_14px_rgba(56,189,248,0.6),0_0_0_1.5px_rgba(2,6,23,0.75)] origin-top will-change-transform"
              />

              {EXPERIENCES.map((exp) => {
                const isExpanded = expandedCardId === exp.id;

                return (
                  <div key={exp.id} className="relative group">
                    {/* Glowing Circular Node on Timeline with High-Contrast Isolation */}
                    <div
                      aria-hidden="true"
                      className="absolute -left-6 sm:-left-16 md:-left-20 top-3 sm:top-4 -translate-x-1.75 sm:-translate-x-1.75 md:-translate-x-1.75 flex items-center justify-center z-20"
                    >
                      {/* Pulsing Outer Blue Glow Ring */}
                      <span className="absolute w-5 h-5 rounded-full bg-sky-400/25 group-hover:scale-150 transition-transform duration-500 animate-ping opacity-40" />
                      {/* Node Halo Ring with Dark Contrast Isolation */}
                      <span className="relative w-3.5 h-3.5 rounded-full border-2 border-sky-400 bg-[#020617] shadow-[0_0_10px_#38bdf8,0_0_0_2px_rgba(2,6,23,0.9)] flex items-center justify-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-sky-200 shadow-[0_0_4px_#38bdf8]" />
                      </span>
                    </div>

                    {/* Year Badge next to node — Modern Obsidian Glass HUD Pill */}
                    <div className="hidden sm:block absolute -left-16 md:-left-20 top-2 -translate-x-full text-right pr-2.5 select-none">
                      <div className="inline-flex items-center px-2 py-0.5 rounded-md bg-[#020612]/92 border border-sky-500/35 backdrop-blur-md shadow-[0_4px_16px_rgba(0,0,0,0.85),0_0_10px_rgba(14,165,233,0.25)] group-hover:border-sky-400 group-hover:shadow-[0_0_16px_rgba(56,189,248,0.5)] transition-all">
                        <span className="font-cinzel text-xs md:text-sm font-bold tracking-wider text-sky-300 drop-shadow-[0_0_6px_rgba(56,189,248,0.6)]">
                          {exp.year}
                        </span>
                      </div>
                    </div>

                    {/* Clean Minimalist Item (Without Heavy Card Box or Bulky Margins) */}
                    <div
                      onClick={() =>
                        setExpandedCardId(isExpanded ? null : exp.id)
                      }
                      className="relative rounded-xl border border-sky-500/20 hover:border-sky-400/45 bg-[#030918]/75 hover:bg-[#06142e]/90 backdrop-blur-md transition-all duration-300 cursor-pointer overflow-hidden p-3.5 sm:p-4.5 shadow-[0_10px_30px_rgba(0,0,0,0.6)]"
                    >
                      {/* Top Header Row — Full width, inline-flowing, spacious */}
                      <div className="flex items-start gap-2.5 sm:gap-3 mb-2">
                        {/* Milestone Category Icon */}
                        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-sky-500/10 border border-sky-400/30 flex items-center justify-center shrink-0 mt-0.5">
                          {renderMilestoneIcon(exp.iconType)}
                        </div>

                        {/* Main Title, Subtitle, and Meta Info */}
                        <div className="flex-1 min-w-0">
                          {/* Role Title with Year & Chevron on the right */}
                          <div className="flex items-start justify-between gap-2">
                            <h3 className="font-cinzel text-sm sm:text-base font-bold text-zinc-100 group-hover:text-white transition-colors leading-snug">
                              {exp.role}
                            </h3>
                            <div className="flex items-center gap-2 shrink-0 pt-0.5">
                              <span className="sm:hidden font-cinzel text-xs font-bold text-sky-300">
                                {exp.year}
                              </span>
                              <span
                                className={`text-sky-400/80 transition-transform duration-300 ${
                                  isExpanded ? "rotate-180" : ""
                                }`}
                              >
                                <IconChevronDown className="w-3.5 h-3.5" />
                              </span>
                            </div>
                          </div>

                          {/* Company Subtitle & Period Badge displayed INLINE */}
                          <div className="mt-1 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs">
                            <span className="font-montserrat font-semibold text-sky-300 drop-shadow-[0_0_8px_rgba(56,189,248,0.35)]">
                              {exp.company}
                            </span>
                            <span className="text-zinc-600 hidden sm:inline">
                              •
                            </span>
                            <span className="text-[9.5px] sm:text-[10px] font-mono text-zinc-400 inline-flex items-center gap-1 bg-[#02050e]/80 px-2 py-0.5 rounded border border-sky-500/15 whitespace-nowrap">
                              <IconCalendar className="w-2.5 h-2.5 text-sky-400" />
                              {exp.period}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Concise Summary */}
                      <p className="text-xs sm:text-[12.5px] leading-relaxed text-zinc-300/90 font-montserrat mt-1">
                        {exp.summary}
                      </p>

                      {/* Expandable Core Deliverables */}
                      {isExpanded && (
                        <div className="mt-3 pt-2.5 border-t border-sky-500/15 flex flex-col gap-1.5 animate-in fade-in duration-300">
                          <span className="text-[8.5px] font-mono tracking-widest text-sky-400 uppercase">
                            CORE DELIVERABLES:
                          </span>
                          <ul className="flex flex-col gap-1">
                            {exp.bullets.map((bullet, bIdx) => (
                              <li
                                key={bIdx}
                                className="flex items-start gap-2 text-xs text-zinc-300 leading-relaxed"
                              >
                                <span className="text-sky-400 shrink-0 mt-0.5">
                                  <IconCheckCircle className="w-3 h-3" />
                                </span>
                                <span>{bullet}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Bottom Tags & Metrics Row — Inline and Responsive */}
                      <div className="mt-2.5 pt-2 border-t border-sky-500/15 flex flex-wrap items-center justify-between gap-2">
                        <div className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-[8px] sm:text-[9px] font-mono font-semibold tracking-wider text-sky-300/75 uppercase">
                          {exp.tags.map((tag, tIdx) => (
                            <span
                              key={tIdx}
                              className="inline-flex items-center gap-1.5"
                            >
                              <span className="hover:text-sky-100 transition-colors">
                                {tag}
                              </span>
                              {tIdx < exp.tags.length - 1 && (
                                <span className="text-zinc-600">/</span>
                              )}
                            </span>
                          ))}
                        </div>

                        {!isExpanded && (
                          <span className="text-[8px] sm:text-[8.5px] font-mono text-sky-300 bg-blue-950/70 px-2 py-0.5 rounded border border-sky-500/30 whitespace-nowrap ml-auto">
                            {exp.metricBadge}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Mobile only: Reflection Narrative — Left Bottom Area before the Bottom Line */}
        <div className="md:hidden mt-4 mb-2 text-left max-w-sm px-1">
          <p className="font-montserrat text-xs leading-relaxed text-zinc-300/90 drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]">
            Every project, collaboration, and challenge has shaped the person I
            am today. Grateful for the journey, excited for what&rsquo;s next.
          </p>

          <div className="mt-2.5 flex items-center gap-2 text-sky-400/80 font-mono text-[9.5px] tracking-widest uppercase">
            <span className="w-6 h-px bg-sky-400/50" />
            <span>Thamalpath Sathimantha</span>
          </div>
        </div>
      </div>

      {/* ==================================================================== */}
      {/* 3. Executive Career Metrics (Bottom Area)                            */}
      {/* Derived from CV and LinkedIn: Years Journey, Projects, Technologies  */}
      {/* ==================================================================== */}
      <div
        ref={metricsBarRef}
        className="relative z-10 w-full max-w-7xl xl:max-w-screen-2xl 2xl:max-w-[1760px] mx-auto mt-4 sm:mt-6 pt-4 sm:pt-5 border-t border-sky-500/20 will-change-transform"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-5">
          {/* Stat 1: Years Journey */}
          <div className="relative rounded-xl border border-sky-500/20 bg-[#030918]/70 hover:bg-[#06142e]/85 backdrop-blur-md p-4 sm:p-5 flex flex-col items-start hover:border-sky-400/40 transition-all duration-300 group shadow-[0_8px_24px_rgba(0,0,0,0.5)]">
            <span className="font-cinzel text-3xl sm:text-4xl font-extrabold blue-text-gradient drop-shadow-[0_0_16px_rgba(56,189,248,0.45)]">
              2.5+
            </span>
            <span className="font-cinzel text-xs sm:text-sm font-bold text-zinc-100 tracking-wider uppercase mt-1">
              Years Journey
            </span>
            <span className="font-montserrat text-[10px] sm:text-[11px] text-zinc-400 mt-0.5">
              Software &amp; Web Engineering
            </span>
          </div>

          {/* Stat 2: Projects */}
          <div className="relative rounded-xl border border-sky-500/20 bg-[#030918]/70 hover:bg-[#06142e]/85 backdrop-blur-md p-4 sm:p-5 flex flex-col items-start hover:border-sky-400/40 transition-all duration-300 group shadow-[0_8px_24px_rgba(0,0,0,0.5)]">
            <span className="font-cinzel text-3xl sm:text-4xl font-extrabold blue-text-gradient drop-shadow-[0_0_16px_rgba(56,189,248,0.45)]">
              10+
            </span>
            <span className="font-cinzel text-xs sm:text-sm font-bold text-zinc-100 tracking-wider uppercase mt-1">
              Projects
            </span>
            <span className="font-montserrat text-[10px] sm:text-[11px] text-zinc-400 mt-0.5">
              Production &amp; Client Systems
            </span>
          </div>

          {/* Stat 3: Technologies */}
          <div className="relative rounded-xl border border-sky-500/20 bg-[#030918]/70 hover:bg-[#06142e]/85 backdrop-blur-md p-4 sm:p-5 flex flex-col items-start hover:border-sky-400/40 transition-all duration-300 group shadow-[0_8px_24px_rgba(0,0,0,0.5)]">
            <span className="font-cinzel text-3xl sm:text-4xl font-extrabold blue-text-gradient drop-shadow-[0_0_16px_rgba(56,189,248,0.45)]">
              5+
            </span>
            <span className="font-cinzel text-xs sm:text-sm font-bold text-zinc-100 tracking-wider uppercase mt-1">
              Technologies
            </span>
            <span className="font-montserrat text-[10px] sm:text-[11px] text-zinc-400 mt-0.5">
              React · Next.js · Laravel · Node · SQL
            </span>
          </div>

          {/* Stat 4: Enterprise Modules */}
          <div className="relative rounded-xl border border-sky-500/20 bg-[#030918]/70 hover:bg-[#06142e]/85 backdrop-blur-md p-4 sm:p-5 flex flex-col items-start hover:border-sky-400/40 transition-all duration-300 group shadow-[0_8px_24px_rgba(0,0,0,0.5)]">
            <span className="font-cinzel text-3xl sm:text-4xl font-extrabold blue-text-gradient drop-shadow-[0_0_16px_rgba(56,189,248,0.45)]">
              25+
            </span>
            <span className="font-cinzel text-xs sm:text-sm font-bold text-zinc-100 tracking-wider uppercase mt-1">
              Enterprise Modules
            </span>
            <span className="font-montserrat text-[10px] sm:text-[11px] text-zinc-400 mt-0.5">
              CRM · ERP · eCommerce &amp; POS
            </span>
          </div>
        </div>
      </div>

      {/* Atmospheric Bottom Horizon Bridge into Projects */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-16 sm:h-24 bg-linear-to-t from-[#010206] via-[#010206]/85 to-transparent z-20"
      />
    </section>
  );
}

export default Experience;
