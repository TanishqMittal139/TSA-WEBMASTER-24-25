import React from 'react';
import Navbar from '@/components/ui/navbar';
import Footer from '@/components/ui/footer';
import PageHeader from '@/components/ui/page-header';
import { Button } from "@/components/ui/button";
import { Rocket } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <PageHeader
        title="About Us"
        subtitle="Learn about our story, values, and commitment to quality food and service"
        badge="Our Story"
        imageSrc="https://images.unsplash.com/photo-1542181961-9590d0c79dab?q=80&w=2070"
      />
      
      <main className="flex-grow">
        <section className="py-12 md:py-24">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
                <p className="text-lg text-muted-foreground mb-6">
                  At TastyHub, our mission is to provide delicious, high-quality meals using locally-sourced ingredients, while fostering a welcoming and sustainable dining experience for our community.
                </p>
                <Button className="inline-flex items-center gap-2">
                  <Rocket size={18} />
                  Explore Our Menu
                </Button>
              </div>
              <div>
                <img
                  src="https://images.unsplash.com/photo-1551963831-b3a1f8e83efd?q=80&w=2070"
                  alt="Delicious Food"
                  className="rounded-lg shadow-md"
                />
              </div>
            </div>
          </div>
        </section>
        
        <section className="bg-secondary/30 py-12 md:py-24">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <img
                  src="https://images.unsplash.com/photo-1519708227418-c8b39e2a042b?q=80&w=2070"
                  alt="Our Team"
                  className="rounded-lg shadow-md"
                />
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Our team is composed of passionate chefs, dedicated staff, and experienced managers who are committed to providing exceptional service and culinary excellence.
                </p>
                <Button variant="secondary" className="inline-flex items-center gap-2">
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-12 md:py-24">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-4 text-center">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-2">Quality</h3>
                <p className="text-muted-foreground">
                  We are committed to using the freshest, highest-quality ingredients in all of our dishes.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Sustainability</h3>
                <p className="text-muted-foreground">
                  We strive to minimize our environmental impact by sourcing locally and implementing sustainable practices.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Community</h3>
                <p className="text-muted-foreground">
                  We believe in giving back to our community and supporting local initiatives.
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
