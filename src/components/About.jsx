import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { portfolioData } from '../data/portfolio';

gsap.registerPlugin(ScrollTrigger);

const TECH_ITEMS = [
  { id: 'js', name: 'JavaScript', iconSrc: '/icons/javascript.svg' },
  { id: 'react', name: 'React.js', iconSrc: '/icons/react.svg' },
  { id: 'laravel', name: 'Laravel', iconSrc: '/icons/laravel.svg' },
  { id: 'ci4', name: 'CodeIgniter 4', iconSrc: '/icons/codeigniter.svg' },
  { id: 'flutter', name: 'Flutter', iconSrc: '/icons/flutter.svg' },
  { id: 'mysql', name: 'MySQL', iconSrc: '/icons/mysql.svg' },
  { id: 'tailwind', name: 'Tailwind CSS', iconSrc: '/icons/tailwind.svg' },
  { id: 'figma', name: 'Figma', iconSrc: '/icons/figma.svg' },
  { id: 'claude', name: 'Claude AI', iconSrc: '/icons/claude.svg' },
  { id: 'chatgpt', name: 'ChatGPT', iconSrc: '/icons/chatgpt.svg' },
  { id: 'gemini', name: 'Google Gemini', iconSrc: '/icons/gemini.svg' },
];

export default function About() {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const cardRefs = useRef([]);
  const progressRef = useRef(0);
  const reqIdRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.about-el',
        { opacity: 0, y: 20 },
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

    // True arc-length equidistant motion (Spacious gaps, deep sweeping rightward arc)
    const speed = 0.00035;
    const total = TECH_ITEMS.length;

    // Create virtual SVG path for precise constant-speed arc-length calculation
    const pathEl = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    
    const updatePath = () => {
      const isMobile = window.innerWidth < 1024;
      // Mobile: Shifted inwards to the left to prevent edge clipping
      // Desktop: Deep sweeping rightward arc with long runway for generous spacing
      const d = isMobile
        ? 'M 5 -160 Q 140 200, 15 840'
        : 'M 20 -220 Q 580 260, 180 1020';
      pathEl.setAttribute('d', d);
      return pathEl.getTotalLength();
    };

    let totalLength = updatePath();
    const handleResize = () => {
      totalLength = updatePath();
    };
    window.addEventListener('resize', handleResize);

    const animate = () => {
      progressRef.current = (progressRef.current + speed) % 1;
      const pBase = progressRef.current;

      cardRefs.current.forEach((el, index) => {
        if (!el) return;

        // Strictly equidistant phase offset across constant arc length
        const p = (pBase + index / total) % 1;
        const dist = p * totalLength;
        const pt = pathEl.getPointAtLength(dist);

        // Smooth tangent angle derived directly from the curve
        const nextDist = Math.min(dist + 3, totalLength);
        const ptAhead = pathEl.getPointAtLength(nextDist);
        const angleDeg = Math.atan2(ptAhead.y - pt.y, ptAhead.x - pt.x) * (180 / Math.PI);
        const rotation = (angleDeg - 65) * 0.35;

        // Smooth fade and scale envelopes at boundaries
        let opacity = 1;
        let scale = 1;

        if (p < 0.08) {
          const fadeIn = p / 0.08;
          opacity = fadeIn;
          scale = 0.75 + 0.25 * fadeIn;
        } else if (p > 0.92) {
          const fadeOut = (1 - p) / 0.08;
          opacity = fadeOut;
          scale = 0.75 + 0.25 * fadeOut;
        } else {
          const midDist = 1 - Math.abs(p - 0.5) * 2;
          scale = 1 + midDist * 0.05;
        }

        el.style.transform = `translate3d(${pt.x.toFixed(1)}px, ${pt.y.toFixed(1)}px, 0) rotate(${rotation.toFixed(1)}deg) scale(${scale.toFixed(2)})`;
        el.style.opacity = opacity.toFixed(3);
      });

      reqIdRef.current = requestAnimationFrame(animate);
    };

    reqIdRef.current = requestAnimationFrame(animate);

    return () => {
      ctx.revert();
      window.removeEventListener('resize', handleResize);
      if (reqIdRef.current) cancelAnimationFrame(reqIdRef.current);
    };
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-24 md:py-32 border-b border-[#2B2A26] bg-[#0B0B09] relative overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12 space-y-16">
        {/* Section Eyebrow (1 per 3 sections) */}
        <div className="about-el flex justify-between items-center pb-4 border-b border-[#2B2A26]">
          <span className="text-xs font-mono tracking-widest text-[#D8D0BF] uppercase">
            01 — ABOUT ME
          </span>
          <span className="text-xs font-mono tracking-widest text-[#A7A39A] uppercase hidden sm:inline">
            CORE PROFILE & CAPABILITIES
          </span>
        </div>

        {/* 2-Column Layout on Desktop / Top-Right Flank Stream on Mobile */}
        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Left Column: Short Punchy Summary */}
          <div className="about-el relative z-10 lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-mono text-[#D8D0BF] uppercase tracking-widest block">
                PROFILE & FOUNDATIONS
              </span>
              <h2 className="text-section-heading font-bebas text-[#F2EEE5] uppercase tracking-tight leading-none">
                ABOUT ME
              </h2>
            </div>

            <p className="text-xl sm:text-2xl font-light text-[#F2EEE5] leading-snug">
              Information Systems undergraduate at Universitas Bani Saleh specializing in full-stack web development, cross-platform mobile apps with Flutter, and modern AI-augmented workflows.
            </p>

            <p className="text-sm sm:text-base text-[#A7A39A] font-light leading-relaxed">
              Bridging robust backend architectures (Laravel, CodeIgniter 4), responsive user interfaces (React.js, Tailwind, Figma), and relational database modeling (MySQL)—integrated with advanced prompt engineering across Claude, ChatGPT, and Gemini.
            </p>
          </div>

          {/* Right Column on Desktop / Top-Right Empty Space Stream on Mobile */}
          <div className="about-el absolute -top-8 right-2 sm:right-6 w-[200px] sm:w-[260px] h-[calc(100%+32px)] lg:static lg:right-auto lg:w-full lg:max-w-[500px] lg:h-auto lg:col-span-6 flex items-start lg:items-center justify-end lg:justify-center pointer-events-none lg:pointer-events-auto z-0 lg:z-auto overflow-hidden">
            <div
              ref={containerRef}
              className="relative w-full h-full lg:h-[520px] min-h-[440px] overflow-hidden select-none"
            >
              {/* 1-by-1 Floating Icon Badges Using Official Local Vector Icons */}
              {TECH_ITEMS.map((item, index) => (
                <div
                  key={item.id}
                  ref={(el) => { cardRefs.current[index] = el; }}
                  className="absolute top-0 left-0 w-16 h-16 sm:w-18 sm:h-18 lg:w-22 lg:h-22 rounded-2xl glass-tech-card shadow-2xl flex items-center justify-center cursor-pointer group will-change-transform p-3.5 lg:p-4.5"
                  title={item.name}
                >
                  <img
                    src={item.iconSrc}
                    alt={item.name}
                    className="w-full h-full object-contain pointer-events-none drop-shadow-sm"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Minimalist 4-Column Spec Row */}
        <div className="about-el border-y border-[#2B2A26] grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-[#2B2A26] font-mono text-xs">
          <div className="p-6 md:p-8 space-y-1">
            <span className="text-[#A7A39A] uppercase tracking-widest block text-[10px]">PROGRAM</span>
            <span className="text-[#F2EEE5] text-sm sm:text-base font-bebas uppercase tracking-wide block">
              Sarjana Sistem Informasi
            </span>
          </div>
          <div className="p-6 md:p-8 space-y-1">
            <span className="text-[#A7A39A] uppercase tracking-widest block text-[10px]">INSTITUTION</span>
            <span className="text-[#F2EEE5] text-sm sm:text-base font-bebas uppercase tracking-wide block">
              Universitas Bani Saleh
            </span>
          </div>
          <div className="p-6 md:p-8 space-y-1">
            <span className="text-[#A7A39A] uppercase tracking-widest block text-[10px]">TIMELINE</span>
            <span className="text-[#D8D0BF] text-sm sm:text-base font-medium block">
              2023 — 2027
            </span>
          </div>
          <div className="p-6 md:p-8 space-y-1">
            <span className="text-[#A7A39A] uppercase tracking-widest block text-[10px]">CUMULATIVE GPA</span>
            <span className="text-[#D8D0BF] text-sm sm:text-base font-bold block">
              {portfolioData.education.gpa} / 4.00
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
