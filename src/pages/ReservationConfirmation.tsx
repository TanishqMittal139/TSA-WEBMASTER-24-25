
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle, Calendar, Clock, Users, ArrowRight } from 'lucide-react';
import Navbar from '@/components/ui/navbar';
import Footer from '@/components/ui/footer';
import { Button } from '@/components/ui/button';

const ReservationConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const reservationDetails = location.state?.reservationDetails;
  
  // If no reservation details are available, redirect to the reservations page
  if (!reservationDetails) {
    React.useEffect(() => {
      navigate('/reservations');
    }, [navigate]);
    return null;
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20">
        <section className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto text-center">
            <div className="mb-8 flex justify-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <CheckCircle className="h-8 w-8 text-primary" />
              </div>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Reservation Confirmed!</h1>
            <p className="text-xl text-muted-foreground mb-8">
              We look forward to serving you at Tasty Hub.
            </p>
            
            <div className="bg-card rounded-xl shadow-lg p-6 md:p-8 mb-8">
              <h2 className="text-xl font-semibold mb-6 text-center">Reservation Details</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start">
                  <Calendar className="h-5 w-5 text-primary mr-3 mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Date</p>
                    <p className="font-medium">{reservationDetails.date}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Clock className="h-5 w-5 text-primary mr-3 mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Time</p>
                    <p className="font-medium">{reservationDetails.time}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Users className="h-5 w-5 text-primary mr-3 mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Party Size</p>
                    <p className="font-medium">{reservationDetails.guests} {parseInt(reservationDetails.guests) === 1 ? 'Guest' : 'Guests'}</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-border">
                <div className="flex items-start">
                  <div className="flex-grow">
                    <p className="text-sm text-muted-foreground">Reserved For</p>
                    <p className="font-medium">{reservationDetails.name}</p>
                    <p className="text-sm text-muted-foreground">{reservationDetails.email}</p>
                    <p className="text-sm text-muted-foreground">{reservationDetails.phone}</p>
                  </div>
                </div>
                
                {reservationDetails.specialRequests && (
                  <div className="mt-4">
                    <p className="text-sm text-muted-foreground">Special Requests</p>
                    <p>{reservationDetails.specialRequests}</p>
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={() => navigate('/menu')} className="flex items-center gap-2">
                Browse Our Menu
                <ArrowRight size={16} />
              </Button>
              
              <Button variant="outline" onClick={() => navigate('/')}>
                Return to Homepage
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default ReservationConfirmation;
