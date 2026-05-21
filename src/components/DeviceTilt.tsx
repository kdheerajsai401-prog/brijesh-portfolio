import { useEffect, type ReactNode } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

type Props = {
  maxTranslate?: number; // px of travel at full tilt
  sensitivity?: number; // degrees of tilt that maps to maxTranslate
  children: ReactNode;
};

type IOSDeviceOrientation = typeof DeviceOrientationEvent & {
  requestPermission?: () => Promise<'granted' | 'denied'>;
};

// Spring tuned for a smooth, premium glide (not snappy, not floaty).
const SPRING = { stiffness: 70, damping: 18, mass: 0.55 } as const;
// Low-pass factor applied to raw sensor data to remove high-frequency jitter.
const SMOOTHING = 0.16;

export default function DeviceTilt({
  maxTranslate = 30,
  sensitivity = 22,
  children,
}: Props) {
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, SPRING);
  const y = useSpring(rawY, SPRING);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    // Touch devices only — desktop keeps the cursor Magnet.
    if (!window.matchMedia('(pointer: coarse)').matches) return;

    const base = { beta: null as number | null, gamma: null as number | null };
    // Filtered (smoothed) values, advanced toward the target each event.
    const filtered = { x: 0, y: 0 };

    const clamp = (v: number, min: number, max: number) =>
      Math.max(min, Math.min(max, v));

    const handler = (e: DeviceOrientationEvent) => {
      const { beta, gamma } = e;
      if (beta == null || gamma == null) return;

      // Capture neutral holding angle on first reading.
      if (base.beta == null || base.gamma == null) {
        base.beta = beta;
        base.gamma = gamma;
        return;
      }

      const dx = clamp(gamma - base.gamma, -sensitivity, sensitivity);
      const dy = clamp(beta - base.beta, -sensitivity, sensitivity);
      const targetX = (dx / sensitivity) * maxTranslate;
      const targetY = (dy / sensitivity) * maxTranslate;

      // Low-pass filter: ease the raw target to strip sensor noise.
      filtered.x += (targetX - filtered.x) * SMOOTHING;
      filtered.y += (targetY - filtered.y) * SMOOTHING;

      // Feed the spring — Framer Motion drives the DOM on its own rAF loop,
      // no React re-render per sensor tick.
      rawX.set(filtered.x);
      rawY.set(filtered.y);
    };

    const start = () => window.addEventListener('deviceorientation', handler);

    const iOS = DeviceOrientationEvent as IOSDeviceOrientation;
    if (typeof iOS.requestPermission === 'function') {
      // iOS 13+ — permission must be requested from a user gesture.
      const onGesture = async () => {
        try {
          const res = await iOS.requestPermission!();
          if (res === 'granted') start();
        } catch {
          /* denied or unsupported */
        }
        window.removeEventListener('touchend', onGesture);
        window.removeEventListener('click', onGesture);
      };
      window.addEventListener('touchend', onGesture, { once: true });
      window.addEventListener('click', onGesture, { once: true });
      return () => {
        window.removeEventListener('touchend', onGesture);
        window.removeEventListener('click', onGesture);
        window.removeEventListener('deviceorientation', handler);
      };
    }

    start();
    return () => window.removeEventListener('deviceorientation', handler);
  }, [maxTranslate, sensitivity, rawX, rawY]);

  return (
    <motion.div style={{ x, y, willChange: 'transform' }}>{children}</motion.div>
  );
}
