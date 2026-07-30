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
      from: "Ashwin Shenoy <contact@ashwinshenoy.me>",
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

    // Send enhanced acknowledgement email to the visitor
    try {
      const ackTextContent = `Hi ${name},

Thank you for contacting me through my portfolio website.

I have successfully received your message and appreciate you taking the time to get in touch.

I'll review your enquiry and respond as soon as possible.

Your Message:
"${message}"

Visit Portfolio: https://ashwinshenoy.me

You can also learn more about my experience, leadership journey, and AI-enabled Quality Engineering initiatives on my website.

Best regards,

Ashwin Shenoy
Quality Engineering Leader
Delivery & Solution Strategist

Website: https://ashwinshenoy.me
LinkedIn: https://www.linkedin.com/in/ashwinshenoy7/
GitHub: https://github.com/ashwinshenoy7`;

      const ackHtmlContent = `
        <div style="background-color: #f8fafc; padding: 32px 16px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; border: 1px solid #e2e8f0; box-shadow: 0 4px 20px rgba(15, 23, 42, 0.05); overflow: hidden;">
            
            <!-- Top Accent Bar -->
            <div style="background-color: #F27D26; height: 6px; width: 100%;"></div>

            <!-- Header Section -->
            <div style="padding: 32px 32px 24px 32px; border-bottom: 1px solid #f1f5f9;">
              <h1 style="margin: 0; font-size: 20px; font-weight: 700; color: #0f172a; letter-spacing: -0.02em;">Ashwin Shenoy</h1>
              <p style="margin: 4px 0 0 0; font-size: 13px; color: #64748b; font-weight: 500;">Quality Engineering Leader | Delivery & Solution Strategist</p>
            </div>

            <!-- Main Content Body -->
            <div style="padding: 32px;">
              <h2 style="margin: 0 0 20px 0; font-size: 22px; font-weight: 700; color: #0f172a;">Thank you for reaching out!</h2>
              
              <p style="margin: 0 0 16px 0; font-size: 15px; line-height: 1.6; color: #334155;">Hi ${name},</p>
              
              <p style="margin: 0 0 16px 0; font-size: 15px; line-height: 1.6; color: #334155;">
                Thank you for contacting me through my portfolio website.
              </p>
              
              <p style="margin: 0 0 16px 0; font-size: 15px; line-height: 1.6; color: #334155;">
                I have successfully received your message and appreciate you taking the time to get in touch.
              </p>

              <p style="margin: 0 0 28px 0; font-size: 15px; line-height: 1.6; color: #334155;">
                I'll review your enquiry and respond as soon as possible.
              </p>

              <!-- Visitor Message Preview Section -->
              <div style="margin-bottom: 28px; background-color: #f8fafc; border-left: 4px solid #F27D26; border-radius: 6px; padding: 20px;">
                <p style="margin: 0 0 8px 0; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #64748b;">Your Message</p>
                <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #1e293b; font-style: italic; white-space: pre-wrap;">"${message}"</p>
              </div>

              <!-- Primary CTA Button -->
              <div style="margin-bottom: 24px; text-align: left;">
                <a href="https://ashwinshenoy.me" target="_blank" style="display: inline-block; background-color: #0f172a; color: #ffffff; font-size: 14px; font-weight: 600; text-decoration: none; padding: 14px 28px; border-radius: 10px; box-shadow: 0 2px 4px rgba(15, 23, 42, 0.1);">Visit Portfolio &rarr;</a>
              </div>

              <p style="margin: 0 0 32px 0; font-size: 13px; line-height: 1.6; color: #64748b;">
                You can also learn more about my experience, leadership journey, and AI-enabled Quality Engineering initiatives on my website.
              </p>

              <!-- Footer Section -->
              <div style="padding-top: 24px; border-top: 1px solid #f1f5f9; color: #334155;">
                <p style="margin: 0; font-size: 14px; color: #475569;">Best regards,</p>
                <p style="margin: 6px 0 2px 0; font-size: 16px; font-weight: 700; color: #0f172a;">Ashwin Shenoy</p>
                <p style="margin: 0 0 16px 0; font-size: 13px; color: #64748b; line-height: 1.4;">
                  Quality Engineering Leader<br />
                  Delivery & Solution Strategist
                </p>

                <!-- Social Links Footer -->
                <table style="border-collapse: collapse; margin-top: 12px;">
                  <tr>
                    <td style="padding-right: 16px; font-size: 13px;">
                      <a href="https://ashwinshenoy.me" target="_blank" style="color: #F27D26; text-decoration: none; font-weight: 600;">Website</a>
                    </td>
                    <td style="padding-right: 16px; font-size: 13px;">
                      <a href="https://www.linkedin.com/in/ashwinshenoy7/" target="_blank" style="color: #0284c7; text-decoration: none; font-weight: 600;">LinkedIn</a>
                    </td>
                    <td style="font-size: 13px;">
                      <a href="https://github.com/ashwinshenoy7" target="_blank" style="color: #334155; text-decoration: none; font-weight: 600;">GitHub</a>
                    </td>
                  </tr>
                </table>
              </div>

            </div>
          </div>
        </div>
      `;

      const { error: ackError } = await resend.emails.send({
        from: "Ashwin Shenoy <contact@ashwinshenoy.me>",
        to: [email],
        subject: "Thank you for reaching out",
        text: ackTextContent,
        html: ackHtmlContent,
      });

      if (ackError) {
        console.error("Resend Acknowledgement Email Error:", ackError);
      }
    } catch (ackException) {
      console.error("Exception sending acknowledgement email:", ackException);
    }

    return res.status(200).json({ success: true, id: data?.id, message: "Message sent successfully." });
  } catch (error: any) {
    console.error("Contact Form Server Error:", error);
    return res.status(500).json({ error: error.message || "Failed to send message. Please try again later." });
  }
}
