import React, { useEffect, useRef } from 'react';
import Navbar from '@/components/ui/navbar';
import Footer from '@/components/ui/footer';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Leaf, Award, Utensils, Wind, Recycle, UserCheck, ChefHat, Sun, Wand2, Globe, Users, Sparkles } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '@/components/ui/carousel';
import AnimatedHeader from '@/components/ui/animated-header';
import InteractiveCard from '@/components/ui/interactive-card';
import ParallaxGallery from '@/components/ui/parallax-gallery';
import Timeline from '@/components/about/timeline';

const About = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Initialize Intersection Observer for animations
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
    
    return () => observer.disconnect();
  }, []);

  const galleryImages = [
    { 
      src: "https://images.unsplash.com/photo-1464226184884-fa280b87c399", 
      alt: "Local farm harvest" 
    },
    { 
      src: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f", 
      alt: "Chef preparing fresh ingredients" 
    },
    { 
      src: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09", 
      alt: "Sustainable farming practices" 
    },
    { 
      src: "https://images.unsplash.com/photo-1504674900247-0877df9cc836", 
      alt: "Delicious plated meal" 
    },
    { 
      src: "https://images.unsplash.com/photo-1565895405138-6c3a1555da6a", 
      alt: "Farm to table organic produce" 
    },
    { 
      src: "https://images.unsplash.com/photo-1488459716781-31db52582fe9", 
      alt: "Local community garden" 
    }
  ];
  
  const timelineEvents = [
    {
      year: "2015",
      title: "Foundation",
      description: "TastyHub was founded with the mission to transform how people experience healthy eating by making nutritious food delicious and accessible."
    },
    {
      year: "2017",
      title: "Farm Partnerships",
      description: "Established direct relationships with over 35 local farms within a 100-mile radius of our restaurants, ensuring peak freshness of ingredients."
    },
    {
      year: "2019",
      title: "Sustainability Initiative",
      description: "Launched our zero-waste program and transitioned to 100% renewable energy across all locations."
    },
    {
      year: "2021",
      title: "Culinary Innovation",
      description: "Introduced proprietary cooking techniques that preserve nutrients while enhancing flavor profiles."
    },
    {
      year: "2023",
      title: "Community Growth",
      description: "Expanded to 15 locations nationwide while maintaining our commitment to local sourcing and sustainability."
    }
  ];

  const coreValues = [
    { title: "Quality", icon: Award, description: "We source only the finest ingredients for exceptional taste and nutrition." },
    { title: "Sustainability", icon: Recycle, description: "Our practices prioritize environmental health and ecological balance." },
    { title: "Innovation", icon: Sparkles, description: "We continuously explore new ways to enhance flavor while maximizing nutrition." },
    { title: "Community", icon: Users, description: "We foster connections between farmers, chefs, and customers." },
    { title: "Transparency", icon: Globe, description: "We openly share our sourcing, methods, and environmental impact." }
  ];

  return (
    <div className="min-h-screen" ref={containerRef}>
      <Navbar />
      
      <main className="container mx-auto px-4 py-12 pt-28 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="mb-16">
            <AnimatedHeader 
              title="About TastyHub" 
              subtitle="We're not just a restaurant, we're a culinary journey focused on nutrition, sustainability, and exceptional taste."
            />
            
            <div className="mt-12 prose prose-lg max-w-none text-foreground/90 space-y-6 fade-up">
              <p className="text-lg md:text-xl leading-relaxed">
                Founded in 2015, our mission is to transform how people experience healthy eating by making nutritious food delicious, accessible, and sustainable. We believe that food should nourish both body and planet, combining cutting-edge nutritional science with culinary artistry.
              </p>
            </div>
          </div>
          
          {/* Core Values Carousel */}
          <div className="my-20 fade-up">
            <h2 className="text-3xl font-bold mb-8 text-center">Our Core Values</h2>
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent>
                {coreValues.map((value, index) => (
                  <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 pl-4">
                    <InteractiveCard
                      title={value.title}
                      icon={value.icon}
                      delay={index}
                      className="h-full"
                    >
                      <div className="text-foreground/80">
                        {value.description}
                      </div>
                      <div className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full bg-primary/10 blur-2xl"></div>
                    </InteractiveCard>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="flex justify-center mt-6 space-x-4">
                <CarouselPrevious className="relative static border-primary/20 hover:bg-primary hover:text-primary-foreground" />
                <CarouselNext className="relative static border-primary/20 hover:bg-primary hover:text-primary-foreground" />
              </div>
            </Carousel>
          </div>
          
          {/* Timeline Section */}
          <div className="my-28">
            <h2 className="text-3xl font-bold mb-12 text-center fade-up">Our Journey</h2>
            <Timeline events={timelineEvents} />
          </div>
          
          {/* Image Gallery */}
          <div className="my-24">
            <h2 className="text-3xl font-bold mb-12 text-center fade-up">Visualize Our Impact</h2>
            <ParallaxGallery images={galleryImages} />
          </div>
          
          {/* Tabbed Content Section */}
          <div className="my-24 fade-up">
            <h2 className="text-3xl font-bold mb-12 text-center">How We Deliver Excellence</h2>
            <Tabs defaultValue="farm-to-table" className="w-full">
              <TabsList className="mb-8 flex flex-wrap justify-center bg-background/20 backdrop-blur-md p-1 rounded-xl border border-white/10 w-full overflow-x-auto">
                <TabsTrigger value="farm-to-table" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  Farm-to-Table
                </TabsTrigger>
                <TabsTrigger value="preparation" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  Preparation Process
                </TabsTrigger>
                <TabsTrigger value="sustainability" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  Sustainability
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="farm-to-table" className="animate-fade-in">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="glassmorphism p-8 rounded-xl border border-white/20 dark:border-white/10 animate-float">
                    <Leaf className="h-10 w-10 text-primary mb-4" />
                    <h3 className="text-2xl font-bold mb-4">Our Farm-to-Table Commitment</h3>
                    <p className="mb-6 text-foreground/90">
                      TastyHub's farm-to-table philosophy goes beyond a trendy phrase—it's the foundation of our culinary approach. We've established direct relationships with over 35 local farms within a 100-mile radius of our restaurants, ensuring ingredients reach our kitchens within 24 hours of harvest.
                    </p>
                    <div className="grid grid-cols-1 gap-4">
                      <div className="flex items-center gap-3">
                        <UserCheck className="h-5 w-5 text-primary flex-shrink-0" />
                        <span>Direct farmer partnerships eliminating middlemen</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Award className="h-5 w-5 text-primary flex-shrink-0" />
                        <span>Premium prices to support sustainable farming</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="relative rounded-xl overflow-hidden h-full min-h-[400px] group">
                    <img 
                      src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=1000&q=80" 
                      alt="Local farm harvest" 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent flex items-end">
                      <div className="p-6">
                        <h4 className="text-xl font-bold text-white mb-2">Seasonal Sourcing</h4>
                        <p className="text-white/90">Our seasonal rotating menu is based on what's available locally, ensuring peak nutrition and flavor while reducing our carbon footprint.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="preparation" className="animate-fade-in">
                <div className="grid md:grid-cols-3 gap-6">
                  <InteractiveCard
                    title="Nutrient Preservation"
                    icon={Sun}
                    delay={1}
                  >
                    <p>
                      We use specialized low-temperature cooking methods that preserve heat-sensitive vitamins and beneficial plant compounds. Our preparation times are carefully controlled to maximize nutrient bioavailability.
                    </p>
                  </InteractiveCard>
                  
                  <InteractiveCard
                    title="Flavor Innovation"
                    icon={Wand2}
                    delay={2}
                  >
                    <p>
                      Our culinary team includes flavor scientists who use natural techniques to enhance taste without artificial additives. We employ fermentation, aging, and molecular gastronomy to create complex flavor profiles.
                    </p>
                  </InteractiveCard>
                  
                  <InteractiveCard
                    title="Made-to-Order"
                    icon={Utensils}
                    delay={3}
                  >
                    <p>
                      Every dish is prepared to order, ensuring maximum freshness. We've implemented efficient kitchen workflows that allow for custom preparation without compromising speed of service.
                    </p>
                  </InteractiveCard>
                </div>
                
                <div className="mt-12 relative rounded-xl overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80" 
                    alt="Chef preparing fresh ingredients" 
                    className="w-full object-cover aspect-video"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent flex items-end">
                    <div className="p-8 max-w-2xl">
                      <h3 className="text-2xl font-bold text-white mb-3">Quality Equipment & Processes</h3>
                      <p className="text-white/90">Our commitment to quality extends to our kitchen equipment. We've invested in state-of-the-art tools that allow precise control over cooking parameters, ensuring consistent quality in every meal we serve.</p>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="sustainability" className="animate-fade-in">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <div className="relative h-full">
                      <img 
                        src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1000&q=80" 
                        alt="Sustainable farming practices" 
                        className="rounded-xl h-full object-cover"
                      />
                      <div className="absolute inset-0 backdrop-blur-[2px] opacity-0 hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                        <div className="bg-background/80 p-6 max-w-md rounded-xl">
                          <h4 className="text-xl font-bold mb-2">Regenerative Agriculture</h4>
                          <p>Our partners use farming practices that build soil health, increase biodiversity, and sequester carbon, creating a positive environmental impact with every meal we serve.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <InteractiveCard
                      title="Carbon Footprint Reduction"
                      icon={Wind}
                      delay={1}
                    >
                      <ul className="space-y-2 list-disc pl-5">
                        <li>100% renewable energy in all locations</li>
                        <li>Carbon-neutral delivery program</li>
                        <li>80% reduction in food miles through local sourcing</li>
                        <li>Annual carbon audit with published results</li>
                      </ul>
                    </InteractiveCard>
                    
                    <InteractiveCard
                      title="Waste Reduction"
                      icon={Recycle}
                      delay={2}
                    >
                      <ul className="space-y-2 list-disc pl-5">
                        <li>Zero landfill waste program at all locations</li>
                        <li>Comprehensive composting system</li>
                        <li>Biodegradable packaging made from reclaimed agricultural waste</li>
                        <li>Creative usage of vegetable trimmings in stocks and sauces</li>
                      </ul>
                    </InteractiveCard>
                  </div>
                </div>
                
                <div className="mt-12 p-6 bg-background/50 backdrop-blur-md rounded-xl border border-white/20 dark:border-white/10">
                  <div className="prose prose-lg max-w-none text-foreground/90">
                    <p>
                      We've implemented a water conservation program that has reduced our water usage by 65% compared to industry standards. Our kitchens use water-recycling systems and high-efficiency fixtures throughout our facilities.
                    </p>
                    <p>
                      TastyHub is a founding member of the Sustainable Restaurant Coalition, helping to develop industry-wide standards for environmental responsibility. We transparently share our sustainability metrics through annual impact reports available on our website.
                    </p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Contact Section */}
          <div className="my-20 relative overflow-hidden rounded-2xl border border-white/20 dark:border-white/10 fade-up">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-primary/10 pointer-events-none"></div>
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-primary/20 blur-3xl rounded-full pointer-events-none"></div>
            <div className="absolute -top-20 -left-20 w-64 h-64 bg-primary/10 blur-3xl rounded-full pointer-events-none"></div>
            
            <div className="relative z-10 p-8 md:p-12">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-3xl font-bold mb-4">Connect With Us</h2>
                <p className="text-lg mb-8">We'd love to hear from you! Reach out with questions or to learn more about TastyHub.</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div className="p-6 bg-background/40 backdrop-blur-md rounded-xl border border-white/10 hover:border-primary/50 transition-colors duration-300">
                    <h3 className="text-xl font-bold mb-3">General Inquiries</h3>
                    <p className="text-foreground/80 hover:text-primary transition-colors">info@tastyhub.com</p>
                    <p className="text-foreground/80 hover:text-primary transition-colors">(804) 123-4567</p>
                  </div>
                  
                  <div className="p-6 bg-background/40 backdrop-blur-md rounded-xl border border-white/10 hover:border-primary/50 transition-colors duration-300">
                    <h3 className="text-xl font-bold mb-3">Visit Our Headquarters</h3>
                    <p className="text-foreground/80">123 Nutrition Avenue</p>
                    <p className="text-foreground/80">Richmond, VA 23219</p>
                  </div>
                </div>
                
                <Button className="bg-primary hover:bg-primary/90 text-white px-8 py-6 h-auto text-lg rounded-full">
                  Send Us a Message
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
