export const config = { runtime: "edge" };

export default async function handler(req) {
  const { currency } = await req.json();

  const auth = btoa("CLIENT_ID:SECRET");

  const r = await fetch("https://api-m.sandbox.paypal.com/v2/checkout/orders",{
    method:"POST",
    headers:{
      "Authorization":`Basic ${auth}`,
      "Content-Type":"application/json"
    },
    body:JSON.stringify({
      intent:"CAPTURE",
      purchase_units:[{
        amount:{ currency_code:currency, value:"5.00" }
      }]
    })
  });

  const data = await r.json();
  return new Response(JSON.stringify({ id:data.id }),{status:200});
}
