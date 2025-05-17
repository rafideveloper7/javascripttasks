// 5. Rest Operator in Destructuring
// Get the first number as first, and the rest as others.

const nums = [1, 2, 3, 4, 5];

[first , ...rest] = nums;
console.log("🚀 ~ nums:", nums)
console.log("🚀 ~ First :", first)
console.log("🚀 ~ Rest :", rest)
