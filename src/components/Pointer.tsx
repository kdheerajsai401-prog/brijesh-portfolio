import { useEffect, useRef, useState, type ReactNode } from 'react';
import {
  AnimatePresence,
  motion,
  useMotionValue,
  type HTMLMotionProps,
} from 'framer-motion';

type PointerProps = HTMLMotionProps<'div'> & {
  children?: ReactNode;
};

export function Pointer({ className, style, children, ...props }: PointerProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const [isActive, setIsActive] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    // No custom cursor on touch devices.
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const parent = containerRef.current?.parentElement ?? null;
    if (!parent) return;

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setIsActive(true);
    };
    const onEnter = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setIsActive(true);
    };
    const onLeave = () => setIsActive(false);

    parent.style.cursor = 'none';
    parent.addEventListener('mousemove', onMove);
    parent.addEventListener('mouseenter', onEnter);
    parent.addEventListener('mouseleave', onLeave);

    return () => {
      parent.style.cursor = '';
      parent.removeEventListener('mousemove', onMove);
      parent.removeEventListener('mouseenter', onEnter);
      parent.removeEventListener('mouseleave', onLeave);
    };
  }, [x, y]);

  return (
    <>
      <div ref={containerRef} />
      <AnimatePresence>
        {isActive && (
          <motion.div
            className="pointer-events-none fixed z-[60]"
            style={{ top: y, left: x, ...style }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 500, damping: 28 }}
            {...props}
          >
            {/* Inner wrapper centers the glyph on the cursor without
                colliding with the parent's scale animation transform. */}
            <div style={{ transform: 'translate(-50%, -50%)' }}>
              {children || (
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="1"
                  viewBox="0 0 16 16"
                  height="26"
                  width="26"
                  xmlns="http://www.w3.org/2000/svg"
                  className={`-rotate-[70deg] stroke-white text-black drop-shadow-[0_2px_6px_rgba(0,0,0,0.45)] ${className ?? ''}`}
                >
                  <path d="M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916l12.728-5.657a.5.5 0 0 1 .556.103z" />
                </svg>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Pointer;
