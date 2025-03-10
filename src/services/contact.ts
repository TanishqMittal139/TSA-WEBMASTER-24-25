
// A simple frontend contact service
// Note: In a real application, this would connect to a backend API

export interface ContactData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface ContactResponse {
  success: boolean;
  message: string;
}

// Send contact form data
const sendContactForm = async (data: ContactData): Promise<ContactResponse> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  try {
    // In a real app, this would send data to a server
    if (!data.name || !data.email || !data.message) {
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

    console.log('Contact form data:', data);

    // Simulate successful submission
    return {
      success: true,
      message: 'Your message has been sent successfully. We will contact you soon!'
    };
  } catch (error) {
    console.error('Contact form submission error:', error);
    return {
      success: false,
      message: 'An unexpected error occurred. Please try again later.'
    };
  }
};

export {
  sendContactForm
};
