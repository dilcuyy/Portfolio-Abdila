import React, { useState } from 'react';
import { portfolioData } from '../data/portfolio';

export default function Contact({ onScrollToTop }) {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(portfolioData.contact.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="contact"
      data-section-id="contact"
      className="w-full md:w-screen md:min-w-[100vw] min-h-[100dvh] md:h-[100dvh] shrink-0 md:snap-start md:snap-always flex flex-col justify-between pt-14 pb-12 sm:pb-16 md:pt-16 md:pb-16 px-5 sm:px-8 md:pl-28 md:pr-16 lg:pl-32 border-b md:border-b-0 md:border-r border-[#36332F] bg-[#1C1B18] relative select-none"
    >
      {/* Top Header Eyebrow (Identical padding & border-b as previous sections) */}
      <div className="flex justify-between items-center pb-3 border-b border-[#36332F] w-full">
        <span className="text-xs font-mono tracking-widest text-[#D5CEC4] uppercase">
          06 — GET IN TOUCH
        </span>
        <button
          type="button"
          onClick={onScrollToTop}
          className="text-xs font-mono tracking-widest text-[#8C8880] hover:text-[#ECE8E1] uppercase cursor-pointer transition-colors"
        >
          BACK TO START ↑
        </button>
      </div>

      {/* Main Content Area */}
      <div className="my-6 md:my-auto space-y-4 w-full max-w-7xl">
        {/* Title Header: NEXT CHAPTER */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-end border-b border-[#36332F] pb-3 w-full">
          <div className="lg:col-span-8">
            <h2 className="font-serif-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-[#ECE8E1] font-normal tracking-tight uppercase leading-none">
              NEXT CHAPTER
            </h2>
          </div>
          <div className="lg:col-span-4 text-[11px] font-mono text-[#8C8880] uppercase leading-relaxed tracking-wider">
            ✦ OPEN FOR FREELANCE INQUIRIES, FULL-TIME POSITIONS & CREATIVE COLLABORATIONS.
          </div>
        </div>

        {/* Editorial Contact Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
          {/* Left Column: Email & Direct Contact Statement */}
          <div className="lg:col-span-7 bg-[#23221E] border border-[#36332F] p-4 sm:p-5 space-y-4 flex flex-col justify-between">
            <div className="space-y-2">
              <span className="text-[10px] font-mono text-[#8C8880] uppercase tracking-widest block">
                DIRECT EMAIL INQUIRY
              </span>
              <button
                type="button"
                onClick={handleCopyEmail}
                className="group text-left focus:outline-none cursor-pointer block w-full"
              >
                <span className="font-serif-display text-xl sm:text-3xl md:text-4xl lg:text-5xl text-[#ECE8E1] underline decoration-[#36332F] group-hover:decoration-[#ECE8E1] transition-colors block break-all">
                  {portfolioData.contact.email}
                </span>
                <span className="text-[10px] font-mono text-[#8C8880] group-hover:text-[#D5CEC4] mt-2 block">
                  {copied ? '✓ COPIED TO CLIPBOARD' : '(CLICK TO COPY EMAIL)'}
                </span>
              </button>
            </div>

            <p className="text-xs font-mono text-[#D5CEC4] leading-relaxed border-t border-[#36332F] pt-3 uppercase tracking-wider">
              {portfolioData.contact.subhead}
            </p>
          </div>

          {/* Right Column: Social Networks & Location Availability Box */}
          <div className="lg:col-span-5 bg-[#23221E] border border-[#36332F] p-4 sm:p-5 space-y-4 flex flex-col justify-between font-mono text-xs">
            <div className="space-y-2">
              <span className="text-[10px] text-[#8C8880] uppercase tracking-widest block border-b border-[#36332F] pb-1.5">
                SOCIAL CHANNELS & NETWORKS
              </span>
              <div className="grid grid-cols-2 gap-2">
                {portfolioData.contact.socials.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-2.5 border border-[#36332F] bg-[#1C1B18] text-[#ECE8E1] hover:border-[#ECE8E1] hover:bg-[#2D2B26] active:bg-[#2D2B26] transition-all flex items-center justify-between group text-xs"
                  >
                    <span>{social.name}</span>
                    <span className="text-[#8C8880] group-hover:text-[#ECE8E1]">↗</span>
                  </a>
                ))}
              </div>
            </div>

            <div className="p-3 bg-[#1C1B18] border border-[#36332F] text-[#D5CEC4] space-y-0.5">
              <span className="text-[#8C8880] uppercase text-[9px] block">LOCATION & AVAILABILITY</span>
              <p className="font-semibold text-xs text-[#ECE8E1]">BEKASI, INDONESIA (GMT+7)</p>
              <p className="text-[10px] text-[#8C8880]">AVAILABLE FOR FREELANCE & FULL-TIME ROLES</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bar (Identical padding & border-t as previous sections) */}
      <div className="pt-3 border-t border-[#36332F] flex flex-wrap gap-2 justify-between items-center text-[10px] font-mono text-[#8C8880] uppercase tracking-wider w-full">
        <span>WHERE CODE & DESIGN FIND THEIR FORM</span>
        <span>© {new Date().getFullYear()} ABDILA ASY SYAFIQ</span>
      </div>
    </section>
  );
}
