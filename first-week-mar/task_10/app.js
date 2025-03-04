let arr = [1, 2, 3, 4, 5, 6]; // Even number of elements

let middleIndex = arr.length / 2;

arr.splice(middleIndex - 1, 2, 300, 300);

console.log( "replaced 3,4 with 300,400 : ", arr);
