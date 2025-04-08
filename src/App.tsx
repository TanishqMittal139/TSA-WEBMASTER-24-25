
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { FavoritesProvider } from "./context/FavoritesContext";
import { FavoriteMealsProvider } from "./context/FavoriteMealsContext";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { useEffect, useState } from "react";
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
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Checkout from "./pages/Checkout";
import CheckoutConfirmation from "./pages/CheckoutConfirmation";
import FavoriteLocations from "./pages/FavoriteLocations";
import DishDetails from "./pages/DishDetails";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import History from "./pages/History";
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
  const { isLoading, user } = useAuth();
  const location = useLocation();
  
  if (isLoading) {
    // Loading state with a nice spinner
    return (
      <div className="flex items-center justify-center min-h-screen p-8">
        <div className="flex flex-col items-center gap-2">
          <div className="h-8 w-8 rounded-full border-2 border-primary border-t-transparent animate-spin"></div>
          <p className="text-sm text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }
  
  if (!user) {
    return <Navigate to="/sign-in" state={{ from: location.pathname }} replace />;
  }
  
  return children;
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  }
});

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
                      <Route path="/forgot-password" element={<ForgotPassword />} />
                      <Route path="/reset-password" element={<ResetPassword />} />
                      <Route path="/checkout" element={
                        <ProtectedRoute>
                          <Checkout />
                        </ProtectedRoute>
                      } />
                      <Route path="/checkout-confirmation" element={
                        <ProtectedRoute>
                          <CheckoutConfirmation />
                        </ProtectedRoute>
                      } />
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
                      <Route path="/settings" element={
                        <ProtectedRoute>
                          <Settings />
                        </ProtectedRoute>
                      } />
                      <Route path="/history" element={
                        <ProtectedRoute>
                          <History />
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
