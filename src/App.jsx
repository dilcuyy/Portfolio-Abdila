import React, { useState, useRef, useCallback } from 'react';
import Preloader from './components/Preloader';
import FrameOverlay from './components/FrameOverlay';
import EditorialMenuModal from './components/EditorialMenuModal';
import HorizontalPan from './components/HorizontalPan';
import Hero from './components/Hero';
import About from './components/About';
import Education from './components/Education';
import Certificates from './components/Certificates';
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
  const nextSectionRef = useRef(null);
  const prevSectionRef = useRef(null);

  const handleRegisterScrollTo = useCallback((fn, nextFn, prevFn) => {
    scrollToSectionRef.current = fn;
    if (nextFn) nextSectionRef.current = nextFn;
    if (prevFn) prevSectionRef.current = prevFn;
  }, []);

  const handleSelectSection = useCallback((sectionId) => {
    if (scrollToSectionRef.current) {
      scrollToSectionRef.current(sectionId);
    }
  }, []);

  const handleNextSection = useCallback(() => {
    if (nextSectionRef.current) {
      nextSectionRef.current();
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
          onNextSection={handleNextSection}
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
          isPaused={isMenuOpen || isResumeOpen}
        >
          <Hero
            onOpenResume={() => setIsResumeOpen(true)}
            onExploreWork={() => handleSelectSection('projects')}
          />
          <About />
          <Education />
          <Certificates />
          <Gallery />
          <Contact onScrollToTop={() => handleSelectSection('home')} />
        </HorizontalPan>

        {/* Resume Lightbox Modal */}
        <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
      </div>
    </>
  );
}
