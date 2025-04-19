
import React from 'react';
import { format } from 'date-fns';
import { CalendarIcon, Clock, Users, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { ReservationData } from '@/services/supabase-reservations';

interface ReservationListProps {
  reservations: ReservationData[];
  onCancelReservation: (id: string) => Promise<void>;
  onNewReservation: () => void;
}

const ReservationList: React.FC<ReservationListProps> = ({
  reservations,
  onCancelReservation,
  onNewReservation,
}) => {
  return (
    <div className="bg-card rounded-xl shadow-lg p-6 md:p-8">
      <h2 className="text-xl font-semibold mb-6 flex items-center">
        Your Reservations
      </h2>
      
      {reservations.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-muted-foreground mb-4">You don't have any reservations yet.</p>
          <Button variant="outline" onClick={onNewReservation}>
            Make a Reservation
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          {reservations.map((reservation) => (
            <div key={reservation.id} className="border border-border rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center mb-2">
                    <span className={`inline-block h-2 w-2 rounded-full mr-2 ${
                      reservation.status === 'confirmed' ? 'bg-green-500' : 'bg-red-500'
                    }`}></span>
                    <h3 className="font-medium">
                      {reservation.id && `Reservation #${reservation.id.substring(0, 8)}...`}
                    </h3>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 mb-3">
                    <div className="flex items-center">
                      <CalendarIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{format(new Date(reservation.date), 'MMMM d, yyyy')}</span>
                    </div>
                    
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{reservation.time}</span>
                    </div>
                    
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{reservation.guests} {parseInt(reservation.guests) === 1 ? 'Guest' : 'Guests'}</span>
                    </div>
                  </div>
                  
                  {reservation.specialRequests && (
                    <p className="text-sm text-muted-foreground mt-2 border-t border-border pt-2">
                      <span className="font-medium">Special Requests:</span> {reservation.specialRequests}
                    </p>
                  )}
                </div>
                
                {reservation.status !== 'cancelled' && (
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Cancel Reservation</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to cancel your reservation for {format(new Date(reservation.date), 'MMMM d, yyyy')} at {reservation.time}?
                          This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Keep Reservation</AlertDialogCancel>
                        <AlertDialogAction onClick={() => onCancelReservation(reservation.id as string)}
                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                          Cancel Reservation
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                )}
              </div>
              
              {reservation.status === 'cancelled' && (
                <div className="mt-2 bg-destructive/10 text-destructive text-sm rounded px-2 py-1 inline-block">
                  Cancelled
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReservationList;
