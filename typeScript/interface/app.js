// 🧠 Better function name & return type
function createUser(user) { return user; }
// ✅ Reusable array of users, if you want to scale later
var user01 = createUser({ name: "Rafi", email: "rafi@gmail.com", password: "12341234", age: 17 });
console.log("👤 User 1:", user01.name);
var user02 = createUser({ name: "Haris", email: "haris@gmail.com", password: "1234abcd", age: 19 });
console.log("👤 User 2:", user02.name);
// 🔁 You could even store them like this
var allUsers = [user01, user02];
console.log("📦 All Users:", allUsers);
