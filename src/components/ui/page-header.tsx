
import React, { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";
import BlurImage from "@/components/ui/blur-image";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  badge?: string;
  imageSrc: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  badge,
  imageSrc
}) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative h-80">
      <div className="absolute inset-0">
        <BlurImage
          src={imageSrc}
          alt={title}
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/10" />
      </div>
      
      <div className="relative container mx-auto px-4 flex flex-col justify-center h-full pt-24">
        <div className={cn(
          "transition-all duration-1000 transform",
          isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
        )}>
          {badge && (
            <div className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
              {badge}
            </div>
          )}
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">{title}</h1>
          {subtitle && (
            <p className="text-muted-foreground max-w-xl">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default PageHeader;
