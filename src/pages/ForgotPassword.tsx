
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Link } from 'react-router-dom';
import { Coffee, ArrowLeft } from 'lucide-react';
import Navbar from '@/components/ui/navbar';
import Footer from '@/components/ui/footer';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { resetPassword } from '@/services/supabase-auth';
import { toast } from '@/components/ui/use-toast';

const formSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address.' }),
});

const ForgotPassword = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    
    try {
      const result = await resetPassword(values.email);
      
      if (result.success) {
        setResetSent(true);
        form.reset();
      } else {
        toast({
          title: "Error",
          description: result.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Password reset error:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20">
        <section className="container mx-auto px-4 py-12">
          <div className="max-w-md mx-auto">
            <div className="flex justify-center mb-6">
              <div className="flex items-center space-x-2 text-primary font-bold text-2xl">
                <Coffee size={32} strokeWidth={2.5} />
                <span>Tasty Hub</span>
              </div>
            </div>
            
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold mb-2">Reset Your Password</h1>
              <p className="text-muted-foreground">
                Enter your email and we'll send you a reset link
              </p>
            </div>
            
            <div className="bg-card rounded-xl shadow-lg p-6 md:p-8">
              {resetSent ? (
                <div className="space-y-4 text-center">
                  <div className="flex justify-center">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                      <Coffee size={32} className="text-primary" />
                    </div>
                  </div>
                  <h3 className="text-xl font-medium">Check Your Email</h3>
                  <p className="text-muted-foreground">
                    We've sent a password reset link to your email address.
                    Please check your inbox and follow the instructions.
                  </p>
                  <Button 
                    variant="outline"
                    className="w-full mt-4"
                    onClick={() => setResetSent(false)}
                  >
                    Send Again
                  </Button>
                </div>
              ) : (
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="you@example.com" type="email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button 
                      type="submit" 
                      className="w-full" 
                      size="lg"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Sending Reset Link..." : "Send Reset Link"}
                    </Button>
                  </form>
                </Form>
              )}
              
              <div className="mt-6 pt-6 border-t border-border">
                <Link 
                  to="/sign-in" 
                  className="flex items-center justify-center text-sm text-primary hover:underline"
                >
                  <ArrowLeft size={16} className="mr-1" />
                  Back to Sign In
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default ForgotPassword;
