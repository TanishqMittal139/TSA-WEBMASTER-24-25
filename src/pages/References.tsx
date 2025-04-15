
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/ui/navbar';
import Footer from '@/components/ui/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Link as LinkIcon, Leaf, ExternalLink, Shield } from 'lucide-react';

const References = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="container mx-auto px-4 py-12 pt-28 animate-fade-in">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-foreground relative inline-block mb-8">
            References &amp; Citations
            <span className="absolute -bottom-2 left-0 w-1/3 h-1 bg-primary rounded-full"></span>
            <span className="absolute -bottom-2 left-0 w-1/4 h-1 bg-primary/50 rounded-full animate-pulse"></span>
          </h1>
          
          <Card className="mb-10 bg-background/50 backdrop-blur-sm border-white/20 dark:border-white/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                Statement of Originality
              </CardTitle>
              <CardDescription>
                Important information about our website development
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-foreground/90">
                We affirm that the template and theme used on the React framework was built by our team. 
                All components, styling, and functionality were created specifically for TastyHub by our development team.
              </p>
            </CardContent>
          </Card>
          
          <Card className="mb-10 bg-background/50 backdrop-blur-sm border-white/20 dark:border-white/10">
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
          
          <Card className="mb-10 bg-background/50 backdrop-blur-sm border-white/20 dark:border-white/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Academic Documentation
              </CardTitle>
              <CardDescription>
                Important documents for academic evaluation
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Link to="/student-copyright-checklist.pdf" target="_blank" className="no-underline">
                  <Button variant="outline" className="w-full justify-start gap-2 h-auto py-3">
                    <FileText className="h-5 w-5 text-primary" />
                    <div className="text-left">
                      <div className="font-medium">Student Copyright Checklist</div>
                      <div className="text-sm text-muted-foreground">Download PDF</div>
                    </div>
                    <ExternalLink className="h-4 w-4 ml-auto text-muted-foreground" />
                  </Button>
                </Link>
                
                <Link to="/work-log.pdf" target="_blank" className="no-underline">
                  <Button variant="outline" className="w-full justify-start gap-2 h-auto py-3">
                    <FileText className="h-5 w-5 text-primary" />
                    <div className="text-left">
                      <div className="font-medium">Work Log</div>
                      <div className="text-sm text-muted-foreground">Download PDF</div>
                    </div>
                    <ExternalLink className="h-4 w-4 ml-auto text-muted-foreground" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
          
          <Card className="mb-10 bg-background/50 backdrop-blur-sm border-white/20 dark:border-white/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <LinkIcon className="h-5 w-5 text-primary" />
                Technology Stack
              </CardTitle>
              <CardDescription>
                Technologies used in building TastyHub
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-2">
                <li><span className="font-medium">Frontend Framework:</span> React</li>
                <li><span className="font-medium">UI Components:</span> Shadcn UI</li>
                <li><span className="font-medium">Styling:</span> Tailwind CSS</li>
                <li><span className="font-medium">Backend:</span> Supabase</li>
                <li><span className="font-medium">Routing:</span> React Router</li>
                <li><span className="font-medium">State Management:</span> React Context API</li>
                <li><span className="font-medium">Animations:</span> Custom CSS animations</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default References;
