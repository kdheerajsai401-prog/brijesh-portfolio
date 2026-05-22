import FadeIn from '../components/FadeIn';
import ScrollReveal from '../components/ScrollReveal';
import ContactButton from '../components/ContactButton';
import { useSiteContent } from '../lib/content';

const ABOUT_TEXT =
  'I’m a photographer and visual storyteller focused on capturing real emotions, honest moments, and timeless stories. My work blends cinematic lighting, natural emotion, and creative composition to create images that feel powerful, personal, and alive.';

export default function AboutSection() {
  const c = useSiteContent();
  return (
    <section
      id="about"
      className="relative min-h-screen flex flex-col items-center justify-center px-5 sm:px-8 md:px-10 py-20 gap-10 sm:gap-14 md:gap-16"
      style={{ background: '#0C0C0C' }}
    >
      {/* Decorative corner images (positioning wrapper + motion child) */}
      <div className="absolute top-[4%] left-[1%] sm:left-[2%] md:left-[4%] pointer-events-none">
        <FadeIn delay={0.1} x={-80} y={0} duration={0.9}>
          <img
            src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png"
            alt=""
            className="w-[120px] sm:w-[160px] md:w-[210px]"
          />
        </FadeIn>
      </div>

      <div className="absolute top-[4%] right-[1%] sm:right-[2%] md:right-[4%] pointer-events-none">
        <FadeIn delay={0.15} x={80} y={0} duration={0.9}>
          <img
            src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png"
            alt=""
            className="w-[120px] sm:w-[160px] md:w-[210px]"
          />
        </FadeIn>
      </div>

      <div className="absolute bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%] pointer-events-none">
        <FadeIn delay={0.25} x={-80} y={0} duration={0.9}>
          <img
            src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png"
            alt=""
            className="w-[100px] sm:w-[140px] md:w-[180px]"
          />
        </FadeIn>
      </div>

      <div className="absolute bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%] pointer-events-none">
        <FadeIn delay={0.3} x={80} y={0} duration={0.9}>
          <img
            src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png"
            alt=""
            className="w-[130px] sm:w-[170px] md:w-[220px]"
          />
        </FadeIn>
      </div>

      {/* Heading */}
      <FadeIn delay={0} y={40} className="relative z-10">
        <h2
          className="hero-heading font-black uppercase leading-none tracking-tight text-center"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          About me
        </h2>
      </FadeIn>

      {/* Animated paragraph */}
      <div className="relative z-10 max-w-[680px]">
        <ScrollReveal
          baseOpacity={0}
          enableBlur
          baseRotation={4}
          blurStrength={8}
          textClassName="text-[#D7E2EA] font-semibold text-center leading-relaxed"
          textStyle={{ fontSize: 'clamp(1.25rem, 3vw, 2rem)' }}
        >
          {c('about_text', ABOUT_TEXT)}
        </ScrollReveal>
      </div>

      <div className="relative z-10 mt-6 sm:mt-10 md:mt-14">
        <ContactButton />
      </div>
    </section>
  );
}
