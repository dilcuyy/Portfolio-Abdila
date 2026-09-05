import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { portfolioData } from '../data/portfolio';

export default function Hero() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 1 } });

      tl.fromTo(
        '.hero-sub-meta',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.15 }
      ).fromTo(
        '.hero-title-word',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.2, duration: 1.1 },
        '-=0.6'
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-[100dvh] pt-28 pb-16 md:pt-36 md:pb-24 flex flex-col justify-between overflow-hidden border-b border-[#2B2A26]"
    >
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12 w-full flex-1 flex flex-col justify-between">
        {/* Top Meta Details */}
        <div className="hero-sub-meta flex justify-between items-end pb-6 border-b border-[#2B2A26] text-xs font-mono text-[#A7A39A] uppercase tracking-wider">
          <div className="space-y-1">
            <p className="text-[#F2EEE5] font-sans font-medium">PORTFOLIO PRESENTATION</p>
            <p>{portfolioData.personal.location}</p>
          </div>
          <div className="text-right space-y-1 hidden sm:block">
            <p className="text-[#F2EEE5] font-sans font-medium">STUDY PERIOD: 2023 — 2027</p>
            <p>Page | 01</p>
          </div>
        </div>

        {/* Main Full-Width Editorial Display Typography */}
        <div className="relative my-12 md:my-16 space-y-6">
          <div className="hero-sub-meta text-xs md:text-sm uppercase tracking-widest text-[#A7A39A] font-mono">
            PRESENTED BY — {portfolioData.personal.name}
          </div>

          {/* Giant Display Headings */}
          <div className="space-y-2">
            <h1 className="hero-title-word text-hero-giant font-bebas text-[#F2EEE5] tracking-tight uppercase leading-[0.82] select-none">
              PORTOFOLIO
            </h1>
            <div className="hero-title-word text-[36px] sm:text-[56px] md:text-[80px] lg:text-[96px] font-bebas text-[#D8D0BF] tracking-wide uppercase leading-tight">
              ABDILA ASY SYAFIQ
            </div>
          </div>

          {/* Subtitle Tagline */}
          <p className="hero-sub-meta text-base sm:text-xl md:text-2xl text-[#A7A39A] font-light max-w-3xl leading-relaxed pt-2">
            {portfolioData.personal.tagline}
          </p>

          {/* Key Specs Bar (Inline Minimal Row) */}
          <div className="hero-sub-meta pt-8 grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-[#2B2A26]/60">
            <div>
              <span className="block text-[11px] font-mono text-[#A7A39A] uppercase tracking-wider">
                PROGRAM OF STUDY
              </span>
              <span className="text-sm md:text-base font-bebas text-[#F2EEE5] uppercase tracking-wide block mt-1">
                Sarjana Sistem Informasi
              </span>
            </div>
            <div>
              <span className="block text-[11px] font-mono text-[#A7A39A] uppercase tracking-wider">
                INSTITUTION
              </span>
              <span className="text-sm md:text-base font-bebas text-[#F2EEE5] uppercase tracking-wide block mt-1">
                Universitas Bani Saleh
              </span>
            </div>
            <div>
              <span className="block text-[11px] font-mono text-[#A7A39A] uppercase tracking-wider">
                STUDY PERIOD
              </span>
              <span className="text-sm md:text-base font-mono text-[#D8D0BF] font-semibold block mt-1">
                2023 — 2027
              </span>
            </div>
            <div>
              <span className="block text-[11px] font-mono text-[#A7A39A] uppercase tracking-wider">
                CUMULATIVE GPA
              </span>
              <span className="text-sm md:text-base font-mono text-[#D8D0BF] font-semibold block mt-1">
                3.85 / 4.00
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Banner Details */}
        <div className="hero-sub-meta pt-6 border-t border-[#2B2A26] flex flex-col md:flex-row justify-between items-start md:items-center text-xs font-mono text-[#A7A39A] gap-4">
          <div className="flex items-center space-x-3">
            <span className="inline-block w-2 h-2 rounded-full bg-[#D8D0BF] animate-pulse" />
            <span className="uppercase tracking-widest text-[#F2EEE5] whitespace-nowrap">
              AVAILABLE FOR FULL-TIME, INTERNSHIP & FREELANCE OPPORTUNITIES
            </span>
          </div>

          <a
            href="#about"
            className="flex items-center space-x-2 text-[#F2EEE5] uppercase hover:text-[#D8D0BF] transition-colors whitespace-nowrap"
          >
            <span>SCROLL TO EXPLORE</span>
            <span className="text-lg">↓</span>
          </a>
        </div>
      </div>
    </section>
  );
}
