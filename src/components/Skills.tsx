"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  Gauge,
  Layers,
  Lightbulb,
  MessageSquare,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Users,
} from "lucide-react";

interface SkillItem {
  name: string;
  icon: React.ReactNode;
}

interface SkillCategory {
  number: string;
  title: string;
  skills: SkillItem[];
}

/* ============================================================================
   Authentic Larger Brand SVG Icons for Languages, Frameworks, Databases & Tools
   ============================================================================ */

function ReactLogo() {
  return (
    <svg viewBox="0 0 36 36" className="w-9 h-9" fill="none">
      <circle cx="18" cy="18" r="2.9" fill="#61DAFB" />
      <ellipse
        cx="18"
        cy="18"
        rx="14"
        ry="5.4"
        stroke="#61DAFB"
        strokeWidth="1.6"
      />
      <ellipse
        cx="18"
        cy="18"
        rx="14"
        ry="5.4"
        stroke="#61DAFB"
        strokeWidth="1.6"
        transform="rotate(60 18 18)"
      />
      <ellipse
        cx="18"
        cy="18"
        rx="14"
        ry="5.4"
        stroke="#61DAFB"
        strokeWidth="1.6"
        transform="rotate(120 18 18)"
      />
    </svg>
  );
}

function NextLogo() {
  return (
    <svg viewBox="0 0 36 36" className="w-9 h-9" fill="none">
      <circle cx="18" cy="18" r="14.5" fill="#FFFFFF" />
      <path
        d="M12.5 24.5V11.5L25.5 27.5"
        stroke="#020617"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M23.2 11.5V20"
        stroke="#020617"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function TypeScriptLogo() {
  return (
    <svg viewBox="0 0 36 36" className="w-9 h-9" fill="none">
      <rect x="4" y="4" width="28" height="28" rx="5" fill="#3178C6" />
      <text
        x="29.5"
        y="27.5"
        textAnchor="end"
        fill="#FFFFFF"
        fontSize="13.5"
        fontWeight="800"
        fontFamily="sans-serif"
      >
        TS
      </text>
    </svg>
  );
}

function JavaScriptLogo() {
  return (
    <svg viewBox="0 0 36 36" className="w-9 h-9" fill="none">
      <rect x="4" y="4" width="28" height="28" rx="5" fill="#F7DF1E" />
      <text
        x="29.5"
        y="27.5"
        textAnchor="end"
        fill="#0F172A"
        fontSize="13.5"
        fontWeight="800"
        fontFamily="sans-serif"
      >
        JS
      </text>
    </svg>
  );
}

function TailwindLogo() {
  return (
    <svg viewBox="0 0 36 36" className="w-9 h-9" fill="none">
      <path
        d="M18 10C13.6 10 10.9 12.2 9.8 16.5C11.5 14.3 13.5 13.5 15.6 14.1C16.9 14.4 17.8 15.3 18.7 16.3C20.3 17.9 22.1 19.7 26.2 19.7C30.6 19.7 33.3 17.5 34.4 13.2C32.7 15.4 30.7 16.2 28.6 15.6C27.3 15.3 26.4 14.4 25.5 13.4C23.9 11.8 22.1 10 18 10ZM9.8 19.7C5.4 19.7 2.7 21.9 1.6 26.2C3.3 24 5.3 23.2 7.4 23.8C8.7 24.1 9.6 25 10.5 26C12.1 27.6 13.9 29.4 18 29.4C22.4 29.4 25.1 27.2 26.2 22.9C24.5 25.1 22.5 25.9 20.4 25.3C19.1 25 18.2 24.1 17.3 23.1C15.7 21.5 13.9 19.7 9.8 19.7Z"
        fill="#38BDF8"
      />
    </svg>
  );
}

function HtmlCssLogo() {
  return (
    <svg viewBox="0 0 36 36" className="w-9 h-9" fill="none">
      <path
        d="M6.5 5L8.7 28.5L18 31.5L27.3 28.5L29.5 5H6.5Z"
        fill="#E34F26"
      />
      <path d="M18 7.2V29.1L25.4 26.8L27.2 7.2H18Z" fill="#EF652A" />
      <path
        d="M18 14.5H13.4L13.1 11.2H18V8H9.8L10.6 17.7H18V14.5ZM18 22.8L14.3 21.8L14.1 19.2H10.9L11.3 24.3L18 26.2V22.8Z"
        fill="#EBEBEB"
      />
      <path
        d="M18 14.5V17.7H22.1L21.7 21.8L18 22.8V26.2L24.7 24.3L25.6 14.5H18ZM18 8V11.2H25.9L26.2 8H18Z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

function LaravelLogo() {
  return (
    <svg viewBox="0 0 36 36" className="w-9 h-9" fill="none">
      <path
        d="M6 10.5L12.5 6.8L19 10.5V19.8L25.5 16L31 19.2V26L19 32.5L6 25.2V10.5Z"
        stroke="#FF2D20"
        strokeWidth="2"
        strokeLinejoin="round"
        fill="rgba(255,45,32,0.12)"
      />
      <path
        d="M12.5 6.8V22.4L25.5 16M19 19.8V32.5M6 10.5L12.5 14.2L19 10.5"
        stroke="#FF2D20"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function NodeLogo() {
  return (
    <svg viewBox="0 0 36 36" className="w-9 h-9" fill="none">
      <polygon
        points="18,3.5 31,11 31,25 18,32.5 5,25 5,11"
        stroke="#5FA04E"
        strokeWidth="2.1"
        fill="rgba(95,160,78,0.14)"
      />
      <text
        x="18"
        y="22"
        textAnchor="middle"
        fill="#86EFAC"
        fontSize="11.5"
        fontWeight="800"
        fontFamily="monospace"
      >
        JS
      </text>
    </svg>
  );
}

function ExpressLogo() {
  return (
    <svg viewBox="0 0 36 36" className="w-9 h-9" fill="none">
      <rect
        x="3.5"
        y="6"
        width="29"
        height="24"
        rx="6"
        fill="#0F172A"
        stroke="#94A3B8"
        strokeWidth="1.6"
      />
      <text
        x="18"
        y="22.5"
        textAnchor="middle"
        fill="#F8FAFC"
        fontSize="14"
        fontWeight="300"
        letterSpacing="-0.5"
        fontFamily="sans-serif"
      >
        ex
      </text>
    </svg>
  );
}

function SpringBootLogo() {
  return (
    <svg viewBox="0 0 36 36" className="w-9 h-9" fill="none">
      <path
        d="M30 8.5C28.8 11.4 26.8 13.2 24.4 14.1C21.6 15.1 17.5 15.2 14.3 18.2C11.9 20.5 10.8 23.6 10.6 25.8C13.2 28.4 17.6 29.8 22.2 28.4C27.8 26.6 31.6 20.4 30 8.5Z"
        fill="#6DB33F"
      />
      <path
        d="M11 26.5C14.8 22.8 19.6 19.2 26.5 15"
        stroke="#020617"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <circle cx="24" cy="23.5" r="1.8" fill="#020617" />
    </svg>
  );
}

function PhpLogo() {
  return (
    <svg viewBox="0 0 36 36" className="w-9 h-9" fill="none">
      <ellipse
        cx="18"
        cy="18"
        rx="15"
        ry="10"
        fill="#777BB4"
        stroke="#A5B4FC"
        strokeWidth="1.2"
      />
      <text
        x="18"
        y="22"
        textAnchor="middle"
        fill="#FFFFFF"
        fontSize="11.5"
        fontWeight="800"
        fontStyle="italic"
        fontFamily="sans-serif"
      >
        php
      </text>
    </svg>
  );
}

function JavaLogo() {
  return (
    <svg viewBox="0 0 36 36" className="w-9 h-9" fill="none">
      <path
        d="M15 6.5C13.5 8.5 16.8 10 15.2 12.2M19.8 5.5C18.2 8 21.6 9.8 19.6 12.5"
        stroke="#F89820"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M9.5 15.5H24V22.5C24 25.5 21.3 27.5 16.8 27.5C12.2 27.5 9.5 25.5 9.5 22.5V15.5Z"
        stroke="#5382A1"
        strokeWidth="2"
        fill="rgba(83,130,161,0.18)"
      />
      <path
        d="M24 17H26.8C28.4 17 29.5 18 29.5 19.5C29.5 21 28.4 22 26.8 22H24"
        stroke="#5382A1"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M7.5 30.5H26.5"
        stroke="#F89820"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MySqlLogo() {
  return (
    <svg viewBox="0 0 36 36" className="w-9 h-9" fill="none">
      <ellipse
        cx="18"
        cy="10"
        rx="11"
        ry="4.2"
        fill="rgba(0,117,143,0.28)"
        stroke="#38BDF8"
        strokeWidth="1.7"
      />
      <path
        d="M7 10V26C7 28.3 11.9 30.2 18 30.2C24.1 30.2 29 28.3 29 26V10"
        stroke="#38BDF8"
        strokeWidth="1.7"
      />
      <path
        d="M7 18C7 20.3 11.9 22.2 18 22.2C24.1 22.2 29 20.3 29 18"
        stroke="#F29111"
        strokeWidth="1.7"
      />
    </svg>
  );
}

function PostgresLogo() {
  return (
    <svg viewBox="0 0 36 36" className="w-9 h-9" fill="none">
      <path
        d="M25.5 10.5C23.6 8.2 20.8 7 17.8 7C12.2 7 8 11 8 16.5C8 20.2 10 23.2 13 24.6V29.5L17 26.5C17.8 26.6 18.8 26.6 19.8 26.4C24.4 25.5 27.8 21.5 27.8 16.5C27.8 14.1 27 12.1 25.5 10.5Z"
        fill="rgba(51,103,145,0.32)"
        stroke="#60A5FA"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <circle cx="20.5" cy="14.5" r="1.4" fill="#E0F2FE" />
      <path
        d="M23.5 18.5C25.5 19.5 26 22.5 24 25.5"
        stroke="#60A5FA"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SqlServerLogo() {
  return (
    <svg viewBox="0 0 36 36" className="w-9 h-9" fill="none">
      <rect
        x="4"
        y="6"
        width="28"
        height="24"
        rx="5"
        fill="rgba(204,41,39,0.16)"
        stroke="#F87171"
        strokeWidth="1.6"
      />
      <text
        x="18"
        y="22"
        textAnchor="middle"
        fill="#FCA5A5"
        fontSize="11"
        fontWeight="800"
        fontFamily="monospace"
      >
        SQL
      </text>
    </svg>
  );
}

function AwsLogo() {
  return (
    <svg viewBox="0 0 36 36" className="w-9 h-9" fill="none">
      <text
        x="18"
        y="19"
        textAnchor="middle"
        fill="#F8FAFC"
        fontSize="11.5"
        fontWeight="800"
        fontFamily="sans-serif"
      >
        aws
      </text>
      <path
        d="M7 23.5C12.5 27.8 22.5 27.8 28.5 23.8"
        stroke="#FF9900"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path
        d="M25.5 22.6L29.2 23.6L27.6 27.2"
        stroke="#FF9900"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DockerLogo() {
  return (
    <svg viewBox="0 0 36 36" className="w-9 h-9" fill="none">
      <rect x="8" y="14" width="4" height="3.6" rx="0.6" fill="#2496ED" />
      <rect x="13" y="14" width="4" height="3.6" rx="0.6" fill="#2496ED" />
      <rect x="18" y="14" width="4" height="3.6" rx="0.6" fill="#2496ED" />
      <rect x="13" y="9.6" width="4" height="3.6" rx="0.6" fill="#60A5FA" />
      <rect x="18" y="9.6" width="4" height="3.6" rx="0.6" fill="#60A5FA" />
      <path
        d="M4.5 19.2H26.5C28.8 19.2 31 18 32.2 16.2C30.8 15.5 29.2 15.8 28.2 16.5C28 15.1 27.1 13.7 26 13.2C25.3 14.8 25.6 16.8 26.4 18H4.5C4.5 23.8 9.2 27.8 16.5 27.8C23.8 27.8 29.2 24.1 31.2 19.2"
        stroke="#2496ED"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="rgba(36,150,237,0.16)"
      />
    </svg>
  );
}

function GitHubActionsLogo() {
  return (
    <svg viewBox="0 0 36 36" className="w-9 h-9" fill="none">
      <circle
        cx="18"
        cy="18"
        r="12.5"
        stroke="#2088FF"
        strokeWidth="2"
        strokeDasharray="16 6"
      />
      <polygon points="15,12.5 24,18 15,23.5" fill="#60A5FA" />
    </svg>
  );
}

function CiCdLogo() {
  return (
    <svg viewBox="0 0 36 36" className="w-9 h-9" fill="none">
      <path
        d="M12.5 23.5C9.2 23.5 6.5 21 6.5 18C6.5 15 9.2 12.5 12.5 12.5C15.5 12.5 17 15 18 18C19 21 20.5 23.5 23.5 23.5C26.8 23.5 29.5 21 29.5 18C29.5 15 26.8 12.5 23.5 12.5C20.5 12.5 19 15 18 18C17 21 15.5 23.5 12.5 23.5Z"
        stroke="#2DD4BF"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CpanelLogo() {
  return (
    <svg viewBox="0 0 36 36" className="w-9 h-9" fill="none">
      <rect
        x="4"
        y="7"
        width="28"
        height="22"
        rx="5"
        fill="rgba(255,108,44,0.16)"
        stroke="#FF6C2C"
        strokeWidth="1.6"
      />
      <text
        x="18"
        y="22.5"
        textAnchor="middle"
        fill="#FF6C2C"
        fontSize="13"
        fontWeight="800"
        fontFamily="sans-serif"
      >
        cP
      </text>
    </svg>
  );
}

function GitLogo() {
  return (
    <svg viewBox="0 0 36 36" className="w-9 h-9" fill="none">
      <rect
        x="18"
        y="3.5"
        width="20.5"
        height="20.5"
        rx="3.5"
        transform="rotate(45 18 3.5)"
        fill="#F05032"
      />
      <circle cx="18" cy="12" r="2.1" fill="#FFFFFF" />
      <circle cx="18" cy="24" r="2.1" fill="#FFFFFF" />
      <circle cx="24" cy="18" r="2.1" fill="#FFFFFF" />
      <path
        d="M18 14V22M19.5 13.5L22.6 16.6"
        stroke="#FFFFFF"
        strokeWidth="1.9"
        strokeLinecap="round"
      />
    </svg>
  );
}

function GitHubLogo() {
  return (
    <svg viewBox="0 0 36 36" className="w-9 h-9" fill="none">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18 4.5C10.5 4.5 4.5 10.6 4.5 18.2C4.5 24.3 8.4 29.4 13.8 31.2C14.5 31.3 14.7 30.9 14.7 30.5V28.1C11 28.9 10.2 26.3 10.2 26.3C9.6 24.8 8.7 24.4 8.7 24.4C7.5 23.6 8.8 23.6 8.8 23.6C10.1 23.7 10.8 25 10.8 25C12 27 13.9 26.4 14.7 26.1C14.8 25.2 15.2 24.6 15.6 24.3C12.6 24 9.5 22.8 9.5 17.6C9.5 16.1 10 14.9 10.9 14C10.8 13.6 10.3 12.2 11 10.4C11 10.4 12.1 10 14.7 11.8C15.8 11.5 16.9 11.3 18 11.3C19.1 11.3 20.2 11.5 21.3 11.8C23.9 10 25 10.4 25 10.4C25.7 12.2 25.2 13.6 25.1 14C26 14.9 26.5 16.1 26.5 17.6C26.5 22.8 23.4 24 20.4 24.3C20.9 24.7 21.3 25.6 21.3 26.9V30.5C21.3 30.9 21.5 31.3 22.2 31.2C27.6 29.4 31.5 24.3 31.5 18.2C31.5 10.6 25.5 4.5 18 4.5Z"
        fill="#F8FAFC"
      />
    </svg>
  );
}

function PostmanLogo() {
  return (
    <svg viewBox="0 0 36 36" className="w-9 h-9" fill="none">
      <circle cx="18" cy="18" r="13.5" fill="#FF6C37" />
      <path
        d="M12.5 22.5L23.5 11.5M23.5 11.5H16.5M23.5 11.5V18.5"
        stroke="#FFFFFF"
        strokeWidth="2.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SwaggerLogo() {
  return (
    <svg viewBox="0 0 36 36" className="w-9 h-9" fill="none">
      <circle cx="18" cy="18" r="13.5" fill="#85EA2D" />
      <text
        x="18"
        y="22"
        textAnchor="middle"
        fill="#0F172A"
        fontSize="13.5"
        fontWeight="900"
        fontFamily="monospace"
      >
        {"{…}"}
      </text>
    </svg>
  );
}

function JwtLogo() {
  return (
    <svg viewBox="0 0 36 36" className="w-9 h-9" fill="none">
      <line
        x1="18"
        y1="5.5"
        x2="18"
        y2="30.5"
        stroke="#FB015B"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <line
        x1="7.2"
        y1="11.8"
        x2="28.8"
        y2="24.2"
        stroke="#00B9F1"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <line
        x1="28.8"
        y1="11.8"
        x2="7.2"
        y2="24.2"
        stroke="#D63AFF"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <circle cx="18" cy="18" r="3.5" fill="#020617" />
    </svg>
  );
}

const SKILL_CATEGORIES: SkillCategory[] = [
  {
    number: "01",
    title: "FRONTEND",
    skills: [
      { name: "React.js", icon: <ReactLogo /> },
      { name: "Next.js", icon: <NextLogo /> },
      { name: "TypeScript", icon: <TypeScriptLogo /> },
      { name: "JavaScript", icon: <JavaScriptLogo /> },
      { name: "Tailwind CSS", icon: <TailwindLogo /> },
      { name: "HTML5 / CSS3", icon: <HtmlCssLogo /> },
    ],
  },
  {
    number: "02",
    title: "BACKEND",
    skills: [
      { name: "Laravel", icon: <LaravelLogo /> },
      { name: "Node.js", icon: <NodeLogo /> },
      { name: "Express.js", icon: <ExpressLogo /> },
      { name: "Spring Boot", icon: <SpringBootLogo /> },
      { name: "PHP", icon: <PhpLogo /> },
      { name: "Java", icon: <JavaLogo /> },
    ],
  },
  {
    number: "03",
    title: "DATABASES",
    skills: [
      { name: "MySQL", icon: <MySqlLogo /> },
      { name: "PostgreSQL", icon: <PostgresLogo /> },
      { name: "SQL Server", icon: <SqlServerLogo /> },
      {
        name: "Schema Design",
        icon: <Layers className="w-8 h-8 text-cyan-300" />,
      },
      {
        name: "Optimization",
        icon: <Gauge className="w-8 h-8 text-emerald-400" />,
      },
    ],
  },
  {
    number: "04",
    title: "CLOUD & DEVOPS",
    skills: [
      { name: "AWS", icon: <AwsLogo /> },
      { name: "Docker", icon: <DockerLogo /> },
      { name: "GitHub Actions", icon: <GitHubActionsLogo /> },
      { name: "CI / CD", icon: <CiCdLogo /> },
      { name: "cPanel / Plesk", icon: <CpanelLogo /> },
    ],
  },
  {
    number: "05",
    title: "TOOLS & APIS",
    skills: [
      { name: "Git", icon: <GitLogo /> },
      { name: "GitHub", icon: <GitHubLogo /> },
      { name: "Postman", icon: <PostmanLogo /> },
      { name: "Swagger", icon: <SwaggerLogo /> },
      { name: "RBAC & JWT", icon: <JwtLogo /> },
    ],
  },
  {
    number: "06",
    title: "SOFT SKILLS",
    skills: [
      {
        name: "Problem Solving",
        icon: <Lightbulb className="w-8 h-8 text-cyan-300" />,
      },
      {
        name: "Agile / Scrum",
        icon: <TrendingUp className="w-8 h-8 text-blue-400" />,
      },
      {
        name: "Code Reviews",
        icon: <ShieldCheck className="w-8 h-8 text-emerald-400" />,
      },
      {
        name: "Collaboration",
        icon: <Users className="w-8 h-8 text-purple-400" />,
      },
      {
        name: "UI / UX Craft",
        icon: <Sparkles className="w-8 h-8 text-sky-300" />,
      },
      {
        name: "Communication",
        icon: <MessageSquare className="w-8 h-8 text-slate-300" />,
      },
    ],
  },
];

export function Skills() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || typeof IntersectionObserver === "undefined") {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.14 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative w-full overflow-hidden bg-[#010206] text-white py-16 sm:py-22 px-4 sm:px-8 md:px-12 border-t border-cyan-950/60 select-none"
    >
      {/* 1. Ambient Obsidian & Sapphire/Cyan Architectural Background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_22%_52%,rgba(14,165,233,0.16)_0%,rgba(30,64,175,0.09)_42%,transparent_75%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_78%_30%,rgba(56,189,248,0.09)_0%,transparent_70%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-cyan-400/45 to-transparent"
      />

      {/* 2. Top Editorial Row */}
      <div className="relative z-20 w-full max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 lg:mb-12">
          {/* Top-Left Editorial Motto */}
          <div
            className={`transition-all duration-900 ease-out ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
            }`}
          >
            <p className="font-mono text-[10px] sm:text-[11px] tracking-[0.28em] text-zinc-400 uppercase leading-relaxed">
              SKILLS TURN IDEAS
              <br />
              <span className="text-cyan-400">INTO REALITY.</span>
            </p>
          </div>

          {/* Center-Right Oversized SKILLS Title */}
          <div
            className={`lg:text-center lg:flex-1 lg:pr-24 transition-all duration-1000 ease-out delay-100 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <h2 className="font-cinzel text-5xl sm:text-6xl lg:text-7xl font-bold tracking-[0.2em] text-zinc-100 leading-none drop-shadow-[0_8px_28px_rgba(56,189,248,0.22)]">
              SKILLS
            </h2>
            <p className="mt-2.5 font-cinzel text-[10px] sm:text-xs tracking-[0.38em] text-cyan-300/85 uppercase">
              TOOLS THAT SHAPE MY VISION
            </p>
          </div>
        </div>

        {/* 3. Main Asymmetric 2-Column Layout: Left Personal Portrait | Right 2x3 Skill Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-7 items-stretch">
          {/* Left Column: Thamalpath's Personal Portrait Framing */}
          <div
            className={`lg:col-span-4 relative flex flex-col justify-end rounded-xl overflow-hidden border border-cyan-950/75 bg-[#030712]/90 min-h-105 sm:min-h-125 lg:min-h-full transition-all duration-1000 ease-out ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-10"
            }`}
          >
            {/* Subtle Architectural Vertical Studio Light Beams behind Portrait */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_75%_65%_at_50%_35%,rgba(56,189,248,0.22)_0%,rgba(30,64,175,0.14)_48%,rgba(1,2,6,0.96)_90%)]"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute top-0 left-1/4 w-px h-full bg-linear-to-b from-cyan-400/35 via-cyan-500/10 to-transparent"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute top-0 right-1/4 w-px h-full bg-linear-to-b from-blue-500/30 via-transparent to-transparent"
            />

            {/* Thamalpath's Executive Studio Portrait */}
            <div className="relative z-10 w-full h-112 sm:h-132 lg:h-full min-h-112">
              <Image
                src="/skills-portrait.jpg"
                alt="Thamalpath Sathimantha — Full-Stack Software Engineer"
                fill
                sizes="(max-width: 1024px) 100vw, 34vw"
                className="object-cover object-top transition-transform duration-700 hover:scale-[1.03]"
              />
            </div>

            {/* Bottom Obsidian Fade + Executive Info Pill */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 bottom-0 h-44 bg-linear-to-t from-[#010206] via-[#010206]/85 to-transparent z-20"
            />

            <div className="relative z-30 p-5 pt-0 flex flex-col gap-3">
              <div className="flex items-center justify-between border-t border-cyan-500/20 pt-3.5">
                <div>
                  <p className="font-cinzel text-sm font-bold tracking-[0.18em] text-zinc-100">
                    THAMALPATH
                  </p>
                  <p className="font-mono text-[9px] tracking-[0.22em] text-cyan-400/90 uppercase mt-0.5">
                    ASSOCIATE SOFTWARE ENGINEER
                  </p>
                </div>
                <a
                  href="https://www.linkedin.com/in/thamalpath-liyanage/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1 rounded-sm border border-cyan-500/40 bg-cyan-950/40 font-mono text-[9px] tracking-[0.2em] text-cyan-300 uppercase hover:bg-cyan-400/15 hover:border-cyan-300 transition"
                >
                  LINKEDIN ↗
                </a>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[9px] font-mono tracking-[0.18em] text-zinc-400 uppercase">
                <div className="rounded-md bg-[#040a18]/90 border border-cyan-950/70 px-2.5 py-1.5">
                  <span className="text-cyan-300 font-bold text-xs block">
                    2+ YRS
                  </span>
                  FULL-STACK EXP
                </div>
                <div className="rounded-md bg-[#040a18]/90 border border-cyan-950/70 px-2.5 py-1.5">
                  <span className="text-cyan-300 font-bold text-xs block">
                    25+ MODULES
                  </span>
                  ERP · CRM · ECOM
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: 2x3 Glassmorphic Skill Category Grid (01 – 06) */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
            {SKILL_CATEGORIES.map((category, catIdx) => (
              <div
                key={category.number}
                style={{
                  transitionDelay: isVisible ? `${140 + catIdx * 100}ms` : "0ms",
                }}
                className={`group relative rounded-xl border border-cyan-950/75 bg-[#040914]/82 backdrop-blur-md p-4 sm:p-5 overflow-hidden transition-all duration-700 ease-out hover:border-cyan-400/55 hover:bg-[#061024]/90 hover:shadow-[0_0_28px_rgba(56,189,248,0.16)] ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
              >
                {/* Top Subtle Cyan Highlight Line on Hover */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-6 top-0 h-px bg-linear-to-r from-transparent via-cyan-400/0 to-transparent group-hover:via-cyan-400/70 transition-all duration-500"
                />

                {/* Clean Category Header Row (Number + Title + Hairline) */}
                <div className="flex items-center gap-2.5 mb-4">
                  <span className="font-cinzel text-sm sm:text-base font-bold text-cyan-400 drop-shadow-[0_0_10px_rgba(56,189,248,0.55)]">
                    {category.number}
                  </span>
                  <h3 className="font-cinzel text-xs sm:text-sm font-bold tracking-[0.16em] text-zinc-100">
                    {category.title}
                  </h3>
                  <span
                    aria-hidden="true"
                    className="flex-1 h-px bg-linear-to-r from-cyan-500/35 to-transparent"
                  />
                </div>

                {/* Larger Authentic Brand Skill Icon Tiles */}
                <div className="grid grid-cols-3 gap-2.5">
                  {category.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="group/tile flex flex-col items-center justify-center gap-2.5 rounded-lg bg-[#02050d]/95 border border-cyan-950/70 py-3.5 px-2 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/60 hover:bg-[#061226] hover:shadow-[0_6px_18px_rgba(14,165,233,0.16)]"
                    >
                      <div className="flex items-center justify-center h-10 w-10 transition-transform duration-300 group-hover/tile:scale-110">
                        {skill.icon}
                      </div>
                      <span className="text-[10.5px] font-medium tracking-wide text-zinc-300 group-hover/tile:text-white text-center leading-tight">
                        {skill.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
