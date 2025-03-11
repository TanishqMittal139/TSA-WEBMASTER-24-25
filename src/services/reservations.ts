
// This file would typically interact with a backend API.
// For this demo, we're using localStorage to simulate persistence.

import { v4 as uuidv4 } from 'uuid';

export interface ReservationData {
  id: string;
  userId: string;
  name: string;
  email: string;
  phone: string;
  date: Date;
  time: string;
  guests: string;
  specialRequests?: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  createdAt: Date;
}

interface ReservationResponse {
  success: boolean;
  message: string;
  reservation?: ReservationData;
}

// Load reservations from localStorage
const getReservations = (): ReservationData[] => {
  try {
    const reservations = localStorage.getItem('reservations');
    return reservations ? JSON.parse(reservations) : [];
  } catch (error) {
    console.error('Error loading reservations:', error);
    return [];
  }
};

// Save reservations to localStorage
const saveReservations = (reservations: ReservationData[]): void => {
  localStorage.setItem('reservations', JSON.stringify(reservations));
};

// Create a new reservation
const createReservation = async (data: Omit<ReservationData, 'id'>): Promise<ReservationResponse> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  try {
    // Simple validation
    if (!data.name || !data.email || !data.phone || !data.date || !data.time || !data.guests) {
      return {
        success: false,
        message: 'All required fields must be filled'
      };
    }

    // Create new reservation
    const newReservation: ReservationData = {
      id: uuidv4(),
      ...data,
      status: 'confirmed',
      createdAt: new Date()
    };

    // Get existing reservations and add the new one
    const reservations = getReservations();
    reservations.push(newReservation);
    saveReservations(reservations);

    // Simulate sending confirmation email
    console.log(`Confirmation email sent to ${data.email} for reservation on ${data.date} at ${data.time}`);

    return {
      success: true,
      message: 'Your reservation has been confirmed!',
      reservation: newReservation
    };
  } catch (error) {
    console.error('Error creating reservation:', error);
    return {
      success: false,
      message: 'An error occurred while processing your reservation. Please try again.'
    };
  }
};

// Get all reservations for a specific email
const getReservationsByEmail = (email: string): ReservationData[] => {
  const reservations = getReservations();
  return reservations.filter(res => res.email.toLowerCase() === email.toLowerCase());
};

// Get a reservation by id
const getReservationById = (id: string): ReservationData | undefined => {
  const reservations = getReservations();
  return reservations.find(res => res.id === id);
};

// Cancel a reservation
const cancelReservation = async (id: string): Promise<ReservationResponse> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));

  try {
    const reservations = getReservations();
    const index = reservations.findIndex(res => res.id === id);
    
    if (index === -1) {
      return {
        success: false,
        message: 'Reservation not found'
      };
    }

    // Update status to cancelled
    reservations[index].status = 'cancelled';
    saveReservations(reservations);

    return {
      success: true,
      message: 'Your reservation has been cancelled',
      reservation: reservations[index]
    };
  } catch (error) {
    console.error('Error cancelling reservation:', error);
    return {
      success: false,
      message: 'An error occurred while cancelling your reservation. Please try again.'
    };
  }
};

export {
  createReservation,
  getReservationById,
  getReservationsByEmail,
  cancelReservation
};
