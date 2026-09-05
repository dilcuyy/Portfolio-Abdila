import React, { useState, useEffect } from 'react';
import { Menu, X } from './Icons';
import { portfolioData } from '../data/portfolio';

export default function Navbar({ activeSection }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Nav links matching the exact top-to-bottom section sequence on the page
  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Education', href: '#education' },
    { name: 'Skills', href: '#skills' },
    { name: 'Certificates', href: '#certificates' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle ESC key for mobile drawer
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsMobileMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      const topOffset = 80;
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
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0B0B09]/90 backdrop-blur-md border-b border-[#2B2A26]/50 py-3 sm:py-4'
          : 'bg-transparent py-5 md:py-6'
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12 flex items-center justify-between">
        {/* Left branding */}
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, '#home')}
          className="text-xs sm:text-sm font-medium tracking-wider text-[#F2EEE5] uppercase hover:text-[#D8D0BF] transition-colors truncate max-w-[220px] sm:max-w-none"
        >
          {portfolioData.personal.subRole}
        </a>

        {/* Desktop Nav Links (Enforcing single-line layout & exact section sequence) */}
        <nav className="hidden lg:flex items-center space-x-4 xl:space-x-6 2xl:space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className={`link-editorial text-[11px] xl:text-xs font-mono uppercase tracking-wider transition-opacity whitespace-nowrap ${
                activeSection === link.href.substring(1)
                  ? 'text-[#F2EEE5] opacity-100 font-bold'
                  : 'text-[#A7A39A] opacity-80 hover:opacity-100 hover:text-[#F2EEE5]'
              }`}
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden text-[#F2EEE5] p-2 focus:outline-none focus:ring-1 focus:ring-[#D8D0BF]"
          aria-label="Toggle Navigation Menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 top-0 left-0 w-full min-h-[100dvh] bg-[#0B0B09] z-50 flex flex-col justify-between px-6 py-6 lg:hidden animate-fadeIn">
          <div className="flex justify-between items-center w-full border-b border-[#2B2A26] pb-4">
            <span className="text-xs font-mono text-[#D8D0BF] uppercase tracking-wider">
              NAVIGATION MENU
            </span>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-[#F2EEE5] p-2 hover:text-[#D8D0BF] transition-colors"
              aria-label="Close menu"
            >
              <X size={26} />
            </button>
          </div>

          <div className="flex flex-col space-y-3 my-auto overflow-y-auto py-4">
            {navLinks.map((link, idx) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`text-2xl sm:text-3xl font-bebas tracking-wide uppercase transition-colors flex items-center justify-between py-1 border-b border-[#2B2A26]/40 ${
                    isActive ? 'text-[#D8D0BF]' : 'text-[#F2EEE5] hover:text-[#D8D0BF]'
                  }`}
                >
                  <span>0{idx + 1}. {link.name}</span>
                  {isActive && <span className="text-xs font-mono text-[#D8D0BF]">● ACTIVE</span>}
                </a>
              );
            })}
          </div>

          <div className="pt-4 border-t border-[#2B2A26] flex justify-between text-xs text-[#A7A39A] uppercase font-mono">
            <span>BEKASI, INDONESIA</span>
            <span>2026 PORTFOLIO</span>
          </div>
        </div>
      )}
    </header>
  );
}
