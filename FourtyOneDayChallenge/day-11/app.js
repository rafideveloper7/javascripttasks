class Product {
    constructor(id, name, price, image) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.image = image;
        this.quantity = 0;
    }

    increase() {
        this.quantity++;
    }

    decrease() {
        if (this.quantity > 0) this.quantity--;
    }

    get total() {
        return this.price * this.quantity;
    }
}

// Products List
const products = [
    new Product(
        1,
        "MacBook Pro",
        1200,
        "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?fit=crop&w=500&q=80"
    ),
    new Product(
        2,
        "HP Pavilion",
        800,
        "https://cdn.mos.cms.futurecdn.net/bc4b8e1f2cec630bfa28e9bf740b4db0-1200-80.jpg"
    ),
    new Product(
        3,
        "Dell Inspiron",
        700,
        "https://www.shutterstock.com/image-illustration/dell-logo-font-on-dark-600nw-2269690647.jpg"
    ),
    new Product(
        4,
        "Samsung Galaxy",
        600,
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKXPrc-Rf745-pFnE3k38Tz9T_ZD8UNb83Mw&s"
    ),
    new Product(
        5,
        "iPhone 13",
        999,
        "https://thumbs.dreamstime.com/b/apple-logo-19106337.jpg"
    ),
];

// Generate HTML
const productList = document.getElementById("product-list");
const summaryList = document.getElementById("summary-list");
const grandTotalEl = document.getElementById("grand-total");

products.forEach((product) => {
    const card = document.createElement("div");
    card.classList.add("product-card", "glass");

    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <div class="details">
        <h2>${product.name}</h2>
        <p>Price: <span class="price">$${product.price}</span></p>
        <div class="quantity-controls">
          <button onclick="updateQty(${product.id}, 'decrease')">−</button>
          <span id="qty-${product.id}">0</span>
          <button onclick="updateQty(${product.id}, 'increase')">+</button>
        </div>
      </div>
    `;

    productList.appendChild(card);
});

function updateQty(id, action) {
    const product = products.find((p) => p.id === id);
    if (action === "increase") product.increase();
    if (action === "decrease") product.decrease();
    document.getElementById(`qty-${id}`).innerText = product.quantity;
    updateSummary();
}

function updateSummary() {
    summaryList.innerHTML = "";
    let grandTotal = 0;

    products.forEach((p) => {
        if (p.quantity > 0) {
            const li = document.createElement("li");
            li.textContent = `${p.name} × ${p.quantity} = $${p.total}`;
            summaryList.appendChild(li);
            grandTotal += p.total;
        }
    });

    grandTotalEl.innerText = grandTotal;
}
