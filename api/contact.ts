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

    const accessKey = process.env.WEB3FORMS_ACCESS_KEY;

    // If Web3Forms access key is not configured, acknowledge gracefully in showcase mode
    if (!accessKey) {
      console.log("[Showcase Mode] Web3Forms submission received:", { name, email, topic, message });
      return res.status(200).json({
        success: true,
        message: "Message received successfully in showcase mode."
      });
    }

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: accessKey,
        name,
        email,
        subject: `[Portfolio Inquiry] ${topic || "General Connection"} — from ${name}`,
        topic: topic || "N/A",
        message,
        from_name: name,
      }),
    });

    const data = await response.json();

    if (response.ok && data.success) {
      return res.status(200).json({ success: true, message: "Message sent successfully." });
    } else {
      console.error("Web3Forms API Error:", data);
      return res.status(400).json({ error: data.message || "Failed to submit message to Web3Forms." });
    }
  } catch (error: any) {
    console.error("Contact Form Server Error:", error);
    return res.status(500).json({ error: "Failed to send message. Please try again later." });
  }
}
