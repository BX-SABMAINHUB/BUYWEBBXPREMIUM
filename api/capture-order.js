export const config = { runtime: "edge" };

export default async function handler(req) {
  if (req.method !== "POST") return new Response("Only POST allowed", { status: 405 });

  try {
    const body = await req.json();
    const { orderID } = body;

    const clientId = "Afca3gBWdUQMaY4LTkgEZGmWfiDeJdoSdbdsJmKi8YyIYCLPdTarEkWKrK8ssbSTvnSpWmciEP8-yKiS";
    const secret = "EC-NA2cbXfbDsitpyIeBZ9kGmq0FwWfkXCEW8YafxlVhfZQhIoFp2HM9qUhIZFIOF0PpVi_XoSbYKbcC";

    const auth = btoa(`${clientId}:${secret}`);

    const capture = await fetch(`https://api-m.sandbox.paypal.com/v2/checkout/orders/${orderID}/capture`, {
      method: "POST",
      headers: { "Authorization": `Basic ${auth}`, "Content-Type": "application/json" }
    });

    const data = await capture.json();
    if (data.status === "COMPLETED") return new Response(JSON.stringify({ success: true }), { status: 200 });
    else return new Response(JSON.stringify({ success: false }), { status: 400 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
