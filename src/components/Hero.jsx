import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { FileText, ArrowUpRight } from './Icons';
import { portfolioData } from '../data/portfolio';

export default function Hero({ onOpenResume, onExploreWork }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.hero-el',
        { y: 35, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: 'power3.out' }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="home"
      data-section-id="home"
      ref={containerRef}
      className="w-full md:w-screen md:min-w-[100vw] min-h-[100dvh] md:h-[100dvh] shrink-0 md:snap-start md:snap-always flex flex-col justify-between pt-16 sm:pt-20 md:pt-14 pb-8 sm:pb-10 md:pb-10 px-5 sm:px-8 md:pl-28 md:pr-16 lg:pl-32 border-b md:border-b-0 md:border-r border-[#36332F] bg-[#1C1B18] relative overflow-hidden"
    >
      {/* Top Tagline */}
      <div className="hero-el pt-2 flex items-center justify-between sm:justify-end font-mono text-[11px] sm:text-xs text-[#A29D93] shrink-0">
        <span className="sm:hidden uppercase tracking-widest text-[#F4F1EA]">
          01 / FOLIO
        </span>
        <span className="uppercase tracking-widest">
          UNIVERSITAS BANI SALEH
        </span>
      </div>

      {/* Main Giant Editorial Headline & Right Description Layout (Matching Image 1 khanhnguyen.design) */}
      <div className="my-auto py-4 sm:py-6 md:py-3 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-end">
        {/* Left Column: Giant 2-Line Serif Display Name */}
        <div className="lg:col-span-8 space-y-0">
          <h1 className="hero-el font-serif-display text-[clamp(52px,13vw,200px)] text-[#F4F1EA] tracking-tight uppercase leading-[0.82] select-none">
            ABDILA
          </h1>
          <h1 className="hero-el font-serif-display text-[clamp(52px,13vw,200px)] text-[#F4F1EA] tracking-tight uppercase leading-[0.82] select-none">
            ASY SYAFIQ
          </h1>
        </div>

        {/* Right Column: Top-Right Subtext & Action Buttons */}
        <div className="lg:col-span-4 flex flex-col justify-end space-y-4 pb-1">
          {/* Top-Right Row: Left Meta/Icon Badge + Right-Aligned Portrait Photo */}
          <div className="hero-el flex items-end justify-between gap-4 w-full">
            {/* Left Accent: Editorial Typographic Notation (No Slop Badges) */}
            <div className="space-y-1.5 pb-1 font-mono select-none">
              <div className="flex items-center space-x-2 text-[10px] text-[#A29D93] uppercase tracking-[0.2em]">
                <span className="text-[#F4F1EA]">01</span>
                <span>/</span>
                <span>BEKASI, ID</span>
              </div>
              <div className="text-xs text-[#F4F1EA] uppercase tracking-wider font-medium">
                S1 SISTEM INFORMASI
              </div>
              <div className="text-[10px] text-[#A29D93] uppercase tracking-widest">
                STUDY PERIOD 2023 — 2027
              </div>
            </div>

            {/* Right: Portrait Photo flush right, aligned with text below */}
            <div className="relative w-20 sm:w-24 md:w-28 aspect-[3/4] shrink-0 overflow-hidden border border-[#36332F] bg-[#23221E] shadow-xl group">
              <img
                src="/images/education-photo.jpg"
                alt="Abdila Asy Syafiq"
                className="w-full h-full object-cover filter grayscale contrast-105 group-hover:grayscale-0 transition-all duration-500 ease-out"
              />
              <div className="absolute bottom-1 right-1.5 px-1 bg-[#1C1B18]/80 font-mono text-[9px] uppercase tracking-wider text-[#A29D93]">
                FOLIO
              </div>
            </div>
          </div>

          <p className="hero-el text-sm sm:text-base text-[#F4F1EA] font-light leading-relaxed">
            Information Systems undergraduate based in Bekasi — focused on thoughtful, considered web development, relational database schemas, and digital experiences.
          </p>

          <div className="hero-el flex flex-wrap items-center gap-3 pt-1">
            <button
              type="button"
              onClick={onExploreWork}
              className="flex-1 sm:flex-none justify-center px-6 py-3 border border-[#36332F] bg-[#1C1B18] text-[#ECE8E1] font-mono text-xs uppercase tracking-widest hover:border-[#ECE8E1] hover:text-white transition-all inline-flex items-center space-x-2 cursor-pointer active:bg-[#23221E]"
            >
              <span>EXPLORE WORK</span>
              <ArrowUpRight size={14} />
            </button>

            <button
              type="button"
              onClick={onOpenResume}
              className="flex-1 sm:flex-none justify-center px-6 py-3 bg-[#23221E] border border-[#36332F] text-[#ECE8E1] font-mono text-xs uppercase tracking-widest hover:border-[#ECE8E1] hover:bg-[#2D2B26] transition-all font-semibold inline-flex items-center space-x-2 cursor-pointer active:bg-[#2D2B26]"
            >
              <FileText size={14} />
              <span>RESUME</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
