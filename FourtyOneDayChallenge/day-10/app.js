let testimonials = [
  {
    userName: "Rafi Ullah",
    img_url: "https://cdn-icons-png.flaticon.com/512/6840/6840478.png",
    text: "This is simply unbelievable! I would be lost without Apple. The very best. Not able to tell you how happy I am with Apple.",
  },

  {
    userName: "Haris Khan",
    img_url:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHcDvZmnpSZbzOZWwWQMvPQ-NJ7ZI0xbsuiKF5O61_3LiFkihuQ6w3-aBckTNPkGvepjQ&usqp=CAU",
    text: "I would also like to say thank you to all your staff. Wow what great service, I love it! Apple impressed me on multiple levels.",
  },

  {
    userName: "Israr Ahmed",
    img_url:
      "https://static.vecteezy.com/system/resources/thumbnails/027/119/267/small_2x/3d-rendering-programmer-isolated-useful-for-technology-programming-development-coding-software-app-computing-server-and-connection-design-element-png.png",
    text: "Thank you for making it painless, pleasant and most of all hassle free! I wish I would have thought of it first. The very best.",
  },
];

let img = document.getElementById("user-img");
let userName = document.getElementById("user-name");
let message = document.getElementById("message");

let index = 0;

function showTestimonial() {
  let testimonial = testimonials[index];
  img.src = testimonial.img_url;
  userName.textContent = testimonial.userName;
  message.textContent = testimonial.text;
}

function startTestimonialRotation() {
  setInterval(() => {
    index = (index + 1) % testimonials.length;
    showTestimonial();
  }, 3000); // Every 3 seconds
}

// Show the first testimonial initially
showTestimonial();
// Start rotating testimonials
startTestimonialRotation();