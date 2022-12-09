
//the loan amount
//the Annual Percentage Rate (APR)
//the loan duration

const readline = require('readline-sync');

function invalidNumber(number) {
    return number.trimStart() === '' || Number.isNaN(Number(number));
  }

function invalidpercentage(number) {
  return number === '0' || number.trimStart() === '' || Number.isNaN(Number(number));
}

function parsePercentage(number) {
  if (number.includes("%")) {
    return number.replace("%", '');
  }
  else return number;
}

  function prompt(message) {
    console.log(`=> ${message}`);
  }


prompt("welcome to this loan calculator");


prompt('What is your loan amount?');
let loanAmount = readline.question();

while (invalidNumber(loanAmount)) {
    prompt("Please enter a number");
    loanAmount = readline.question();
}

prompt('What is the annual percentage rate, please enter a postive number between 0 and 100');
let annualPercentageRate = parsePercentage(readline.question());
console.log(annualPercentageRate);

while (invalidpercentage(annualPercentageRate)) {
    prompt("Please enter a postive number between 0 and 100");
    annualPercentageRate = readline.question();
}

prompt('What is the loan duration in years?');
let loanDuration = readline.question();

while (invalidNumber(loanDuration)) {
    prompt("Please enter a number");
    loanDuration = readline.question();
}

let loanDurationInMonths = Number(loanDuration) * 12;
let monthlyInterestRate = (Number(annualPercentageRate)/100) / 12;
let monthlyPayment = Number(loanAmount) * (monthlyInterestRate / (1 - Math.pow((1 + monthlyInterestRate), (-loanDurationInMonths))));

console.log(`You need to pay $${monthlyPayment.toFixed(2)} each month!`);