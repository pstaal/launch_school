const readline = require('readline-sync');


function createPlayer() {
  return {
    move: null,
    score: null,
  };
}

function createComputer() {
  let playerObject = createPlayer();

  let computerObject = {
    choose() {
      const choices = ['rock', 'paper', 'scissors'];
      let randomIndex = Math.floor(Math.random() * choices.length);
      this.move = choices[randomIndex];
    },
  };

  return Object.assign(playerObject, computerObject);
}

function createHuman() {
  let playerObject = createPlayer();

  let humanObject = {
    choose() {
      let choice;

      while (true) {
        console.log('Please choose rock, paper, or scissors:');
        choice = readline.question();
        if (['rock', 'paper', 'scissors'].includes(choice)) break;
        console.log('Sorry, invalid choice.');
      }

      this.move = choice;
    },
  };

  return Object.assign(playerObject, humanObject);
}


function createMove() {
  return {
    // possible state: type of move (paper, rock, scissors)
  };
}

function createRule() {
  return {
    // possible state? not clear whether Rules need state
  };
}

// Since we don't yet know where to put `compare`, let's define
// it as an ordinary function.
let compare = function(move1, move2) {
  // not yet implemented
};

const RPSGame = {
  human: createHuman(),
  computer: createComputer(),

  displayRoundWinner() {
  let humanMove = this.human.move;
  let computerMove = this.computer.move;

  console.log(`You chose: ${this.human.move}`);
  console.log(`The computer chose: ${this.computer.move}`);

  if ((humanMove === 'rock' && computerMove === 'scissors') ||
      (humanMove === 'paper' && computerMove === 'rock') ||
      (humanMove === 'scissors' && computerMove === 'paper')) {
    this.addScore('human');
    console.log(`You win! Current score is you: ${this.human.score}, computer ${this.computer.score}`);
  } else if ((humanMove === 'rock' && computerMove === 'paper') ||
             (humanMove === 'paper' && computerMove === 'scissors') ||
             (humanMove === 'scissors' && computerMove === 'rock')) {
    this.addScore('computer');
    console.log(`Computer wins! Current score is you: ${this.human.score}, computer ${this.computer.score}`);
  } else {
    console.log(`It's a tie!. Current score is you: ${this.human.score}, computer ${this.computer.score}`);
  }
},

displayGameWinner() {
  console.log(`The final score is: you ${this.human.score}, computer ${this.computer.score}`);
  console.log(`${this.human.score > this.computer.score ? "You win this game" : "Computer wins this game"}`);
},

  addScore(string) {
    this[string].score += 1;
  },

  displayWelcomeMessage() {
    console.log('Welcome to Rock, Paper, Scissors!');
  },

  displayGoodbyeMessage() {
    console.log('Thanks for playing Rock, Paper, Scissors. Goodbye!');
  },

   playAgain() {
    console.log('Would you like to play again? (y/n)');
    let answer = readline.question();
    return answer.toLowerCase()[0] === 'y';
  },

   playGame() {
    this.displayWelcomeMessage();
    while(true){
        this.playRound();
        if (!this.playAgain()) break;
    }
    this.displayGoodbyeMessage();
   },

   playRound() {
    this.human.score = 0;
    this.computer.score = 0;
    while (this.human.score < 5 && this.computer.score < 5) {
      this.human.choose();
      this.computer.choose();
      this.displayRoundWinner(); 
    }
    this.displayGameWinner();
  },

};

RPSGame.playGame();