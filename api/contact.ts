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

    const rawText = await response.text();
    console.log(`Web3Forms API HTTP Status: ${response.status}`, `Raw Response: ${rawText}`);

    let data: any;
    try {
      data = JSON.parse(rawText);
    } catch (parseError) {
      console.error("Failed to parse Web3Forms response as JSON:", {
        status: response.status,
        rawText,
        parseError,
      });
      return res.status(400).json({
        error: `Web3Forms API returned non-JSON response (HTTP ${response.status}): ${rawText}`,
      });
    }

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
