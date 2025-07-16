// Load Cart from localStorage
document.addEventListener("DOMContentLoaded", () => {
  renderCart();
});

function renderCart() {
  const cartItemsContainer = document.getElementById("cart-items");
  const totalElement = document.getElementById("total");
  const totalPrice = document.getElementById("total-price");
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  cartItemsContainer.innerHTML = "";

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = "<p>Your cart is empty 🚫</p>";
    totalElement.textContent = "$0";
    if (totalPrice) {
      totalPrice.textContent = "0";
    }
    return;
  }

  let total = 0;

  cart.forEach((item) => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    const li = document.createElement("li");
    li.classList.add("cart-item");
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
        <p class="item-total">Total: $${itemTotal}</p>
        <button class="remove" data-id="${item.id}">Remove</button>
      </div>
    `;
    cartItemsContainer.appendChild(li);
  });

  totalElement.textContent = `$${total}`;
}

document.addEventListener("click", (e) => {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const id = parseInt(e.target.dataset.id);

  if (e.target.classList.contains("increase")) {
    const item = cart.find((p) => p.id === id);
    if (item) {
      item.quantity += 1;
    }
  }

  if (e.target.classList.contains("decrease")) {
    const item = cart.find((p) => p.id === id);
    if (item && item.quantity > 1) {
      item.quantity -= 1;
    }
  }

  if (e.target.classList.contains("remove")) {
    cart = cart.filter((p) => p.id !== id);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
});
