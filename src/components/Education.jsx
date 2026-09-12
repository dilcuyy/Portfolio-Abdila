import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { portfolioData } from '../data/portfolio';
import { CodeIcon, DatabaseIcon, LayersIcon } from './Icons';

gsap.registerPlugin(ScrollTrigger);

export default function Education() {
  const sectionRef = useRef(null);
  const semesters = portfolioData.education.semesters || [];
  const [activeSmtIndex, setActiveSmtIndex] = useState(semesters.length - 1);

  const activeSmt = semesters[activeSmtIndex] || semesters[semesters.length - 1];
  const progressPercent = (activeSmtIndex / (semesters.length - 1)) * 100;

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.edu-el',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
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
      id="education"
      ref={sectionRef}
      className="py-24 md:py-32 border-b border-[#2B2A26] bg-[#0B0B09] relative overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12 space-y-16">
        {/* Hairline Divider Header */}
        <div className="edu-el flex justify-between items-center pb-4 border-b border-[#2B2A26] text-xs font-mono text-[#A7A39A]">
          <span className="uppercase tracking-widest text-[#D8D0BF]">02 — ACADEMIC BACKGROUND</span>
          <span className="uppercase tracking-widest text-[#A7A39A]">BEKASI, INDONESIA</span>
        </div>

        {/* Streamlined Open Editorial Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Focused Info & Fluid GPA Slider */}
          <div className="lg:col-span-7 space-y-8">
            <div className="edu-el space-y-2">
              <h2 className="text-section-heading font-bebas text-[#F2EEE5] uppercase tracking-tight leading-none">
                EDUCATION
              </h2>
              <p className="text-2xl sm:text-3xl font-bebas text-[#D8D0BF] tracking-wide uppercase">
                {portfolioData.education.degree}
              </p>
              <p className="text-sm text-[#A7A39A] font-light">
                {portfolioData.education.university} • 2023 — 2027
              </p>
            </div>

            {/* Dynamic Semester IPS Display & Separate Cumulative IPK Badge */}
            <div className="edu-el pt-2 flex flex-col sm:flex-row sm:items-end sm:justify-between space-y-4 sm:space-y-0 pb-2">
              {/* Left: Main Large Semester IPS Number */}
              <div className="space-y-1">
                <span className="text-[11px] font-mono text-[#A7A39A] uppercase tracking-widest block">
                  SEMESTER IPS
                </span>
                <div className="h-16 flex items-center overflow-hidden">
                  <div key={activeSmt.id} className="animate-odometer-roll">
                    {activeSmt.ips === 'Ongoing' || activeSmt.ips === '—' ? (
                      <div className="flex items-center space-x-3 text-2xl sm:text-3xl font-bebas tracking-wide text-[#D8D0BF]">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#D8D0BF] animate-pulse shrink-0" />
                        <span>IN PROGRESS ({activeSmt.sksSmt} SKS TAKEN)</span>
                      </div>
                    ) : (
                      <div className="flex items-baseline space-x-3">
                        <div className="text-5xl sm:text-6xl font-mono font-bold text-[#F2EEE5] tracking-tight leading-none">
                          {activeSmt.ips}
                        </div>
                        <div className="text-xs font-mono text-[#A7A39A]">
                          {activeSmt.sksSmt ? `${activeSmt.sksSmt} SKS` : ''}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Right: Separate Smaller Cumulative IPK Metric (No Capsule/Pill Shape) */}
              <div className="flex items-center space-x-3 border-l border-[#2B2A26] pl-4 py-1 text-xs font-mono self-start sm:self-auto">
                <span className="text-[#A7A39A] uppercase tracking-wider">CUMULATIVE IPK</span>
                <span className="text-[#F2EEE5] font-bold text-sm sm:text-base">{activeSmt.ipk} <span className="text-xs font-normal text-[#A7A39A]">/ 4.00</span></span>
              </div>
            </div>

            {/* User-Friendly Fluid Slider Track */}
            <div className="edu-el space-y-3 pt-4 border-t border-[#2B2A26]">
              <div className="flex justify-between items-center text-xs font-mono text-[#A7A39A]">
                <span className="uppercase tracking-widest">TIMELINE SLIDER</span>
                <span className="text-[#D8D0BF] uppercase font-medium">0{activeSmt.smt} / 07</span>
              </div>

              {/* Slider Hit Container with Knob */}
              <div className="relative py-3 flex items-center cursor-pointer group">
                <div className="w-full h-1.5 bg-[#1B1A17] border border-[#2B2A26] rounded-full relative overflow-hidden">
                  <div
                    className="h-full bg-[#D8D0BF] rounded-full transition-all duration-300 ease-out"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>

                <div
                  className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[#D8D0BF] border-2 border-[#0B0B09] shadow-md transition-all duration-150 ease-out z-20 pointer-events-none group-hover:scale-125"
                  style={{ left: `calc(${progressPercent}% - 8px)` }}
                />

                <input
                  type="range"
                  min="0"
                  max={semesters.length - 1}
                  step="1"
                  value={activeSmtIndex}
                  onChange={(e) => setActiveSmtIndex(Number(e.target.value))}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-30"
                  aria-label="Semester Slider"
                />
              </div>

              {/* Minimalist Semester Step Numbers */}
              <div className="flex justify-between items-center text-xs font-mono h-8 relative select-none">
                {semesters.map((item, idx) => {
                  const isActive = idx === activeSmtIndex;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setActiveSmtIndex(idx)}
                      className={`relative h-full flex items-center justify-center px-3 rounded-lg transition-colors duration-300 active:translate-y-[1px] ${
                        isActive ? 'text-[#F2EEE5] font-bold' : 'text-[#A7A39A] hover:text-[#D8D0BF]'
                      }`}
                    >
                      <span>0{item.smt}</span>
                    </button>
                  );
                })}

                <div
                  className="absolute bottom-0 h-0.5 bg-[#D8D0BF] rounded-full transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  style={{
                    left: `${(activeSmtIndex / (semesters.length - 1)) * (100 - (100 / semesters.length))}%`,
                    width: `${100 / semesters.length}%`,
                  }}
                />
              </div>
            </div>
          </div>

          {/* Right Column: Clean Editorial Campus Portrait */}
          <div className="edu-el lg:col-span-5 relative min-h-[380px] lg:min-h-[440px] h-full rounded-2xl overflow-hidden border border-[#2B2A26] bg-[#141411] group flex flex-col justify-end">
            <img
              src={portfolioData.education.image}
              alt="Universitas Bani Saleh Academic Portrait"
              className="absolute inset-0 w-full h-full object-cover grayscale opacity-60 contrast-110 group-hover:grayscale-0 group-hover:opacity-85 transition-all duration-700 pointer-events-none"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B09] via-[#0B0B09]/20 to-transparent" />
            <div className="relative z-10 p-6 space-y-1">
              <span className="text-[10px] font-mono text-[#D8D0BF] uppercase tracking-widest block">
                ACADEMIC PORTRAIT • BEKASI
              </span>
              <p className="text-base font-bebas text-[#F2EEE5] uppercase tracking-wide">
                UNIVERSITAS BANI SALEH
              </p>
            </div>
          </div>
        </div>

        {/* 3-Column Disciplines with Micro SVG Icons */}
        <div className="edu-el space-y-4 pt-4 border-t border-[#2B2A26]">
          <span className="text-xs font-mono text-[#A7A39A] uppercase tracking-widest block">
            CORE DISCIPLINES
          </span>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
            <div className="p-6 rounded-xl border border-[#2B2A26] bg-[#141411] space-y-2 hover:border-[#D8D0BF]/40 transition-colors duration-300">
              <div className="flex items-center justify-between text-[#D8D0BF]">
                <span className="font-semibold text-sm uppercase">
                  01 / SOFTWARE ARCHITECTURE
                </span>
                <CodeIcon size={18} className="text-[#D8D0BF] shrink-0" />
              </div>
              <p className="text-[#A7A39A] text-xs leading-relaxed">
                MVC frameworks, CodeIgniter 4, React.js components, and RESTful API endpoints.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-[#2B2A26] bg-[#141411] space-y-2 hover:border-[#D8D0BF]/40 transition-colors duration-300">
              <div className="flex items-center justify-between text-[#D8D0BF]">
                <span className="font-semibold text-sm uppercase">
                  02 / DATABASE SYSTEMS
                </span>
                <DatabaseIcon size={18} className="text-[#D8D0BF] shrink-0" />
              </div>
              <p className="text-[#A7A39A] text-xs leading-relaxed">
                Relational schema design, MySQL ERD modeling, and system data optimization.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-[#2B2A26] bg-[#141411] space-y-2 hover:border-[#D8D0BF]/40 transition-colors duration-300">
              <div className="flex items-center justify-between text-[#D8D0BF]">
                <span className="font-semibold text-sm uppercase">
                  03 / UX & ANALYTICS
                </span>
                <LayersIcon size={18} className="text-[#D8D0BF] shrink-0" />
              </div>
              <p className="text-[#A7A39A] text-xs leading-relaxed">
                Figma UI prototyping, WCAG AA accessibility, and sales prediction analytics.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}




