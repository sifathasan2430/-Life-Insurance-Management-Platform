import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const slides = [
  {
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1470&q=80',
    title: 'Comprehensive Health Coverage',
    subtitle: 'Affordable plans that protect you and your family.',
  },
  {
    image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1583&q=80',
    title: 'Drive With Confidence',
    subtitle: 'Reliable auto insurance that has you covered.',
  },
  {
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1473&q=80',
    title: 'Protect Your Home',
    subtitle: 'Get covered for fire, theft, and natural disasters.',
  },
];

const HeroSlider = () => {
  return (
    <div className="w-full h-[75vh] relative">
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        spaceBetween={0}
        slidesPerView={1}
        effect="fade"
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        className="w-full h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className="w-full h-[75vh] bg-cover bg-center flex items-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
                <div className="text-center text-white max-w-7xl mx-auto px-4">
                  <h2 className="text-3xl md:text-5xl font-bold mb-4">{slide.title}</h2>
                  <p className="text-lg md:text-xl mb-6">{slide.subtitle}</p>
                  <button className="bg-[#ff9a68] hover:bg-[#ff8a50] transition px-6 py-3 rounded-full font-semibold shadow-lg">
                    Get a Quote
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <style jsx="true">{`
        .swiper-pagination-bullet {
          background: white;
          opacity: 0.5;
          width: 12px;
          height: 12px;
        }

        .swiper-pagination-bullet-active {
          background: #ff9a68;
          opacity: 1;
        }
      `}</style>
    </div>
  );
};

export default HeroSlider;
