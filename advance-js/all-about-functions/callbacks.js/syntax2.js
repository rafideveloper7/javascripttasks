// A function that takes another function as an argument (callback)
function greetUser(name, callback) {
    console.log("Hello, " + name + "!");
    callback();
}

// Passing a callback function to greetUser
greetUser("Rafi", function() {
    console.log("Welcome to JavaScript callbacks!");
});

/* Explanation:

# greetUser takes a name and a callback function.

# It prints a greeting, then calls the callback.

# The callback runs after the main logic, showing how you can pass and execute functions as arguments.

# Callbacks are often used for things like handling events, asynchronous operations, or running code after something else finishes. */