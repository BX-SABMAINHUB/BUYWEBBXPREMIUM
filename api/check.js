export default function handler(req, res) {
  // Genera key de 7 dígitos por día
  const key = Math.floor(Math.random() * 9000000) + 1000000;
  
  res.status(200).send(`{
    "KEY": ${key}
  }`);
}
