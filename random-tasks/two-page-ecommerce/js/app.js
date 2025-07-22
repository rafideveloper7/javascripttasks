//  Products Data stored in array of objs
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

// run funcs when web loads
document.addEventListener("DOMContentLoaded", () => {
  renderProducts(products);
  updateCartCount();
});

//  add Products to Page
function renderProducts(productsList) {
  const ul = document.querySelector("#products-ul");
  ul.innerHTML = ""; // Clear previous li in html

  productsList.forEach((product) => {
    // ye har product (obj of array) per loop karega and os keleye li created
    const li = document.createElement("li");
    li.classList.add("product-item", product.category); // yaha Filter ko use karenge & targeted li class by CSS
    // now adding item data in li
    li.innerHTML = `
      <img src="${product.image}" alt="${product.name}"> 
      <div class="bottom-card">
        <h3 class="title">${product.name}</h3>
        <p class="price">Price: $${product.price}</p>
        <p class="price">OFF 40%</p>
        <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
      </div>
    `;
    ul.appendChild(li); // yaha li ko ul mai put karta ha
  });
}

//  Handle Cart Logic

document.addEventListener("click", (e) => {
  // yaha checking if add btn clicked or not
  if (e.target.classList.contains("add-to-cart")) {
    const productId = +e.target.dataset.id; // + convert string to number
    const selectedProduct = products.find((p) => p.id === productId);

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existing = cart.find((item) => item.id === productId);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ ...selectedProduct, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount(); // it updates the ount on cart icon in menu
  }
});

// Update Cart Count in Nav
function updateCartCount() {
  // Step 1: get cart data form local , if not create empty [] array
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Step 2: calculate the items inside the cart 
  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Step 3: target karo i (cart icon) ko , class name kesath
  document.querySelectorAll(".cart i").forEach((icon) => {
    // add custom attribute which will use for css and adding counts value icon 
    icon.setAttribute("data-count", totalCount);

    // yaha icon ko relative possition apply keya 
    icon.style.position = "relative";

    // Step 4: Look for a span element inside the icon with class "cart-badge"
    // If not found, create one and add it to the icon
    let badge = icon.querySelector(".cart-badge") || // if badge exists, use it
      (() => { // IIFE
        const span = document.createElement("span"); // create new span
        span.className = "cart-badge";               // give it class
        icon.appendChild(span);                      // attach to icon
        return span;                                  // return it for use
      })();

    // Step 5: Set the text of the badge to the total item count
    badge.textContent = totalCount;
  });
}



// Category Filter
document.getElementById("all").addEventListener("click", () => renderProducts(products));

document.getElementById("boys").addEventListener("click", () =>
    renderProducts(products.filter((p) => p.category === "boys"))
  );
  
document.getElementById("girls").addEventListener("click", () =>
    renderProducts(products.filter((p) => p.category === "girls"))
  );

// Hamburger Menu Toggle
const hamburger = document.getElementById("hamburger");
const navBar = document.getElementById("nav-bar");

hamburger.addEventListener("click", () => {
  navBar.classList.toggle("show");
});
