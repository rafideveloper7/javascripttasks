// function createIcecream({ scoops = 1, toppings = ["Dark Chocolate"] } = {}) {
//   const scoopText = scoops === 1 ? "scoop" : "scoops";
//   console.log(
//     `Your sundae has ${scoops} ${scoopText} with ${toppings.join(
//       " an "
//     )} toppings.`
//   );
// }



let gender = "male" 

let msg = (gender === "male") && "its male";
console.log("🚀 ~ msg:", msg)


msg = (gender === "female") && "its male"
console.log("🚀 ~ msg:", msg)

msg = (gender === "female") || "its male"
console.log("🚀 ~ msg:", msg)