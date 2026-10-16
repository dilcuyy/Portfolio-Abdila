import React, { useRef, useEffect, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function HorizontalPan({
  children,
  onActiveSectionChange,
  frameOverlayRef,
  registerScrollTo,
}) {
  const wrapRef = useRef(null);
  const trackRef = useRef(null);
  const currentSectionRef = useRef('home');

  useEffect(() => {
    if (!wrapRef.current || !trackRef.current) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;

    const ctx = gsap.context(() => {
      const getScrollDistance = () => {
        if (!trackRef.current) return 0;
        const lastChild = trackRef.current.lastElementChild;
        if (lastChild) {
          return lastChild.offsetLeft;
        }
        return Math.max(0, trackRef.current.scrollWidth - window.innerWidth);
      };

      gsap.to(trackRef.current, {
        x: () => -getScrollDistance(),
        ease: 'none',
        scrollTrigger: {
          trigger: wrapRef.current,
          start: 'top top',
          end: () => `+=${getScrollDistance()}`,
          pin: true,
          scrub: 1, // Ultra smooth 1s scrub interpolation
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            // 1. Direct DOM update for vertical progress bar in FrameOverlay
            if (frameOverlayRef && frameOverlayRef.current) {
              frameOverlayRef.current.updateProgress(self.progress);
            }

            // 2. Active section detection based on current horizontal transform
            if (!trackRef.current) return;
            const panels = trackRef.current.querySelectorAll('[data-section-id]');
            const currentX = Math.abs(gsap.getProperty(trackRef.current, 'x') || 0);

            let closestSection = 'home';
            let minDistance = Infinity;

            panels.forEach((panel) => {
              const sectionId = panel.getAttribute('data-section-id');
              const distance = Math.abs(panel.offsetLeft - currentX);
              if (distance < minDistance) {
                minDistance = distance;
                closestSection = sectionId;
              }
            });

            if (closestSection !== currentSectionRef.current) {
              currentSectionRef.current = closestSection;
              if (onActiveSectionChange) {
                onActiveSectionChange(closestSection);
              }
            }
          },
        },
      });

      // Force recalculation after DOM layout settles
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 200);
    }, wrapRef);

    return () => ctx.revert();
  }, [onActiveSectionChange, frameOverlayRef]);

  // Programmatic ScrollTo Handler using native window scroll position
  const scrollToSection = useCallback((sectionId) => {
    if (!trackRef.current) return;
    const targetPanel = trackRef.current.querySelector(`[data-section-id="${sectionId}"]`);
    if (targetPanel) {
      const targetX = targetPanel.offsetLeft;
      const lastChild = trackRef.current.lastElementChild;
      const totalDist = lastChild ? lastChild.offsetLeft : Math.max(0, trackRef.current.scrollWidth - window.innerWidth);
      const progress = totalDist > 0 ? targetX / totalDist : 0;
      const totalScrollHeight = document.documentElement.scrollHeight - window.innerHeight;

      window.scrollTo({
        top: progress * totalScrollHeight,
        behavior: 'smooth',
      });
    }
  }, []);

  useEffect(() => {
    if (registerScrollTo) {
      registerScrollTo(scrollToSection);
    }
  }, [registerScrollTo, scrollToSection]);

  return (
    <div ref={wrapRef} className="relative w-full overflow-hidden min-h-[100dvh]">
      <div
        ref={trackRef}
        className="flex flex-row flex-nowrap h-[100dvh] w-max items-center will-change-transform"
      >
        {children}
      </div>
    </div>
  );
}
