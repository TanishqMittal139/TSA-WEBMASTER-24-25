
import React, { useEffect, useRef, useState } from 'react';
import { Card } from '@/components/ui/card';

interface ParallaxGalleryProps {
  images: { src: string; alt: string; }[];
}

const ParallaxGallery: React.FC<ParallaxGalleryProps> = ({ images }) => {
  const galleryRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const animationFrameRef = useRef<number | null>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    
    if (galleryRef.current) {
      observer.observe(galleryRef.current);
    }
    
    return () => {
      if (galleryRef.current) {
        observer.unobserve(galleryRef.current);
      }
    };
  }, []);
  
  useEffect(() => {
    // Elements and their positions
    const elements: HTMLElement[] = [];
    const elementPositions: { top: number; height: number }[] = [];
    let lastScrollY = window.scrollY;
    
    const initializeElements = () => {
      if (!galleryRef.current) return;
      
      const galleryElements = galleryRef.current.querySelectorAll('.parallax-image');
      elements.length = 0;
      elementPositions.length = 0;
      
      galleryElements.forEach((el) => {
        const element = el as HTMLElement;
        const rect = element.getBoundingClientRect();
        
        elements.push(element);
        elementPositions.push({
          top: rect.top + window.scrollY,
          height: rect.height
        });
        
        // Initialize with opacity 0 and transform
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
      });
    };
    
    const updateElementStyles = () => {
      if (!isVisible) return;
      
      const viewportHeight = window.innerHeight;
      const scrollY = window.scrollY;
      
      elements.forEach((element, index) => {
        const position = elementPositions[index];
        if (!position) return;
        
        // Calculate position relative to viewport
        const relativeTop = position.top - scrollY;
        const elementMiddle = relativeTop + position.height / 2;
        const viewportMiddle = viewportHeight / 2;
        
        // Calculate visibility (0 when out of view, 1 when in view)
        const distanceFromTop = relativeTop - viewportHeight;
        const distanceFromBottom = relativeTop + position.height;
        
        // Only apply effects if the element is in or near the viewport
        if (distanceFromTop < 200 && distanceFromBottom > -200) {
          // Calculate parallax effect - smoother with lower multiplier
          const distance = elementMiddle - viewportMiddle;
          const parallaxMultiplier = 0.03; // Lower value for subtler effect
          const yPos = distance * parallaxMultiplier * -1; // Inverse movement
          
          // Determine opacity based on position in viewport
          let opacity = 1;
          if (relativeTop > viewportHeight) {
            opacity = 0;
          } else if (relativeTop > viewportHeight - 200) {
            opacity = (viewportHeight - relativeTop) / 200;
          } else if (relativeTop + position.height < 0) {
            opacity = 0;
          } else if (relativeTop + position.height < 200) {
            opacity = (relativeTop + position.height) / 200;
          }
          
          // Apply smooth transitions for both transform and opacity
          element.style.transition = 'transform 0.3s ease-out, opacity 0.5s ease-out';
          element.style.transform = `translateY(${yPos}px)`;
          element.style.opacity = opacity.toString();
        }
      });
      
      lastScrollY = scrollY;
    };
    
    const handleScroll = () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      
      animationFrameRef.current = requestAnimationFrame(updateElementStyles);
    };
    
    // Initialize when component becomes visible
    if (isVisible) {
      initializeElements();
      updateElementStyles();
      window.addEventListener('scroll', handleScroll, { passive: true });
      window.addEventListener('resize', initializeElements);
    }
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', initializeElements);
    };
  }, [isVisible]);
  
  return (
    <div ref={galleryRef} className="grid grid-cols-1 md:grid-cols-3 gap-8 relative py-12">
      {[0, 1, 2].map(colIndex => (
        <div key={colIndex} className="flex flex-col gap-8">
          {images
            .filter((_, index) => index % 3 === colIndex)
            .map((image, imgIndex) => (
              <Card 
                key={`${colIndex}-${imgIndex}`} 
                className="overflow-hidden h-80 bg-transparent border-white/10 shadow-xl parallax-image"
                style={{ 
                  position: 'relative', 
                  zIndex: imgIndex,
                  opacity: 0,
                  transform: 'translateY(30px)'
                }}
              >
                <div className="relative w-full h-full">
                  <img 
                    src={image.src} 
                    alt={image.alt} 
                    className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-700"
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
