
import React, { useEffect } from 'react';
import Navbar from '@/components/ui/navbar';
import Footer from '@/components/ui/footer';
import { Button } from '@/components/ui/button';
import BlurImage from '@/components/ui/blur-image';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { 
  Building2, 
  Users, 
  Heart, 
  Clock, 
  DollarSign, 
  GraduationCap, 
  Utensils, 
  ChefHat, 
  ShoppingBag, 
  Car, 
  HeartHandshake
} from 'lucide-react';

interface JobPosition {
  id: string;
  title: string;
  department: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Contract';
  description: string;
  icon: React.ReactNode;
}

const jobPositions: JobPosition[] = [
  {
    id: 'chef-1',
    title: 'Head Chef',
    department: 'Kitchen',
    location: 'Downtown Location',
    type: 'Full-time',
    description: 'Lead our kitchen team, create new menu items, and maintain quality standards for all dishes.',
    icon: <ChefHat className="h-10 w-10 text-primary" />
  },
  {
    id: 'server-1',
    title: 'Server',
    department: 'Front of House',
    location: 'Multiple Locations',
    type: 'Full-time',
    description: 'Provide exceptional service to guests, take orders, and ensure a pleasant dining experience.',
    icon: <Utensils className="h-10 w-10 text-primary" />
  },
  {
    id: 'marketing-1',
    title: 'Marketing Specialist',
    department: 'Marketing',
    location: 'Corporate Office',
    type: 'Full-time',
    description: 'Develop and implement marketing strategies to increase brand awareness and customer engagement.',
    icon: <ShoppingBag className="h-10 w-10 text-primary" />
  },
  {
    id: 'driver-1',
    title: 'Delivery Driver',
    department: 'Operations',
    location: 'Multiple Locations',
    type: 'Part-time',
    description: 'Deliver orders promptly and safely to our customers while maintaining food quality.',
    icon: <Car className="h-10 w-10 text-primary" />
  },
  {
    id: 'manager-1',
    title: 'Restaurant Manager',
    department: 'Management',
    location: 'Suburban Location',
    type: 'Full-time',
    description: 'Oversee daily operations, staff management, and ensure guest satisfaction.',
    icon: <Building2 className="h-10 w-10 text-primary" />
  },
  {
    id: 'community-1',
    title: 'Community Relations Coordinator',
    department: 'Public Relations',
    location: 'Corporate Office',
    type: 'Full-time',
    description: 'Build partnerships with local organizations and coordinate community outreach programs.',
    icon: <HeartHandshake className="h-10 w-10 text-primary" />
  }
];

const benefits = [
  {
    icon: <DollarSign className="h-6 w-6 text-primary" />,
    title: 'Competitive Pay',
    description: 'We offer industry-leading compensation packages based on experience and performance.'
  },
  {
    icon: <Heart className="h-6 w-6 text-primary" />,
    title: 'Health Benefits',
    description: 'Comprehensive health, dental, and vision insurance for full-time employees.'
  },
  {
    icon: <Clock className="h-6 w-6 text-primary" />,
    title: 'Flexible Scheduling',
    description: 'Work-life balance matters. We offer flexible scheduling options to fit your lifestyle.'
  },
  {
    icon: <GraduationCap className="h-6 w-6 text-primary" />,
    title: 'Career Growth',
    description: 'Ongoing training and clear pathways for advancement within our organization.'
  }
];

const Careers: React.FC = () => {
  useEffect(() => {
    // Scroll to top on component mount
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section className="relative h-96">
          <div className="absolute inset-0">
            <BlurImage
              src="https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?q=80&w=2670&auto=format&fit=crop"
              alt="Team working in restaurant kitchen"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/10"></div>
          </div>
          
          <div className="relative container mx-auto px-4 h-full flex flex-col justify-center pt-20">
            <div className="max-w-3xl">
              <div className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
                Join Our Team
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Grow Your Career With Us</h1>
              <p className="text-xl text-muted-foreground max-w-xl mb-6">
                Discover meaningful work in a collaborative environment where your passion for food and service can thrive.
              </p>
              <Button size="lg" className="font-medium">
                View Open Positions
              </Button>
            </div>
          </div>
        </section>
        
        {/* Why Work With Us */}
        <section className="py-20 bg-secondary/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Why Work With Us</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                We're committed to creating a positive workplace where team members can grow, learn, and feel valued.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, idx) => (
                <div key={idx} className="text-center p-6 rounded-lg bg-card shadow-sm border border-border">
                  <div className="mx-auto flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 mb-4">
                    {benefit.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Our Culture */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
                  Our Culture
                </div>
                <h2 className="text-3xl font-bold mb-6">A Place Where You Belong</h2>
                <p className="text-muted-foreground mb-6">
                  At Tasty Hub, we believe that our team members are the heart of our success. We foster a culture of respect, 
                  creativity, and excellence, where everyone's contribution is valued.
                </p>
                <p className="text-muted-foreground mb-6">
                  We celebrate diversity and are committed to creating an inclusive environment where all team members can thrive 
                  and develop their skills. Our collaborative approach ensures that everyone has a voice in our continuous improvement efforts.
                </p>
                <div className="flex space-x-4">
                  <Users className="h-6 w-6 text-primary" />
                  <div>
                    <h4 className="font-semibold">Team-First Approach</h4>
                    <p className="text-sm text-muted-foreground">We win together and grow together</p>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg overflow-hidden h-64">
                  <BlurImage
                    src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=1954&auto=format&fit=crop"
                    alt="Team member cooking"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="rounded-lg overflow-hidden h-64">
                  <BlurImage
                    src="https://images.unsplash.com/photo-1582192730841-2a682d7375f9?q=80&w=1974&auto=format&fit=crop"
                    alt="Team members discussing menu"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="rounded-lg overflow-hidden h-64">
                  <BlurImage
                    src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2670&auto=format&fit=crop"
                    alt="Restaurant interior"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="rounded-lg overflow-hidden h-64">
                  <BlurImage
                    src="https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=2670&auto=format&fit=crop"
                    alt="Team celebrating"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Open Positions */}
        <section className="py-20 bg-secondary/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Open Positions</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                We're always looking for talented individuals to join our team. Check out our current openings below.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {jobPositions.map((job) => (
                <Card key={job.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center">
                          <div className="mr-4">
                            {job.icon}
                          </div>
                          <div>
                            <h3 className="text-xl font-bold">{job.title}</h3>
                            <p className="text-muted-foreground text-sm">{job.department} • {job.location}</p>
                          </div>
                        </div>
                        <div className="bg-primary/10 text-primary text-xs font-medium px-2.5 py-1 rounded-full">
                          {job.type}
                        </div>
                      </div>
                      <p className="text-muted-foreground mb-6">{job.description}</p>
                      <Button variant="outline" className="w-full">View Details</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <p className="text-muted-foreground mb-4">Don't see the right fit? We're always interested in meeting talented people.</p>
              <Button variant="default">
                Submit General Application
              </Button>
            </div>
          </div>
        </section>
        
        {/* Application Process */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Our Application Process</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                We've designed a straightforward process to help you find your place in our team.
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <div className="relative">
                <div className="absolute left-4 md:left-1/2 h-full w-0.5 bg-border transform md:-translate-x-1/2"></div>
                
                {[
                  {
                    step: 1,
                    title: "Apply Online",
                    description: "Submit your application through our careers portal with your resume and cover letter."
                  },
                  {
                    step: 2,
                    title: "Initial Review",
                    description: "Our hiring team will review your application and reach out if there's a potential match."
                  },
                  {
                    step: 3,
                    title: "Interview",
                    description: "Meet with our team to discuss your experience, skills, and how you might fit with our culture."
                  },
                  {
                    step: 4,
                    title: "Assessment",
                    description: "Depending on the role, you might be asked to complete a skills assessment or working interview."
                  },
                  {
                    step: 5,
                    title: "Offer & Onboarding",
                    description: "If selected, you'll receive an offer and begin our comprehensive onboarding program."
                  }
                ].map((item, index) => (
                  <div key={index} className="relative flex flex-col md:flex-row items-start mb-12">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold z-10 mb-4 md:mb-0 md:absolute md:left-1/2 md:transform md:-translate-x-1/2">
                      {item.step}
                    </div>
                    
                    <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:pr-12 md:text-right ml-12 md:ml-0' : 'md:pl-12 ml-12 md:ml-auto'}`}>
                      <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                      <p className="text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 bg-primary/5">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Join Our Team?</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Take the first step toward a rewarding career with opportunities for growth and development.
            </p>
            <Button size="lg" className="font-medium">
              Browse Open Positions
            </Button>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Careers;
