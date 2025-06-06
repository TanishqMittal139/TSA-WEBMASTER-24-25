
import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
}

const AnimatedHeader = ({ title, subtitle, className }: AnimatedHeaderProps) => {
  const headerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1 }
    );
    
    if (headerRef.current) {
      observer.observe(headerRef.current);
    }
    
    // Make the element visible by default and then apply animations
    if (headerRef.current) {
      headerRef.current.style.opacity = '1';
      headerRef.current.classList.add('animate-in');
    }
    
    return () => {
      if (headerRef.current) {
        observer.unobserve(headerRef.current);
      }
    };
  }, []);
  
  return (
    <div 
      ref={headerRef} 
      className={cn(
        "transition-all duration-1000 ease-out",
        className
      )}
    >
      <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 relative">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/80 to-primary/60 animate-gradient-shift bg-[length:200%_200%]">
          {title}
        </span>
        <div className="absolute -bottom-2 left-0 w-1/3 h-1 bg-primary rounded-full"></div>
        <div className="absolute -bottom-2 left-0 w-1/4 h-1 bg-primary/50 rounded-full animate-pulse"></div>
      </h1>
      {subtitle && (
        <p className="text-lg md:text-xl text-foreground/70 max-w-3xl mt-6">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default AnimatedHeader;
