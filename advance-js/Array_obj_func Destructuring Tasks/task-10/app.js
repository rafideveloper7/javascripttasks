// 10. Partial Object Destructuring
// Destructure only brand and model from the object.

const laptop = {
  brand: "Dell",
  model: "XPS 13",
  price: 250000,
  color: "Silver"
};
// Your code here

const {brand, model} = laptop;
const {fisrtValue, secondValue} = laptop;
console.log(`🚀 ~ brand : ${brand} and ~ modal : ${model}`)

// can;t use other name to call obj data like array
// console.log(`🚀 ~ brand : ${fisrtValue} and ~ modal : ${secondValue}`);