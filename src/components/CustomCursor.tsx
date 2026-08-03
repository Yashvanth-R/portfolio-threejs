import React, { useEffect, useRef, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const motionRef = useRef({
    targetX: -100,
    targetY: -100,
    currentX: -100,
    currentY: -100,
    visible: false,
    hovered: false,
    clicking: false,
  });

  useEffect(() => {
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    if (isTouchDevice) return;

    setIsEnabled(true);

    const outer = outerRef.current;
    const inner = innerRef.current;
    if (!outer || !inner) return;

    const setCursorClasses = () => {
      const { hovered, clicking, visible, currentX, currentY } = motionRef.current;
      const isHovering = hovered;
      const isClicking = clicking;
      const targetX = motionRef.current.targetX;
      const targetY = motionRef.current.targetY;

      motionRef.current.currentX += (targetX - motionRef.current.currentX) * 0.22;
      motionRef.current.currentY += (targetY - motionRef.current.currentY) * 0.22;

      const x = motionRef.current.currentX;
      const y = motionRef.current.currentY;
      const offset = isHovering ? 24 : 18;
      const dotOffset = isHovering ? 5 : 4;

      outer.style.transform = `translate3d(${x - offset}px, ${y - offset}px, 0)`;
      inner.style.transform = `translate3d(${targetX - dotOffset}px, ${targetY - dotOffset}px, 0)`;
      outer.style.opacity = visible ? '1' : '0';
      inner.style.opacity = visible ? '1' : '0';

      outer.className = `fixed top-0 left-0 rounded-full border transition-transform duration-75 ease-out ${
        isHovering
          ? 'w-12 h-12 border-amber-400/80 bg-amber-400/10 scale-125 shadow-[0_0_15px_rgba(245,158,11,0.4)]'
          : isClicking
          ? 'w-8 h-8 border-cyan-400 bg-cyan-400/20 scale-90'
          : 'w-9 h-9 border-amber-400/50 bg-slate-900/10'
      }`;

      inner.className = `fixed top-0 left-0 rounded-full transition-all duration-100 ease-out ${
        isHovering
          ? 'w-2.5 h-2.5 bg-amber-300 shadow-[0_0_10px_#f59e0b]'
          : isClicking
          ? 'w-3 h-3 bg-cyan-300 shadow-[0_0_12px_#22d3ee]'
          : 'w-2 h-2 bg-amber-400'
      }`;

      animationFrameRef.current = window.requestAnimationFrame(setCursorClasses);
    };

    const handleMouseMove = (event: MouseEvent) => {
      motionRef.current.targetX = event.clientX;
      motionRef.current.targetY = event.clientY;
      motionRef.current.visible = true;

      const target = event.target as HTMLElement | null;
      if (target) {
        motionRef.current.hovered = Boolean(
          target.closest('a, button, input, textarea, select, [role="button"], canvas, .interactive')
        );
      }
    };

    const handleMouseDown = () => {
      motionRef.current.clicking = true;
    };

    const handleMouseUp = () => {
      motionRef.current.clicking = false;
    };

    const handleMouseLeave = () => {
      motionRef.current.visible = false;
      motionRef.current.hovered = false;
    };

    const handleMouseEnter = () => {
      motionRef.current.visible = true;
    };

    document.body.style.cursor = 'none';

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('blur', handleMouseLeave);

    animationFrameRef.current = window.requestAnimationFrame(setCursorClasses);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('blur', handleMouseLeave);
      document.body.style.cursor = '';
      if (animationFrameRef.current) {
        window.cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  if (!isEnabled) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      <div ref={outerRef} className="fixed top-0 left-0 rounded-full border" />
      <div ref={innerRef} className="fixed top-0 left-0 rounded-full" />
    </div>
  );
};
