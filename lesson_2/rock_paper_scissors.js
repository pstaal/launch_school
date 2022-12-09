const readline = require('readline-sync');
const VALID_CHOICES = ['rock', 'paper', 'scissors', 'lizard', 'spock'];
const scoreCard = {
    user: 0,
    computer: 0
}
let answer = 'y';
let gameCounter = 0;

function prompt(message) {
  console.log(`=> ${message}`);
}

function updateScore(string) {
    scoreCard[string] = scoreCard[string] + 1;
}

function resetGame() {
    gameCounter = 0;
    scoreCard.user = 0;
    scoreCard.computer = 0;
}

function chooseToContinu() {
    prompt('Do you want to play again (y/n)?');
    answer = readline.question().toLowerCase();
    while (answer[0] !== 'n' && answer[0] !== 'y') {
    prompt('Please enter "y" or "n".');
    answer = readline.question().toLowerCase();
}
}

function displayWinner(choice, computerChoice) {
    prompt(`You chose ${choice}, computer chose ${computerChoice}`);
    gameCounter++;
    if (choice === computerChoice) {
        prompt(`It's a tie! This was game ${gameCounter}`);
    } else if ((choice === 'rock' && (computerChoice === 'scissors' || computerChoice === 'lizard')) ||
        (choice === 'paper' && (computerChoice === 'rock' || computerChoice === 'spock')) ||
        (choice === 'scissors' && (computerChoice === 'paper' || computerChoice === 'lizard')) ||
        (choice === 'lizard' && (computerChoice === 'paper' || computerChoice === 'spock')) ||
        (choice === 'spock' && (computerChoice === 'scissors' || computerChoice === 'rock'))
        ) {
      prompt(`You win game number ${gameCounter}`);
      updateScore('user');
    } else {
      prompt(`You loose game number ${gameCounter}`);
      updateScore('computer');
    }
}

function parseAbbreviations(string) {
    switch(string[0]) {    
            case 'r':
              string = 'rock';
              break;
            case 'p':
              string = 'paper';
              break;
            case 'l':
              string = 'lizard';
              break;
            case 's':
              string = string[1] === 'p' ? 'spock' : 'scissors'
    }
    return string;
}

while (answer === 'y') {
prompt(`Choose one: ${VALID_CHOICES.join(', ')}`);
let choice = parseAbbreviations(readline.question());

while (!VALID_CHOICES.includes(choice)) {
  prompt("That's not a valid choice");
  choice = parseAbbreviations(readline.question());
}

let randomIndex = Math.floor(Math.random() * VALID_CHOICES.length);
let computerChoice = VALID_CHOICES[randomIndex];

displayWinner(choice, computerChoice);

if (scoreCard.user === 3) {
    prompt(`You win! The final score is you: ${scoreCard.user}, computer: ${scoreCard.computer}`);
    resetGame();
    chooseToContinu();
} else if (scoreCard.computer === 3) {
    prompt(`Computer wins! The final score is computer: ${scoreCard.computer}, you: ${scoreCard.user}`);
    resetGame();
    chooseToContinu();
}

}