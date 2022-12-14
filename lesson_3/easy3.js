let numbers = [1, 2, 3, 4];
numbers.length = 0;
console.log("1",numbers);
numbers = [1, 2, 3, 4];
while(numbers.length > 0) {
    numbers.pop();
}
console.log("2",numbers);
numbers = [1, 2, 3, 4];
numbers.splice(0);
console.log("3",numbers);

console.log([1, 2, 3] + [4, 5]);

let str1 = "hello there";
let str2 = str1;
str2 = "goodbye!";
console.log(str1);

let arr1 = [{ first: "value1" }, { second: "value2" }, 3, 4, 5];
let arr2 = arr1.slice();
arr2[0].first = 42;
console.log(arr1);

function isColorValid(color) {
    return (color === "blue" || color === "green");
}


function isColorValid2(color) {
    return !(color !== "blue" && color !== "green");
}