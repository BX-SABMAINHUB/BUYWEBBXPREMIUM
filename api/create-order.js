const fetch = require('node-fetch');

export default async function handler(req, res) {
    const auth = Buffer.from("Afca3gBWdUQMaY4LTkgEZGmWfiDeJdoSdbdsJmKi8YyIYCLPdTarEkWKrK8ssbSTvnSpWmciEP8-yKiS:EC-NA2cbXfbDsitpyIeBZ9kGmq0FwWfkXCEW8YafxlVhfZQhIoFp2HM9qUhIZFIOF0PpVi_XoSbYKbcC").toString("base64");

    try {
        const order = await fetch('https://api-m.sandbox.paypal.com/v2/checkout/orders', {
            method: 'POST',
            headers: {
                'Authorization': `Basic ${auth}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                intent: "CAPTURE",
                purchase_units: [{
                    amount: {
                        currency_code: "EUR",
                        value: "5.00"
                    }
                }]
            })
        });

        const data = await order.json();
        res.status(200).json({ id: data.id });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to create order" });
    }
}
