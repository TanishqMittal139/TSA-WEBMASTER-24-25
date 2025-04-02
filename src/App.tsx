
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { FavoritesProvider } from "./context/FavoritesContext";
import { FavoriteMealsProvider } from "./context/FavoriteMealsContext";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
import { useEffect, useState } from "react";
import { isAuthenticated } from "./services/supabase-auth";
import Index from "./pages/Index";
import Menu from "./pages/Menu";
import Deals from "./pages/Deals";
import DealUse from "./pages/DealUse";
import FindLocation from "./pages/FindLocation";
import About from "./pages/About";
import Cart from "./pages/Cart";
import Reservations from "./pages/Reservations";
import ReservationConfirmation from "./pages/ReservationConfirmation";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Checkout from "./pages/Checkout";
import CheckoutConfirmation from "./pages/CheckoutConfirmation";
import FavoriteLocations from "./pages/FavoriteLocations";
import DishDetails from "./pages/DishDetails";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import Careers from "./pages/Careers";

// Scroll to top component with animation
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Add a small delay to ensure smooth scrolling after route change
    const timeoutId = setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }, 100);
    
    return () => clearTimeout(timeoutId);
  }, [pathname]);

  return null;
};

// Protected route wrapper
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  
  useEffect(() => {
    const checkAuth = async () => {
      const isAuth = await isAuthenticated();
      setAuthenticated(isAuth);
    };
    
    checkAuth();
  }, []);
  
  if (authenticated === null) {
    // Still loading, return loading state or nothing
    return <div className="flex items-center justify-center p-8">Loading...</div>;
  }
  
  if (!authenticated) {
    return <Navigate to="/sign-in" replace />;
  }
  
  return children;
};

const queryClient = new QueryClient();

const App = () => {
  // Initialize auth and other services
  useEffect(() => {
    // This would be where you might initialize external services
    console.log("Initializing app and services...");
    
    // Clear any lingering active deals on app start
    localStorage.removeItem('active_deal');
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <AuthProvider>
            <Toaster />
            <Sonner />
            <CartProvider>
              <FavoritesProvider>
                <FavoriteMealsProvider>
                  <BrowserRouter>
                    <ScrollToTop />
                    <Routes>
                      <Route path="/" element={<Index />} />
                      <Route path="/menu" element={<Menu />} />
                      <Route path="/menu/:dishId" element={<DishDetails />} />
                      <Route path="/deals" element={<Deals />} />
                      <Route path="/deals/:dealId/use" element={
                        <ProtectedRoute>
                          <DealUse />
                        </ProtectedRoute>
                      } />
                      <Route path="/find-location" element={<FindLocation />} />
                      <Route path="/about" element={<About />} />
                      <Route path="/cart" element={<Cart />} />
                      <Route path="/reservations" element={<Reservations />} />
                      <Route path="/reservation-confirmation" element={
                        <ProtectedRoute>
                          <ReservationConfirmation />
                        </ProtectedRoute>
                      } />
                      <Route path="/sign-in" element={<SignIn />} />
                      <Route path="/sign-up" element={<SignUp />} />
                      <Route path="/checkout" element={<Checkout />} />
                      <Route path="/checkout-confirmation" element={<CheckoutConfirmation />} />
                      <Route path="/favorite-locations" element={
                        <ProtectedRoute>
                          <FavoriteLocations />
                        </ProtectedRoute>
                      } />
                      <Route path="/careers" element={<Careers />} />
                      <Route path="/profile" element={
                        <ProtectedRoute>
                          <Profile />
                        </ProtectedRoute>
                      } />
                      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </BrowserRouter>
                </FavoriteMealsProvider>
              </FavoritesProvider>
            </CartProvider>
          </AuthProvider>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
