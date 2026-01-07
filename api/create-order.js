import fetch from "node-fetch";

export default async function handler(req, res) {
  if(req.method !== "POST") return res.status(405).json({error: "Only POST allowed"});

  try {
    const { currency } = req.body || { currency: "EUR" };
    const value = "5.00"; // monto fijo

    const clientId = "Afca3gBWdUQMaY4LTkgEZGmWfiDeJdoSdbdsJmKi8YyIYCLPdTarEkWKrK8ssbSTvnSpWmciEP8-yKiS";
    const secret = "EC-NA2cbXfbDsitpyIeBZ9kGmq0FwWfkXCEW8YafxlVhfZQhIoFp2HM9qUhIZFIOF0PpVi_XoSbYKbcC";

    const auth = Buffer.from(`${clientId}:${secret}`).toString("base64");

    const orderRes = await fetch("https://api-m.sandbox.paypal.com/v2/checkout/orders", {
      method: "POST",
      headers: {
        "Authorization": `Basic ${auth}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        intent: "CAPTURE",
        purchase_units: [{
          amount: { currency_code: currency, value: value }
        }]
      })
    });

    const data = await orderRes.json();
    if(data.name) return res.status(400).json({ error: data });

    res.status(200).json({ id: data.id });
  } catch(err) {
    console.log("Create order error:", err);
    res.status(500).json({ error: err.message });
  }
}
