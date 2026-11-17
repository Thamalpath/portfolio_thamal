"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Volume2, VolumeX } from "lucide-react";

export function Hero() {
  const [activeNav, setActiveNav] = useState("HOME");
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [introPhase, setIntroPhase] = useState<"walking" | "ignited" | "ready">(
    "walking",
  );

  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const characterRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const oscillatorsRef = useRef<OscillatorNode[]>([]);

  // Page Load Entrance Sequence:
  // 1. Person walks forward into view (0s - 1.1s)
  // 2. Cinematic volumetric flame & smoke nebula awakens (1.1s - 2.0s)
  // 3. UI elements settle smoothly (2.0s+)
  useEffect(() => {
    const timer1 = setTimeout(() => {
      setIntroPhase("ignited");
    }, 1000);

    const timer2 = setTimeout(() => {
      setIntroPhase("ready");
    }, 2000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  // Smooth 3D mouse parallax using requestAnimationFrame
  const mouseCoords = useRef({
    targetX: 0,
    targetY: 0,
    currentX: 0,
    currentY: 0,
  });
  useEffect(() => {
    let animId: number;
    const updateParallax = () => {
      const ease = 0.08;
      const { targetX, targetY } = mouseCoords.current;
      mouseCoords.current.currentX +=
        (targetX - mouseCoords.current.currentX) * ease;
      mouseCoords.current.currentY +=
        (targetY - mouseCoords.current.currentY) * ease;

      const curX = mouseCoords.current.currentX;
      const curY = mouseCoords.current.currentY;

      if (characterRef.current) {
        characterRef.current.style.transform = `perspective(1000px) rotateY(${curX * 6}deg) rotateX(${curY * -4}deg) translate3d(${curX * 14}px, ${curY * 8}px, 0)`;
      }
      if (titleRef.current) {
        titleRef.current.style.transform = `translate3d(${curX * -8}px, ${curY * -5}px, 0)`;
      }

      animId = requestAnimationFrame(updateParallax);
    };

    animId = requestAnimationFrame(updateParallax);
    return () => {
      cancelAnimationFrame(animId);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseCoords.current.targetX = (e.clientX - rect.left) / rect.width - 0.5;
    mouseCoords.current.targetY = (e.clientY - rect.top) / rect.height - 0.5;
  };

  const handleMouseLeave = () => {
    mouseCoords.current.targetX = 0;
    mouseCoords.current.targetY = 0;
  };

  // Web Audio API ambient drone synthesis in deep cyber sapphire / cyan harmonies
  const toggleSound = () => {
    if (!soundEnabled) {
      try {
        const AudioContextClass =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext })
            .webkitAudioContext;
        const ctx = new AudioContextClass();
        audioCtxRef.current = ctx;

        if (ctx.state === "suspended") {
          ctx.resume();
        }

        const masterGain = ctx.createGain();
        masterGain.gain.setValueAtTime(0.005, ctx.currentTime);
        masterGain.gain.exponentialRampToValueAtTime(
          0.18,
          ctx.currentTime + 1.8,
        );
        masterGain.connect(ctx.destination);
        gainNodeRef.current = masterGain;

        const freqs = [65.41, 130.81, 196.0, 261.63, 392.0];
        const oscs: OscillatorNode[] = [];

        freqs.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const oscGain = ctx.createGain();
          const filter = ctx.createBiquadFilter();

          osc.type = idx % 2 === 0 ? "sine" : "triangle";
          osc.frequency.setValueAtTime(freq, ctx.currentTime);
          osc.detune.setValueAtTime((idx - 2) * 3, ctx.currentTime);

          filter.type = "lowpass";
          filter.frequency.setValueAtTime(320 + idx * 70, ctx.currentTime);

          oscGain.gain.setValueAtTime(0.05 / (idx + 1), ctx.currentTime);

          osc.connect(filter);
          filter.connect(oscGain);
          oscGain.connect(masterGain);

          osc.start();
          oscs.push(osc);
        });

        oscillatorsRef.current = oscs;
        setSoundEnabled(true);
      } catch (e) {
        console.error("Audio error:", e);
      }
    } else {
      if (gainNodeRef.current && audioCtxRef.current) {
        gainNodeRef.current.gain.linearRampToValueAtTime(
          0.001,
          audioCtxRef.current.currentTime + 0.6,
        );
        setTimeout(() => {
          oscillatorsRef.current.forEach((osc) => {
            try {
              osc.stop();
            } catch {}
          });
          oscillatorsRef.current = [];
          if (audioCtxRef.current) {
            audioCtxRef.current.close().catch(() => {});
            audioCtxRef.current = null;
          }
        }, 700);
      }
      setSoundEnabled(false);
    }
  };

  useEffect(() => {
    return () => {
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  // =========================================================================
  // CINEMATIC VOLUMETRIC SMOKE & ROLLING FLAME ATMOSPHERE (Matching Image 1)
  // Professional, film-grade visual atmosphere:
  // 1. Soft Volumetric Rolling Smoke Mist billowing along the ground horizon
  // 2. Organic Multi-Layered Flame Tongues licking through the smoke
  // 3. Ambient Volumetric Heat Haze & Bloom
  // 4. Hot Fiery Embers & Ash Sparks drifting upward into the night
  // =========================================================================
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = 0;
    let height = 0;

    const resize = () => {
      if (!canvas || !canvas.parentElement) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = canvas.parentElement.clientWidth;
      height = canvas.parentElement.clientHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

    // 1. Volumetric Smoke Clusters (Billowing rolling smoke clouds along horizon)
    interface SmokeCloud {
      x: number;
      y: number;
      baseX: number;
      baseY: number;
      radius: number;
      vx: number;
      vy: number;
      alpha: number;
      maxAlpha: number;
      pulseSpeed: number;
      pulsePhase: number;
      cyanHue: number;
    }

    const cloudCount = 22;
    const clouds: SmokeCloud[] = Array.from({ length: cloudCount }, () => {
      const baseX = Math.random() * width;
      const baseY = height * 0.68 + (Math.random() - 0.5) * (height * 0.14);
      return {
        x: baseX,
        y: baseY,
        baseX,
        baseY,
        radius: Math.random() * 160 + 120,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.15,
        alpha: Math.random() * 0.12 + 0.06,
        maxAlpha: Math.random() * 0.15 + 0.08,
        pulseSpeed: Math.random() * 0.015 + 0.008,
        pulsePhase: Math.random() * Math.PI * 2,
        cyanHue: Math.random() > 0.4 ? 195 : 210,
      };
    });

    // 2. Rising Hot Ash & Fire Embers
    interface Ember {
      x: number;
      y: number;
      vy: number;
      vx: number;
      size: number;
      alpha: number;
      maxLife: number;
      life: number;
      wobbleSpeed: number;
      wobbleAmp: number;
    }

    const emberCount = 36;
    const embers: Ember[] = Array.from({ length: emberCount }, () => ({
      x: Math.random() * width,
      y: height * 0.68 + Math.random() * (height * 0.28),
      vy: -(Math.random() * 1.2 + 0.5),
      vx: (Math.random() - 0.5) * 0.4,
      size: Math.random() * 2.2 + 0.8,
      alpha: Math.random() * 0.7 + 0.3,
      maxLife: Math.random() * 120 + 80,
      life: Math.random() * 100,
      wobbleSpeed: Math.random() * 0.03 + 0.015,
      wobbleAmp: Math.random() * 0.6 + 0.3,
    }));

    let time = 0;

    const render = () => {
      time += 0.012;
      ctx.clearRect(0, 0, width, height);

      const horizonY = height * 0.69;
      const centerOffsetX = mouseCoords.current.currentX * (width * 0.05);

      // 1. Deep Cinematic Obsidian Vignette
      const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
      bgGrad.addColorStop(0, "#010206");
      bgGrad.addColorStop(0.48, "#020714");
      bgGrad.addColorStop(0.69, "#051635");
      bgGrad.addColorStop(0.84, "#020716");
      bgGrad.addColorStop(1, "#010206");
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // 2. Wide Volumetric Atmospheric Heat Bloom (Breathes gently behind horizon)
      const breathe = Math.sin(time * 1.8) * 0.05;
      const heatBloom = ctx.createRadialGradient(
        width * 0.5 + centerOffsetX,
        horizonY - 10,
        15,
        width * 0.5 + centerOffsetX,
        horizonY - 10,
        width * 0.52,
      );
      heatBloom.addColorStop(0, `rgba(56, 189, 248, ${0.34 + breathe})`);
      heatBloom.addColorStop(
        0.35,
        `rgba(14, 116, 144, ${0.2 + breathe * 0.5})`,
      );
      heatBloom.addColorStop(0.7, "rgba(3, 105, 161, 0.06)");
      heatBloom.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = heatBloom;
      ctx.fillRect(0, horizonY - 180, width, 320);

      // Switch to luminous blend mode for realistic light diffusion
      ctx.globalCompositeOperation = "screen";

      // 3. Volumetric Rolling Smoke Clouds (Soft billowy dry-ice smoke like concert/movie stage)
      clouds.forEach((c) => {
        c.x += c.vx;
        c.y += c.vy;
        c.pulsePhase += c.pulseSpeed;

        // Wrap around seamlessly
        if (c.x - c.radius > width) c.x = -c.radius;
        if (c.x + c.radius < 0) c.x = width + c.radius;
        if (c.y > horizonY + 60) c.vy = -Math.abs(c.vy);
        if (c.y < horizonY - 80) c.vy = Math.abs(c.vy);

        const currentAlpha =
          c.alpha + Math.sin(c.pulsePhase) * (c.maxAlpha - c.alpha) * 0.5;

        const smokeGrad = ctx.createRadialGradient(
          c.x,
          c.y,
          c.radius * 0.08,
          c.x,
          c.y,
          c.radius,
        );
        smokeGrad.addColorStop(
          0,
          `hsla(${c.cyanHue}, 90%, 65%, ${currentAlpha * 0.9})`,
        );
        smokeGrad.addColorStop(
          0.4,
          `hsla(${c.cyanHue}, 85%, 45%, ${currentAlpha * 0.5})`,
        );
        smokeGrad.addColorStop(
          0.75,
          `hsla(${c.cyanHue + 15}, 80%, 25%, ${currentAlpha * 0.18})`,
        );
        smokeGrad.addColorStop(1, "rgba(0, 0, 0, 0)");

        ctx.fillStyle = smokeGrad;
        ctx.beginPath();
        ctx.arc(c.x, c.y, c.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // 4. Photorealistic Multi-Layered Flame Tongues Licking Through the Mist
      const segments = 55;
      const step = width / segments;

      // Layer A: Deep Sapphire Flame Base
      ctx.beginPath();
      ctx.moveTo(0, horizonY + 22);
      for (let i = 0; i <= segments; i++) {
        const x = i * step;
        const wave =
          Math.sin(x * 0.006 + time * 2.2) * 28 +
          Math.sin(x * 0.015 - time * 3.1) * 16 +
          Math.cos(x * 0.03 + time * 4.2) * 10;
        ctx.lineTo(x, horizonY - 14 - wave);
      }
      ctx.lineTo(width, horizonY + 22);
      ctx.closePath();

      const flameGradA = ctx.createLinearGradient(
        0,
        horizonY - 60,
        0,
        horizonY + 22,
      );
      flameGradA.addColorStop(0, "rgba(14, 165, 233, 0)");
      flameGradA.addColorStop(0.45, "rgba(2, 132, 199, 0.35)");
      flameGradA.addColorStop(1, "rgba(30, 64, 175, 0.7)");
      ctx.fillStyle = flameGradA;
      ctx.fill();

      // Layer B: Vibrant Electric Cyan Flame Body
      ctx.beginPath();
      ctx.moveTo(0, horizonY + 16);
      for (let i = 0; i <= segments; i++) {
        const x = i * step;
        const wave =
          Math.sin(x * 0.009 - time * 2.8) * 34 +
          Math.sin(x * 0.022 + time * 3.8) * 18 +
          Math.cos(x * 0.045 - time * 5.1) * 11;
        ctx.lineTo(x, horizonY - 10 - wave);
      }
      ctx.lineTo(width, horizonY + 16);
      ctx.closePath();

      const flameGradB = ctx.createLinearGradient(
        0,
        horizonY - 75,
        0,
        horizonY + 16,
      );
      flameGradB.addColorStop(0, "rgba(224, 242, 254, 0)");
      flameGradB.addColorStop(0.35, "rgba(56, 189, 248, 0.45)");
      flameGradB.addColorStop(0.85, "rgba(14, 165, 233, 0.75)");
      flameGradB.addColorStop(1, "rgba(3, 105, 161, 0.85)");
      ctx.fillStyle = flameGradB;
      ctx.fill();

      // Layer C: Radiant White-Hot Licking Flame Crests
      ctx.beginPath();
      ctx.moveTo(width * 0.12, horizonY + 10);
      const coreSegments = 40;
      const coreStep = (width * 0.76) / coreSegments;
      for (let i = 0; i <= coreSegments; i++) {
        const x = width * 0.12 + i * coreStep;
        const wave =
          Math.sin(x * 0.016 + time * 3.6) * 22 +
          Math.sin(x * 0.038 - time * 4.9) * 14;
        ctx.lineTo(x, horizonY - 4 - wave);
      }
      ctx.lineTo(width * 0.88, horizonY + 10);
      ctx.closePath();

      const flameGradC = ctx.createLinearGradient(
        0,
        horizonY - 45,
        0,
        horizonY + 10,
      );
      flameGradC.addColorStop(0, "rgba(255, 255, 255, 0)");
      flameGradC.addColorStop(0.35, "rgba(224, 242, 254, 0.55)");
      flameGradC.addColorStop(1, "rgba(56, 189, 248, 0.85)");
      ctx.fillStyle = flameGradC;
      ctx.fill();

      // 5. Rising Hot Fire Embers & Ash Sparks
      for (let i = 0; i < embers.length; i++) {
        const e = embers[i];
        e.life++;
        e.y += e.vy;
        e.x += e.vx + Math.sin(time * 2 + e.y * e.wobbleSpeed) * e.wobbleAmp;

        if (e.y < horizonY - height * 0.45 || e.life >= e.maxLife) {
          e.y = horizonY + Math.random() * 30;
          e.x = width * 0.1 + Math.random() * (width * 0.8);
          e.life = 0;
        }

        const lifeProgress = e.life / e.maxLife;
        const currentAlpha = Math.sin(lifeProgress * Math.PI) * e.alpha;

        // Soft glowing spark
        ctx.beginPath();
        ctx.arc(e.x, e.y, e.size * 1.8, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(56, 189, 248, ${currentAlpha * 0.35})`;
        ctx.fill();

        // Hot bright core
        ctx.beginPath();
        ctx.arc(e.x, e.y, e.size * 0.8, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(240, 249, 255, ${currentAlpha * 0.95})`;
        ctx.fill();
      }

      ctx.globalCompositeOperation = "source-over";

      // 6. Wet Reflective Asphalt Floor Specular Mirroring
      const floorGrad = ctx.createLinearGradient(0, horizonY, 0, height);
      floorGrad.addColorStop(0, "rgba(2, 6, 18, 0.82)");
      floorGrad.addColorStop(0.35, "rgba(1, 4, 14, 0.92)");
      floorGrad.addColorStop(1, "#010206");
      ctx.fillStyle = floorGrad;
      ctx.fillRect(0, horizonY, width, height - horizonY);

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  const navItems = [
    { label: "HOME", href: "#home" },
    { label: "JOURNEY", href: "#about" },
    { label: "SKILLS", href: "#skills" },
    { label: "EXPERIENCE", href: "#experience" },
    { label: "PROJECTS", href: "#projects" },
    { label: "CERTIFICATIONS", href: "#skills" },
    { label: "CONTACT", href: "#contact" },
  ];

  const isIgnited = introPhase !== "walking";

  return (
    <section
      id="home"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-dvh min-h-145 max-h-300 overflow-hidden bg-[#010206] text-white flex flex-col justify-between select-none"
    >
      {/* 1. Volumetric Smoke & Flame Canvas Background (Surges in on Page Load) */}
      <canvas
        ref={canvasRef}
        className={`absolute inset-0 w-full h-full pointer-events-none z-0 transition-opacity duration-1000 ease-out ${
          isIgnited ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* 2. Top Header Navigation (Fades in on page load) */}
      <header
        className={`relative z-30 w-full pt-4 sm:pt-6 px-4 sm:px-8 md:px-12 flex items-center justify-between text-xs tracking-wider shrink-0 transition-all duration-700 delay-300 ${
          isIgnited ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"
        }`}
      >
        {/* Top Left Title Stack */}
        <div className="flex flex-col text-[10px] sm:text-[11px] leading-tight font-semibold tracking-[0.22em] text-zinc-400">
          <span className="hover:text-cyan-400 transition-colors">
            DEVELOPER
          </span>
          <span className="hover:text-cyan-400 transition-colors">
            DESIGNER
          </span>
          <span className="hover:text-cyan-400 transition-colors">
            ENGINEER
          </span>
        </div>

        {/* Top Center Nav Links */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-[11px] font-bold tracking-[0.2em] text-zinc-300">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setActiveNav(item.label)}
              className="relative py-1 transition-colors hover:text-white group"
            >
              <span
                className={
                  activeNav === item.label
                    ? "text-white"
                    : "text-zinc-400 group-hover:text-zinc-200"
                }
              >
                {item.label}
              </span>
              {activeNav === item.label && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-400 rounded-full shadow-[0_0_10px_#38bdf8]" />
              )}
            </a>
          ))}
        </nav>

        {/* Top Right Status Indicators */}
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-400 shadow-[0_0_8px_#38bdf8]" />
          </span>
          <span className="h-2 w-2 rounded-full bg-zinc-600" />
        </div>
      </header>

      {/* 3. Left and Right Vertical Chevrons (▶ ▶ ▶ ▶ ▶) in Electric Cyan */}
      <aside
        aria-hidden="true"
        className={`hidden sm:flex absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-20 flex-col gap-2.5 text-[9px] md:text-[10px] select-none pointer-events-none transition-opacity duration-700 delay-500 ${
          isIgnited ? "opacity-100" : "opacity-0"
        }`}
      >
        <span className="animate-chevron-1">▶</span>
        <span className="animate-chevron-2">▶</span>
        <span className="animate-chevron-3">▶</span>
        <span className="animate-chevron-4">▶</span>
        <span className="animate-chevron-5">▶</span>
      </aside>

      <aside
        aria-hidden="true"
        className={`hidden sm:flex absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-20 flex-col gap-2.5 text-[9px] md:text-[10px] select-none pointer-events-none transition-opacity duration-700 delay-500 ${
          isIgnited ? "opacity-100" : "opacity-0"
        }`}
      >
        <span className="animate-chevron-1">▶</span>
        <span className="animate-chevron-2">▶</span>
        <span className="animate-chevron-3">▶</span>
        <span className="animate-chevron-4">▶</span>
        <span className="animate-chevron-5">▶</span>
      </aside>

      {/* 4. Centerpiece: Subtitle, Large Textured "THAMALPATH", and Walking Person */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center w-full px-2 sm:px-4 min-h-0">
        {/* Subtitle Above Name: "••• WELCOME TO MY WORLD •••" */}
        <div
          className={`text-center mb-1 sm:mb-2 shrink-0 z-10 transition-all duration-700 delay-400 ${
            isIgnited ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
          }`}
        >
          <p className="inline-flex items-center justify-center text-xs sm:text-sm md:text-base lg:text-lg xl:text-[20px] font-cinzel font-semibold tracking-[0.32em] sm:tracking-[0.38em] text-zinc-100 uppercase drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
            <span
              aria-hidden="true"
              className="inline-flex items-center gap-1.5 sm:gap-2 mr-3 sm:mr-5"
            >
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-zinc-200 shadow-[0_0_8px_rgba(255,255,255,0.6)]" />
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-zinc-200 shadow-[0_0_8px_rgba(255,255,255,0.6)]" />
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-zinc-200 shadow-[0_0_8px_rgba(255,255,255,0.6)]" />
            </span>
            <span>
              WELCOME TO{" "}
              <span className="text-cyan-400 font-extrabold drop-shadow-[0_0_14px_rgba(56,189,248,0.95)]">
                MY
              </span>{" "}
              WORLD
            </span>
            <span
              aria-hidden="true"
              className="inline-flex items-center gap-1.5 sm:gap-2 ml-3 sm:ml-5"
            >
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-zinc-200 shadow-[0_0_8px_rgba(255,255,255,0.6)]" />
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-zinc-200 shadow-[0_0_8px_rgba(255,255,255,0.6)]" />
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-zinc-200 shadow-[0_0_8px_rgba(255,255,255,0.6)]" />
            </span>
          </p>
        </div>

        {/* Central Stage: Generous Vertical Space for Towering Typography and Hero Character */}
        <div className="relative w-full flex items-center justify-center flex-1 min-h-0 max-h-[82vh] px-1 sm:px-3">
          {/* 
            A. STATIC SMOOTH FADE GRADIENT TEXTURED NAME: "THAMALPATH"
            Towering blockbuster height (scale-y-[1.5]) and expansive width matching background colors
          */}
          <div
            ref={titleRef}
            className={`absolute inset-0 flex items-center justify-center select-none pointer-events-none z-0 will-change-transform transition-all duration-1000 ease-out -translate-y-4 sm:-translate-y-6 md:-translate-y-8 ${
              isIgnited
                ? "opacity-100 scale-100 filter-none"
                : "opacity-0 scale-95 blur-sm"
            }`}
          >
            <h1 className="textured-hero-name text-[21.5vw] sm:text-[21vw] md:text-[20vw] lg:text-[19.5vw] xl:text-[19vw] font-black uppercase tracking-[-0.035em] leading-none text-center transform scale-y-[1.5] origin-center whitespace-nowrap">
              THAMALPATH
            </h1>
          </div>

          {/* Cyan Ambient Horizon Glow directly behind character */}
          <div
            className={`absolute bottom-6 w-[60vw] max-w-180 h-28 bg-linear-to-t from-cyan-400/28 via-blue-600/14 to-transparent blur-3xl pointer-events-none z-10 transition-opacity duration-1000 ${
              isIgnited ? "opacity-100" : "opacity-0"
            }`}
          />

          {/* 
            B. FOREGROUND ANIMATED PERSON (Stylish Suit Swagger)
            Prominent heroic presence, 100% visible from top of hair to shoes
          */}
          <div
            ref={characterRef}
            className="relative z-20 flex flex-col items-center justify-end pointer-events-none will-change-transform animate-walking-entrance"
          >
            {/* Walking Kinematics Container */}
            <div className="relative animate-stylish-walk flex flex-col items-center">
              {/* Vertical Constraint Sizing: Preserves full head-to-toe visibility without clipping */}
              <div className="relative h-[49vh] sm:h-[54vh] md:h-[59vh] lg:h-[64vh] max-h-165 min-h-72.5 aspect-489/1153 hero-character-shadow">
                <Image
                  src="/hero-character-blue.png?v=3"
                  alt="Thamalpath in tailored suit walking forward"
                  fill
                  priority
                  unoptimized
                  className="object-contain contrast-105 brightness-100"
                  sizes="(max-height: 550px) 240px, (max-height: 750px) 290px, 360px"
                />
              </div>

              {/* Ground Contact Shadow (Rhythmically pulses with stride in deep black & sapphire) */}
              <div className="absolute -bottom-1 w-[82%] h-4 sm:h-5 bg-black/95 rounded-[100%] blur-sm animate-walk-shadow z-10" />
              <div className="absolute -bottom-1.5 w-[92%] h-4 bg-cyan-950/50 rounded-[100%] blur-md z-10" />

              {/* Wet Floor Reflection (Pure cool sapphire & cyan reflection, zero red tint) */}
              <div
                aria-hidden="true"
                className="absolute top-[98%] w-full h-[40%] origin-top opacity-30 blur-[1px] scale-y-[-1] pointer-events-none select-none overflow-hidden"
                style={{
                  maskImage:
                    "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.2) 40%, transparent 80%)",
                  WebkitMaskImage:
                    "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.2) 40%, transparent 80%)",
                }}
              >
                <div className="relative w-full h-full">
                  <Image
                    src="/hero-character-blue.png?v=3"
                    alt="Floor reflection"
                    fill
                    unoptimized
                    className="object-contain brightness-50 contrast-110"
                    sizes="240px"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Wet Reflective Asphalt Ground Plane (Lower Horizon) in Sapphire Blue */}
      <div className="absolute bottom-0 left-0 right-0 h-16 sm:h-20 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[url('/wet-floor-blue.jpg')] bg-cover bg-bottom opacity-25 mix-blend-screen" />
        <div className="absolute inset-0 bg-linear-to-t from-[#010206] via-[#010206]/50 to-transparent" />
        {/* Specular Cyan Horizon Light Spill */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4/5 h-12 bg-linear-to-t from-cyan-400/12 via-blue-600/6 to-transparent blur-2xl animate-ground-gleam" />
      </div>

      {/* 6. Bottom HUD: Sound Toggle & Pagination Dots */}
      <footer
        className={`relative z-30 w-full pb-4 sm:pb-6 px-4 sm:px-8 md:px-12 flex items-center justify-between text-xs tracking-wider shrink-0 transition-all duration-700 delay-500 ${
          isIgnited ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
      >
        {/* Bottom Left: "[ SOUND ON ]" Button */}
        <button
          onClick={toggleSound}
          type="button"
          aria-label={
            soundEnabled
              ? "Mute ambient audio"
              : "Enable cinematic ambient audio"
          }
          className="group inline-flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-sm border border-zinc-700/70 bg-black/60 backdrop-blur-sm text-zinc-300 hover:border-cyan-400/80 hover:text-white transition-all shadow-[0_4px_20px_rgba(0,0,0,0.8)] cursor-pointer"
        >
          {soundEnabled ? (
            <Volume2 className="h-3.5 w-3.5 text-cyan-400 animate-pulse" />
          ) : (
            <VolumeX className="h-3.5 w-3.5 text-zinc-500 group-hover:text-cyan-400" />
          )}
          <span className="font-mono text-[10px] sm:text-[11px] font-bold tracking-[0.2em]">
            {soundEnabled ? "SOUND ON" : "SOUND OFF"}
          </span>
          {soundEnabled && (
            <span className="flex items-center gap-0.5 ml-1">
              <span className="h-2 w-0.5 bg-cyan-400 animate-[bounce_1s_infinite_100ms]" />
              <span className="h-3 w-0.5 bg-sky-300 animate-[bounce_1s_infinite_300ms]" />
              <span className="h-1.5 w-0.5 bg-cyan-400 animate-[bounce_1s_infinite_200ms]" />
            </span>
          )}
        </button>

        {/* Bottom Right: Pagination Dots in Electric Cyan */}
        <div className="flex items-center gap-2">
          <a
            href="#home"
            title="Home"
            className="h-2.5 w-2.5 rounded-full bg-cyan-400 shadow-[0_0_10px_#38bdf8] transition-transform hover:scale-125"
          />
          {navItems.slice(1).map((item, idx) => (
            <a
              key={idx}
              href={item.href}
              title={item.label}
              className="h-2 w-2 rounded-full bg-zinc-600 hover:bg-zinc-300 transition-colors hover:scale-125"
            />
          ))}
        </div>
      </footer>
    </section>
  );
}
