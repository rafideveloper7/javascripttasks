// 7. Rename Variables While Destructuring
// Destructure name as personName.

const user = { name: "Sara", email: "sara@gmail.com" };

const { name: personName} = user; // yaha variable ko new name deya aur get bhi keya
console.log("🚀 ~ personName : variable name swaped:", personName);

