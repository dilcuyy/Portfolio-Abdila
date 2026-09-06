import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { portfolioData } from '../data/portfolio';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef(null);

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

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-24 md:py-32 border-b border-[#2B2A26] bg-[#0B0B09] relative"
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

        {/* Minimalist 2-Column Focus Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left Column: Short Punchy Summary */}
          <div className="about-el lg:col-span-5 space-y-4">
            <h2 className="text-section-heading font-bebas text-[#F2EEE5] uppercase tracking-tight leading-none">
              PROFILE
            </h2>
            <p className="text-xl sm:text-2xl font-light text-[#F2EEE5] leading-snug">
              Information Systems undergraduate at Universitas Bani Saleh specializing in full-stack web development, database architecture, and clean UI engineering.
            </p>
          </div>

          {/* Right Column: 3 Scannable Capabilities (Zero Wall of Text) */}
          <div className="about-el lg:col-span-7 border-t border-b border-[#2B2A26] divide-y divide-[#2B2A26] font-mono text-xs">
            <div className="py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-[#D8D0BF] font-semibold text-sm uppercase block">01 / FULL-STACK WEB DEVELOPMENT</span>
                <span className="text-[#A7A39A] text-xs">CodeIgniter 4, React.js, Tailwind CSS, RESTful APIs</span>
              </div>
              <span className="text-[#F2EEE5] text-[11px] uppercase tracking-wider font-medium">MODULAR & RESPONSIVE</span>
            </div>

            <div className="py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-[#D8D0BF] font-semibold text-sm uppercase block">02 / DATABASE & SYSTEM DESIGN</span>
                <span className="text-[#A7A39A] text-xs">MySQL, Relational ERD Modeling, Schema Optimization</span>
              </div>
              <span className="text-[#F2EEE5] text-[11px] uppercase tracking-wider font-medium">DATA INTEGRITY</span>
            </div>

            <div className="py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-[#D8D0BF] font-semibold text-sm uppercase block">03 / UI/UX & DATA ANALYTICS</span>
                <span className="text-[#A7A39A] text-xs">Figma Prototyping, WCAG AA Accessibility, Sales Analytics</span>
              </div>
              <span className="text-[#F2EEE5] text-[11px] uppercase tracking-wider font-medium">HIGH-CONTRAST UX</span>
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
