import { motion } from 'framer-motion';
import FadeIn from '../components/FadeIn';
import Magnet from '../components/Magnet';
import ContactButton from '../components/ContactButton';
import InstagramFollow from '../components/InstagramFollow';
import DeviceTilt from '../components/DeviceTilt';

export default function HeroSection() {
  return (
    <section
      className="relative h-screen flex flex-col px-6 md:px-10"
      style={{ overflowX: 'clip' }}
    >
      {/* Split content */}
      <div className="flex-1 w-full max-w-[1200px] mx-auto flex flex-col md:flex-row items-center gap-8 md:gap-6 py-6 md:py-0">
        {/* Text column */}
        <div className="order-2 md:order-1 w-full md:flex-1 flex flex-col gap-6 md:gap-8">
          <FadeIn delay={0.15} y={40}>
            <h1
              className="hero-heading font-black uppercase tracking-tight text-[14vw] sm:text-[12vw] md:text-[9vw] lg:text-[8.5vw]"
              style={{ lineHeight: 0.95 }}
            >
              Hi, I&apos;m
              <br />
              Brijesh
            </h1>
          </FadeIn>

          <FadeIn delay={0.35} y={20}>
            <p
              className="text-[#D7E2EA] font-light uppercase tracking-wide leading-snug max-w-[260px] md:max-w-[320px]"
              style={{ fontSize: 'clamp(0.75rem, 1.4vw, 1.5rem)' }}
            >
              a gta-based photographer capturing real moments and timeless stories
            </p>
          </FadeIn>

          <FadeIn delay={0.5} y={20}>
            <div className="self-start">
              <ContactButton />
            </div>
          </FadeIn>
        </div>

        {/* Image column */}
        <div className="order-1 md:order-2 w-full md:flex-1 flex justify-center md:justify-center">
          <FadeIn delay={0.6} y={30}>
            <motion.div
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              style={{ willChange: 'transform' }}
            >
              <Magnet
                padding={150}
                strength={6}
                activeTransition="transform 0.3s ease-out"
                inactiveTransition="transform 0.6s ease-in-out"
              >
                <DeviceTilt maxTranslate={28} sensitivity={25}>
                  <img
                    src="/brijesh-3d.png"
                    alt="Brijesh Lakhiya, photographer"
                    className="w-[220px] sm:w-[280px] md:w-[360px] lg:w-[440px] select-none pointer-events-none"
                    draggable={false}
                  />
                </DeviceTilt>
              </Magnet>
            </motion.div>
          </FadeIn>
        </div>
      </div>

      {/* Floating Instagram follow card */}
      <InstagramFollow className="absolute bottom-6 right-6 md:bottom-10 md:right-10 z-30 scale-[0.8] sm:scale-100 origin-bottom-right" />
    </section>
  );
}
