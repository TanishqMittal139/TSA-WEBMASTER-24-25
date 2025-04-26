
import React from 'react';
import BlurImage from '@/components/ui/blur-image';

const DealsHero = () => {
  return (
    <section className="relative h-80">
      <div className="absolute inset-0">
        <BlurImage
          src="https://images.unsplash.com/photo-1607082350899-7e105aa886ae?q=80&w=2070&auto=format&fit=crop"
          alt="Special Deals"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-background/10"></div>
      </div>
      
      <div className="relative container mx-auto px-4 flex flex-col justify-center h-full pt-24">
        <div className="transition-all duration-1000 transform translate-y-0 opacity-100">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold mb-4 text-white">Special Deals & Offers</h1>
            <p className="text-lg text-white/90">
              Discover our latest promotions and save on your favorite meals
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DealsHero;
