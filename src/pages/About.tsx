
import React, { useEffect, useRef } from 'react';
import Navbar from '../components/ui/navbar';
import Footer from '../components/ui/footer';
import BlurImage from '../components/ui/blur-image';
import { Heart, Leaf, Recycle, Users } from 'lucide-react';
import { cn } from '@/lib/utils';

const values = [
  {
    icon: <Leaf className="w-6 h-6" />,
    title: 'Farm-to-Table Freshness',
    description: 'Every dish begins with the freshest produce sourced from local farms and trusted growers who share our dedication to sustainable agriculture.'
  },
  {
    icon: <Recycle className="w-6 h-6" />,
    title: 'Sustainability at Our Core',
    description: 'From eco-friendly packaging to energy-efficient kitchen practices, we're committed to minimizing our environmental impact.'
  },
  {
    icon: <Heart className="w-6 h-6" />,
    title: 'Mindful Preparation',
    description: 'Our kitchen is a place of creativity and care. We avoid artificial additives and processed foods, focusing on wholesome, plant-based recipes.'
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: 'Community Support',
    description: 'Extra produce at the end of the day gets made into food to donate to homeless shelters and soup kitchens, supporting those in need.'
  }
];

const About: React.FC = () => {
  const sectionsRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, { threshold: 0.1 });
    
    const staggerObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        const items = entries[0].target.querySelectorAll('.stagger-item');
        items.forEach((item, i) => {
          setTimeout(() => {
            item.classList.add('is-visible');
          }, i * 100);
        });
      }
    }, { threshold: 0.1 });
    
    const fadeElements = document.querySelectorAll('.fade-up');
    fadeElements.forEach(el => observer.observe(el));
    
    const staggerContainers = document.querySelectorAll('.stagger-container');
    staggerContainers.forEach(el => staggerObserver.observe(el));
    
    return () => {
      observer.disconnect();
      staggerObserver.disconnect();
    };
  }, []);
  
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main ref={sectionsRef}>
        {/* Hero Section */}
        <section className="pt-32 pb-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-accent -z-10"></div>
          
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4 fade-up">
                Our Story
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 fade-up">
                Welcome to Tasty Hub
              </h1>
              <p className="text-lg text-muted-foreground mb-8 fade-up">
                Where passion for plant-based dining meets a commitment to sustainability and freshness. 
                At our core, we believe that great food starts with great ingredients, and that's why 
                we've built our restaurant around the principles of farm-to-table dining, mindful 
                preparation, and environmental responsibility.
              </p>
            </div>
          </div>
        </section>
        
        {/* Values Section */}
        <section className="py-20">
          <div className="container-custom">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4 fade-up">Our Core Values</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto fade-up">
                Our philosophy is built on a foundation of mindful practices and a deep commitment to quality, 
                sustainability, and community impact.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 stagger-container">
              {values.map((value, index) => (
                <div 
                  key={index}
                  className="stagger-item bg-white rounded-xl p-6 shadow-md hover-lift"
                >
                  <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Mission Section */}
        <section className="py-20 bg-accent">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="order-2 lg:order-1">
                <div className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4 fade-up">
                  Our Mission
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 fade-up">
                  Sustainable Food, <br />Sustainable Future
                </h2>
                <div className="prose text-muted-foreground max-w-none fade-up">
                  <p>
                    At Tasty Hub, we're more than just a restaurant—we're a community of food lovers, 
                    environmental stewards, and advocates for healthy living. Whether you're joining us for a 
                    dine-in experience or grabbing a quick carry-out meal, you can trust that your food is made 
                    with integrity, care, and a deep respect for the planet.
                  </p>
                  <p>
                    We believe that food waste is a solvable problem. That's why at the end of each day, our 
                    extra produce is transformed into nutritious meals donated to local homeless shelters and 
                    soup kitchens. This practice not only reduces waste but also helps nourish those in need 
                    within our community.
                  </p>
                  <p>
                    Our commitment to sustainability extends to every aspect of our operation—from the farms 
                    we partner with to the packaging we use and the energy choices we make. We're constantly 
                    seeking ways to reduce our environmental footprint while delivering exceptional food and 
                    experiences.
                  </p>
                </div>
              </div>
              
              <div className="order-1 lg:order-2 fade-up">
                <div className="relative rounded-2xl overflow-hidden shadow-xl h-[500px]">
                  <BlurImage
                    src="https://images.unsplash.com/photo-1445282768818-728615cc910a?q=80&w=2670&auto=format&fit=crop"
                    alt="Team members preparing food in sustainable kitchen"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* ECO Materials Section */}
        <section className="py-20">
          <div className="container-custom">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4 fade-up">Pure Eco-Friendly Material Usage</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto fade-up">
                We take pride in our commitment to using sustainable, eco-friendly materials throughout our operations.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 stagger-container">
              <div className="stagger-item bg-white rounded-xl overflow-hidden shadow-md hover-lift">
                <div className="h-48 relative">
                  <BlurImage
                    src="https://images.unsplash.com/photo-1605367177286-f035fa99aac9?q=80&w=2670&auto=format&fit=crop"
                    alt="Biodegradable takeout containers"
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">Biodegradable Packaging</h3>
                  <p className="text-muted-foreground">
                    All our takeout containers, utensils, and bags are made from plant-based, 
                    biodegradable materials that decompose naturally without harming the environment.
                  </p>
                </div>
              </div>
              
              <div className="stagger-item bg-white rounded-xl overflow-hidden shadow-md hover-lift">
                <div className="h-48 relative">
                  <BlurImage
                    src="https://images.unsplash.com/photo-1558642891-54be180ea339?q=80&w=2434&auto=format&fit=crop"
                    alt="Recycled paper products"
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">Recycled Materials</h3>
                  <p className="text-muted-foreground">
                    Our menus, napkins, and other paper products are made from 100% recycled materials, 
                    reducing the demand for new paper production and saving trees.
                  </p>
                </div>
              </div>
              
              <div className="stagger-item bg-white rounded-xl overflow-hidden shadow-md hover-lift">
                <div className="h-48 relative">
                  <BlurImage
                    src="https://images.unsplash.com/photo-1603395785100-24e8134c66dc?q=80&w=2662&auto=format&fit=crop"
                    alt="Energy efficient kitchen"
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">Energy Efficiency</h3>
                  <p className="text-muted-foreground">
                    Our kitchens are equipped with energy-efficient appliances, LED lighting, and 
                    water-saving fixtures to minimize our resource consumption.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 bg-primary text-white">
          <div className="container-custom text-center fade-up">
            <h2 className="text-3xl font-bold mb-6">Join Us in Making a Difference</h2>
            <p className="max-w-2xl mx-auto mb-8">
              When you choose Tasty Hub, you're not just enjoying delicious plant-based food—you're 
              supporting a mission to create a more sustainable food system and community.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="/menu" className="button-outline !border-white !text-white hover:!bg-white/20">
                See Our Menu
              </a>
              <a href="/find-location" className="button-outline !border-white !text-white hover:!bg-white/20">
                Find a Location
              </a>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
