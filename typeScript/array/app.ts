// Array

let arr1: number[] = [1,2,3,4,5,];
let arr2: string[] = ["rafi", "234", "typescript", ""]
const statusList: boolean[] = [true, false, true];
const user: [string, number] = ["Rafi", 17];

let arr: [number, string, boolean]  = [11,"rafi", true]

//  Array of Objects
const users: { name: string; age: number }[] = [
  { name: "Rafi", age: 17 },
  { name: "Haris", age: 19 },
];

// Union arrays (mixed types):
const stuff: (string | number)[] = ["Rafi", 123, "Kohat", 456];
