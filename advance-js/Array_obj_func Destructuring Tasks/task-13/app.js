// 13. Return Multiple Values from Function
// Return an array of two values and destructure them on the receiving end.

function getUserInfo() {
  // return name and email
  const user = ["Rafi", "rafideveloper7@gmail.com"]
  return user;
}

// Destructure here
const [userName, email] = getUserInfo();


console.log(`🚀 ~ userName : ${userName}`)
console.log(`🚀 ~ email : ${email}`)

// This was the gooooood Question!!!!!