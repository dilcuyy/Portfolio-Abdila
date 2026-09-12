import React, { useEffect, useRef, useState, useMemo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { portfolioData } from '../data/portfolio';

gsap.registerPlugin(ScrollTrigger);

// Custom Count-Up Hook for numeric stats
function useCountUp(targetVal, isVisible) {
  const [displayVal, setDisplayVal] = useState('0.00');

  useEffect(() => {
    if (!targetVal || targetVal === 'Ongoing' || targetVal === '—' || isNaN(parseFloat(targetVal))) {
      setDisplayVal(targetVal || '0.00');
      return;
    }

    if (!isVisible) {
      setDisplayVal('0.00');
      return;
    }

    const targetNum = parseFloat(targetVal);
    let startTimestamp = null;
    const duration = 750; // ms

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easeOut = progress * (2 - progress);
      const current = easeOut * targetNum;
      setDisplayVal(current.toFixed(2));

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    const frameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameId);
  }, [targetVal, isVisible]);

  return displayVal;
}

export default function Education() {
  const sectionRef = useRef(null);
  const photoCardRef = useRef(null);
  const semesters = portfolioData.education.semesters || [];

  const [activeSmtIndex, setActiveSmtIndex] = useState(semesters.length - 1);
  const [hoveredSmtIndex, setHoveredSmtIndex] = useState(null);
  const [isInView, setIsInView] = useState(false);

  const activeSmt = useMemo(
    () => semesters[activeSmtIndex] || semesters[semesters.length - 1],
    [semesters, activeSmtIndex]
  );

  // Animated Count-Up Values
  const animatedIps = useCountUp(activeSmt.ips, isInView);
  const animatedIpk = useCountUp(activeSmt.ipk, isInView);

  // Intersection Observer for triggering count-up & view animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.25 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Parallax effect on photo card without useState (direct DOM mutation)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const handleScroll = () => {
      if (!photoCardRef.current || !sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      if (rect.top < windowHeight && rect.bottom > 0) {
        const scrolledRatio = (windowHeight - rect.top) / (windowHeight + rect.height);
        const parallaxY = (scrolledRatio - 0.5) * 40; // max 20px translation
        photoCardRef.current.style.transform = `translate3d(0, ${parallaxY}px, 0)`;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // GSAP Entrance Animations
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.edu-el',
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Radial Progress Ring calculations (IPK / 4.00)
  const ipkNum = parseFloat(activeSmt.ipk) || 0;
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const ipkRatio = Math.min(Math.max(ipkNum / 4.0, 0), 1);
  const strokeDashoffset = circumference - circumference * (isInView ? ipkRatio : 0);

  const verticalProgressPercent = (activeSmtIndex / (semesters.length - 1)) * 100;

  return (
    <section
      id="education"
      ref={sectionRef}
      className="py-24 md:py-32 border-b border-[#2B2A26] bg-[#0B0B09] relative overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12 space-y-16">
        {/* Hairline Divider Header */}
        <div className="edu-el flex justify-between items-center pb-4 border-b border-[#2B2A26] text-xs font-mono text-[#A7A39A]">
          <span className="uppercase tracking-widest text-[#D8D0BF]">02 — ACADEMIC JOURNEY</span>
          <span className="uppercase tracking-widest text-[#A7A39A]">BEKASI, INDONESIA</span>
        </div>

        {/* Section Heading & Degree Meta */}
        <div className="edu-el space-y-2">
          <h2 className="text-section-heading font-bebas text-[#F2EEE5] uppercase tracking-tight leading-none">
            EDUCATION
          </h2>
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <p className="text-2xl sm:text-3xl font-bebas text-[#D8D0BF] tracking-wide uppercase">
              {portfolioData.education.degree}
            </p>
            <p className="text-xs font-mono text-[#A7A39A] uppercase tracking-widest">
              {portfolioData.education.university} • 2023 — 2027
            </p>
          </div>
        </div>

        {/* Main Grid: Interactive Vertical Timeline + Stats Panel + Floating Photo */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Interactive Vertical Timeline (Node 01 - 07) */}
          <div className="edu-el lg:col-span-3 space-y-4 relative z-30">
            <div className="flex items-center justify-between text-xs font-mono text-[#A7A39A] pb-2 border-b border-[#2B2A26]">
              <span className="uppercase tracking-widest">TIMELINE NODES</span>
              <span className="text-[#D8D0BF] font-semibold">0{activeSmt.smt} / 07</span>
            </div>

            {/* Desktop Vertical Timeline Bar */}
            <div className="hidden lg:block relative py-4 px-2">
              {/* Vertical Track Line */}
              <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-[#2B2A26] rounded-full" />
              {/* Vertical Progress Fill Line */}
              <div
                className="absolute left-6 top-6 w-0.5 bg-[#D8D0BF] rounded-full transition-all duration-500 ease-out"
                style={{ height: `calc(${verticalProgressPercent}% * 0.85)` }}
              />

              {/* Stacked Vertical Semester Nodes */}
              <div className="space-y-6 relative z-10">
                {semesters.map((item, idx) => {
                  const isActive = idx === activeSmtIndex;
                  const isHovered = idx === hoveredSmtIndex;

                  return (
                    <div
                      key={item.id}
                      className="relative flex items-center space-x-4 group cursor-pointer"
                      onMouseEnter={() => setHoveredSmtIndex(idx)}
                      onMouseLeave={() => setHoveredSmtIndex(null)}
                      onClick={() => setActiveSmtIndex(idx)}
                    >
                      {/* Node Button Circle */}
                      <button
                        type="button"
                        className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-mono transition-all duration-300 cursor-pointer ios-press ${
                          isActive
                            ? 'bg-[#D8D0BF] text-[#0B0B09] font-bold shadow-[0_0_20px_rgba(216,208,191,0.35)] ring-4 ring-[#D8D0BF]/25 scale-105'
                            : 'bg-[#161612] text-[#A7A39A] border border-[#2B2A26] hover:border-[#D8D0BF]/60 hover:text-[#F2EEE5]'
                        }`}
                        aria-label={`Select Semester ${item.smt}`}
                      >
                        0{item.smt}
                      </button>

                      {/* Node Label Info */}
                      <div className="flex flex-col text-left">
                        <span className={`text-xs font-mono uppercase tracking-wider transition-colors ${
                          isActive ? 'text-[#F2EEE5] font-bold' : 'text-[#A7A39A] group-hover:text-[#F2EEE5]'
                        }`}>
                          {item.label}
                        </span>
                        <span className="text-[10px] font-mono text-[#A7A39A]/70">
                          {item.period}
                        </span>
                      </div>

                      {/* Tooltip Card on Hover */}
                      {isHovered && (
                        <div className="absolute left-[148px] top-1/2 -translate-y-1/2 z-50 w-56 p-3.5 ios-glass rounded-2xl shadow-2xl text-left pointer-events-none animate-fadeIn">
                          <div className="flex items-center justify-between text-[11px] font-mono text-[#D8D0BF] font-semibold border-b border-white/[0.08] pb-1.5 mb-2">
                            <span>SEMESTER 0{item.smt}</span>
                            <span className="text-[#F2EEE5]">{item.sksSmt} SKS</span>
                          </div>
                          <div className="space-y-1 text-xs font-mono text-[#A7A39A]">
                            <span className="text-[10px] uppercase text-[#D8D0BF]/80 block tracking-widest">
                              FEATURED SUBJECTS
                            </span>
                            {item.featuredSubjects && item.featuredSubjects.map((sub, sIdx) => (
                              <p key={sIdx} className="text-[#F2EEE5] text-[11px] leading-tight">
                                • {sub}
                              </p>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Mobile / Tablet Premium Timeline Scrubber (iOS 17 Tactile Slider Card) */}
            <div className="lg:hidden space-y-4 p-4 sm:p-5 ios-glass-card rounded-3xl shadow-2xl">
              {/* Header Stepper Navigation with Prev/Next Controls */}
              <div className="flex items-center justify-between text-xs font-mono text-[#A7A39A]">
                <button
                  type="button"
                  onClick={() => setActiveSmtIndex((prev) => Math.max(0, prev - 1))}
                  disabled={activeSmtIndex === 0}
                  className={`p-2 rounded-full border transition-all ios-press ${
                    activeSmtIndex === 0
                      ? 'opacity-30 border-transparent text-[#A7A39A] cursor-not-allowed'
                      : 'border-white/[0.1] bg-white/[0.05] text-[#F2EEE5] hover:border-[#D8D0BF] cursor-pointer'
                  }`}
                  aria-label="Previous Semester"
                >
                  <span className="font-bold text-sm">←</span>
                </button>

                <div className="flex flex-col items-center text-center">
                  <span className="text-[#D8D0BF] font-mono text-xs font-bold uppercase tracking-wider">
                    SEMESTER 0{activeSmt.smt} • {activeSmt.period}
                  </span>
                  <span className="text-[10px] font-mono text-[#A7A39A]">
                    {activeSmt.sksSmt} SKS TAKEN
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveSmtIndex((prev) => Math.min(semesters.length - 1, prev + 1))}
                  disabled={activeSmtIndex === semesters.length - 1}
                  className={`p-2 rounded-full border transition-all ios-press ${
                    activeSmtIndex === semesters.length - 1
                      ? 'opacity-30 border-transparent text-[#A7A39A] cursor-not-allowed'
                      : 'border-white/[0.1] bg-white/[0.05] text-[#F2EEE5] hover:border-[#D8D0BF] cursor-pointer'
                  }`}
                  aria-label="Next Semester"
                >
                  <span className="font-bold text-sm">→</span>
                </button>
              </div>

              {/* Interactive Progress Line Track with Nodes 01-07 */}
              <div className="relative pt-2 pb-1 px-1">
                {/* Horizontal Track Line */}
                <div className="absolute top-1/2 left-4 right-4 h-0.5 bg-white/[0.1] -translate-y-1/2 rounded-full" />
                {/* Filled Progress Line */}
                <div
                  className="absolute top-1/2 left-4 h-0.5 bg-[#D8D0BF] -translate-y-1/2 rounded-full transition-all duration-300 ease-out"
                  style={{
                    width: `calc(${verticalProgressPercent}% * 0.88)`,
                  }}
                />

                {/* Nodes 01 - 07 Row */}
                <div className="relative z-10 flex justify-between items-center">
                  {semesters.map((item, idx) => {
                    const isActive = idx === activeSmtIndex;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setActiveSmtIndex(idx)}
                        className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-xs font-mono transition-all duration-300 cursor-pointer ios-press ${
                          isActive
                            ? 'bg-[#D8D0BF] text-[#0B0B09] font-bold shadow-[0_0_16px_rgba(216,208,191,0.4)] ring-4 ring-[#D8D0BF]/25 scale-105'
                            : 'bg-[#161612] text-[#A7A39A] border border-white/[0.08] hover:border-[#D8D0BF]/60'
                        }`}
                        aria-label={`Select Semester ${item.smt}`}
                      >
                        0{item.smt}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Middle Column: Active Semester Performance Stats (iOS 17 Widget Card) */}
          <div className="edu-el lg:col-span-5 space-y-6 ios-glass-card rounded-3xl p-6 sm:p-8 relative min-h-[380px] flex flex-col justify-between shadow-2xl">
            {/* Header info of active semester */}
            <div key={activeSmt.id} className="space-y-4 animate-fadeIn">
              <div className="flex items-center justify-between gap-2 border-b border-white/[0.08] pb-3 text-xs font-mono">
                <span className="text-[#D8D0BF] uppercase tracking-wider font-bold text-[11px] sm:text-xs truncate">
                  SEMESTER 0{activeSmt.smt} OVERVIEW
                </span>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.06] border border-white/[0.1] backdrop-blur-md shadow-inner text-[#F2EEE5] text-[10px] sm:text-[11px] font-mono font-medium shrink-0 whitespace-nowrap">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D8D0BF] animate-pulse" />
                  <span>{activeSmt.status}</span>
                </div>
              </div>

              {/* Main IPS Metric Display */}
              <div className="space-y-1 pt-2">
                <span className="text-[11px] font-mono text-[#A7A39A] uppercase tracking-widest block">
                  SEMESTER IPS
                </span>

                {activeSmt.ips === 'Ongoing' || activeSmt.ips === '—' ? (
                  <div className="h-16 flex items-center space-x-3 text-xl sm:text-2xl font-bebas text-[#D8D0BF] tracking-wide">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#D8D0BF] animate-pulse shrink-0" />
                    <span>IN PROGRESS ({activeSmt.sksSmt} SKS TAKEN)</span>
                  </div>
                ) : (
                  <div className="flex items-baseline space-x-3">
                    <span className="text-5xl sm:text-6xl font-mono font-bold text-[#F2EEE5] tracking-tight leading-none">
                      {animatedIps}
                    </span>
                    <span className="text-xs font-mono text-[#A7A39A]">
                      {activeSmt.sksSmt ? `${activeSmt.sksSmt} SKS TAKEN` : ''}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Radial Progress Ring & Cumulative IPK Box */}
            <div className="pt-6 border-t border-white/[0.08] flex items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-[11px] font-mono text-[#A7A39A] uppercase tracking-widest block">
                  CUMULATIVE IPK
                </span>
                <div className="flex items-baseline space-x-2">
                  <span className="text-3xl sm:text-4xl font-mono font-bold text-[#F2EEE5]">
                    {animatedIpk}
                  </span>
                  <span className="text-xs font-mono text-[#A7A39A]">/ 4.00</span>
                </div>
                <p className="text-[11px] font-mono text-[#A7A39A] pt-1">
                  Total Cumulative SKS: <span className="text-[#F2EEE5] font-semibold">{activeSmt.totalSks} SKS</span>
                </p>
              </div>

              {/* SVG Radial Progress Ring (iOS Activity Ring Aesthetic) */}
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 shrink-0 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  {/* Background Track Circle */}
                  <circle
                    cx="50"
                    cy="50"
                    r={radius}
                    className="stroke-white/[0.08]"
                    strokeWidth="8"
                    fill="transparent"
                  />
                  {/* Active Progress Circle */}
                  <circle
                    cx="50"
                    cy="50"
                    r={radius}
                    className="stroke-[#D8D0BF] transition-all duration-700 ease-out drop-shadow-[0_0_10px_rgba(216,208,191,0.3)]"
                    strokeWidth="8"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    fill="transparent"
                  />
                </svg>
                <div className="absolute flex flex-col items-center justify-center text-center">
                  <span className="text-xs font-mono font-bold text-[#F2EEE5]">
                    {Math.round(ipkRatio * 100)}%
                  </span>
                  <span className="text-[9px] font-mono text-[#A7A39A] uppercase">SCALE</span>
                </div>
              </div>
            </div>

            {/* Featured Subjects Chips for Selected Semester */}
            {activeSmt.featuredSubjects && (
              <div className="pt-4 border-t border-white/[0.08] space-y-2">
                <span className="text-[10px] font-mono text-[#A7A39A] uppercase tracking-widest block">
                  SEMESTER FOCUS SUBJECTS
                </span>
                <div className="flex flex-wrap gap-2">
                  {activeSmt.featuredSubjects.map((sub, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-[#F2EEE5] backdrop-blur-sm"
                    >
                      {sub}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Floating Academic Photo Card with Glassmorphism & Parallax */}
          <div className="edu-el lg:col-span-4 w-full">
            <div
              ref={photoCardRef}
              className="relative min-h-[380px] lg:min-h-[460px] h-full rounded-3xl overflow-hidden border border-white/[0.08] bg-[#141411]/80 backdrop-blur-2xl shadow-2xl group flex flex-col justify-end transition-transform duration-300 ease-out"
            >
              <img
                src={portfolioData.education.image}
                alt="Universitas Bani Saleh Academic Portrait"
                className="absolute inset-0 w-full h-full object-cover grayscale opacity-65 contrast-110 group-hover:grayscale-0 group-hover:opacity-85 transition-all duration-700 pointer-events-none"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B09] via-[#0B0B09]/30 to-transparent" />
              
              {/* Glassmorphism Info Overlay Footer (iOS 17 Frosted Widget) */}
              <div className="relative z-10 p-6 space-y-1.5 m-4 rounded-2xl ios-glass">
                <span className="text-[10px] font-mono text-[#D8D0BF] uppercase tracking-widest block font-semibold">
                  ACADEMIC PORTRAIT • BEKASI
                </span>
                <p className="text-lg font-bebas text-[#F2EEE5] uppercase tracking-wide">
                  UNIVERSITAS BANI SALEH
                </p>
                <p className="text-xs font-mono text-[#A7A39A]">
                  Sarjana Sistem Informasi (S.Kom) • 2023—2027
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}




