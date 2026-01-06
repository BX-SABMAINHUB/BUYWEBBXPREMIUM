const buyBtn = document.getElementById("buyBtn");
const overlay = document.getElementById("overlay");
const closeBtn = document.getElementById("closeBtn");

const discordLink = "https://discord.com/channels/1450199337207595152/1458218092663410698";

buyBtn.onclick = () => {
  overlay.style.display = "flex";
};

closeBtn.onclick = () => {
  overlay.style.display = "none";
};

document.querySelector(".paypal").onclick = () => {
  window.open(discordLink, "_blank");
};

document.querySelector(".robux").onclick = () => {
  window.open(discordLink, "_blank");
};
