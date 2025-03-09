
import React, { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";

interface BlurImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
}

const BlurImage: React.FC<BlurImageProps> = ({ 
  src, 
  alt, 
  className, 
  ...props 
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setIsInView(true);
        observer.disconnect();
      }
    }, { threshold: 0.1 });
    
    const current = document.getElementById(`image-${src.replace(/\W/g, '')}`);
    if (current) {
      observer.observe(current);
    }
    
    return () => {
      if (current) {
        observer.unobserve(current);
      }
    };
  }, [src]);
  
  return (
    <div className="relative overflow-hidden w-full h-full">
      {/* Tiny blurred version */}
      <div
        className={cn(
          "absolute inset-0 transform scale-110 blur-2xl bg-center bg-cover transition-opacity duration-500",
          isLoaded ? "opacity-0" : "opacity-100"
        )}
        style={{ backgroundImage: `url(${src})` }}
      />
      
      {/* Main image */}
      <img
        id={`image-${src.replace(/\W/g, '')}`}
        src={isInView ? src : ''}
        alt={alt}
        className={cn(
          "transition-opacity duration-500 object-cover w-full h-full",
          isLoaded ? "opacity-100" : "opacity-0",
          className
        )}
        onLoad={() => setIsLoaded(true)}
        {...props}
      />
    </div>
  );
};

export default BlurImage;
