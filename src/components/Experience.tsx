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

function IconChevronDown({ className = "w-3.5 h-3.5" }: { className?: string }) {
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

function renderMilestoneIcon(type: "rocket" | "layers" | "building" | "education") {
  switch (type) {
    case "rocket":
      return <IconRocket className="w-4 h-4 text-cyan-400" />;
    case "layers":
      return <IconLayers className="w-4 h-4 text-cyan-400" />;
    case "building":
      return <IconBuilding className="w-4 h-4 text-cyan-400" />;
    case "education":
      return <IconGraduationCap className="w-4 h-4 text-cyan-400" />;
    default:
      return <IconRocket className="w-4 h-4 text-cyan-400" />;
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
      // Reduced scale for proportionate, crisp framing across any resolution (0.86 -> 0.80)
      const bgP = easeOutQuad(clamp01(p * 1.35));
      if (bgLayerRef.current) {
        // Reduced scale: Starts at 0.86 on entry, gently settles at 0.80
        const bgScale = (0.86 - bgP * 0.06).toFixed(4);
        const bgY = ((1 - bgP) * 30).toFixed(1);
        bgLayerRef.current.style.transform = `translate3d(0, ${bgY}px, 0) scale(${bgScale})`;
        bgLayerRef.current.style.opacity = (0.35 + bgP * 0.65).toFixed(3);
      }

      // 3. Left Column Entrance (EXPERIENCE BUILDS PERSPECTIVE + Narrative Quote)
      const leftP = easeOutCubic(clamp01((p - 0.08) / 0.65));
      if (leftColRef.current) {
        leftColRef.current.style.opacity = leftP.toFixed(3);
        leftColRef.current.style.transform = `translate3d(${((1 - leftP) * -45).toFixed(1)}px, 0, 0)`;
      }

      // 4. Right Column Entrance (Philosophy Quote & Milestone Cards)
      const rightP = easeOutCubic(clamp01((p - 0.14) / 0.68));
      if (rightColRef.current) {
        rightColRef.current.style.opacity = rightP.toFixed(3);
        rightColRef.current.style.transform = `translate3d(${((1 - rightP) * 45).toFixed(1)}px, 0, 0)`;
      }

      // 5. Vertical Cyber Timeline Line Draw-Down
      const lineP = easeOutQuad(clamp01((p - 0.2) / 0.75));
      if (timelineLineRef.current) {
        timelineLineRef.current.style.transform = `scaleY(${lineP.toFixed(3)})`;
        timelineLineRef.current.style.opacity = (0.3 + lineP * 0.7).toFixed(3);
      }

      // 6. Bottom Career Metrics Strip Entrance
      const metricsP = easeOutCubic(clamp01((p - 0.32) / 0.65));
      if (metricsBarRef.current) {
        metricsBarRef.current.style.opacity = metricsP.toFixed(3);
        metricsBarRef.current.style.transform = `translate3d(0, ${((1 - metricsP) * 36).toFixed(1)}px, 0)`;
      }
    };

    const computeTarget = () => {
      const rect = section.getBoundingClientRect();
      const vh = Math.max(window.innerHeight, 1);
      // rect.top === vh means Experience is just entering viewport from below (p = 0)
      // rect.top === 0 means Experience is fully docked at top (p = 1)
      target = clamp01((vh - rect.top) / vh);
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
      className="relative w-full overflow-hidden bg-[#010206] text-white pt-6 sm:pt-8 lg:pt-10 pb-20 sm:pb-28 px-3 sm:px-6 md:px-8 lg:px-10 xl:px-12 select-none min-h-[750px]"
    >
      {/* ==================================================================== */}
      {/* Dynamic Animated Horizon Seam Bridge from Skills to Experience        */}
      {/* ==================================================================== */}
      <div
        ref={horizonSeamRef}
        aria-hidden="true"
        className="pointer-events-none absolute top-0 inset-x-0 h-[2px] bg-linear-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_24px_rgba(56,189,248,0.85),0_0_48px_rgba(14,165,233,0.5)] origin-center will-change-transform z-30"
      />
      <div
        ref={horizonGlowRef}
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-20 bg-[radial-gradient(ellipse_at_top,rgba(56,189,248,0.32)_0%,rgba(14,165,233,0.12)_45%,transparent_75%)] origin-top will-change-transform z-20"
      />

      {/* ==================================================================== */}
      {/* 1. Executive Cinematic 2K Background Image Layer                     */}
      {/* Positioned below top area so it NEVER covers or overlaps the face    */}
      {/* ==================================================================== */}
      <div
        ref={bgLayerRef}
        className="absolute top-36 sm:top-44 lg:top-52 inset-x-0 bottom-0 pointer-events-none select-none overflow-hidden z-0 will-change-transform origin-bottom lg:origin-[42%_bottom]"
      >
        <Image
          src="/experience-bg-1.jpg"
          alt="Thamalpath Sathimantha — Executive Perspective Background"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[35%_top] sm:object-[32%_top] lg:object-[48%_top] xl:object-[50%_top] filter brightness-[0.88] contrast-[1.04]"
        />

        {/* Perimeter radial feathering: ensures the reduced-scale image seamlessly blends into dark canvas */}
        <div
          aria-hidden="true"
          className="hidden lg:block absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,#010206_90%)] pointer-events-none"
        />

        {/* Mobile Scrim: Soft ambient darkening so timeline content remains 100% readable on mobile */}
        <div
          aria-hidden="true"
          className="lg:hidden absolute inset-0 bg-linear-to-b from-[#010206]/40 via-[#010206]/75 to-[#010206] pointer-events-none"
        />

        {/* Desktop Scrim: Smooth horizontal feathering - crystal clear on left for portrait, darkening right for timeline */}
        <div
          aria-hidden="true"
          className="hidden lg:block absolute inset-0 bg-linear-to-r from-transparent via-[#010206]/50 to-[#010206]/95 via-45% to-80% pointer-events-none"
        />

        {/* Atmospheric Cyan / Sapphire Radial Spotlight on Subject */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(circle_at_35%_35%,rgba(14,165,233,0.14)_0%,transparent_60%)] pointer-events-none"
        />

        {/* Top Edge Horizon Seam & Fade */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-24 sm:h-28 bg-linear-to-b from-[#010206] to-transparent pointer-events-none"
        />

        {/* Bottom Seam Fade into following section */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-28 sm:h-36 bg-linear-to-t from-[#010206] to-transparent pointer-events-none"
        />
      </div>

      {/* ==================================================================== */}
      {/* 2. Main Executive 2-Column Showcase Content                          */}
      {/* ==================================================================== */}
      <div className="relative z-10 w-full max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-14 items-start">
          
          {/* ============================================================== */}
          {/* LEFT COLUMN: Clean Stacked Typography in Top Area              */}
          {/* Positioned more above, inline with Core Philosophy, left-aligned*/}
          {/* ============================================================== */}
          <div
            ref={leftColRef}
            className="lg:col-span-5 flex flex-col will-change-transform lg:sticky lg:top-14 pb-6 lg:pb-0 text-left items-start"
          >
            {/* The Exact Clean Title Stack (Top Area - Inline & Left-Aligned) */}
            <div className="flex flex-col text-left items-start">
              <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.32em] text-cyan-400 uppercase mb-1.5 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                PERSPECTIVE &amp; MASTERY
              </span>

              <h2 className="font-cinzel text-3xl sm:text-4xl xl:text-5xl font-extrabold tracking-[0.14em] leading-[1.08] uppercase text-zinc-100 drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]">
                EXPERIENCE
                <br />
                <span className="relative inline-block font-cinzel font-black tracking-[0.18em] text-transparent bg-clip-text bg-linear-to-r from-white via-cyan-300 via-50% to-sky-300 drop-shadow-[0_0_24px_rgba(56,189,248,0.95)] drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]">
                  BUILDS
                </span>
                <br />
                PERSPECTIVE
              </h2>

              {/* Reflection Narrative */}
              <p className="font-montserrat text-xs sm:text-[13px] leading-relaxed text-zinc-300/90 mt-3 max-w-sm drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)] text-left">
                Every project, collaboration, and challenge has shaped the person I am today. Grateful for the journey, excited for what&rsquo;s next.
              </p>

              {/* Author signature underline */}
              <div className="mt-4 flex items-center gap-2 text-cyan-400/80 font-mono text-[9.5px] tracking-widest uppercase">
                <span className="w-6 h-px bg-cyan-400/50" />
                <span>Thamalpath Sathimantha</span>
              </div>
            </div>
          </div>

          {/* ============================================================== */}
          {/* RIGHT COLUMN: Right Side Top Quote + Cyber Cyan Timeline      */}
          {/* ============================================================== */}
          <div ref={rightColRef} className="lg:col-span-7 flex flex-col will-change-transform">
            
            {/* Right Side Top Quote (Inline with Left Title) */}
            <div className="mb-6 sm:mb-8 flex flex-col pl-6 sm:pl-16 md:pl-20 text-left">
              <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.32em] text-cyan-400 uppercase mb-1.5">
                CORE PHILOSOPHY
              </span>
              <p className="font-playfair italic text-base sm:text-lg lg:text-xl text-zinc-200 drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]">
                &ldquo;Not just experiences, but lessons for a better me.&rdquo;
              </p>
            </div>

            {/* Vertical Cyber Cyan Timeline */}
            <div className="relative pl-6 sm:pl-16 md:pl-20 flex flex-col gap-5 sm:gap-6">
              
              {/* Luminous Vertical Cyan Line with Dynamic Scroll Draw-Down */}
              <div
                ref={timelineLineRef}
                aria-hidden="true"
                className="pointer-events-none absolute left-2 sm:left-6 md:left-8 top-3 bottom-3 w-[1.5px] bg-linear-to-b from-cyan-400/40 via-cyan-400 to-cyan-500/20 shadow-[0_0_14px_rgba(56,189,248,0.6)] origin-top will-change-transform"
              />

              {EXPERIENCES.map((exp) => {
                const isExpanded = expandedCardId === exp.id;

                return (
                  <div key={exp.id} className="relative group">
                    {/* Glowing Circular Node on Timeline */}
                    <div
                      aria-hidden="true"
                      className="absolute -left-6 sm:-left-16 md:-left-20 top-3 sm:top-4 -translate-x-[7px] sm:-translate-x-[7px] md:-translate-x-[7px] flex items-center justify-center z-20"
                    >
                      {/* Pulsing Outer Cyan Glow Ring */}
                      <span className="absolute w-5 h-5 rounded-full bg-cyan-400/20 group-hover:scale-150 transition-transform duration-500 animate-ping opacity-35" />
                      {/* Node Halo Ring */}
                      <span className="relative w-3.5 h-3.5 rounded-full border-2 border-cyan-400 bg-[#020617] shadow-[0_0_12px_#38bdf8] flex items-center justify-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-200" />
                      </span>
                    </div>

                    {/* Year Badge next to node */}
                    <div className="hidden sm:block absolute -left-16 md:-left-20 top-2.5 -translate-x-full text-right pr-3 select-none">
                      <span className="font-cinzel text-base md:text-lg font-bold text-cyan-300 drop-shadow-[0_0_10px_rgba(56,189,248,0.55)]">
                        {exp.year}
                      </span>
                    </div>

                    {/* Clean Minimalist Item (Without Heavy Card Box or Bulky Margins) */}
                    <div
                      onClick={() => setExpandedCardId(isExpanded ? null : exp.id)}
                      className="relative rounded-xl border border-cyan-500/20 hover:border-cyan-400/45 bg-[#030918]/75 hover:bg-[#06142e]/90 backdrop-blur-md transition-all duration-300 cursor-pointer overflow-hidden p-3.5 sm:p-4.5 shadow-[0_10px_30px_rgba(0,0,0,0.6)]"
                    >
                      {/* Top Header Row */}
                      <div className="flex items-start justify-between gap-3 mb-1.5">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-400/30 flex items-center justify-center shrink-0">
                            {renderMilestoneIcon(exp.iconType)}
                          </div>

                          <div className="flex flex-col">
                            <h3 className="font-cinzel text-sm sm:text-base font-bold text-zinc-100 group-hover:text-white transition-colors leading-tight">
                              {exp.role}
                            </h3>
                            <span className="font-montserrat text-xs font-semibold text-cyan-300 drop-shadow-[0_0_8px_rgba(56,189,248,0.35)] mt-0.5">
                              {exp.company}
                            </span>
                          </div>
                        </div>

                        {/* Period & Collapse Arrow */}
                        <div className="flex flex-col items-end gap-1 shrink-0">
                          <span className="sm:hidden font-cinzel text-xs font-bold text-cyan-300">
                            {exp.year}
                          </span>
                          <span className="text-[9px] sm:text-[10px] font-mono text-zinc-400 flex items-center gap-1 bg-[#02050e]/80 px-2 py-0.5 rounded border border-cyan-500/15">
                            <IconCalendar className="w-2.5 h-2.5 text-cyan-400" />
                            {exp.period}
                          </span>
                          <span
                            className={`inline-block text-cyan-400/80 transition-transform duration-300 mt-0.5 ${
                              isExpanded ? "rotate-180" : ""
                            }`}
                          >
                            <IconChevronDown className="w-3.5 h-3.5" />
                          </span>
                        </div>
                      </div>

                      {/* Concise Summary */}
                      <p className="text-xs sm:text-[12.5px] leading-relaxed text-zinc-300/90 font-montserrat mt-1">
                        {exp.summary}
                      </p>

                      {/* Expandable Core Deliverables */}
                      {isExpanded && (
                        <div className="mt-3 pt-2.5 border-t border-cyan-500/15 flex flex-col gap-1.5 animate-in fade-in duration-300">
                          <span className="text-[8.5px] font-mono tracking-widest text-cyan-400 uppercase">
                            CORE DELIVERABLES:
                          </span>
                          <ul className="flex flex-col gap-1">
                            {exp.bullets.map((bullet, bIdx) => (
                              <li
                                key={bIdx}
                                className="flex items-start gap-2 text-xs text-zinc-300 leading-relaxed"
                              >
                                <span className="text-cyan-400 shrink-0 mt-0.5">
                                  <IconCheckCircle className="w-3 h-3" />
                                </span>
                                <span>{bullet}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Bottom Tags Row */}
                      <div className="mt-2.5 pt-2 border-t border-cyan-500/15 flex flex-wrap items-center justify-between gap-1.5">
                        <div className="flex flex-wrap items-center gap-1 text-[8px] sm:text-[9px] font-mono font-semibold tracking-wider text-cyan-300/75 uppercase">
                          {exp.tags.map((tag, tIdx) => (
                            <span key={tIdx} className="flex items-center gap-1">
                              <span className="hover:text-cyan-100 transition-colors">
                                {tag}
                              </span>
                              {tIdx < exp.tags.length - 1 && (
                                <span className="text-zinc-600">/</span>
                              )}
                            </span>
                          ))}
                        </div>

                        {!isExpanded && (
                          <span className="text-[8px] sm:text-[8.5px] font-mono text-cyan-300 bg-cyan-950/70 px-1.5 py-0.5 rounded border border-cyan-500/30">
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
      </div>

      {/* ==================================================================== */}
      {/* 3. Executive Career Metrics (Bottom Area)                            */}
      {/* Derived from CV and LinkedIn: Years Journey, Projects, Technologies  */}
      {/* ==================================================================== */}
      <div
        ref={metricsBarRef}
        className="relative z-10 w-full max-w-7xl mx-auto mt-14 sm:mt-18 pt-8 sm:pt-10 border-t border-cyan-500/20 will-change-transform"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-5">
          {/* Stat 1: Years Journey */}
          <div className="relative rounded-xl border border-cyan-500/20 bg-[#030918]/70 hover:bg-[#06142e]/85 backdrop-blur-md p-4 sm:p-5 flex flex-col items-start hover:border-cyan-400/40 transition-all duration-300 group shadow-[0_8px_24px_rgba(0,0,0,0.5)]">
            <span className="font-cinzel text-3xl sm:text-4xl font-extrabold cyan-text-gradient drop-shadow-[0_0_16px_rgba(56,189,248,0.45)]">
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
          <div className="relative rounded-xl border border-cyan-500/20 bg-[#030918]/70 hover:bg-[#06142e]/85 backdrop-blur-md p-4 sm:p-5 flex flex-col items-start hover:border-cyan-400/40 transition-all duration-300 group shadow-[0_8px_24px_rgba(0,0,0,0.5)]">
            <span className="font-cinzel text-3xl sm:text-4xl font-extrabold cyan-text-gradient drop-shadow-[0_0_16px_rgba(56,189,248,0.45)]">
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
          <div className="relative rounded-xl border border-cyan-500/20 bg-[#030918]/70 hover:bg-[#06142e]/85 backdrop-blur-md p-4 sm:p-5 flex flex-col items-start hover:border-cyan-400/40 transition-all duration-300 group shadow-[0_8px_24px_rgba(0,0,0,0.5)]">
            <span className="font-cinzel text-3xl sm:text-4xl font-extrabold cyan-text-gradient drop-shadow-[0_0_16px_rgba(56,189,248,0.45)]">
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
          <div className="relative rounded-xl border border-cyan-500/20 bg-[#030918]/70 hover:bg-[#06142e]/85 backdrop-blur-md p-4 sm:p-5 flex flex-col items-start hover:border-cyan-400/40 transition-all duration-300 group shadow-[0_8px_24px_rgba(0,0,0,0.5)]">
            <span className="font-cinzel text-3xl sm:text-4xl font-extrabold cyan-text-gradient drop-shadow-[0_0_16px_rgba(56,189,248,0.45)]">
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
    </section>
  );
}

export default Experience;
