import fetch from "node-fetch";

export default async function handler(req, res) {
  // Aquí juntamos Client ID y Secret para autenticarnos con PayPal
  const auth = Buffer.from(
    process.env.PAYPAL_CLIENT_ID + ":" + process.env.PAYPAL_SECRET
  ).toString("base64");

  // Creamos la orden de pago con PayPal
  const order = await fetch(
    "https://api-m.sandbox.paypal.com/v2/checkout/orders", // Sandbox = pruebas
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${auth}`
      },
      body: JSON.stringify({
        intent: "CAPTURE", // indica que queremos cobrar directamente
        purchase_units: [{
          amount: {
            currency_code: "EUR", // moneda
            value: "5.00"         // precio exacto
          }
        }]
      })
    }
  ).then(r => r.json());

  // Devolvemos la orden a quien llame a la API (el frontend)
  res.json(order);
}
