import React, { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Check if touch device or reduced motion preference
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

    const render = () => {
      // Silky spring lerp following for outer ring
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      }

      const dx = Math.abs(mouseX - ringX);
      const dy = Math.abs(mouseY - ringY);
      if (dx > 0.1 || dy > 0.1) {
        rafId = requestAnimationFrame(render);
      } else {
        rafId = null;
      }
    };

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      setIsVisible(true);

      if (!rafId) {
        rafId = requestAnimationFrame(render);
      }
    };

    const handleMouseOver = (e) => {
      const target = e.target.closest('a, button, [data-cursor], input, textarea, select, [role="button"]');
      setIsHovered(!!target);
    };

    const handleMouseDown = () => setIsMouseDown(true);
    const handleMouseUp = () => setIsMouseDown(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

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
      className={`fixed top-0 left-0 pointer-events-none z-[100000] hidden lg:block transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* 1. Instant Precision Pinpoint Dot */}
      <div
        ref={dotRef}
        className={`absolute top-0 left-0 rounded-full transition-[width,height,background-color] duration-150 ${
          isHovered ? 'w-1.5 h-1.5 bg-[#D8D0BF]' : 'w-2 h-2 bg-[#F2EEE5]'
        }`}
        style={{ transform: 'translate3d(-100px, -100px, 0) translate(-50%, -50%)' }}
      />

      {/* 2. Fluid Smooth Trailing Ring */}
      <div
        ref={ringRef}
        className={`absolute top-0 left-0 rounded-full border transition-[width,height,border-color,background-color,transform] duration-200 ease-out flex items-center justify-center ${
          isMouseDown
            ? 'w-6 h-6 border-[#F2EEE5] bg-white/[0.12] scale-90'
            : isHovered
            ? 'w-11 h-11 border-[#D8D0BF]/70 bg-[#D8D0BF]/10 backdrop-blur-[1px] shadow-[0_0_15px_rgba(216,208,191,0.2)]'
            : 'w-7 h-7 border-white/30 bg-transparent'
        }`}
        style={{ transform: 'translate3d(-100px, -100px, 0) translate(-50%, -50%)' }}
      />
    </div>
  );
}
