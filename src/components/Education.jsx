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
        '.edu-el',
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
      id="education"
      ref={sectionRef}
      className="py-24 md:py-32 border-b border-[#2B2A26] bg-[#0B0B09] relative"
    >
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12 space-y-16">
        {/* Hairline Divider Header */}
        <div className="edu-el flex justify-between items-center pb-4 border-b border-[#2B2A26] text-xs font-mono text-[#A7A39A]">
          <span className="uppercase tracking-widest text-[#F2EEE5]">ACADEMIC BACKGROUND</span>
          <span className="uppercase tracking-widest text-[#D8D0BF]">BEKASI, INDONESIA</span>
        </div>

        {/* Section Headline & Credentials Banner */}
        <div className="edu-el border-b border-[#2B2A26] pb-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-8 space-y-2">
            <h2 className="text-section-heading font-bebas text-[#F2EEE5] uppercase tracking-tight leading-none">
              EDUCATION
            </h2>
            <p className="text-2xl sm:text-3xl font-bebas text-[#D8D0BF] tracking-wide uppercase pt-2">
              {portfolioData.education.degree}
            </p>
            <p className="text-base text-[#A7A39A] font-light">
              {portfolioData.education.university} • 2023 — 2027 (Undergraduate)
            </p>
          </div>

          <div className="lg:col-span-4 lg:text-right space-y-1">
            <span className="text-xs font-mono text-[#A7A39A] uppercase tracking-widest block">
              CUMULATIVE GPA
            </span>
            <div className="text-5xl font-mono font-bold text-[#D8D0BF]">
              {portfolioData.education.gpa}
              <span className="text-lg font-normal text-[#A7A39A]"> / 4.00</span>
            </div>
          </div>
        </div>

        {/* 3-Column Concise Curriculum Disciplines */}
        <div className="edu-el space-y-4">
          <span className="text-xs font-mono text-[#A7A39A] uppercase tracking-widest block">
            CORE ACADEMIC DISCIPLINES
          </span>

          <div className="border-y border-[#2B2A26] grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#2B2A26] font-mono text-xs">
            <div className="p-6 md:p-8 space-y-2">
              <span className="text-[#D8D0BF] font-semibold text-sm uppercase block">
                01 / SOFTWARE ARCHITECTURE
              </span>
              <p className="text-[#A7A39A] text-xs leading-relaxed">
                MVC frameworks, CodeIgniter 4, React.js components, and RESTful API endpoints.
              </p>
            </div>

            <div className="p-6 md:p-8 space-y-2">
              <span className="text-[#D8D0BF] font-semibold text-sm uppercase block">
                02 / DATABASE SYSTEMS
              </span>
              <p className="text-[#A7A39A] text-xs leading-relaxed">
                Relational schema design, MySQL ERD modeling, and system data optimization.
              </p>
            </div>

            <div className="p-6 md:p-8 space-y-2">
              <span className="text-[#D8D0BF] font-semibold text-sm uppercase block">
                03 / UX & ANALYTICS
              </span>
              <p className="text-[#A7A39A] text-xs leading-relaxed">
                Figma UI prototyping, WCAG AA accessibility, and sales prediction analytics.
              </p>
            </div>
          </div>
        </div>

        {/* Coursework Modules Pills */}
        <div className="edu-el flex flex-wrap items-center gap-2.5">
          <span className="text-xs font-mono text-[#A7A39A] uppercase tracking-wider mr-2">
            KEY MODULES:
          </span>
          {portfolioData.education.skillsLearned.map((item, idx) => (
            <span
              key={idx}
              className="px-3.5 py-1.5 rounded-full border border-[#2B2A26] bg-[#0B0B09] text-xs font-mono text-[#F2EEE5] uppercase tracking-wider hover:border-[#D8D0BF] transition-colors"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
