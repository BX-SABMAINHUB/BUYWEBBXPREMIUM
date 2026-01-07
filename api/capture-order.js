import fetch from "node-fetch";

export default async function handler(req, res) {
  if(req.method !== "POST") return res.status(405).json({error: "Only POST allowed"});

  try {
    const { orderID } = req.body;
    const clientId = "Afca3gBWdUQMaY4LTkgEZGmWfiDeJdoSdbdsJmKi8YCLPdTarEkWKrK8ssbSTvnSpWmciEP8-yKiS";
    const secret = "EC-NA2cbXfbDsitpyIeBZ9kGmq0FwWfkXCEW8YafxlVhfZQhIoFp2HM9qUhIZFIOF0PpVi_XoSbYKbcC";

    const auth = Buffer.from(`${clientId}:${secret}`).toString("base64");

    const captureRes = await fetch(`https://api-m.sandbox.paypal.com/v2/checkout/orders/${orderID}/capture`, {
      method: "POST",
      headers: {
        "Authorization": `Basic ${auth}`,
        "Content-Type": "application/json"
      }
    });

    const data = await captureRes.json();
    if(data.status === "COMPLETED") res.status(200).json({ success: true });
    else res.status(400).json({ success: false });
  } catch(err) {
    console.log("Capture order error:", err);
    res.status(500).json({ error: err.message });
  }
}
