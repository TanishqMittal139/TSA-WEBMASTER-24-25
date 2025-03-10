
// Contact service for handling contact form submissions

interface ContactData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface ContactResponse {
  success: boolean;
  message: string;
}

// Store contacts in localStorage
const CONTACT_MESSAGES_KEY = 'tasty_hub_contact_messages';

// Submit a contact form
const submitContactForm = async (data: ContactData): Promise<ContactResponse> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  try {
    // Validate required fields
    if (!data.name || !data.email || !data.message) {
      return {
        success: false,
        message: 'All required fields must be provided'
      };
    }
    
    // Create message object
    const contactMessage = {
      id: `MSG-${Date.now()}`,
      ...data,
      createdAt: new Date().toISOString(),
      status: 'new'
    };
    
    // Save to "database" (localStorage)
    const existingMessages = JSON.parse(localStorage.getItem(CONTACT_MESSAGES_KEY) || '[]');
    existingMessages.push(contactMessage);
    localStorage.setItem(CONTACT_MESSAGES_KEY, JSON.stringify(existingMessages));
    
    // Log the email that would be sent in a real application
    console.log(`[Email Service] Sending notification email to support@tastyhub.com`);
    console.log(`[Email Service] Subject: New Contact Form: ${data.subject || 'No Subject'}`);
    console.log(`[Email Service] From: ${data.name} <${data.email}>`);
    console.log(`[Email Service] Message: ${data.message}`);
    
    // Log the auto-reply that would be sent to the customer
    console.log(`[Email Service] Sending auto-reply to ${data.email}`);
    console.log(`[Email Service] Subject: We've received your message - Tasty Hub`);
    
    return {
      success: true,
      message: 'Your message has been sent successfully!'
    };
  } catch (error) {
    console.error('Contact form error:', error);
    return {
      success: false,
      message: 'An unexpected error occurred'
    };
  }
};

export {
  submitContactForm,
  type ContactData,
  type ContactResponse
};
