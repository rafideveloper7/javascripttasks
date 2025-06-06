/* A closure in JavaScript is a function that remembers and has access to variables from its lexical scope, even when the function is executed outside that scope. This happens because the inner function maintains a reference to its lexical environment, capturing the state of the outer function at the time of its creation.  */               

function outerFunction() {
    let outerVariable = 'I am from the outer function!';

    function innerFunction() {
        console.log(outerVariable); // Accessing the outer variable
    }

    return innerFunction; // Returning the inner function
}

// Create a closure instance
const closureInstance = outerFunction();
// Call the closure instance
closureInstance(); // Output: I am from the outer function!

// The inner function `innerFunction` retains access to the `outerVariable` even after `outerFunction` has finished executing.
// This demonstrates how closures can maintain state and access variables from their lexical scope.
// Closures are often used for data encapsulation, creating private variables, and maintaining state in asynchronous operations.
