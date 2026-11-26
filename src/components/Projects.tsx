"use client";

import React, {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import Image from "next/image";
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Layers,
  Play,
  Pause,
  Server,
  Database,
  ShieldCheck,
  Zap,
  Activity,
  CheckCircle2,
  X,
  Sparkles,
  TrendingUp,
  Cpu,
  Globe,
  SlidersHorizontal,
} from "lucide-react";

// ============================================================================
// Types & Project Interfaces
// ============================================================================
export interface ProjectGalleryImage {
  src: string;
  title: string;
  caption: string;
  badge: string;
}

export interface ProjectModuleHighlight {
  title: string;
  category: string;
  features: string[];
}

export interface ProjectItem {
  id: string;
  number: string;
  title: string;
  shortTitle: string;
  category: string;
  categoryKey:
    | "all"
    | "enterprise"
    | "ecommerce"
    | "logistics"
    | "edtech"
    | "services";
  role: string;
  clientOrScope: string;
  summary: string;
  techStack: string[];
  metrics: {
    label: string;
    value: string;
  }[];
  highlights: string[];
  architectureOverview: string;
  mockupType:
    | "ecommerce"
    | "distribution"
    | "hotel"
    | "school"
    | "analytics"
    | "microservice"
    | "security"
    | "pms";
  liveUrl?: string;
  githubUrl?: string;
  gallery?: ProjectGalleryImage[];
  modules?: ProjectModuleHighlight[];
}

// ============================================================================
// Projects Data (Sourced directly from Thamalpath's CV and LinkedIn Profile)
// ============================================================================
export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: "venpaa-crm-ecommerce",
    number: "01",
    title: "Venpaa All-in-One Bookstore ERP, CRM & eCommerce Management System",
    shortTitle: "Venpaa Enterprise ERP & CRM",
    category: "ENTERPRISE ERP, CRM & ECOMMERCE",
    categoryKey: "ecommerce",
    role: "Full-Stack Software Engineer & System Architect",
    clientOrScope: "Venpaa Multi-Branch Bookshop (Colombo & Jaffna)",
    summary:
      "All-in-one enterprise ERP, CRM, and omnichannel retail management ecosystem powering Venpaa's multi-branch bookstore network and online eCommerce store. Engineered with Next.js 14 and Laravel 8, unifying 25+ mission-critical modules including catalog master records, Good Receive Notes (GRN), PO supply chain workflows, POS billing, COD reconciliation, and automated analytics.",
    techStack: [
      "Next.js 14 (App Router)",
      "Laravel 8 REST API",
      "TypeScript",
      "MySQL (DBAL)",
      "Tailwind CSS",
      "Shadcn UI & Radix",
      "TanStack Table 8.20",
      "Spatie RBAC",
      "PayHere / Koko / Mintpay",
      "AWS S3 / Flysystem",
      "Maatwebsite Excel",
      "POS Thermal Printing",
    ],
    metrics: [
      { label: "12-Mo Revenue", value: "LKR 12.6M+" },
      { label: "Master Catalog", value: "3,450+ Books" },
      { label: "Authors / Publishers", value: "1,460+ Profiles" },
      { label: "ERP Subsystems", value: "25+ Modules" },
    ],
    highlights: [
      "Engineered an end-to-end multi-branch supply chain workflow: Purchase Orders (PO), Good Receive Notes (GRN), Accept Good Notes (AGN), inter-branch Transfer Good Notes (TGN), and Supplier Return Notes (SRN).",
      "Developed high-throughput POS Bills & Cashier management supporting thermal receipt printing, daily shift cash reconciliations, salesperson commission tracking, and multi-tier pricing.",
      "Integrated omnichannel order fulfillment tracking web, Android, and iOS store sales across PayHere, Koko Pay, Mintpay, and courier Cash-on-Delivery (COD) reconciliation.",
      "Built real-time executive analytics dashboards monitoring LKR 12.6M+ annual turnover, comparing in-store POS velocity (78%) versus online digital revenue (22%).",
      "Implemented granular enterprise Role-Based Access Control (RBAC) via Spatie Permissions, securing financial ledgers, inventory write-offs, and multi-user audit trails.",
    ],
    architectureOverview:
      "High-performance client-server ERP architecture: Next.js 14 (App Router) with TanStack Table and Radix UI components connecting to a secure Laravel 8 REST API authenticated via Sanctum. Features Spatie dynamic RBAC, automated daily database snapshots, multi-branch inventory bin-cards, and AWS S3 document storage.",
    mockupType: "ecommerce",
    liveUrl: "https://github.com/Thamalpath",
    githubUrl: "https://github.com/Thamalpath",
    gallery: [
      {
        src: "/images/projects/venpaa2.png",
        title: "Executive Revenue & Analytics Command Center",
        caption:
          "Real-time revenue telemetry monitoring LKR 12.6M+ turnover, comparing in-store POS sales (78.1%) vs online revenue (21.9%) with monthly volume curves and master count metrics.",
        badge: "Executive Analytics",
      },
      {
        src: "/images/projects/venpaa3.png",
        title: "Supply Chain & Good Receive Note (GRN) Engine",
        caption:
          "Comprehensive procurement workflow linking Purchase Orders (PO), wholesale and retail pricing tiers, pack/unit calculations, free quantities, and automated stock ledger updates.",
        badge: "Procurement & GRN",
      },
      {
        src: "/images/projects/venpaa4.png",
        title: "Omnichannel eCommerce & Mobile Order Pipeline",
        caption:
          "Real-time fulfillment tracking orders across Web, Android, and iOS channels with Koko Pay, Mintpay, Card, and COD status reconciliation.",
        badge: "Order Fulfillment",
      },
      {
        src: "/images/projects/venpaa7.png",
        title: "POS Multi-Branch Bills & Cashier Management",
        caption:
          "Point-of-sale receipt audits across Colombo and Jaffna branches, tracking cashier shifts, tender types (Visa, Cash, Mintpay, COD), and net daily settlement summaries.",
        badge: "POS & Billing",
      },
      {
        src: "/images/projects/venpaa6.png",
        title: "Drag-and-Drop Visual Merchandising Studio",
        caption:
          "Interactive curation for featured kids' books, bestsellers, and new arrivals with instant drag-and-drop reordering synced live to the storefront.",
        badge: "E-Commerce CMS",
      },
      {
        src: "/images/projects/venpaa5.png",
        title: "Multi-Branch Store Configuration & Web CMS",
        caption:
          "Centralized branch control managing operating hours for Colombo and Jaffna stores, contact metadata, promotional announcements, and synchronized site banners.",
        badge: "Multi-Branch Admin",
      },
      {
        src: "/images/projects/venpaa1.png",
        title: "Multi-Branch Enterprise Authentication Gateway",
        caption:
          "Secure location-aware authentication gateway with branch location selection (Colombo / Jaffna), role verification, and session state guards.",
        badge: "Security & Auth",
      },
    ],
    modules: [
      {
        title: "Master Catalog & Bin-Card Management",
        category: "Catalog & Data",
        features: [
          "3,450+ Books, Magazines, and Stationery items cataloged with ISBN & Bin-card locations.",
          "1,280+ Authors and 180+ Publishers linked with royalty, discount, and bibliography records.",
          "Automated thermal barcode label generation supporting EAN/UPC scanners.",
          "Multi-tier price levels (Retail, Wholesale, Educational, VIP Discount levels).",
        ],
      },
      {
        title: "Complete Supply Chain & Logistics",
        category: "Inventory & Warehousing",
        features: [
          "Purchase Orders (PO) with supplier quote comparison and approval hierarchies.",
          "Good Receive Notes (GRN) with batch tracking, landed costs, and free-issue math.",
          "Accept Good Notes (AGN) for multi-stage warehouse receiving verification.",
          "Transfer Good Notes (TGN) & Returns (TGR) for seamless stock movement between Colombo and Jaffna branches.",
          "Supplier Return Notes (SRN) and Stock Adjustment write-offs.",
        ],
      },
      {
        title: "Omnichannel POS & Cashier Operations",
        category: "Point of Sale",
        features: [
          "Fast-response POS billing with 80mm thermal receipt printing and A4 invoices.",
          "Cashier session management: opening cash floats, shift handovers, and drawer balancing.",
          "Salesperson attribution and automated sales commission tracking.",
          "Dynamic discount engines supporting promotional codes, seasonal rules, and customer loyalty.",
        ],
      },
      {
        title: "Financial Accounting & COD Reconciliation",
        category: "Finance & Settlements",
        features: [
          "Cash-On-Delivery (COD) courier tracking, remittance verification, and reconciliation ledgers.",
          "Bank transfer payment verification with transaction slip matching.",
          "Customer payment receipts against credit accounts and corporate accounts.",
          "Payment Vouchers for supplier disbursements against validated GRNs.",
        ],
      },
      {
        title: "Business Intelligence & Automated Audits",
        category: "Reporting & Analytics",
        features: [
          "Real-time sales velocity monitoring across physical retail and digital storefronts.",
          "Inventory movement ledger with bin-card velocity and low-stock reorder triggers.",
          "Daily collection reports detailing cash, card, bank, and online payment methods.",
          "One-click Maatwebsite Excel exports for supplier audits and corporate tax filings.",
        ],
      },
      {
        title: "Security, RBAC & Cloud Architecture",
        category: "Infrastructure",
        features: [
          "Granular Role-Based Access Control (RBAC) via Spatie Permissions for 25+ modules.",
          "Laravel Sanctum token authentication with multi-branch location context.",
          "Automated daily MySQL database snapshots via Spatie Backup.",
          "AWS S3 & Flysystem integration for invoice PDFs, product covers, and receipts.",
        ],
      },
    ],
  },
  {
    id: "samudra-distribution",
    number: "02",
    title: "Samudra Distribution Web Application",
    shortTitle: "Samudra Distribution Network",
    category: "SUPPLY CHAIN & LOGISTICS",
    categoryKey: "logistics",
    role: "Full-Stack Software Engineer",
    clientOrScope: "Nationwide Supply Chain & Distribution",
    summary:
      "Centralized distribution management platform supporting real-time supply chain inventory tracking, order processing pipelines, and role-based administrative command dashboards.",
    techStack: [
      "React.js",
      "Laravel",
      "MySQL",
      "REST APIs",
      "Tailwind CSS",
      "RBAC",
      "JWT",
    ],
    metrics: [
      { label: "Operations Streamline", value: "Centralized" },
      { label: "Query Efficiency", value: "+40%" },
      { label: "Security", value: "RBAC & JWT" },
      { label: "Stock Visibility", value: "100% Real-Time" },
    ],
    highlights: [
      "Developed a centralized logistics platform coordinating warehouse inventory control, multi-depot order fulfillment, and operational dispatch reporting.",
      "Automated supply chain workflows through live stock tracking, stock transfer validation, and regional administrative dashboards.",
      "Designed secure RESTful APIs and restructured relational database schemas with strategic indexing, drastically improving query throughput.",
      "Engineered modular, reusable React design system components facilitating rapid feature expansion across administrative tiers.",
    ],
    architectureOverview:
      "Client-server architecture leveraging React single-page interface with centralized state management, connecting to a normalized Laravel MySQL backend with automated database transactional rollbacks.",
    mockupType: "distribution",
    liveUrl: "https://github.com/Thamalpath",
    githubUrl: "https://github.com/Thamalpath",
  },
  {
    id: "hotel-reservation-system",
    number: "03",
    title: "Web Hotel Reservation & Guest Booking Engine",
    shortTitle: "Web Hotel Reservation System",
    category: "HOSPITALITY & BOOKING ENGINE",
    categoryKey: "enterprise",
    role: "Full-Stack Web Developer",
    clientOrScope: "Hospitality Resort & Property Network",
    summary:
      "High-concurrency hotel reservation platform featuring an interactive real-time room availability matrix, automated conflict resolution, and end-to-end guest reservation workflows.",
    techStack: [
      "React.js",
      "Laravel",
      "MySQL",
      "REST APIs",
      "Tailwind CSS",
      "Axios",
    ],
    metrics: [
      { label: "Booking Conflicts", value: "0% Overlap" },
      { label: "Calendar Sync", value: "Real-Time" },
      { label: "Device Coverage", value: "Mobile & 4K" },
      { label: "API Latency", value: "< 120ms" },
    ],
    highlights: [
      "Engineered an interactive room booking platform supporting room tier availability, guest profile management, and administrative booking management.",
      "Implemented a real-time room availability calendar with instant conflict avoidance algorithms preventing concurrent booking collisions.",
      "Integrated secure RESTful APIs bridging customer reservation portals with back-office housekeeping and accounting systems.",
      "Delivered responsive, accessible React.js interfaces ensuring effortless booking flows across smartphones, tablets, and desktop workstations.",
    ],
    architectureOverview:
      "Layered REST architecture with asynchronous calendar state polling, rate-limiting locks during checkout reservation holds, and transactional database integrity checks.",
    mockupType: "hotel",
    liveUrl: "https://github.com/Thamalpath",
    githubUrl: "https://github.com/Thamalpath",
  },
  {
    id: "smart-school-system",
    number: "04",
    title: "Smart School Academic & Institutional Management System",
    shortTitle: "Smart School Management System",
    category: "EDTECH & ACADEMIC PLATFORM",
    categoryKey: "edtech",
    role: "Full-Stack Developer",
    clientOrScope: "Education Institute & Campus Operations",
    summary:
      "Comprehensive institutional management platform orchestrating student records, daily attendance tracking, academic administration, and real-time performance analytics dashboards.",
    techStack: [
      "React.js",
      "Express.js",
      "Node.js",
      "Tailwind CSS",
      "MySQL",
      "Chart.js",
    ],
    metrics: [
      { label: "Data Integrity", value: "99.9%" },
      { label: "Admin Reporting", value: "Instantaneous" },
      { label: "Role Tiers", value: "Multi-Level RBAC" },
      { label: "Analytics", value: "Live Radar & Trends" },
    ],
    highlights: [
      "Engineered institutional software supporting automated attendance logging, student academic history, teacher assignments, and course catalogs.",
      "Built interactive analytics dashboards providing real-time visual insights into student performance percentiles and campus operations.",
      "Constructed multi-tier approval workflows and secure data validation layers to safeguard sensitive academic and financial records.",
      "Collaborated within an Agile team environment utilizing Git version control, continuous peer code reviews, and modular component separation.",
    ],
    architectureOverview:
      "Node.js & Express RESTful API back-plane integrated with normalized MySQL tables, supporting token-authenticated sessions and high-performance analytical aggregates.",
    mockupType: "school",
    liveUrl: "https://github.com/Thamalpath",
    githubUrl: "https://github.com/Thamalpath",
  },
  {
    id: "multi-tenant-pms",
    number: "05",
    title: "Enterprise Multi-Tenant Hotel & Villa Booking Platform",
    shortTitle: "Multi-Tenant Villa PMS",
    category: "MULTI-TENANT SAAS & PMS",
    categoryKey: "enterprise",
    role: "Software Engineer (Onimta IT)",
    clientOrScope: "Enterprise Multi-Property SaaS Client",
    summary:
      "Multi-tenant property management platform architected for boutique hotels and villa networks, supporting tenant isolation, automated invoicing, and live occupancy grids.",
    techStack: [
      "Next.js",
      "React.js",
      "TypeScript",
      "Laravel",
      "PostgreSQL",
      "Docker",
      "Tailwind CSS",
    ],
    metrics: [
      { label: "Tenant Isolation", value: "Row-Level Security" },
      { label: "Property Scale", value: "Multi-Chain" },
      { label: "Concurrency", value: "High-Throughput" },
      { label: "Invoice Engine", value: "Automated PDF/SMS" },
    ],
    highlights: [
      "Delivered multi-tenant property management architecture allowing property managers to orchestrate independent hotel and villa portfolios.",
      "Implemented a dynamic rate calculation engine with seasonal modifiers, room category pricing, and automated invoice dispatches.",
      "Strengthened tenant isolation and data protection through Row-Level Security policies and scoped JWT authorization guards.",
      "Containerized microservices using Docker for streamlined testing, environment parity, and CI/CD deployment pipelines.",
    ],
    architectureOverview:
      "Multi-tenant database schema architecture with shared database and isolated tenant schemas, powered by Next.js frontends and Laravel API services.",
    mockupType: "pms",
    liveUrl: "https://github.com/Thamalpath",
    githubUrl: "https://github.com/Thamalpath",
  },
  {
    id: "financial-analytics-intelligence",
    number: "06",
    title: "Financial Analytics & Inventory Intelligence Dashboard",
    shortTitle: "Financial Analytics Engine",
    category: "BUSINESS INTELLIGENCE & ANALYTICS",
    categoryKey: "enterprise",
    role: "Full-Stack Web Developer",
    clientOrScope: "Enterprise Retail Operations & C-Suite Suite",
    summary:
      "Real-time executive business intelligence suite delivering sales velocity forecasting, inventory turnover metrics, and audit-ready financial reporting modules.",
    techStack: [
      "React.js",
      "TypeScript",
      "Node.js",
      "Chart.js",
      "MySQL",
      "Tailwind CSS",
      "WebSockets",
    ],
    metrics: [
      { label: "Data Refresh", value: "Real-Time WebSocket" },
      { label: "Reporting Speed", value: "Sub-Second" },
      { label: "Audit Accuracy", value: "100% Reconciled" },
      { label: "Chart Render", value: "60 FPS Hardware GPU" },
    ],
    highlights: [
      "Built real-time telemetry dashboards reporting daily sales volume, product category profit margins, and inventory restocking triggers.",
      "Engineered automated export microservices compiling audit-ready balance sheets, revenue breakdowns, and tax summaries.",
      "Implemented high-density SVG sparklines and interactive Chart.js visualizations with customizable timeframe filters.",
      "Integrated WebSocket channels for instant push updates when large warehouse bulk orders or sales transactions clear.",
    ],
    architectureOverview:
      "Event-driven WebSocket stream combined with cached MySQL aggregation queries, optimizing dashboard load latency to under 180ms.",
    mockupType: "analytics",
    liveUrl: "https://github.com/Thamalpath",
    githubUrl: "https://github.com/Thamalpath",
  },
  {
    id: "notification-reporting-microservice",
    number: "07",
    title: "Automated Notification & Reporting Microservice",
    shortTitle: "Automation & Notification Engine",
    category: "AUTOMATION & CLOUD WORKFLOWS",
    categoryKey: "services",
    role: "Full-Stack Web Developer (Intellect Choice)",
    clientOrScope: "Distributed Background Service Architecture",
    summary:
      "High-throughput automation engine that improved operational efficiency by 30% through automated batch reporting, CRUD workflows, and transactional notification dispatches.",
    techStack: [
      "Node.js",
      "Express.js",
      "MySQL",
      "REST APIs",
      "Swagger",
      "cron",
      "Docker",
    ],
    metrics: [
      { label: "Operational Gain", value: "+30% Velocity" },
      { label: "Notification SLA", value: "99.98% Delivered" },
      { label: "API Spec", value: "Swagger OpenAPI" },
      { label: "Batch Scale", value: "10k+ Daily" },
    ],
    highlights: [
      "Automated complex institutional reporting, scheduled data rollups, and bulk email/SMS notification dispatches across platforms.",
      "Designed resilient background queue workers with exponential backoff retries, ensuring zero dropped transactional messages.",
      "Documented all public and internal REST endpoints using Swagger OpenAPI standards, simplifying cross-team developer integration.",
      "Containerized microservices within Docker configurations for consistent cloud deployment and horizontal auto-scaling.",
    ],
    architectureOverview:
      "Asynchronous Node.js microservice architecture with cron job dispatchers, worker queues, and connection-pooled MySQL persistence.",
    mockupType: "microservice",
    liveUrl: "https://github.com/Thamalpath",
    githubUrl: "https://github.com/Thamalpath",
  },
  {
    id: "rbac-identity-gateway",
    number: "08",
    title: "Enterprise RBAC & Identity Security Gateway",
    shortTitle: "Enterprise Identity Gateway",
    category: "CYBERSECURITY & ACCESS CONTROL",
    categoryKey: "services",
    role: "Backend Software Engineer (Onimta IT)",
    clientOrScope: "Centralized Microservices Security Hub",
    summary:
      "Robust identity authentication gateway and Role-Based Access Control architecture protecting 25+ enterprise microservices with cryptographic token validation and audit logging.",
    techStack: [
      "Laravel",
      "Node.js",
      "JWT",
      "RESTful APIs",
      "MySQL",
      "Redis",
      "Postman",
    ],
    metrics: [
      { label: "Protected Modules", value: "25+ Platforms" },
      { label: "Data Integrity", value: "99.9% Uptime" },
      { label: "Token Cryptography", value: "RSA JWT" },
      { label: "Audit Footprint", value: "100% Logged" },
    ],
    highlights: [
      "Strengthened application security across multiple enterprise platforms by implementing granular Role-Based Access Control (RBAC).",
      "Constructed JWT token verification middleware with automated refresh cycles, token revocation blacklists, and rate-limiting safeguards.",
      "Implemented tamper-proof audit trails logging sensitive data mutations with user ID, timestamp, and client network fingerprinting.",
      "Validated end-to-end security postures through automated Postman API integration suites and security penetration tests.",
    ],
    architectureOverview:
      "Centralized stateless authentication gateway with fast in-memory Redis session token caching, validating bearer tokens before forwarding requests to internal services.",
    mockupType: "security",
    liveUrl: "https://github.com/Thamalpath",
    githubUrl: "https://github.com/Thamalpath",
  },
];

// ============================================================================
// Category Filters
// ============================================================================
const CATEGORY_TABS = [
  { key: "all", label: "ALL PROJECTS" },
  { key: "enterprise", label: "ENTERPRISE" },
  { key: "ecommerce", label: "ECOMMERCE & CRM" },
  { key: "logistics", label: "SUPPLY CHAIN" },
  { key: "edtech", label: "EDTECH" },
  { key: "services", label: "MICROSERVICES" },
] as const;

// ============================================================================
// Interactive Cyber Project Mockup UI Renderers (Custom Bespoke Mini-UIs)
// ============================================================================
function ProjectMockupVisual({
  type,
  item,
}: {
  type: ProjectItem["mockupType"];
  item: ProjectItem;
}) {
  const gradientId = useId();

  // If project has real photographic enterprise screenshots, render real preview!
  if (item.gallery && item.gallery.length > 0) {
    return (
      <div className="relative w-full h-full overflow-hidden group/thumb bg-[#01030a] select-none">
        <Image
          src={item.gallery[0].src}
          alt={item.title}
          fill
          sizes="(max-width: 768px) 100vw, 550px"
          className="object-cover object-top transition-transform duration-700 group-hover/thumb:scale-105"
        />
        {/* Subtle Cyber Gradient Vignette */}
        <div className="absolute inset-0 bg-linear-to-t from-[#01040f] via-transparent to-[#01040f]/60 pointer-events-none" />

        {/* Top Floating Telemetry Pills */}
        <div className="absolute top-2 left-2 right-2 flex items-center justify-between pointer-events-none z-10">
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#020614]/90 border border-sky-400/50 backdrop-blur-md shadow-[0_0_12px_rgba(56,189,248,0.35)]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[7.5px] font-mono tracking-widest text-sky-200 uppercase font-semibold">
              {item.gallery[0].badge}
            </span>
          </div>
          <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#020614]/90 border border-sky-500/30 backdrop-blur-md text-[7.5px] font-mono text-sky-300">
            <span>{item.gallery.length} REAL SCREENS</span>
          </div>
        </div>

        {/* Bottom Floating Caption Bar */}
        <div className="absolute bottom-2 inset-x-2 flex items-center justify-between px-2.5 py-1.5 rounded bg-[#01030a]/90 border border-sky-500/30 backdrop-blur-md z-10">
          <span className="font-mono text-[8px] text-zinc-200 tracking-wider uppercase truncate max-w-[210px] font-medium">
            {item.gallery[0].title}
          </span>
          <span className="text-[7.5px] font-mono text-emerald-400 font-bold tracking-wider shrink-0">
            ENTERPRISE LIVE
          </span>
        </div>
      </div>
    );
  }

  switch (type) {
    case "ecommerce":
      return (
        <div className="relative w-full h-full p-3 flex flex-col justify-between bg-linear-to-b from-[#051124] to-[#020712] overflow-hidden select-none">
          {/* Top Bar with Microservices Indicator */}
          <div className="flex items-center justify-between text-[8px] font-mono border-b border-sky-500/20 pb-2">
            <span className="flex items-center gap-1.5 text-sky-300">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              PAYHERE LIVE · DUAL MICROSERVICES
            </span>
            <span className="text-zinc-500">25+ MODULES ACTIVE</span>
          </div>

          {/* Metric Cards Row */}
          <div className="grid grid-cols-3 gap-2 my-1.5">
            <div className="bg-[#030919]/90 border border-sky-500/25 rounded p-1.5">
              <p className="text-[7.5px] font-mono text-zinc-400">
                SALES VELOCITY
              </p>
              <p className="text-xs font-bold text-sky-300 font-cinzel">
                +30% SPD
              </p>
            </div>
            <div className="bg-[#030919]/90 border border-sky-500/25 rounded p-1.5">
              <p className="text-[7.5px] font-mono text-zinc-400">INVENTORY</p>
              <p className="text-xs font-bold text-emerald-400 font-cinzel">
                SYNCED
              </p>
            </div>
            <div className="bg-[#030919]/90 border border-sky-500/25 rounded p-1.5">
              <p className="text-[7.5px] font-mono text-zinc-400">GATEWAY</p>
              <p className="text-xs font-bold text-sky-400 font-cinzel">
                256-BIT
              </p>
            </div>
          </div>

          {/* Mini Real-Time Sparkline Wave */}
          <div className="relative h-12 w-full bg-[#02050f]/80 rounded border border-sky-500/15 overflow-hidden flex items-end px-2 pt-1">
            <svg
              className="w-full h-full"
              viewBox="0 0 100 40"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient
                  id={`${gradientId}-ecom`}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.45" />
                  <stop offset="100%" stopColor="#0284c7" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              <path
                d="M0,32 Q15,10 30,22 T60,8 T85,18 T100,5 L100,40 L0,40 Z"
                fill={`url(#${gradientId}-ecom)`}
              />
              <path
                d="M0,32 Q15,10 30,22 T60,8 T85,18 T100,5"
                fill="none"
                stroke="#38bdf8"
                strokeWidth="1.8"
              />
            </svg>
            <div className="absolute top-1 left-2 text-[7px] font-mono text-sky-400/80">
              REAL-TIME TRANSACTION THROUGHPUT
            </div>
          </div>
        </div>
      );

    case "distribution":
      return (
        <div className="relative w-full h-full p-3 flex flex-col justify-between bg-linear-to-b from-[#041122] to-[#010611] overflow-hidden select-none">
          <div className="flex items-center justify-between text-[8px] font-mono border-b border-sky-500/20 pb-2">
            <span className="flex items-center gap-1.5 text-sky-300">
              <span className="h-1.5 w-1.5 rounded-full bg-sky-400 animate-pulse" />
              SAMUDRA DISTRIBUTION · LOGISTICS MAP
            </span>
            <span className="text-zinc-500">RBAC SECURED</span>
          </div>

          {/* Supply Chain Node Map */}
          <div className="relative h-14 w-full bg-[#02050e] rounded border border-sky-500/20 my-1.5 flex items-center justify-between px-3 overflow-hidden">
            <div className="relative z-10 flex flex-col items-center">
              <span className="w-2.5 h-2.5 rounded-full bg-sky-400 shadow-[0_0_8px_#38bdf8]" />
              <span className="text-[7px] font-mono text-zinc-300 mt-1">
                HQ DEPOT
              </span>
            </div>
            <div className="flex-1 h-0.5 bg-linear-to-r from-sky-400 via-sky-300 to-blue-500 mx-2 relative overflow-hidden">
              <div className="absolute inset-0 bg-white/70 animate-[move-right_2s_linear_infinite] w-1/3" />
            </div>
            <div className="relative z-10 flex flex-col items-center">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-[0_0_8px_#0ea5e9]" />
              <span className="text-[7px] font-mono text-zinc-300 mt-1">
                REGIONAL
              </span>
            </div>
            <div className="flex-1 h-0.5 bg-linear-to-r from-blue-500 via-sky-400 to-emerald-400 mx-2 relative overflow-hidden">
              <div className="absolute inset-0 bg-white/70 animate-[move-right_2s_linear_infinite_0.5s] w-1/3" />
            </div>
            <div className="relative z-10 flex flex-col items-center">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#10b981]" />
              <span className="text-[7px] font-mono text-zinc-300 mt-1">
                OUTLET
              </span>
            </div>
          </div>

          {/* Metrics summary */}
          <div className="flex items-center justify-between text-[7.5px] font-mono text-zinc-400 bg-[#030919] px-2 py-1 rounded border border-sky-500/15">
            <span>INVENTORY DISPATCH: 100%</span>
            <span className="text-sky-300">QUERY VELOCITY: +40%</span>
          </div>
        </div>
      );

    case "hotel":
      return (
        <div className="relative w-full h-full p-3 flex flex-col justify-between bg-linear-to-b from-[#051126] to-[#010613] overflow-hidden select-none">
          <div className="flex items-center justify-between text-[8px] font-mono border-b border-sky-500/20 pb-2">
            <span className="flex items-center gap-1.5 text-sky-300">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
              HOTEL PMS · ROOM CALENDAR MATRIX
            </span>
            <span className="text-zinc-500">0% CONFLICT SLA</span>
          </div>

          {/* Calendar Room Grid */}
          <div className="grid grid-cols-6 gap-1 my-1.5 bg-[#02050f] p-1.5 rounded border border-sky-500/20">
            {["R101", "R102", "R103", "R201", "R202", "VILLA 1"].map(
              (room, idx) => (
                <div
                  key={room}
                  className={`flex flex-col items-center justify-center py-1.5 rounded text-[7px] font-mono border ${
                    idx === 1 || idx === 4
                      ? "bg-sky-950/80 border-sky-400 text-sky-200 shadow-[0_0_6px_rgba(56,189,248,0.3)]"
                      : "bg-[#030815] border-zinc-800 text-zinc-400"
                  }`}
                >
                  <span>{room}</span>
                  <span
                    className={
                      idx === 1 || idx === 4
                        ? "text-emerald-400"
                        : "text-sky-400"
                    }
                  >
                    {idx === 1 || idx === 4 ? "BOOKED" : "OPEN"}
                  </span>
                </div>
              ),
            )}
          </div>

          <div className="flex items-center justify-between text-[7.5px] font-mono text-zinc-400 bg-[#030919] px-2 py-1 rounded border border-sky-500/15">
            <span>AVAILABILITY ENGINE: ACTIVE</span>
            <span className="text-sky-300">API LATENCY: &lt;120MS</span>
          </div>
        </div>
      );

    case "school":
      return (
        <div className="relative w-full h-full p-3 flex flex-col justify-between bg-linear-to-b from-[#041021] to-[#01050e] overflow-hidden select-none">
          <div className="flex items-center justify-between text-[8px] font-mono border-b border-sky-500/20 pb-2">
            <span className="flex items-center gap-1.5 text-sky-300">
              <span className="h-1.5 w-1.5 rounded-full bg-sky-400 animate-pulse" />
              SMART SCHOOL · ACADEMIC ANALYTICS
            </span>
            <span className="text-zinc-500">99.9% INTEGRITY</span>
          </div>

          {/* Academic Percentile Bar Chart */}
          <div className="flex items-end justify-between gap-1.5 h-12 bg-[#02050e] p-2 rounded border border-sky-500/20 my-1">
            {[45, 78, 62, 92, 85, 74, 96].map((height, i) => (
              <div
                key={i}
                className="flex-1 flex flex-col items-center gap-0.5"
              >
                <div
                  style={{ height: `${height * 0.35}px` }}
                  className={`w-full rounded-t ${
                    i === 3 || i === 6
                      ? "bg-sky-400 shadow-[0_0_8px_#38bdf8]"
                      : "bg-sky-800/80"
                  }`}
                />
                <span className="text-[6.5px] font-mono text-zinc-500">
                  M{i + 1}
                </span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between text-[7.5px] font-mono text-zinc-400 bg-[#030919] px-2 py-1 rounded border border-sky-500/15">
            <span>ATTENDANCE RADAR: 98.4%</span>
            <span className="text-emerald-400">APPROVALS: OK</span>
          </div>
        </div>
      );

    case "analytics":
    case "pms":
    case "microservice":
    case "security":
    default:
      return (
        <div className="relative w-full h-full p-3 flex flex-col justify-between bg-linear-to-b from-[#051124] to-[#020712] overflow-hidden select-none">
          <div className="flex items-center justify-between text-[8px] font-mono border-b border-sky-500/20 pb-2">
            <span className="flex items-center gap-1.5 text-sky-300">
              <span className="h-1.5 w-1.5 rounded-full bg-sky-400 animate-pulse" />
              {item.category}
            </span>
            <span className="text-zinc-500">RESTful MICROSERVICES</span>
          </div>

          {/* Central Architecture Telemetry HUD */}
          <div className="grid grid-cols-2 gap-2 my-1.5">
            <div className="bg-[#02050f] border border-sky-500/20 rounded p-1.5 flex flex-col justify-center">
              <span className="text-[7.5px] font-mono text-zinc-400">
                ARCHITECTURE
              </span>
              <span className="text-[11px] font-bold text-sky-300 font-cinzel">
                REST & JWT
              </span>
            </div>
            <div className="bg-[#02050f] border border-sky-500/20 rounded p-1.5 flex flex-col justify-center">
              <span className="text-[7.5px] font-mono text-zinc-400">
                DATA RELIABILITY
              </span>
              <span className="text-[11px] font-bold text-emerald-400 font-cinzel">
                99.9% PROD
              </span>
            </div>
          </div>

          {/* Tech Pills Footer */}
          <div className="flex items-center gap-1 overflow-x-hidden text-[7px] font-mono text-sky-300/80">
            {item.techStack.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="bg-sky-950/70 border border-sky-500/30 px-1 py-0.5 rounded"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      );
  }
}

// ============================================================================
// Projects Section Component
// ============================================================================
export function Projects() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isAutoOrbit, setIsAutoOrbit] = useState<boolean>(true);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(
    null,
  );
  const [modalGalleryIndex, setModalGalleryIndex] = useState<number>(0);

  // Touch and drag tracking
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  // Filtered projects
  const filteredProjects = useMemo(() => {
    if (activeCategory === "all") return PROJECTS_DATA;
    return PROJECTS_DATA.filter((p) => p.categoryKey === activeCategory);
  }, [activeCategory]);

  // Safe active index boundary clamp
  const safeIndex = useMemo(() => {
    if (filteredProjects.length === 0) return 0;
    return Math.min(Math.max(activeIndex, 0), filteredProjects.length - 1);
  }, [activeIndex, filteredProjects.length]);

  const activeProject = filteredProjects[safeIndex] || filteredProjects[0];

  // Navigation handlers
  const handlePrev = useCallback(() => {
    setActiveIndex((prev) =>
      prev > 0 ? prev - 1 : filteredProjects.length - 1,
    );
  }, [filteredProjects.length]);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) =>
      prev < filteredProjects.length - 1 ? prev + 1 : 0,
    );
  }, [filteredProjects.length]);

  // Touch swipe support for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const diffX = e.changedTouches[0].clientX - touchStartX;
    if (diffX > 45) {
      handlePrev();
    } else if (diffX < -45) {
      handleNext();
    }
    setTouchStartX(null);
  };

  // Auto orbit ticker
  useEffect(() => {
    if (!isAutoOrbit || isHovered || selectedProject !== null) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) =>
        prev < filteredProjects.length - 1 ? prev + 1 : 0,
      );
    }, 4500);

    return () => clearInterval(interval);
  }, [isAutoOrbit, isHovered, selectedProject, filteredProjects.length]);

  // Keyboard navigation & ESC handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedProject(null);
      } else if (!selectedProject) {
        if (e.key === "ArrowLeft") handlePrev();
        if (e.key === "ArrowRight") handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedProject, handlePrev, handleNext]);

  return (
    <section
      id="projects"
      className="relative w-full overflow-hidden bg-[#010206] text-white pt-5 sm:pt-6 lg:pt-8 pb-6 sm:pb-8 px-3 sm:px-6 md:px-10 lg:px-12 select-none min-h-165 lg:min-h-185 flex flex-col justify-between"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* ==================================================================== */}
      {/* 1. Cinematic Realistic Cyber Arena Background (public/project_bg.png) */}
      {/* ==================================================================== */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      >
        <Image
          src="/project_bg.png"
          alt="Cyber amphitheater arena background"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-85 brightness-95 contrast-105"
        />

        {/* Top Horizon Fade - Seamlessly melts into previous section */}
        <div className="absolute inset-x-0 top-0 h-24 sm:h-36 bg-linear-to-b from-[#010206] via-[#010206]/80 to-transparent" />

        {/* Bottom Horizon Fade - Dissolves smoothly into pure #010206 */}
        <div className="absolute inset-x-0 bottom-0 h-24 sm:h-36 bg-linear-to-t from-[#010206] via-[#010206]/85 to-transparent" />

        {/* Soft Center Vignette for Enhanced Card Readability */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(1,2,6,0.5)_75%,#010206_100%)]" />
      </div>

      {/* Dynamic Laser Horizon Seam on Section Boundary */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 inset-x-0 h-0.5 bg-linear-to-r from-transparent via-sky-400 to-transparent shadow-[0_0_24px_rgba(56,189,248,0.85)] z-30"
      />

      {/* ==================================================================== */}
      {/* 2. Top Executive HUD Bar: Left Editorial Motto & Right Navigation    */}
      {/* ==================================================================== */}
      <div className="relative z-30 w-full max-w-7xl xl:max-w-screen-2xl 2xl:max-w-[1760px] mx-auto flex items-start justify-between gap-4 mb-2 sm:mb-3">
        {/* Top-Left Stacked Typography (Matching Reference Image 1) */}
        <div className="flex flex-col text-left items-start">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-sky-400 shadow-[0_0_8px_#38bdf8] animate-pulse" />
            <h2 className="font-cinzel text-xl sm:text-2xl md:text-3xl font-extrabold tracking-[0.24em] text-white uppercase drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)]">
              PROJECTS
            </h2>
          </div>

          {/* Editorial Hairline Divider */}
          <div className="w-12 h-px bg-linear-to-r from-sky-400/70 to-transparent my-0.5 sm:my-1" />

          {/* 4 Stacked Motto Words */}
          <div className="flex flex-col gap-0.5 font-cinzel text-[9px] sm:text-[10px] tracking-[0.26em] text-zinc-400 uppercase leading-relaxed">
            <span>IDEAS</span>
            <span>INTERFACES</span>
            <span>EXPERIENCES</span>
            <span className="font-bold text-sky-400 drop-shadow-[0_0_12px_rgba(56,189,248,0.85)]">
              REAL IMPACT
            </span>
          </div>
        </div>

        {/* Top-Right Stacked Guidance & Navigation (Matching Reference Image 1) */}
        <div className="flex flex-col items-end text-right">
          <div className="flex flex-col gap-0.5 font-cinzel text-[9px] sm:text-[10px] tracking-[0.26em] text-zinc-400 uppercase leading-relaxed mb-1 sm:mb-2">
            <span>SCROLL</span>
            <span>EXPLORE</span>
            <span className="text-zinc-200">INTERACT</span>
          </div>

          {/* Subtle Hairline */}
          <div className="w-10 h-px bg-linear-to-l from-sky-400/60 to-transparent mb-2" />

          {/* Interactive Prev / Next / Auto-Orbit HUD Controls */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous project"
              className="p-1.5 sm:p-2 rounded-sm border border-blue-900/70 bg-[#050b18]/85 text-zinc-300 hover:text-sky-300 hover:border-sky-400/80 active:scale-95 transition shadow-[0_0_12px_rgba(0,0,0,0.8)] cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Project Index Counter */}
            <div className="font-cinzel text-xs sm:text-sm font-bold tracking-[0.2em] text-sky-300 px-1.5 min-w-16 text-center">
              {String(safeIndex + 1).padStart(2, "0")} /{" "}
              {String(filteredProjects.length).padStart(2, "0")}
            </div>

            <button
              type="button"
              onClick={handleNext}
              aria-label="Next project"
              className="p-1.5 sm:p-2 rounded-sm border border-blue-900/70 bg-[#050b18]/85 text-zinc-300 hover:text-sky-300 hover:border-sky-400/80 active:scale-95 transition shadow-[0_0_12px_rgba(0,0,0,0.8)] cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            {/* Orbit / Autoplay Toggle */}
            <button
              type="button"
              onClick={() => setIsAutoOrbit((prev) => !prev)}
              title={isAutoOrbit ? "Pause auto-orbit" : "Resume auto-orbit"}
              className={`p-1.5 sm:p-2 rounded-sm border transition-all cursor-pointer ${
                isAutoOrbit
                  ? "border-sky-400 bg-sky-950/80 text-sky-300 shadow-[0_0_14px_rgba(56,189,248,0.4)]"
                  : "border-zinc-800 bg-[#050b18]/80 text-zinc-500 hover:text-zinc-300"
              }`}
            >
              {isAutoOrbit ? (
                <Pause className="w-3.5 h-3.5" />
              ) : (
                <Play className="w-3.5 h-3.5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* ==================================================================== */}
      {/* 4. Category Filter Selector Pills                                    */}
      {/* ==================================================================== */}
      <div className="relative z-30 w-full max-w-7xl mx-auto flex items-center justify-center gap-1.5 sm:gap-2 flex-wrap mb-1 sm:mb-2">
        {CATEGORY_TABS.map((tab) => {
          const isActive = activeCategory === tab.key;
          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => {
                setActiveCategory(tab.key);
                setActiveIndex(0);
              }}
              className={`px-3 py-1 sm:px-3.5 sm:py-1 rounded-full text-[8.5px] sm:text-[9.5px] font-mono tracking-widest uppercase transition-all duration-300 cursor-pointer ${
                isActive
                  ? "border border-sky-400 bg-sky-950/80 text-sky-200 shadow-[0_0_14px_rgba(56,189,248,0.45)] scale-105"
                  : "border border-zinc-800/80 bg-[#030713]/60 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* ==================================================================== */}
      {/* 5. Central 3D Amphitheater Arena with Floating Project Cards          */}
      {/* ==================================================================== */}
      <div
        className="relative z-20 w-full max-w-7xl xl:max-w-screen-2xl 2xl:max-w-[1760px] mx-auto flex-1 flex flex-col items-center justify-center my-0 py-0"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* ================================================================ */}
        {/* 3D Curved Cylindrical Carousel of Floating Cards                 */}
        {/* ================================================================ */}
        <div
          className="relative w-full h-[350px] sm:h-[390px] md:h-[420px] lg:h-[440px] flex items-center justify-center"
          style={{ perspective: "1500px" }}
        >
          {filteredProjects.map((project, idx) => {
            const total = filteredProjects.length;
            // Circular offset around activeIndex
            let diff = idx - safeIndex;
            if (diff > total / 2) diff -= total;
            if (diff < -total / 2) diff += total;

            const isCenter = diff === 0;
            const isImmediate = Math.abs(diff) === 1;
            const isVisible = Math.abs(diff) <= 2;

            if (!isVisible) return null;

            // Compute 3D Cylindrical Geometry
            // center card: rotY=0, transX=0, scale=1
            // left card: rotY=22, transX=-340px, scale=0.88
            // right card: rotY=-22, transX=340px, scale=0.88
            const rotateY = diff * -18;
            const translateX = diff * 320;
            const translateZ =
              Math.abs(diff) === 0 ? 80 : -Math.abs(diff) * 110;
            const scale = isCenter ? 1.05 : isImmediate ? 0.88 : 0.76;
            const opacity = isCenter ? 1 : isImmediate ? 0.72 : 0.38;
            const zIndex = 30 - Math.abs(diff) * 10;

            return (
              <div
                key={project.id}
                onClick={() => setActiveIndex(idx)}
                style={{
                  transform: `translate3d(${translateX}px, 0, ${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                  opacity,
                  zIndex,
                  transition: "all 600ms cubic-bezier(0.25, 1, 0.5, 1)",
                }}
                className={`absolute w-[92vw] max-w-[370px] sm:max-w-[430px] md:max-w-[480px] lg:max-w-[530px] rounded-xl border overflow-hidden cursor-pointer backdrop-blur-xl transition-[border-color,box-shadow] duration-500 will-change-transform ${
                  isCenter
                    ? "bg-[#030919]/95 border-sky-400/90 shadow-[0_0_35px_rgba(56,189,248,0.38),0_20px_50px_rgba(0,0,0,0.95)]"
                    : "bg-[#02050f]/85 border-sky-500/25 shadow-[0_10px_30px_rgba(0,0,0,0.85)] hover:border-sky-400/50 hover:opacity-90"
                }`}
              >
                {/* Luminous Top Seam Beam for Active Card */}
                {isCenter && (
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute top-0 inset-x-0 h-1 bg-linear-to-r from-transparent via-sky-300 to-transparent shadow-[0_0_14px_#38bdf8] z-30"
                  />
                )}

                {/* Card Top Window HUD Bar */}
                <div className="relative z-10 w-full flex items-center justify-between px-3.5 py-2.5 bg-[#01030a]/90 border-b border-sky-500/20">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-sky-400 tracking-wider">
                      {project.number}
                    </span>
                    <span className="text-zinc-600">/</span>
                    <span className="font-mono text-[8.5px] tracking-[0.22em] text-zinc-300 uppercase truncate max-w-[200px] sm:max-w-[280px]">
                      {project.category}
                    </span>
                  </div>

                  {/* Window Control LED Dots */}
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-400/80" />
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-300/60" />
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500/40" />
                  </div>
                </div>

                {/* Card Main Body: Split between Title Info & Live Visual Mockup */}
                <div className="p-3.5 sm:p-4 flex flex-col justify-between gap-3">
                  {/* Title & Client Scope */}
                  <div>
                    <h3 className="font-cinzel text-base sm:text-lg md:text-xl font-bold tracking-wide text-white leading-snug line-clamp-1 group-hover:text-sky-200">
                      {project.title}
                    </h3>
                    <p className="font-mono text-[9px] sm:text-[9.5px] text-sky-400/90 tracking-widest uppercase mt-0.5">
                      {project.clientOrScope}
                    </p>
                  </div>

                  {/* High-Tech Visual Mockup Screen Frame */}
                  <div className="relative w-full h-32 sm:h-36 md:h-40 rounded-lg border border-sky-500/30 overflow-hidden bg-[#02050f] shadow-inner">
                    <ProjectMockupVisual
                      type={project.mockupType}
                      item={project}
                    />
                  </div>

                  {/* Key Metrics Chips */}
                  <div className="grid grid-cols-2 gap-2 text-[8px] sm:text-[8.5px] font-mono">
                    {project.metrics.slice(0, 2).map((m, mIdx) => (
                      <div
                        key={mIdx}
                        className="bg-[#020612]/90 border border-sky-500/20 px-2 py-1 rounded flex items-center justify-between"
                      >
                        <span className="text-zinc-400">{m.label}:</span>
                        <span className="font-bold text-sky-300">
                          {m.value}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Card Footer: Tech Stack Badges & CTA */}
                  <div className="flex items-center justify-between pt-1 border-t border-sky-500/15 gap-2">
                    <div className="flex items-center gap-1 overflow-x-hidden flex-1">
                      {project.techStack.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="text-[8px] font-mono text-zinc-400 bg-sky-950/40 border border-sky-500/20 px-1.5 py-0.5 rounded truncate"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.techStack.length > 3 && (
                        <span className="text-[8px] font-mono text-zinc-500">
                          +{project.techStack.length - 3}
                        </span>
                      )}
                    </div>

                    {/* View Project Button */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedProject(project);
                        setModalGalleryIndex(0);
                      }}
                      className="group/cta inline-flex items-center gap-1 px-3 py-1.5 rounded-sm border border-sky-400/70 bg-sky-950/70 hover:bg-sky-400 hover:text-black text-sky-300 font-mono text-[9px] tracking-wider uppercase transition-all duration-300 shrink-0 cursor-pointer shadow-[0_0_12px_rgba(56,189,248,0.25)]"
                    >
                      <span>VIEW PROJECT</span>
                      <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ==================================================================== */}
      {/* 6. Bottom Navigation Controls & Interactive Pagination Dots          */}
      {/* ==================================================================== */}
      <div className="relative z-30 w-full max-w-7xl mx-auto flex items-center justify-between pt-4 pb-2 border-t border-sky-500/15">
        <span className="font-mono text-[8.5px] sm:text-[9.5px] tracking-[0.24em] text-zinc-500 uppercase">
          PROJECT MATRIX · 3D ORBIT ARTIFACT
        </span>

        {/* Interactive Dots for all projects */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {filteredProjects.map((p, idx) => {
            const isActive = idx === safeIndex;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => setActiveIndex(idx)}
                aria-label={`Jump to ${p.title}`}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  isActive
                    ? "w-6 sm:w-8 h-1.5 bg-sky-400 shadow-[0_0_10px_#38bdf8]"
                    : "w-1.5 sm:w-2 h-1.5 bg-zinc-700 hover:bg-sky-500/70"
                }`}
              />
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => {
            setSelectedProject(activeProject);
            setModalGalleryIndex(0);
          }}
          className="inline-flex items-center gap-1 font-mono text-[8.5px] sm:text-[9.5px] tracking-[0.2em] text-sky-400 uppercase hover:text-white transition cursor-pointer"
        >
          <span>INSPECT DETAILS</span>
          <ArrowUpRight className="w-3 h-3" />
        </button>
      </div>

      {/* ==================================================================== */}
      {/* 7. Executive Project Deep-Dive Inspector Modal                       */}
      {/* ==================================================================== */}
      {selectedProject && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-300"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="relative w-full max-w-4xl lg:max-w-5xl max-h-[92vh] bg-[#02050f]/98 border border-sky-400/80 rounded-2xl shadow-[0_0_60px_rgba(56,189,248,0.35)] overflow-hidden flex flex-col text-white"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Top Header */}
            <div className="flex items-center justify-between px-5 sm:px-7 py-3.5 border-b border-sky-500/25 bg-[#010309]/95 shrink-0">
              <div className="flex items-center gap-2 sm:gap-3">
                <span className="font-mono text-sm font-bold text-sky-400">
                  {selectedProject.number}
                </span>
                <span className="text-zinc-600">/</span>
                <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.22em] text-sky-300 uppercase">
                  {selectedProject.category}
                </span>
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                aria-label="Close project modal"
                className="p-1.5 rounded-sm border border-zinc-700 bg-zinc-900/80 text-zinc-300 hover:text-white hover:border-sky-400 transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="p-5 sm:p-7 overflow-y-auto space-y-6 text-left">
              {/* Title & Role */}
              <div>
                <h3 className="font-cinzel text-xl sm:text-2xl md:text-3xl font-extrabold tracking-wide text-white leading-tight">
                  {selectedProject.title}
                </h3>
                <p className="font-mono text-xs text-sky-400 tracking-widest uppercase mt-1">
                  {selectedProject.role} · {selectedProject.clientOrScope}
                </p>
              </div>

              {/* Interactive Enterprise Gallery Showcase */}
              {selectedProject.gallery && selectedProject.gallery.length > 0 && (
                <div className="space-y-3 bg-[#01040e] border border-sky-500/30 rounded-xl p-3 sm:p-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-mono text-xs tracking-widest text-sky-400 uppercase flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-sky-400" />
                      <span>ENTERPRISE SYSTEM SCREENSHOTS & REAL WORKFLOWS</span>
                    </h4>
                    <div className="flex items-center gap-1.5 font-mono text-[9.5px] text-zinc-400">
                      <span className="text-sky-300 font-bold">
                        {String(modalGalleryIndex + 1).padStart(2, "0")}
                      </span>
                      <span>/</span>
                      <span>
                        {String(selectedProject.gallery.length).padStart(2, "0")}
                      </span>
                    </div>
                  </div>

                  {/* Primary Image Viewport */}
                  <div className="relative w-full aspect-16/9 rounded-lg overflow-hidden border border-sky-500/30 bg-[#010206] shadow-[0_0_35px_rgba(0,0,0,0.95)]">
                    <Image
                      src={selectedProject.gallery[modalGalleryIndex].src}
                      alt={selectedProject.gallery[modalGalleryIndex].title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 980px"
                      className="object-contain sm:object-cover object-top transition-all duration-300"
                      priority
                    />

                    {/* Top Floating Badge */}
                    <div className="absolute top-3 left-3 z-10 flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-full bg-[#02050f]/90 border border-sky-400/60 text-[9px] font-mono tracking-widest text-sky-200 uppercase font-bold shadow-[0_0_12px_rgba(56,189,248,0.4)] backdrop-blur-md">
                        {selectedProject.gallery[modalGalleryIndex].badge}
                      </span>
                    </div>

                    {/* Prev / Next Chevrons */}
                    {selectedProject.gallery.length > 1 && (
                      <div className="absolute inset-y-0 inset-x-2 flex items-center justify-between pointer-events-none z-10">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setModalGalleryIndex((prev) =>
                              prev > 0
                                ? prev - 1
                                : selectedProject.gallery!.length - 1,
                            );
                          }}
                          aria-label="Previous screenshot"
                          className="pointer-events-auto p-2 rounded-full bg-[#02050f]/85 border border-sky-500/40 text-zinc-200 hover:text-white hover:border-sky-400 hover:scale-110 active:scale-95 transition-all shadow-[0_0_14px_rgba(0,0,0,0.8)] cursor-pointer"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setModalGalleryIndex((prev) =>
                              prev < selectedProject.gallery!.length - 1
                                ? prev + 1
                                : 0,
                            );
                          }}
                          aria-label="Next screenshot"
                          className="pointer-events-auto p-2 rounded-full bg-[#02050f]/85 border border-sky-500/40 text-zinc-200 hover:text-white hover:border-sky-400 hover:scale-110 active:scale-95 transition-all shadow-[0_0_14px_rgba(0,0,0,0.8)] cursor-pointer"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Caption Box */}
                  <div className="bg-[#030919]/90 border border-sky-500/20 rounded-lg p-3">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <h5 className="font-cinzel text-sm sm:text-base font-bold text-sky-200">
                        {selectedProject.gallery[modalGalleryIndex].title}
                      </h5>
                    </div>
                    <p className="font-montserrat text-xs text-zinc-300 leading-relaxed mt-1">
                      {selectedProject.gallery[modalGalleryIndex].caption}
                    </p>
                  </div>

                  {/* Thumbnail Strip */}
                  <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-0.5 scrollbar-thin">
                    {selectedProject.gallery.map((thumb, tIdx) => {
                      const isCurrent = tIdx === modalGalleryIndex;
                      return (
                        <button
                          key={thumb.src}
                          type="button"
                          onClick={() => setModalGalleryIndex(tIdx)}
                          aria-label={`View ${thumb.title}`}
                          className={`relative shrink-0 w-20 sm:w-24 aspect-16/10 rounded-md overflow-hidden border transition-all cursor-pointer ${
                            isCurrent
                              ? "border-sky-400 ring-2 ring-sky-400/80 shadow-[0_0_14px_rgba(56,189,248,0.6)] scale-105 opacity-100"
                              : "border-sky-500/25 opacity-55 hover:opacity-90 hover:border-sky-400/60"
                          }`}
                        >
                          <Image
                            src={thumb.src}
                            alt={thumb.title}
                            fill
                            sizes="100px"
                            className="object-cover object-top"
                          />
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Summary */}
              <p className="font-montserrat text-sm leading-relaxed text-zinc-300 bg-[#040a18]/70 p-4 rounded-xl border border-sky-500/20">
                {selectedProject.summary}
              </p>

              {/* Metrics Grid */}
              <div>
                <h4 className="font-mono text-xs tracking-widest text-zinc-400 uppercase mb-2.5">
                  ENTERPRISE METRICS & PERFORMANCE
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {selectedProject.metrics.map((m, mIdx) => (
                    <div
                      key={mIdx}
                      className="bg-[#030919] border border-sky-500/25 rounded-lg p-2.5 text-center"
                    >
                      <span className="font-cinzel text-lg sm:text-xl font-bold text-sky-300 block">
                        {m.value}
                      </span>
                      <span className="font-mono text-[8px] sm:text-[9px] text-zinc-400 uppercase mt-0.5 block">
                        {m.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Subsystem Modules Breakdown (If configured) */}
              {selectedProject.modules && selectedProject.modules.length > 0 && (
                <div>
                  <h4 className="font-mono text-xs tracking-widest text-zinc-400 uppercase mb-3 flex items-center gap-2">
                    <Layers className="w-3.5 h-3.5 text-sky-400" />
                    <span>ENTERPRISE ARCHITECTURE & SUBSYSTEM MODULES</span>
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {selectedProject.modules.map((mod, mIdx) => (
                      <div
                        key={mIdx}
                        className="bg-[#030919]/90 border border-sky-500/20 hover:border-sky-500/40 rounded-xl p-3.5 transition-colors"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h5 className="font-cinzel text-xs sm:text-sm font-bold text-sky-200">
                            {mod.title}
                          </h5>
                          <span className="font-mono text-[7.5px] px-2 py-0.5 rounded-full bg-sky-950/80 border border-sky-500/30 text-sky-300 uppercase">
                            {mod.category}
                          </span>
                        </div>
                        <ul className="space-y-1.5">
                          {mod.features.map((feat, fIdx) => (
                            <li
                              key={fIdx}
                              className="flex items-start gap-1.5 text-[11px] text-zinc-300 leading-snug"
                            >
                              <span className="text-sky-400 font-bold shrink-0">
                                ›
                              </span>
                              <span>{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Engineering Highlights */}
              <div>
                <h4 className="font-mono text-xs tracking-widest text-zinc-400 uppercase mb-2">
                  KEY ENGINEERING ACHIEVEMENTS
                </h4>
                <ul className="space-y-2 border-t border-sky-500/20 pt-2.5">
                  {selectedProject.highlights.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2 text-xs sm:text-[13px] text-zinc-300 leading-relaxed"
                    >
                      <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Architecture Overview */}
              <div>
                <h4 className="font-mono text-xs tracking-widest text-zinc-400 uppercase mb-2">
                  SYSTEM ARCHITECTURE OVERVIEW
                </h4>
                <p className="font-montserrat text-xs sm:text-[12.5px] leading-relaxed text-zinc-300 bg-[#030816] p-3 rounded-lg border border-sky-500/20">
                  {selectedProject.architectureOverview}
                </p>
              </div>

              {/* Full Technology Stack */}
              <div>
                <h4 className="font-mono text-xs tracking-widest text-zinc-400 uppercase mb-2">
                  TECHNOLOGIES & TOOLING
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedProject.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-sm text-xs font-mono text-sky-300 bg-sky-950/60 border border-sky-400/40"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer Links */}
            <div className="flex items-center justify-between px-5 sm:px-7 py-3.5 border-t border-sky-500/25 bg-[#010309]/95 shrink-0">
              <span className="font-mono text-[9px] text-zinc-500 uppercase">
                PRESS ESC OR CLICK OUTSIDE TO CLOSE
              </span>

              <div className="flex items-center gap-2">
                {selectedProject.githubUrl && (
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm border border-sky-400/70 bg-sky-950/70 hover:bg-sky-400 hover:text-black text-sky-300 font-mono text-[10px] tracking-widest uppercase transition-all cursor-pointer"
                  >
                    <span>GITHUB REPO</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
