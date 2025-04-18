import React from 'react';
import Navbar from '@/components/ui/navbar';
import Footer from '@/components/ui/footer';
import RotatingCube from '@/components/references/rotating-cube';
import AnimatedHeader from '@/components/ui/animated-header';
import BlurImage from '@/components/ui/blur-image';

const References = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main>
        <section className="relative h-80">
          <div className="absolute inset-0">
            <BlurImage
              src="https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=2670&auto=format&fit=crop"
              alt="References"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/10"></div>
          </div>
          
          <div className="relative container mx-auto px-4 flex flex-col justify-center h-full pt-24">
            <AnimatedHeader 
              title="References" 
              subtitle="Documentation and helpful resources for our project"
              className="mb-12"
            />
          </div>
        </section>
        
        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">Project Resources</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-card rounded-xl shadow-md p-6">
                <h3 className="text-xl font-semibold mb-4">Work Log</h3>
                <p className="text-muted-foreground mb-4">
                  A detailed log of work completed on the TastyHub project by team members.
                </p>
                <a href="/work-log.pdf" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  View Work Log
                </a>
              </div>
              
              <div className="bg-card rounded-xl shadow-md p-6">
                <h3 className="text-xl font-semibold mb-4">Student Copyright Checklist</h3>
                <p className="text-muted-foreground mb-4">
                  Information about copyright compliance for student projects.
                </p>
                <a href="/student-copyright-checklist.pdf" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  View Copyright Checklist
                </a>
              </div>
              
              <div className="bg-card rounded-xl shadow-md p-6">
                <h3 className="text-xl font-semibold mb-4">Rotating Cube</h3>
                <p className="text-muted-foreground mb-4">
                  A demonstration of a rotating cube using Three.js.
                </p>
                <RotatingCube />
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default References;
