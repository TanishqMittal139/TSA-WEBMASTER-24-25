
import React, { useEffect, useState } from 'react';
import Navbar from '../components/ui/navbar';
import Footer from '../components/ui/footer';
import BlurImage from '../components/ui/blur-image';
import { cn } from '@/lib/utils';
import { Leaf, Coffee, ShoppingBag, Heart, Award } from 'lucide-react';

const About: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  // Animation on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Values section data
  const values = [
    { 
      icon: <Leaf className="h-8 w-8 text-primary" />,
      title: "Sustainability",
      description: "We're committed to reducing our environmental impact through eco-friendly practices."
    },
    { 
      icon: <Coffee className="h-8 w-8 text-primary" />,
      title: "Quality",
      description: "We source only the freshest, organic ingredients for our menu items."
    },
    { 
      icon: <ShoppingBag className="h-8 w-8 text-primary" />,
      title: "Community",
      description: "We support local farmers and contribute to our neighborhood's growth."
    },
    { 
      icon: <Heart className="h-8 w-8 text-primary" />,
      title: "Compassion",
      description: "We donate excess food to local shelters and support those in need."
    }
  ];
  
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main>
        {/* Hero Banner */}
        <section className="relative h-80">
          <div className="absolute inset-0">
            <BlurImage
              src="https://images.unsplash.com/photo-1579113800032-c38bd7635818?q=80&w=2670&auto=format&fit=crop"
              alt="About Us banner"
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
                Our Story
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">About Tasty Hub</h1>
              <p className="text-muted-foreground max-w-xl">
                Where passion for plant-based dining meets a commitment to sustainability and freshness.
              </p>
            </div>
          </div>
        </section>
        
        {/* About Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="fade-up">
                <h2 className="text-3xl font-bold mb-6">Our Approach</h2>
                <p className="text-muted-foreground mb-4">
                  At Tasty Hub, we believe that great food starts with great ingredients. That's why we've built our restaurant around the principles of farm-to-table dining, mindful preparation, and environmental responsibility.
                </p>
                <p className="text-muted-foreground mb-4">
                  Every dish we serve begins with the freshest produce sourced from local farms and trusted growers who share our dedication to sustainable agriculture. By partnering with local farmers, we not only ensure the highest quality ingredients but also support our community and reduce our carbon footprint.
                </p>
                <p className="text-muted-foreground">
                  From crisp, organic greens to ripe, seasonal vegetables, our ingredients are handpicked to bring you the best flavors nature has to offer.
                </p>
                
                <div className="mt-8 flex items-center">
                  <Award className="h-12 w-12 text-primary mr-4" />
                  <div>
                    <h3 className="font-bold text-lg">Award-Winning Cuisine</h3>
                    <p className="text-sm text-muted-foreground">Recognized for excellence in sustainable dining</p>
                  </div>
                </div>
              </div>
              
              <div className="relative h-80 md:h-96 rounded-2xl overflow-hidden shadow-xl fade-up">
                <BlurImage
                  src="https://images.unsplash.com/photo-1556911220-bff31c812dba?q=80&w=2568&auto=format&fit=crop"
                  alt="Our kitchen"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* Values */}
        <section className="py-16 bg-secondary/20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12 fade-up">
              <h2 className="text-3xl font-bold mb-4">Our Values</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our commitment to these core principles guides everything we do at Tasty Hub, from how we prepare our food to how we engage with our community.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <div key={index} className="bg-card p-6 rounded-xl shadow-md fade-up">
                  <div className="bg-primary/10 p-3 rounded-full w-fit mb-4">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Sustainability Commitment */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1 relative h-80 md:h-96 rounded-2xl overflow-hidden shadow-xl fade-up">
                <BlurImage
                  src="https://images.unsplash.com/photo-1470072508653-4fda72575ef8?q=80&w=2670&auto=format&fit=crop"
                  alt="Sustainability"
                  className="object-cover"
                />
              </div>
              
              <div className="order-1 md:order-2 fade-up">
                <h2 className="text-3xl font-bold mb-6">Sustainability at Our Core</h2>
                <p className="text-muted-foreground mb-4">
                  Sustainability isn't just a buzzword for us—it's a way of life. From our eco-friendly packaging for carry-out orders to our energy-efficient kitchen practices, we're committed to minimizing our environmental impact.
                </p>
                <p className="text-muted-foreground mb-4">
                  We compost food waste, recycle diligently, and prioritize reusable materials wherever possible. Even our coffee is ethically sourced, ensuring that every sip supports fair trade and responsible farming practices.
                </p>
                <p className="text-muted-foreground">
                  At the end of each day, extra produce gets transformed into nutritious meals that we donate to local homeless shelters and soup kitchens, ensuring nothing goes to waste while helping those in need.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
