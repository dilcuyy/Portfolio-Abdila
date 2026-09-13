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
  const sliderTrackRef = useRef(null);
  const isDragging = useRef(false);
  const lastTouchX = useRef(0);

  const semesters = portfolioData.education.semesters || [];

  const [activeSmtIndex, setActiveSmtIndex] = useState(semesters.length - 1);
  const [isInView, setIsInView] = useState(false);
  const [dragPercent, setDragPercent] = useState(null);
  const [dragDirection, setDragDirection] = useState('none'); // 'left' | 'right' | 'none'
  const [isSliding, setIsSliding] = useState(false);

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

  // Subtle parallax effect on photo card without useState
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const handleScroll = () => {
      if (!photoCardRef.current || !sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      if (rect.top < windowHeight && rect.bottom > 0) {
        const scrolledRatio = (windowHeight - rect.top) / (windowHeight + rect.height);
        const parallaxY = (scrolledRatio - 0.5) * 30;
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

  // Mobile Smooth Aura Slider Drag Handlers
  const handleSliderStart = (clientX) => {
    isDragging.current = true;
    lastTouchX.current = clientX;
    setIsSliding(true);
    updateSliderPosition(clientX);
  };

  const handleSliderMove = (clientX) => {
    if (!isDragging.current || !sliderTrackRef.current) return;

    const delta = clientX - lastTouchX.current;
    if (delta > 2) {
      setDragDirection('right');
    } else if (delta < -2) {
      setDragDirection('left');
    }
    lastTouchX.current = clientX;

    updateSliderPosition(clientX);
  };

  const updateSliderPosition = (clientX) => {
    if (!sliderTrackRef.current) return;
    const rect = sliderTrackRef.current.getBoundingClientRect();
    const offsetX = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const ratio = offsetX / rect.width;
    setDragPercent(ratio * 100);

    const nearestIndex = Math.round(ratio * (semesters.length - 1));
    if (nearestIndex !== activeSmtIndex && nearestIndex >= 0 && nearestIndex < semesters.length) {
      setActiveSmtIndex(nearestIndex);
    }
  };

  const handleSliderEnd = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    setIsSliding(false);
    setDragPercent(null);
    setDragDirection('none');
  };

  useEffect(() => {
    const handleGlobalMouseUp = () => {
      if (isDragging.current) {
        handleSliderEnd();
      }
    };
    window.addEventListener('mouseup', handleGlobalMouseUp);
    return () => window.removeEventListener('mouseup', handleGlobalMouseUp);
  }, []);

  // Radial Progress Ring calculations (IPK / 4.00)
  const ipkNum = parseFloat(activeSmt.ipk) || 0;
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const ipkRatio = Math.min(Math.max(ipkNum / 4.0, 0), 1);
  const strokeDashoffset = circumference - circumference * (isInView ? ipkRatio : 0);

  const horizontalProgressPercent = (activeSmtIndex / (semesters.length - 1)) * 100;
  const currentSliderPercent = dragPercent !== null ? dragPercent : horizontalProgressPercent;

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

        {/* Master Unified Editorial Card */}
        <div className="edu-master-card ios-glass-card rounded-3xl p-6 sm:p-8 md:p-10 border border-white/[0.08] shadow-[0_24px_50px_rgba(0,0,0,0.6)] space-y-6">
          
          {/* Card Top Header: Active Semester Overview & Live Status Pill (Zero Wrapping on Mobile) */}
          <div className="flex items-center justify-between gap-2 border-b border-white/[0.08] pb-3">
            <div className="flex items-center space-x-2.5 min-w-0">
              <span className="text-xs sm:text-sm font-mono font-bold text-[#D8D0BF] uppercase tracking-wider whitespace-nowrap">
                SEMESTER 0{activeSmt.smt}
              </span>
              <span className="text-[11px] font-mono text-[#A7A39A] hidden sm:inline truncate">
                • {activeSmt.period}
              </span>
            </div>

            {/* Live Activity Status Pill */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full ios-glass border border-white/[0.09] text-[11px] sm:text-xs font-mono text-[#F2EEE5] shrink-0 whitespace-nowrap">
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  activeSmt.status === 'Aktif Berjalan'
                    ? 'bg-emerald-400 animate-pulse'
                    : 'bg-[#D8D0BF]'
                }`}
              />
              <span className="capitalize">{activeSmt.status}</span>
            </div>
          </div>

          {/* Mobile Smooth Slider with Trailing White Aura Effect (Visible on Mobile) */}
          <div className="lg:hidden space-y-2 pt-1 select-none">
            <div
              ref={sliderTrackRef}
              className="relative w-full h-11 flex items-center cursor-grab active:cursor-grabbing touch-none px-1"
              onTouchStart={(e) => handleSliderStart(e.touches[0].clientX)}
              onTouchMove={(e) => handleSliderMove(e.touches[0].clientX)}
              onTouchEnd={handleSliderEnd}
              onMouseDown={(e) => handleSliderStart(e.clientX)}
              onMouseMove={(e) => handleSliderMove(e.clientX)}
              onMouseUp={handleSliderEnd}
            >
              {/* Base Background Rail */}
              <div className="absolute left-1 right-1 h-1.5 bg-white/[0.08] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#D8D0BF] rounded-full transition-all duration-150 ease-out"
                  style={{ width: `${currentSliderPercent}%` }}
                />
              </div>

              {/* Trailing White Aura Effect behind Slider Knob */}
              {isSliding && dragDirection === 'right' && (
                <div
                  className="absolute top-1/2 -translate-y-1/2 h-7 bg-gradient-to-r from-transparent via-white/20 to-white/50 blur-md rounded-full pointer-events-none transition-all"
                  style={{
                    left: `calc(${Math.max(0, currentSliderPercent - 26)}% + 6px)`,
                    width: '26%',
                  }}
                />
              )}

              {isSliding && dragDirection === 'left' && (
                <div
                  className="absolute top-1/2 -translate-y-1/2 h-7 bg-gradient-to-l from-transparent via-white/20 to-white/50 blur-md rounded-full pointer-events-none transition-all"
                  style={{
                    left: `calc(${currentSliderPercent}% + 6px)`,
                    width: '26%',
                  }}
                />
              )}

              {/* Ambient Radial Aura Glow on Knob */}
              <div
                className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-14 h-14 rounded-full pointer-events-none transition-opacity duration-200 ${
                  isSliding ? 'opacity-100' : 'opacity-40'
                }`}
                style={{
                  left: `calc(12px + (${currentSliderPercent} / 100) * (100% - 24px))`,
                  background: 'radial-gradient(circle, rgba(255,255,255,0.45) 0%, rgba(216,208,191,0.15) 50%, transparent 70%)',
                }}
              />

              {/* The Slider Knob */}
              <div
                className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-11 h-7 rounded-full bg-[#F2EEE5] text-[#0B0B09] font-mono text-xs font-bold flex items-center justify-center shadow-[0_2px_12px_rgba(255,255,255,0.45)] border border-white transition-transform duration-100 ${
                  isSliding ? 'scale-110 shadow-[0_0_20px_rgba(255,255,255,0.9)]' : ''
                }`}
                style={{
                  left: `calc(12px + (${currentSliderPercent} / 100) * (100% - 24px))`,
                }}
              >
                0{activeSmt.smt}
              </div>
            </div>

            {/* 7 Tick Markers Below Slider Track (Tap to jump) */}
            <div className="flex justify-between items-center px-1 text-[10px] font-mono text-[#A7A39A]">
              {semesters.map((item, idx) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveSmtIndex(idx)}
                  className={`px-1.5 py-0.5 transition-colors cursor-pointer ${
                    idx === activeSmtIndex ? 'text-[#F2EEE5] font-bold' : 'hover:text-[#F2EEE5]'
                  }`}
                >
                  0{item.smt}
                </button>
              ))}
            </div>
          </div>

          {/* Desktop 7-Pill Semester Grid (hidden on mobile, visible on lg) */}
          <div className="hidden lg:block space-y-3">
            {/* Continuous Progress Bar Line */}
            <div className="relative w-full h-0.5 bg-white/[0.08] rounded-full overflow-hidden">
              <div
                className="absolute top-0 left-0 h-full bg-[#D8D0BF] rounded-full transition-all duration-500 ease-out"
                style={{
                  width: `${horizontalProgressPercent}%`,
                }}
              />
            </div>

            <div className="grid grid-cols-7 gap-2 select-none">
              {semesters.map((item, idx) => {
                const isActive = idx === activeSmtIndex;
                const year = item.period.split(' ')[0];
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveSmtIndex(idx)}
                    className={`ios-press rounded-xl py-2.5 flex flex-col items-center justify-center transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#F2EEE5] text-[#0B0B09] font-bold shadow-[0_4px_16px_rgba(242,238,229,0.25)] ring-1 ring-white/50'
                        : 'bg-white/[0.03] text-[#A7A39A] hover:text-[#F2EEE5] hover:bg-white/[0.07] border border-white/[0.06]'
                    }`}
                    aria-label={`Semester ${item.smt}`}
                  >
                    <span className="text-sm font-mono font-bold leading-none">
                      0{item.smt}
                    </span>
                    <span className="text-[10px] font-mono opacity-70 mt-1">
                      {year}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Unified 2-Column Body: Left Metrics + Right Portrait (Locked Equal Heights) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch pt-6 border-t border-white/[0.08]">
            
            {/* Left Column: Academic Metrics (Locked Fixed Height - Zero Layout Shift) */}
            <div className="lg:col-span-7 flex flex-col justify-between h-[320px] sm:h-[360px]">
              
              {/* Metric 1: Semester IPS (Fixed-Height Row, No Text Wrapping) */}
              <div className="space-y-1">
                <span className="text-[10px] sm:text-[11px] font-mono text-[#A7A39A] uppercase tracking-widest block">
                  SEMESTER IPS
                </span>

                <div className="h-10 sm:h-12 flex items-center">
                  {activeSmt.ips === 'Ongoing' || activeSmt.ips === '—' ? (
                    <div className="flex items-center space-x-2 text-sm sm:text-base font-medium text-[#F2EEE5] whitespace-nowrap">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                      <span>Sedang berjalan • {activeSmt.sksSmt} SKS</span>
                    </div>
                  ) : (
                    <div className="flex items-baseline space-x-2.5 whitespace-nowrap">
                      <span className="text-2xl sm:text-3xl font-mono font-bold text-[#F2EEE5] tracking-tight">
                        {animatedIps} IPS
                      </span>
                      <span className="text-xs font-mono text-[#A7A39A]">
                        • {activeSmt.sksSmt} SKS
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Metric 2: Cumulative IPK & Radial Ring (Fixed-Height Row, No Text Wrapping) */}
              <div className="h-20 flex items-center space-x-5 sm:space-x-8 pt-1">
                {/* SVG Radial Ring */}
                <div className="relative w-18 h-18 sm:w-20 sm:h-20 shrink-0 flex items-center justify-center bg-transparent">
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
                <div className="space-y-1 whitespace-nowrap">
                  <div className="flex items-baseline space-x-2">
                    <span className="text-2xl sm:text-3xl font-mono font-bold text-[#F2EEE5]">
                      {animatedIpk}
                    </span>
                    <span className="text-xs sm:text-sm font-mono text-[#A7A39A]">/ 4.00 IPK</span>
                  </div>
                  <p className="text-[11px] sm:text-xs font-mono text-[#A7A39A]">
                    Total Kumulatif: <span className="text-[#F2EEE5] font-semibold">{activeSmt.totalSks} SKS</span>
                  </p>
                </div>
              </div>

              {/* Metric 3: Fokus Mata Kuliah (Fixed-Height Container) */}
              <div className="pt-3 border-t border-white/[0.06] space-y-1.5">
                <span className="text-[10px] sm:text-[11px] font-mono text-[#A7A39A] uppercase tracking-widest block">
                  FOKUS MATA KULIAH
                </span>
                <div className="h-[44px] sm:h-[48px] flex flex-col justify-center space-y-1">
                  {activeSmt.featuredSubjects &&
                    activeSmt.featuredSubjects.map((sub, idx) => (
                      <div
                        key={idx}
                        className="flex items-center space-x-2 text-xs sm:text-sm text-[#F2EEE5] font-light truncate"
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
                className="relative h-[280px] sm:h-[320px] lg:h-[360px] rounded-2xl sm:rounded-3xl overflow-hidden border border-white/[0.08] bg-[#141411] group flex flex-col justify-end transition-transform duration-300 ease-out"
              >
                <img
                  src={portfolioData.education.image}
                  alt="Potret Akademik Abdila Asy Syafiq"
                  className="absolute inset-0 w-full h-full object-cover grayscale opacity-75 contrast-110 pointer-events-none"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B09] via-[#0B0B09]/40 to-transparent" />
                
                {/* Caption Overlay */}
                <div className="relative z-10 p-4 sm:p-6 space-y-1">
                  <span className="text-[10px] font-mono text-[#A7A39A] uppercase tracking-widest block">
                    POTRET AKADEMIK • BEKASI
                  </span>
                  <p className="text-lg sm:text-2xl font-bebas text-[#F2EEE5] uppercase tracking-wide">
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




