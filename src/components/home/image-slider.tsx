
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ImageSliderProps {
  images: {
    src: string;
    alt: string;
    title?: string;
    description?: string;
  }[];
  autoPlay?: boolean;
  interval?: number;
  className?: string;
}

// Updated slider images with high-quality food photos
const defaultImages = [
  {
    src: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2670&auto=format&fit=crop",
    alt: "Featured dish - Grilled salmon with vegetables",
    title: "Fresh Seasonal Cuisine",
    description: "Our menu changes with the seasons to bring you the freshest ingredients"
  },
  {
    src: "https://images.unsplash.com/photo-1543339308-43e59d6b73a6?q=80&w=2670&auto=format&fit=crop",
    alt: "Pasta dish with tomato sauce",
    title: "Handcrafted Pasta",
    description: "Every pasta dish is made fresh daily by our expert chefs"
  },
  {
    src: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=2681&auto=format&fit=crop",
    alt: "Artisan pizza",
    title: "Wood-Fired Pizzas",
    description: "Traditional recipes with locally sourced toppings"
  },
  {
    src: "https://images.unsplash.com/photo-1559847844-5315695dadae?q=80&w=2940&auto=format&fit=crop",
    alt: "Plant-based bowl",
    title: "Plant-Based Options",
    description: "Delicious and creative vegetarian and vegan dishes"
  },
  {
    src: "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?q=80&w=2910&auto=format&fit=crop",
    alt: "Breakfast spread",
    title: "Weekend Brunch",
    description: "Join us for our famous weekend brunch menu"
  }
];

const ImageSlider: React.FC<ImageSliderProps> = ({
  images = defaultImages,
  autoPlay = true,
  interval = 5000,
  className
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const goToSlide = (index: number) => {
    if (isAnimating || index === currentIndex) return;
    setIsAnimating(true);
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (autoPlay && !isPaused) {
      const timer = setTimeout(nextSlide, interval);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, autoPlay, interval, isPaused]);

  return (
    <div 
      className={cn("relative overflow-hidden rounded-2xl shadow-xl", className)}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <AnimatePresence initial={false} mode="wait" onExitComplete={() => setIsAnimating(false)}>
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="relative aspect-[16/9] md:aspect-[21/9] w-full"
        >
          <div className="absolute inset-0 bg-black/20 z-10"></div>
          <img
            src={images[currentIndex].src}
            alt={images[currentIndex].alt}
            className="w-full h-full object-cover"
          />
          
          {(images[currentIndex].title || images[currentIndex].description) && (
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/60 to-transparent z-20 text-white">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {images[currentIndex].title && (
                  <h3 className="text-xl md:text-2xl font-bold mb-2">{images[currentIndex].title}</h3>
                )}
                {images[currentIndex].description && (
                  <p className="text-sm md:text-base max-w-xl">{images[currentIndex].description}</p>
                )}
              </motion.div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-white/20 backdrop-blur-sm hover:bg-white/40 text-white rounded-full p-2 transition-all duration-200 opacity-70 hover:opacity-100"
        aria-label="Previous slide"
      >
        <ArrowLeft size={20} />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-white/20 backdrop-blur-sm hover:bg-white/40 text-white rounded-full p-2 transition-all duration-200 opacity-70 hover:opacity-100"
        aria-label="Next slide"
      >
        <ArrowRight size={20} />
      </button>

      {/* Indicator dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? "bg-white scale-110" 
                : "bg-white/40 hover:bg-white/60"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
