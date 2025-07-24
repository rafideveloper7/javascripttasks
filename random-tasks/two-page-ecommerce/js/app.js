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
    const productId = +e.target.dataset.id; // Gets the data-id from the button
    const selectedProduct = products.find((p) => p.id === productId); // checking which product clicked | looking form array

    let cart = JSON.parse(localStorage.getItem("cart")) || []; // gets old data from local storagee
     // check if cart dta exist so we'll not duplicate just increse value
    const existing = cart.find((item) => item.id === productId);

    if (existing) {
      existing.quantity += 1; // if yes exist jsut increase value +1
    } else {
      cart.push({ ...selectedProduct, quantity: 1 }); // if not exists jsut copy full obj and add
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount(); // it updates the ount on cart icon in menu
  }
});

// updates cart icon badge count 
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  // reduce > acc, curr | acc = computed value & curr = item number in array
  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const icon = document.querySelector(".cart i");
  icon.style.position = "relative";

  // Check if badge exists, else create it
  let badge = icon.querySelector(".cart-badge");
  if (!badge) {
    badge = document.createElement("span");
    badge.className = "cart-badge";
    icon.appendChild(badge);
  }
  // Set the count
  badge.textContent = totalCount;
}

// Category Filter
document.getElementById("all").addEventListener("click", () => renderProducts(products));

document.getElementById("boys").addEventListener("click", () =>
    renderProducts(products.filter((p) => p.category === "boys"))
  );
  
document.getElementById("girls").addEventListener("click", () =>
    renderProducts(products.filter((p) => p.category === "girls"))
  );
