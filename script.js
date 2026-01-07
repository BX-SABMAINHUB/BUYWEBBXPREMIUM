paypal.Buttons({
  createOrder: async function() {
    const res = await fetch('/api/create-order');
    const data = await res.json();
    return data.id;
  },
  onApprove: async function(data) {
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
