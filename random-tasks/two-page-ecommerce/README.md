
🛒 Two-Page Mini E-Commerce Website – Student Task
You will create a two-page website using HTML5, CSS3, and JavaScript to practice DOM rendering, cart logic, and localStorage, then deploy it on Vercel or Netlify to share with others.

✅ Page 1: Product Listing Page (index.html)
Show 4 product cards using an array of objects.


Each card should have:


Product image (or a colored box if no image).


Product name.


Product price.


Add to Cart button.


Add a cart icon at the top showing the count of items in the cart.


Clicking Add to Cart updates the cart count using localStorage.


Clicking the cart icon should redirect to the Cart Page (cart.html).



✅ Page 2: Cart Details Page (cart.html)
Display a list of products in the cart showing:


Product name.


Product price.


Product quantity.


Add buttons to increase (+) and decrease (-) the quantity.


If the quantity becomes zero, remove the product from the cart.


Show total quantity of all products.


Show total price of all products at the bottom.


Use localStorage to store and update cart data so it persists across page reloads and navigation.



📁 Directory Structure
two-page-ecommerce/
├── index.html
├── cart.html
├── style.css
├── script.js
└── assets/
    ├── product1.png
    ├── product2.png
    ├── product3.png
    └── product4.png


⚡ Deployment (Vercel / Netlify)
1️⃣ Test your project locally by opening index.html and cart.html in your browser to ensure everything is working.
 2️⃣ Go to vercel.com or netlify.com and sign in.
 3️⃣ Upload your project folder directly, or link your GitHub repository for auto-deploy.
 4️⃣ Get your live project URL to share with your teacher or classmates.

✅ Submission Expectations
✅ index.html, cart.html, style.css, script.js, and the assets folder.
 ✅ Clean, readable, and commented code.
 ✅ A live deployed URL for testing and feedback.
 ✅ (Optional) A GitHub repository link for your project.

✨ Learning Outcomes
✅ How to render dynamic content using arrays and DOM manipulation.
 ✅ How to manage and persist cart data using localStorage.
 ✅ Implementing basic cart operations with quantity and total calculations.
 ✅ Deploying a static website on Vercel or Netlify for sharing.

🛠 Example Product Array
Use this as your base:
const products = [
  { id: 1, name: "Product 1", price: 500, image: "assets/product1.png" },
  { id: 2, name: "Product 2", price: 750, image: "assets/product2.png" },
  { id: 3, name: "Product 3", price: 300, image: "assets/product3.png" },
  { id: 4, name: "Product 4", price: 900, image: "assets/product4.png" },
];


Start building, test frequently, and have fun!

