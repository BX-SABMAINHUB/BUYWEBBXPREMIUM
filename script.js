// Mostrar frame al click en el pack
const buyPack = document.getElementById('buyPack');
const buyFrame = document.getElementById('buyFrame');
const keyMsg = document.getElementById('keyMsg');

buyPack.addEventListener('click', () => {
  buyFrame.style.display = 'block';
});

// Botón Robux
document.getElementById('robuxBtn').addEventListener('click', () => {
  // Redirige a la página de Roblox
  window.open('https://www.roblox.com/es/catalog/99017391115458/BX-PREMIUM', '_blank');

  // Después de comprar, muestra el link de la daily key
  keyMsg.style.display = 'block';
});

// Botón PayPal
document.getElementById('paypalBtn').addEventListener('click', () => {
  alert('CONTACT AT ALEX FOR BUYING, APPEAL TO DISCORD');
});

// Cerrar frame
document.getElementById('closeFrame').addEventListener('click', () => {
  buyFrame.style.display = 'none';
});

// Cerrar mensaje key
document.getElementById('closeKeyMsg').addEventListener('click', () => {
  keyMsg.style.display = 'none';
});
