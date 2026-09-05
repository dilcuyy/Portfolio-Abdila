import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { portfolioData } from '../data/portfolio';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.about-reveal',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
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
      id="about"
      ref={sectionRef}
      className="py-20 md:py-32 border-b border-[#2B2A26] relative"
    >
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12">
        {/* Section Header */}
        <div className="about-reveal flex justify-between items-center mb-10 pb-4 border-b border-[#2B2A26]">
          <span className="text-xs font-mono tracking-widest text-[#A7A39A] uppercase">
            01 — ABOUT ME
          </span>
          <span className="text-xs font-mono tracking-widest text-[#A7A39A] uppercase hidden sm:inline">
            PROFILE / PERSPECTIVE
          </span>
        </div>

        {/* Full-Width Narrative Layout */}
        <div className="space-y-12">
          {/* Section Heading */}
          <h2 className="about-reveal text-section-heading font-bebas text-[#F2EEE5] uppercase tracking-tight leading-none">
            ABOUT ME
          </h2>

          {/* Narrative Content Grid */}
          <div className="about-reveal grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-8 space-y-6 text-base sm:text-xl text-[#F2EEE5]/90 font-light leading-relaxed">
              <p className="text-2xl sm:text-3xl font-normal text-[#F2EEE5]">
                Hi, I'm <span className="underline decoration-[#D8D0BF] underline-offset-8 font-semibold">{portfolioData.personal.name}</span>.
              </p>

              <p className="text-[#F2EEE5]/90 leading-relaxed">
                {portfolioData.personal.bio}
              </p>

              <p className="text-[#A7A39A] text-base md:text-lg leading-relaxed pt-2">
                My academic journey in Information Systems at Universitas Bani Saleh (2023 — 2027) equips me with technical proficiency in modern web stacks (CodeIgniter 4, MySQL, React) as well as strategic insights into business process optimization, UI design engineering, and data-driven decision making.
              </p>
            </div>

            {/* Side Statement Quote Card */}
            <div className="lg:col-span-4 bg-[#12120F] border border-[#2B2A26] p-8 rounded-3xl space-y-4">
              <span className="text-xs font-mono text-[#D8D0BF] uppercase tracking-widest block">
                PHILOSOPHY & FOCUS
              </span>
              <blockquote className="text-sm font-mono text-[#F2EEE5] leading-relaxed italic">
                "Turning complex backend logic and enterprise workflows into clean, accessible, and high-contrast digital experiences."
              </blockquote>
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="about-reveal grid grid-cols-2 md:grid-cols-4 gap-6 pt-10 border-t border-[#2B2A26]">
            <div>
              <span className="block text-xs font-mono text-[#A7A39A] uppercase mb-1">DEGREE</span>
              <span className="text-base sm:text-lg text-[#F2EEE5] font-bebas uppercase tracking-wide block">
                Sarjana Sistem Informasi
              </span>
            </div>
            <div>
              <span className="block text-xs font-mono text-[#A7A39A] uppercase mb-1">UNIVERSITY</span>
              <span className="text-base sm:text-lg text-[#F2EEE5] font-bebas uppercase tracking-wide block">
                Universitas Bani Saleh
              </span>
            </div>
            <div>
              <span className="block text-xs font-mono text-[#A7A39A] uppercase mb-1">STUDY PERIOD</span>
              <span className="text-base sm:text-lg text-[#D8D0BF] font-mono font-semibold block">
                2023 — 2027
              </span>
            </div>
            <div>
              <span className="block text-xs font-mono text-[#A7A39A] uppercase mb-1">CUMULATIVE GPA</span>
              <span className="text-base sm:text-lg text-[#D8D0BF] font-mono font-bold block">
                {portfolioData.education.gpa}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
