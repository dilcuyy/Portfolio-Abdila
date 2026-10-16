import React, { useState, useRef } from 'react';
import gsap from 'gsap';
import { portfolioData } from '../data/portfolio';

export default function Gallery() {
  const [page, setPage] = useState(0);
  const cardsContainerRef = useRef(null);

  const projects = portfolioData.projects || [];
  const ITEMS_PER_PAGE = 3;
  const totalPages = Math.ceil(projects.length / ITEMS_PER_PAGE);

  const visibleProjects = projects.slice(
    page * ITEMS_PER_PAGE,
    (page + 1) * ITEMS_PER_PAGE
  );

  const handlePageChange = (newPage) => {
    if (newPage === page || newPage < 0 || newPage >= totalPages) return;

    if (cardsContainerRef.current && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const direction = newPage > page ? 1 : -1;

      gsap.to(cardsContainerRef.current, {
        opacity: 0,
        x: -30 * direction,
        duration: 0.2,
        ease: 'power2.in',
        onComplete: () => {
          setPage(newPage);
          gsap.fromTo(
            cardsContainerRef.current,
            { opacity: 0, x: 30 * direction },
            { opacity: 1, x: 0, duration: 0.35, ease: 'power3.out' }
          );
        },
      });
    } else {
      setPage(newPage);
    }
  };

  return (
    <section
      id="projects"
      data-section-id="projects"
      className="w-screen min-w-[100vw] h-[100dvh] shrink-0 snap-start snap-always flex flex-col justify-between pt-16 pb-16 pl-14 sm:pl-20 md:pl-28 lg:pl-32 pr-8 sm:pr-12 md:pr-16 border-r border-[#36332F] bg-[#1C1B18] relative overflow-hidden select-none"
    >
      {/* Top Header Eyebrow */}
      <div className="flex justify-between items-center pb-3 border-b border-[#36332F] w-full">
        <span className="text-xs font-mono tracking-widest text-[#D5CEC4] uppercase">
          04 — FEATURED PROJECTS
        </span>
        <span className="text-xs font-mono tracking-widest text-[#8C8880] uppercase hidden sm:inline">
          SYSTEM ARCHITECTURE & FULL-STACK DEVELOPMENT
        </span>
      </div>

      {/* Main Section Header with NEXT / PREV Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-end border-b border-[#36332F] pb-3 w-full">
        <div className="lg:col-span-6 flex items-baseline space-x-3">
          <h2 className="font-serif-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-[#ECE8E1] font-normal tracking-tight uppercase leading-none">
            ALL WORK
          </h2>
          <span className="font-serif-display text-2xl sm:text-3xl text-[#8C8880]">
            ({projects.length})
          </span>
        </div>

        {/* Next / Prev Editorial Pagination Controls */}
        <div className="lg:col-span-6 flex items-center justify-between sm:justify-end space-x-4">
          <div className="font-mono text-xs text-[#8C8880] uppercase tracking-widest">
            SHOWING <span className="text-[#ECE8E1] font-semibold">{page * ITEMS_PER_PAGE + 1}—{Math.min((page + 1) * ITEMS_PER_PAGE, projects.length)}</span> OF {projects.length}
          </div>

          <div className="flex items-center space-x-2 font-mono text-xs">
            <button
              type="button"
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 0}
              className={`px-3 py-1.5 border border-[#36332F] uppercase tracking-wider transition-all flex items-center space-x-1 ${
                page === 0
                  ? 'opacity-30 cursor-not-allowed text-[#8C8880]'
                  : 'bg-[#23221E] text-[#ECE8E1] hover:border-[#ECE8E1] hover:bg-[#2D2B26] cursor-pointer'
              }`}
            >
              <span>← PREV</span>
            </button>

            <button
              type="button"
              onClick={() => handlePageChange(page + 1)}
              disabled={page >= totalPages - 1}
              className={`px-3.5 py-1.5 border border-[#36332F] uppercase tracking-wider transition-all flex items-center space-x-1.5 ${
                page >= totalPages - 1
                  ? 'opacity-30 cursor-not-allowed text-[#8C8880]'
                  : 'bg-[#23221E] text-[#ECE8E1] hover:border-[#ECE8E1] hover:bg-[#2D2B26] cursor-pointer'
              }`}
            >
              <span>NEXT</span>
              <span>→</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main 3-Project Grid Stream */}
      <div className="my-auto py-4 w-full max-w-7xl overflow-hidden">
        <div
          ref={cardsContainerRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-start w-full"
        >
          {visibleProjects.map((project, idx) => {
            const globalIdx = page * ITEMS_PER_PAGE + idx;
            return (
              <div
                key={project.id}
                className="w-full flex flex-col space-y-3"
              >
                {/* Sleek Device Mockup Frame */}
                <div className="w-full aspect-[16/10] bg-[#121210] rounded-md p-1 flex flex-col border border-[#36332F] shadow-lg">
                  {/* Laptop Top Browser Header Dots */}
                  <div className="flex items-center space-x-1 px-1.5 py-0.5 border-b border-[#36332F]/80">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E57373]/80" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FFB74D]/80" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#81C784]/80" />
                    <div className="ml-1.5 flex-1 bg-[#23221E] h-1.5 rounded-[2px] opacity-70" />
                  </div>

                  {/* Laptop Screen Display Area */}
                  <div className="relative flex-1 w-full overflow-hidden rounded-[2px] bg-[#0B0B09] mt-0.5">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover object-top"
                      loading="lazy"
                    />
                  </div>
                </div>

                {/* Index Number & Title Stack */}
                <div className="flex items-start space-x-3 pt-1">
                  {/* Large Serif Index Number */}
                  <span className="font-serif-display text-3xl sm:text-4xl text-[#ECE8E1] font-normal leading-none shrink-0">
                    {(globalIdx + 1).toString().padStart(2, '0')}.
                  </span>

                  {/* Subtitle / Category & Project Title */}
                  <div className="space-y-0.5 text-left flex-1">
                    <div className="text-[10px] font-mono text-[#8C8880] uppercase tracking-wider">
                      {project.category} — 2026
                    </div>
                    <h3 className="font-serif-display text-lg sm:text-xl text-[#ECE8E1] font-normal leading-tight">
                      {project.title}
                    </h3>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer Bar */}
      <div className="pt-2 border-t border-[#36332F] flex justify-between items-center text-[10px] font-mono text-[#8C8880] uppercase tracking-wider w-full">
        <span>FULL-STACK WEB DEVELOPMENT & SYSTEM ARCHITECTURE</span>
        <span>ABDILA ASY SYAFIQ</span>
      </div>
    </section>
  );
}
