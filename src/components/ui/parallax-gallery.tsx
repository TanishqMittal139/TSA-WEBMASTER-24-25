
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
        const speed = 0.05 + (index * 0.02);
        const yPos = scrollPosition * speed;
        (element as HTMLElement).style.transform = `translateY(${yPos}px)`;
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <div ref={galleryRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 relative py-12">
      {images.map((image, index) => (
        <Card key={index} className={`overflow-hidden h-80 bg-transparent border-white/10 shadow-xl parallax-image transition-transform duration-500 ${index % 2 === 0 ? 'md:mt-12' : ''}`}>
          <img 
            src={image.src} 
            alt={image.alt} 
            className="w-full h-full object-cover object-center transform hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end">
            <p className="p-4 text-white text-sm font-medium">{image.alt}</p>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default ParallaxGallery;
