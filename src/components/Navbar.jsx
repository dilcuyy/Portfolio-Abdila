import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Github } from './Icons';

export default function Navbar({ activeSection }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Education', href: '#education' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle ESC key and click outside for mobile dropdown
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsMobileMenuOpen(false);
    };
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      const topOffset = 90;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - topOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
      });
    }
  };

  return (
    <header
      ref={menuRef}
      className="fixed top-0 left-0 w-full z-50 pointer-events-none py-4 sm:py-6 px-4 sm:px-8"
    >
      <div className="max-w-[1440px] mx-auto flex items-center justify-between pointer-events-auto relative">
        {/* Left Floating Brand Pill Capsule */}
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, '#home')}
          className="flex items-center space-x-2.5 px-4 py-2 rounded-full bg-[#161612]/90 backdrop-blur-md border border-[#2B2A26] shadow-lg hover:border-[#D8D0BF]/60 transition-colors group"
        >
          <div className="w-6 h-6 rounded-full bg-[#F2EEE5] text-[#0B0B09] flex items-center justify-center font-bebas text-sm font-bold">
            A
          </div>
          <span className="text-xs font-mono font-medium text-[#F2EEE5] tracking-wider uppercase group-hover:text-[#D8D0BF] transition-colors">
            Abdila Asy Syafiq
          </span>
        </a>

        {/* Right Floating Nav Pill Capsule (Desktop) */}
        <div className="hidden lg:flex items-center space-x-1.5 p-1.5 rounded-full bg-[#161612]/90 backdrop-blur-md border border-[#2B2A26] shadow-lg">
          <nav className="flex items-center space-x-1 px-2">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-[#2B2A26] text-[#F2EEE5] font-semibold'
                      : 'text-[#A7A39A] hover:text-[#F2EEE5] hover:bg-[#2B2A26]/50'
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </nav>

          {/* GitHub Pill Button */}
          <a
            href="https://github.com/dilcuyy"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#0B0B09] text-[#F2EEE5] text-xs font-mono uppercase tracking-wider border border-[#2B2A26] hover:border-[#D8D0BF] hover:text-[#D8D0BF] transition-colors"
          >
            <Github size={14} />
            <span className="font-semibold">GitHub</span>
            <span className="text-[10px] text-[#D8D0BF]">★</span>
          </a>
        </div>

        {/* Mobile Pill Capsule (GitHub Badge + Toggle Button in One Capsule) */}
        <div className="flex lg:hidden items-center p-1 rounded-full bg-[#161612]/90 backdrop-blur-md border border-[#2B2A26] shadow-lg space-x-1">
          <a
            href="https://github.com/dilcuyy"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-[#0B0B09] text-[#F2EEE5] text-xs font-mono uppercase tracking-wider border border-[#2B2A26]"
          >
            <Github size={13} />
            <span className="text-[11px] font-semibold">GitHub</span>
            <span className="text-[10px] text-[#D8D0BF]">★</span>
          </a>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-1.5 rounded-full text-[#F2EEE5] hover:text-[#D8D0BF] hover:bg-[#2B2A26] transition-colors focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {/* Mobile Dropdown Popover Card (Matching tasteskill.dev Reference) */}
        {isMobileMenuOpen && (
          <div className="absolute top-14 right-0 w-48 rounded-2xl bg-[#161612]/95 backdrop-blur-2xl border border-[#2B2A26] shadow-2xl p-2 z-50 flex flex-col space-y-1 animate-fadeIn lg:hidden">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-mono uppercase tracking-wider transition-all flex items-center justify-between ${
                    isActive
                      ? 'bg-[#2B2A26] text-[#F2EEE5] font-bold'
                      : 'text-[#A7A39A] hover:text-[#F2EEE5] hover:bg-[#2B2A26]/40'
                  }`}
                >
                  <span>{link.name}</span>
                  {isActive && <span className="text-[10px] text-[#D8D0BF]">●</span>}
                </a>
              );
            })}
          </div>
        )}
      </div>
    </header>
  );
}
