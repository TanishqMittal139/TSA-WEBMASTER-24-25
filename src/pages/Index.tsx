
import React, { useEffect } from 'react';
import Navbar from '../components/ui/navbar';
import Footer from '../components/ui/footer';
import HeroSection from '../components/home/hero-section';
import FeaturedSection from '../components/home/featured-section';
import CharitableInitiative from '../components/home/charitable-initiative';
import HoursSection from '../components/home/hours-section';

const Index: React.FC = () => {
  // Initialize Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, { threshold: 0.1 });
    
    const elements = document.querySelectorAll('.fade-up');
    elements.forEach(el => observer.observe(el));
    
    return () => {
      observer.disconnect();
    };
  }, []);
  
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main>
        <HeroSection />
        <FeaturedSection />
        <CharitableInitiative />
        <HoursSection />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
