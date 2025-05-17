// 6. Basic Object Destructuring
// Extract name and age from the object.

const person = { name: "Ali", age: 25, city: "Lahore" };

const {name, age, ...rest} = person

console.log(`Name : ${name} and Age : ${age}`);

// name is a keyword better to use like :
// fullName/studentName etc

// we can't use other words for keys which are initiazed in object before 