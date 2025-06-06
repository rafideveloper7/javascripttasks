// Pure function in javascript

function add(a, b) {
    return a + b; // This function always returns the same output for the same inputs
}

console.log("🚀 ~ add:", add(2, 3));

// Explanation:
// # The add function takes two parameters, a and b.
// # It returns their sum.
// # This function is pure because it does not modify any external state and always produces the same output for the same inputs.
// # Pure functions are predictable and easier to test, making them a fundamental concept in functional programming.
// # They do not have side effects, meaning they do not change any variables outside their scope or rely on external state.
// # This makes them easier to reason about and debug, as they behave consistently.
// # Pure functions are often used in functional programming paradigms, where immutability and statelessness are emphasized.
// # They can be composed together to build more complex functions, allowing for modular and reusable code.
// # In JavaScript, pure functions are commonly used in libraries like React for state management and rendering components.
// # By using pure functions, developers can create more maintainable and predictable codebases, leading to fewer bugs and easier debugging.
// # In summary, pure functions are a key concept in functional programming that promote predictability, testability, and maintainability in code.
// # They are functions that always produce the same output for the same inputs and do not have side effects.
// # By adhering to the principles of pure functions, developers can create cleaner and more reliable code that is easier to understand and maintain.