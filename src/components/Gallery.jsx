import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { portfolioData } from '../data/portfolio';

export default function Gallery() {
  const [page, setPage] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const cardsContainerRef = useRef(null);
  const touchStartXRef = useRef(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const projects = portfolioData.projects || [];
  const itemsPerPage = isMobile ? 1 : 3;
  const totalPages = Math.ceil(projects.length / itemsPerPage);

  const safePage = Math.min(page, Math.max(0, totalPages - 1));

  const visibleProjects = projects.slice(
    safePage * itemsPerPage,
    (safePage + 1) * itemsPerPage
  );

  const handlePageChange = (newPage) => {
    if (newPage === safePage || newPage < 0 || newPage >= totalPages) return;

    if (cardsContainerRef.current && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const direction = newPage > safePage ? 1 : -1;

      gsap.to(cardsContainerRef.current, {
        opacity: 0,
        x: -25 * direction,
        duration: 0.2,
        ease: 'power2.in',
        onComplete: () => {
          setPage(newPage);
          gsap.fromTo(
            cardsContainerRef.current,
            { opacity: 0, x: 25 * direction },
            { opacity: 1, x: 0, duration: 0.35, ease: 'power3.out' }
          );
        },
      });
    } else {
      setPage(newPage);
    }
  };

  const handleTouchStart = (e) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartXRef.current === null) return;
    const diff = touchStartXRef.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0 && safePage < totalPages - 1) {
        handlePageChange(safePage + 1);
      } else if (diff < 0 && safePage > 0) {
        handlePageChange(safePage - 1);
      }
    }
    touchStartXRef.current = null;
  };

  return (
    <section
      id="projects"
      data-section-id="projects"
      className="w-full md:w-screen md:min-w-[100vw] min-h-[100dvh] md:h-[100dvh] shrink-0 md:snap-start md:snap-always flex flex-col justify-between pt-14 pb-12 sm:pb-16 md:pt-16 md:pb-16 px-5 sm:px-8 md:pl-28 md:pr-16 lg:pl-32 border-b md:border-b-0 md:border-r border-[#36332F] bg-[#1C1B18] relative select-none"
    >
      {/* Top Header Eyebrow */}
      <div className="flex justify-between items-center pb-3 border-b border-[#36332F] w-full">
        <span className="text-xs font-mono tracking-widest text-[#D5CEC4] uppercase">
          05 — FEATURED PROJECTS
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
            SHOWING <span className="text-[#ECE8E1] font-semibold">{safePage * itemsPerPage + 1}{itemsPerPage > 1 ? `—${Math.min((safePage + 1) * itemsPerPage, projects.length)}` : ''}</span> OF {projects.length}
          </div>

          <div className="flex items-center space-x-2 font-mono text-xs">
            <button
              type="button"
              onClick={() => handlePageChange(safePage - 1)}
              disabled={safePage === 0}
              className={`px-3 py-1.5 border border-[#36332F] uppercase tracking-wider transition-all flex items-center space-x-1 ${
                safePage === 0
                  ? 'opacity-30 cursor-not-allowed text-[#8C8880]'
                  : 'bg-[#23221E] text-[#ECE8E1] hover:border-[#ECE8E1] hover:bg-[#2D2B26] active:bg-[#2D2B26] cursor-pointer'
              }`}
            >
              <span>← PREV</span>
            </button>

            <button
              type="button"
              onClick={() => handlePageChange(safePage + 1)}
              disabled={safePage >= totalPages - 1}
              className={`px-3.5 py-1.5 border border-[#36332F] uppercase tracking-wider transition-all flex items-center space-x-1.5 ${
                safePage >= totalPages - 1
                  ? 'opacity-30 cursor-not-allowed text-[#8C8880]'
                  : 'bg-[#23221E] text-[#ECE8E1] hover:border-[#ECE8E1] hover:bg-[#2D2B26] active:bg-[#2D2B26] cursor-pointer'
              }`}
            >
              <span>NEXT</span>
              <span>→</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Project Grid Stream */}
      <div
        className="my-6 md:my-auto py-2 w-full max-w-7xl overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div
          ref={cardsContainerRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-start w-full"
        >
          {visibleProjects.map((project, idx) => {
            const globalIdx = safePage * itemsPerPage + idx;
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

                {/* Mobile Tech Tags */}
                {project.tech && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 bg-[#23221E] border border-[#36332F] text-[10px] font-mono text-[#A29D93] uppercase tracking-wider"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer Bar */}
      <div className="pt-3 border-t border-[#36332F] flex flex-wrap gap-2 justify-between items-center text-[10px] font-mono text-[#8C8880] uppercase tracking-wider w-full">
        <span>FULL-STACK WEB DEVELOPMENT & SYSTEM ARCHITECTURE</span>
        <span>ABDILA ASY SYAFIQ</span>
      </div>
    </section>
  );
}
