import React from 'react';
import { Check, Clock, DollarSign, MapPin, Heart, Send, ArrowRight } from 'lucide-react';
import Navbar from '@/components/ui/navbar';
import Footer from '@/components/ui/footer';
import PageHeader from '@/components/ui/page-header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import BlurImage from '@/components/ui/blur-image';

const Careers: React.FC = () => {
  const { toast } = useToast();
  
  const openPositions = [
    {
      title: "Head Chef",
      department: "Kitchen",
      location: "Arlington, VA",
      type: "Full-time",
      salary: "$65,000 - $80,000",
      posted: "3 days ago",
      description: "We're looking for an experienced Head Chef to lead our kitchen team, develop new menu items, and maintain our high standards of quality and presentation."
    },
    {
      title: "Server",
      department: "Front of House",
      location: "Arlington, VA",
      type: "Part-time / Full-time",
      salary: "$20-25/hr (incl. tips)",
      posted: "1 week ago",
      description: "Join our front-of-house team as a Server, providing exceptional customer service, taking orders, and ensuring our guests have an amazing dining experience."
    },
    {
      title: "Pastry Chef",
      department: "Kitchen",
      location: "Arlington, VA",
      type: "Full-time",
      salary: "$55,000 - $65,000",
      posted: "2 weeks ago",
      description: "Looking for a creative Pastry Chef to design and prepare desserts, baked goods, and sweet treats that complement our menu and delight our customers."
    },
    {
      title: "Barista",
      department: "Coffee Bar",
      location: "Arlington, VA",
      type: "Part-time",
      salary: "$18-22/hr (incl. tips)",
      posted: "5 days ago",
      description: "We need an enthusiastic Barista with excellent coffee-making skills and customer service abilities to prepare and serve specialty coffee drinks."
    }
  ];
  
  const benefits = [
    { icon: <DollarSign className="h-5 w-5" />, title: "Competitive Pay", description: "Above-market compensation for all positions" },
    { icon: <Clock className="h-5 w-5" />, title: "Flexible Scheduling", description: "Work-life balance is important to us" },
    { icon: <Heart className="h-5 w-5" />, title: "Health Benefits", description: "Medical, dental and vision for full-time staff" },
    { icon: <Check className="h-5 w-5" />, title: "Career Growth", description: "Training and advancement opportunities" },
    { icon: <MapPin className="h-5 w-5" />, title: "Great Location", description: "Easy access by public transport" },
    { icon: <Send className="h-5 w-5" />, title: "Employee Meals", description: "Free meals during shifts" }
  ];
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Application received!",
      description: "Thanks for your interest. We'll review your application and contact you soon.",
    });
  };
  
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);
  
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <PageHeader
        title="Careers at Tasty Hub"
        subtitle="Become part of our culinary family and help us create memorable dining experiences in a supportive and growth-oriented environment."
        tag="Join Our Team"
        imageSrc="https://images.unsplash.com/photo-1414235077428-338989a2e8c0"
        imageAlt="Restaurant team at work"
      />
      
      <main>
        <section className="relative h-80">
          <div className="absolute inset-0">
            <BlurImage
              src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1470&auto=format&fit=crop"
              alt="Restaurant team at work"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/10"></div>
          </div>
          
          <div className="relative container mx-auto px-4 flex flex-col justify-center h-full pt-24">
            <div className="transition-all duration-1000">
              <div className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
                Join Our Team
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-3">Careers at Tasty Hub</h1>
              <p className="text-muted-foreground max-w-xl text-sm">
                Become part of our culinary family and help us create memorable dining experiences in a supportive and growth-oriented environment.
              </p>
            </div>
          </div>
        </section>
        
        <section className="py-16 bg-secondary">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Why Work With Us?</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                At Tasty Hub, we believe our team members are the heart of our business. Here's what we offer:
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {benefits.map((benefit, index) => (
                <div 
                  key={index} 
                  className="bg-card p-6 rounded-lg shadow-sm border border-border flex items-start space-x-4"
                >
                  <div className="bg-primary/10 p-2 rounded-full text-primary">
                    {benefit.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{benefit.title}</h3>
                    <p className="text-sm text-muted-foreground">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Open Positions</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                We're looking for passionate individuals to join our team in the following roles:
              </p>
            </div>
            
            <div className="space-y-6">
              {openPositions.map((position, index) => (
                <div 
                  key={index} 
                  className="border border-border rounded-lg overflow-hidden bg-card hover:shadow-md transition-shadow"
                >
                  <div className="p-6">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-4">
                      <div>
                        <h3 className="text-xl font-semibold">{position.title}</h3>
                        <p className="text-muted-foreground text-sm">{position.department} • {position.location}</p>
                      </div>
                      <div className="space-y-1 text-right">
                        <p className="text-sm font-medium">{position.type}</p>
                        <p className="text-sm text-primary font-medium">{position.salary}</p>
                        <p className="text-xs text-muted-foreground">Posted {position.posted}</p>
                      </div>
                    </div>
                    <p className="text-muted-foreground mb-4">{position.description}</p>
                    <Button variant="outline" className="w-full md:w-auto">Apply Now</Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        <section className="py-16 bg-secondary">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Apply Now</h2>
                <p className="text-muted-foreground">
                  Don't see the perfect position? Send us your resume and we'll keep you in mind for future opportunities.
                </p>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6 bg-card p-6 rounded-lg shadow-sm border border-border">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="firstName" className="text-sm font-medium">First Name</label>
                    <Input id="firstName" required />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="lastName" className="text-sm font-medium">Last Name</label>
                    <Input id="lastName" required />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">Email</label>
                  <Input id="email" type="email" required />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-medium">Phone</label>
                  <Input id="phone" type="tel" required />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="position" className="text-sm font-medium">Position of Interest</label>
                  <select 
                    id="position" 
                    className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                    required
                  >
                    <option value="">Select a position</option>
                    {openPositions.map((position, index) => (
                      <option key={index} value={position.title}>{position.title}</option>
                    ))}
                    <option value="other">Other/General Application</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="resume" className="text-sm font-medium">Resume/CV (PDF)</label>
                  <Input id="resume" type="file" accept=".pdf" required />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="cover" className="text-sm font-medium">Cover Letter / Additional Information</label>
                  <Textarea id="cover" rows={4} />
                </div>
                
                <Button type="submit" className="w-full">Submit Application</Button>
              </form>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Careers;
