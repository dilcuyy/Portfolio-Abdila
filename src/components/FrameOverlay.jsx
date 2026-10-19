import React, { useRef, useImperativeHandle, forwardRef } from 'react';
import { Menu } from './Icons';

const FrameOverlay = forwardRef(function FrameOverlay({ activeSection, onOpenMenu, onNextSection }, ref) {
  const fillRef = useRef(null);
  const mobileProgressRef = useRef(null);

  useImperativeHandle(ref, () => ({
    updateProgress: (progressRatio) => {
      const percent = Math.min(Math.max(progressRatio * 100, 0), 100);
      if (fillRef.current) {
        fillRef.current.style.height = `${percent}%`;
      }
      if (mobileProgressRef.current) {
        mobileProgressRef.current.style.width = `${percent}%`;
      }
    },
  }));

  return (
    <>
      {/* Mobile Fixed Top Header with Slim Progress Indicator (md:hidden) */}
      <header className="fixed top-0 left-0 right-0 h-14 bg-[#1C1B18]/95 backdrop-blur-md border-b border-[#36332F] z-50 flex items-center justify-between px-4 sm:px-6 md:hidden select-none">
        {/* Left: Monogram / Name */}
        <div className="flex items-center space-x-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#F4F1EA]" />
          <span className="font-serif-display text-lg tracking-wider text-[#F4F1EA] uppercase leading-none">
            ABDILA ASY SYAFIQ
          </span>
        </div>

        {/* Right: Menu Trigger */}
        <button
          onClick={onOpenMenu}
          className="flex items-center space-x-1.5 px-3 py-1.5 border border-[#36332F] bg-[#23221E] text-[#F4F1EA] active:bg-[#2D2B26] transition-colors cursor-pointer text-xs font-mono tracking-wider"
          aria-label="Open Navigation Menu"
        >
          <Menu size={15} />
          <span>MENU</span>
        </button>

        {/* Dynamic 2px Progress Bar at header bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#36332F]/50 overflow-hidden">
          <div
            ref={mobileProgressRef}
            className="h-full bg-[#F4F1EA] transition-all duration-75"
            style={{ width: '0%' }}
          />
        </div>
      </header>

      {/* Dedicated Left Sidebar matching khanhnguyen.design (Desktop only) */}
      <div className="fixed left-0 top-0 bottom-0 w-14 sm:w-16 md:w-20 bg-[#1C1B18] border-r border-[#36332F] z-40 hidden md:flex flex-col items-center justify-between py-0 select-none">
        {/* Full-Height Vertical Scrollbar Progress Indicator on Sidebar FAR LEFT Edge */}
        <div className="absolute left-0 top-0 bottom-0 w-[2.5px] bg-[#36332F] pointer-events-none overflow-hidden z-50">
          <div
            ref={fillRef}
            className="w-full bg-[#F4F1EA] transition-all duration-75"
            style={{ height: '0%' }}
          />
        </div>

        {/* Top: Menu Trigger Square */}
        <button
          onClick={onOpenMenu}
          className="w-full h-14 sm:h-16 md:h-20 border-b border-[#36332F] flex items-center justify-center text-[#F4F1EA] hover:bg-[#23221E] transition-colors cursor-pointer"
          aria-label="Open Editorial Menu"
        >
          <Menu size={22} />
        </button>

        {/* Top Branding Tag */}
        <div className="pt-6">
          <span
            className="font-mono text-[9px] tracking-[0.25em] uppercase text-[#A29D93] whitespace-nowrap block"
            style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
          >
            FOLIO — EDITION
          </span>
        </div>

        {/* Center: Vertical Rotated Serif Name Branding */}
        <div className="my-auto py-8">
          <span
            className="font-serif-display text-base sm:text-lg tracking-wider text-[#F4F1EA] whitespace-nowrap font-normal block"
            style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
          >
            ABDILA ASY SYAFIQ
          </span>
        </div>

        {/* Bottom: Year Mark */}
        <div className="w-full py-5 border-t border-[#36332F] flex justify-center items-center">
          <span className="font-mono text-[10px] text-[#A29D93] tracking-widest whitespace-nowrap">
            © 2026
          </span>
        </div>
      </div>

      {/* Floating Top & Bottom Overlays (Desktop only) */}
      <div className="fixed inset-0 pointer-events-none z-40 hidden md:flex flex-col justify-between p-4 sm:p-6 md:p-8 pl-4 sm:pl-6 md:pl-24 select-none">
        {/* Top Floating Bar */}
        <div className="w-full flex items-center justify-between pointer-events-none">
          <div />
        </div>

        {/* Bottom Floating Bar: Vertical SCROLL Text on Bottom Right */}
        <div className="w-full flex items-end justify-end pointer-events-none">
          <div
            className="font-serif-display italic text-xl sm:text-2xl text-[#F4F1EA] tracking-widest uppercase opacity-80 pb-2 select-none"
            style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
          >
            SCROLL ↔
          </div>
        </div>
      </div>
    </>
  );
});

export default FrameOverlay;


