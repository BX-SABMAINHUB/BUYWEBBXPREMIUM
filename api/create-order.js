export const config = { runtime: "edge" };

export default async function handler(req) {
  try {
    // Asegúrate de que sea POST
    if(req.method !== "POST") return new Response("Only POST allowed", { status: 405 });

    // Leer JSON correctamente
    const body = await req.json();
    const currency = body.currency || "EUR"; // default EUR
    const value = "5.00"; // precio

    const auth = btoa("TU_CLIENT_ID:TU_SECRET");

    const order = await fetch('https://api-m.sandbox.paypal.com/v2/checkout/orders', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        intent: "CAPTURE",
        purchase_units: [{ amount: { currency_code: currency, value: value } }]
      })
    });

    const data = await order.json();

    // Revisar si hay error
    if(data.name) {
      console.log("PayPal error:", data);
      return new Response(JSON.stringify({ error: data }), { status: 400 });
    }

    return new Response(JSON.stringify({ id: data.id }), { status: 200 });
  } catch(err) {
    console.log("Create order error:", err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
