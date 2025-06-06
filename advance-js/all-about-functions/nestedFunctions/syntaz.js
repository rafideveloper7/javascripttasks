// syntax of nested functions

function outer() {
    console.log("Outer function");
    function inner() {
        console.log("Inner function");
    }

    inner(); // Call the inner function
}

outer(); // Call the outer function

// This will throw an error because inner is not defined in this scope
//inner(); 