function syntax(a, ...rest) {
    // The rest parameter syntax allows a function to accept an indefinite number of arguments as an array.
    console.log(a); // first argument
    console.log(rest); // rest of the arguments as an array
}

console.log(syntax(1, 2, 3, 4, 5)); // a: 1, rest: [2, 3, 4, 5]
// Output:
// 1
// [2, 3, 4, 5]
// The rest parameter must be the last parameter in the function definition.

function sum(...numbers) {
    // The rest parameter syntax allows a function to accept an indefinite number of arguments as an array.
    // The reduce method iterates over the array, applying the callback function to accumulate a single result.
    // Here, it starts with 0 and adds each number in the array to the accumulator (acc).
    return numbers.reduce((acc, num) => acc + num, 0);
};

console.log(sum(1, 2, 3)); // 6
console.log(sum(1, 2, 3, 4, 5)); // 15