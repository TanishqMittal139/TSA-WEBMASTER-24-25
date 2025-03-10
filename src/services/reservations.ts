
// A simple frontend reservation service
// Note: In a real application, this would connect to a backend API

export interface ReservationData {
  id: string;
  name: string;
  email: string;
  phone: string;
  date: Date;
  time: string;
  guests: string;
  specialRequests: string;
  userId: string;
}

interface ReservationResponse {
  success: boolean;
  message: string;
  reservation?: ReservationData;
}

// Simulated reservation storage
const STORAGE_KEY = 'tasty_hub_reservations';

// Get all reservations
const getAllReservations = (): ReservationData[] => {
  const reservationsData = localStorage.getItem(STORAGE_KEY);
  return reservationsData ? JSON.parse(reservationsData) : [];
};

// Get user reservations
const getUserReservations = (userId: string): ReservationData[] => {
  const allReservations = getAllReservations();
  return allReservations.filter(reservation => reservation.userId === userId);
};

// Create a reservation
const createReservation = async (data: Omit<ReservationData, 'id'>): Promise<ReservationResponse> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  try {
    if (!data.name || !data.email || !data.phone || !data.date || !data.time || !data.guests) {
      return {
        success: false,
        message: 'All required fields must be filled'
      };
    }

    // Simple email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      return {
        success: false,
        message: 'Invalid email format'
      };
    }

    // Get existing reservations
    const reservations = getAllReservations();

    // Create new reservation
    const newReservation: ReservationData = {
      ...data,
      id: Date.now().toString()
    };

    // Save to "database" (localStorage)
    reservations.push(newReservation);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(reservations));

    // Simulate sending confirmation email
    console.log(`Sending confirmation email to ${data.email} for reservation #${newReservation.id}`);

    return {
      success: true,
      message: 'Reservation created successfully',
      reservation: newReservation
    };
  } catch (error) {
    console.error('Reservation creation error:', error);
    return {
      success: false,
      message: 'An unexpected error occurred'
    };
  }
};

// Cancel a reservation
const cancelReservation = async (id: string): Promise<ReservationResponse> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  try {
    const reservations = getAllReservations();
    const updatedReservations = reservations.filter(reservation => reservation.id !== id);
    
    if (reservations.length === updatedReservations.length) {
      return {
        success: false,
        message: 'Reservation not found'
      };
    }
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedReservations));
    
    return {
      success: true,
      message: 'Reservation cancelled successfully'
    };
  } catch (error) {
    console.error('Reservation cancellation error:', error);
    return {
      success: false,
      message: 'An unexpected error occurred'
    };
  }
};

export {
  getAllReservations,
  getUserReservations,
  createReservation,
  cancelReservation
};
