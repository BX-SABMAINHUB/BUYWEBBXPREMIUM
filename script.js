paypal.Buttons({
    createOrder: async function(data, actions) {
        // Llama a tu backend para crear orden
        const res = await fetch('/api/create-order');
        const order = await res.json();
        return order.id; // Devuelve el ID de la orden a PayPal
    },
    onApprove: async function(data, actions) {
        // Captura el pago en tu backend
        const res = await fetch('/api/capture-order', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ orderID: data.orderID })
        });
        const result = await res.json();
        if(result.success) {
            document.getElementById('key-link').style.display = 'block';
        } else {
            alert('Payment failed or incorrect amount.');
        }
    }
}).render('#paypal-button-container');
