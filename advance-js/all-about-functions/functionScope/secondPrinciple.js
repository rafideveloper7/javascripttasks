// secondPrinciple
var y = 20; // Global variable
let x = 10; // Global variable
const z = 30; // Global constant

function secondPrinciple() {
    console.log("Inside function:", x, y, z); // Output: 40 50 60
}

secondPrinciple(); // Call the function to see the output

// if variables are defined outside the function, they can be accessed inside the function

