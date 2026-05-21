import { useEffect, useRef, useState } from 'react';

const UNSPLASH = (id: string) =>
  `https://images.unsplash.com/photo-${id}?w=840&h=540&fit=crop&q=85`;

const ALL_GIFS = [
  // Row 1 (11): wedding + portrait + travel
  UNSPLASH('1519741497674-611481863552'), // wedding couple
  UNSPLASH('1494790108377-be9c29b29330'), // woman portrait
  UNSPLASH('1519225421980-715cb0215aed'), // wedding ceremony
  UNSPLASH('1606216794074-735e91aa2c92'), // bride
  UNSPLASH('1492562080023-ab3db95bfbce'), // moody portrait
  UNSPLASH('1485827404703-89b55fcc595e'), // studio portrait
  UNSPLASH('1517457373958-b7bdd4587205'), // bride flowers
  UNSPLASH('1542038784456-1ea8e935640e'), // groom
  UNSPLASH('1583939003579-730e3918a45a'), // bridal closeup
  UNSPLASH('1488646953014-85cb44e25828'), // travel landscape
  UNSPLASH('1469854523086-cc02fe5d8800'), // travel scenery
  // Row 2 (10): event + fashion + product/brand
  UNSPLASH('1493225457124-a3eb161ffa5f'), // concert
  UNSPLASH('1429962714451-bb934ecdc4ec'), // event crowd
  UNSPLASH('1483985988355-763728e1935b'), // fashion editorial
  UNSPLASH('1487412720507-e7ab37603c6f'), // fashion model
  UNSPLASH('1469334031218-e382a71b716b'), // fashion shoot
  UNSPLASH('1542291026-7eec264c27ff'),    // red sneakers
  UNSPLASH('1523275335684-37898b6baf30'), // watch product
  UNSPLASH('1505740420928-5e560c06d30e'), // headphones
  UNSPLASH('1551269901-5c5e14c25df7'),    // perfume product
  UNSPLASH('1521334884684-d80222895322'), // product flatlay
];

const ROW_1 = ALL_GIFS.slice(0, 11);
const ROW_2 = ALL_GIFS.slice(11);

const ROW_1_TRIPLED = [...ROW_1, ...ROW_1, ...ROW_1];
const ROW_2_TRIPLED = [...ROW_2, ...ROW_2, ...ROW_2];

export default function MarqueeSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const top = el.getBoundingClientRect().top + window.scrollY;
      const next = (window.scrollY - top + window.innerHeight) * 0.3;
      setOffset(next - 200);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="pt-24 sm:pt-32 md:pt-40 pb-10"
      style={{ background: '#0C0C0C', overflow: 'hidden' }}
    >
      <div className="flex flex-col gap-3">
        <div
          className="flex gap-3"
          style={{
            transform: `translateX(${offset}px)`,
            willChange: 'transform',
          }}
        >
          {ROW_1_TRIPLED.map((src, i) => (
            <img
              key={`r1-${i}`}
              src={src}
              alt=""
              loading="lazy"
              decoding="async"
              className="rounded-2xl object-cover flex-shrink-0"
              style={{ width: 420, height: 270 }}
            />
          ))}
        </div>
        <div
          className="flex gap-3"
          style={{
            transform: `translateX(${-offset}px)`,
            willChange: 'transform',
          }}
        >
          {ROW_2_TRIPLED.map((src, i) => (
            <img
              key={`r2-${i}`}
              src={src}
              alt=""
              loading="lazy"
              decoding="async"
              className="rounded-2xl object-cover flex-shrink-0"
              style={{ width: 420, height: 270 }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
