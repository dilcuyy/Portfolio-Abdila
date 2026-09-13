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
        '.edu-master-card',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
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
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const ipkRatio = Math.min(Math.max(ipkNum / 4.0, 0), 1);
  const strokeDashoffset = circumference - circumference * (isInView ? ipkRatio : 0);

  const horizontalProgressPercent = (activeSmtIndex / (semesters.length - 1)) * 100;

  return (
    <section
      id="education"
      ref={sectionRef}
      className="py-20 md:py-32 border-b border-[#2B2A26] bg-[#0B0B09] relative overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12 space-y-10">
        
        {/* Restored Original Section Header & Degree Meta */}
        <div className="space-y-4">
          <div className="flex justify-between items-center pb-4 border-b border-[#2B2A26] text-xs font-mono text-[#A7A39A]">
            <span className="uppercase tracking-widest text-[#D8D0BF]">02 — ACADEMIC JOURNEY</span>
            <span className="uppercase tracking-widest text-[#A7A39A]">BEKASI, INDONESIA</span>
          </div>

          <div className="space-y-2">
            <h2 className="text-section-heading font-bebas text-[#F2EEE5] uppercase tracking-tight leading-none">
              EDUCATION
            </h2>
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <p className="text-2xl sm:text-3xl font-bebas text-[#D8D0BF] tracking-wide uppercase">
                Sarjana Sistem Informasi (S.Kom)
              </p>
              <p className="text-xs font-mono text-[#A7A39A] uppercase tracking-widest">
                Universitas Bani Saleh • 2023 — 2027
              </p>
            </div>
          </div>
        </div>

        {/* Master Unified Editorial Card (Uniform Locked Height) */}
        <div className="edu-master-card ios-glass-card rounded-3xl p-6 sm:p-8 md:p-10 border border-white/[0.08] shadow-[0_24px_50px_rgba(0,0,0,0.6)] space-y-6">
          
          {/* Card Top: Active Semester Overview & Live Status Pill */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center space-x-3">
              <span className="text-xs sm:text-sm font-mono font-bold text-[#D8D0BF] uppercase tracking-wider">
                SEMESTER 0{activeSmt.smt} OVERVIEW
              </span>
              <span className="text-[11px] font-mono text-[#A7A39A] hidden sm:inline">
                • {activeSmt.period}
              </span>
            </div>

            {/* Live Activity Status Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full ios-glass border border-white/[0.09] text-xs font-mono text-[#F2EEE5] shrink-0">
              <span
                className={`w-2 h-2 rounded-full ${
                  activeSmt.status === 'Aktif Berjalan'
                    ? 'bg-emerald-400 animate-pulse'
                    : 'bg-[#D8D0BF]'
                }`}
              />
              <span className="capitalize text-[11px] sm:text-xs">
                {activeSmt.status.toLowerCase()} • Semester 0{activeSmt.smt}
              </span>
            </div>
          </div>

          {/* Horizontal Interactive Timeline Track */}
          <div className="space-y-3">
            {/* Continuous Progress Bar Line */}
            <div className="relative w-full h-0.5 bg-white/[0.08] rounded-full overflow-hidden">
              <div
                className="absolute top-0 left-0 h-full bg-[#D8D0BF] rounded-full transition-all duration-500 ease-out"
                style={{
                  width: `${horizontalProgressPercent}%`,
                }}
              />
            </div>

            {/* Professional 7-Pill Semester Grid (100% Visible on Mobile & Desktop) */}
            <div className="grid grid-cols-7 gap-1.5 sm:gap-2 select-none">
              {semesters.map((item, idx) => {
                const isActive = idx === activeSmtIndex;
                const year = item.period.split(' ')[0];
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveSmtIndex(idx)}
                    className={`ios-press rounded-xl py-2 sm:py-2.5 flex flex-col items-center justify-center transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#F2EEE5] text-[#0B0B09] font-bold shadow-[0_4px_16px_rgba(242,238,229,0.25)] ring-1 ring-white/50'
                        : 'bg-white/[0.03] text-[#A7A39A] hover:text-[#F2EEE5] hover:bg-white/[0.07] border border-white/[0.06]'
                    }`}
                    aria-label={`Semester ${item.smt}`}
                  >
                    <span className="text-xs sm:text-sm font-mono font-bold leading-none">
                      0{item.smt}
                    </span>
                    <span className="hidden sm:block text-[10px] font-mono opacity-70 mt-1">
                      {year}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Unified 2-Column Body: Left Metrics + Right Portrait (Matching Locked Heights) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch pt-6 border-t border-white/[0.08]">
            
            {/* Left Column: Academic Metrics (Locked Fixed Height - Zero Layout Shift) */}
            <div className="lg:col-span-7 flex flex-col justify-between h-[340px] sm:h-[380px]">
              
              {/* Metric 1: Semester IPS (Fixed-Height Row) */}
              <div className="space-y-1">
                <span className="text-[11px] font-mono text-[#A7A39A] uppercase tracking-widest block">
                  SEMESTER IPS
                </span>

                <div className="h-12 sm:h-14 flex items-center">
                  {activeSmt.ips === 'Ongoing' || activeSmt.ips === '—' ? (
                    <div className="flex items-center space-x-2.5 text-lg sm:text-xl font-medium text-[#F2EEE5]">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                      <span>Sedang berjalan • {activeSmt.sksSmt} SKS diambil</span>
                    </div>
                  ) : (
                    <div className="flex items-baseline space-x-3">
                      <span className="text-3xl sm:text-4xl font-mono font-bold text-[#F2EEE5] tracking-tight">
                        {animatedIps} IPS
                      </span>
                      <span className="text-xs font-mono text-[#A7A39A]">
                        • {activeSmt.sksSmt} SKS diambil
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Metric 2: Cumulative IPK & Radial Ring (Fixed-Height Row) */}
              <div className="h-20 sm:h-24 flex items-center space-x-6 sm:space-x-8 pt-1">
                {/* SVG Radial Ring (Transparent Background / No Drop-Shadow Artifacts) */}
                <div className="relative w-20 h-20 sm:w-22 sm:h-22 shrink-0 flex items-center justify-center bg-transparent">
                  <svg
                    className="w-full h-full transform -rotate-90 bg-transparent overflow-visible"
                    viewBox="0 0 100 100"
                  >
                    <circle
                      cx="50"
                      cy="50"
                      r={radius}
                      className="stroke-white/[0.08]"
                      strokeWidth="8"
                      fill="transparent"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r={radius}
                      className="stroke-[#D8D0BF] transition-all duration-700 ease-out"
                      strokeWidth="8"
                      strokeDasharray={circumference}
                      strokeDashoffset={strokeDashoffset}
                      strokeLinecap="round"
                      fill="transparent"
                    />
                  </svg>
                  <div className="absolute flex flex-col items-center justify-center text-center pointer-events-none select-none">
                    <span className="text-xs sm:text-sm font-mono font-bold text-[#F2EEE5]">
                      {Math.round(ipkRatio * 100)}%
                    </span>
                  </div>
                </div>

                {/* IPK Number & SKS Detail */}
                <div className="space-y-1">
                  <div className="flex items-baseline space-x-2">
                    <span className="text-3xl sm:text-4xl font-mono font-bold text-[#F2EEE5]">
                      {animatedIpk}
                    </span>
                    <span className="text-xs sm:text-sm font-mono text-[#A7A39A]">/ 4.00 ipk</span>
                  </div>
                  <p className="text-xs font-mono text-[#A7A39A]">
                    total sks kumulatif: <span className="text-[#F2EEE5] font-semibold">{activeSmt.totalSks} sks</span>
                  </p>
                </div>
              </div>

              {/* Metric 3: Fokus Mata Kuliah (Fixed-Height Container) */}
              <div className="pt-4 border-t border-white/[0.06] space-y-2">
                <span className="text-[11px] font-mono text-[#A7A39A] uppercase tracking-widest block">
                  FOKUS MATA KULIAH
                </span>
                <div className="h-[48px] sm:h-[52px] flex flex-col justify-center space-y-1.5">
                  {activeSmt.featuredSubjects &&
                    activeSmt.featuredSubjects.map((sub, idx) => (
                      <div
                        key={idx}
                        className="flex items-center space-x-2.5 text-sm sm:text-base text-[#F2EEE5] font-light truncate"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#D8D0BF]/70 shrink-0" />
                        <span className="truncate">{sub}</span>
                      </div>
                    ))}
                </div>
              </div>

            </div>

            {/* Right Column: Academic Portrait Photo Card (Equal Height) */}
            <div className="lg:col-span-5 w-full">
              <div
                ref={photoCardRef}
                className="relative h-[340px] sm:h-[380px] rounded-2xl sm:rounded-3xl overflow-hidden border border-white/[0.08] bg-[#141411] group flex flex-col justify-end transition-transform duration-300 ease-out"
              >
                <img
                  src={portfolioData.education.image}
                  alt="Potret Akademik Abdila Asy Syafiq"
                  className="absolute inset-0 w-full h-full object-cover grayscale opacity-75 contrast-110 pointer-events-none"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B09] via-[#0B0B09]/40 to-transparent" />
                
                {/* Caption Overlay */}
                <div className="relative z-10 p-5 sm:p-6 space-y-1">
                  <span className="text-[10px] font-mono text-[#A7A39A] uppercase tracking-widest block">
                    POTRET AKADEMIK • BEKASI
                  </span>
                  <p className="text-xl sm:text-2xl font-bebas text-[#F2EEE5] uppercase tracking-wide">
                    {portfolioData.personal.name}
                  </p>
                  <p className="text-xs font-mono text-[#D8D0BF]">
                    {portfolioData.education.university} • {portfolioData.education.degree}
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}




