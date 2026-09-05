import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { portfolioData } from '../data/portfolio';

gsap.registerPlugin(ScrollTrigger);

export default function Gallery() {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.projects-reveal',
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
      id="projects"
      ref={sectionRef}
      className="py-20 md:py-32 border-b border-[#2B2A26] relative"
    >
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12">
        {/* Section Header */}
        <div className="projects-reveal flex justify-between items-center mb-10 pb-4 border-b border-[#2B2A26]">
          <span className="text-xs font-mono tracking-widest text-[#A7A39A] uppercase">
            05 — FEATURED PROJECTS
          </span>
          <span className="text-xs font-mono tracking-widest text-[#A7A39A] uppercase hidden sm:inline">
            SYSTEM ARCHITECTURE & UI DEVELOPMENT
          </span>
        </div>

        {/* Section Title */}
        <div className="projects-reveal flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <h2 className="text-section-heading font-bebas text-[#F2EEE5] uppercase tracking-tight leading-none">
            FEATURED PROJECTS
          </h2>
          <p className="text-sm font-mono text-[#A7A39A] uppercase tracking-wider max-w-xs">
            Selected digital systems, web applications, and enterprise dashboards.
          </p>
        </div>

        {/* Project Cards Grid / Editorial Layout */}
        <div className="space-y-16">
          {portfolioData.projects.map((project, idx) => (
            <div
              key={project.id}
              className="projects-reveal group grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pb-12 border-b border-[#2B2A26] last:border-b-0"
            >
              {/* Image Frame (STRICT NO HOVER SCALE) */}
              <div className={`lg:col-span-7 ${idx % 2 === 1 ? 'lg:order-2' : ''}`}>
                <div
                  className="relative aspect-[16/9] rounded-2xl overflow-hidden border border-[#2B2A26] bg-[#12120F] transition-colors duration-500 group-hover:border-[#D8D0BF]/60"
                  data-cursor="PROJECT"
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover filter contrast-105 transition-all duration-500 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B09]/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                  <div className="absolute top-4 left-4 font-mono text-xs text-[#D8D0BF] bg-[#0B0B09]/80 backdrop-blur-md px-3 py-1 rounded-full border border-[#2B2A26]">
                    {project.subtitle}
                  </div>
                </div>
              </div>

              {/* Project Meta Information */}
              <div className={`lg:col-span-5 space-y-6 ${idx % 2 === 1 ? 'lg:order-1' : ''}`}>
                <span className="text-xs font-mono text-[#D8D0BF] uppercase tracking-widest block">
                  {project.category}
                </span>

                <h3 className="text-3xl sm:text-4xl font-bebas text-[#F2EEE5] uppercase tracking-wide leading-tight group-hover:text-[#D8D0BF] transition-colors">
                  {project.title}
                </h3>

                <p className="text-base text-[#A7A39A] font-light leading-relaxed">
                  {project.description}
                </p>

                {/* Tech Stack Pills */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {project.tech.map((item, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-3 py-1 rounded-full border border-[#2B2A26] bg-[#12120F] text-xs font-mono text-[#F2EEE5]/90 uppercase tracking-wider"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
