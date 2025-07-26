
let arr = [2,5,23,7,88,22,11,3];

let checkedValue = arr[0]; // storing lowest value of arr , then comparing with it 

for (i=0; i<arr.length; i++) {
    if (arr[i] > checkedValue) {
        checkedValue = arr[i];
    }
}
console.log("🚀 ~ largest value is :", checkedValue)

