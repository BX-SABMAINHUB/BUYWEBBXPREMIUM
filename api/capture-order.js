const fetch = require('node-fetch');

export default async function handler(req, res) {
    const { orderID } = req.body;
    const auth = Buffer.from("Afca3gBWdUQMaY4LTkgEZGmWfiDeJdoSdbdsJmKi8YyIYCLPdTarEkWKrK8ssbSTvnSpWmciEP8-yKiS:EC-NA2cbXfbDsitpyIeBZ9kGmq0FwWfkXCEW8YafxlVhfZQhIoFp2HM9qUhIZFIOF0PpVi_XoSbYKbcC").toString("base64");

    try {
        const capture = await fetch(`https://api-m.sandbox.paypal.com/v2/checkout/orders/${orderID}/capture`, {
            method: 'POST',
            headers: {
                'Authorization': `Basic ${auth}`,
                'Content-Type': 'application/json'
            }
        });

        const data = await capture.json();

        if(data.status === "COMPLETED") {
            res.status(200).json({ success: true });
        } else {
            res.status(400).json({ success: false });
        }

    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: "Failed to capture order" });
    }
}
