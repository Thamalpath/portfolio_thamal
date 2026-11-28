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
  CheckCircle2,
  X,
  AppWindow,
  Maximize2,
  ZoomIn,
  ZoomOut,
  Lock,
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
  previewImage?: string;
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
      "All-in-one enterprise ERP, CRM, and multi-branch retail management ecosystem powering Venpaa's bookstore network and online eCommerce store. Engineered with Next.js 14 and Laravel 8, unifying 25+ mission-critical modules including catalog master records, Good Receive Notes (GRN), PO supply chain workflows, POS billing, COD reconciliation, and automated analytics.",
    previewImage: "/images/projects/venpaa-3d-preview.png",
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
      "Integrated multi-channel order fulfillment tracking web, Android, and iOS store sales across PayHere, Koko Pay, Mintpay, and courier Cash-on-Delivery (COD) reconciliation.",
      "Built real-time executive analytics dashboards monitoring LKR 12.6M+ annual turnover, comparing in-store POS velocity (78%) versus online digital revenue (22%).",
      "Implemented granular enterprise Role-Based Access Control (RBAC) via Spatie Permissions, securing financial ledgers, inventory write-offs, and multi-user audit trails.",
    ],
    architectureOverview:
      "High-performance client-server ERP architecture: Next.js 14 (App Router) with TanStack Table and Radix UI components connecting to a secure Laravel 8 REST API authenticated via Sanctum. Features Spatie dynamic RBAC, automated daily database snapshots, multi-branch inventory bin-cards, and AWS S3 document storage.",
    mockupType: "ecommerce",
    liveUrl: "https://web.venpaa.lk/",
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
        title: "eCommerce & Mobile Order Pipeline",
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
        title: "POS & Cashier Operations",
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
// Modern Simple Classic Project Visual Mockup Renderers
// ============================================================================
function getProjectDomain(item: ProjectItem): string {
  switch (item.id) {
    case "venpaa-crm-ecommerce":
    case "venpaa-erp":
      return "web.venpaa.lk";
    case "samudra-distribution":
      return "logistics.samudra.lk";
    case "hotel-reservation-system":
      return "resort.bookingengine.lk";
    case "smart-school-system":
      return "campus.smartschool.edu";
    case "multi-tenant-pms":
      return "pms.luxuryvillas.cloud";
    case "financial-analytics-intelligence":
      return "telemetry.analytics.internal";
    case "notification-reporting-microservice":
      return "api.microservices.cloud";
    case "rbac-identity-gateway":
      return "auth.gateway.internal";
    default:
      return `${item.id}.cloud`;
  }
}

// ============================================================================
// Cyber-Glass Browser Mockup Window Frame (Pixel-Aligned & Crystal Clear)
// ============================================================================
function CyberBrowserWindow({
  item,
  children,
}: {
  item: ProjectItem;
  children: React.ReactNode;
}) {
  const domain = getProjectDomain(item);

  return (
    <div className="relative w-full h-full p-2 sm:p-2.5 flex items-center justify-center bg-[#01030a] overflow-hidden select-none">
      {/* Ambient Electric Sapphire Halo */}
      <div
        aria-hidden="true"
        className="absolute -inset-4 bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.18),transparent_70%)] opacity-70 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none blur-xl"
      />

      {/* The Razor-Sharp Modern Browser Window Frame */}
      <div className="relative w-full h-full max-h-[98%] flex flex-col rounded-xl overflow-hidden border border-sky-400/40 bg-white shadow-[0_12px_32px_rgba(0,0,0,0.85),0_0_20px_rgba(56,189,248,0.14)] group-hover:border-sky-400/70 group-hover:shadow-[0_16px_40px_rgba(0,0,0,0.95),0_0_28px_rgba(56,189,248,0.25)] transition-[border-color,box-shadow] duration-500">
        {/* Simple & Clean Browser Chrome Bar */}
        <div className="h-7 sm:h-8 px-3 bg-[#0a1527] border-b border-sky-500/25 flex items-center justify-between shrink-0">
          {/* macOS Jewel Buttons */}
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/90 shadow-[0_0_5px_rgba(244,63,94,0.6)]" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/90 shadow-[0_0_5px_rgba(245,158,11,0.6)]" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/90 shadow-[0_0_5px_rgba(52,211,153,0.7)]" />
          </div>

          {/* Clean HTTPS SSL Address Bar */}
          <div className="flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#020612] border border-sky-500/30 text-[7.5px] sm:text-[8.5px] font-mono text-zinc-300">
            <Lock className="w-2.5 h-2.5 text-emerald-400 shrink-0" />
            <span className="text-zinc-500 select-none">https://</span>
            <span className="text-sky-300 font-semibold">{domain}</span>
          </div>

          {/* Right Spacer for Balance */}
          <div className="w-7 sm:w-8" />
        </div>

        {/* Viewport Canvas: 100% crisp & razor sharp */}
        <div className="relative flex-1 w-full overflow-hidden bg-[#f8fafc]">
          {children}
        </div>
      </div>
    </div>
  );
}
// ============================================================================
// Modern Simple Classic Project Visual Mockup Renderers
// ============================================================================
function ProjectMockupVisual({
  type,
  item,
}: {
  type: ProjectItem["mockupType"];
  item: ProjectItem;
}) {
  const gradientId = useId();

  // If project has custom 3D studio preview image, render it directly without nested browser chrome
  if (item.previewImage) {
    return (
      <div className="relative w-full h-full overflow-hidden bg-[#01030b] flex items-center justify-center select-none group/preview">
        {/* Ambient Electric Sapphire Halo */}
        <div
          aria-hidden="true"
          className="absolute -inset-4 bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.22),transparent_70%)] opacity-70 group-hover/preview:opacity-100 transition-opacity duration-700 pointer-events-none blur-xl"
        />
        <div className="relative w-full h-full">
          <Image
            src={item.previewImage}
            alt={item.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 900px"
            className="object-contain object-center scale-[1.02] transition-transform duration-700 group-hover/preview:scale-[1.06]"
            style={{ imageRendering: "-webkit-optimize-contrast" }}
            priority
          />
        </div>
      </div>
    );
  }

  const renderInnerContent = () => {
    // If project has gallery screenshots:
    const imageSrc =
      item.gallery && item.gallery.length > 0 ? item.gallery[0].src : null;

    if (imageSrc) {
      return (
        <div className="relative w-full h-full bg-[#f8fafc]">
          <Image
            src={imageSrc}
            alt={item.title}
            fill
            sizes="(max-width: 768px) 100vw, 850px"
            className="object-contain object-center"
            style={{ imageRendering: "-webkit-optimize-contrast" }}
            priority
          />
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
                <p className="text-[7.5px] font-mono text-zinc-400">
                  INVENTORY
                </p>
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
  };

  return (
    <CyberBrowserWindow item={item}>{renderInnerContent()}</CyberBrowserWindow>
  );
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
  const [isFullscreenLightbox, setIsFullscreenLightbox] =
    useState<boolean>(false);
  const [isLightboxZoomed, setIsLightboxZoomed] = useState<boolean>(false);
  const [lightboxTouchStartX, setLightboxTouchStartX] = useState<number | null>(
    null,
  );

  const handleLightboxTouchStart = (e: React.TouchEvent) => {
    setLightboxTouchStartX(e.touches[0].clientX);
  };

  const handleLightboxTouchEnd = (e: React.TouchEvent) => {
    if (lightboxTouchStartX === null || !selectedProject?.gallery) return;
    const diffX = e.changedTouches[0].clientX - lightboxTouchStartX;
    if (diffX > 45) {
      setModalGalleryIndex((prev) =>
        prev > 0 ? prev - 1 : selectedProject.gallery!.length - 1,
      );
    } else if (diffX < -45) {
      setModalGalleryIndex((prev) =>
        prev < selectedProject.gallery!.length - 1 ? prev + 1 : 0,
      );
    }
    setLightboxTouchStartX(null);
  };

  // Responsive mobile screen tracking for 3D carousel spacing
  const [isMobileScreen, setIsMobileScreen] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileScreen(window.innerWidth < 640);
    };
    handleResize();
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Section refs for scroll animation transition between Experience and Projects
  const sectionRef = useRef<HTMLElement | null>(null);
  const horizonSeamRef = useRef<HTMLDivElement | null>(null);
  const horizonGlowRef = useRef<HTMLDivElement | null>(null);
  const bgArenaRef = useRef<HTMLDivElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const mobileTabsRef = useRef<HTMLDivElement | null>(null);
  const carouselStageRef = useRef<HTMLDivElement | null>(null);
  const bottomBarRef = useRef<HTMLDivElement | null>(null);

  // 60fps lerped scroll transition from Experience into Projects
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    let rafId = 0;
    let target = 0;
    let current = 0;

    const clamp01 = (v: number) => Math.min(Math.max(v, 0), 1);
    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
    const easeOutQuad = (t: number) => 1 - (1 - t) * (1 - t);

    const applyVisuals = (p: number) => {
      const isMobile = window.innerWidth < 640;
      const isTablet = window.innerWidth >= 640 && window.innerWidth < 1024;

      // 1. Dynamic Horizon Laser Seam expansion on section boundary
      const seamP = easeOutQuad(clamp01(p * 1.35));
      if (horizonSeamRef.current) {
        horizonSeamRef.current.style.transform = `scaleX(${(0.15 + seamP * 0.85).toFixed(3)})`;
        horizonSeamRef.current.style.opacity = (0.25 + seamP * 0.75).toFixed(3);
      }
      if (horizonGlowRef.current) {
        horizonGlowRef.current.style.opacity = (seamP * 0.95).toFixed(3);
        horizonGlowRef.current.style.transform = `translate(-50%, -50%) scale(${(0.5 + seamP * 0.5).toFixed(3)})`;
      }

      // 2. Cyber Arena Background Parallax & Cinematic Depth Pull
      const bgP = easeOutQuad(clamp01(p * 1.25));
      if (bgArenaRef.current) {
        const bgScale = (1.05 - bgP * 0.05).toFixed(4);
        const bgY = ((1 - bgP) * (isMobile ? 12 : 24)).toFixed(1);
        bgArenaRef.current.style.transform = `scale(${bgScale}) translate3d(0, ${bgY}px, 0)`;
        bgArenaRef.current.style.opacity = (0.4 + bgP * 0.5).toFixed(3);
      }

      // 3. Top Executive Header Bar (Title, Category Tabs, Navigation)
      const headP = easeOutCubic(clamp01((p - 0.06) / 0.65));
      if (headerRef.current) {
        const headY = ((1 - headP) * (isMobile ? -14 : -24)).toFixed(1);
        headerRef.current.style.opacity = headP.toFixed(3);
        headerRef.current.style.transform = `translate3d(0, ${headY}px, 0)`;
      }

      // 4. Mobile Category Tabs Row (< lg)
      if (mobileTabsRef.current) {
        mobileTabsRef.current.style.opacity = headP.toFixed(3);
        mobileTabsRef.current.style.transform = `translate3d(0, ${((1 - headP) * -10).toFixed(1)}px, 0)`;
      }

      // 5. 3D Amphitheater Carousel Stage with Floating Project Cards
      const stageP = easeOutCubic(clamp01((p - 0.14) / 0.72));
      if (carouselStageRef.current) {
        const stageY = ((1 - stageP) * (isMobile ? 24 : 45)).toFixed(1);
        const stageScale = (0.95 + stageP * 0.05).toFixed(3);
        carouselStageRef.current.style.opacity = stageP.toFixed(3);
        carouselStageRef.current.style.transform = `translate3d(0, ${stageY}px, 0) scale(${stageScale})`;
      }

      // 6. Bottom Navigation Controls & Pagination Dots
      const bottomP = easeOutCubic(clamp01((p - 0.3) / 0.62));
      if (bottomBarRef.current) {
        const bottomY = ((1 - bottomP) * 16).toFixed(1);
        bottomBarRef.current.style.opacity = bottomP.toFixed(3);
        bottomBarRef.current.style.transform = `translate3d(0, ${bottomY}px, 0)`;
      }
    };

    const computeTarget = () => {
      const rect = section.getBoundingClientRect();
      const vh = Math.max(window.innerHeight, 1);
      const isMobile = window.innerWidth < 640;
      const isTablet = window.innerWidth >= 640 && window.innerWidth < 1024;

      if (isMobile) {
        const startY = vh * 0.96;
        const endY = vh * 0.15;
        target = clamp01((startY - rect.top) / (startY - endY));
      } else if (isTablet) {
        const startY = vh * 0.98;
        const endY = vh * 0.2;
        target = clamp01((startY - rect.top) / (startY - endY));
      } else {
        target = clamp01((vh - rect.top) / (vh * 0.85));
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
      current += diff * 0.09;
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

  // Keyboard navigation & ESC handler (supports modal & fullscreen lightbox)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (isFullscreenLightbox) {
          setIsFullscreenLightbox(false);
          setIsLightboxZoomed(false);
        } else {
          setSelectedProject(null);
        }
      } else if (isFullscreenLightbox) {
        if (e.key === "ArrowLeft") {
          setModalGalleryIndex((prev) =>
            selectedProject?.gallery
              ? prev > 0
                ? prev - 1
                : selectedProject.gallery.length - 1
              : 0,
          );
        } else if (e.key === "ArrowRight") {
          setModalGalleryIndex((prev) =>
            selectedProject?.gallery
              ? prev < selectedProject.gallery.length - 1
                ? prev + 1
                : 0
              : 0,
          );
        }
      } else if (!selectedProject) {
        if (e.key === "ArrowLeft") handlePrev();
        if (e.key === "ArrowRight") handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isFullscreenLightbox, selectedProject, handlePrev, handleNext]);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative w-full overflow-hidden bg-[#010206] text-white pt-2 sm:pt-3 lg:pt-3.5 pb-4 sm:pb-5 px-3 sm:px-6 md:px-10 lg:px-12 select-none flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* ==================================================================== */}
      {/* 1. Cinematic Realistic Cyber Arena Background (public/project_bg.png) */}
      {/* ==================================================================== */}
      <div
        ref={bgArenaRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden will-change-transform"
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
        <div className="absolute inset-x-0 top-0 h-16 sm:h-24 bg-linear-to-b from-[#010206] via-[#010206]/80 to-transparent" />

        {/* Bottom Horizon Fade - Dissolves smoothly into pure #010206 */}
        <div className="absolute inset-x-0 bottom-0 h-16 sm:h-24 bg-linear-to-t from-[#010206] via-[#010206]/85 to-transparent" />

        {/* Soft Center Vignette for Enhanced Card Readability */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(1,2,6,0.5)_75%,#010206_100%)]" />
      </div>

      {/* Dynamic Laser Horizon Seam & Ambient Glow on Section Boundary */}
      <div
        ref={horizonSeamRef}
        aria-hidden="true"
        className="pointer-events-none absolute top-0 inset-x-0 h-0.5 bg-linear-to-r from-transparent via-sky-400 to-transparent shadow-[0_0_24px_rgba(56,189,248,0.85),0_0_48px_rgba(14,165,233,0.5)] origin-center will-change-transform z-30"
      />
      <div
        ref={horizonGlowRef}
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 sm:w-160 h-10 sm:h-16 bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.35)_0%,rgba(14,165,233,0.12)_45%,transparent_75%)] blur-md origin-center will-change-transform z-30"
      />

      {/* ==================================================================== */}
      {/* 2. Top Executive HUD Bar: Left Editorial Motto, Center Tabs & Right Controls */}
      {/* ==================================================================== */}
      <div
        ref={headerRef}
        className="relative z-30 w-full max-w-7xl xl:max-w-screen-2xl 2xl:max-w-[1760px] mx-auto flex items-start justify-between gap-3 sm:gap-4 mb-2 sm:mb-3 will-change-transform"
      >
        {/* Top-Left Stacked Typography (Matching Reference Image 1) */}
        <div className="flex flex-col text-left items-start shrink-0">
          <div className="flex items-center gap-2 mb-0.5">
            <span className="w-2 h-2 rounded-full bg-sky-400 shadow-[0_0_8px_#38bdf8] animate-pulse" />
            <h2 className="font-cinzel text-xl sm:text-2xl md:text-3xl font-extrabold tracking-[0.24em] text-white uppercase drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)]">
              PROJECTS
            </h2>
          </div>

          {/* Editorial Hairline Divider */}
          <div className="w-12 h-px bg-linear-to-r from-sky-400/70 to-transparent my-0.5" />

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

        {/* Center Category Filter Selector Pills (Aligned inline in row with navigation controls on desktop, nudged slightly up) */}
        <div className="hidden lg:flex flex-1 items-center justify-center gap-1.5 xl:gap-2 flex-wrap self-end -translate-y-1 sm:-translate-y-1.5 px-2">
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

        {/* Top-Right Stacked Guidance & Navigation (Matching Reference Image 1) */}
        <div className="flex flex-col items-end text-right shrink-0">
          <div className="hidden sm:flex flex-col gap-0.5 font-cinzel text-[9px] sm:text-[10px] tracking-[0.26em] text-zinc-400 uppercase leading-relaxed mb-0.5 sm:mb-1">
            <span>SCROLL</span>
            <span>EXPLORE</span>
            <span className="text-zinc-200">INTERACT</span>
          </div>

          {/* Subtle Hairline */}
          <div className="hidden sm:block w-10 h-px bg-linear-to-l from-sky-400/60 to-transparent mb-1.5" />

          {/* Interactive Prev / Next / Auto-Orbit HUD Controls */}
          <div className="flex items-center gap-1 sm:gap-2">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous project"
              className="p-1 sm:p-2 rounded-sm border border-blue-900/70 bg-[#050b18]/85 text-zinc-300 hover:text-sky-300 hover:border-sky-400/80 active:scale-95 transition shadow-[0_0_12px_rgba(0,0,0,0.8)] cursor-pointer"
            >
              <ChevronLeft className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
            </button>

            {/* Project Index Counter */}
            <div className="font-cinzel text-xs sm:text-sm font-bold tracking-[0.2em] text-sky-300 px-1 sm:px-1.5 min-w-14 sm:min-w-16 text-center">
              {String(safeIndex + 1).padStart(2, "0")} /{" "}
              {String(filteredProjects.length).padStart(2, "0")}
            </div>

            <button
              type="button"
              onClick={handleNext}
              aria-label="Next project"
              className="p-1 sm:p-2 rounded-sm border border-blue-900/70 bg-[#050b18]/85 text-zinc-300 hover:text-sky-300 hover:border-sky-400/80 active:scale-95 transition shadow-[0_0_12px_rgba(0,0,0,0.8)] cursor-pointer"
            >
              <ChevronRight className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
            </button>

            {/* Orbit / Autoplay Toggle */}
            <button
              type="button"
              onClick={() => setIsAutoOrbit((prev) => !prev)}
              title={isAutoOrbit ? "Pause auto-orbit" : "Resume auto-orbit"}
              className={`p-1 sm:p-2 rounded-sm border transition-all cursor-pointer ${
                isAutoOrbit
                  ? "border-sky-400 bg-sky-950/80 text-sky-300 shadow-[0_0_14px_rgba(56,189,248,0.4)]"
                  : "border-zinc-800 bg-[#050b18]/80 text-zinc-500 hover:text-zinc-300"
              }`}
            >
              {isAutoOrbit ? (
                <Pause className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
              ) : (
                <Play className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Category Filter Selector Pills for Mobile / Tablet (< lg) */}
      <div
        ref={mobileTabsRef}
        className="lg:hidden relative z-30 w-full max-w-7xl mx-auto flex items-center justify-start sm:justify-center gap-1.5 overflow-x-auto no-scrollbar py-1 px-1 -mt-0.5 mb-2 will-change-transform"
      >
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
              className={`px-3 py-1 rounded-full text-[8.5px] font-mono tracking-widest uppercase transition-all duration-300 shrink-0 cursor-pointer ${
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
        ref={carouselStageRef}
        className="relative z-20 w-full max-w-7xl xl:max-w-screen-2xl 2xl:max-w-[1760px] mx-auto flex flex-col items-center justify-center my-0 py-0 will-change-transform"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* ================================================================ */}
        {/* 3D Curved Cylindrical Carousel of Floating Cards                 */}
        {/* ================================================================ */}
        <div
          className="relative w-full h-105 sm:h-90 md:h-97.5 lg:h-105 xl:h-110 flex items-center justify-center"
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

            // Responsive 3D Cylindrical Geometry
            const rotateY = diff * -18;
            const stepX = isMobileScreen ? 235 : 350;
            const translateX = diff * stepX;
            const translateZ =
              Math.abs(diff) === 0
                ? isMobileScreen
                  ? 40
                  : 80
                : -Math.abs(diff) * (isMobileScreen ? 70 : 110);
            const scale = isCenter
              ? 1.0
              : isImmediate
                ? isMobileScreen
                  ? 0.85
                  : 0.88
                : 0.74;
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
                className={`group absolute w-[94vw] max-w-85 sm:max-w-130 md:max-w-150 lg:max-w-170 xl:max-w-185 h-117.5 sm:h-80 md:h-86.25 lg:h-92.5 xl:h-96.25 rounded-2xl border overflow-hidden cursor-pointer transition-[border-color,box-shadow] duration-500 ${
                  isCenter
                    ? "bg-[#020614] border-sky-400/80 shadow-[0_0_35px_rgba(56,189,248,0.22),0_25px_60px_rgba(0,0,0,0.95)]"
                    : "bg-[#02050f] border-sky-500/20 shadow-[0_15px_40px_rgba(0,0,0,0.85)] hover:border-sky-400/40 hover:opacity-90"
                }`}
              >
                {/* Luminous Top Seam Beam for Active Card */}
                {isCenter && (
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute top-0 inset-x-0 h-0.5 bg-linear-to-r from-transparent via-sky-300 to-transparent shadow-[0_0_12px_#38bdf8] z-30"
                  />
                )}

                {/* Modern Classic Landscape 2-Column Split (Stacked on Mobile) */}
                <div className="flex flex-col-reverse sm:flex-row h-full w-full">
                  {/* Left Column: Minimalist Editorial Typography & Details */}
                  <div className="w-full sm:w-[42%] lg:w-[38%] p-3.5 sm:p-4.5 lg:p-5 flex flex-col justify-between shrink-0 bg-[#020614] sm:bg-[#020614]/90 relative z-20 flex-1 border-b sm:border-b-0 sm:border-r border-sky-500/20">
                    {/* Top: Project Number & Category */}
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs sm:text-sm font-bold text-sky-400 tracking-wider">
                        {project.number}
                      </span>
                      <span className="text-zinc-600">/</span>
                      <span className="font-mono text-[8.5px] sm:text-[9.5px] tracking-[0.22em] text-zinc-300 uppercase truncate">
                        {project.category}
                      </span>
                    </div>

                    {/* Middle: Elegant Serif Title, Scope, Summary & Tech Stack */}
                    <div className="my-auto py-1 sm:py-0">
                      <h3 className="font-cinzel text-base sm:text-lg md:text-xl lg:text-2xl font-bold tracking-tight text-white leading-snug group-hover:text-sky-200 transition-colors">
                        {project.shortTitle || project.title}
                      </h3>
                      <p className="font-mono text-[8.5px] sm:text-[9.5px] text-sky-300 font-semibold tracking-wider uppercase mt-1 leading-snug">
                        {project.clientOrScope}
                      </p>
                      <p className="font-montserrat text-xs text-zinc-100 leading-relaxed mt-2 sm:mt-2.5 line-clamp-2 sm:line-clamp-3 font-normal">
                        {project.summary}
                      </p>

                      {/* Understated Tech Stack Badges */}
                      <div className="flex items-center gap-1.5 flex-wrap mt-2.5 sm:mt-3">
                        {project.techStack.slice(0, 4).map((tech) => (
                          <span
                            key={tech}
                            className="text-[7.5px] sm:text-[8px] font-mono text-sky-200 bg-sky-950/80 border border-sky-400/40 px-2 py-0.5 rounded-md font-semibold"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.techStack.length > 4 && (
                          <span className="text-[7.5px] sm:text-[8px] font-mono text-zinc-400">
                            +{project.techStack.length - 4}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Bottom: Modern Classic, User-Friendly CTA Button */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedProject(project);
                        setModalGalleryIndex(0);
                      }}
                      className="group/cta inline-flex items-center gap-2.5 self-start px-5 sm:px-5.5 py-2.5 rounded-xl bg-sky-400 text-slate-950 font-montserrat font-bold text-xs tracking-wider uppercase transition-all duration-300 cursor-pointer shadow-[0_4px_20px_rgba(56,189,248,0.4)] hover:bg-sky-300 hover:shadow-[0_6px_28px_rgba(56,189,248,0.65)] hover:-translate-y-0.5 active:translate-y-0 mt-2 sm:mt-0"
                    >
                      <span>View Project</span>
                      <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5] transition-transform duration-300 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5 text-slate-950" />
                    </button>
                  </div>

                  {/* Right Column: Cyber-Browser Visual Preview (Cleanly Set in Area) */}
                  <div className="w-full sm:w-[58%] lg:w-[62%] h-52 sm:h-full relative overflow-hidden bg-[#01030a] shrink-0">
                    <ProjectMockupVisual
                      type={project.mockupType}
                      item={project}
                    />
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
      <div
        ref={bottomBarRef}
        className="relative z-30 w-full max-w-7xl mx-auto flex items-center justify-between mt-2 sm:mt-3 pt-2.5 pb-1 border-t border-sky-500/15 will-change-transform gap-2"
      >
        <span className="hidden sm:inline font-mono text-[8.5px] sm:text-[9.5px] tracking-[0.24em] text-zinc-500 uppercase">
          PROJECT MATRIX · 3D ORBIT ARTIFACT
        </span>

        {/* Interactive Dots for all projects */}
        <div className="flex items-center gap-1.5 sm:gap-2 mx-auto sm:mx-0">
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
                    ? "w-5 sm:w-8 h-1.5 bg-sky-400 shadow-[0_0_10px_#38bdf8]"
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
          className="inline-flex items-center gap-1 font-mono text-[8px] sm:text-[9.5px] tracking-[0.2em] text-sky-400 uppercase hover:text-white transition cursor-pointer shrink-0"
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
              {selectedProject.gallery &&
                selectedProject.gallery.length > 0 && (
                  <div className="space-y-3 bg-[#01040e] border border-sky-500/30 rounded-xl p-3 sm:p-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-mono text-xs tracking-widest text-sky-400 uppercase flex items-center gap-2">
                        <AppWindow className="w-3.5 h-3.5 text-sky-400" />
                        <span>
                          ENTERPRISE SYSTEM SCREENSHOTS & REAL WORKFLOWS
                        </span>
                      </h4>
                      <div className="flex items-center gap-1.5 font-mono text-[9.5px] text-zinc-400">
                        <span className="text-sky-300 font-bold">
                          {String(modalGalleryIndex + 1).padStart(2, "0")}
                        </span>
                        <span>/</span>
                        <span>
                          {String(selectedProject.gallery.length).padStart(
                            2,
                            "0",
                          )}
                        </span>
                      </div>
                    </div>

                    {/* Primary Image Viewport with Hover Zoom & Click to Full Size */}
                    <div
                      className="group/img relative w-full aspect-video rounded-xl overflow-hidden border border-sky-500/30 bg-[#010206] shadow-[0_0_35px_rgba(0,0,0,0.95)] cursor-zoom-in"
                      onClick={() => setIsFullscreenLightbox(true)}
                    >
                      <Image
                        src={selectedProject.gallery[modalGalleryIndex].src}
                        alt={selectedProject.gallery[modalGalleryIndex].title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 980px"
                        className="object-contain sm:object-cover object-top transition-transform duration-500 group-hover/img:scale-105"
                        priority
                      />

                      {/* Top Floating Badge */}
                      <div className="absolute top-3 left-3 z-10 flex items-center gap-2 pointer-events-none">
                        <span className="px-2.5 py-1 rounded-full bg-[#02050f]/90 border border-sky-400/60 text-[9px] font-mono tracking-widest text-sky-200 uppercase font-bold shadow-[0_0_12px_rgba(56,189,248,0.4)] backdrop-blur-md">
                          {selectedProject.gallery[modalGalleryIndex].badge}
                        </span>
                      </div>

                      {/* Hover / Tap Click to Full Size Cue */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsFullscreenLightbox(true);
                        }}
                        className="absolute bottom-3 right-3 z-20 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#02050f]/90 border border-sky-400/70 text-sky-200 text-[10px] font-mono tracking-wider uppercase backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.8)] hover:bg-sky-400 hover:text-black hover:scale-105 active:scale-95 transition-all cursor-pointer"
                      >
                        <Maximize2 className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">VIEW FULL SIZE</span>
                        <span className="sm:hidden">EXPAND</span>
                      </button>

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
              {selectedProject.modules &&
                selectedProject.modules.length > 0 && (
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

      {/* ==================================================================== */}
      {/* 8. Fullscreen High-Resolution Image Lightbox & Zoom Viewer           */}
      {/* ==================================================================== */}
      {isFullscreenLightbox && selectedProject?.gallery && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-100 flex flex-col bg-black/95 backdrop-blur-2xl animate-in fade-in duration-300 select-none"
          onClick={() => {
            setIsFullscreenLightbox(false);
            setIsLightboxZoomed(false);
          }}
        >
          {/* Top Controls Bar */}
          <div
            className="flex items-center justify-between px-3 sm:px-6 py-2.5 sm:py-3 border-b border-sky-500/20 bg-[#02050f]/95 z-20 shrink-0"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2 sm:gap-3 truncate pr-2">
              <span className="font-mono text-xs sm:text-sm font-bold text-sky-400 shrink-0">
                {String(modalGalleryIndex + 1).padStart(2, "0")} /{" "}
                {String(selectedProject.gallery.length).padStart(2, "0")}
              </span>
              <span className="text-zinc-600 hidden sm:inline">|</span>
              <span className="font-cinzel text-xs sm:text-sm font-bold text-white truncate">
                {selectedProject.gallery[modalGalleryIndex].title}
              </span>
            </div>

            {/* Lightbox Controls */}
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              {/* Zoom Toggle Button */}
              <button
                type="button"
                onClick={() => setIsLightboxZoomed((prev) => !prev)}
                title={
                  isLightboxZoomed
                    ? "Zoom out (Fit screen)"
                    : "Zoom in (Full size)"
                }
                className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full border border-sky-500/40 bg-sky-950/60 text-sky-200 text-[10px] sm:text-xs font-mono hover:bg-sky-400 hover:text-black transition cursor-pointer"
              >
                {isLightboxZoomed ? (
                  <>
                    <ZoomOut className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">FIT SCREEN</span>
                  </>
                ) : (
                  <>
                    <ZoomIn className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">ZOOM IN</span>
                  </>
                )}
              </button>

              {/* Close Button */}
              <button
                type="button"
                onClick={() => {
                  setIsFullscreenLightbox(false);
                  setIsLightboxZoomed(false);
                }}
                aria-label="Close full size view"
                className="p-1 sm:p-1.5 rounded-full border border-zinc-700 bg-zinc-900/80 text-zinc-300 hover:text-white hover:border-sky-400 transition cursor-pointer"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>

          {/* Main Image Stage with Pan/Zoom & Swipe */}
          <div
            className={`relative flex-1 w-full overflow-auto flex items-center justify-center p-2 sm:p-6 ${
              isLightboxZoomed
                ? "cursor-grab active:cursor-grabbing"
                : "cursor-zoom-in"
            }`}
            onClick={(e) => {
              e.stopPropagation();
              setIsLightboxZoomed((prev) => !prev);
            }}
            onTouchStart={handleLightboxTouchStart}
            onTouchEnd={handleLightboxTouchEnd}
          >
            {/* Prev Chevron */}
            {selectedProject.gallery.length > 1 && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setModalGalleryIndex((prev) =>
                    prev > 0 ? prev - 1 : selectedProject.gallery!.length - 1,
                  );
                }}
                aria-label="Previous screenshot"
                className="absolute left-2 sm:left-6 z-30 p-2 sm:p-3 rounded-full bg-black/75 border border-sky-500/40 text-white hover:border-sky-400 hover:scale-110 active:scale-95 transition shadow-[0_0_20px_rgba(0,0,0,0.8)] cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6" />
              </button>
            )}

            {/* High-Resolution Screen Display */}
            <div
              className={`relative transition-all duration-300 flex items-center justify-center ${
                isLightboxZoomed
                  ? "w-[160vw] sm:w-[135vw] h-[160vh] sm:h-[135vh] max-w-none max-h-none shrink-0"
                  : "w-full h-full max-h-[80vh] sm:max-h-[82vh]"
              }`}
            >
              <Image
                src={selectedProject.gallery[modalGalleryIndex].src}
                alt={selectedProject.gallery[modalGalleryIndex].title}
                fill
                sizes="100vw"
                className="object-contain"
                priority
              />
            </div>

            {/* Next Chevron */}
            {selectedProject.gallery.length > 1 && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setModalGalleryIndex((prev) =>
                    prev < selectedProject.gallery!.length - 1 ? prev + 1 : 0,
                  );
                }}
                aria-label="Next screenshot"
                className="absolute right-2 sm:right-6 z-30 p-2 sm:p-3 rounded-full bg-black/75 border border-sky-500/40 text-white hover:border-sky-400 hover:scale-110 active:scale-95 transition shadow-[0_0_20px_rgba(0,0,0,0.8)] cursor-pointer"
              >
                <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6" />
              </button>
            )}
          </div>

          {/* Bottom Thumbnail Strip & Mobile Guidance */}
          <div
            className="px-3 sm:px-6 py-2 sm:py-2.5 border-t border-sky-500/20 bg-[#02050f]/95 z-20 shrink-0 flex items-center justify-between gap-3"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar py-1">
              {selectedProject.gallery.map((thumb, tIdx) => {
                const isCurrent = tIdx === modalGalleryIndex;
                return (
                  <button
                    key={thumb.src}
                    type="button"
                    onClick={() => setModalGalleryIndex(tIdx)}
                    aria-label={`View ${thumb.title}`}
                    className={`relative shrink-0 w-14 sm:w-20 aspect-16/10 rounded-md overflow-hidden border transition-all cursor-pointer ${
                      isCurrent
                        ? "border-sky-400 ring-2 ring-sky-400 shadow-[0_0_12px_rgba(56,189,248,0.7)] scale-105 opacity-100"
                        : "border-sky-500/30 opacity-50 hover:opacity-90 hover:border-sky-400/60"
                    }`}
                  >
                    <Image
                      src={thumb.src}
                      alt={thumb.title}
                      fill
                      sizes="80px"
                      className="object-cover object-top"
                    />
                  </button>
                );
              })}
            </div>

            <span className="hidden sm:inline font-mono text-[9px] text-zinc-400 shrink-0">
              Tap image to toggle 100% zoom · Swipe or arrow keys to browse
            </span>
          </div>
        </div>
      )}
    </section>
  );
}
