// 🚀 Product Data
const products = [
  {
    id: 1,
    category: "boys",
    name: "Product 1",
    price: 50,
    image: "assets/01.png",
  },
  {
    id: 2,
    category: "boys",
    name: "Product 2",
    price: 70,
    image: "assets/02.png",
  },
  {
    id: 3,
    category: "boys",
    name: "Product 3",
    price: 30,
    image: "assets/03.png",
  },
  {
    id: 4,
    category: "boys",
    name: "Product 4",
    price: 90,
    image: "assets/04.png",
  },
  {
    id: 5,
    category: "girls",
    name: "Product 5",
    price: 30,
    image: "assets/05.png",
  },
  {
    id: 6,
    category: "girls",
    name: "Product 6",
    price: 70,
    image: "assets/06.png",
  },
  {
    id: 7,
    category: "girls",
    name: "Product 7",
    price: 20,
    image: "assets/07.png",
  },
  {
    id: 8,
    category: "girls",
    name: "Product 8",
    price: 60,
    image: "assets/08.png",
  },
];

// ✅ Init on DOM Ready
document.addEventListener("DOMContentLoaded", () => {
  renderProducts(products);
  updateCartCount();
});

// 💡 Render Products to Page
function renderProducts(productsList) {
  const ul = document.querySelector("#products-ul");
  ul.innerHTML = ""; // Clear previous

  productsList.forEach((product) => {
    const li = document.createElement("li");
    li.classList.add("product-item", product.category);
    li.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <div class="bottom-card">
        <h3 class="title">${product.name}</h3>
        <p class="price">Price: $${product.price}</p>
        <p class="price">OFF 40%</p>
        <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
      </div>
    `;
    ul.appendChild(li);
  });
}

// 🧠 Handle Cart Logic
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("add-to-cart")) {
    const productId = +e.target.dataset.id;
    const selectedProduct = products.find((p) => p.id === productId);

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existing = cart.find((item) => item.id === productId);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ ...selectedProduct, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
  }
});

// 🧮 Update Cart Count in Nav
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  document.querySelectorAll(".cart i").forEach((icon) => {
    icon.setAttribute("data-count", totalCount);
    icon.style.position = "relative";
  });

  // Optional: you can add a badge for visual count
  document.querySelectorAll(".cart i").forEach((icon) => {
    let badge = icon.querySelector(".cart-badge");
    if (!badge) {
      badge = document.createElement("span");
      badge.classList.add("cart-badge");
      icon.appendChild(badge);
    }
    badge.textContent = totalCount;
  });
}

// 🎯 Category Filter
document
  .getElementById("all")
  .addEventListener("click", () => renderProducts(products));
document
  .getElementById("boys")
  .addEventListener("click", () =>
    renderProducts(products.filter((p) => p.category === "boys"))
  );
document
  .getElementById("girls")
  .addEventListener("click", () =>
    renderProducts(products.filter((p) => p.category === "girls"))
  );

// 🍔 Hamburger Menu Toggle
const hamburger = document.getElementById("hamburger");
const navBar = document.getElementById("nav-bar");

hamburger.addEventListener("click", () => {
  navBar.classList.toggle("show");
});
