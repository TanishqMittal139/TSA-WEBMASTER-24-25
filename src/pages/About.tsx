import React from 'react';
import Navbar from '@/components/ui/navbar';
import Footer from '@/components/ui/footer';
import Timeline from '@/components/about/timeline';
import AnimatedHeader from '@/components/ui/animated-header';
import BlurImage from '@/components/ui/blur-image';

const About = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main>
        <section className="relative h-80">
          <div className="absolute inset-0">
            <BlurImage
              src="https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80&w=2670&auto=format&fit=crop"
              alt="About Us"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/10"></div>
          </div>
          
          <div className="relative container mx-auto px-4 flex flex-col justify-center h-full pt-24">
            <AnimatedHeader 
              title="About Us" 
              subtitle="Discover our story and commitment to quality food and service"
              className="mb-12"
            />
          </div>
        </section>
        
        <section className="container mx-auto px-4 py-12">
          <Timeline />
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
