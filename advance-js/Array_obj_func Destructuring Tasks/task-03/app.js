// 3. Destructuring with Default Values
// Destructure three values from colors, provide default if a value is missing.


const colors = []; // agar ye empty hua tho defaults colors show honge , second and third and if value exist it will shows
const [first, second = "green", third = "yellow", fourth = "blue"] = colors;

console.log("First:", colors[0]);   // red
console.log("Second:", second); // green (default)
console.log("Third:", third);   // yellow (default)
console.log("Fourth:", fourth);   // yellow (blue)