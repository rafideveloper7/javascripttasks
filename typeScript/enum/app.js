// Enums
var Models;
(function (Models) {
    Models["corrola"] = "corrola";
    Models["honda"] = "Honda";
    Models["mehran"] = "Mehran";
})(Models || (Models = {}));
function buildCar(obj) {
    return obj;
}
;
var car1 = buildCar({ name: "Corrola Car", year: 2025, model: Models.corrola });
var car2 = buildCar({ name: "Honda Civic", year: 2025, model: Models.honda });
var car3 = buildCar({ name: "Mehran", year: 2025, model: Models.mehran });
console.log("🚀 ~ car1:", car1);
console.log("🚀 ~ car2:", car2);
console.log("🚀 ~ car3:", car3);
