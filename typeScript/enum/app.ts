// Enums

enum Models {
    corrola = "corrola",
    honda = "Honda",
    mehran = "Mehran"
}

interface Car {
    name: string;
    year: number;
    model: Models;
}

function buildCar(obj: Car): Car {
    return obj;
};

const car1 = buildCar({name: "Corrola Car", year: 2025, model: Models.corrola})
const car2 = buildCar({name: "Honda Civic", year: 2025, model: Models.honda})
const car3 = buildCar({name: "Mehran", year: 2025, model: Models.mehran})

console.log("🚀 ~ car1:", car1)
console.log("🚀 ~ car2:", car2)
console.log("🚀 ~ car3:", car3)
