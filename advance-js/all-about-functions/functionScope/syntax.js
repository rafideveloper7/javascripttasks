// first principle 
function scope() {
    let x = 10; // Local variable
    const y = 20; // Local constant
    var z = 30; // Local variable with function scope
    console.log(x, y, z); // Output: 10 20 30
}

scope(); // Call the function to see the output

// but wheb i try to access x, y, or z outside the function, it will throw an error because they are not defined in the global scope
console.log(x); // ReferenceError: x is not defined