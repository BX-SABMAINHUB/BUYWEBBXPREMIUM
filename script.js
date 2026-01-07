paypal.Buttons({
  createOrder: async () => {
    const res = await fetch("/api/create-order", {
      method:"POST",
      headers:{ "Content-Type":"application/json" },
      body:JSON.stringify({ currency:"EUR" })
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
}).render("#paypal-eur");


paypal.Buttons({
  createOrder: async () => {
    const res = await fetch("/api/create-order", {
      method:"POST",
      headers:{ "Content-Type":"application/json" },
      body:JSON.stringify({ currency:"USD" })
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
}).render("#paypal-usd");


document.getElementById("instructions-btn").onclick = ()=>{
  document.getElementById("instructions-modal").style.display="block";
};

function closeInstructions(){
  document.getElementById("instructions-modal").style.display="none";
}
