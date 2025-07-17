import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import { useNavigate } from 'react-router';

const slides = [
  {
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85',
    title: 'Comprehensive Health Coverage',
    subtitle: 'Affordable plans that protect you and your family.',
  },
  {
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85',
    title: 'Drive With Confidence',
    subtitle: 'Reliable auto insurance that has you covered.',
  },
  {
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85',
    title: 'Protect Your Home',
    subtitle: 'Get covered for fire, theft, and natural disasters.',
  },
];

const HeroSlider = () => {
  const navigate=useNavigate()
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
                  <button onClick={()=>navigate('/quote/686f8b41f40617de400e1da0')} className="bg-[#ff9a68] hover:bg-[#ff8a50] transition px-6 py-3 rounded-full font-semibold shadow-lg">
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
