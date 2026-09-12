import React, { useEffect } from 'react';
import { X, FileText } from './Icons';

export default function ResumeModal({ isOpen, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#0B0B09]/90 backdrop-blur-xl animate-fadeIn">
      {/* Backdrop Overlay Click */}
      <div className="absolute inset-0 cursor-pointer" onClick={onClose} />

      {/* Modal Lightbox Box */}
      <div className="relative z-10 w-full max-w-4xl h-[90vh] max-h-[90vh] bg-[#141411] border border-[#2B2A26] rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="px-3.5 py-3 sm:px-5 sm:py-4 border-b border-[#2B2A26] flex items-center justify-between bg-[#161612] shrink-0 gap-2">
          <div className="flex items-center space-x-2 sm:space-x-3 text-xs font-mono text-[#D8D0BF] min-w-0">
            <FileText size={18} className="shrink-0" />
            <span className="font-semibold uppercase tracking-wider whitespace-nowrap overflow-hidden text-ellipsis">
              <span className="hidden sm:inline">RESUME • ABDILA ASY SYAFIQ</span>
              <span className="sm:hidden">RESUME</span>
            </span>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-3 shrink-0">
            <a
              href="/resume.pdf"
              download="ABDILA ASY SYAFIQ-resume.pdf"
              className="px-3 py-1.5 sm:px-3.5 sm:py-1.5 rounded-full bg-[#D8D0BF] text-[#0B0B09] text-xs font-mono font-bold uppercase tracking-wider hover:bg-[#F2EEE5] transition-colors flex items-center space-x-1.5 whitespace-nowrap shrink-0"
            >
              <span>Download PDF</span>
            </a>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 sm:p-2 rounded-full text-[#A7A39A] hover:text-[#F2EEE5] hover:bg-[#2B2A26] transition-colors shrink-0"
              aria-label="Close Resume Preview"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Modal Image Viewer Body (Fits 1 page perfectly without scroll clipping) */}
        <div className="flex-1 min-h-0 p-3 sm:p-5 bg-[#0B0B09] flex items-center justify-center overflow-hidden">
          <a
            href="/images/resume.jpg"
            target="_blank"
            rel="noopener noreferrer"
            title="Click to view full size in new tab"
            className="h-full flex items-center justify-center max-w-full"
          >
            <img
              src="/images/resume.jpg"
              alt="Abdila Asy Syafiq Resume"
              className="max-h-full max-w-full w-auto h-auto object-contain rounded-xl border border-[#2B2A26] shadow-2xl hover:border-[#D8D0BF]/50 transition-all cursor-zoom-in"
            />
          </a>
        </div>
      </div>
    </div>
  );
}
