
import React, { useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';

interface ParallaxGalleryProps {
  images: { src: string; alt: string; }[];
}

const ParallaxGallery: React.FC<ParallaxGalleryProps> = ({ images }) => {
  const galleryRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleScroll = () => {
      if (!galleryRef.current) return;
      
      const galleryElements = galleryRef.current.querySelectorAll('.parallax-image');
      const scrollPosition = window.scrollY;
      
      galleryElements.forEach((element, index) => {
        const speed = 0.03 + (index % 3 * 0.01); // Use modulo to create varying speeds by column
        const yPos = scrollPosition * speed;
        (element as HTMLElement).style.transform = `translateY(${yPos}px)`;
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Split images into groups of 3 for the columns
  const chunkedImages = images.reduce((resultArray, item, index) => { 
    const chunkIndex = Math.floor(index / 3);
    
    if (!resultArray[chunkIndex]) {
      resultArray[chunkIndex] = [];
    }
    
    resultArray[chunkIndex].push(item);
    return resultArray;
  }, [] as { src: string; alt: string; }[][]);
  
  return (
    <div ref={galleryRef} className="grid grid-cols-1 md:grid-cols-3 gap-8 relative py-12">
      {[0, 1, 2].map(colIndex => (
        <div key={colIndex} className="flex flex-col gap-8">
          {images
            .filter((_, index) => index % 3 === colIndex)
            .map((image, imgIndex) => (
              <Card 
                key={`${colIndex}-${imgIndex}`} 
                className="overflow-hidden h-80 bg-transparent border-white/10 shadow-xl parallax-image transition-transform duration-500"
              >
                <div className="relative w-full h-full">
                  <img 
                    src={image.src} 
                    alt={image.alt} 
                    className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end">
                    <p className="p-4 text-white text-sm font-medium">{image.alt}</p>
                  </div>
                </div>
              </Card>
            ))}
        </div>
      ))}
    </div>
  );
};

export default ParallaxGallery;
