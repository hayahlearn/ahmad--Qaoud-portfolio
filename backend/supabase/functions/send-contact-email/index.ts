import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ContactEmailRequest {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  subject: string;
  message: string;
}

interface ResendEmailPayload {
  from: string;
  to: string[];
  subject: string;
  html: string;
}

async function sendEmail(payload: ResendEmailPayload) {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${RESEND_API_KEY}`,
    },
    body: JSON.stringify(payload),
  });
  
  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Resend API error: ${error}`);
  }
  
  return response.json();
}

const handler = async (req: Request): Promise<Response> => {
  console.log("Received contact form submission");
  
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, company, phone, subject, message }: ContactEmailRequest = await req.json();

    console.log("Contact form data:", { name, email, company, phone, subject });

    // Send notification email to admin
    const adminEmailResponse = await sendEmail({
      from: "Ahmad Qaoud Website <onboarding@resend.dev>",
      to: ["contact@ahmadqaoud.com"],
      subject: `New Contact Form: ${subject}`,
      html: `
        <!DOCTYPE html>
        <html dir="rtl" lang="ar">
        <head>
          <meta charset="UTF-8">
          <style>
            body { font-family: 'Segoe UI', Tahoma, sans-serif; background-color: #f5f5f5; padding: 20px; }
            .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1); }
            .header { background: linear-gradient(135deg, #1e3a5f, #2d5a87); padding: 30px; text-align: center; }
            .header h1 { color: #d4a853; margin: 0; font-size: 24px; }
            .content { padding: 30px; }
            .field { margin-bottom: 20px; border-bottom: 1px solid #eee; padding-bottom: 15px; }
            .label { color: #666; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 5px; }
            .value { color: #333; font-size: 16px; }
            .message-box { background: #f8f9fa; padding: 20px; border-radius: 8px; margin-top: 10px; }
            .footer { background: #f5f5f5; padding: 20px; text-align: center; color: #888; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>📧 رسالة جديدة من الموقع</h1>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">الاسم</div>
                <div class="value">${name}</div>
              </div>
              <div class="field">
                <div class="label">البريد الإلكتروني</div>
                <div class="value"><a href="mailto:${email}">${email}</a></div>
              </div>
              ${company ? `
              <div class="field">
                <div class="label">الشركة</div>
                <div class="value">${company}</div>
              </div>
              ` : ""}
              ${phone ? `
              <div class="field">
                <div class="label">رقم الهاتف</div>
                <div class="value"><a href="tel:${phone}">${phone}</a></div>
              </div>
              ` : ""}
              <div class="field">
                <div class="label">الموضوع</div>
                <div class="value">${subject}</div>
              </div>
              <div class="field">
                <div class="label">الرسالة</div>
                <div class="message-box">${message.replace(/\n/g, "<br>")}</div>
              </div>
            </div>
            <div class="footer">
              تم إرسال هذه الرسالة من موقع أحمد قاعود
            </div>
          </div>
        </body>
        </html>
      `,
    });

    console.log("Admin email sent:", adminEmailResponse);

    // Send confirmation email to the sender
    const confirmationEmailResponse = await sendEmail({
      from: "Ahmad Qaoud <onboarding@resend.dev>",
      to: [email],
      subject: "تم استلام رسالتك - We received your message",
      html: `
        <!DOCTYPE html>
        <html dir="rtl" lang="ar">
        <head>
          <meta charset="UTF-8">
          <style>
            body { font-family: 'Segoe UI', Tahoma, sans-serif; background-color: #f5f5f5; padding: 20px; }
            .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1); }
            .header { background: linear-gradient(135deg, #1e3a5f, #2d5a87); padding: 40px; text-align: center; }
            .header h1 { color: #d4a853; margin: 0; font-size: 28px; }
            .header p { color: #fff; margin-top: 10px; opacity: 0.9; }
            .content { padding: 30px; text-align: center; }
            .icon { font-size: 60px; margin-bottom: 20px; }
            .message { color: #333; font-size: 16px; line-height: 1.8; }
            .highlight { background: #f0f7ff; padding: 20px; border-radius: 8px; margin: 20px 0; }
            .footer { background: #f5f5f5; padding: 20px; text-align: center; color: #888; font-size: 12px; }
            .social { margin-top: 15px; }
            .social a { color: #1e3a5f; text-decoration: none; margin: 0 10px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>أحمد قاعود</h1>
              <p>نصنع القيمة</p>
            </div>
            <div class="content">
              <div class="icon">✅</div>
              <h2>شكراً لتواصلك معنا، ${name}!</h2>
              <p class="message">
                تم استلام رسالتك بنجاح وسنقوم بالرد عليك في أقرب وقت ممكن.
                <br><br>
                نقدر ثقتك بنا ونتطلع للعمل معك.
              </p>
              <div class="highlight">
                <strong>موضوع رسالتك:</strong><br>
                ${subject}
              </div>
            </div>
            <div class="footer">
              <p>© 2024 أحمد قاعود - جميع الحقوق محفوظة</p>
              <div class="social">
                <a href="https://wa.me/201020660608">واتساب</a> |
                <a href="mailto:contact@ahmadqaoud.com">البريد الإلكتروني</a>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    console.log("Confirmation email sent:", confirmationEmailResponse);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Emails sent successfully" 
      }), 
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message 
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
