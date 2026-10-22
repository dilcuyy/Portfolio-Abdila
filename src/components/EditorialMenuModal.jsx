import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, ExternalLink } from './Icons';
import { portfolioData } from '../data/portfolio';

export default function EditorialMenuModal({ isOpen, onClose, activeSection, onSelectSection }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const menuItems = [
    { id: 'home', num: '01.', label: 'HOME' },
    { id: 'about', num: '02.', label: 'ABOUT' },
    { id: 'academic', num: '03.', label: 'JOURNEY ROADMAP' },
    { id: 'certificates', num: '04.', label: 'CERTIFICATES' },
    { id: 'projects', num: '05.', label: 'ALL WORK' },
    { id: 'contact', num: '06.', label: 'CONTACT' },
  ];

  return createPortal(
    <div className="fixed inset-0 z-[100] bg-[#1C1B18] flex flex-col justify-between p-4 sm:p-6 md:p-8 select-none overflow-y-auto">
      {/* Top Bar inside Menu */}
      <div className="w-full flex items-center justify-between border-b border-[#36332F] pb-3 shrink-0">
        <div className="flex items-center space-x-3">
          <span className="w-2 h-2 rounded-full bg-[#F4F1EA]" />
          <span className="font-mono text-xs uppercase tracking-widest text-[#F4F1EA]">
            NAVIGATION MENU
          </span>
        </div>

        <button
          onClick={onClose}
          className="group flex items-center space-x-2 px-4 py-2 border border-[#36332F] text-[#F4F1EA] hover:bg-[#23221E] transition-all cursor-pointer"
          aria-label="Close Navigation Menu"
        >
          <span className="font-serif-display text-xl sm:text-2xl tracking-wider uppercase leading-none">
            CLOSE
          </span>
          <X size={16} className="group-hover:rotate-90 transition-transform duration-300" />
        </button>
      </div>

      {/* Main Nav Items (Shifted higher up to avoid clipping bottom items) */}
      <nav className="mt-2 sm:mt-4 mb-auto py-1 sm:py-2 flex flex-col space-y-1 sm:space-y-2 md:space-y-2.5 max-w-5xl">
        {menuItems.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                onSelectSection(item.id);
                onClose();
              }}
              className="group flex items-baseline space-x-3 sm:space-x-6 text-left cursor-pointer transition-all duration-300"
            >
              <span className={`font-mono text-base sm:text-xl md:text-2xl transition-colors ${
                isActive ? 'text-[#F4F1EA]' : 'text-[#A29D93]/60 group-hover:text-[#F4F1EA]'
              }`}>
                {item.num}
              </span>
              <span className={`font-serif-display text-2xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight uppercase leading-none transition-all duration-300 ${
                isActive
                  ? 'text-[#F4F1EA] translate-x-2 sm:translate-x-3'
                  : 'text-[#A29D93]/40 group-hover:text-[#F4F1EA] group-hover:translate-x-2 sm:group-hover:translate-x-3'
              }`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>

      {/* Bottom Bar: Social Links */}
      <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between border-t border-[#36332F] pt-3 sm:pt-4 gap-3 shrink-0">
        <div className="font-mono text-xs text-[#A29D93] uppercase tracking-wider">
          {portfolioData.personal.name} — {portfolioData.personal.role}
        </div>

        <div className="flex flex-wrap items-center gap-6 font-mono text-xs uppercase tracking-wider text-[#A29D93]">
          {portfolioData.contact.socials.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#F4F1EA] transition-colors inline-flex items-center space-x-1"
            >
              <span>{social.name}</span>
              <ExternalLink size={12} className="opacity-70" />
            </a>
          ))}
        </div>
      </div>
    </div>,
    document.body
  );
}

