import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Manifesto() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.manifesto-line',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 75%',
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative py-20 sm:py-28 md:py-32 bg-[#0B0B09] border-b border-[#2B2A26] overflow-hidden flex items-center justify-center text-center"
    >
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12 w-full">
        {/* Friendly Introduction & Invitation Kinetic Typography */}
        <div className="space-y-3 sm:space-y-5 md:space-y-6 select-none">
          {/* Line 1 */}
          <div className="manifesto-line flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <span className="text-hero-giant font-bebas text-[#F2EEE5] tracking-tight uppercase leading-none">
              HELLO, I'M
            </span>
            <span className="inline-flex items-center space-x-2 px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full bg-[#161612] border border-[#2B2A26] text-xs sm:text-sm font-sans font-medium text-[#D8D0BF] leading-none shadow-md tracking-normal normal-case">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D8D0BF] animate-pulse" />
              <span>Abdila</span>
            </span>
          </div>

          {/* Line 2 */}
          <div className="manifesto-line flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <span className="font-serif italic lowercase font-light text-[#D8D0BF] text-3xl sm:text-5xl md:text-6xl lg:text-7xl leading-none">
              ready
            </span>
            <span className="text-hero-giant font-bebas text-[#F2EEE5] tracking-tight uppercase leading-none">
              TO BUILD
            </span>
          </div>

          {/* Line 3 */}
          <div className="manifesto-line flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <span className="text-[#D8D0BF] text-xl sm:text-3xl align-middle">✦</span>
            <span className="text-hero-giant font-bebas text-[#F2EEE5] tracking-tight uppercase leading-none">
              & COLLABORATE
            </span>
            <span className="inline-flex items-center space-x-2 px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full bg-[#161612] border border-[#2B2A26] text-xs sm:text-sm font-sans font-medium text-[#D8D0BF] leading-none shadow-md tracking-normal normal-case">
              <span>Web Projects</span>
            </span>
          </div>

          {/* Line 4 */}
          <div className="manifesto-line">
            <a
              href="#contact"
              className="text-hero-giant font-bebas text-[#F2EEE5] hover:text-[#D8D0BF] transition-colors tracking-tight uppercase leading-none inline-flex items-center space-x-2 group cursor-pointer"
            >
              <span>LET'S CONNECT</span>
              <span className="text-3xl sm:text-5xl group-hover:translate-x-2 transition-transform">→</span>
            </a>
          </div>
        </div>

        {/* Factual Availability Ticker */}
        <div className="manifesto-line pt-10 md:pt-14 max-w-xl mx-auto text-xs font-mono text-[#A7A39A] uppercase tracking-widest flex flex-wrap items-center justify-center gap-3">
          <span>AVAILABLE FOR WORK</span>
          <span className="text-[#2B2A26]">•</span>
          <span>INTERNSHIPS & FREELANCE</span>
          <span className="text-[#2B2A26]">•</span>
          <span>FULL-TIME 2026</span>
        </div>
      </div>
    </section>
  );
}
