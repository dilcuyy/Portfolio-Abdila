import React from 'react';
import { portfolioData } from '../data/portfolio';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="bg-[#0B0B09] py-16 text-[#A7A39A]">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12 space-y-12">
        
        {/* Top Row */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-[#2B2A26] pb-10 gap-6">
          <div>
            <h3 className="text-3xl font-bebas text-[#F2EEE5] uppercase tracking-wide">
              {portfolioData.personal.name}
            </h3>
            <p className="text-xs font-mono text-[#A7A39A] uppercase tracking-wider mt-1">
              Information Systems • Web Development • UI/UX • Data Analysis
            </p>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-[#F2EEE5] hover:text-[#D8D0BF] transition-colors border border-[#2B2A26] px-5 py-2.5 rounded-full bg-[#12120F]"
          >
            <span>BACK TO TOP</span>
            <span>↑</span>
          </button>
        </div>

        {/* Bottom Row */}
        <div className="flex flex-col sm:flex-row justify-between items-center text-xs font-mono gap-4">
          <p>© {portfolioData.personal.year} Abdila Asy Syafiq. All rights reserved.</p>
          <p className="text-[#D8D0BF]">Designed & Developed by Abdila</p>
        </div>

      </div>
    </footer>
  );
}
