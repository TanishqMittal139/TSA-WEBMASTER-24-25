
import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
}

interface TimelineProps {
  events: TimelineEvent[];
  className?: string;
}

const Timeline: React.FC<TimelineProps> = ({ events, className }) => {
  const timelineRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    );
    
    const items = timelineRef.current?.querySelectorAll('.timeline-item');
    if (items) {
      items.forEach(item => observer.observe(item));
    }
    
    return () => {
      if (items) {
        items.forEach(item => observer.unobserve(item));
      }
    };
  }, []);
  
  return (
    <div 
      ref={timelineRef} 
      className={cn("relative py-12", className)}
    >
      <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-primary/30 via-primary to-primary/30 rounded-full"></div>
      
      {events.map((event, index) => (
        <div 
          key={index} 
          className={cn(
            "timeline-item relative flex items-center mb-16 opacity-0 transition-all duration-700 ease-out",
            index % 2 === 0 ? "flex-row" : "flex-row-reverse",
            "transform translate-y-12"
          )}
        >
          <div className={cn(
            "w-1/2 px-6",
            index % 2 === 0 ? "text-right" : "text-left"
          )}>
            <div className="bg-background/50 backdrop-blur-md p-6 rounded-xl border border-white/10 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <h3 className="text-xl font-bold text-primary mb-2">{event.title}</h3>
              <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary mb-3">{event.year}</span>
              <p className="text-foreground/80">{event.description}</p>
            </div>
          </div>
          
          <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-primary rounded-full border-4 border-background shadow-lg z-10">
            <div className="absolute inset-0 bg-primary rounded-full animate-ping opacity-30"></div>
          </div>
          
          <div className="w-1/2"></div>
        </div>
      ))}
    </div>
  );
};

export default Timeline;
