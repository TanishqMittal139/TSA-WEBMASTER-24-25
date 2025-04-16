
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/ui/navbar';
import Footer from '@/components/ui/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Link as LinkIcon, Leaf, ExternalLink, Shield, Code, Server, Award, Database, Sparkles } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '@/components/ui/carousel';
import InteractiveCard from '@/components/ui/interactive-card';
import AnimatedHeader from '@/components/ui/animated-header';
import RotatingCube from '@/components/references/rotating-cube';

const References = () => {
  const cardsRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('is-visible');
            }, index * 100);
          }
        });
      },
      { threshold: 0.1 }
    );
    
    const elements = document.querySelectorAll('.stagger-item, .fade-up');
    elements.forEach(el => observer.observe(el));
    
    return () => observer.disconnect();
  }, []);

  const techStack = [
    { name: 'React', icon: Sparkles, description: 'Frontend UI library for building interactive components' },
    { name: 'Shadcn UI', icon: Code, description: 'Accessible component library built with Radix UI and Tailwind CSS' },
    { name: 'Tailwind CSS', icon: Code, description: 'Utility-first CSS framework for rapid UI development' },
    { name: 'Supabase', icon: Database, description: 'Open source Firebase alternative with all backend services' },
    { name: 'React Router', icon: LinkIcon, description: 'Declarative routing for React applications' },
    { name: 'React Context API', icon: Server, description: 'State management solution for React apps' }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/10 blur-3xl rounded-full"></div>
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-primary/5 blur-3xl rounded-full"></div>
      
      <Navbar />
      
      <main className="container mx-auto px-4 py-12 pt-28 animate-fade-in relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12 items-center mb-16">
            <div className="md:col-span-2">
              <AnimatedHeader 
                title="References & Citations"
                subtitle="Information about our technologies, resources, and documentation"
              />
            </div>
            
            <div className="flex justify-center">
              <RotatingCube size={180} className="mx-auto" />
            </div>
          </div>
          
          <Card className="mb-10 bg-background/50 backdrop-blur-sm border-white/20 dark:border-white/10 overflow-hidden relative fade-up">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 pointer-events-none"></div>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-6 w-6 text-primary animate-pulse" />
                Statement of Originality
              </CardTitle>
              <CardDescription>
                Important information about our website development
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 relative z-10">
              <p className="text-foreground/90 text-lg">
                We affirm that the template and theme used on the React framework was built by our team. 
                All components, styling, and functionality were created specifically for TastyHub by our development team.
              </p>
              <div className="w-24 h-24 bg-primary/10 rounded-full blur-3xl absolute -bottom-12 -right-12"></div>
            </CardContent>
          </Card>
          
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8 relative inline-block fade-up">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/80 to-primary/60">
                Technology Stack
              </span>
              <div className="absolute -bottom-2 left-0 w-1/2 h-1 bg-primary rounded-full"></div>
            </h2>
            
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full mb-8"
            >
              <CarouselContent>
                {techStack.map((tech, index) => (
                  <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 pl-4">
                    <InteractiveCard
                      title={tech.name}
                      icon={tech.icon}
                      className="h-full"
                    >
                      <p className="text-foreground/80">{tech.description}</p>
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
          
          <div ref={cardsRef} className="grid gap-8 md:grid-cols-2 mb-16">
            <Card className="stagger-item bg-background/50 backdrop-blur-sm border-white/20 dark:border-white/10 overflow-hidden stagger-delay-1 h-full glassmorphism">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Leaf className="h-5 w-5 text-primary" />
                  Image Usage Rights
                </CardTitle>
                <CardDescription>
                  Information about the images used on this website
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-foreground/90">
                  All images used on the TastyHub website are royalty-free and do not require citations. 
                  They have been sourced from various free stock photo libraries that provide content under 
                  permissive licenses allowing commercial and non-commercial use without attribution.
                </p>
                <p className="text-foreground/90">
                  These images have been carefully selected to represent our brand and values while respecting 
                  intellectual property rights.
                </p>
              </CardContent>
            </Card>
            
            <Card className="stagger-item bg-background/50 backdrop-blur-sm border-white/20 dark:border-white/10 overflow-hidden stagger-delay-2 h-full glassmorphism">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-primary" />
                  Development Standards
                </CardTitle>
                <CardDescription>
                  Our commitment to quality development
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-foreground/90">
                  TastyHub follows industry best practices for web development, including accessibility standards, 
                  responsive design principles, and performance optimization techniques. Our code is structured for 
                  maintainability and scalability.
                </p>
                <p className="text-foreground/90">
                  We continuously improve our application based on user feedback and emerging technologies to 
                  provide the best possible experience.
                </p>
              </CardContent>
            </Card>
          </div>
          
          <Card className="mb-16 bg-background/50 backdrop-blur-sm border-white/20 dark:border-white/10 relative overflow-hidden fade-up">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-primary/5"></div>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Academic Documentation
              </CardTitle>
              <CardDescription>
                Important documents for academic evaluation
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 relative z-10">
              <div className="grid gap-6 md:grid-cols-2">
                <Link to="/student-copyright-checklist.pdf" target="_blank" className="no-underline group">
                  <Button variant="outline" className="w-full justify-start gap-3 h-auto py-4 group-hover:border-primary/50 group-hover:shadow-md transition-all duration-300">
                    <div className="relative">
                      <FileText className="h-8 w-8 text-primary" />
                      <div className="absolute inset-0 bg-primary/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <div className="text-left">
                      <div className="font-medium text-lg group-hover:text-primary transition-colors duration-300">Student Copyright Checklist</div>
                      <div className="text-sm text-muted-foreground">Download official PDF document</div>
                    </div>
                    <ExternalLink className="h-4 w-4 ml-auto text-muted-foreground group-hover:text-primary transition-colors duration-300" />
                  </Button>
                </Link>
                
                <Link to="/work-log.pdf" target="_blank" className="no-underline group">
                  <Button variant="outline" className="w-full justify-start gap-3 h-auto py-4 group-hover:border-primary/50 group-hover:shadow-md transition-all duration-300">
                    <div className="relative">
                      <FileText className="h-8 w-8 text-primary" />
                      <div className="absolute inset-0 bg-primary/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <div className="text-left">
                      <div className="font-medium text-lg group-hover:text-primary transition-colors duration-300">Work Log</div>
                      <div className="text-sm text-muted-foreground">Download detailed project documentation</div>
                    </div>
                    <ExternalLink className="h-4 w-4 ml-auto text-muted-foreground group-hover:text-primary transition-colors duration-300" />
                  </Button>
                </Link>
              </div>
              
              <div className="mt-8 p-6 bg-background/30 backdrop-blur-sm rounded-xl border border-white/10">
                <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  Confidentiality Notice
                </h3>
                <p className="text-foreground/80">
                  These documents contain confidential academic information and are intended for evaluation purposes only. 
                  Please refer to the documents for detailed information about copyright compliance and work distribution.
                </p>
              </div>
            </CardContent>
          </Card>
          
          <div className="animate-float-rotate">
            <Card className="bg-background/50 backdrop-blur-sm border-white/20 dark:border-white/10 hover:shadow-xl transition-all duration-500 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10"></div>
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Sparkles className="h-6 w-6 text-primary" />
                  Ongoing Development
                </CardTitle>
                <CardDescription>
                  TastyHub is continuously evolving
                </CardDescription>
              </CardHeader>
              <CardContent className="relative z-10">
                <p className="text-lg mb-6">
                  Our development process is iterative and user-focused. We're constantly improving the TastyHub experience based on customer feedback and emerging technologies.
                </p>
                
                <div className="flex flex-wrap justify-center gap-4 mt-8">
                  <Button className="bg-primary hover:bg-primary/90 text-white rounded-full px-6">
                    <Shield className="mr-2 h-4 w-4" />
                    Privacy Policy
                  </Button>
                  <Button variant="outline" className="rounded-full px-6 border-primary/20 hover:border-primary/60">
                    <FileText className="mr-2 h-4 w-4" />
                    Terms of Service
                  </Button>
                </div>
                
                <div className="absolute -bottom-16 -right-16 w-48 h-48 bg-primary/10 blur-3xl rounded-full"></div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default References;
