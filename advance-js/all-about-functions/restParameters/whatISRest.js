// what is rest parameters in JavaScript?
function sum(...numbers) {
    return numbers.reduce((acc, num) => acc + num, 0);
}
// The rest parameter syntax allows a function to accept an indefinite number of arguments as an array.
console.log(sum(1, 2, 3)); // 6
console.log(sum(1, 2, 3, 4, 5)); // 15
console.log(sum(10, 20)); // 30
console.log(sum()); // 0

// The rest parameter must be the last parameter in the function definition.
function example(a, b, ...rest) {
    console.log(a); // first argument
    console.log(b); // second argument
    console.log(rest); // rest of the arguments as an array
}
example(1, 2, 3, 4, 5); // a: 1, b: 2, rest: [3, 4, 5]

// The rest parameter can be used to handle variable-length argument lists, making functions more flexible.
function concatenate(separator, ...strings) {
    return strings.join(separator);
}
console.log(concatenate(", ", "apple", "banana", "cherry")); // "apple, banana, cherry"

// Rest parameters can also be used in combination with other parameters.
function multiply(factor, ...numbers) {
    return numbers.map(num => num * factor);
}
console.log(multiply(2, 1, 2, 3)); // [2, 4, 6]

// Rest parameters are particularly useful in scenarios where the number of arguments is not known beforehand, such as in event handlers or callbacks.

// They allow for more readable and maintainable code by avoiding the need to use the `arguments` object, which is less flexible and not an actual array.

// Rest parameters can also be used in arrow functions.
const sumArrow = (...numbers) => numbers.reduce((acc, num) => acc + num, 0);
console.log(sumArrow(1, 2, 3)); // 6

// Rest parameters can be combined with default parameters.
function greet(greeting = "Hello", ...names) {
    return names.map(name => `${greeting}, ${name}!`).join(" ");
}