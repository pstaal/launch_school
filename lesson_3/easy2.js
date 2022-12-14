let advice = "Few important in life are as important as house training your pet important.";
let newString = advice.replace('important', 'urgent');
do {
 newString = newString.replace('important', 'urgent');
} while (newString.includes("important"));
 

console.log(newString);

let numbers = [1, 2, 3, 4, 5];
console.log(numbers.slice().reverse());
console.log(numbers.slice().sort((num1, num2) => num2 - num1));
let newArray = [];

numbers.forEach((number) => {
    newArray.unshift(number)
});
console.log(newArray);

let numbersNew = [1, 2, 3, 4, 5, 15, 16, 17, 95, 96, 99];

let number1 = 8;  // false
let number2 = 95; // true

console.log(numbersNew.includes(number1));
console.log(numbersNew.includes(number2));

let famousWords = "seven years ago...";
let firstWords = "Four score and ";
console.log(firstWords.concat(famousWords));
console.log(firstWords + famousWords);

numbers.splice(2, 1);
console.log(numbers);

let flintstones = ["Fred", "Wilma"];
flintstones.push(["Barney", "Betty"]);
flintstones.push(["Bambam", "Pebbles"]);
flintstones = flintstones.reduce((accum, element) => {
    return accum.concat(element);
  }, []);
console.log(flintstones);

let flintstonesObject = { Fred: 0, Wilma: 1, Barney: 2, Betty: 3, Bambam: 4, Pebbles: 5 };
let flintstonesArray = Object.entries(flintstonesObject);
let barneyArray = flintstonesArray.filter(arr => arr[0] === "Barney").shift();
console.log(barneyArray);

let numbersThree = [1, 2, 3, 4]; // true
let table = { field1: 1, field2: 2, field3: 3, field4: 4 }; // false
console.log(Array.isArray(numbersThree));
console.log(Array.isArray(table));

let title = "Flintstone Family Members"
let remainingSpace = 40 - title.length;
let spacing = (' ').repeat(Math.floor(remainingSpace/2));
let newTitle = spacing.concat(title, spacing);
console.log(newTitle);

let statement1 = "The Flintstones Rock!";
let statement2 = "Easy come, easy go.";

console.log(statement1.split('').filter(char => char === "t").length);
console.log(statement2.split('').filter(char => char === "t").length);
