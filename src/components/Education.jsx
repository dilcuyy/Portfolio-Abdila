import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { portfolioData } from '../data/portfolio';

gsap.registerPlugin(ScrollTrigger);

export default function Education() {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.edu-reveal',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
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
      id="education"
      ref={sectionRef}
      className="py-20 md:py-32 border-b border-[#2B2A26] relative"
    >
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12">
        {/* Section Header */}
        <div className="edu-reveal flex justify-between items-center mb-10 pb-4 border-b border-[#2B2A26]">
          <span className="text-xs font-mono tracking-widest text-[#A7A39A] uppercase">
            02 — EDUCATION
          </span>
          <span className="text-xs font-mono tracking-widest text-[#A7A39A] uppercase hidden sm:inline">
            ACADEMIC BACKGROUND
          </span>
        </div>

        {/* Section Title */}
        <h2 className="edu-reveal text-section-heading font-bebas text-[#F2EEE5] uppercase tracking-tight leading-none mb-12">
          EDUCATION
        </h2>

        {/* Full-Width Academic Card Layout (Replaces Stock Photo) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Main Degree Block (Col-span-8) */}
          <div className="edu-reveal lg:col-span-8 bg-[#12120F] border border-[#2B2A26] p-8 sm:p-12 rounded-3xl space-y-8 flex flex-col justify-between hover:border-[#D8D0BF]/40 transition-colors duration-500">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-widest text-[#D8D0BF]">
                  DEGREE PROGRAM
                </span>
                <span className="text-xs font-mono text-[#A7A39A] uppercase">
                  BEKASI, INDONESIA
                </span>
              </div>

              <h3 className="text-4xl sm:text-5xl md:text-6xl font-bebas text-[#F2EEE5] tracking-wide uppercase leading-tight">
                {portfolioData.education.degree}
              </h3>

              <p className="text-xl sm:text-2xl text-[#D8D0BF] font-light">
                {portfolioData.education.university}
              </p>

              <p className="text-base text-[#A7A39A] font-light leading-relaxed max-w-2xl pt-2">
                {portfolioData.education.description}
              </p>
            </div>

            {/* Relevant Competencies Pills */}
            <div className="space-y-3 pt-6 border-t border-[#2B2A26]">
              <span className="text-xs font-mono uppercase tracking-widest text-[#A7A39A] block">
                RELEVANT COURSEWORK & COMPETENCIES
              </span>
              <div className="flex flex-wrap gap-2.5">
                {portfolioData.education.skillsLearned.map((item, idx) => (
                  <span
                    key={idx}
                    className="px-4 py-2 rounded-full border border-[#2B2A26] bg-[#0B0B09] text-xs font-mono text-[#F2EEE5] uppercase tracking-wider hover:border-[#D8D0BF] transition-colors"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Academic Highlights & Stats Card (Col-span-4) */}
          <div className="edu-reveal lg:col-span-4 bg-[#12120F] border border-[#2B2A26] p-8 sm:p-10 rounded-3xl flex flex-col justify-between space-y-8 hover:border-[#D8D0BF]/40 transition-colors duration-500">
            <div className="space-y-1">
              <span className="text-xs font-mono text-[#A7A39A] uppercase tracking-wider block">
                CUMULATIVE GPA / IPK
              </span>
              <p className="text-5xl sm:text-6xl font-mono font-bold text-[#F2EEE5] tracking-tight">
                3.85
              </p>
              <p className="text-xs font-mono text-[#D8D0BF] uppercase tracking-wider pt-1">
                SCALE 4.00 — ACTIVE UNDERGRADUATE STUDENT
              </p>
            </div>

            <div className="space-y-6 pt-6 border-t border-[#2B2A26]">
              <div>
                <span className="text-xs font-mono text-[#A7A39A] uppercase tracking-wider block mb-1">
                  STUDY PERIOD
                </span>
                <p className="text-3xl font-bebas text-[#F2EEE5] tracking-wider">
                  {portfolioData.education.period}
                </p>
              </div>

              <div>
                <span className="text-xs font-mono text-[#A7A39A] uppercase tracking-wider block mb-1">
                  THESIS & CAPSTONE
                </span>
                <p className="text-xs font-mono text-[#F2EEE5] leading-relaxed">
                  Digital Workflow & Information Systems Optimization
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
