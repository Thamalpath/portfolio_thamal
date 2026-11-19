"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { Hero } from "@/components/Hero";
import { Journey } from "@/components/Journey";
import { PageLoader } from "@/components/PageLoader";

export function PortfolioShell() {
  const [showPortfolio, setShowPortfolio] = useState<boolean>(false);
  const [loaderDone, setLoaderDone] = useState<boolean>(false);
  const heroLayerRef = useRef<HTMLDivElement | null>(null);

  const handleRevealStart = useCallback(() => {
    setShowPortfolio(true);
  }, []);

  const handleComplete = useCallback(() => {
    setLoaderDone(true);
  }, []);

  // 60fps scroll-scrubbed depth recession on Hero as Journey glides over it
  useEffect(() => {
    if (!showPortfolio) return;

    let rafId = 0;

    const updateParallax = () => {
      rafId = 0;
      const el = heroLayerRef.current;
      if (!el) return;

      const vh = Math.max(window.innerHeight, 1);
      const raw = Math.min(Math.max(window.scrollY / vh, 0), 1);
      // Smoothstep easing for silky acceleration/deceleration
      const p = raw * raw * (3 - 2 * raw);

      el.style.transform = `scale(${(1 - p * 0.055).toFixed(4)}) translate3d(0, ${(-p * 32).toFixed(1)}px, 0)`;
      el.style.opacity = (1 - p * 0.72).toFixed(3);
      el.style.filter = p > 0.01 ? `blur(${(p * 3.5).toFixed(2)}px)` : "none";
    };

    const onScroll = () => {
      if (!rafId) {
        rafId = requestAnimationFrame(updateParallax);
      }
    };

    updateParallax();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [showPortfolio]);

  return (
    <main className="relative min-h-screen bg-[#010206] text-zinc-100 selection:bg-cyan-500 selection:text-black overflow-x-clip">
      {!loaderDone && (
        <PageLoader
          onRevealStart={handleRevealStart}
          onComplete={handleComplete}
        />
      )}

      {showPortfolio && (
        <>
          {/* Sticky Hero Layer that smoothly recedes into depth as user scrolls down */}
          <div
            ref={heroLayerRef}
            className="sticky top-0 z-0 will-change-transform origin-center"
          >
            <Hero />
          </div>

          {/* Journey Layer gliding smoothly over Hero with an atmospheric obsidian-cyan horizon bridge */}
          <div className="relative z-10 bg-[#010206] shadow-[0_-40px_90px_rgba(1,2,6,0.98)]">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-28 inset-x-0 h-28 bg-linear-to-b from-transparent via-[#010206]/80 to-[#010206]"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-cyan-400/55 to-transparent shadow-[0_0_20px_rgba(56,189,248,0.5)] z-30"
            />
            <Journey />
          </div>
        </>
      )}
    </main>
  );
}
