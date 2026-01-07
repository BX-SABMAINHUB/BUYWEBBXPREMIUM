export const config = { runtime: "edge" };

export default async function handler(req){
  const { orderID } = await req.json();

  const auth = btoa("CLIENT_ID:SECRET");

  const r = await fetch(`https://api-m.sandbox.paypal.com/v2/checkout/orders/${orderID}/capture`,{
    method:"POST",
    headers:{ "Authorization":`Basic ${auth}` }
  });

  const data = await r.json();
  return new Response(JSON.stringify({ success:data.status==="COMPLETED" }),{status:200});
}
