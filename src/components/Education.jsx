import React, { useState } from 'react';
import { portfolioData } from '../data/portfolio';

export default function Education() {
  const [activeStep, setActiveStep] = useState(1); // default to university (0-indexed 1)

  const journeySteps = [
    {
      id: 'step-01',
      stepNum: 1,
      badge: 'SECONDARY EDUCATION',
      title: 'SMAN 8 Kota Bekasi',
      role: 'High School Diploma (MIPA)',
      period: '2019 — 2022',
      location: 'Bekasi, Jawa Barat',
      status: 'GRADUATED',
      desc: 'Foundational scientific background with deep curiosity in logic, mathematics, algorithmic reasoning, and computer systems.',
      color: '#ECE8E1',
      stats: [
        { label: 'MAJOR', value: 'MIPA (Science)' },
        { label: 'GRADUATION', value: 'Class of 2022' },
        { label: 'LOCATION', value: 'Bekasi Selatan' },
        { label: 'STATUS', value: 'Alumni' },
      ],
      highlights: [
        'Logic, mathematics & science fundamentals',
        'Early computing exploration & basic coding',
        'Academic discipline & analytical reasoning',
      ],
    },
    {
      id: 'step-02',
      stepNum: 2,
      badge: 'HIGHER ACADEMIA',
      title: 'Universitas Bani Saleh',
      role: 'Sarjana Sistem Informasi (S.Kom)',
      period: '2023 — 2027 (EST.)',
      location: 'Bekasi, Jawa Barat',
      status: 'ACTIVE • SEMESTER 6',
      desc: 'Advancing core computer science competence: enterprise database design, full-stack systems engineering, and information architecture.',
      color: '#ECE8E1',
      stats: [
        { label: 'CUMULATIVE GPA', value: '3.62 / 4.00', highlight: true },
        { label: 'TOTAL SKS', value: '110 Credits' },
        { label: 'FACULTY', value: 'Sistem Informasi' },
        { label: 'DEGREE', value: 'S.Kom Candidate' },
      ],
      highlights: [
        'Relational Database Modeling (MySQL, Schema Design)',
        'Enterprise Web & Mobile Architecture (PHP, JS, React)',
        'System Analysis & UI/UX Prototyping',
      ],
    },
    {
      id: 'step-03',
      stepNum: 3,
      badge: 'INTERNSHIP PRACTICE',
      title: 'FMM Head Office Bekasi',
      role: 'IT Division Intern',
      period: '2024 — PRESENT',
      location: 'Bekasi, Jawa Barat',
      status: 'INTERN (MAGANG)',
      desc: 'Hands-on enterprise IT division internship: infrastructure maintenance, database support, internal digital systems, and network troubleshooting.',
      color: '#ECE8E1',
      stats: [
        { label: 'DIVISION', value: 'Information Tech', highlight: true },
        { label: 'OFFICE', value: 'Head Office Bekasi' },
        { label: 'EMPLOYMENT', value: 'Intern (Magang)' },
        { label: 'SCOPE', value: 'Infra & Support' },
      ],
      highlights: [
        'Internal IT Infrastructure & Hardware Support',
        'Network Operations & Real-world Troubleshooting',
        'Corporate Database & Application Workflow Assistance',
      ],
    },
  ];

  const current = journeySteps[activeStep];

  return (
    <section
      id="academic"
      data-section-id="academic"
      className="w-full md:w-screen md:min-w-[100vw] min-h-[100dvh] md:h-[100dvh] shrink-0 md:snap-start md:snap-always flex flex-col justify-between pt-16 pb-6 md:pt-12 md:pb-5 px-4 sm:px-6 md:pl-28 md:pr-14 lg:pl-32 border-b md:border-b-0 md:border-r border-[#36332F] bg-[#1C1B18] relative select-none overflow-hidden"
    >
      {/* Top Header Eyebrow */}
      <div className="flex justify-between items-center pb-1.5 border-b border-[#36332F] w-full shrink-0">
        <span className="text-[10px] sm:text-[11px] font-mono tracking-widest text-[#D5CEC4] uppercase">
          03 — EDUCATION & CAREER ROADMAP
        </span>
        <span className="text-[10px] sm:text-[11px] font-mono tracking-widest text-[#8C8880] uppercase hidden sm:inline">
          SMAN 8 BEKASI • UNIV BANI SALEH • FMM HEAD OFFICE
        </span>
      </div>

      {/* Main Section Header */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 items-end border-b border-[#36332F] pb-1.5 w-full shrink-0">
        <div className="sm:col-span-7 flex items-baseline space-x-2">
          <h2 className="font-serif-display text-xl sm:text-2xl md:text-3xl lg:text-4xl text-[#ECE8E1] font-normal tracking-tight uppercase leading-none">
            JOURNEY ROADMAP
          </h2>
          <span className="font-serif-display text-sm sm:text-base md:text-lg text-[#8C8880]">
            (3 WAYPOINTS)
          </span>
        </div>

        {/* Waypoint Selector Controls */}
        <div className="sm:col-span-5 flex items-center justify-between sm:justify-end space-x-1.5 font-mono text-xs">
          <span className="text-[#8C8880] uppercase tracking-wider hidden md:inline text-[10px]">
            WAYPOINT:
          </span>
          <div className="flex items-center space-x-1 w-full sm:w-auto justify-between sm:justify-end">
            {journeySteps.map((step, idx) => (
              <button
                key={step.id}
                type="button"
                onClick={() => setActiveStep(idx)}
                className={`flex-1 sm:flex-initial px-2 py-1 sm:py-0.5 border transition-all cursor-pointer uppercase tracking-wider text-[9px] sm:text-[10px] text-center ${
                  activeStep === idx
                    ? 'border-[#ECE8E1] bg-[#ECE8E1] text-[#1C1B18] font-bold'
                    : 'border-[#36332F] bg-[#23221E] text-[#8C8880] hover:text-[#ECE8E1] hover:border-[#8C8880]'
                }`}
              >
                0{step.stepNum} {step.stepNum === 1 ? 'SMA' : step.stepNum === 2 ? 'UNIV' : 'INTERN'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Interactive Stage: S-Curve Highway Vector Map + Right HUD Detail Card */}
      <div
        data-no-pan="true"
        className="my-auto w-full max-w-7xl grid grid-cols-1 md:grid-cols-12 gap-2.5 sm:gap-3.5 items-stretch py-0.5"
      >
        {/* Left Column: 3D Elevated S-Curve Highway Illustration */}
        <div className="md:col-span-6 lg:col-span-7 bg-[#141311] border border-[#36332F] relative min-h-[220px] flex flex-col justify-between overflow-hidden p-2.5 sm:p-3">
          {/* Subtle Isometric Road Terrain Pattern */}
          <div
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(circle, #8C8880 1px, transparent 1px)`,
              backgroundSize: '24px 24px',
            }}
          />

          {/* Top Stage Metadata */}
          <div className="w-full flex items-center justify-between font-mono text-[8px] sm:text-[9px] uppercase tracking-wider pb-1 z-10 border-b border-[#36332F]/50 shrink-0">
            <span className="text-[#8C8880]">ROADMAP // WAYPOINT 0{current.stepNum}</span>
            <span className="flex items-center space-x-1 text-[#ECE8E1] truncate max-w-[180px] sm:max-w-none">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ECE8E1]" />
              <span>{current.title}</span>
            </span>
          </div>

          {/* 3D S-Curve Highway SVG Illustration */}
          <div className="relative w-full max-w-[520px] flex-1 min-h-[160px] sm:min-h-[190px] mx-auto flex items-center justify-center my-auto">
            <svg
              viewBox="0 0 540 300"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full max-h-[240px] overflow-visible drop-shadow-[0_20px_32px_rgba(0,0,0,0.9)]"
            >
              <defs>
                {/* Road surface gradient */}
                <linearGradient id="roadSurface" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#1E1D19" />
                  <stop offset="50%" stopColor="#2A2823" />
                  <stop offset="100%" stopColor="#1E1D19" />
                </linearGradient>

                {/* Road depth / concrete thickness gradient */}
                <linearGradient id="roadDepth" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#38352F" />
                  <stop offset="100%" stopColor="#141311" />
                </linearGradient>
              </defs>

              {/* Highway Shadow Underneath */}
              <path
                d="M 40 236 C 140 236, 170 156, 270 156 C 370 156, 400 86, 500 86"
                stroke="#080807"
                strokeWidth="48"
                strokeLinecap="round"
                opacity="0.8"
                transform="translate(0, 18)"
              />

              {/* Elevated Road Slab Thickness (Concrete Side / 3D Base) */}
              <path
                d="M 40 226 C 140 226, 170 146, 270 146 C 370 146, 400 76, 500 76"
                stroke="url(#roadDepth)"
                strokeWidth="44"
                strokeLinecap="round"
              />

              {/* Main Asphalt Road Surface */}
              <path
                d="M 40 220 C 140 220, 170 140, 270 140 C 370 140, 400 70, 500 70"
                stroke="url(#roadSurface)"
                strokeWidth="40"
                strokeLinecap="round"
              />

              {/* Road Outer Edge White Curbs */}
              <path
                d="M 40 202 C 140 202, 170 122, 270 122 C 370 122, 400 52, 500 52"
                stroke="#ECE8E1"
                strokeWidth="1.2"
                opacity="0.6"
              />
              <path
                d="M 40 238 C 140 238, 170 158, 270 158 C 370 158, 400 88, 500 88"
                stroke="#8C8880"
                strokeWidth="1.2"
                opacity="0.5"
              />

              {/* Dashed Center Road Stripe */}
              <path
                d="M 40 220 C 140 220, 170 140, 270 140 C 370 140, 400 70, 500 70"
                stroke="#ECE8E1"
                strokeWidth="2.5"
                strokeDasharray="14 12"
                opacity="0.8"
              />

              {/* Small "START" Flag on the road start */}
              <g transform="translate(68, 180)">
                <line x1="0" y1="0" x2="0" y2="28" stroke="#ECE8E1" strokeWidth="1.5" />
                <polygon points="0,0 46,6 0,16" fill="#23221E" stroke="#ECE8E1" strokeWidth="0.8" />
                <text x="6" y="10" fill="#ECE8E1" fontSize="7" fontFamily="monospace" fontWeight="bold" letterSpacing="0.5">
                  START
                </text>
              </g>

              {/* 3D MAP PINS ALONG THE HIGHWAY (With Large Hit Area & Pointer Cursor) */}

              {/* PIN 1: SMAN 8 BEKASI (X: 130, Y: 206) */}
              <g
                onClick={() => setActiveStep(0)}
                className="cursor-pointer group pointer-events-auto"
                transform="translate(130, 206)"
              >
                {/* Large Invisible Hitbox (Prevents click misses) */}
                <rect x="-60" y="-80" width="120" height="110" fill="transparent" />

                {/* Ground Shadow */}
                <ellipse cx="0" cy="4" rx="14" ry="5" fill="#000000" opacity="0.6" />
                {/* Pulsing Target Ring if active */}
                {activeStep === 0 && (
                  <ellipse cx="0" cy="4" rx="20" ry="7" fill="none" stroke="#ECE8E1" strokeWidth="1.5" opacity="0.8" className="animate-ping" />
                )}
                {/* Teardrop Pin Shape */}
                <g className="transition-transform duration-300 group-hover:-translate-y-2">
                  <path
                    d="M 0 0 C -12 -12, -14 -24, 0 -38 C 14 -24, 12 -12, 0 0 Z"
                    fill={activeStep === 0 ? "#ECE8E1" : "#23221E"}
                    stroke={activeStep === 0 ? "#1C1B18" : "#8C8880"}
                    strokeWidth="1.5"
                    filter="drop-shadow(0 8px 12px rgba(0,0,0,0.6))"
                  />
                  {/* Inner Badge */}
                  <circle cx="0" cy="-24" r="8.5" fill={activeStep === 0 ? "#1C1B18" : "#36332F"} />
                  <text x="0" y="-20.5" fill={activeStep === 0 ? "#ECE8E1" : "#A29D93"} fontSize="10" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
                    1
                  </text>
                </g>
                {/* Pin Header Text */}
                <rect x="-48" y="-56" width="96" height="15" fill="#1C1B18" stroke={activeStep === 0 ? "#ECE8E1" : "#36332F"} rx="2" />
                <text x="0" y="-46" fill={activeStep === 0 ? "#ECE8E1" : "#8C8880"} fontSize="7.5" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                  SMAN 8 BEKASI
                </text>
              </g>

              {/* PIN 2: UNIVERSITAS BANI SALEH (X: 270, Y: 128) */}
              <g
                onClick={() => setActiveStep(1)}
                className="cursor-pointer group pointer-events-auto"
                transform="translate(270, 128)"
              >
                {/* Large Invisible Hitbox */}
                <rect x="-65" y="-80" width="130" height="110" fill="transparent" />

                {/* Ground Shadow */}
                <ellipse cx="0" cy="4" rx="14" ry="5" fill="#000000" opacity="0.6" />
                {activeStep === 1 && (
                  <ellipse cx="0" cy="4" rx="20" ry="7" fill="none" stroke="#ECE8E1" strokeWidth="1.5" opacity="0.8" className="animate-ping" />
                )}
                <g className="transition-transform duration-300 group-hover:-translate-y-2">
                  <path
                    d="M 0 0 C -12 -12, -14 -24, 0 -38 C 14 -24, 12 -12, 0 0 Z"
                    fill={activeStep === 1 ? "#ECE8E1" : "#23221E"}
                    stroke={activeStep === 1 ? "#1C1B18" : "#8C8880"}
                    strokeWidth="1.5"
                    filter="drop-shadow(0 8px 12px rgba(0,0,0,0.6))"
                  />
                  <circle cx="0" cy="-24" r="8.5" fill={activeStep === 1 ? "#1C1B18" : "#36332F"} />
                  <text x="0" y="-20.5" fill={activeStep === 1 ? "#ECE8E1" : "#A29D93"} fontSize="10" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
                    2
                  </text>
                </g>
                <rect x="-56" y="-56" width="112" height="15" fill="#1C1B18" stroke={activeStep === 1 ? "#ECE8E1" : "#36332F"} rx="2" />
                <text x="0" y="-46" fill={activeStep === 1 ? "#ECE8E1" : "#8C8880"} fontSize="7.5" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                  UNIV. BANI SALEH
                </text>
              </g>

              {/* PIN 3: FMM HEAD OFFICE BEKASI (X: 420, Y: 68) */}
              <g
                onClick={() => setActiveStep(2)}
                className="cursor-pointer group pointer-events-auto"
                transform="translate(420, 68)"
              >
                {/* Large Invisible Hitbox */}
                <rect x="-65" y="-80" width="130" height="110" fill="transparent" />

                {/* Ground Shadow */}
                <ellipse cx="0" cy="4" rx="14" ry="5" fill="#000000" opacity="0.6" />
                {activeStep === 2 && (
                  <ellipse cx="0" cy="4" rx="20" ry="7" fill="none" stroke="#ECE8E1" strokeWidth="1.5" opacity="0.8" className="animate-ping" />
                )}
                <g className="transition-transform duration-300 group-hover:-translate-y-2">
                  <path
                    d="M 0 0 C -12 -12, -14 -24, 0 -38 C 14 -24, 12 -12, 0 0 Z"
                    fill={activeStep === 2 ? "#ECE8E1" : "#23221E"}
                    stroke={activeStep === 2 ? "#1C1B18" : "#8C8880"}
                    strokeWidth="1.5"
                    filter="drop-shadow(0 8px 12px rgba(0,0,0,0.6))"
                  />
                  <circle cx="0" cy="-24" r="8.5" fill={activeStep === 2 ? "#1C1B18" : "#36332F"} />
                  <text x="0" y="-20.5" fill={activeStep === 2 ? "#ECE8E1" : "#A29D93"} fontSize="10" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
                    3
                  </text>
                </g>
                <rect x="-56" y="-56" width="112" height="15" fill="#1C1B18" stroke={activeStep === 2 ? "#ECE8E1" : "#36332F"} rx="2" />
                <text x="0" y="-46" fill={activeStep === 2 ? "#ECE8E1" : "#8C8880"} fontSize="7.5" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                  FMM HEAD OFFICE
                </text>
              </g>
            </svg>
          </div>

          {/* Interactive Navigation Hint */}
          <div className="w-full flex items-center justify-between font-mono text-[8px] sm:text-[9px] uppercase tracking-wider border-t border-[#36332F]/60 pt-1 z-10 shrink-0">
            <span>CLICK PIN (1, 2, 3) TO INSPECT</span>
            <span className="text-[#ECE8E1] font-semibold">{current.status}</span>
          </div>
        </div>

        {/* Right Column: Detailed Waypoint Dossier Card */}
        <div className="md:col-span-6 lg:col-span-5 bg-[#23221E] border border-[#36332F] p-2.5 sm:p-3 flex flex-col justify-between shadow-lg">
          {/* Header Spec Info */}
          <div className="space-y-1">
            <div className="flex items-center justify-between pb-1 border-b border-[#36332F]">
              <div className="flex items-center space-x-1.5 font-mono text-xs">
                <span className="px-1.5 py-0.5 font-bold text-[#1C1B18] bg-[#ECE8E1] text-[9px] sm:text-[10px] rounded-[2px]">
                  WAYPOINT 0{current.stepNum}
                </span>
                <span className="text-[#8C8880] uppercase tracking-wider text-[9px] sm:text-[10px]">
                  {current.badge}
                </span>
              </div>
              <span className="font-mono text-[9px] sm:text-[10px] text-[#D5CEC4] uppercase tracking-wider">
                {current.period}
              </span>
            </div>

            <div>
              <h3 className="font-serif-display text-lg sm:text-xl md:text-2xl text-[#ECE8E1] font-normal leading-tight">
                {current.title}
              </h3>
              <div className="font-mono text-[10px] sm:text-xs text-[#ECE8E1] font-medium mt-0.5">
                {current.role}
              </div>
              <div className="font-mono text-[9px] sm:text-[10px] text-[#8C8880] uppercase tracking-wider">
                {current.location} • <span className="text-[#D5CEC4]">{current.status}</span>
              </div>
            </div>

            <p className="font-mono text-[9px] sm:text-[10px] md:text-[11px] text-[#A29D93] leading-relaxed pt-0.5 line-clamp-2">
              "{current.desc}"
            </p>
          </div>

          {/* Key Metrics Grid */}
          <div className="pt-1 border-t border-[#36332F] space-y-1 font-mono text-xs">
            <div className="grid grid-cols-2 gap-1.5">
              {current.stats.map((st, sIdx) => (
                <div
                  key={sIdx}
                  className="bg-[#1C1B18] border border-[#36332F] px-2 py-1 flex flex-col justify-between"
                >
                  <span className="text-[8px] text-[#8C8880] uppercase tracking-wider">
                    {st.label}
                  </span>
                  <span
                    className={`font-semibold text-[10px] sm:text-[11px] mt-0.5 truncate ${
                      st.highlight ? 'text-[#ECE8E1]' : 'text-[#D5CEC4]'
                    }`}
                  >
                    {st.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Scope / Highlights */}
            <div className="bg-[#1C1B18] border border-[#36332F] p-1.5 space-y-0.5">
              <span className="text-[8px] text-[#8C8880] uppercase tracking-widest block pb-0.5 border-b border-[#36332F]/50">
                MILESTONE ACHIEVEMENTS & FOCUS
              </span>
              <ul className="space-y-0.5 text-[9px] sm:text-[10px] md:text-[11px] text-[#ECE8E1] font-sans">
                {current.highlights.map((item, dIdx) => (
                  <li key={dIdx} className="flex items-start space-x-1.5">
                    <span className="font-mono text-xs font-bold leading-none shrink-0 text-[#ECE8E1]">
                      ✦
                    </span>
                    <span className="line-clamp-1">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bar */}
      <div className="pt-1.5 border-t border-[#36332F] flex flex-wrap gap-2 justify-between items-center text-[9px] sm:text-[10px] font-mono text-[#8C8880] uppercase tracking-wider w-full shrink-0">
        <span>3-STAGE ROADMAP: SMAN 8 BEKASI (2019-2022) → UNIV. BANI SALEH (2023-2027) → FMM HEAD OFFICE INTERN (2024-PRES.)</span>
        <span>ABDILA ASY SYAFIQ</span>
      </div>
    </section>
  );
}






