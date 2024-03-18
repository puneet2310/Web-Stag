let ShoppingCart = document.getElementById("shopping-cart");
let label = document.getElementById("label");  
//creating an array basket of the orders we have got from products page
//getting the orders stored through the local storages
let basket = JSON.parse(localStorage.getItem("data")) || [];

let calculation = () => {
  let cartIcon = document.getElementById("cartAmount"); 
  // getting total number of elements in the basket
  cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};

calculation();  // calling the function to update the number of elements on the cart


let generateCartItems = () => {
  if (basket.length !== 0) {
    return (ShoppingCart.innerHTML = basket    //if basket not empty then just generate cast items html adn give it to shoppingcart
      .map((x) => {
        let { id, item } = x;
        let search = shopItemsData.find((x) => x.id === id) || [];    //find corresponding data based on the product id unique to all
        let { img, price, name } = search;
        return `
      <div class="cart-item">
        <img width="100" height="150" src=${img} alt="" />

        <div class="details">
        
          <div class="title-price-x">
            <h4 class="title-price">
              <p>${name}</p>
              <p class="cart-item-price" width="50">$${price}</p>
            </h4>
            <i onclick="removeItem(${id})" class="bi bi-x-lg"></i>
          </div>

          
          <div class="cart-buttons">       
            <div class="buttons">
              <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
              <div id=${id} class="quantity">${item}</div>
              <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
            </div>
          </div>

          <h3>$ ${item * price}</h3>
        
        </div>
      </div>
      `;
      })
      .join(""));    //join all elements in a single string
    
    //in case tehe basket is empty, show the button  of empty cart 
  } else {
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
//now the function is for to add those selected items into our cart by finding them using their IDs
let increment = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);    finding out the 

  if (search === undefined) {
    basket.push({    //if we cant find the item in the cart then just add it as the first item with amount = 1
      id: selectedItem.id,
      item: 1,
    });
  } else {    //in case the id is found inside the cart already then just increase its amount by unity
    search.item += 1;
  }

  generateCartItems();  
  update(selectedItem.id);
  localStorage.setItem("data", JSON.stringify(basket));    //we store all this data into our local storage
};


// now for the decrement button we call the function below 
let decrement = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);    //searching the item inside the cart first

  if (search === undefined) return;    //if the search is undefined and i dont find that product then return back
  else if (search.item === 0) return;    //if the product was there but its value has been taken down to 0 then we return as well
  else {  
    search.item -= 1;      //else, decrease the amount by unity
  }

  update(selectedItem.id);
  basket = basket.filter((x) => x.item !== 0);
  generateCartItems();
  localStorage.setItem("data", JSON.stringify(basket));
};

//To update the digits of picked items on each item card
let update = (id) => {
  let search = basket.find((x) => x.id === id);
  document.getElementById(id).innerHTML = search.item;
  calculation();
  TotalAmount();
};


let removeItem = (id) => {      //for the cross button inside the cart 
  let selectedItem = id;
  basket = basket.filter((x) => x.id !== selectedItem.id);  

  // we do all the process once again of calculating then generating the new cart items and then finding the total amt
  calculation();
  generateCartItems();
  TotalAmount();
  localStorage.setItem("data", JSON.stringify(basket));
};


//to calculate the total amount of any product 
let TotalAmount = () => {
  if (basket.length !== 0) {
    let amount = basket
      .map((x) => {
        let { id, item } = x;
        let filterData = shopItemsData.find((x) => x.id === id);
        return filterData.price * item;    //filling in the price 
      })
      .reduce((x, y) => x + y, 0);

    //adding buttons to the cart page for it to go to the checkout page or the clear cart page
    return (label.innerHTML = `
    <h2>Total Bill : $ ${amount}</h2>
    <a href="/checkout_new" ><button class="checkout">Checkout</button></a>    
    <button onclick="clearCart()" class="removeAll">Clear Cart</button>
    `);
  } else return;
};

TotalAmount();

// clearing the cart and removing all from the local storage as setting the basket back to an empty list
let clearCart = () => {
  basket = [];
  generateCartItems();
  calculation();
  localStorage.setItem("data", JSON.stringify(basket));
};
