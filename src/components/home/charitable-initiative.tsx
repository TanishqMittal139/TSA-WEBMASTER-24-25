
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const CharitableInitiative = () => {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/5 rounded-full" aria-hidden="true"></div>
      <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-primary/5 rounded-full" aria-hidden="true"></div>
      
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative rounded-2xl overflow-hidden shadow-xl transform hover:scale-[1.02] transition-transform duration-300">
            <img
              src="https://images.unsplash.com/photo-1593113598332-cd288d649433?w=800&auto=format&fit=crop"
              alt="Volunteer helping at food bank"
              className="w-full h-[400px] object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "/placeholder.svg";
              }}
            />
          </div>
          
          <div className="space-y-6">
            <div className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
              TastyHub Cares
            </div>
            
            <h2 className="text-4xl font-bold text-foreground">
              5 Years of Fighting Food Insecurity
            </h2>
            
            <p className="text-lg text-muted-foreground">
              TastyHub is proud to be a leading partner in the fight against food insecurity. 
              Through our partnership with local food banks and shelters, we're making a 
              difference in our communities.
            </p>
            
            <p className="text-muted-foreground">
              In 2023, with your support, we provided over 100,000 meals to families in need 
              through our surplus food donation program and community initiatives. Every order 
              you place helps us continue this mission.
            </p>
            
            <div className="flex flex-wrap gap-4 pt-4">
              <Button asChild className="group">
                <Link to="/about#initiative" className="flex items-center gap-2">
                  Learn More <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button variant="outline" asChild className="group">
                <a 
                  href="https://feedingamerica.org/donate" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  Donate Now <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CharitableInitiative;
