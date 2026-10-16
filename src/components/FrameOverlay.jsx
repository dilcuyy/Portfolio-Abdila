import React, { useRef, useImperativeHandle, forwardRef } from 'react';
import { Menu } from './Icons';

const FrameOverlay = forwardRef(function FrameOverlay({ activeSection, onOpenMenu }, ref) {
  const fillRef = useRef(null);

  useImperativeHandle(ref, () => ({
    updateProgress: (progressRatio) => {
      const percent = Math.min(Math.max(progressRatio * 100, 0), 100);
      if (fillRef.current) {
        fillRef.current.style.height = `${percent}%`;
      }
    },
  }));

  return (
    <>
      {/* Dedicated Left Sidebar matching khanhnguyen.design */}
      <div className="fixed left-0 top-0 bottom-0 w-14 sm:w-16 md:w-20 bg-[#1C1B18] border-r border-[#36332F] z-40 hidden md:flex flex-col items-center justify-between py-0 select-none">
        {/* Full-Height Vertical Scrollbar Progress Indicator on Sidebar FAR LEFT Edge */}
        <div className="absolute left-0 top-0 bottom-0 w-[2.5px] bg-[#36332F] pointer-events-none overflow-hidden z-50">
          <div
            ref={fillRef}
            className="w-full bg-[#F4F1EA] transition-all duration-75"
            style={{ height: '0%' }}
          />
        </div>

        {/* Top: Menu Trigger Square (Matching Image 2 khanhnguyen.design) */}
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

        {/* Center: Vertical Rotated Serif Name Branding (Well Spaced, Never Overlapping) */}
        <div className="my-auto py-8">
          <span
            className="font-serif-display text-base sm:text-lg tracking-wider text-[#F4F1EA] whitespace-nowrap font-normal block"
            style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
          >
            ABDILA ASY SYAFIQ
          </span>
        </div>

        {/* Bottom: Year Mark (Matching Image 2 khanhnguyen.design) */}
        <div className="w-full py-5 border-t border-[#36332F] flex justify-center items-center">
          <span className="font-mono text-[10px] text-[#A29D93] tracking-widest whitespace-nowrap">
            © 2026
          </span>
        </div>
      </div>

      {/* Floating Top & Bottom Overlays (pointer-events-none on containers so buttons underneath remain 100% clickable) */}
      <div className="fixed inset-0 pointer-events-none z-40 flex flex-col justify-between p-4 sm:p-6 md:p-8 pl-4 sm:pl-6 md:pl-24 select-none">
        {/* Top Floating Bar */}
        <div className="w-full flex items-center justify-between pointer-events-none">
          {/* Mobile Menu Button (md:hidden) */}
          <button
            onClick={onOpenMenu}
            className="md:hidden pointer-events-auto group flex items-center space-x-2 px-3.5 py-2 text-[#F4F1EA] border border-[#36332F] bg-[#1C1B18]/90 cursor-pointer"
          >
            <Menu size={18} />
            <span className="font-mono text-xs uppercase tracking-wider">MENU</span>
          </button>
        </div>

        {/* Bottom Floating Bar: Only Vertical SCROLL Text on Bottom Right (pointer-events-none on wrapper so buttons are 100% clickable) */}
        <div className="w-full flex items-end justify-end pointer-events-none">
          {/* Bottom Right: Clean Vertical Editorial SCROLL text */}
          <div
            className="font-serif-display italic text-xl sm:text-2xl text-[#F4F1EA] tracking-widest uppercase opacity-80 pb-2 select-none"
            style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
          >
            SCROLL ↓
          </div>
        </div>
      </div>
    </>
  );
});

export default FrameOverlay;


