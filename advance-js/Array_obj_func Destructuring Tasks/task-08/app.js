// 8. Default Values in Object Destructuring
// Destructure title and rating with default value 5.

const book = { title: "JavaScript Basics" };

const {title, rating = 5} = book; // added new value in book object rating
console.log(`🚀 ~ title : ${title}`)
console.log(`🚀 ~ rating : ${rating}`)

