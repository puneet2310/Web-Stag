document.addEventListener("DOMContentLoaded", function() {
    // Fetch bill amount from localStorage or set default value
    let billAmount = JSON.parse(localStorage.getItem("billAmount")) || 0;
    displayBillAmount(billAmount);
  });
  
  // Function to display the bill amount
  function displayBillAmount(amount) {
    let billAmountElement = document.getElementById("billAmount");
    billAmountElement.innerHTML = `<h2>Total Bill : $ ${amount}</h2>`;
  }
  
  // Function to handle payment on delivery option
  function payOnDelivery() {
    // Implement your logic here for payment on delivery
    alert("You have chosen to pay on delivery. Thank you for your order!");
    // Redirect to home page or any other page as needed
    window.location.href = "index.html";
  }
  
  // Function to handle payment by QR code option
  function payByQRCode() {
    // Implement your logic here for payment by QR code
    alert("You have chosen to pay by QR code. Please scan the code to proceed with the payment.");
    // Redirect to QR code payment page or any other page as needed
    window.location.href = "qr_code_payment.html";
  }
  