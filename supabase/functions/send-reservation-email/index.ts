
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { Resend } from "npm:resend@2.0.0"

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { name, email, date, time, guests, status } = await req.json();

    const isConfirmation = status === 'confirmed';
    
    const emailResponse = await resend.emails.send({
      from: "Tasty Hub <onboarding@resend.dev>",
      to: [email],
      subject: isConfirmation ? 
        "Your Reservation is Confirmed!" : 
        "Your Reservation has been Cancelled",
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: ${isConfirmation ? '#16a34a' : '#dc2626'};">
            ${isConfirmation ? 'Reservation Confirmed!' : 'Reservation Cancelled'}
          </h1>
          <p>Dear ${name},</p>
          <p>${isConfirmation ? 
            'Your reservation has been successfully confirmed.' : 
            'Your reservation has been cancelled as requested.'}</p>
          ${isConfirmation ? `
            <div style="margin: 20px 0; padding: 20px; background-color: #f3f4f6; border-radius: 8px;">
              <h2 style="margin-top: 0;">Reservation Details:</h2>
              <p>Date: ${date}</p>
              <p>Time: ${time}</p>
              <p>Number of Guests: ${guests}</p>
            </div>
          ` : ''}
          <p>If you have any questions, please don't hesitate to contact us.</p>
          <p>Best regards,<br>Tasty Hub Team</p>
        </div>
      `,
    });

    return new Response(JSON.stringify(emailResponse), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Error sending email:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      }
    );
  }
});
