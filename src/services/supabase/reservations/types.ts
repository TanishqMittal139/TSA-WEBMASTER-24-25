
export type ReservationData = {
  id?: string;
  user_id?: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: string;
  specialRequests: string;
  status: string;
  created_at?: string;
};

export type ReservationInput = Omit<ReservationData, 'id' | 'user_id' | 'created_at'>;

// Type for the simplified reservation form
export type ReservationFormInput = {
  date: string;
  time: string;
  guests: string;
  locationId: string;
};
