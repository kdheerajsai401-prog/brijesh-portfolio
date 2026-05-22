import { useRef } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import FadeIn from '../components/FadeIn';
import LiveProjectButton from '../components/LiveProjectButton';

type Project = {
  number: string;
  category: string;
  name: string;
  col1a: string;
  col1b: string;
  col2: string;
};

const U = (id: string, w = 1280) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&q=85&fit=crop`;

// Fallback: rendered while Convex loads or if it's unreachable / not yet seeded.
const PROJECTS: Project[] = [
  {
    number: '01',
    category: 'Wedding',
    name: 'Anaya & Rohan',
    col1a: U('1511285560929-80b456fea0bc'), // rings closeup
    col1b: U('1606216794074-735e91aa2c92'), // bride portrait
    col2: U('1519741497674-611481863552'), // couple
  },
  {
    number: '02',
    category: 'Editorial',
    name: 'Vogue Bombay',
    col1a: U('1483985988355-763728e1935b'), // fashion editorial detail
    col1b: U('1487412720507-e7ab37603c6f'), // fashion model
    col2: U('1469334031218-e382a71b716b'), // fashion spread
  },
  {
    number: '03',
    category: 'Brand',
    name: 'Kismet Coffee Co.',
    col1a: U('1509042239860-f550ce710b93'), // coffee beans
    col1b: U('1495474472287-4d71bcdd2085'), // coffee cup
    col2: U('1497935586351-b67a49e012bf'), // coffee art
  },
];

function Card({
  project,
  index,
  totalCards,
  progress,
}: {
  project: Project;
  index: number;
  totalCards: number;
  progress: MotionValue<number>;
}) {
  const targetScale = 1 - (totalCards - 1 - index) * 0.03;
  const start = index / totalCards;
  const scale = useTransform(progress, [start, 1], [1, targetScale]);

  return (
    <div
      className="sticky top-24 md:top-32 h-[85vh] flex items-center justify-center"
      style={{ marginTop: index === 0 ? 0 : -100 }}
    >
      <motion.div
        style={{
          scale,
          marginTop: `${index * 28}px`,
          background: '#0C0C0C',
          width: '100%',
        }}
        className="rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border-2 border-[#D7E2EA] p-4 sm:p-6 md:p-8"
      >
        {/* Top row */}
        <div className="flex items-center justify-between gap-4 flex-wrap mb-4 sm:mb-6 md:mb-8">
          <div className="flex items-center gap-4 sm:gap-6 md:gap-8 flex-wrap">
            <div
              className="font-black"
              style={{
                color: '#D7E2EA',
                fontSize: 'clamp(2.5rem, 8vw, 110px)',
                lineHeight: 1,
              }}
            >
              {project.number}
            </div>
            <div className="flex flex-col gap-1">
              <span
                className="uppercase tracking-widest font-light"
                style={{ color: '#D7E2EA', opacity: 0.6, fontSize: '0.8rem' }}
              >
                {project.category}
              </span>
              <span
                className="uppercase font-medium"
                style={{
                  color: '#D7E2EA',
                  fontSize: 'clamp(1rem, 2vw, 1.8rem)',
                  lineHeight: 1.1,
                }}
              >
                {project.name}
              </span>
            </div>
          </div>
          <LiveProjectButton />
        </div>

        {/* Image grid */}
        <div className="flex gap-3 sm:gap-4 md:gap-5">
          <div className="flex flex-col gap-3 sm:gap-4 md:gap-5" style={{ width: '40%' }}>
            <img
              src={project.col1a}
              alt=""
              loading="lazy"
              className="w-full object-cover rounded-[40px] sm:rounded-[50px] md:rounded-[60px]"
              style={{ height: 'clamp(130px, 16vw, 230px)' }}
            />
            <img
              src={project.col1b}
              alt=""
              loading="lazy"
              className="w-full object-cover rounded-[40px] sm:rounded-[50px] md:rounded-[60px]"
              style={{ height: 'clamp(160px, 22vw, 340px)' }}
            />
          </div>
          <div style={{ width: '60%' }}>
            <img
              src={project.col2}
              alt=""
              loading="lazy"
              className="w-full h-full object-cover rounded-[40px] sm:rounded-[50px] md:rounded-[60px]"
              style={{
                minHeight: 'calc(clamp(130px, 16vw, 230px) + clamp(160px, 22vw, 340px) + 1.25rem)',
              }}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function ProjectsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const data = useQuery(api.projects.list);
  const projects: Project[] = data ?? PROJECTS;

  return (
    <section
      id="projects"
      className="rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 relative z-10 px-5 sm:px-8 md:px-10 pt-20 sm:pt-24 md:pt-32 pb-20"
      style={{ background: '#0C0C0C' }}
    >
      <FadeIn y={40}>
        <h2
          className="hero-heading font-black uppercase text-center mb-16 sm:mb-20 md:mb-28"
          style={{
            fontSize: 'clamp(3rem, 12vw, 160px)',
            lineHeight: 1,
            letterSpacing: '-0.02em',
          }}
        >
          Project
        </h2>
      </FadeIn>

      <div ref={containerRef} className="relative">
        {projects.map((p, i) => (
          <Card
            key={p.number}
            project={p}
            index={i}
            totalCards={projects.length}
            progress={scrollYProgress}
          />
        ))}
      </div>
    </section>
  );
}
