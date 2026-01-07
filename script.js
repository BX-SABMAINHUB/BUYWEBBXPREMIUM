const clientId = "Afca3gBWdUQMaY4LTkgEZGmWfiDeJdoSdbdsJmKi8YyIYCLPdTarEkWKrK8ssbSTvnSpWmciEP8-yKiS";
let currentCurrency = "EUR";

function loadPayPal(currency) {
  document.getElementById("paypal-button-container").innerHTML = "";

  const old = document.getElementById("paypal-sdk");
  if (old) old.remove();

  const script = document.createElement("script");
  script.id = "paypal-sdk";
  script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=${currency}&disable-funding=card`;
  script.onload = renderButtons;
  document.body.appendChild(script);
}

function renderButtons() {
  paypal.Buttons({
    createOrder: async () => {
      const res = await fetch("/api/create-order", {
        method:"POST",
        headers:{ "Content-Type":"application/json" },
        body:JSON.stringify({ currency: currentCurrency })
      });
      const data = await res.json();
      return data.id;
    },
    onApprove: async (data) => {
      const res = await fetch("/api/capture-order", {
        method:"POST",
        headers:{ "Content-Type":"application/json" },
        body:JSON.stringify({ orderID:data.orderID })
      });
      const result = await res.json();
      if(result.success){
        document.getElementById("key-link").style.display="block";
      }
    }
  }).render("#paypal-button-container");
}

document.getElementById("currency").addEventListener("change", e=>{
  currentCurrency = e.target.value;
  loadPayPal(currentCurrency);
});

document.getElementById("instructions-btn").onclick = ()=>{
  document.getElementById("instructions-modal").style.display="block";
};

function closeInstructions(){
  document.getElementById("instructions-modal").style.display="none";
}

loadPayPal(currentCurrency);
