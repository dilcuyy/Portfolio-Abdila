import React, { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const containerRef = useRef(null);
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  const [isHovered, setIsHovered] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    if (
      window.matchMedia('(pointer: coarse)').matches ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      setIsTouchDevice(true);
      return;
    }

    document.body.classList.add('custom-cursor-active');

    let rafId = null;
    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let hasMoved = false;

    const render = () => {
      ringX += (mouseX - ringX) * 0.35;
      ringY += (mouseY - ringY) * 0.35;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      }

      const dx = Math.abs(mouseX - ringX);
      const dy = Math.abs(mouseY - ringY);

      if (dx > 0.05 || dy > 0.05) {
        rafId = requestAnimationFrame(render);
      } else {
        ringX = mouseX;
        ringY = mouseY;
        if (ringRef.current) {
          ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
        }
        rafId = null;
      }
    };

    const startRaf = () => {
      if (!rafId) {
        rafId = requestAnimationFrame(render);
      }
    };

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!hasMoved) {
        hasMoved = true;
        ringX = mouseX;
        ringY = mouseY;
        if (containerRef.current) {
          containerRef.current.style.opacity = '1';
        }
      }

      startRaf();
    };

    const handleMouseDown = () => {
      setIsMouseDown(true);
      ringX += (mouseX - ringX) * 0.7;
      ringY += (mouseY - ringY) * 0.7;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      }
      startRaf();
    };

    const handleMouseUp = () => {
      setIsMouseDown(false);
      startRaf();
    };

    const handleMouseOver = (e) => {
      const target = e.target.closest('a, button, [data-cursor], input, textarea, select, [role="button"], label');
      setIsHovered(!!target);
    };

    const handleMouseLeave = () => {
      if (containerRef.current) {
        containerRef.current.style.opacity = '0';
      }
    };

    const handleMouseEnter = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      ringX = e.clientX;
      ringY = e.clientY;
      if (containerRef.current) {
        containerRef.current.style.opacity = '1';
      }
      startRaf();
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });
    window.addEventListener('mouseup', handleMouseUp, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave, { passive: true });
    document.addEventListener('mouseenter', handleMouseEnter, { passive: true });

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      document.body.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, []);

  if (isTouchDevice) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-[100000] hidden lg:block transition-opacity duration-300 opacity-0"
    >
      <div
        ref={dotRef}
        className="absolute top-0 left-0 pointer-events-none will-change-transform"
      >
        <div
          className={`-translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-150 ease-out ${
            isMouseDown
              ? 'w-1.5 h-1.5 bg-[#F2EEE5]'
              : isHovered
              ? 'w-1.5 h-1.5 bg-[#D8D0BF]'
              : 'w-2 h-2 bg-[#F2EEE5]'
          }`}
        />
      </div>

      <div
        ref={ringRef}
        className="absolute top-0 left-0 pointer-events-none will-change-transform"
      >
        <div
          className={`-translate-x-1/2 -translate-y-1/2 rounded-full border flex items-center justify-center transition-all duration-150 ease-out ${
            isMouseDown
              ? 'w-5 h-5 border-[#F2EEE5] bg-white/20 scale-75'
              : isHovered
              ? 'w-12 h-12 border-[#D8D0BF]/80 bg-[#D8D0BF]/10 shadow-[0_0_16px_rgba(216,208,191,0.25)] scale-100'
              : 'w-8 h-8 border-[#F2EEE5]/40 bg-transparent scale-100'
          }`}
        />
      </div>
    </div>
  );
}
