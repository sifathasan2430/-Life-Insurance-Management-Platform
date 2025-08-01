
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlay } from "react-icons/fa";
import { GoDot, GoDotFill } from "react-icons/go";

const bannerSlides = [
  {
    id: 1,
    subtitle: "Best Insurance Agency",
    title: "Secure Your Business Future.",
    description:
      "Choose us for comprehensive insurance coverage that safeguards what matters most, personalized to your unique needs.",
    image: "https://noxiy.nextwpcook.com/wp-content/uploads/2023/07/life-insurance-1.jpg",
    video: "https://www.youtube.com/watch?v=SZEflIVnhH8",
    link: "/about-us",
  },
  {
    id: 2,
    subtitle: "Insure Peace of Mind",
    title: "Get Reliable Insurance.",
    description:
      "Choose us for comprehensive insurance coverage that safeguards what matters most, personalized to your unique needs.",
    image: "https://iaeglobal.in/wp-content/uploads/Guide-to-Choosing-the-Best-University-for-Studying-Abroad-copy.webp",
    video: "https://www.youtube.com/watch?v=SZEflIVnhH8",
    link: "/about-us",
  },
  {
    id: 3,
    subtitle: "Protect Your Legacy",
    title: "Life Insurance Made Simple.",
    description:
      "Ensure your loved ones are protected with our straightforward and affordable life insurance plans.",
    image: "https://i.ibb.co/FkH8fHcF/health-insurance-assurnace-medic.jpg",
    video: "https://www.youtube.com/watch?v=SZEflIVnhH8",
    link: "/about-us",
  },
];

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const imageVariants = {
  hidden: { opacity: 0, scale: 0.8, rotate: -5 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10,
      duration: 0.8,
    },
  },
};

const Herobanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentSlide((prev) => (prev === bannerSlides.length - 1 ? 0 : prev + 1));
    }, 7000);
    return () => clearTimeout(timer);
  }, [currentSlide]);

  const handleDotClick = (index) => {
    setCurrentSlide(index);
  };

  const slide = bannerSlides[currentSlide];

  return (
    <div className="relative w-full overflow-hidden bg-gray-50 min-h-[85vh] flex items-center justify-center">
      {/* Animated Aurora Background */}
      <div className="absolute top-0 left-0 w-full h-full z-0">
        <motion.div 
          className="absolute top-[10%] left-[10%] w-96 h-96 bg-orange-200 rounded-full filter blur-3xl opacity-40"
          animate={{ x: [0, 100, 0], y: [0, -50, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 20, ease: "easeInOut", repeat: Infinity, repeatType: "mirror" }}
        />
        <motion.div 
          className="absolute bottom-[10%] right-[10%] w-96 h-96 bg-teal-100 rounded-full filter blur-3xl opacity-40"
          animate={{ x: [0, -100, 0], y: [0, 50, 0], scale: [1, 1.05, 1] }}
          transition={{ duration: 25, ease: "easeInOut", repeat: Infinity, repeatType: "mirror" }}
        />
      </div>

      <div className="container mx-auto px-4 z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, transition: { duration: 0.5 } }}
            className="flex flex-col lg:flex-row items-center justify-between gap-12"
          >
            {/* Text Content */}
            <div className="max-w-lg space-y-5 text-center lg:text-left">
              <motion.span variants={itemVariants} className="text-orange-500 font-semibold text-sm tracking-wide uppercase">
                {slide.subtitle}
              </motion.span>
              <motion.h1 variants={itemVariants} className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
                {slide.title}
              </motion.h1>
              <motion.p variants={itemVariants} className="text-gray-600 text-lg">
                {slide.description}
              </motion.p>
              <motion.div variants={itemVariants} className="flex items-center gap-4 justify-center lg:justify-start pt-4">
                <motion.a
                  href={slide.link}
                  className="bg-[#ff8c00] text-white px-7 py-3 rounded-full font-semibold shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Discover More
                </motion.a>
                <motion.a
                  href={slide.video}
                  target="_blank"
                  rel="noreferrer"
                  className="w-12 h-12 rounded-full flex items-center justify-center border-2 border-orange-400 text-orange-500"
                  whileHover={{ scale: 1.1, backgroundColor: "#fff5ed" }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaPlay />
                </motion.a>
              </motion.div>
            </div>

            {/* Image */}
            <motion.div variants={imageVariants} className="mt-10 lg:mt-0">
              <img
                src={slide.image}
                alt="Banner"
                className="w-[300px] md:w-[400px] rounded-2xl shadow-2xl"
              />
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
      
      {/* Pagination Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {bannerSlides.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => handleDotClick(index)}
            className="text-2xl text-orange-500"
            whileHover={{ scale: 1.2 }}
          >
            {index === currentSlide ? <GoDotFill /> : <GoDot />}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default Herobanner;
