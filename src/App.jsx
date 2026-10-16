import React, { useState, useRef, useCallback } from 'react';
import Preloader from './components/Preloader';
import FrameOverlay from './components/FrameOverlay';
import EditorialMenuModal from './components/EditorialMenuModal';
import HorizontalPan from './components/HorizontalPan';
import Hero from './components/Hero';
import About from './components/About';
import Education from './components/Education';
import Skills from './components/Skills';
import Gallery from './components/Gallery';
import Contact from './components/Contact';
import ResumeModal from './components/ResumeModal';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  const frameOverlayRef = useRef(null);
  const scrollToSectionRef = useRef(null);

  const handleRegisterScrollTo = useCallback((fn) => {
    scrollToSectionRef.current = fn;
  }, []);

  const handleSelectSection = useCallback((sectionId) => {
    if (scrollToSectionRef.current) {
      scrollToSectionRef.current(sectionId);
    }
  }, []);

  return (
    <>
      {loading && <Preloader onComplete={() => setLoading(false)} />}

      <div className="bg-[#0B0B09] text-[#F2EEE5] relative w-full min-h-screen overflow-x-hidden select-none">
        {/* Subtle Grain Texture */}
        <div className="editorial-grain" />

        {/* Outer Editorial Frame Overlay (Fixed Frame inspired by khanhnguyen.design) */}
        <FrameOverlay
          ref={frameOverlayRef}
          activeSection={activeSection}
          onOpenMenu={() => setIsMenuOpen(true)}
        />

        {/* Fullscreen Editorial Navigation Menu */}
        <EditorialMenuModal
          isOpen={isMenuOpen}
          onClose={() => setIsMenuOpen(false)}
          activeSection={activeSection}
          onSelectSection={handleSelectSection}
        />

        {/* Main Horizontal Track Container with Direct Ref Performance Optimization */}
        <HorizontalPan
          onActiveSectionChange={setActiveSection}
          frameOverlayRef={frameOverlayRef}
          registerScrollTo={handleRegisterScrollTo}
        >
          <Hero
            onOpenResume={() => setIsResumeOpen(true)}
            onExploreWork={() => handleSelectSection('projects')}
          />
          <About />
          <Education />
          <Skills />
          <Gallery />
          <Contact onScrollToTop={() => handleSelectSection('home')} />
        </HorizontalPan>

        {/* Resume Lightbox Modal */}
        <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
      </div>
    </>
  );
}
