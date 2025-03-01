// Function to convert units using if-else statements
function convertUnits(value, fromUnit, toUnit) {
    var valueInMM;

    // Convert the input value to millimeters (mm)
    if (fromUnit === "mm") {
        valueInMM = value;
    } else if (fromUnit === "cm") {
        valueInMM = value * 10;
    } else if (fromUnit === "in") {
        valueInMM = value * 25.4;
    } else if (fromUnit === "ft") {
        valueInMM = value * 304.8;
    } else if (fromUnit === "m") {
        valueInMM = value * 1000;
    } else {
        console.log("Invalid input unit");
        return;
    }

    var convertedValue;

    // Convert the value in millimeters (mm) to the target unit
    if (toUnit === "mm") {
        convertedValue = valueInMM;
    } else if (toUnit === "cm") {
        convertedValue = valueInMM / 10;
    } else if (toUnit === "in") {
        convertedValue = valueInMM / 25.4;
    } else if (toUnit === "ft") {
        convertedValue = valueInMM / 304.8;
    } else if (toUnit === "m") {
        convertedValue = valueInMM / 1000;
    } else {
        console.log("Invalid target unit");
        return;
    }

    return convertedValue;
}


// 1. Input value
var inputValue = prompt("Inter a number :") // Example: 100

// 2. Unit of the input value
var fromUnit = prompt("inter one from convert cm, in, ft, m :"); // Example: centimeters (cm)

// 3. Unit to convert to
var toUnit = prompt("inter one to convert cm, in, ft, m :")// Example: meters (m)

// Convert and display the result
var result = convertUnits(inputValue, fromUnit, toUnit);
console.log(inputValue + " " + fromUnit + " is equal to " + result + " " + toUnit);