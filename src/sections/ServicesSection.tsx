import FadeIn from '../components/FadeIn';

type Service = {
  number: string;
  name: string;
  description: string;
};

const SERVICES: Service[] = [
  {
    number: '01',
    name: 'Wedding Photography',
    description:
      'Cinematic wedding coverage focused on emotions, details, portraits, and storytelling moments.',
  },
  {
    number: '02',
    name: 'Portrait Photography',
    description:
      'Professional portraits for individuals, artists, creators, professionals, and personal branding.',
  },
  {
    number: '03',
    name: 'Event Photography',
    description:
      'Coverage for private events, parties, corporate gatherings, concerts, and celebrations.',
  },
  {
    number: '04',
    name: 'Fashion / Editorial',
    description:
      'Creative editorial-style photography with strong mood, lighting, and composition.',
  },
  {
    number: '05',
    name: 'Product & Brand',
    description:
      'High-quality visuals for businesses, creators, campaigns, websites, and social media.',
  },
];

export default function ServicesSection() {
  return (
    <section
      id="services"
      className="rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 relative z-10"
      style={{ background: '#FFFFFF' }}
    >
      <FadeIn y={40}>
        <h2
          className="font-black uppercase text-center mb-16 sm:mb-20 md:mb-28"
          style={{
            color: '#0C0C0C',
            fontSize: 'clamp(3rem, 12vw, 160px)',
            lineHeight: 1,
          }}
        >
          Services
        </h2>
      </FadeIn>

      <div className="max-w-5xl mx-auto">
        {SERVICES.map((s, i) => (
          <FadeIn key={s.number} delay={i * 0.1} y={30}>
            <div
              className="flex items-start gap-6 sm:gap-8 md:gap-10 py-8 sm:py-10 md:py-12"
              style={{
                borderTop:
                  i === 0 ? 'none' : '1px solid rgba(12, 12, 12, 0.15)',
              }}
            >
              <div
                className="font-black flex-shrink-0"
                style={{
                  color: '#0C0C0C',
                  fontSize: 'clamp(3rem, 10vw, 140px)',
                  lineHeight: 1,
                }}
              >
                {s.number}
              </div>
              <div className="flex flex-col gap-3 sm:gap-4 md:gap-5">
                <h3
                  className="font-medium uppercase"
                  style={{
                    color: '#0C0C0C',
                    fontSize: 'clamp(1rem, 2.2vw, 2.1rem)',
                    lineHeight: 1.1,
                  }}
                >
                  {s.name}
                </h3>
                <p
                  className="font-light leading-relaxed max-w-2xl"
                  style={{
                    color: '#0C0C0C',
                    fontSize: 'clamp(0.85rem, 1.6vw, 1.25rem)',
                    opacity: 0.6,
                  }}
                >
                  {s.description}
                </p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
