// 9. Nested Object Destructuring
// Destructure the city from inside address.

const user = {
  id: 1,
  address: {
    city: "Islamabad",
    zip: "44000"
  }
};
// Your code here

const { address: {city}} = user; // extracting nested obj data
console.log(`🚀 ~ city : ${city}`);