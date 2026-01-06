const buyPack = document.getElementById('buyPack');
const buyFrame = document.getElementById('buyFrame');
const keyMsg = document.getElementById('keyMsg');

// Abrir frame de compra
buyPack.addEventListener('click', () => {
  buyFrame.style.display = 'block';
});

// Botón Robux
document.getElementById('robuxBtn').addEventListener('click', () => {
  alert("CONTACT ALEX BY DISCORD TO BUY THIS WITH ROBUX");
});

// Botón PayPal
document.getElementById('paypalBtn').addEventListener('click', async () => {
  try {
    const res = await fetch("/api/paypal");
    const data = await res.json();

    if(data.success){
      keyMsg.style.display = 'block'; // Muestra la key solo si pago correcto
    } else {
      alert("Payment not received or amount incorrect!");
    }
  } catch(err){
    console.error(err);
    alert("Error verifying payment");
  }
});

// Cerrar frame
document.getElementById('closeFrame').addEventListener('click', () => {
  buyFrame.style.display = 'none';
});

// Cerrar mensaje key
document.getElementById('closeKeyMsg').addEventListener('click', () => {
  keyMsg.style.display = 'none';
});
