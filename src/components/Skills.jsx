import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { portfolioData } from '../data/portfolio';

gsap.registerPlugin(ScrollTrigger);

export default function Skills() {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.skills-reveal',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
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
      id="skills"
      ref={sectionRef}
      className="py-20 md:py-32 border-b border-[#2B2A26] relative"
    >
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12">
        {/* Section Header */}
        <div className="skills-reveal flex justify-between items-center mb-10 pb-4 border-b border-[#2B2A26]">
          <span className="text-xs font-mono tracking-widest text-[#A7A39A] uppercase">
            03 — SKILLS
          </span>
          <span className="text-xs font-mono tracking-widest text-[#A7A39A] uppercase hidden sm:inline">
            COMPETENCIES & CAPABILITIES
          </span>
        </div>

        {/* Section Heading */}
        <h2 className="skills-reveal text-section-heading font-bebas text-[#F2EEE5] uppercase tracking-tight leading-none mb-14">
          SKILLS
        </h2>

        {/* iOS 17 Inset Grouped Editorial Lists */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Column 1: Soft Skills (Col-span-6) */}
          <div className="skills-reveal lg:col-span-6 ios-glass-card rounded-3xl p-6 sm:p-8 border border-white/[0.08] shadow-[0_16px_40px_rgba(0,0,0,0.4)] space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-4 border-b border-white/[0.08] gap-1 sm:gap-0">
              <h3 className="text-3xl sm:text-4xl font-bebas text-[#F2EEE5] uppercase tracking-wider">
                SOFT SKILLS
              </h3>
              <span className="text-xs font-mono text-[#D8D0BF] uppercase tracking-widest">
                INTERPERSONAL & LEADERSHIP
              </span>
            </div>

            <div className="divide-y divide-white/[0.06]">
              {portfolioData.skills.soft.map((item) => (
                <div
                  key={item.id}
                  className="py-3 px-3 -mx-1.5 rounded-2xl flex items-center justify-between group cursor-default transition-all duration-200 hover:bg-white/[0.04] ios-press"
                >
                  <div className="flex items-center space-x-3.5">
                    <span className="text-xs font-mono text-[#D8D0BF] font-semibold w-5">
                      {item.id}.
                    </span>
                    <span className="text-sm sm:text-base text-[#F2EEE5] font-light group-hover:text-[#D8D0BF] transition-colors">
                      {item.name}
                    </span>
                  </div>
                  <span className="text-xs font-mono text-[#A7A39A] opacity-0 group-hover:opacity-100 transition-opacity">
                    →
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Column 2: Hard Skills (Col-span-6) */}
          <div className="skills-reveal lg:col-span-6 ios-glass-card rounded-3xl p-6 sm:p-8 border border-white/[0.08] shadow-[0_16px_40px_rgba(0,0,0,0.4)] space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-4 border-b border-white/[0.08] gap-1 sm:gap-0">
              <h3 className="text-3xl sm:text-4xl font-bebas text-[#F2EEE5] uppercase tracking-wider">
                HARD SKILLS
              </h3>
              <span className="text-xs font-mono text-[#D8D0BF] uppercase tracking-widest">
                TECHNICAL & STACK
              </span>
            </div>

            <div className="divide-y divide-white/[0.06]">
              {portfolioData.skills.hard.map((item) => (
                <div
                  key={item.id}
                  className="py-3 px-3 -mx-1.5 rounded-2xl flex items-center justify-between group cursor-default transition-all duration-200 hover:bg-white/[0.04] ios-press"
                >
                  <div className="flex items-center space-x-3.5">
                    <span className="text-xs font-mono text-[#D8D0BF] font-semibold w-5">
                      {item.id}.
                    </span>
                    <span className="text-sm sm:text-base text-[#F2EEE5] font-light group-hover:text-[#D8D0BF] transition-colors">
                      {item.name}
                    </span>
                  </div>
                  <span className="text-xs font-mono text-[#A7A39A] opacity-0 group-hover:opacity-100 transition-opacity">
                    →
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
