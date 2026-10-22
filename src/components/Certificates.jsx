import React, { useState, useEffect, useRef } from 'react';
import { portfolioData } from '../data/portfolio';
import { ExternalLink, X, FileText } from './Icons';

export default function Certificates() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [isPaused, setIsPaused] = useState(false);

  const isDragging = useRef(false);
  const startX = useRef(0);
  const startY = useRef(0);
  const dragDistance = useRef(0);

  const certificates = portfolioData.certificates || [];
  const total = certificates.length;

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setSelectedPdf(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Smooth Auto-Play Slider
  useEffect(() => {
    if (isPaused || selectedPdf || total <= 1) return;

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev === total - 1 ? 0 : prev + 1));
    }, 3800);

    return () => clearInterval(timer);
  }, [isPaused, selectedPdf, total]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? total - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === total - 1 ? 0 : prev + 1));
  };

  // Drag & Swipe handling
  const handleDragStart = (clientX, clientY = 0) => {
    isDragging.current = true;
    startX.current = clientX;
    startY.current = clientY;
    dragDistance.current = 0;
  };

  const handleDragMove = (clientX, clientY = 0) => {
    if (!isDragging.current) return;
    const deltaX = clientX - startX.current;
    const deltaY = clientY - startY.current;

    // Filter vertical dominance
    if (Math.abs(deltaY) > Math.abs(deltaX) * 1.5 && Math.abs(deltaX) < 20) {
      return;
    }
    dragDistance.current = deltaX;
  };

  const handleDragEnd = () => {
    if (!isDragging.current) return;
    isDragging.current = false;

    if (dragDistance.current < -35) {
      handleNext();
    } else if (dragDistance.current > 35) {
      handlePrev();
    }
    dragDistance.current = 0;
  };

  const handleCardClick = (idx, diff) => {
    if (Math.abs(dragDistance.current) > 10) return;
    if (diff < 0) {
      handlePrev();
    } else if (diff > 0) {
      handleNext();
    }
  };

  // 3D Rotating Cube/Block Cylindrical Geometry
  const getCardStyle = (idx) => {
    let diff = idx - activeIndex;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;

    const absDiff = Math.abs(diff);
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

    let translateX = 0;
    let translateZ = 0;
    let rotateY = 0;
    let scale = 1;
    let opacity = 0;
    let zIndex = 0;
    let visibility = 'visible';

    if (absDiff === 0) {
      translateX = 0;
      translateZ = isMobile ? 20 : 35;
      rotateY = 0;
      scale = 1;
      opacity = 1;
      zIndex = 40;
    } else if (absDiff === 1) {
      const dir = diff > 0 ? 1 : -1;
      translateX = dir * (isMobile ? 120 : 250);
      translateZ = isMobile ? -70 : -120;
      rotateY = dir * (isMobile ? -22 : -34);
      scale = isMobile ? 0.85 : 0.88;
      opacity = 0.65;
      zIndex = 20;
    } else if (absDiff === 2) {
      const dir = diff > 0 ? 1 : -1;
      translateX = dir * (isMobile ? 200 : 420);
      translateZ = isMobile ? -140 : -260;
      rotateY = dir * (isMobile ? -38 : -54);
      scale = 0.74;
      opacity = isMobile ? 0.15 : 0.28;
      zIndex = 10;
    } else {
      opacity = 0;
      zIndex = 0;
      visibility = 'hidden';
    }

    const pointerEvents = absDiff <= 1 ? 'auto' : 'none';

    return {
      style: {
        transform: `translate3d(${translateX}px, 0px, ${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
        opacity,
        zIndex,
        pointerEvents,
        visibility,
        willChange: 'transform, opacity',
        backfaceVisibility: 'hidden',
        WebkitBackfaceVisibility: 'hidden',
        transition: 'transform 0.55s cubic-bezier(0.2, 0.9, 0.3, 1), opacity 0.55s cubic-bezier(0.2, 0.9, 0.3, 1), border-color 0.25s ease',
      },
      diff,
    };
  };

  return (
    <section
      id="certificates"
      data-section-id="certificates"
      className="w-full md:w-screen md:min-w-[100vw] min-h-[100dvh] md:h-[100dvh] shrink-0 md:snap-start md:snap-always flex flex-col justify-between pt-16 pb-5 md:pt-12 md:pb-5 px-4 sm:px-6 md:pl-28 md:pr-14 lg:pl-32 border-b md:border-b-0 md:border-r border-[#36332F] bg-[#1C1B18] relative select-none overflow-hidden"
    >
      {/* Top Header Eyebrow */}
      <div className="flex justify-between items-center pb-1.5 border-b border-[#36332F] w-full shrink-0">
        <span className="text-[10px] sm:text-xs font-mono tracking-widest text-[#D5CEC4] uppercase">
          04 — CERTIFICATES & CREDENTIALS
        </span>
        <span className="text-[10px] sm:text-xs font-mono tracking-widest text-[#8C8880] uppercase hidden sm:inline">
          VERIFIED LICENSES & CERTIFICATIONS
        </span>
      </div>

      {/* Main Section Header */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 items-end border-b border-[#36332F] pb-1.5 w-full shrink-0">
        <div className="sm:col-span-7 flex items-baseline space-x-2.5">
          <h2 className="font-serif-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-[#ECE8E1] font-normal tracking-tight uppercase leading-none">
            CERTIFICATES
          </h2>
          <span className="font-serif-display text-base sm:text-lg md:text-xl text-[#8C8880]">
            ({total})
          </span>
        </div>

        {/* Counter & Prev / Next Controls */}
        <div className="sm:col-span-5 flex items-center justify-between sm:justify-end space-x-3">
          <div className="font-mono text-[10px] sm:text-xs text-[#8C8880] uppercase tracking-widest">
            ACTIVE <span className="text-[#ECE8E1] font-semibold">0{activeIndex + 1}</span> / 0{total}
          </div>

          <div className="flex items-center space-x-1.5 font-mono text-xs">
            <button
              type="button"
              onClick={handlePrev}
              className="px-2.5 sm:px-3 py-1 border border-[#36332F] bg-[#23221E] text-[#ECE8E1] hover:border-[#ECE8E1] hover:bg-[#2D2B26] active:bg-[#2D2B26] uppercase tracking-wider transition-all flex items-center space-x-1 cursor-pointer text-[10px] sm:text-xs"
            >
              <span>← PREV</span>
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="px-2.5 sm:px-3 py-1 border border-[#36332F] bg-[#23221E] text-[#ECE8E1] hover:border-[#ECE8E1] hover:bg-[#2D2B26] active:bg-[#2D2B26] uppercase tracking-wider transition-all flex items-center space-x-1 cursor-pointer text-[10px] sm:text-xs"
            >
              <span>NEXT →</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3D Rotating Block Carousel Area */}
      <div
        data-no-pan="true"
        className="my-auto relative w-full h-[320px] xs:h-[340px] sm:h-[350px] md:h-[360px] flex items-center justify-center cursor-grab active:cursor-grabbing touch-pan-y"
        style={{ perspective: '1100px', perspectiveOrigin: '50% 50%' }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => {
          setIsPaused(false);
          handleDragEnd();
        }}
        onMouseDown={(e) => handleDragStart(e.clientX, e.clientY)}
        onMouseMove={(e) => handleDragMove(e.clientX, e.clientY)}
        onMouseUp={handleDragEnd}
        onTouchStart={(e) => {
          setIsPaused(true);
          handleDragStart(e.touches[0].clientX, e.touches[0].clientY);
        }}
        onTouchMove={(e) => handleDragMove(e.touches[0].clientX, e.touches[0].clientY)}
        onTouchEnd={() => {
          setIsPaused(false);
          handleDragEnd();
        }}
      >
        <div
          className="relative w-full max-w-[280px] xs:max-w-[300px] sm:max-w-[340px] md:max-w-[380px] h-[300px] xs:h-[320px] sm:h-[330px] md:h-[340px] flex items-center justify-center"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {certificates.map((cert, idx) => {
            const { style: cardStyle, diff } = getCardStyle(idx);
            const isActive = idx === activeIndex;

            return (
              <div
                key={cert.id}
                onClick={() => handleCardClick(idx, diff)}
                style={cardStyle}
                className={`absolute inset-0 bg-[#23221E] border rounded-none flex flex-col justify-between shadow-[0_16px_36px_rgba(0,0,0,0.7)] transition-all ${
                  isActive
                    ? 'border-[#ECE8E1] cursor-default'
                    : 'border-[#36332F] hover:border-[#8C8880] cursor-pointer'
                }`}
              >
                {/* Certificate Image Frame */}
                <div className="relative aspect-[16/9] bg-[#121210] overflow-hidden border-b border-[#36332F] shrink-0">
                  <img
                    src={cert.image}
                    alt={cert.title}
                    className="w-full h-full object-cover object-top"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#23221E] via-transparent to-transparent opacity-50" />

                  <span className="absolute top-1 left-1 text-[8px] font-mono uppercase tracking-widest text-[#ECE8E1] bg-[#1C1B18]/90 px-1.5 py-0.5 border border-[#36332F]">
                    0{idx + 1} • {cert.year}
                  </span>
                </div>

                {/* Content Section */}
                <div className="p-2 sm:p-2.5 flex-1 flex flex-col justify-between space-y-1 overflow-hidden">
                  <div className="space-y-0.5">
                    <span className="text-[8px] font-mono text-[#8C8880] uppercase tracking-wider line-clamp-1 block">
                      {cert.category}
                    </span>

                    <h3 className="font-serif-display text-sm sm:text-base text-[#ECE8E1] leading-snug line-clamp-2 font-normal">
                      {cert.title}
                    </h3>

                    <p className="font-mono text-[8.5px] sm:text-[9.5px] text-[#A29D93] leading-relaxed line-clamp-2">
                      {cert.description}
                    </p>
                  </div>

                  {/* Tags and Action */}
                  <div className="pt-1 border-t border-[#36332F] space-y-1">
                    <div className="flex flex-wrap gap-1">
                      {cert.tags?.slice(0, 2).map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-1 py-0.5 border border-[#36332F] bg-[#1C1B18] text-[7.5px] sm:text-[8px] font-mono text-[#8C8880] uppercase tracking-wider"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center space-x-1.5 pt-0.5">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedPdf(cert);
                        }}
                        className="flex-1 py-1 px-2 border border-[#36332F] bg-[#1C1B18] hover:border-[#ECE8E1] hover:bg-[#2D2B26] text-[9.5px] sm:text-[10px] font-mono text-[#ECE8E1] uppercase tracking-wider transition-all flex items-center justify-center space-x-1.5 cursor-pointer"
                      >
                        <FileText size={11} className="text-[#D5CEC4]" />
                        <span>VIEW CERTIFICATE</span>
                      </button>

                      <a
                        href={cert.pdf}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="p-1 border border-[#36332F] bg-[#1C1B18] hover:border-[#ECE8E1] text-[#ECE8E1] transition-all shrink-0 cursor-pointer"
                        title="Open PDF"
                      >
                        <ExternalLink size={11} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer Bar */}
      <div className="pt-1.5 border-t border-[#36332F] flex flex-wrap gap-2 justify-between items-center text-[9px] sm:text-[10px] font-mono text-[#8C8880] uppercase tracking-wider w-full shrink-0">
        <span>SWIPE OR USE ARROWS TO ROTATE CERTIFICATE BLOCKS</span>
        <span>ABDILA ASY SYAFIQ</span>
      </div>

      {/* PDF Modal Viewer */}
      {selectedPdf && (
        <div className="fixed inset-0 z-[9990] bg-[#0B0B09]/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 md:p-10">
          <div className="bg-[#1C1B18] border border-[#36332F] w-full max-w-5xl h-[85vh] flex flex-col overflow-hidden shadow-2xl relative">
            <div className="px-5 py-3 border-b border-[#36332F] flex items-center justify-between bg-[#23221E] gap-4">
              <div className="flex items-center space-x-2 min-w-0 flex-1">
                <FileText size={16} className="text-[#D5CEC4] shrink-0" />
                <span className="text-xs sm:text-sm font-mono text-[#ECE8E1] uppercase tracking-wider truncate block">
                  {selectedPdf.title}
                </span>
              </div>

              <div className="flex items-center space-x-3 shrink-0">
                <a
                  href={selectedPdf.pdf}
                  download
                  className="px-3 py-1.5 bg-[#ECE8E1] text-[#1C1B18] text-xs font-mono font-medium uppercase tracking-wider hover:bg-white transition-colors cursor-pointer"
                >
                  DOWNLOAD
                </a>
                <button
                  type="button"
                  onClick={() => setSelectedPdf(null)}
                  className="p-1.5 text-[#8C8880] hover:text-[#ECE8E1] transition-colors cursor-pointer"
                  aria-label="Close PDF Viewer"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            <div className="flex-1 w-full h-full bg-[#121210] relative">
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
