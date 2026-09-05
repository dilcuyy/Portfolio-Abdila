import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { portfolioData } from '../data/portfolio';
import { ExternalLink, X, FileText } from './Icons';

gsap.registerPlugin(ScrollTrigger);

export default function Internship() {
  const sectionRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [isDraggingState, setIsDraggingState] = useState(false);

  const isDragging = useRef(false);
  const startX = useRef(0);
  const dragDistance = useRef(0);

  const total = portfolioData.certificates.length;

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsReducedMotion(true);
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.cert-reveal',
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

  // Handle ESC key to close PDF modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setSelectedPdf(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? total - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === total - 1 ? 0 : prev + 1));
  };

  // Unified Mouse & Touch Drag Handlers
  const handleDragStart = (clientX) => {
    isDragging.current = true;
    startX.current = clientX;
    dragDistance.current = 0;
    setIsDraggingState(true);
  };

  const handleDragMove = (clientX) => {
    if (!isDragging.current) return;
    dragDistance.current = clientX - startX.current;
  };

  const handleDragEnd = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    setIsDraggingState(false);

    if (dragDistance.current < -35) {
      handleNext(); // Dragged left -> show next card
    } else if (dragDistance.current > 35) {
      handlePrev(); // Dragged right -> show prev card
    }
  };

  const handleCardClick = (idx, diff) => {
    // Ignore click if user was performing a drag swipe
    if (Math.abs(dragDistance.current) > 10) return;

    if (diff < 0) {
      handlePrev(); // Clicked left side card -> rotate to left (prev)
    } else if (diff > 0) {
      handleNext(); // Clicked right side card -> rotate to right (next)
    }
  };

  // Calculate Non-Clipping 3D Cylinder Drum Geometry
  const getCardStyle = (idx) => {
    let diff = idx - activeIndex;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;

    const absDiff = Math.abs(diff);
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;

    let translateX = 0;
    let translateZ = 0;
    let rotateY = 0;
    let scale = 1;
    let opacity = 0;
    let zIndex = 0;

    if (absDiff === 0) {
      translateX = 0;
      translateZ = 0;
      rotateY = 0;
      scale = 1;
      opacity = 1;
      zIndex = 50;
    } else if (absDiff === 1) {
      const dir = diff > 0 ? 1 : -1;
      translateX = dir * (isMobile ? 200 : 320); // Responsive displacement to prevent viewport clipping on mobile
      translateZ = isMobile ? -180 : -260;
      rotateY = dir * 26;
      scale = 0.84;
      opacity = 0.7;
      zIndex = 20;
    } else if (absDiff === 2) {
      const dir = diff > 0 ? 1 : -1;
      translateX = dir * (isMobile ? 360 : 540);
      translateZ = isMobile ? -320 : -460;
      rotateY = dir * 45;
      scale = 0.68;
      opacity = 0.3;
      zIndex = 10;
    } else {
      opacity = 0;
      zIndex = 0;
    }

    const pointerEvents = absDiff <= 1 ? 'auto' : 'none';

    return {
      style: {
        transform: `translate3d(${translateX}px, 0px, ${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
        opacity,
        zIndex,
        pointerEvents,
      },
      diff,
    };
  };

  return (
    <section
      id="certificates"
      ref={sectionRef}
      className="py-20 md:py-32 border-b border-[#2B2A26] relative overflow-hidden select-none"
    >
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12">
        {/* Section Header */}
        <div className="cert-reveal flex justify-between items-center mb-10 pb-4 border-b border-[#2B2A26]">
          <span className="text-xs font-mono tracking-widest text-[#A7A39A] uppercase">
            04 — CERTIFICATIONS & SEMINARS
          </span>
          <span className="text-xs font-mono tracking-widest text-[#A7A39A] uppercase hidden sm:inline">
            PROFESSIONAL CREDENTIALS
          </span>
        </div>

        {/* Section Title & Editorial Slider Controls */}
        <div className="cert-reveal flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h2 className="text-section-heading font-bebas text-[#F2EEE5] uppercase tracking-tight leading-none">
              CERTIFICATES & SEMINARS
            </h2>
            <p className="text-sm font-mono text-[#A7A39A] uppercase tracking-wider max-w-xs mt-2">
              Verified course completions, technical workshops, and national seminars.
            </p>
          </div>

          {/* Slider Navigation Bar */}
          <div className="flex items-center space-x-6">
            <span className="text-xs font-mono text-[#D8D0BF] uppercase tracking-widest">
              0{activeIndex + 1} / 0{total}
            </span>
            <div className="flex items-center space-x-2">
              <button
                onClick={handlePrev}
                className="px-4 py-2 rounded-xl border border-[#2B2A26] bg-[#12120F] hover:border-[#D8D0BF] text-xs font-mono text-[#F2EEE5] uppercase tracking-wider transition-all"
                aria-label="Previous Certificate"
              >
                ← PREV
              </button>
              <button
                onClick={handleNext}
                className="px-4 py-2 rounded-xl border border-[#2B2A26] bg-[#12120F] hover:border-[#D8D0BF] text-xs font-mono text-[#F2EEE5] uppercase tracking-wider transition-all"
                aria-label="Next Certificate"
              >
                NEXT →
              </button>
            </div>
          </div>
        </div>

        {/* 3D Cylindrical Rotating Carousel Container */}
        {!isReducedMotion ? (
          <div
            className={`relative w-full h-[540px] sm:h-[580px] md:h-[600px] flex items-center justify-center my-6 ${
              isDraggingState ? 'cursor-grabbing' : 'cursor-grab'
            }`}
            style={{ perspective: '1400px', perspectiveOrigin: '50% 50%' }}
            onMouseDown={(e) => handleDragStart(e.clientX)}
            onMouseMove={(e) => handleDragMove(e.clientX)}
            onMouseUp={handleDragEnd}
            onMouseLeave={handleDragEnd}
            onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
            onTouchMove={(e) => handleDragMove(e.touches[0].clientX)}
            onTouchEnd={handleDragEnd}
          >
            {/* Clickable Left Side Region */}
            <div
              onClick={handlePrev}
              className="absolute left-0 top-0 w-1/4 h-full z-40 cursor-pointer group flex items-center justify-start pl-4"
              title="Rotate Left (Previous)"
            >
              <div className="w-10 h-10 rounded-full border border-[#2B2A26] bg-[#12120F]/80 backdrop-blur-md flex items-center justify-center text-[#A7A39A] group-hover:text-[#F2EEE5] group-hover:border-[#D8D0BF] transition-all opacity-0 group-hover:opacity-100 hidden md:flex">
                ←
              </div>
            </div>

            {/* Clickable Right Side Region */}
            <div
              onClick={handleNext}
              className="absolute right-0 top-0 w-1/4 h-full z-40 cursor-pointer group flex items-center justify-end pr-4"
              title="Rotate Right (Next)"
            >
              <div className="w-10 h-10 rounded-full border border-[#2B2A26] bg-[#12120F]/80 backdrop-blur-md flex items-center justify-center text-[#A7A39A] group-hover:text-[#F2EEE5] group-hover:border-[#D8D0BF] transition-all opacity-0 group-hover:opacity-100 hidden md:flex">
                →
              </div>
            </div>

            <div
              className="relative w-full max-w-[310px] sm:max-w-[440px] md:max-w-[460px] h-[500px] sm:h-[540px] flex items-center justify-center"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {portfolioData.certificates.map((cert, idx) => {
                const { style: cardStyle, diff } = getCardStyle(idx);
                const isActive = idx === activeIndex;

                return (
                  <div
                    key={cert.id}
                    onClick={() => handleCardClick(idx, diff)}
                    style={cardStyle}
                    className={`absolute inset-0 bg-[#12120F] border rounded-3xl overflow-hidden flex flex-col justify-between shadow-2xl transition-all duration-700 ease-out ${
                      isActive
                        ? 'border-[#D8D0BF] ring-1 ring-[#D8D0BF]/30 cursor-default'
                        : 'border-[#2B2A26] hover:border-[#D8D0BF]/60 cursor-pointer'
                    }`}
                  >
                    {/* Top Image Frame (STRICT NO HOVER SCALE) */}
                    <div className="relative aspect-[1.5/1] bg-[#0B0B09] overflow-hidden border-b border-[#2B2A26]">
                      <img
                        src={cert.image}
                        alt={cert.title}
                        className="w-full h-full object-cover object-top filter grayscale contrast-105 group-hover:grayscale-0 transition-all duration-500 ease-out"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#12120F] via-transparent to-transparent opacity-60" />

                      <span className="absolute top-3 left-3 text-[10px] font-mono uppercase tracking-widest text-[#D8D0BF] bg-[#0B0B09]/85 backdrop-blur-md px-2.5 py-1 rounded-md border border-[#2B2A26]">
                        0{idx + 1} / {cert.year}
                      </span>
                    </div>

                    {/* Certificate Details */}
                    <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-4">
                      <div className="space-y-2">
                        <span className="text-[10px] sm:text-[11px] font-mono text-[#D8D0BF] uppercase tracking-widest block">
                          {cert.category}
                        </span>

                        <h3 className="text-base sm:text-lg font-sans font-medium text-[#F2EEE5] leading-snug line-clamp-2">
                          {cert.title}
                        </h3>

                        <p className="text-xs text-[#A7A39A] font-light leading-relaxed line-clamp-2">
                          {cert.description}
                        </p>
                      </div>

                      {/* Action Buttons */}
                      <div className="pt-3 border-t border-[#2B2A26] space-y-3">
                        <div className="flex flex-wrap gap-1.5">
                          {cert.tags.map((tag, tIdx) => (
                            <span
                              key={tIdx}
                              className="px-2 py-0.5 rounded-md border border-[#2B2A26] bg-[#0B0B09] text-[10px] font-mono text-[#A7A39A] uppercase tracking-wider"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center space-x-3 pt-1">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedPdf(cert);
                            }}
                            className="flex-1 py-2.5 px-4 rounded-xl border border-[#2B2A26] bg-[#0B0B09] hover:border-[#D8D0BF] text-xs font-mono text-[#F2EEE5] uppercase tracking-wider transition-all flex items-center justify-center space-x-2 whitespace-nowrap z-50"
                          >
                            <FileText size={14} className="text-[#D8D0BF]" />
                            <span>VIEW CERTIFICATE</span>
                          </button>

                          <a
                            href={cert.pdf}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="p-2.5 rounded-xl border border-[#2B2A26] bg-[#0B0B09] hover:border-[#D8D0BF] text-[#F2EEE5] transition-all flex-shrink-0 z-50"
                            title="Open PDF Document"
                          >
                            <ExternalLink size={16} />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          /* Reduced Motion Fallback: Scroll-snap horizontal track */
          <div className="flex space-x-6 overflow-x-auto pb-6 scrollbar-thin">
            {portfolioData.certificates.map((cert) => (
              <div
                key={cert.id}
                className="w-[320px] sm:w-[380px] flex-shrink-0 bg-[#12120F] border border-[#2B2A26] rounded-2xl overflow-hidden p-5 flex flex-col justify-between space-y-4"
              >
                <img
                  src={cert.image}
                  alt={cert.title}
                  className="w-full aspect-[1.4/1] object-cover rounded-xl"
                />
                <h3 className="text-sm font-medium text-[#F2EEE5]">{cert.title}</h3>
                <button
                  onClick={() => setSelectedPdf(cert)}
                  className="py-2 rounded-xl bg-[#0B0B09] border border-[#2B2A26] text-xs font-mono text-[#F2EEE5] uppercase"
                >
                  VIEW CERTIFICATE
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* PDF Modal Viewer */}
      {selectedPdf && (
        <div className="fixed inset-0 z-[9990] bg-[#0B0B09]/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 md:p-10 animate-fadeIn">
          <div className="bg-[#12120F] border border-[#2B2A26] rounded-3xl w-full max-w-5xl h-[85vh] flex flex-col overflow-hidden shadow-2xl relative">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-[#2B2A26] flex items-center justify-between bg-[#0B0B09] gap-4">
              <div className="flex items-center space-x-3 min-w-0 flex-1">
                <FileText size={18} className="text-[#D8D0BF] flex-shrink-0" />
                <span className="text-xs sm:text-sm font-mono text-[#F2EEE5] uppercase tracking-wider truncate block">
                  {selectedPdf.title}
                </span>
              </div>

              <div className="flex items-center space-x-3 flex-shrink-0">
                <a
                  href={selectedPdf.pdf}
                  download
                  className="px-4 py-2 rounded-lg bg-[#F2EEE5] text-[#0B0B09] text-xs font-mono font-medium uppercase tracking-wider hover:bg-[#D8D0BF] transition-colors whitespace-nowrap"
                >
                  DOWNLOAD PDF
                </a>
                <button
                  onClick={() => setSelectedPdf(null)}
                  className="p-2 text-[#A7A39A] hover:text-[#F2EEE5] transition-colors flex-shrink-0"
                  aria-label="Close PDF Viewer"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Modal Body / iFrame PDF Viewer */}
            <div className="flex-1 w-full h-full bg-[#1A1916] relative">
              <iframe
                src={selectedPdf.pdf}
                title={selectedPdf.title}
                className="w-full h-full border-none"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
