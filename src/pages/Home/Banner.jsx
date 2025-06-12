import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Typewriter } from "react-simple-typewriter";

import banner1 from "../../assets/banner-images/banner-1.jpg";
import banner2 from "../../assets/banner-images/banner-2.jpg";
import banner3 from "../../assets/banner-images/banner-3.jpg";
import banner4 from "../../assets/banner-images/banner-4.jpg";
import banner5 from "../../assets/banner-images/banner-5.jpg";

const Banner = () => {
  const slides = [
    {
      img: banner1,
      heading: "Empower Your Learning Journey",
      subtext:
        "Find quality educational services that match your needs — from primary tutoring to professional courses.",
    },
    {
      img: banner2,
      heading: "Master Math with Expert Tutors",
      subtext:
        "From algebra to calculus — get personalized guidance to unlock your potential.",
    },
    {
      img: banner3,
      heading: "Quran Learning Made Easy",
      subtext:
        "Enroll in personalized Quran lessons with Tajweed from trusted teachers.",
    },
    {
      img: banner4,
      heading: "Unleash Your Creativity with Art",
      subtext:
        "Enroll in drawing and painting classes that bring out your inner artist.",
    },
    {
      img: banner5,
      heading: "Kickstart Your Web Development Career",
      subtext: "Learn HTML, CSS, JavaScript & more from real developers.",
    },
  ];

  return (
    <div className="w-full">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop={true}
        slidesPerView={1}
        spaceBetween={0}
        className="w-full h-[60vh] md:h-[80vh]"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-[60vh] md:h-[80vh]">
              <img
                src={slide.img}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/20 flex flex-col justify-center items-center px-4 text-center">
                <h2 className="text-3xl md:text-5xl font-bold mb-3 text-white drop-shadow-lg">
                  <Typewriter
                    words={[slide.heading]}
                    loop={false}
                    cursor
                    cursorStyle="_"
                    typeSpeed={50}
                    deleteSpeed={30}
                    delaySpeed={2000}
                  />
                </h2>
                <p className="text-lg md:text-xl text-gray-200 font-medium">
                  {slide.subtext}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
