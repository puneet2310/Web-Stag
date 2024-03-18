let shop = document.getElementById("shop");
let basket = JSON.parse(localStorage.getItem("data")) || [];

// Generates the shop with product cards composed of images, title, price, buttons, description

let generateShop = () => {
  let searchInput = document.getElementById("searchInput").value.toLowerCase();
  let minPrice = parseFloat(document.getElementById("minPriceInput").value) || 0;
  let maxPrice = parseFloat(document.getElementById("maxPriceInput").value) || Infinity;

  // Filter the shop items based on the search input and price range
  let filteredItems = shopItemsData.filter(item =>
    (item.name.toLowerCase().includes(searchInput) || item.desc.toLowerCase().includes(searchInput)) &&
    item.price >= minPrice && item.price <= maxPrice
  );

  // Generate HTML for the filtered shop items
  shop.innerHTML = filteredItems.map(({ id, name, desc, img, price }) => {
    let search = basket.find(({ id: basketId }) => basketId === id) || { item: 0 };
    return `
      <div id="product-id-${id}" class="item">
        <img width="220" height="300" src="${img}" alt="">
        <div class="details">
          <h3>${name}</h3>
          <p>${desc}</p>
          <div class="price-quantity">
            <h2>₹ ${price}</h2>
            <div class="buttons">
              <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
              <div id="${id}" class="quantity">${search.item}</div>
              <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
            </div>
          </div>
        </div>
      </div>
    `;
  }).join("");
};

generateShop();

//increment function same as before 

let increment = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);

  if (search === undefined) {
    basket.push({
      id: selectedItem.id,
      item: 1,
    });
  } else {
    search.item += 1;
  }

  console.log(basket);
  update(selectedItem.id);
  localStorage.setItem("data", JSON.stringify(basket));
};

//decrement function same as before
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
  console.log(basket);
  localStorage.setItem("data", JSON.stringify(basket));
};

//updating values on cards of each item

let update = (id) => {
  let search = basket.find((x) => x.id === id);
  document.getElementById(id).innerHTML = search.item;
  calculation();
};

//finding total amount of each item

let calculation = () => {
  let cartIcon = document.getElementById("cartAmount");
  cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};

calculation();

// Function to apply filters and generate shop items
let applyFilters = () => {
  generateShop();
};

// Event listener for search input button
document.getElementById("searchInput").addEventListener("input", applyFilters);

// Event listener for min and max price input fields
document.getElementById("minPriceInput").addEventListener("input", applyFilters);
document.getElementById("maxPriceInput").addEventListener("input", applyFilters);
