let arr = [5, 23, 7, 88, 22, 11, 3];

let checkedValue = arr[0];

for (i = 0; i < arr.length; i++) {
  if (arr[i] < checkedValue) {
    checkedValue = arr[i];
  }
}
console.log("🚀 ~ smallest value is :", checkedValue);
