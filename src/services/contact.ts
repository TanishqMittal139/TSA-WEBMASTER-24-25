
// Create this file if it doesn't exist

export interface ContactData {
  name: string;
  email: string;
  message: string;
  subject?: string;
}

export const submitContactForm = async (data: ContactData) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  try {
    // Simple validation
    if (!data.name || !data.email || !data.message) {
      return {
        success: false,
        message: 'All required fields must be filled'
      };
    }

    // Simulate sending email
    console.log(`Contact form submitted by ${data.name} (${data.email}): ${data.message}`);

    return {
      success: true,
      message: 'Your message has been sent!'
    };
  } catch (error) {
    console.error('Error submitting contact form:', error);
    return {
      success: false,
      message: 'An error occurred while sending your message. Please try again.'
    };
  }
};
