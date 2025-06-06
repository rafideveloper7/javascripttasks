const add = (a, b) => {
    return a + b;
}
console.log(add(2, 3)); // 5


// The arrow function syntax is a more concise way to write functions in JavaScript.
// It allows for shorter function expressions and has a lexical `this` binding, meaning it does not have its own `this` context.
// This is particularly useful in scenarios where you want to preserve the `this` context of the surrounding code, such as in methods or callbacks.

// short arrow function syntax
const multiply = a => a;
console.log(multiply(2)); // 6