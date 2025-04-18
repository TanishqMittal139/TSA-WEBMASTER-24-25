
import React from 'react';
import Navbar from '@/components/ui/navbar';
import Footer from '@/components/ui/footer';
import Timeline from '@/components/about/timeline';
import AnimatedHeader from '@/components/ui/animated-header';
import BlurImage from '@/components/ui/blur-image';

const About = () => {
  // Define timeline events for our company history
  const timelineEvents = [
    {
      year: "2010",
      title: "Our Beginning",
      description: "TastyHub was founded with a vision to provide delicious, nutritious meals to our community."
    },
    {
      year: "2015",
      title: "Expansion",
      description: "We opened our 10th location and introduced our popular seasonal menu options."
    },
    {
      year: "2018",
      title: "Farm to Table Initiative",
      description: "We partnered with local farmers to ensure the freshest ingredients in all our dishes."
    },
    {
      year: "2020",
      title: "Sustainability Focus",
      description: "We implemented eco-friendly packaging and reduced our carbon footprint by 30%."
    },
    {
      year: "2023",
      title: "Digital Transformation",
      description: "Launched our mobile app and implemented digital ordering system for a seamless customer experience."
    },
    {
      year: "2025",
      title: "Today",
      description: "Continuing our mission to provide healthy, delicious food while supporting sustainable practices."
    }
  ];

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
          <Timeline events={timelineEvents} />
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
