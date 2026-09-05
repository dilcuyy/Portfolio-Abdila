import React, { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
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

    const updatePosition = () => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      }
    };

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!rafId) {
        rafId = requestAnimationFrame(() => {
          updatePosition();
          rafId = null;
        });
      }
    };

    const handleMouseOver = (e) => {
      const target = e.target.closest('a, button, [data-cursor], input, textarea, select');
      if (target) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const handleMouseDown = () => setIsMouseDown(true);
    const handleMouseUp = () => setIsMouseDown(false);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });
    window.addEventListener('mouseup', handleMouseUp, { passive: true });

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      document.body.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  if (isTouchDevice) return null;

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-[100000] hidden lg:block"
      style={{ transform: 'translate3d(-100px, -100px, 0) translate(-50%, -50%)' }}
    >
      <div
        className={`rounded-full transition-all duration-200 ease-out flex items-center justify-center ${
          isMouseDown
            ? 'w-6 h-6 bg-[#D8D0BF] border border-[#F2EEE5] scale-90 opacity-90'
            : isHovered
            ? 'w-7 h-7 bg-[#F2EEE5]/30 border border-[#F2EEE5] backdrop-blur-[1px]'
            : 'w-4 h-4 bg-[#F2EEE5] border border-[#F2EEE5]/40'
        }`}
      />
    </div>
  );
}
