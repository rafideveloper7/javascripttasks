function returnValues(a, b) {
    return a + b;
}
console.log("🚀 ~  returning Values:", returnValues(2, 5))

console.log("///////////////////////////////");
let z = 3;
function returnAdditional(x, y=2) {
    return (z * (x + y));
}
console.log(returnAdditional(2))