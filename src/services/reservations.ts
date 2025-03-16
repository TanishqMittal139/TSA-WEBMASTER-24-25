
// This file would typically interact with a backend API.
// For this demo, we're using localStorage to simulate persistence.

import { v4 as uuidv4 } from 'uuid';
import { getCurrentUser } from './auth';

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

// Send confirmation email (mock function)
const sendConfirmationEmail = async (reservation: ReservationData): Promise<boolean> => {
  // In a real app, this would call a backend API to send an email
  console.log('Sending confirmation email to:', reservation.email);
  console.log('Reservation details:', reservation);
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Simulate email content that would be sent
  const emailContent = `
    <h1>Reservation Confirmation</h1>
    <p>Dear ${reservation.name},</p>
    <p>Your reservation at Tasty Hub has been confirmed!</p>
    <p><strong>Reservation Details:</strong></p>
    <ul>
      <li>Date: ${new Date(reservation.date).toLocaleDateString()}</li>
      <li>Time: ${reservation.time}</li>
      <li>Number of Guests: ${reservation.guests}</li>
      ${reservation.specialRequests ? `<li>Special Requests: ${reservation.specialRequests}</li>` : ''}
    </ul>
    <p>We look forward to seeing you soon!</p>
    <p>Tasty Hub Team<br>
    <a href="mailto:contact@tastyhub-va.com">contact@tastyhub-va.com</a><br>
    (703) 555-1234</p>
    <p>456 Wilson Blvd, Arlington, VA 22203</p>
  `;
  
  console.log('Email content:', emailContent);
  
  // Return true to indicate successful sending (in a real app this would be based on API response)
  return true;
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
      status: data.status || 'confirmed',
      createdAt: data.createdAt || new Date()
    };

    // Get existing reservations and add the new one
    const reservations = getReservations();
    reservations.push(newReservation);
    saveReservations(reservations);

    // Send confirmation email
    const emailSent = await sendConfirmationEmail(newReservation);
    
    if (!emailSent) {
      console.warn('Failed to send confirmation email, but reservation was created');
    }

    return {
      success: true,
      message: 'Your reservation has been confirmed! A confirmation email has been sent.',
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

// Get all reservations for the current user
const getReservationsForCurrentUser = (): ReservationData[] => {
  const user = getCurrentUser();
  if (!user) return [];
  
  const reservations = getReservations();
  return reservations.filter(res => 
    res.userId === user.id || 
    res.email.toLowerCase() === user.email.toLowerCase()
  );
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
  getReservationsForCurrentUser,
  cancelReservation
};
