import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface BookingNotificationRequest {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  consultationType: string;
  selectedDate: string;
  selectedTime: string;
  message?: string;
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
  console.log("Received booking notification request");
  
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const data: BookingNotificationRequest = await req.json();
    console.log("Sending booking notification for:", data.name);

    const consultationTypes: Record<string, { ar: string; en: string }> = {
      discovery: { ar: 'استشارة اكتشافية', en: 'Discovery Call' },
      strategy: { ar: 'جلسة استراتيجية', en: 'Strategy Session' },
      technical: { ar: 'استشارة تقنية', en: 'Technical Consultation' },
    };

    const consultationType = consultationTypes[data.consultationType] || { ar: data.consultationType, en: data.consultationType };

    // Send notification to admin
    const adminEmailResponse = await sendEmail({
      from: "Ahmad Qaoud Website <onboarding@resend.dev>",
      to: ["contact@ahmadqaoud.com"],
      subject: `🎉 حجز استشارة جديد - ${data.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; direction: rtl; text-align: right; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #1e3a5f, #3d5a80); padding: 30px; border-radius: 12px 12px 0 0;">
            <h1 style="color: #d4a528; margin: 0;">حجز استشارة جديد! 🎉</h1>
          </div>
          <div style="background: #ffffff; padding: 30px; border: 1px solid #e5e7eb;">
            <h2 style="color: #1e3a5f;">تفاصيل الحجز</h2>
            <p><strong>الاسم:</strong> ${data.name}</p>
            <p><strong>البريد:</strong> ${data.email}</p>
            ${data.phone ? `<p><strong>الهاتف:</strong> ${data.phone}</p>` : ''}
            ${data.company ? `<p><strong>الشركة:</strong> ${data.company}</p>` : ''}
            <p><strong>نوع الاستشارة:</strong> ${consultationType.ar}</p>
            <p><strong>التاريخ:</strong> ${data.selectedDate}</p>
            <p><strong>الوقت:</strong> ${data.selectedTime}</p>
            ${data.message ? `<p><strong>الرسالة:</strong> ${data.message}</p>` : ''}
          </div>
        </div>
      `,
    });

    console.log("Admin notification sent:", adminEmailResponse);

    // Send confirmation to client
    const clientEmailResponse = await sendEmail({
      from: "Ahmad Qaoud <onboarding@resend.dev>",
      to: [data.email],
      subject: `✅ تم تأكيد حجز استشارتك`,
      html: `
        <div style="font-family: Arial, sans-serif; direction: rtl; text-align: right; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #1e3a5f, #3d5a80); padding: 30px; border-radius: 12px 12px 0 0; text-align: center;">
            <h1 style="color: #ffffff; margin: 0;">مرحباً ${data.name}!</h1>
            <p style="color: #d4a528;">تم استلام طلب حجز استشارتك</p>
          </div>
          <div style="background: #ffffff; padding: 30px; border: 1px solid #e5e7eb;">
            <p style="background: #10b981; color: white; padding: 15px; border-radius: 8px; text-align: center;">✓ تم الحجز بنجاح!</p>
            <h2 style="color: #1e3a5f;">تفاصيل موعدك</h2>
            <p><strong>نوع الاستشارة:</strong> ${consultationType.ar}</p>
            <p><strong>التاريخ:</strong> ${data.selectedDate}</p>
            <p><strong>الوقت:</strong> ${data.selectedTime} (توقيت الرياض)</p>
            <p>سنتواصل معك خلال 24 ساعة لتأكيد الموعد</p>
            <p style="text-align: center; margin-top: 20px;">
              <a href="https://wa.me/201020660608" style="background: #25D366; color: white; padding: 12px 30px; border-radius: 8px; text-decoration: none;">تواصل عبر واتساب</a>
            </p>
          </div>
        </div>
      `,
    });

    console.log("Client confirmation sent:", clientEmailResponse);

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  } catch (error: any) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
