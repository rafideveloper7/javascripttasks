let arr = [90, 88, 35, 55];

// Step 1: Start with very low values
let first = 0; // will store largest
let second = 0; // will store second largest

// Step 2: Loop through the array
for (let i = 0; i < arr.length; i++) {
  let num = arr[i];

  if (num > first) {
    // Found a new largest!
    second = first; // old largest becomes second
    first = num;
  } else if (num > second && num !== first) {
    // Not the largest, but bigger than second
    second = num;
  }
}

console.log("Largest:", first); // 88
console.log("Second Largest:", second); // 23
