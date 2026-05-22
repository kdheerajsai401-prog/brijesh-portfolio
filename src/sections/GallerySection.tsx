import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import FadeIn from '../components/FadeIn';

const U = (id: string) =>
  `https://images.unsplash.com/photo-${id}?w=900&h=1200&fit=crop&q=85`;

type Shot = { src: string; label: string };

const GALLERY: Shot[] = [
  { src: U('1519741497674-611481863552'), label: 'Weddings' },
  { src: U('1494790108377-be9c29b29330'), label: 'Portraits' },
  { src: U('1483985988355-763728e1935b'), label: 'Fashion' },
  { src: U('1493225457124-a3eb161ffa5f'), label: 'Events' },
  { src: U('1606216794074-735e91aa2c92'), label: 'Bridal' },
  { src: U('1487412720507-e7ab37603c6f'), label: 'Editorial' },
  { src: U('1488646953014-85cb44e25828'), label: 'Travel' },
];

export default function GallerySection() {
  const [active, setActive] = useState(3);

  return (
    <section
      id="work"
      className="px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-28"
      style={{ background: '#0C0C0C' }}
    >
      <FadeIn y={40}>
        <h2
          className="hero-heading font-black uppercase tracking-tight text-center mb-12 sm:mb-16 md:mb-20"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)', lineHeight: 1 }}
        >
          Work
        </h2>
      </FadeIn>

      <FadeIn delay={0.1} y={30}>
        <div className="flex w-full max-w-6xl mx-auto gap-1.5 sm:gap-2 h-[20rem] sm:h-[26rem] md:h-[30rem]">
          {GALLERY.map((shot, i) => (
            <motion.div
              key={shot.label}
              className="relative cursor-pointer overflow-hidden rounded-2xl sm:rounded-3xl min-w-0"
              style={{ flexBasis: 0 }}
              animate={{ flexGrow: active === i ? 8 : 1 }}
              transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
              onClick={() => setActive(i)}
              onHoverStart={() => setActive(i)}
            >
              <img
                src={shot.src}
                alt={shot.label}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover select-none"
                draggable={false}
              />
              <AnimatePresence>
                {active === i && (
                  <motion.div
                    key="overlay"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"
                  />
                )}
              </AnimatePresence>
              <AnimatePresence>
                {active === i && (
                  <motion.div
                    key="label"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 12 }}
                    transition={{ duration: 0.3, delay: 0.05 }}
                    className="absolute inset-0 flex flex-col items-start justify-end p-4 sm:p-6"
                  >
                    <span
                      className="text-white font-medium uppercase tracking-widest whitespace-nowrap"
                      style={{ fontSize: 'clamp(0.9rem, 1.6vw, 1.5rem)' }}
                    >
                      {shot.label}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </FadeIn>
    </section>
  );
}
