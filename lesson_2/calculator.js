const readline = require('readline-sync');
const messages = require('./messages');

let newGame = "yes";

function calculate() { 
function prompt(message) {
  console.log(`=> ${message}`);
}

function invalidNumber(number) {
    return number.trimStart() === '' || Number.isNaN(Number(number));
  }

prompt('Which country are you from? NL or EN?');
let country = readline.question();
while (!['EN', 'NL'].includes(country)) {
    prompt("Please enter either EN or NL!");
    country = readline.question();
  }


let language = messages[country];

prompt(language.welcome);


prompt(language.firstNumberQuestion);
let number1 = readline.question();

while (invalidNumber(number1)) {
    prompt(language.falseNumberResponse);
    number1 = readline.question();
  }

prompt(language.secondNumberQuestion);
let number2 = readline.question();

while (invalidNumber(number2)) {
    prompt(language.falseNumberResponse);
    number2 = readline.question();
  }

prompt(language.operatorQuestion);
let operation = readline.question();

while (!['1', '2', '3', '4'].includes(operation)) {
    prompt(language.falseOperatorResponse);
    operation = readline.question();
  }

let output;
switch (operation) {
  case '1':
    output = Number(number1) + Number(number2);
    break;
  case '2':
    output = Number(number1) - Number(number2);
    break;
  case '3':
    output = Number(number1) * Number(number2);
    break;
  case '4':
    output = Number(number1) / Number(number2);
    break;
}

prompt(`The result is: ${output}`);
prompt(language.newGameQuestion);
newGame = readline.question();
}

while (newGame === "yes"){
    calculate();
}
