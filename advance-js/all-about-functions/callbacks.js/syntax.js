// callback in javascript
// A callback is a function that is passed as an argument to another function and is executed after the completion of that function.
// Callbacks are commonly used for asynchronous operations, such as handling events or making API requests.
// They allow you to define what should happen once a certain task is completed, without blocking the execution of the program.
// Callbacks can be defined as named functions or anonymous functions (arrow functions).
// Here's an example of a callback function in JavaScript:

function fetchData(callback) {
    // Simulating an asynchronous operation (like fetching data from an API)
    setTimeout(() => {
        const data = { id: 1, name: "John Doe" };
        callback(data); // Call the callback function with the fetched data
    }, 1000);
}

// Using the fetchData function with a callback
fetchData((data) => {
    console.log("Data fetched:", data); // This will be executed after the data is fetched
});

// In this example, the `fetchData` function simulates an asynchronous operation using `setTimeout`.
// It takes a callback function as an argument, which is called once the data is "fetched" after 1 second.
// The callback function is defined inline as an arrow function, but it could also be a named function.
// Callbacks are essential in JavaScript for handling asynchronous operations, allowing you to define the flow of execution without blocking the main thread.
// They are widely used in event handling, API requests, and other scenarios where you need to wait for a task to complete before executing further code.
// Here's another example of a callback function used in an event listener:

document.getElementById("myButton").addEventListener("click", (event) => {
    console.log("Button clicked!", event); // This will be executed when the button is clicked
}
);
// In this example, the callback function is executed when the button with the ID "myButton" is clicked.    
// The `addEventListener` method takes the event type ("click") and a callback function that defines what should happen when the event occurs.
// Callbacks can also be used in array methods like `map`, `filter`, and `reduce` to process arrays in a functional programming style.

// Here's an example using the `map` method with a callback function:

const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map((num) => num * 2); // Callback function to double each number
console.log("Doubled numbers:", doubled); // Output: [2, 4, 6, 8, 10]

// In this example, the `map` method takes a callback function that doubles each number in the `numbers` array.
// The result is a new array `doubled` containing the doubled values.

// Callbacks are a fundamental concept in JavaScript, enabling asynchronous programming and functional programming patterns.
// They allow you to define custom behavior for when certain events occur or when tasks are completed, making your code more modular and reusable.