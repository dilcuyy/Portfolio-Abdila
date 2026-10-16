import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function About() {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.about-el',
        { opacity: 0, x: 30 },
        { opacity: 1, x: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out' }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      data-section-id="about"
      ref={sectionRef}
      className="w-screen min-w-[100vw] h-[100dvh] shrink-0 snap-start snap-always grid grid-cols-1 lg:grid-cols-12 border-r border-[#36332F] overflow-hidden"
    >
      {/* Left Half: Dark Charcoal Panel (#1C1B18) matching editorial theme */}
      <div className="lg:col-span-6 bg-[#1C1B18] text-[#F4F1EA] pt-10 sm:pt-12 md:pt-14 pb-8 sm:pb-10 md:pb-12 pl-16 sm:pl-20 md:pl-28 lg:pl-28 pr-6 sm:pr-10 md:pr-14 flex flex-col justify-between border-r border-[#36332F] overflow-hidden">
        {/* Top Eyebrow */}
        <div className="about-el flex items-center justify-between font-mono text-[11px] sm:text-xs text-[#D5CEC4] uppercase tracking-widest pb-3 border-b border-[#36332F] shrink-0">
          <span>02 — ABOUT & APPROACH</span>
          <span>S1 SISTEM INFORMASI</span>
        </div>

        {/* Main Large Statement */}
        <div className="my-auto py-3 sm:py-4">
          <p className="about-el font-sans text-lg sm:text-xl md:text-2xl lg:text-[26px] text-[#ECE8E1] font-normal leading-snug sm:leading-relaxed tracking-tight">
            I am an Information Systems undergraduate who is still learning and growing. My experience is built through practice, trial, and error — striving to understand the fundamentals and build better with every project.
          </p>
        </div>

        {/* Bottom 2-Column Explanation Paragraphs */}
        <div className="about-el grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 pt-3 sm:pt-4 border-t border-[#36332F] font-sans text-[11px] sm:text-xs text-[#8C8880] leading-relaxed shrink-0">
          <p>
            From direct customer communication during retail work at Levi's Store to building academic web systems and database schemas, each experience taught me patience, humility, and the importance of listening first.
          </p>
          <p>
            I don't claim to know everything. What matters most to me is staying curious, owning mistakes, and maintaining the work ethic to keep improving across development, UI/UX, and data systems.
          </p>
        </div>
      </div>

      {/* Right Half: Dark Charcoal Panel (#1C1B18) with Giant Watermark Typography matching Image 2 */}
      <div className="lg:col-span-6 bg-[#1C1B18] text-[#F4F1EA] pt-10 sm:pt-12 md:pt-14 pb-8 sm:pb-10 md:pb-12 px-6 sm:px-10 md:px-14 flex flex-col justify-between relative overflow-hidden select-none">
        {/* Top Right Eyebrow */}
        <div className="about-el flex justify-end font-mono text-[11px] sm:text-xs text-[#A29D93] uppercase tracking-widest pb-3 border-b border-[#36332F] shrink-0">
          <span>PERSPECTIVE</span>
        </div>

        {/* Giant Watermark Serif Typography */}
        <div className="my-auto py-3 sm:py-4">
          <h2 className="font-serif-display text-[clamp(32px,4.5vw,72px)] text-[#2D2A26] uppercase leading-[0.88] tracking-tight">
            "STILL LEARNING.<br />
            STAY HUMBLE.<br />
            GROW BY<br />
            DOING."
          </h2>
        </div>

        {/* Bottom Details */}
        <div className="about-el pt-3 sm:pt-4 border-t border-[#36332F] flex justify-between items-center font-mono text-[11px] sm:text-xs text-[#A29D93] uppercase tracking-widest shrink-0">
          <span>UNIVERSITAS BANI SALEH</span>
          <span>EST. 2026</span>
        </div>
      </div>
    </section>
  );
}
