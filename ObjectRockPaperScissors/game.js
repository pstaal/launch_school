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
      const choices = ['rock', 'paper', 'scissors', 'spock', 'lizard'];
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
        console.log('Please choose rock, paper, scissors, spock or lizard:');
        choice = readline.question();
        if (['rock', 'paper', 'scissors', 'spock', 'lizard'].includes(choice)) break;
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



const RPSGame = {
  human: createHuman(),
  computer: createComputer(),

  compare(humanMove, computerMove) {
    if (humanMove === computerMove) {
        return 'tie'
    } else if ((humanMove === 'rock' && (computerMove=== 'scissors' || computerMove === 'lizard')) ||
        (humanMove === 'paper' && (computerMove === 'rock' || computerMove === 'spock')) ||
        (humanMove === 'scissors' && (computerMove === 'paper' || computerMove === 'lizard')) ||
        (humanMove === 'lizard' && (computerMove === 'paper' || computerMove === 'spock')) ||
        (humanMove === 'spock' && (computerMove === 'scissors' || computerMove === 'rock'))
        ) {
       return 'human'
    } else {
       return 'computer'
    }
 },

  displayRoundWinner() {
  let humanMove = this.human.move;
  let computerMove = this.computer.move;

  console.log(`You chose: ${this.human.move}`);
  console.log(`The computer chose: ${this.computer.move}`);

  let winner = this.compare(humanMove,computerMove);
  if (winner !== 'tie') {
    this.addScore(winner);
  }
  console.log(`${winner === 'tie' ? "It's a tie!" : winner + " wins the round!"}! Current score is you: ${this.human.score}, computer ${this.computer.score}`);
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