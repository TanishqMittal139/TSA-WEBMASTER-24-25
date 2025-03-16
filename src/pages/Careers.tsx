
import React, { useEffect, useState } from 'react';
import Navbar from '@/components/ui/navbar';
import Footer from '@/components/ui/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';
import { MapPin, Users, DollarSign, ThumbsUp, Clock, Coffee, ChefHat, Utensils, Truck, Headphones } from 'lucide-react';
import BlurImage from '@/components/ui/blur-image';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

interface JobPosition {
  id: string;
  title: string;
  location: string;
  type: string;
  salary: string;
  department: string;
  description: string;
  requirements: string[];
  benefits: string[];
  icon: React.ReactNode;
}

const positions: JobPosition[] = [
  {
    id: 'chef',
    title: 'Head Chef',
    location: 'Arlington, VA',
    type: 'Full-time',
    salary: '$60,000 - $75,000/year',
    department: 'Kitchen',
    description: 'We are looking for an experienced Head Chef to lead our kitchen team and create innovative dishes that showcase local ingredients.',
    requirements: [
      'Minimum 3 years of experience in a similar role',
      'Culinary degree or equivalent experience',
      'Strong leadership and communication skills',
      'Knowledge of food safety regulations',
      'Passion for sustainable cooking practices'
    ],
    benefits: [
      'Health, dental, and vision insurance',
      'Paid time off',
      'Employee meal program',
      'Career growth opportunities',
      'Professional development support'
    ],
    icon: <ChefHat />
  },
  {
    id: 'server',
    title: 'Server',
    location: 'Arlington, VA',
    type: 'Full-time / Part-time',
    salary: '$15-20/hour + tips',
    department: 'Front of House',
    description: 'Join our team as a server to provide exceptional service to our guests while showcasing our menu and creating memorable dining experiences.',
    requirements: [
      'Previous serving experience preferred',
      'Excellent communication and interpersonal skills',
      'Ability to work in a fast-paced environment',
      'Knowledge of food and beverages',
      'Team player attitude'
    ],
    benefits: [
      'Flexible scheduling',
      'Health insurance (full-time)',
      'Employee meal program',
      'Growth opportunities',
      'Tip-sharing program'
    ],
    icon: <Utensils />
  },
  {
    id: 'delivery',
    title: 'Delivery Driver',
    location: 'Arlington, VA',
    type: 'Part-time',
    salary: '$16-18/hour + tips',
    department: 'Operations',
    description: 'We need reliable delivery drivers to ensure our customers receive their orders promptly and with a smile.',
    requirements: [
      'Valid driver\'s license with clean driving record',
      'Reliable vehicle',
      'Knowledge of local area',
      'Customer service skills',
      'Ability to lift up to 30 pounds'
    ],
    benefits: [
      'Flexible scheduling',
      'Fuel reimbursement',
      'Employee meal program',
      'Tip-sharing program',
      'Vehicle maintenance allowance'
    ],
    icon: <Truck />
  },
  {
    id: 'barista',
    title: 'Barista',
    location: 'Arlington, VA',
    type: 'Full-time / Part-time',
    salary: '$15-17/hour + tips',
    department: 'Café',
    description: 'Create exceptional coffee beverages and provide friendly service to our café customers.',
    requirements: [
      'Previous barista experience preferred',
      'Knowledge of coffee preparation techniques',
      'Customer service skills',
      'Ability to work mornings',
      'Passion for coffee culture'
    ],
    benefits: [
      'Flexible scheduling',
      'Health insurance (full-time)',
      'Employee meal program',
      'Coffee education opportunities',
      'Tip-sharing program'
    ],
    icon: <Coffee />
  },
  {
    id: 'customer-service',
    title: 'Customer Service Representative',
    location: 'Arlington, VA',
    type: 'Full-time',
    salary: '$38,000 - $45,000/year',
    department: 'Operations',
    description: 'Handle customer inquiries, process orders, and ensure exceptional customer satisfaction across all communication channels.',
    requirements: [
      'Previous customer service experience',
      'Excellent communication skills',
      'Problem-solving abilities',
      'Basic computer skills',
      'Multitasking capabilities'
    ],
    benefits: [
      'Health, dental, and vision insurance',
      'Paid time off',
      'Employee meal program',
      'Career advancement opportunities',
      '401(k) program with company match'
    ],
    icon: <Headphones />
  }
];

const benefits = [
  {
    icon: <DollarSign className="h-6 w-6 text-primary" />,
    title: 'Competitive Pay',
    description: 'We offer industry-leading compensation and regular performance-based raises.'
  },
  {
    icon: <ThumbsUp className="h-6 w-6 text-primary" />,
    title: 'Health Benefits',
    description: 'Comprehensive health, dental, and vision insurance for full-time employees.'
  },
  {
    icon: <Clock className="h-6 w-6 text-primary" />,
    title: 'Work-Life Balance',
    description: 'Flexible scheduling and paid time off to ensure you have time to recharge.'
  },
  {
    icon: <Users className="h-6 w-6 text-primary" />,
    title: 'Team Culture',
    description: 'Join a collaborative, diverse team that feels like family.'
  }
];

const Careers: React.FC = () => {
  const [activePosition, setActivePosition] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isApplying, setIsApplying] = useState(false);
  const [applicationData, setApplicationData] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',
    resume: null as File | null,
    coverLetter: ''
  });

  // Scroll to top on component mount with smooth behavior
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []);
  
  // Animation on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  const handleApply = (jobId: string) => {
    setIsApplying(true);
    setApplicationData(prev => ({ ...prev, position: jobId }));
    
    // Scroll to application form
    setTimeout(() => {
      const element = document.getElementById('application-form');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setApplicationData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setApplicationData(prev => ({ ...prev, resume: e.target.files![0] }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send the form data to a server
    toast({
      title: "Application Submitted",
      description: "Thank you for your interest! We'll review your application and contact you soon.",
      duration: 5000,
    });
    
    setIsApplying(false);
    setApplicationData({
      name: '',
      email: '',
      phone: '',
      position: '',
      resume: null,
      coverLetter: ''
    });
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-80">
          <div className="absolute inset-0">
            <BlurImage
              src="https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?q=80&w=2670&auto=format&fit=crop"
              alt="Careers at Tasty Hub"
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
                Join Our Team
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">Careers at Tasty Hub</h1>
              <p className="text-muted-foreground max-w-xl">
                Join our passionate team dedicated to providing exceptional dining experiences in Virginia.
              </p>
            </div>
          </div>
        </section>
        
        {/* Why Join Us Section */}
        <section className="py-16 bg-secondary/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Why Join Our Team?</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                At Tasty Hub, we believe that our team members are our greatest asset. Here's why you should consider joining us:
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {benefits.map((benefit, index) => (
                <div key={index} className="bg-card p-6 rounded-xl shadow-sm border border-border/50 hover:shadow-md transition-shadow">
                  <div className="mb-4">{benefit.icon}</div>
                  <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-muted-foreground text-sm">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Open Positions */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Current Openings</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Explore our current job openings and find the perfect role for your skills and passion.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {positions.map((position) => (
                <Card key={position.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  <CardHeader className="bg-secondary/30 pb-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl">{position.title}</CardTitle>
                        <div className="flex items-center text-sm text-muted-foreground mt-1">
                          <MapPin size={14} className="mr-1" /> {position.location}
                        </div>
                      </div>
                      <div className="bg-primary/10 p-2 rounded-md text-primary">
                        {position.icon}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="space-y-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">{position.type}</span>
                        <span className="font-medium">{position.salary}</span>
                      </div>
                      
                      <p className="text-sm text-muted-foreground">{position.description}</p>
                      
                      <div className="flex items-center justify-between pt-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setActivePosition(activePosition === position.id ? null : position.id)}
                        >
                          {activePosition === position.id ? "Less Details" : "More Details"}
                        </Button>
                        
                        <Button 
                          variant="default" 
                          size="sm"
                          onClick={() => handleApply(position.id)}
                        >
                          Apply Now
                        </Button>
                      </div>
                      
                      {activePosition === position.id && (
                        <div className="pt-4 space-y-4 border-t border-border/50 mt-4">
                          <div>
                            <h4 className="text-sm font-medium mb-2">Requirements</h4>
                            <ul className="text-sm text-muted-foreground space-y-1">
                              {position.requirements.map((req, index) => (
                                <li key={index} className="flex items-start">
                                  <span className="text-primary mr-2">•</span>
                                  <span>{req}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          
                          <div>
                            <h4 className="text-sm font-medium mb-2">Benefits</h4>
                            <ul className="text-sm text-muted-foreground space-y-1">
                              {position.benefits.map((benefit, index) => (
                                <li key={index} className="flex items-start">
                                  <span className="text-primary mr-2">•</span>
                                  <span>{benefit}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        
        {/* Application Form */}
        {isApplying && (
          <section className="py-16 bg-secondary/30" id="application-form">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-3xl font-bold mb-8 text-center">Apply Now</h2>
                
                <Card>
                  <CardContent className="pt-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          <Input 
                            id="name" 
                            name="name" 
                            placeholder="John Doe" 
                            required
                            value={applicationData.name}
                            onChange={handleInputChange}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address</Label>
                          <Input 
                            id="email" 
                            name="email" 
                            type="email" 
                            placeholder="john@example.com" 
                            required
                            value={applicationData.email}
                            onChange={handleInputChange}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input 
                            id="phone" 
                            name="phone" 
                            placeholder="(703) 555-1234" 
                            required
                            value={applicationData.phone}
                            onChange={handleInputChange}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="position">Position</Label>
                          <select 
                            id="position"
                            name="position"
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            required
                            value={applicationData.position}
                            onChange={e => setApplicationData(prev => ({ ...prev, position: e.target.value }))}
                          >
                            <option value="" disabled>Select a position</option>
                            {positions.map(pos => (
                              <option key={pos.id} value={pos.id}>{pos.title}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="resume">Resume/CV</Label>
                        <Input 
                          id="resume" 
                          name="resume" 
                          type="file" 
                          accept=".pdf,.doc,.docx" 
                          required
                          onChange={handleFileChange}
                        />
                        <p className="text-xs text-muted-foreground">Upload your resume (PDF, DOC, or DOCX)</p>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="coverLetter">Cover Letter</Label>
                        <Textarea 
                          id="coverLetter" 
                          name="coverLetter" 
                          placeholder="Tell us why you're a great fit for this position..." 
                          rows={6}
                          value={applicationData.coverLetter}
                          onChange={handleInputChange}
                        />
                      </div>
                      
                      <div className="flex justify-end space-x-4">
                        <Button 
                          type="button" 
                          variant="outline"
                          onClick={() => setIsApplying(false)}
                        >
                          Cancel
                        </Button>
                        <Button type="submit">Submit Application</Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
        )}
        
        {/* Call to Action */}
        <section className="py-16 bg-secondary">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Don't See a Position That Fits?</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              We're always looking for talented individuals to join our team. Send us your resume and we'll keep it on file for future opportunities.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/about"
                className="inline-block bg-secondary-foreground/10 text-foreground px-8 py-3 rounded-md font-medium hover:bg-secondary-foreground/20 transition-colors"
              >
                Learn About Us
              </Link>
              <a
                href="mailto:careers@tastyhub.com" 
                className="inline-block bg-primary text-primary-foreground px-8 py-3 rounded-md font-medium hover:bg-primary/90 transition-colors"
              >
                Email Your Resume
              </a>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Careers;
