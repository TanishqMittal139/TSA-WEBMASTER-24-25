
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { FavoritesProvider } from "./context/FavoritesContext";
import { useEffect } from "react";
import { isAuthenticated } from "./services/auth";
import Index from "./pages/Index";
import Menu from "./pages/Menu";
import Deals from "./pages/Deals";
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
import NotFound from "./pages/NotFound";

// Protected route wrapper
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  if (!isAuthenticated()) {
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
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <CartProvider>
          <FavoritesProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/menu" element={<Menu />} />
                <Route path="/menu/:dishId" element={<DishDetails />} />
                <Route path="/deals" element={<Deals />} />
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
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </FavoritesProvider>
        </CartProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
