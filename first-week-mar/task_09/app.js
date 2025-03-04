let arr = [2,4,6,8,10,12,14,16,18,20];

console.log(arr)

let middle = arr.length / 2;

middle = arr.slice(middle -1, middle + 1);
console.log("Extrated middle even number elem :", middle);