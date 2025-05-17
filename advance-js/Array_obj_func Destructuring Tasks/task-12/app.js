// 12. Destructure in Function Parameters (Array)
// Create a function that takes an array [x, y] and returns their sum.

function add(coords) {
  // Destructure here
  const [num1 , num2] = coords;
  return num1 + num2; // now returning the sum of destructured values

}

console.log(add([5, 7]));
