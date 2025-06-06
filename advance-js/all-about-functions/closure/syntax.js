// syntax of closures

function closureExample() {
    let count = 0; // This variable is private to the closure

    return function() {
        count += 1; // Increment the count
        console.log(`Count: ${count}`); // Log the current count
    };
}

// Create a closure instance
const increment = closureExample();
// Call the closure multiple times
increment(); // Count: 1
increment(); // Count: 2
increment(); // Count: 3
// The closure retains access to the `count` variable even after the outer function has finished executing.
// This demonstrates how closures can maintain state across multiple invocations.