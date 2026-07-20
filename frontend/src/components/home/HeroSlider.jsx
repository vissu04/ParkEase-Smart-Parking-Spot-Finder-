import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';

const HeroSlider = () => {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);

  const slides = [
    {
      id: 1,
      image: '/Hero1.jpeg',
      title: 'Smart Parking Solutions',
      subtitle: 'Find and reserve your perfect parking spot in seconds',
      buttons: [
        { text: 'Find Parking Now', primary: true, action: () => navigate('/book-parking') },
        { text: 'Learn More', primary: false, action: () => navigate('/why-choose') },
      ],
    },
    {
      id: 2,
      image: '/Hero2.jpeg',
      title: 'Secure & Convenient',
      subtitle: 'Real-time availability with instant digital access',
      buttons: [
        { text: 'Reserve Your Spot', primary: true, action: () => navigate('/book-parking') },
        { text: 'View Rates', primary: false, action: () => navigate('/parking-rates') },
      ],
    },
    {
      id: 3,
      image: '/Hero3.jpeg',
      title: 'Park with Confidence',
      subtitle: '24/7 secure parking at premium locations across the city',
      buttons: [
        { text: 'Book Now', primary: true, action: () => navigate('/book-parking') },
        { text: 'Explore Features', primary: false, action: () => navigate('/features') },
      ],
    },
  ];

  return (
    <div className="hero-slider-wrapper h-[calc(100vh-75px)] w-full overflow-hidden">
      <Swiper
        modules={[Autoplay, EffectFade, Pagination]}
        effect="fade"
        speed={1500}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          bulletClass: 'swiper-pagination-bullet custom-bullet',
          bulletActiveClass: 'swiper-pagination-bullet-active custom-bullet-active',
        }}
        loop={true}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        className="h-full w-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={slide.id}>
            <div className="relative h-full w-full">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${slide.image})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30"></div>
              </div>

              <div className="relative h-full flex items-center justify-center px-6 sm:px-12">
                <div
                  className={`max-w-4xl text-center text-white transition-all duration-1000 ${
                    activeIndex === index
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-8'
                  }`}
                >
                  <h1
                    className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 transition-all duration-1000 delay-300 ${
                      activeIndex === index
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 translate-y-12'
                    }`}
                  >
                    {slide.title}
                  </h1>

                  <p
                    className={`text-lg sm:text-xl md:text-2xl text-gray-200 mb-10 transition-all duration-1000 delay-500 ${
                      activeIndex === index
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 translate-y-12'
                    }`}
                  >
                    {slide.subtitle}
                  </p>

                  <div
                    className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-1000 delay-700 ${
                      activeIndex === index
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 translate-y-12'
                    }`}
                  >
                    {slide.buttons.map((button, btnIndex) => (
                      <button
                        key={btnIndex}
                        onClick={button.action}
                        className={`px-8 py-4 text-base font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl ${
                          button.primary
                            ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 shadow-md hover:shadow-lg'
                            : 'bg-white/10 backdrop-blur-sm text-white border-2 border-white hover:bg-white hover:text-gray-900'
                        }`}
                      >
                        {button.text}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <style>{`
        .custom-bullet {
          width: 12px;
          height: 12px;
          background: rgba(255, 255, 255, 0.5);
          opacity: 1;
          margin: 0 6px;
          transition: all 0.3s ease;
        }

        .custom-bullet-active {
          background: #ffffff;
          width: 40px;
          border-radius: 6px;
        }

        .swiper-pagination {
          bottom: 30px !important;
        }

        @media (max-width: 640px) {
          .swiper-pagination {
            bottom: 20px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default HeroSlider;
