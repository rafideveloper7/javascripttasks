// 14. Destructure from Array of Objects
// Destructure the title of the first two posts.

const posts = [
  { id: 1, title: "Hello" },
  { id: 2, title: "World" },
//   { id: 3, title: "of" },
//   { id: 4, title: "coding" }
];

// here pehle 1st obj ke then 2nd obj ke title ko target karega
const [{ title: firstTitle }, {title: secondTitle } /*, {title: tirdTitle }, {title: fourthTitle }*/] = posts;

console.log("🚀 ~ firstTitle:", firstTitle)
console.log("🚀 ~ secondTitle:", secondTitle)
// console.log("🚀 ~ tirdTitle:", tirdTitle)
// console.log("🚀 ~ fourthTitle:", fourthTitle)
