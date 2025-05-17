// 11. Destructure in Function Parameters (Object)
// Create a function that accepts an object and destructures name and role.

function greet(user) {
  // Destructure inside parameters or body
  const {name, role} = user; // i think similar to obj destructuring
  console.log(`🚀 Your name : ${name} and Your role is : ${role}`)
}

greet({ name: "M Osama", role: "Teacher" });
