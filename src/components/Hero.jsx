import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Github } from './Icons';
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
        '.hero-content-el',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.12 }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-[100dvh] pt-20 sm:pt-24 md:pt-28 pb-8 sm:pb-12 flex flex-col justify-between overflow-hidden border-b border-[#2B2A26] bg-[#0B0B09]"
    >
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12 w-full flex-1 flex flex-col justify-between">
        {/* Main Minimalist Hero */}
        <div className="my-auto py-4 sm:py-8 max-w-4xl space-y-5 sm:space-y-7">
          <div className="space-y-3 sm:space-y-4">
            <div className="hero-content-el inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#161612] border border-[#2B2A26] text-xs font-mono text-[#D8D0BF]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D8D0BF] animate-pulse" />
              <span>SARJANA SISTEM INFORMASI (S.KOM)</span>
            </div>

            <h1 className="hero-content-el text-hero-giant font-bebas text-[#F2EEE5] tracking-tight uppercase leading-[0.88] select-none">
              ABDILA ASY SYAFIQ
            </h1>
          </div>

          <p className="hero-content-el text-lg sm:text-2xl text-[#A7A39A] font-light leading-relaxed max-w-2xl">
            Information Systems undergraduate at Universitas Bani Saleh. Crafting full-stack web applications, relational database schemas, and clean digital interfaces.
          </p>

          {/* Dual Pill CTAs */}
          <div className="hero-content-el flex flex-wrap items-center gap-4 pt-2">
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById('projects');
                if (el) {
                  const topOffset = 80;
                  const elementPosition = el.getBoundingClientRect().top;
                  const offsetPosition = elementPosition + window.pageYOffset - topOffset;
                  window.scrollTo({
                    top: offsetPosition,
                    behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
                  });
                }
              }}
              className="px-8 py-4 rounded-full bg-[#161612] text-[#F2EEE5] font-bebas text-lg tracking-wider uppercase border border-[#2B2A26] hover:border-[#D8D0BF] hover:bg-[#2B2A26] transition-all shadow-xl inline-flex items-center space-x-3 whitespace-nowrap group cursor-pointer"
            >
              <span>Explore Selected Work</span>
              <span className="text-base group-hover:translate-x-1 transition-transform">→</span>
            </a>

            <a
              href="https://github.com/dilcuyy"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-full bg-[#F2EEE5] text-[#0B0B09] font-bebas text-lg tracking-wider uppercase hover:bg-[#D8D0BF] transition-all shadow-xl inline-flex items-center space-x-2.5 whitespace-nowrap"
            >
              <Github size={18} />
              <span>GitHub Profile</span>
              <span className="text-base">↗</span>
            </a>
          </div>
        </div>

        {/* Minimalist Bottom Status Footer */}
        <div className="hero-content-el pt-6 border-t border-[#2B2A26] flex justify-between items-center text-xs font-mono text-[#A7A39A]">
          <span className="uppercase tracking-wider">BEKASI, INDONESIA</span>
          <span className="uppercase tracking-wider text-[#D8D0BF]">AVAILABLE FOR FULL-TIME & FREELANCE</span>
        </div>
      </div>
    </section>
  );
}
