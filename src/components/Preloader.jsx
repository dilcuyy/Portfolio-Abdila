import React, { useEffect, useState } from 'react';

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsFadingOut(true), 100);
          setTimeout(() => onComplete && onComplete(), 700);
          return 100;
        }
        return prev + Math.floor(Math.random() * 15) + 5;
      });
    }, 40);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[9990] bg-[#0B0B09] text-[#F2EEE5] flex flex-col justify-between p-8 md:p-16 transition-opacity duration-700 ease-in-out ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Top Header */}
      <div className="flex justify-between items-center text-xs tracking-widest text-[#A7A39A] uppercase font-mono">
        <span>ABDILA ASY SYAFIQ</span>
        <span>PORTFOLIO 2026</span>
      </div>

      {/* Center Big Typography */}
      <div className="my-auto max-w-5xl">
        <h1 className="text-hero-giant font-bebas leading-none tracking-tight text-[#F2EEE5] uppercase mb-4">
          EDITORIAL PORTFOLIO
        </h1>
        <p className="text-sm md:text-base text-[#A7A39A] font-sans tracking-wide">
          INFORMATION SYSTEMS • WEB DEVELOPMENT • UI/UX DESIGN
        </p>
      </div>

      {/* Bottom Progress Bar */}
      <div className="w-full space-y-3">
        <div className="flex justify-between text-xs font-mono text-[#A7A39A]">
          <span>LOADING EXPERIENCE</span>
          <span>{Math.min(progress, 100)}%</span>
        </div>
        <div className="w-full h-[2px] bg-[#2B2A26] relative overflow-hidden">
          <div
            className="h-full bg-[#F2EEE5] transition-all duration-150 ease-out"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
      </div>
    </div>
  );
}
