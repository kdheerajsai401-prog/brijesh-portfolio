import { EffectCoverflow, Pagination, Scrollbar } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import FadeIn from '../components/FadeIn';

const U = (id: string) =>
  `https://images.unsplash.com/photo-${id}?w=900&h=1100&fit=crop&q=85`;

type Shot = { src: string; alt: string };

const IMAGES: Shot[] = [
  { src: U('1519741497674-611481863552'), alt: 'Wedding' },
  { src: U('1494790108377-be9c29b29330'), alt: 'Portrait' },
  { src: U('1483985988355-763728e1935b'), alt: 'Fashion' },
  { src: U('1493225457124-a3eb161ffa5f'), alt: 'Event' },
  { src: U('1606216794074-735e91aa2c92'), alt: 'Bridal' },
  { src: U('1487412720507-e7ab37603c6f'), alt: 'Editorial' },
  { src: U('1485827404703-89b55fcc595e'), alt: 'Studio portrait' },
  { src: U('1429962714451-bb934ecdc4ec'), alt: 'Live event' },
  { src: U('1488646953014-85cb44e25828'), alt: 'Travel' },
];

const carouselCss = `
  .work-carousel {
    width: 100%;
    padding-bottom: 72px !important;
  }
  .work-carousel .swiper-slide {
    width: clamp(230px, 72vw, 320px);
    height: clamp(320px, 52vh, 420px);
    border-radius: 24px;
    overflow: hidden;
  }
  .work-carousel .swiper-pagination {
    bottom: 38px !important;
  }
  .work-carousel .swiper-pagination-bullet {
    background-color: rgba(255, 255, 255, 0.35) !important;
    opacity: 1 !important;
  }
  .work-carousel .swiper-pagination-bullet-active {
    background-color: #ffffff !important;
  }
  .work-carousel .swiper-scrollbar {
    width: clamp(180px, 55%, 460px) !important;
    left: 50% !important;
    transform: translateX(-50%);
    bottom: 8px !important;
    height: 6px !important;
    background: rgba(255, 255, 255, 0.12) !important;
    cursor: grab;
  }
  .work-carousel .swiper-scrollbar-drag {
    background: rgba(255, 255, 255, 0.6) !important;
  }
`;

export default function GallerySection() {
  return (
    <section
      id="work"
      className="px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-28 overflow-hidden"
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
        <div className="relative w-full max-w-4xl mx-auto">
          <style>{carouselCss}</style>
          <Swiper
            effect="coverflow"
            grabCursor
            centeredSlides
            slidesPerView="auto"
            loop
            slideToClickedSlide
            spaceBetween={0}
            coverflowEffect={{
              rotate: 40,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            }}
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true, hide: false }}
            className="work-carousel"
            modules={[EffectCoverflow, Pagination, Scrollbar]}
          >
            {IMAGES.map((image, index) => (
              <SwiperSlide key={index}>
                <img
                  className="h-full w-full object-cover"
                  src={image.src}
                  alt={image.alt}
                  loading="lazy"
                  draggable={false}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </FadeIn>
    </section>
  );
}
