import { useRef, useMemo } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';

type Props = {
  text: string;
  className?: string;
  style?: React.CSSProperties;
};

function Char({
  char,
  progress,
  start,
  end,
}: {
  char: string;
  progress: MotionValue<number>;
  start: number;
  end: number;
}) {
  const opacity = useTransform(progress, [start, end], [0.2, 1]);
  return <motion.span style={{ opacity }}>{char}</motion.span>;
}

export default function AnimatedText({ text, className, style }: Props) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'end 0.2'],
  });

  const reducedMotion = useMemo(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    [],
  );

  const tokens = useMemo(() => text.split(/(\s+)/), [text]);
  const charCount = text.length;

  let charIndex = 0;

  return (
    <p ref={ref} className={className} style={style}>
      {tokens.map((token, ti) => {
        if (/^\s+$/.test(token)) {
          return (
            <span key={`s-${ti}`} style={{ whiteSpace: 'pre' }}>
              {token}
            </span>
          );
        }
        // Word — wrap in nowrap container so word never breaks mid-char
        if (reducedMotion) {
          const start = charIndex / charCount;
          const end = (charIndex + token.length) / charCount;
          charIndex += token.length;
          return (
            <Char
              key={`w-${ti}`}
              char={token}
              progress={scrollYProgress}
              start={start}
              end={end}
            />
          );
        }
        const chars = Array.from(token);
        const startIndex = charIndex;
        charIndex += token.length;
        return (
          <span
            key={`w-${ti}`}
            style={{ display: 'inline-block', whiteSpace: 'nowrap' }}
          >
            {chars.map((c, ci) => {
              const idx = startIndex + ci;
              const start = idx / charCount;
              const end = (idx + 1) / charCount;
              return (
                <Char
                  key={ci}
                  char={c}
                  progress={scrollYProgress}
                  start={start}
                  end={end}
                />
              );
            })}
          </span>
        );
      })}
    </p>
  );
}
