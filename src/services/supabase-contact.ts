
import { supabase } from "@/integrations/supabase/client";

export interface ContactData {
  name: string;
  email: string;
  message: string;
  subject?: string;
}

interface ContactResponse {
  success: boolean;
  message: string;
}

export const submitContactForm = async (data: ContactData): Promise<ContactResponse> => {
  try {
    // Simple validation
    if (!data.name || !data.email || !data.message) {
      return {
        success: false,
        message: 'Please complete all required fields'
      };
    }

    const { error } = await supabase
      .from('contact_submissions')
      .insert(data);

    if (error) {
      console.error("Error submitting contact form:", error);
      return {
        success: false,
        message: error.message || 'Failed to submit your message'
      };
    }

    return {
      success: true,
      message: 'Your message has been sent! We will get back to you soon.'
    };
  } catch (error) {
    console.error('Error submitting contact form:', error);
    return {
      success: false,
      message: 'An unexpected error occurred. Please try again.'
    };
  }
};
