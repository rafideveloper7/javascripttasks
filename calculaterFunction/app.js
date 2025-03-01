function calculator(num1, num2, operator) {
    if (operator === '+') {
        return num1 + num2;
    } else if (operator === '-') {
        return num1 - num2;
    } else if (operator === '*') {
        return num1 * num2;
    } else if (operator === '/') {
        return num1 / num2;
    } else {
        console.log("invalid operator 😂");
    }

    if (num1 && num2 === isNaN()) {
        console.log("Please inter number value 🤣")
    }
        
}

// pre defined values
var num1 = +prompt("Inter first number :");
var num2 = +prompt("Inter second number :");
var operator = prompt("Please inter +,-,*,/ to calculate :")

var result = calculator(num1, num2, operator);
// console.log("Your result is :" + " " + result);
console.log("The result is :" + result + " 😎 ");