import { useEffect, useRef, useState, type ReactNode } from 'react';

type Props = {
  maxTranslate?: number; // px of travel at full tilt
  sensitivity?: number; // degrees of tilt that maps to maxTranslate
  children: ReactNode;
};

type IOSDeviceOrientation = typeof DeviceOrientationEvent & {
  requestPermission?: () => Promise<'granted' | 'denied'>;
};

export default function DeviceTilt({
  maxTranslate = 28,
  sensitivity = 25,
  children,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState('translate3d(0px, 0px, 0px)');

  useEffect(() => {
    if (typeof window === 'undefined') return;
    // Only on touch devices — desktop keeps the cursor Magnet.
    if (!window.matchMedia('(pointer: coarse)').matches) return;

    const base = { beta: null as number | null, gamma: null as number | null };

    const clamp = (v: number, min: number, max: number) =>
      Math.max(min, Math.min(max, v));

    const handler = (e: DeviceOrientationEvent) => {
      const beta = e.beta;
      const gamma = e.gamma;
      if (beta == null || gamma == null) return;

      // Capture neutral holding angle on first reading.
      if (base.beta == null || base.gamma == null) {
        base.beta = beta;
        base.gamma = gamma;
        return;
      }

      const dx = clamp(gamma - base.gamma, -sensitivity, sensitivity);
      const dy = clamp(beta - base.beta, -sensitivity, sensitivity);
      const x = (dx / sensitivity) * maxTranslate;
      const y = (dy / sensitivity) * maxTranslate;
      setTransform(`translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0px)`);
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
          /* user denied or unsupported */
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

    // Android / other — no explicit permission gesture needed.
    start();
    return () => window.removeEventListener('deviceorientation', handler);
  }, [maxTranslate, sensitivity]);

  return (
    <div
      ref={ref}
      style={{
        transform,
        transition: 'transform 0.18s ease-out',
        willChange: 'transform',
      }}
    >
      {children}
    </div>
  );
}
