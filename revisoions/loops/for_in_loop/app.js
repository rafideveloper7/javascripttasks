const user = {
  name: "Rafi",
  age: 19,
  role: "Developer"
};

for (let key in user) {
  console.log(key + " → " + user[key]);
}
