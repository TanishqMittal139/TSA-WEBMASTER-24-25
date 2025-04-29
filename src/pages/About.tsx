import React, { useEffect, useRef } from 'react';
import Navbar from '@/components/ui/navbar';
import Footer from '@/components/ui/footer';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Leaf, Award, Utensils, Wind, Recycle, UserCheck, ChefHat, Sun, Wand2, Globe, Users, Sparkles } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '@/components/ui/carousel';
import InteractiveCard from '@/components/ui/interactive-card';
import Timeline from '@/components/about/timeline';
import ParallaxGallery from '@/components/ui/parallax-gallery';
import PageHeader from '@/components/ui/page-header';
import { Button } from '@/components/ui/button';

const About = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
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
    <div className="min-h-screen">
      <Navbar />
      
      <PageHeader
        title="About TastyHub"
        subtitle="We're not just a restaurant, we're a culinary journey focused on nutrition, sustainability, and exceptional taste."
        tag="Our Story"
        imageSrc="https://images.unsplash.com/photo-1555396273-367ea4eb4db5"
        imageAlt="About TastyHub"
      />
      
      <main className="container mx-auto px-4 py-12 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <div className="mt-12 prose prose-lg max-w-none text-foreground/90 space-y-6 fade-up">
              <p className="text-lg md:text-xl leading-relaxed">
                Founded in 2015, our mission is to transform how people experience healthy eating by making nutritious food delicious, accessible, and sustainable. We believe that food should nourish both body and planet, combining cutting-edge nutritional science with culinary artistry.
              </p>
            </div>
          </div>
          
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
          
          <div className="my-28">
            <h2 className="text-3xl font-bold mb-12 text-center fade-up">Our Journey</h2>
            <Timeline events={timelineEvents} />
          </div>
          
          <div className="my-24">
            <h2 className="text-3xl font-bold mb-12 text-center fade-up">Visualize Our Impact</h2>
            <ParallaxGallery images={galleryImages} />
          </div>
          
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
                  <div className="glassmorphism p-8 rounded-xl border border-white/20 dark:border-white/10">
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
                  
                  <div className="relative rounded-xl overflow-hidden h-full min-h-[400px]">
                    <img 
                      src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=1000&q=80" 
                      alt="Local farm harvest" 
                      className="w-full h-full object-cover"
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
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="glassmorphism p-8 rounded-xl border border-white/20 dark:border-white/10">
                    <ChefHat className="h-10 w-10 text-primary mb-4" />
                    <h3 className="text-2xl font-bold mb-4">Culinary Excellence</h3>
                    <p className="mb-6 text-foreground/90">
                      Our culinary team includes flavor scientists who use natural techniques to enhance taste without artificial additives. We employ fermentation, aging, and molecular gastronomy to create complex flavor profiles while maintaining nutritional integrity.
                    </p>
                    <div className="grid grid-cols-1 gap-4">
                      <div className="flex items-center gap-3">
                        <Sun className="h-5 w-5 text-primary flex-shrink-0" />
                        <span>Specialized low-temperature cooking preserves nutrients</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Wand2 className="h-5 w-5 text-primary flex-shrink-0" />
                        <span>Innovative techniques for maximum flavor</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="relative rounded-xl overflow-hidden h-full min-h-[400px]">
                    <img 
                      src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1000&q=80" 
                      alt="Chef preparing fresh ingredients" 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent flex items-end">
                      <div className="p-6">
                        <h4 className="text-xl font-bold text-white mb-2">Quality Equipment & Processes</h4>
                        <p className="text-white/90">Our commitment to quality extends to our kitchen equipment. We've invested in state-of-the-art tools that allow precise control over cooking parameters.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="sustainability" className="animate-fade-in">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="glassmorphism p-8 rounded-xl border border-white/20 dark:border-white/10">
                    <Recycle className="h-10 w-10 text-primary mb-4" />
                    <h3 className="text-2xl font-bold mb-4">Environmental Commitment</h3>
                    <p className="mb-6 text-foreground/90">
                      We've implemented a comprehensive sustainability program that has reduced our environmental impact by over 65% compared to industry standards. Our kitchens use water-recycling systems and all locations operate on 100% renewable energy.
                    </p>
                    <div className="grid grid-cols-1 gap-4">
                      <div className="flex items-center gap-3">
                        <Wind className="h-5 w-5 text-primary flex-shrink-0" />
                        <span>Carbon-neutral delivery program</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Globe className="h-5 w-5 text-primary flex-shrink-0" />
                        <span>Zero landfill waste at all locations</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="relative rounded-xl overflow-hidden h-full min-h-[400px]">
                    <img 
                      src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1000&q=80" 
                      alt="Sustainable farming practices" 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent flex items-end">
                      <div className="p-6">
                        <h4 className="text-xl font-bold text-white mb-2">Regenerative Agriculture</h4>
                        <p className="text-white/90">Our partners use farming practices that build soil health, increase biodiversity, and sequester carbon, creating a positive environmental impact.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
