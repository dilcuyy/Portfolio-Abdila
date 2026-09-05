import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { portfolioData } from '../data/portfolio';

gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.exp-reveal',
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
      id="experience"
      ref={sectionRef}
      className="py-20 md:py-32 border-b border-[#2B2A26] relative"
    >
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12">
        {/* Section Header */}
        <div className="exp-reveal flex justify-between items-center mb-10 pb-4 border-b border-[#2B2A26]">
          <span className="text-xs font-mono tracking-widest text-[#A7A39A] uppercase">
            04 — WORK EXPERIENCE
          </span>
          <span className="text-xs font-mono tracking-widest text-[#A7A39A] uppercase hidden sm:inline">
            PROFESSIONAL PRACTICE
          </span>
        </div>

        {/* Section Title */}
        <h2 className="exp-reveal text-section-heading font-bebas text-[#F2EEE5] uppercase tracking-tight leading-none mb-12">
          WORK EXPERIENCE
        </h2>

        {/* Experience Cards / Magazine Layout */}
        {portfolioData.workExperience.map((exp) => (
          <div key={exp.id} className="exp-reveal space-y-10">
            {/* Meta Header */}
            <div className="pb-6 border-b border-[#2B2A26] flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <h3 className="text-3xl sm:text-4xl md:text-5xl font-bebas text-[#F2EEE5] tracking-wide uppercase">
                  {exp.company}
                </h3>
                <p className="text-lg sm:text-xl text-[#D8D0BF] font-light mt-1">
                  {exp.role}
                </p>
              </div>
              <div className="font-mono text-sm text-[#A7A39A] uppercase tracking-wider">
                <span>{exp.period}</span> • <span>{exp.location}</span>
              </div>
            </div>

            {/* Asymmetrical Multi-Image Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              {/* Left Content + Wide Merchandising Banner Image */}
              <div className="lg:col-span-8 flex flex-col justify-between space-y-8">
                <p className="text-base sm:text-lg text-[#F2EEE5]/90 font-light leading-relaxed">
                  {exp.description}
                </p>

                <ul className="space-y-3 font-light text-sm sm:text-base text-[#A7A39A] border-l border-[#D8D0BF]/40 pl-6">
                  {exp.highlights.map((item, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <span className="text-[#D8D0BF] font-mono">—</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                {/* Wide Product / Merchandising Banner Image */}
                <div
                  className="relative aspect-[16/9] rounded-2xl overflow-hidden border border-[#2B2A26] bg-[#12120F] group"
                  data-cursor="RETAIL"
                >
                  <img
                    src={exp.bannerImage}
                    alt={exp.company}
                    className="w-full h-full object-cover filter grayscale contrast-110 group-hover:grayscale-0 transition-all duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B09]/80 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 font-mono text-xs text-[#D8D0BF] uppercase">
                    PRODUCT PRESENTATION & MERCHANDISING
                  </div>
                </div>
              </div>

              {/* Right Portrait Image Frame */}
              <div className="lg:col-span-4 flex flex-col justify-between">
                <div
                  className="relative h-full min-h-[360px] rounded-2xl overflow-hidden border border-[#2B2A26] bg-[#12120F] group"
                  data-cursor="WORK"
                >
                  <img
                    src={exp.portraitImage}
                    alt={`${exp.role} Portrait`}
                    className="w-full h-full object-cover filter grayscale contrast-110 group-hover:grayscale-0 transition-all duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B09]/80 via-transparent to-transparent" />
                  <div className="absolute bottom-4 right-4 text-right">
                    <span className="text-[10px] font-mono text-[#A7A39A] uppercase tracking-widest">
                      Page | 05
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
