
import React from "react";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  badgeText?: string;
  title: string;
  subtitle?: string;
  className?: string;
  bgImage?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  badgeText,
  title,
  subtitle,
  className,
  bgImage, // For future flexibility (e.g. setting background image)
}) => {
  return (
    <section className={cn("relative h-80 w-full flex items-end", className)}>
      {bgImage && (
        <img
          src={bgImage}
          alt=""
          className="absolute inset-0 w-full h-full object-cover object-center z-0 pointer-events-none select-none"
          style={{ opacity: 0.72 }}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/10 z-10"></div>
      <div className="relative z-20 container mx-auto px-4 pb-10">
        {badgeText && (
          <div className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            {badgeText}
          </div>
        )}
        <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-2 drop-shadow-lg">
          {title}
        </h1>
        {subtitle && (
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl drop-shadow">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
};

export default PageHeader;

