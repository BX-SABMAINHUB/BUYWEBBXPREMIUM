import fetch from "node-fetch";

export default async function handler(req, res) {
  const { orderID } = req.body; // el frontend debe mandar el ID de la orden

  const auth = Buffer.from(
    process.env.PAYPAL_CLIENT_ID + ":" + process.env.PAYPAL_SECRET
  ).toString("base64");

  // Pedimos a PayPal que capture (confirme) la orden
  const capture = await fetch(
    `https://api-m.sandbox.paypal.com/v2/checkout/orders/${orderID}/capture`,
    {
      method: "POST",
      headers: { Authorization: `Basic ${auth}` }
    }
  ).then(r => r.json());

  // Extraemos el monto para validar que sea EXACTO
  const amount = capture.purchase_units?.[0]?.payments?.captures?.[0]?.amount;

  if (
    capture.status === "COMPLETED" &&    // Pago completado
    amount.value === "5.00" &&           // Monto correcto
    amount.currency_code === "EUR"       // Moneda correcta
  ) {
    // Pago OK → devolvemos link de la key diaria
    res.json({
      success: true,
      link: "https://dailykey.vercel.app/"  // Link que quieres mostrar
    });
  } else {
    // Pago fallido o incorrecto
    res.json({ success: false });
  }
}
