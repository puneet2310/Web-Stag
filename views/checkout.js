//this one is for the checkout/payment page 
let ShoppingCart = document.getElementById("shopping-cart");
let label = document.getElementById("label");

let basket = JSON.parse(localStorage.getItem("data")) || [];   //getting the basket with items from the local storage 

let calculation = () => {
  let cartIcon = document.getElementById("cartAmount");    //calculation of the cart total amount by items*prices
  cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};

calculation();

let generateCartItems = () => {
  if (basket.length !== 0) {    //execute when the cart is not empty
    return (ShoppingCart.innerHTML = basket
      .map((x) => {
        let { id, item } = x;
        let search = shopItemsData.find((x) => x.id === id) || [];
        let { img, price, name } = search;

        //this is all just the data for the cart item inside the checkout page now 
        return `
      <div class="cart-item">
        <img width="100" src=${img} alt="" />

        <div class="details">
        
          <div class="title-price-x">
            <h4 class="title-price">
              <p>${name}</p>
              <p class="cart-item-price">$ ${price}</p>
            </h4>
           
          </div>
          
          <div class="cart-buttons">
            <div class="buttons">
              
              <div id=${id} class="quantity">Quantity: ${item}</div>
              
            </div>
          </div>

          <h3>$ ${item * price}</h3>  
        
        </div>
      </div>
      `;
      })
      .join(""));
  } else {    //when the cart is empty then we just give the button to go back to the home page thats it 
    ShoppingCart.innerHTML = "";
    label.innerHTML = `
    <h2>Cart is Empty</h2>
    <a href="/new_index">
      <button class="HomeBtn">Back to Home</button>
    </a>
    `;
  }
};

generateCartItems();

let increment = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);
  //in case the item isnt found inside the checkout basket then just push it as well
  if (search === undefined) {
    basket.push({
      id: selectedItem.id,
      item: 1,
    });
  } else {    //and if it is found then increment its value
    search.item += 1;
  }

  generateCartItems();
  update(selectedItem.id);  
  localStorage.setItem("data", JSON.stringify(basket));    //update the values in the local storage basket
};
//next is the decrement function
let decrement = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);

  if (search === undefined) return;
  else if (search.item === 0) return;
  else {
    search.item -= 1;
  }

  update(selectedItem.id);
  basket = basket.filter((x) => x.item !== 0);
  generateCartItems();
  localStorage.setItem("data", JSON.stringify(basket));
};

let update = (id) => {
  let search = basket.find((x) => x.id === id);
  document.getElementById(id).innerHTML = search.item;
  calculation();
  TotalAmount();
};

let removeItem = (id) => {
  let selectedItem = id;
  basket = basket.filter((x) => x.id !== selectedItem.id);
  calculation();
  generateCartItems();
  TotalAmount();
  localStorage.setItem("data", JSON.stringify(basket));
};

//total amount inside the basket updation
let TotalAmount = () => {
  if (basket.length !== 0) {
    let amount = basket
      .map((x) => {
        let { id, item } = x;
        let filterData = shopItemsData.find((x) => x.id === id);
        return filterData.price * item;
      })
      .reduce((x, y) => x + y, 0);

    return (label.innerHTML = `
    <h2>Total Bill : $ ${amount}</h2>
    
    `);
  } else return;
};

TotalAmount();

let clearCart = () => {
  basket = [];
  generateCartItems();
  calculation();
  localStorage.setItem("data", JSON.stringify(basket));
};

//now we have the payment method where you cannot exactly pay through qr but there is a button like that 
function changePaymentMethod() {
  let paymentMethod = document.getElementById("paymentMethod").value;
  let payButton = document.getElementById("payButton");

  //if option chosen is payon delivery then give button names place order or show button pay
  if (paymentMethod === "payOnDelivery") {
    payButton.innerHTML = "Place Order";
  } else {
    payButton.innerHTML = "Pay";
  }
}

function handlePayment() {
  let paymentMethod = document.getElementById("paymentMethod").value;

  if (paymentMethod === "payOnDelivery") {
    placeOrder();
  } else {
    payByQRCode();
  }
}

//now are the functions for each option of payment where in both we just have a popup
function placeOrder() {
  alert("Your order has been placed. Thank you!");
  clearCart(); // Clear the cart
  window.location.href = "/new_index";
}

function payByQRCode() {
  // alert("You have chosen to pay by QR code. Please scan the code to proceed with the payment.");
  // window.location.href = "qr_code_payment.html";

  alert("This feature will be available very soon");
  window.location.href = "/checkout_new";
}
