
import React from 'react';
import Navbar from '@/components/ui/navbar';
import Footer from '@/components/ui/footer';
import BlurImage from '@/components/ui/blur-image';
import ContactForm from '@/components/ui/contact-form';
import { Award, Coffee, Users, Heart, MapPin, Phone, Mail, Clock } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <section className="relative h-80">
          <div className="absolute inset-0">
            <BlurImage
              src="https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?q=80&w=2070&auto=format&fit=crop"
              alt="About Us"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/10"></div>
          </div>
          
          <div className="relative container mx-auto px-4 flex flex-col justify-center h-full pt-24">
            <div className="max-w-2xl">
              <div className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
                Our Story
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">About Tasty Hub</h1>
              <p className="text-muted-foreground max-w-xl">
                Serving delicious food with sustainable practices since 2008.
              </p>
            </div>
          </div>
        </section>
        
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
                <p className="text-lg mb-6">
                  At Tasty Hub, we believe that food should be both delicious and responsible. Our mission is to create exceptional dining experiences while maintaining a commitment to sustainability, ethical sourcing, and community support.
                </p>
                <p className="text-lg mb-6">
                  Founded in 2008, we've grown from a small coffee shop to multiple locations across Virginia, but our core values remain the same: quality ingredients, exceptional service, and a positive impact on our world.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
                  <div className="flex items-start">
                    <div className="bg-primary/10 p-3 rounded-lg mr-4">
                      <Coffee className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Quality First</h3>
                      <p className="text-muted-foreground text-sm">We source the finest ingredients for our dishes.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-primary/10 p-3 rounded-lg mr-4">
                      <Award className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Award Winning</h3>
                      <p className="text-muted-foreground text-sm">Recognized for our culinary excellence.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-primary/10 p-3 rounded-lg mr-4">
                      <Users className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Community Focused</h3>
                      <p className="text-muted-foreground text-sm">Supporting local businesses and causes.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-primary/10 p-3 rounded-lg mr-4">
                      <Heart className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Sustainability</h3>
                      <p className="text-muted-foreground text-sm">Committed to eco-friendly practices.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <div className="rounded-lg overflow-hidden shadow-xl">
                  <img 
                    src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2070&auto=format&fit=crop" 
                    alt="Team preparing food" 
                    className="w-full h-auto"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg w-32 h-32 flex items-center justify-center dark:bg-gray-800 dark:text-white">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary">15+</div>
                    <div className="text-sm text-muted-foreground">Years of Excellence</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
                <p className="text-lg mb-8">
                  Have questions, suggestions, or feedback? We'd love to hear from you! Fill out the form and our team will get back to you as soon as possible.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-primary mr-3 mt-0.5" />
                    <div>
                      <p className="font-medium">Headquarters</p>
                      <p className="text-muted-foreground">456 Wilson Blvd, Arlington, VA 22203</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Phone className="h-5 w-5 text-primary mr-3 mt-0.5" />
                    <div>
                      <p className="font-medium">Phone</p>
                      <p className="text-muted-foreground">(703) 555-1234</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Mail className="h-5 w-5 text-primary mr-3 mt-0.5" />
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-muted-foreground">contact@tastyhub-va.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Clock className="h-5 w-5 text-primary mr-3 mt-0.5" />
                    <div>
                      <p className="font-medium">Support Hours</p>
                      <p className="text-muted-foreground">Monday-Friday: 9:00 AM - 6:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <ContactForm />
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
