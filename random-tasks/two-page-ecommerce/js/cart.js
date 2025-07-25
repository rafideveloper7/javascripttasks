// Load Cart from localStorage

// only load this func when page load
document.addEventListener("DOMContentLoaded", () => {
  renderCart();
});

// main func -> create UI, fetch data, calulate total
function renderCart() {
  const cartItemsContainer = document.getElementById("cart-ul"); // ul - form html
  const totalElement = document.getElementById("total"); // cart footer p shows total - from html

  /*
   we got this type data 
    {
    id: 1,
    category: "boys",
    name: "Product 1",
    price: 50,
    image: "assets/01.png",
  } 
    */

  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  cartItemsContainer.innerHTML = ""; // remove all li's in ul...

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = "<p>Cart is empty! <br> Please select products to purchase...</p>"
    return // if this true the all rest code will not run 
  }

  let total = 0; // price of all products -> item price x products counts

  cart.forEach((item) => {
    const allItemsPrice = item.price * item.quantity;
    total += allItemsPrice;

    totalElement.textContent = `$${total}`;

    const li = document.createElement("li");
    li.classList.add("cart-item");
    // in btns ${item.id} used to target the specific item
    li.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <div class="cart-details">
        <h3 class="cart-title">${item.name}</h3>
        <p class="cart-price">Price: $${item.price}</p>
        <div class="quantity-control">
          <button class="decrease" data-id="${item.id}">-</button>
          <span class="quantity">${item.quantity}</span>
          <button class="increase" data-id="${item.id}">+</button>
        </div>
        <p class="item-total">Total: $${allItemsPrice}</p>
        <button class="remove" data-id="${item.id}">Remove</button>
      </div>
    `;
    cartItemsContainer.appendChild(li);
  });

  
}


// global listner - good for all btns
document.addEventListener("click", (e) => {
  let cart = JSON.parse(localStorage.getItem("cart")) || []; // geting live updates on every clicks
  // checks which product btn clicked , (dataset.id -- in html  data-id="1" ) , + (stored in string to convert into number)
  const clickedBtnId = +e.target.dataset.id;

  // INCREASE quantity
  if (e.target.classList.contains("increase")) {
    const item = cart.find((p) => p.id === clickedBtnId); // chsck if the cliecked btn id = with array product id
    if (item) {
      item.quantity += 1;
    }
  }

  // DECREASE quantity and REMOVE if 0
  if (e.target.classList.contains("decrease")) {
    const item = cart.find((p) => p.id === clickedBtnId);
    if (item) {
      item.quantity -= 1;

      if (item.quantity <= 0 ) {
        // remove item if quantity becomes 0 or negative
        cart = cart.filter((p) => p.id !== clickedBtnId);
      }
    }
  }

  // REMOVE button clicked
  if (e.target.classList.contains("remove")) {
    cart = cart.filter((p) => p.id !== clickedBtnId);
  }

  // Save and refresh UI
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
});
