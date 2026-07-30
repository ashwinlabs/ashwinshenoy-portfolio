import { Resend } from "resend";

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { name, email, topic, message } = req.body || {};

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({ error: "Name, email, and message are required fields." });
    }

    const apiKey = process.env.RESEND_API_KEY;

    // If Resend API key is not configured, acknowledge gracefully in showcase mode
    if (!apiKey) {
      console.log("[Showcase Mode] Contact submission received:", { name, email, topic, message });
      return res.status(200).json({
        success: true,
        message: "Message received successfully in showcase mode."
      });
    }

    const resend = new Resend(apiKey);
    const selectedTopic = topic || "General";
    const subject = `Portfolio Contact: ${selectedTopic} - ${name}`;

    const textContent = `New contact message from your portfolio website:

Name: ${name}
Email: ${email}
Topic: ${selectedTopic}

Message:
${message}

---
Sent via ashwinshenoy.me portfolio contact form.`;

    const htmlContent = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff;">
        <h2 style="color: #0f172a; margin-top: 0; font-size: 20px; border-bottom: 2px solid #F27D26; padding-bottom: 12px;">
          New Portfolio Message
        </h2>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
          <tr>
            <td style="padding: 8px 0; color: #64748b; font-size: 14px; width: 100px; font-weight: 600;">From:</td>
            <td style="padding: 8px 0; color: #0f172a; font-size: 14px; font-weight: 500;">${name} (&lt;<a href="mailto:${email}" style="color: #F27D26; text-decoration: none;">${email}</a>&gt;)</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #64748b; font-size: 14px; font-weight: 600;">Topic:</td>
            <td style="padding: 8px 0; color: #0f172a; font-size: 14px; font-weight: 500;">${selectedTopic}</td>
          </tr>
        </table>
        <div style="background-color: #f8fafc; border-left: 4px solid #F27D26; padding: 16px; border-radius: 6px; margin-bottom: 24px;">
          <p style="margin: 0; color: #334155; font-size: 15px; line-height: 1.6; white-space: pre-wrap;">${message}</p>
        </div>
        <p style="font-size: 12px; color: #94a3b8; margin: 0; text-align: center;">
          Sent directly from ashwinshenoy.me via Resend
        </p>
      </div>
    `;

    const { data, error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: ["ashwinshenoy7@gmail.com"],
      replyTo: email,
      subject: subject,
      text: textContent,
      html: htmlContent,
    });

    if (error) {
      console.error("Resend Email Delivery Error:", error);
      return res.status(400).json({ error: error.message || "Failed to send email message via Resend." });
    }

    return res.status(200).json({ success: true, id: data?.id, message: "Message sent successfully." });
  } catch (error: any) {
    console.error("Contact Form Server Error:", error);
    return res.status(500).json({ error: error.message || "Failed to send message. Please try again later." });
  }
}
