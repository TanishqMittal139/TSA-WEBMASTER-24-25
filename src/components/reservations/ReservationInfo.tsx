
import React from 'react';
import { Clock, Users, Utensils } from 'lucide-react';

const ReservationInfo = () => {
  return (
    <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="flex flex-col items-center text-center p-6 bg-primary/5 rounded-lg">
        <Clock className="text-primary mb-4" size={32} />
        <h3 className="text-lg font-medium mb-2">Opening Hours</h3>
        <p className="text-sm text-muted-foreground">
          Monday-Saturday: 7:00 AM - 9:00 PM<br />
          Sunday: 8:30 AM - 9:00 PM
        </p>
      </div>
      
      <div className="flex flex-col items-center text-center p-6 bg-primary/5 rounded-lg">
        <Users className="text-primary mb-4" size={32} />
        <h3 className="text-lg font-medium mb-2">Group Bookings</h3>
        <p className="text-sm text-muted-foreground">
          For parties of 8 or more, please contact us directly at (703) 555-1234.
        </p>
      </div>
      
      <div className="flex flex-col items-center text-center p-6 bg-primary/5 rounded-lg">
        <Utensils className="text-primary mb-4" size={32} />
        <h3 className="text-lg font-medium mb-2">Special Events</h3>
        <p className="text-sm text-muted-foreground">
          Ask about our private dining options for special celebrations.
        </p>
      </div>
    </div>
  );
};

export default ReservationInfo;
