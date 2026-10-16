import React from 'react';
import { portfolioData } from '../data/portfolio';

export default function Skills() {
  const softSkills = portfolioData.skills.soft || [];
  const hardSkills = portfolioData.skills.hard || [];

  return (
    <section
      id="skills"
      data-section-id="skills"
      className="w-screen min-w-[100vw] h-[100dvh] shrink-0 snap-start snap-always flex flex-col justify-between pt-16 pb-16 pl-14 sm:pl-20 md:pl-28 lg:pl-32 pr-8 sm:pr-12 md:pr-16 border-r border-[#36332F] bg-[#1C1B18] relative overflow-hidden"
    >
      {/* Top Header Eyebrow */}
      <div className="flex justify-between items-center pb-3 border-b border-[#36332F]">
        <span className="text-xs font-mono tracking-widest text-[#D5CEC4] uppercase">
          05 — COMPETENCIES & STACK
        </span>
        <span className="text-xs font-mono tracking-widest text-[#8C8880] uppercase hidden sm:inline">
          TECHNICAL & SOFT SKILLS ARCHITECTURE
        </span>
      </div>

      {/* Main Section Header */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-end border-b border-[#36332F] pb-3">
        <div className="lg:col-span-8">
          <h2 className="font-serif-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-[#ECE8E1] font-normal tracking-tight uppercase leading-none">
            COMPETENCIES
          </h2>
        </div>
        <div className="lg:col-span-4 text-[11px] font-mono text-[#8C8880] uppercase leading-relaxed tracking-wider">
          ✦ CORE TECHNICAL STACK, ARCHITECTURAL FRAMEWORKS, AND INTERPERSONAL SKILLS.
        </div>
      </div>

      {/* Main 2-Column Editorial Grid */}
      <div className="my-auto grid grid-cols-1 lg:grid-cols-12 gap-5 items-start w-full max-w-7xl">
        {/* Hard Skills Panel */}
        <div className="lg:col-span-6 bg-[#23221E] border border-[#36332F] p-4 sm:p-5 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-[#36332F]">
            <h3 className="font-serif-display text-2xl sm:text-3xl text-[#ECE8E1] font-normal">
              Technical Stack
            </h3>
            <span className="text-[9px] font-mono text-[#8C8880] uppercase tracking-widest">
              HARD SKILLS ({hardSkills.length})
            </span>
          </div>

          <div className="divide-y divide-[#36332F]">
            {hardSkills.map((item, idx) => (
              <div key={item.id} className="py-1.5 flex items-center justify-between font-mono text-xs text-[#ECE8E1]">
                <div className="flex items-center space-x-3">
                  <span className="text-[#8C8880] font-serif-display text-sm">
                    {(idx + 1).toString().padStart(2, '0')}.
                  </span>
                  <span className="font-medium tracking-wide">{item.name}</span>
                </div>
                <span className="text-[9px] text-[#D5CEC4] uppercase tracking-wider px-2 py-0.5 bg-[#1C1B18] border border-[#36332F]">
                  ✦ ACTIVE
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Soft Skills Panel */}
        <div className="lg:col-span-6 bg-[#23221E] border border-[#36332F] p-4 sm:p-5 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-[#36332F]">
            <h3 className="font-serif-display text-2xl sm:text-3xl text-[#ECE8E1] font-normal">
              Interpersonal
            </h3>
            <span className="text-[9px] font-mono text-[#8C8880] uppercase tracking-widest">
              SOFT SKILLS ({softSkills.length})
            </span>
          </div>

          <div className="divide-y divide-[#36332F]">
            {softSkills.map((item, idx) => (
              <div key={item.id} className="py-1.5 flex items-center justify-between font-mono text-xs text-[#ECE8E1]">
                <div className="flex items-center space-x-3">
                  <span className="text-[#8C8880] font-serif-display text-sm">
                    {(idx + 1).toString().padStart(2, '0')}.
                  </span>
                  <span className="font-medium tracking-wide">{item.name}</span>
                </div>
                <span className="text-[9px] text-[#D5CEC4] uppercase tracking-wider px-2 py-0.5 bg-[#1C1B18] border border-[#36332F]">
                  ✦ VERIFIED
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Quote Bar */}
      <div className="pt-2 border-t border-[#36332F] flex justify-between items-center text-[10px] font-mono text-[#8C8880] uppercase tracking-wider">
        <span>ENGINEERING EFFICIENCY & ARCHITECTURAL DISCIPLINE</span>
        <span>ABDILA ASY SYAFIQ</span>
      </div>
    </section>
  );
}


