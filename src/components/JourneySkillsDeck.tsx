"use client";

import React, { useEffect, useRef } from "react";
import { Journey } from "./Journey";
import { Skills } from "./Skills";

interface DeckMetrics {
  vh: number;
  c1Height: number;
  c2Height: number;
  delta1: number;
  delta2: number;
  transDist: number;
  totalScroll: number;
  totalHeight: number;
}

export function JourneySkillsDeck() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const slide1Ref = useRef<HTMLDivElement | null>(null);
  const slide2Ref = useRef<HTMLDivElement | null>(null);
  const content1Ref = useRef<HTMLDivElement | null>(null);
  const content2Ref = useRef<HTMLDivElement | null>(null);

  const metricsRef = useRef<DeckMetrics>({
    vh: 800,
    c1Height: 800,
    c2Height: 800,
    delta1: 0,
    delta2: 0,
    transDist: 960,
    totalScroll: 960,
    totalHeight: 1760,
  });

  const easeInOutCubic = (t: number) =>
    t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

  // 60fps spring-smoothed vertical content scroll + horizontal slideshow transition
  // Ensures if any section has content taller than viewport on any screen resolution,
  // user scrolls down to bottom of that section first before horizontal transition to next
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let rafId = 0;
    let targetY = 0;
    let currentY = 0;

    const measureMetrics = () => {
      const vh = Math.max(window.innerHeight, 1);
      const c1 = content1Ref.current ? content1Ref.current.offsetHeight : vh;
      const c2 = content2Ref.current ? content2Ref.current.offsetHeight : vh;

      // Excess vertical content that exceeds screen resolution on this device
      const delta1 = Math.max(0, c1 - vh);
      const delta2 = Math.max(0, c2 - vh);

      // Dedicated scroll distance for the horizontal slideshow transition
      const transRatio = window.innerWidth >= 1024 ? 1.25 : 1.0;
      const transDist = Math.max(Math.round(vh * transRatio), 450);

      const totalScroll = delta1 + transDist + delta2;
      const totalHeight = totalScroll + vh;

      metricsRef.current = {
        vh,
        c1Height: c1,
        c2Height: c2,
        delta1,
        delta2,
        transDist,
        totalScroll,
        totalHeight,
      };

      if (containerRef.current) {
        containerRef.current.style.height = `${totalHeight}px`;
      }

      return metricsRef.current;
    };

    const applyTransforms = (scrolledY: number) => {
      const s1 = slide1Ref.current;
      const s2 = slide2Ref.current;
      const c1 = content1Ref.current;
      const c2 = content2Ref.current;
      const m = metricsRef.current;

      const y = Math.min(Math.max(scrolledY, 0), m.totalScroll);

      // Vertical centering offset when content fits within viewport
      const center1 = m.delta1 === 0 ? Math.max(0, (m.vh - m.c1Height) / 2) : 0;
      const center2 = m.delta2 === 0 ? Math.max(0, (m.vh - m.c2Height) / 2) : 0;

      let y1 = center1;
      let transP = 0;
      let y2 = center2;

      if (m.totalScroll <= 0) {
        y1 = center1;
        transP = 0;
        y2 = center2;
      } else if (y <= m.delta1) {
        // Phase 1: Scroll through Section 1 (Journey) down to its bottom
        y1 = m.delta1 > 0 ? -y : center1;
        transP = 0;
        y2 = center2;
      } else if (y <= m.delta1 + m.transDist) {
        // Phase 2: Horizontal Slideshow Transition from Journey to Skills
        // Section 1 is locked at its bottom
        y1 = m.delta1 > 0 ? -m.delta1 : center1;
        // Section 2 starts at its top (or center)
        y2 = m.delta2 > 0 ? 0 : center2;

        const rawP = (y - m.delta1) / m.transDist;
        transP = easeInOutCubic(Math.min(Math.max(rawP, 0), 1));
      } else {
        // Phase 3: Scroll through Section 2 (Skills) down to its bottom
        y1 = m.delta1 > 0 ? -m.delta1 : center1;
        transP = 1;

        const yInSkills = y - (m.delta1 + m.transDist);
        y2 = m.delta2 > 0 ? -Math.min(yInSkills, m.delta2) : center2;
      }

      // 1. Vertical translation for internal section content scrolling
      if (c1) {
        c1.style.transform = `translate3d(0, ${y1.toFixed(1)}px, 0)`;
      }
      if (c2) {
        c2.style.transform = `translate3d(0, ${y2.toFixed(1)}px, 0)`;
      }

      // 2. Horizontal slideshow translation between sections
      if (s1) {
        s1.style.transform = `translate3d(${(-transP * 100).toFixed(2)}%, 0, 0) scale(${(1 - transP * 0.05).toFixed(4)})`;
        s1.style.opacity = (1 - transP * 0.65).toFixed(3);
        s1.style.pointerEvents = transP > 0.45 ? "none" : "auto";
      }

      if (s2) {
        s2.style.transform = `translate3d(${((1 - transP) * 100).toFixed(2)}%, 0, 0) scale(${(0.95 + transP * 0.05).toFixed(4)})`;
        s2.style.opacity = (0.35 + transP * 0.65).toFixed(3);
        s2.style.pointerEvents = transP < 0.55 ? "none" : "auto";
      }

      return { transP, activeSlide: transP >= 0.5 ? 1 : 0 };
    };

    const computeTarget = () => {
      const rect = container.getBoundingClientRect();
      const scrolled = Math.max(0, -rect.top);
      targetY = Math.min(Math.max(scrolled, 0), metricsRef.current.totalScroll);
    };

    const tick = () => {
      const diff = targetY - currentY;
      if (Math.abs(diff) < 0.4) {
        currentY = targetY;
        applyTransforms(currentY);
        rafId = 0;
        return;
      }

      // Responsive spring speed
      const speed = Math.abs(diff) > 250 ? 0.22 : 0.12;
      currentY += diff * speed;
      applyTransforms(currentY);
      rafId = requestAnimationFrame(tick);
    };

    const onScroll = () => {
      computeTarget();
      if (!rafId) {
        rafId = requestAnimationFrame(tick);
      }
    };

    const onResize = () => {
      measureMetrics();
      computeTarget();
      currentY = targetY;
      applyTransforms(currentY);
    };

    // Initial measurement & layout
    measureMetrics();
    computeTarget();
    currentY = targetY;
    applyTransforms(currentY);

    // Dynamic ResizeObserver to adapt immediately to any DOM size changes
    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(() => {
        onResize();
      });
      if (content1Ref.current) resizeObserver.observe(content1Ref.current);
      if (content2Ref.current) resizeObserver.observe(content2Ref.current);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      if (resizeObserver) resizeObserver.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      id="journey-skills-deck"
      className="relative w-full"
    >
      {/* Pinned Viewport Deck Stage (h-screen, overflow-hidden) */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#010206]">
        {/* Slide 1: Journey Timeline (Glides to the left on scroll once bottom is reached) */}
        <div
          ref={slide1Ref}
          className="absolute inset-0 w-full h-full overflow-hidden will-change-transform z-10"
          style={{ transform: "translate3d(0%, 0, 0)" }}
        >
          <div
            ref={content1Ref}
            className="w-full will-change-transform"
            style={{ transform: "translate3d(0, 0px, 0)" }}
          >
            <Journey />
          </div>
        </div>

        {/* Slide 2: Skills Arsenal (Glides in from the right, then scrolls down to its bottom) */}
        <div
          ref={slide2Ref}
          className="absolute inset-0 w-full h-full overflow-hidden will-change-transform z-20"
          style={{ transform: "translate3d(100%, 0, 0)" }}
        >
          <div
            ref={content2Ref}
            className="w-full will-change-transform"
            style={{ transform: "translate3d(0, 0px, 0)" }}
          >
            <Skills />
          </div>
        </div>

        {/* Atmospheric Bottom Horizon Bridge to Experience */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-linear-to-t from-[#010206] via-[#010206]/70 to-transparent z-30"
        />
      </div>
    </div>
  );
}
