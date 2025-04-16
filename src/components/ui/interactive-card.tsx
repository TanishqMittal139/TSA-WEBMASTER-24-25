
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface InteractiveCardProps {
  title: string;
  description?: string;
  icon?: LucideIcon;
  children?: React.ReactNode;
  className?: string;
  delay?: number;
}

const InteractiveCard: React.FC<InteractiveCardProps> = ({
  title,
  description,
  icon: Icon,
  children,
  className,
  delay = 0
}) => {
  return (
    <Card 
      className={cn(
        "overflow-hidden transition-all duration-300 opacity-0 translate-y-4 stagger-item",
        "hover:shadow-lg hover:-translate-y-2 hover:border-primary/50 group",
        "backdrop-blur-lg bg-background/50 border-white/20 dark:border-white/10",
        `stagger-delay-${delay}`,
        className
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <CardHeader className="relative z-10">
        <CardTitle className="flex items-center gap-2 text-xl text-foreground group-hover:text-primary transition-colors duration-300">
          {Icon && <Icon className="h-5 w-5 text-primary" />}
          <span>{title}</span>
        </CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      
      <CardContent className="relative z-10">
        {children}
      </CardContent>
      
      <div className="absolute -right-12 -bottom-12 w-40 h-40 bg-primary/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    </Card>
  );
};

export default InteractiveCard;
