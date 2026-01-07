export const config = { runtime: "edge" };

export default async function handler(req) {
  const auth = btoa("Afca3gBWdUQMaY4LTkgEZGmWfiDeJdoSdbdsJmKi8YyIYCLPdTarEkWKrK8ssbSTvnSpWmciEP8-yKiS:EC-NA2cbXfbDsitpyIeBZ9kGmq0FwWfkXCEW8YafxlVhfZQhIoFp2HM9qUhIZFIOF0PpVi_XoSbYKbcC");

  const order = await fetch('https://api-m.sandbox.paypal.com/v2/checkout/orders', {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${auth}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      intent: "CAPTURE",
      purchase_units: [{
        amount: { currency_code: "EUR", value: "5.00" }
      }]
    })
  });

  const data = await order.json();
  return new Response(JSON.stringify({ id: data.id }), { status: 200 });
}
