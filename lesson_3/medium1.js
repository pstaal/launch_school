
let string = "The Flintstones Rock!"
for (let i = 1; i <= 10; i++) {
    console.log(string);
    string = ' '.concat(string);
}

let munstersDescription = "The Munsters are creepy and spooky.";
let newMunsterDescription = '';
for (let i = 0; i <= munstersDescription.length; i++) {
    if (munstersDescription.charAt(i) === munstersDescription.charAt(i).toUpperCase()) {
        newMunsterDescription = newMunsterDescription + munstersDescription.charAt(i).toLowerCase();
    } else {
        newMunsterDescription = newMunsterDescription + munstersDescription.charAt(i).toUpperCase();
    }
};
console.log(newMunsterDescription);

function factors(number) {
    let divisor = number;
    let factors = [];
    while (divisor > 0) {
      if (number % divisor === 0) {
        factors.push(divisor);
      }
      divisor -= 1;
    } 
    return factors;
  }

console.log(factors(225));

console.log(0.3 + 0.6);
console.log(0.3 + 0.6 === 0.9);

let nanArray = [NaN];

console.log(nanArray[0] === NaN);
console.log(Number.isNaN(nanArray[0]));

let answer = 42;

function messWithIt(someNumber) {
  return (someNumber += 8);
}

let newAnswer = messWithIt(answer);

console.log(answer - 8);