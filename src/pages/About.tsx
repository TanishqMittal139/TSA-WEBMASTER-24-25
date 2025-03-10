
import React, { useState, useEffect } from 'react';
import Navbar from '../components/ui/navbar';
import Footer from '../components/ui/footer';
import BlurImage from '../components/ui/blur-image';
import { cn } from '@/lib/utils';
import { Building, Users, Clock, Award, Leaf, Coffee, Heart, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const About: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  // Animation on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Set up intersection observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, { threshold: 0.1 });
    
    const elements = document.querySelectorAll('.fade-up, .stagger-item');
    elements.forEach(el => observer.observe(el));
    
    return () => {
      observer.disconnect();
    };
  }, []);
  
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main>
        {/* Hero Banner */}
        <section className="relative h-80">
          <div className="absolute inset-0">
            <BlurImage
              src="https://images.unsplash.com/photo-1511920170033-f8396924c348?q=80&w=2574&auto=format&fit=crop"
              alt="About banner"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/10"></div>
          </div>
          
          <div className="relative container mx-auto px-4 flex flex-col justify-center h-full pt-24">
            <div className={cn(
              "transition-all duration-1000 transform",
              isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
            )}>
              <div className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
                About Us
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Story</h1>
              <p className="text-muted-foreground max-w-xl">
                From humble beginnings to becoming a favorite spot for food lovers - discover the Tasty Hub journey.
              </p>
            </div>
          </div>
        </section>
        
        {/* Our Story Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="fade-up">
                <h2 className="text-3xl font-bold mb-6">From Farm to Table</h2>
                <p className="text-muted-foreground mb-4">
                  Tasty Hub began in 2015 with a simple mission: to create a welcoming space where people could enjoy 
                  delicious, sustainably-sourced food and exceptional coffee.
                </p>
                <p className="text-muted-foreground mb-4">
                  Our founders, Sarah and Michael, believed that great food should be accessible to everyone without 
                  compromising on quality or environmental responsibility.
                </p>
                <p className="text-muted-foreground mb-6">
                  What started as a single location in San Francisco has grown into multiple cafés across the country, 
                  each maintaining our commitment to quality, community, and sustainability.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex items-center">
                    <div className="mr-3 text-primary">
                      <Building size={24} />
                    </div>
                    <div>
                      <div className="font-medium">6+ Locations</div>
                      <div className="text-sm text-muted-foreground">Across the country</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="mr-3 text-primary">
                      <Users size={24} />
                    </div>
                    <div>
                      <div className="font-medium">100+ Team Members</div>
                      <div className="text-sm text-muted-foreground">Passionate food lovers</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="relative rounded-lg overflow-hidden shadow-xl fade-up">
                <BlurImage
                  src="https://images.unsplash.com/photo-1453614512568-c4024d13c247?q=80&w=2232&auto=format&fit=crop"
                  alt="Café interior"
                  className="w-full h-full object-cover aspect-[4/3]"
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* Values Section */}
        <section className="py-16 bg-secondary">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-10">Our Core Values</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-card p-6 rounded-lg shadow-md stagger-item">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
                  <Leaf size={24} />
                </div>
                <h3 className="text-xl font-bold mb-2">Sustainability</h3>
                <p className="text-muted-foreground">
                  We're committed to environmentally responsible practices, from sourcing to packaging.
                </p>
              </div>
              
              <div className="bg-card p-6 rounded-lg shadow-md stagger-item">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
                  <Coffee size={24} />
                </div>
                <h3 className="text-xl font-bold mb-2">Quality</h3>
                <p className="text-muted-foreground">
                  We never compromise on the quality of our ingredients or the care put into preparing each dish.
                </p>
              </div>
              
              <div className="bg-card p-6 rounded-lg shadow-md stagger-item">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
                  <Heart size={24} />
                </div>
                <h3 className="text-xl font-bold mb-2">Community</h3>
                <p className="text-muted-foreground">
                  We strive to create spaces where people feel welcome and supported, both customers and employees.
                </p>
              </div>
              
              <div className="bg-card p-6 rounded-lg shadow-md stagger-item">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
                  <Award size={24} />
                </div>
                <h3 className="text-xl font-bold mb-2">Innovation</h3>
                <p className="text-muted-foreground">
                  We're constantly exploring new recipes, flavors, and ways to improve our customer experience.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Team Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                The passionate people behind Tasty Hub who bring our mission to life every day.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="stagger-item bg-card rounded-lg overflow-hidden shadow-md">
                <div className="h-64 relative">
                  <BlurImage
                    src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=2574&auto=format&fit=crop"
                    alt="Sarah Johnson"
                    className="object-cover object-center"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-1">Sarah Johnson</h3>
                  <p className="text-primary font-medium mb-3">Co-Founder & CEO</p>
                  <p className="text-muted-foreground text-sm">
                    With a background in sustainable agriculture, Sarah ensures our ingredients meet the highest standards.
                  </p>
                </div>
              </div>
              
              <div className="stagger-item bg-card rounded-lg overflow-hidden shadow-md">
                <div className="h-64 relative">
                  <BlurImage
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2574&auto=format&fit=crop"
                    alt="Michael Chen"
                    className="object-cover object-center"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-1">Michael Chen</h3>
                  <p className="text-primary font-medium mb-3">Co-Founder & Head Chef</p>
                  <p className="text-muted-foreground text-sm">
                    A culinary innovator with 15 years of experience, Michael brings creativity and precision to our menu.
                  </p>
                </div>
              </div>
              
              <div className="stagger-item bg-card rounded-lg overflow-hidden shadow-md">
                <div className="h-64 relative">
                  <BlurImage
                    src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=2574&auto=format&fit=crop"
                    alt="Olivia Martinez"
                    className="object-cover object-center"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-1">Olivia Martinez</h3>
                  <p className="text-primary font-medium mb-3">Head of Operations</p>
                  <p className="text-muted-foreground text-sm">
                    Olivia ensures that every Tasty Hub location runs smoothly while maintaining our high standards.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Contact Section */}
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Have questions, suggestions, or just want to say hello? We'd love to hear from you.
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-card p-8 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-4">Contact Information</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="mt-1 mr-3 text-primary">
                      <MapPin size={20} />
                    </div>
                    <div>
                      <div className="font-medium">Main Office</div>
                      <div className="text-muted-foreground">123 Market Street, San Francisco, CA 94105</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="mt-1 mr-3 text-primary">
                      <Mail size={20} />
                    </div>
                    <div>
                      <div className="font-medium">Email</div>
                      <div className="text-muted-foreground">hello@tastyhub.com</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="mt-1 mr-3 text-primary">
                      <Phone size={20} />
                    </div>
                    <div>
                      <div className="font-medium">Phone</div>
                      <div className="text-muted-foreground">(415) 555-1234</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="mt-1 mr-3 text-primary">
                      <Clock size={20} />
                    </div>
                    <div>
                      <div className="font-medium">Business Hours</div>
                      <div className="text-muted-foreground">Mon-Fri: 9:00 AM - 5:00 PM</div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8">
                  <h4 className="font-medium mb-2">Find us on social media</h4>
                  <div className="flex space-x-4">
                    <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                      Instagram
                    </a>
                    <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                      Facebook
                    </a>
                    <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                      Twitter
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="bg-card p-8 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-4">Send Us a Message</h3>
                
                <form className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-4 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="John Doe"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="john.doe@example.com"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-1">
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      className="w-full px-4 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Your message here..."
                    ></textarea>
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full bg-primary text-primary-foreground font-medium py-2 px-4 rounded-md hover:bg-primary/90 transition-colors"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
        
        {/* Call to Action */}
        <section className="py-16 bg-primary/10">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Hungry Yet?</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Visit one of our locations today and experience the Tasty Hub difference.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/menu"
                className="bg-primary text-primary-foreground px-8 py-3 rounded-md font-medium text-lg hover:bg-primary/90 transition-colors"
              >
                View Our Menu
              </Link>
              <Link
                to="/find-location"
                className="bg-card border border-input text-foreground px-8 py-3 rounded-md font-medium text-lg hover:bg-muted transition-colors"
              >
                Find a Location
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
