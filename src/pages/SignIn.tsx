
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';
import { signIn } from '@/services/auth';
import { useAuth } from '@/context/AuthContext';
import Navbar from '@/components/ui/navbar';
import Footer from '@/components/ui/footer';
import AuthHeader from '@/components/auth/AuthHeader';
import SignInForm from '@/components/auth/SignInForm';

const SignIn = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const { user, refreshProfile } = useAuth();
  
  // Get the return URL from location state or default to home
  const from = (location.state as { from?: string })?.from || '/';
  
  // Check if user is already authenticated
  useEffect(() => {
    if (user) {
      console.log("User is already logged in, redirecting to:", from);
      navigate(from, { replace: true });
    }
  }, [user, navigate, from]);

  const handleSubmit = async (values: { email: string; password: string }) => {
    setIsSubmitting(true);
    setAuthError(null);
    
    try {
      console.log("Attempting to sign in with:", values.email);
      const result = await signIn(values.email, values.password);
      
      if (result.success) {
        // Delay to ensure auth state has been updated
        setTimeout(async () => {
          await refreshProfile();
          
          toast({
            title: "Welcome back!",
            description: "You have successfully signed in.",
          });
          
          console.log("Sign in successful, redirecting to:", from);
          navigate(from, { replace: true });
        }, 500);
      } else {
        console.error("Sign in failed:", result.message);
        setAuthError(result.message);
      }
    } catch (error: any) {
      console.error("Sign in error:", error);
      setAuthError("An unexpected error occurred. Please try again.");
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
            <AuthHeader />
            <SignInForm
              onSubmit={handleSubmit}
              isSubmitting={isSubmitting}
              authError={authError}
            />
            
            <div className="mt-6 pt-6 border-t border-border text-center">
              <p className="text-sm text-muted-foreground">
                Don't have an account?{' '}
                <Link to="/sign-up" className="text-primary font-medium hover:underline">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default SignIn;
