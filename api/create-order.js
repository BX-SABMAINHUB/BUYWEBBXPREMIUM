export const config = { runtime: "edge" };

export default async function handler(req) {
  if (req.method !== "POST") return new Response("Only POST allowed", { status: 405 });

  try {
    const body = await req.json();
    const currency = body.currency || "EUR"; // moneda seleccionada
    const value = "5.00"; // precio fijo

    const clientId = "Afca3gBWdUQMaY4LTkgEZGmWfiDeJdoSdbdsJmKi8YyIYCLPdTarEkWKrK8ssbSTvnSpWmciEP8-yKiS";
    const secret = "EC-NA2cbXfbDsitpyIeBZ9kGmq0FwWfkXCEW8YafxlVhfZQhIoFp2HM9qUhIZFIOF0PpVi_XoSbYKbcC";

    const auth = btoa(`${clientId}:${secret}`);

    const order = await fetch("https://api-m.sandbox.paypal.com/v2/checkout/orders", {
      method: "POST",
      headers: {
        "Authorization": `Basic ${auth}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        intent: "CAPTURE",
        purchase_units: [{ amount: { currency_code: currency, value: value } }]
      })
    });

    const data = await order.json();
    if (data.name) return new Response(JSON.stringify({ error: data }), { status: 400 });

    return new Response(JSON.stringify({ id: data.id }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
