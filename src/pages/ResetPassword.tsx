
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useNavigate } from 'react-router-dom';
import { Coffee, Shield } from 'lucide-react';
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
import { changePassword } from '@/services/auth';
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';

const formSchema = z.object({
  password: z.string()
    .min(8, { message: 'Password must be at least 8 characters.' })
    .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter.' })
    .regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter.' })
    .regex(/[0-9]/, { message: 'Password must contain at least one number.' }),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

const ResetPassword = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resetComplete, setResetComplete] = useState(false);
  const [validResetLink, setValidResetLink] = useState<boolean | null>(null);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  useEffect(() => {
    const checkResetToken = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        
        if (error || !data?.session) {
          setValidResetLink(false);
        } else {
          setValidResetLink(true);
        }
      } catch (error) {
        console.error("Error checking reset token:", error);
        setValidResetLink(false);
      }
    };
    
    checkResetToken();
  }, []);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    
    try {
      // The changePassword function now only takes one parameter - the new password
      const result = await changePassword(values.password);
      
      if (result.success) {
        toast({
          title: "Password Reset Successful",
          description: "Your password has been successfully updated.",
        });
        setResetComplete(true);
        
        setTimeout(() => {
          navigate('/sign-in');
        }, 3000);
      } else {
        toast({
          title: "Password Reset Failed",
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

  const renderContent = () => {
    if (validResetLink === null) {
      return (
        <div className="flex justify-center items-center p-8">
          <div className="flex flex-col items-center gap-2">
            <div className="h-8 w-8 rounded-full border-2 border-primary border-t-transparent animate-spin"></div>
            <p className="text-sm text-muted-foreground">Verifying your reset link...</p>
          </div>
        </div>
      );
    }
    
    if (validResetLink === false) {
      return (
        <Alert variant="destructive" className="mb-6">
          <AlertTitle>Invalid or Expired Link</AlertTitle>
          <AlertDescription>
            This password reset link is invalid or has expired. Please request a new password reset link.
          </AlertDescription>
          <Button 
            className="mt-4 w-full" 
            onClick={() => navigate('/forgot-password')}
            variant="outline"
          >
            Request New Reset Link
          </Button>
        </Alert>
      );
    }
    
    if (resetComplete) {
      return (
        <div className="space-y-4 text-center">
          <div className="flex justify-center">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
              <Shield size={32} className="text-green-600" />
            </div>
          </div>
          <h3 className="text-xl font-medium">Password Reset Complete</h3>
          <p className="text-muted-foreground">
            Your password has been successfully reset. You will be redirected to the login page shortly.
          </p>
          <Button 
            className="w-full mt-4" 
            onClick={() => navigate('/sign-in')}
          >
            Sign In Now
          </Button>
        </div>
      );
    }
    
    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Password</FormLabel>
                <FormControl>
                  <Input placeholder="••••••••" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm New Password</FormLabel>
                <FormControl>
                  <Input placeholder="••••••••" type="password" {...field} />
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
            {isSubmitting ? "Resetting Password..." : "Reset Password"}
          </Button>
        </form>
      </Form>
    );
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
                Create a new secure password for your account
              </p>
            </div>
            
            <div className="bg-card rounded-xl shadow-lg p-6 md:p-8">
              {renderContent()}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default ResetPassword;
