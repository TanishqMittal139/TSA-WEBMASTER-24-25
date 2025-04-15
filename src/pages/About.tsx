
import React from 'react';
import Navbar from '@/components/ui/navbar';
import Footer from '@/components/ui/footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Leaf, Award, Utensils, Wind, Recycle, UserCheck, ChefHat, Sun, Wand2 } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="container mx-auto px-4 py-12 pt-28 animate-fade-in">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-foreground relative inline-block mb-8">
            About TastyHub
            <span className="absolute -bottom-2 left-0 w-1/3 h-1 bg-primary rounded-full"></span>
            <span className="absolute -bottom-2 left-0 w-1/4 h-1 bg-primary/50 rounded-full animate-pulse"></span>
          </h1>
          
          <div className="my-8 prose prose-lg max-w-none text-foreground/90">
            <p>
              TastyHub is not just a restaurant, it's a culinary experience focused on nutrition, sustainability, and exceptional taste. Founded in 2015, our mission is to transform how people experience healthy eating by making nutritious food delicious, accessible, and sustainable.
            </p>
            <p>
              We believe that food should nourish both body and planet. Our approach combines cutting-edge nutritional science with culinary artistry to create meals that are as good for you as they are delicious.
            </p>
          </div>
          
          <Tabs defaultValue="farm-to-table" className="my-12">
            <TabsList className="mb-8 flex flex-wrap bg-background/20 backdrop-blur-md p-1 rounded-xl border border-white/10">
              <TabsTrigger value="farm-to-table" className="px-6 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                Farm-to-Table
              </TabsTrigger>
              <TabsTrigger value="preparation" className="px-6 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                Preparation Process
              </TabsTrigger>
              <TabsTrigger value="sustainability" className="px-6 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                Sustainability
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="farm-to-table" className="animate-fade-in">
              <div className="bg-background/50 backdrop-blur-sm p-6 rounded-xl border border-white/20 dark:border-white/10">
                <div className="flex items-center gap-3 mb-4">
                  <Leaf className="h-8 w-8 text-primary" />
                  <h2 className="text-2xl font-bold">Our Farm-to-Table Commitment</h2>
                </div>
                
                <p className="mb-6 text-foreground/90">
                  TastyHub's farm-to-table philosophy goes beyond a trendy phrase—it's the foundation of our culinary approach. We've established direct relationships with over 35 local farms within a 100-mile radius of our restaurants, ensuring ingredients reach our kitchens within 24 hours of harvest.
                </p>
                
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <Card className="bg-background/30 backdrop-blur-sm border-white/10">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <UserCheck className="h-5 w-5 text-primary" />
                        <span>Farmer Partnerships</span>
                      </CardTitle>
                      <CardDescription>
                        Building direct relationships with producers
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p>
                        We've cultivated long-term partnerships with family-owned farms and ethical producers who share our values. We pay premium prices to support sustainable farming practices and conduct quarterly visits to every farm to ensure our standards are maintained.
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-background/30 backdrop-blur-sm border-white/10">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Award className="h-5 w-5 text-primary" />
                        <span>Ingredient Selection</span>
                      </CardTitle>
                      <CardDescription>
                        Only the highest quality makes it to your plate
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p>
                        Our chefs personally select each ingredient, prioritizing organic, non-GMO, and heirloom varieties. We maintain a seasonal rotating menu based on what's available locally, ensuring peak nutrition and flavor while reducing carbon footprint associated with long-distance transportation.
                      </p>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="flex justify-center my-8">
                  <div className="relative rounded-xl overflow-hidden w-full max-w-2xl border border-white/10">
                    <img 
                      src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                      alt="Local farm harvest" 
                      className="w-full object-cover aspect-video"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end">
                      <p className="text-white p-4 text-sm">Our partner farms practice sustainable agriculture methods that preserve biodiversity</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 prose prose-lg max-w-none text-foreground/90">
                  <p>
                    By working directly with farmers, we've eliminated middlemen and reduced food miles by an average of 80% compared to conventional restaurant supply chains. This not only ensures fresher, more nutritious food but also supports the local economy and reduces our environmental impact.
                  </p>
                  <p>
                    We believe you can taste the difference in every bite—the vibrant flavors that only truly fresh ingredients can provide.
                  </p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="preparation" className="animate-fade-in">
              <div className="bg-background/50 backdrop-blur-sm p-6 rounded-xl border border-white/20 dark:border-white/10">
                <div className="flex items-center gap-3 mb-4">
                  <ChefHat className="h-8 w-8 text-primary" />
                  <h2 className="text-2xl font-bold">Our Preparation Process</h2>
                </div>
                
                <p className="mb-6 text-foreground/90">
                  At TastyHub, food preparation is both an art and a science. We've developed proprietary techniques that maximize nutritional content while creating unforgettable flavor profiles.
                </p>
                
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <Card className="bg-background/30 backdrop-blur-sm border-white/10">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Sun className="h-5 w-5 text-primary" />
                        <span>Nutrient Preservation</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>
                        We use specialized low-temperature cooking methods that preserve heat-sensitive vitamins and beneficial plant compounds. Our preparation times are carefully controlled to maximize nutrient bioavailability.
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-background/30 backdrop-blur-sm border-white/10">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Wand2 className="h-5 w-5 text-primary" />
                        <span>Flavor Innovation</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>
                        Our culinary team includes flavor scientists who use natural techniques to enhance taste without artificial additives. We employ fermentation, aging, and molecular gastronomy to create complex flavor profiles.
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-background/30 backdrop-blur-sm border-white/10">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Utensils className="h-5 w-5 text-primary" />
                        <span>Made-to-Order</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>
                        Every dish is prepared to order, ensuring maximum freshness. We've implemented efficient kitchen workflows that allow for custom preparation without compromising speed of service.
                      </p>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="flex justify-center my-8">
                  <div className="relative rounded-xl overflow-hidden w-full max-w-2xl border border-white/10">
                    <img 
                      src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                      alt="Chef preparing fresh ingredients" 
                      className="w-full object-cover aspect-video"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end">
                      <p className="text-white p-4 text-sm">Our chefs use innovative techniques that preserve nutrients while enhancing flavor</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 prose prose-lg max-w-none text-foreground/90">
                  <p>
                    Our commitment to quality extends to our kitchen equipment. We've invested in state-of-the-art tools that allow precise control over cooking parameters. This attention to detail ensures consistent quality in every meal we serve.
                  </p>
                  <p>
                    Each TastyHub kitchen is designed with separate zones for different preparation methods, preventing cross-contamination and allowing specialized handling of ingredients based on their specific requirements.
                  </p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="sustainability" className="animate-fade-in">
              <div className="bg-background/50 backdrop-blur-sm p-6 rounded-xl border border-white/20 dark:border-white/10">
                <div className="flex items-center gap-3 mb-4">
                  <Recycle className="h-8 w-8 text-primary" />
                  <h2 className="text-2xl font-bold">Our Sustainability Initiatives</h2>
                </div>
                
                <p className="mb-6 text-foreground/90">
                  Sustainability isn't just a buzzword at TastyHub—it's integrated into every aspect of our operations. We're committed to leaving a positive impact on both our local communities and the planet.
                </p>
                
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <Card className="bg-background/30 backdrop-blur-sm border-white/10">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Wind className="h-5 w-5 text-primary" />
                        <span>Carbon Footprint Reduction</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 list-disc pl-5">
                        <li>100% renewable energy in all locations</li>
                        <li>Carbon-neutral delivery program</li>
                        <li>80% reduction in food miles through local sourcing</li>
                        <li>Annual carbon audit with published results</li>
                      </ul>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-background/30 backdrop-blur-sm border-white/10">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Recycle className="h-5 w-5 text-primary" />
                        <span>Waste Reduction</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 list-disc pl-5">
                        <li>Zero landfill waste program at all locations</li>
                        <li>Comprehensive composting system</li>
                        <li>Biodegradable packaging made from reclaimed agricultural waste</li>
                        <li>Creative usage of vegetable trimmings in stocks and sauces</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="flex justify-center my-8">
                  <div className="relative rounded-xl overflow-hidden w-full max-w-2xl border border-white/10">
                    <img 
                      src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                      alt="Sustainable farming practices" 
                      className="w-full object-cover aspect-video"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end">
                      <p className="text-white p-4 text-sm">Our partners use regenerative agricultural practices that build soil health and sequester carbon</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 prose prose-lg max-w-none text-foreground/90">
                  <p>
                    We've implemented a water conservation program that has reduced our water usage by 65% compared to industry standards. Our kitchens use water-recycling systems and high-efficiency fixtures throughout our facilities.
                  </p>
                  <p>
                    TastyHub is a founding member of the Sustainable Restaurant Coalition, helping to develop industry-wide standards for environmental responsibility. We transparently share our sustainability metrics through annual impact reports available on our website.
                  </p>
                  <p>
                    We believe that true sustainability requires ongoing innovation and commitment. That's why we dedicate 5% of our profits to research and development of new sustainable food systems and technologies.
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="my-16">
            <Card className="bg-background/50 backdrop-blur-md border-white/20 dark:border-white/10">
              <CardHeader>
                <CardTitle className="text-2xl">Get in Touch</CardTitle>
                <CardDescription>
                  Have questions or want to learn more about TastyHub?
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col">
                      <span className="font-medium mb-1">General Inquiries</span>
                      <span className="text-muted-foreground">info@tastyhub.com</span>
                      <span className="text-muted-foreground">(804) 123-4567</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-medium mb-1">Corporate Headquarters</span>
                      <span className="text-muted-foreground">123 Nutrition Avenue</span>
                      <span className="text-muted-foreground">Richmond, VA 23219</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col">
                      <span className="font-medium mb-1">Hours of Operation</span>
                      <span className="text-muted-foreground">Monday - Friday: 11am - 10pm</span>
                      <span className="text-muted-foreground">Saturday - Sunday: 10am - 11pm</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-medium mb-1">Group Bookings</span>
                      <span className="text-muted-foreground">events@tastyhub.com</span>
                      <span className="text-muted-foreground">(804) 123-4589</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
