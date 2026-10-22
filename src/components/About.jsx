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
      className="w-full md:w-screen md:min-w-[100vw] min-h-[100dvh] md:h-[100dvh] shrink-0 md:snap-start md:snap-always grid grid-cols-1 lg:grid-cols-12 border-b md:border-b-0 md:border-r border-[#36332F] overflow-hidden"
    >
      {/* Left Half: Dark Charcoal Panel (#1C1B18) matching editorial theme */}
      <div className="lg:col-span-6 bg-[#1C1B18] text-[#F4F1EA] pt-16 sm:pt-16 md:pt-14 pb-8 sm:pb-10 md:pb-12 px-4 sm:px-6 md:pl-28 md:pr-14 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[#36332F]">
        {/* Top Eyebrow */}
        <div className="about-el flex items-center justify-between font-mono text-[11px] sm:text-xs text-[#D5CEC4] uppercase tracking-widest pb-3 border-b border-[#36332F] shrink-0">
          <span>02 — ABOUT & APPROACH</span>
          <span>S1 SISTEM INFORMASI</span>
        </div>

        {/* Main Large Statement */}
        <div className="py-6 sm:py-8 md:py-4 my-auto">
          <p className="about-el font-sans text-base sm:text-xl md:text-2xl lg:text-[26px] text-[#ECE8E1] font-normal leading-snug sm:leading-relaxed tracking-tight">
            I am an Information Systems undergraduate who is still learning and growing. My experience is built through practice, trial, and error — striving to understand the fundamentals and build better with every project.
          </p>
        </div>

        {/* Bottom 2-Column Explanation Paragraphs */}
        <div className="about-el grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 pt-4 border-t border-[#36332F] font-sans text-xs text-[#8C8880] leading-relaxed shrink-0">
          <p>
            From hands-on IT operations and network troubleshooting as an IT Division Intern at FMM Head Office Bekasi to building academic web systems and database schemas, each experience taught me patience, humility, and the importance of listening first.
          </p>
          <p>
            I don't claim to know everything. What matters most to me is staying curious, owning mistakes, and maintaining the work ethic to keep improving across development, UI/UX, and data systems.
          </p>
        </div>
      </div>

      {/* Right Half: Dark Charcoal Panel (#1C1B18) with Giant Watermark Typography */}
      <div className="lg:col-span-6 bg-[#1C1B18] text-[#F4F1EA] py-10 sm:py-12 md:pt-14 md:pb-12 px-5 sm:px-8 md:px-14 flex flex-col justify-between relative overflow-hidden select-none">
        {/* Top Right Eyebrow */}
        <div className="about-el flex justify-between lg:justify-end items-center font-mono text-[11px] sm:text-xs text-[#A29D93] uppercase tracking-widest pb-3 border-b border-[#36332F] shrink-0">
          <span className="lg:hidden text-[#8C8880]">MOTTO</span>
          <span>PERSPECTIVE</span>
        </div>

        {/* Giant Watermark Serif Typography */}
        <div className="py-8 sm:py-10 md:py-4 my-auto">
          <h2 className="font-serif-display text-[clamp(32px,5.5vw,72px)] text-[#38342E] md:text-[#2D2A26] uppercase leading-[0.88] tracking-tight">
            "STILL LEARNING.<br />
            STAY HUMBLE.<br />
            GROW BY<br />
            DOING."
          </h2>
        </div>

        {/* Bottom Details */}
        <div className="about-el pt-4 border-t border-[#36332F] flex justify-between items-center font-mono text-[11px] sm:text-xs text-[#A29D93] uppercase tracking-widest shrink-0">
          <span>UNIVERSITAS BANI SALEH</span>
          <span>EST. 2026</span>
        </div>
      </div>
    </section>
  );
}
