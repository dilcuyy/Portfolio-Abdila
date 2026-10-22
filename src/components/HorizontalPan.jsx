import React, { useRef, useEffect, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function HorizontalPan({
  children,
  onActiveSectionChange,
  frameOverlayRef,
  registerScrollTo,
  isPaused = false,
}) {
  const wrapRef = useRef(null);
  const trackRef = useRef(null);
  const currentSectionRef = useRef('home');
  const pendingTargetScrollRef = useRef(null);
  const pendingTimerRef = useRef(null);

  const getSectionOffsets = useCallback(() => {
    if (!trackRef.current) return [];
    const isMobile = window.innerWidth < 768;
    const panels = Array.from(trackRef.current.querySelectorAll('[data-section-id]'));

    return panels.map((panel) => {
      const id = panel.getAttribute('data-section-id');
      const targetScroll = isMobile
        ? Math.max(0, panel.offsetTop - 56)
        : panel.offsetLeft;
      return { id, scroll: targetScroll };
    });
  }, []);

  // Programmatic ScrollTo Handler: adaptive for desktop horizontal or mobile vertical
  const scrollToSection = useCallback((sectionId) => {
    if (!trackRef.current) return;
    const isMobile = window.innerWidth < 768;
    const targetPanel = trackRef.current.querySelector(`[data-section-id="${sectionId}"]`);
    if (!targetPanel) return;

    currentSectionRef.current = sectionId;
    if (onActiveSectionChange) {
      onActiveSectionChange(sectionId);
    }

    if (isMobile) {
      const targetTop = Math.max(0, targetPanel.offsetTop - 56);
      window.scrollTo({
        top: targetTop,
        behavior: 'smooth',
      });
    } else {
      const targetScroll = targetPanel.offsetLeft;
      const scrollObj = { y: window.scrollY };
      gsap.killTweensOf(scrollObj);
      gsap.to(scrollObj, {
        y: targetScroll,
        duration: 0.45,
        ease: 'power2.out',
        onUpdate: () => {
          window.scrollTo(0, scrollObj.y);
        },
        overwrite: 'auto',
      });
    }
  }, [onActiveSectionChange]);

  const goToNext = useCallback(() => {
    if (!trackRef.current) return;
    const panels = Array.from(trackRef.current.querySelectorAll('[data-section-id]'));
    if (!panels.length) return;

    const isMobile = window.innerWidth < 768;
    const currentPos = isMobile ? window.scrollY + 60 : window.scrollY;

    const nextPanel = panels.find((p) => {
      const pos = isMobile ? p.offsetTop - 56 : p.offsetLeft;
      return pos > currentPos + 25;
    });

    if (nextPanel) {
      scrollToSection(nextPanel.getAttribute('data-section-id'));
    } else {
      scrollToSection(panels[0].getAttribute('data-section-id'));
    }
  }, [scrollToSection]);

  const goToPrev = useCallback(() => {
    if (!trackRef.current) return;
    const panels = Array.from(trackRef.current.querySelectorAll('[data-section-id]'));
    if (!panels.length) return;

    const isMobile = window.innerWidth < 768;
    const currentPos = isMobile ? window.scrollY : window.scrollY;

    const prevPanel = [...panels].reverse().find((p) => {
      const pos = isMobile ? p.offsetTop - 56 : p.offsetLeft;
      return pos < currentPos - 25;
    });

    if (prevPanel) {
      scrollToSection(prevPanel.getAttribute('data-section-id'));
    } else {
      scrollToSection(panels[0].getAttribute('data-section-id'));
    }
  }, [scrollToSection]);

  useEffect(() => {
    if (!wrapRef.current || !trackRef.current) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;

    const mm = gsap.matchMedia();

    // DESKTOP: (min-width: 768px) - Editorial horizontal pan with ScrollTrigger pin & scrub
    mm.add('(min-width: 768px)', () => {
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
          scrub: 0.05, // Ultra-responsif instan tanpa lag
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
    });

    // MOBILE: (max-width: 767px) - Fluid natural vertical scroll
    mm.add('(max-width: 767px)', () => {
      gsap.set(trackRef.current, { clearProps: 'x' });

      const handleMobileScroll = () => {
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? window.scrollY / docHeight : 0;

        if (frameOverlayRef && frameOverlayRef.current) {
          frameOverlayRef.current.updateProgress(progress);
        }

        if (!trackRef.current) return;
        const panels = trackRef.current.querySelectorAll('[data-section-id]');
        const viewportCheck = window.scrollY + window.innerHeight * 0.35;

        let activeId = 'home';
        panels.forEach((panel) => {
          const top = panel.offsetTop;
          const height = panel.offsetHeight;
          if (viewportCheck >= top && viewportCheck < top + height) {
            activeId = panel.getAttribute('data-section-id');
          }
        });

        if (activeId !== currentSectionRef.current) {
          currentSectionRef.current = activeId;
          if (onActiveSectionChange) {
            onActiveSectionChange(activeId);
          }
        }
      };

      window.addEventListener('scroll', handleMobileScroll, { passive: true });
      handleMobileScroll();

      return () => {
        window.removeEventListener('scroll', handleMobileScroll);
      };
    });

    // KEYBOARD SHORTCUTS: Enter / Arrow keys to navigate sections
    const handleKeyDown = (e) => {
      if (isPaused) return;
      const target = e.target;
      if (
        target.isContentEditable ||
        ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName)
      ) {
        return;
      }

      if (e.key === 'Enter' || e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault();
        goToNext();
      } else if (
        e.key === 'ArrowLeft' ||
        e.key === 'ArrowUp' ||
        e.key === 'PageUp' ||
        (e.key === 'Enter' && e.shiftKey)
      ) {
        e.preventDefault();
        goToPrev();
      }
    };

    // HORIZONTAL WHEEL / TRACKPAD: Pan horizontally with mouse wheel or trackpad
    const handleWheel = (e) => {
      if (isPaused) return;
      if (window.innerWidth < 768) return;

      e.preventDefault();
      const rawDelta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      const delta = rawDelta * 2.2;
      window.scrollBy({ top: delta, behavior: 'auto' });
    };

    // POINTER DRAG & TOUCH SWIPE: Horizontal drag-to-scroll & mobile swipe
    let isDown = false;
    let startX = 0;
    let startY = 0;
    let lastX = 0;
    let isDragging = false;
    let didMoveSignificantly = false;

    const handlePointerDown = (e) => {
      if (isPaused) return;
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      if (e.target.closest('[data-no-pan]')) return;

      isDown = true;
      startX = e.clientX;
      startY = e.clientY;
      lastX = e.clientX;
      isDragging = false;
      didMoveSignificantly = false;
    };

    const handlePointerMove = (e) => {
      if (!isDown) return;
      const totalDx = e.clientX - startX;
      const totalDy = e.clientY - startY;
      const stepDx = e.clientX - lastX;

      if (!isDragging) {
        if (Math.abs(totalDx) > 8 && Math.abs(totalDx) > Math.abs(totalDy)) {
          isDragging = true;
        }
      }

      if (isDragging) {
        didMoveSignificantly = true;
        lastX = e.clientX;
        if (window.innerWidth >= 768) {
          window.scrollBy({ top: -stepDx * 2 });
          if (trackRef.current) {
            trackRef.current.style.cursor = 'grabbing';
          }
        }
      }
    };

    const handlePointerUp = (e) => {
      if (!isDown) return;
      const totalDx = e.clientX - startX;
      const totalDy = e.clientY - startY;

      isDown = false;
      isDragging = false;
      if (trackRef.current) {
        trackRef.current.style.cursor = '';
      }

      if (Math.abs(totalDx) > 60 && Math.abs(totalDx) > Math.abs(totalDy)) {
        if (totalDx < 0) {
          goToNext();
        } else {
          goToPrev();
        }
      } else if (didMoveSignificantly) {
        const captureClick = (ev) => {
          ev.preventDefault();
          ev.stopPropagation();
          window.removeEventListener('click', captureClick, true);
        };
        window.addEventListener('click', captureClick, true);
      }
    };

    const handlePointerCancel = () => {
      isDown = false;
      isDragging = false;
      if (trackRef.current) {
        trackRef.current.style.cursor = '';
      }
    };

    const wrapEl = wrapRef.current;
    if (wrapEl) {
      wrapEl.addEventListener('pointerdown', handlePointerDown);
    }
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    window.addEventListener('pointercancel', handlePointerCancel);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('wheel', handleWheel);
      if (wrapEl) {
        wrapEl.removeEventListener('pointerdown', handlePointerDown);
      }
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('pointercancel', handlePointerCancel);
      mm.revert();
    };
  }, [onActiveSectionChange, frameOverlayRef, isPaused, goToNext, goToPrev]);

  useEffect(() => {
    if (registerScrollTo) {
      registerScrollTo(scrollToSection, goToNext, goToPrev);
    }
  }, [registerScrollTo, scrollToSection, goToNext, goToPrev]);

  return (
    <div ref={wrapRef} className="relative w-full overflow-hidden min-h-[100dvh]">
      <div
        ref={trackRef}
        className="flex flex-col md:flex-row md:flex-nowrap w-full md:w-max h-auto md:h-[100dvh] md:items-center will-change-transform cursor-grab select-none"
      >
        {children}
      </div>
    </div>
  );
}
