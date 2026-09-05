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

        {/* Seamless 2-Column Editorial Grid (No Heavy Cards / No Box Containers) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Column 1: Soft Skills (Col-span-6 with right border divider) */}
          <div className="skills-reveal lg:col-span-6 space-y-6 lg:border-r border-[#2B2A26] lg:pr-12">
            <div className="flex items-end justify-between pb-4 border-b border-[#2B2A26]">
              <h3 className="text-3xl sm:text-4xl font-bebas text-[#F2EEE5] uppercase tracking-wider">
                SOFT SKILLS
              </h3>
              <span className="text-xs font-mono text-[#D8D0BF] uppercase tracking-widest">
                INTERPERSONAL & LEADERSHIP
              </span>
            </div>

            <div className="divide-y divide-[#2B2A26]/70">
              {portfolioData.skills.soft.map((item) => (
                <div
                  key={item.id}
                  className="py-4.5 flex items-center justify-between group cursor-default transition-all duration-300 hover:pl-2"
                >
                  <div className="flex items-center space-x-4">
                    <span className="text-sm font-mono text-[#D8D0BF] font-semibold w-6">
                      {item.id}.
                    </span>
                    <span className="text-base sm:text-lg text-[#F2EEE5] font-light group-hover:text-[#D8D0BF] transition-colors">
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
          <div className="skills-reveal lg:col-span-6 space-y-6">
            <div className="flex items-end justify-between pb-4 border-b border-[#2B2A26]">
              <h3 className="text-3xl sm:text-4xl font-bebas text-[#F2EEE5] uppercase tracking-wider">
                HARD SKILLS
              </h3>
              <span className="text-xs font-mono text-[#D8D0BF] uppercase tracking-widest">
                TECHNICAL & STACK
              </span>
            </div>

            <div className="divide-y divide-[#2B2A26]/70">
              {portfolioData.skills.hard.map((item) => (
                <div
                  key={item.id}
                  className="py-4.5 flex items-center justify-between group cursor-default transition-all duration-300 hover:pl-2"
                >
                  <div className="flex items-center space-x-4">
                    <span className="text-sm font-mono text-[#D8D0BF] font-semibold w-6">
                      {item.id}.
                    </span>
                    <span className="text-base sm:text-lg text-[#F2EEE5] font-light group-hover:text-[#D8D0BF] transition-colors">
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
