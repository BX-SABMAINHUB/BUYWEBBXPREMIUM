export default async function handler(req, res) {
  // ⚠️ Para pagos reales usar la API de PayPal
  // Este es un ejemplo simulado:
  const paid = true;   // Cambiar a true solo si el pago fue correcto
  const amount = 5;    // Verificar que el usuario pagó 5$

  if(paid && amount === 5){
    res.status(200).json({ success: true });
  } else {
    res.status(200).json({ success: false });
  }
}
