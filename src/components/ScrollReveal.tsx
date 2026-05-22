import { useMemo, useRef } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';

type Props = {
  children: string;
  enableBlur?: boolean;
  baseOpacity?: number;
  baseRotation?: number;
  blurStrength?: number;
  containerClassName?: string;
  textClassName?: string;
  textStyle?: React.CSSProperties;
};

function Word({
  word,
  progress,
  start,
  end,
  enableBlur,
  baseOpacity,
  blurStrength,
}: {
  word: string;
  progress: MotionValue<number>;
  start: number;
  end: number;
  enableBlur: boolean;
  baseOpacity: number;
  blurStrength: number;
}) {
  const opacity = useTransform(progress, [start, end], [baseOpacity, 1]);
  const blurPx = useTransform(progress, [start, end], [blurStrength, 0]);
  const filter = useTransform(blurPx, (b) =>
    enableBlur ? `blur(${b.toFixed(2)}px)` : 'none',
  );

  return (
    <motion.span
      style={{
        display: 'inline-block',
        opacity,
        filter,
        willChange: 'opacity, filter',
      }}
    >
      {word}
    </motion.span>
  );
}

export default function ScrollReveal({
  children,
  enableBlur = true,
  baseOpacity = 0.1,
  baseRotation = 3,
  blurStrength = 4,
  containerClassName = '',
  textClassName = '',
  textStyle,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.85', 'end 0.45'],
  });
  const rotate = useTransform(scrollYProgress, [0, 1], [baseRotation, 0]);

  const tokens = useMemo(() => children.split(/(\s+)/), [children]);
  const wordCount = useMemo(
    () => tokens.filter((t) => !/^\s+$/.test(t)).length,
    [tokens],
  );

  let wi = 0;
  return (
    <motion.div
      ref={ref}
      className={containerClassName}
      style={{ rotate, transformOrigin: 'center' }}
    >
      <p className={textClassName} style={textStyle}>
        {tokens.map((token, i) => {
          if (/^\s+$/.test(token)) {
            return (
              <span key={i} style={{ whiteSpace: 'pre' }}>
                {token}
              </span>
            );
          }
          const k = wi++;
          const start = k / wordCount;
          const end = (k + 1) / wordCount;
          return (
            <Word
              key={i}
              word={token}
              progress={scrollYProgress}
              start={start}
              end={end}
              enableBlur={enableBlur}
              baseOpacity={baseOpacity}
              blurStrength={blurStrength}
            />
          );
        })}
      </p>
    </motion.div>
  );
}
