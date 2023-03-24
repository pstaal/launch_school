const readline = require('readline-sync');

const WIN_PERCENTAGE_COMPUTER_THRESHOLD = 50;
const NORMAL_WEIGHT = 1;
const HIGHER_WEIGHT = 2;
const validChoices = ['rock', 'paper', 'scissors', 'spock', 'lizard'];
const winScenarios = {
  rock: ['scissors', 'lizard'],
  paper: ['rock', 'spock'],
  scissors: ['paper', 'lizard'],
  lizard: ['paper', 'spock'],
  spock: ['scissors', 'rock'],
};

function createPlayer() {
  return {
    move: null,
    score: null,
    moves: [],
    addScore() {
      this.score += 1;
    },
    addMove(move) {
      this.moves.push(move);
    },
  };
}

function createComputer() {
  const playerObject = createPlayer();

  const computerObject = {
    wins: [],

    createMove(array) {
      const choicesAndWeights = [];
      const totalRounds = this.wins.length;
      array.forEach((choice) => {
        const choiceAndWeight = {};
        if (this.wins.some((item) => Object.prototype.hasOwnProperty.call(item, choice))) {
          const numberOfWins = this.wins.reduce((acc, val) => {
            if (val[choice]) {
              acc += 1;
              return acc;
            }
            return acc;
          }, 0);
          const winPercentage = (numberOfWins / totalRounds) * 100;
          const weight = this.createRule(winPercentage);
          choiceAndWeight[choice] = weight;
          choicesAndWeights.push(choiceAndWeight);
        } else {
          choiceAndWeight[choice] = 1;
          choicesAndWeights.push(choiceAndWeight);
        }
      });

      const weightedChoices = [];
      array.forEach((choice) => {
        if (choicesAndWeights.some((item) => item[choice] === 2)) {
          weightedChoices.push(choice, choice);
        } else {
          weightedChoices.push(choice);
        }
      });
      return weightedChoices;
    },

    createRule(winPercentage) {
      if (winPercentage > WIN_PERCENTAGE_COMPUTER_THRESHOLD) {
        return HIGHER_WEIGHT;
      }
      return NORMAL_WEIGHT;
    },

    choose() {
      const choices = this.createMove(validChoices);
      const randomIndex = Math.floor(Math.random() * choices.length);
      this.move = choices[randomIndex];
      this.addMove(this.move);
    },
  };

  return Object.assign(playerObject, computerObject);
}

function createHuman() {
  const playerObject = createPlayer();

  const humanObject = {
    choose() {
      let choice;

      while (true) {
        console.log('Please choose rock, paper, scissors, spock or lizard:');
        choice = readline.question().toLowerCase();
        if (validChoices.includes(choice)) break;
        console.log('Sorry, invalid choice.');
      }

      this.move = choice;
      this.addMove(this.move);
    },
  };

  return Object.assign(playerObject, humanObject);
}

const RPSGame = {
  human: createHuman(),
  computer: createComputer(),

  compare(humanMove, computerMove) {
    if (humanMove === computerMove) {
      return 'tie';
    } if (winScenarios[humanMove].includes(computerMove)) {
      return 'human';
    }
    return 'computer';
  },

  displayChoices(humanMove, computerMove) {
    console.log(`You chose: ${humanMove}`);
    console.log(`The computer chose: ${computerMove}`);
    console.log('-------------');
  },

  displayRoundWinner(winner) {
    console.log(`${winner === 'tie' ? "It's a tie!" : `${winner} wins the round!`}! Current score is you: ${this.human.score}, computer ${this.computer.score}`);
    console.log(`Previous moves player => ${this.human.moves.join(', ')}, previous moves computer => ${this.computer.moves.join(', ')}`);
    console.log('-------------');
  },

  displayGameWinner() {
    console.log(`The final score is: you ${this.human.score}, computer ${this.computer.score}`);
    console.log(`${this.human.score > this.computer.score ? 'You win this game' : 'Computer wins this game'}`);
  },

  displayWelcomeMessage() {
    console.log('Welcome to Rock, Paper, Scissors, Spock and Lizard!');
    console.log('Choose one of the above, and see if you can beat the Computer');
    console.log('-------------');
  },

  displayGoodbyeMessage() {
    console.log('Thanks for playing Rock, Paper, Scissors. Goodbye!');
  },

  playAgain() {
    let answer;
    while (true) {
      console.log('-------------');
      console.log('Would you like to play again? (y/n)/(yes/no)');
      answer = readline.question();
      if (['yes', 'no', 'y', 'n'].includes(answer)) break;
      console.log('Sorry, invalid choice.');
    }
    return answer.toLowerCase()[0] === 'y';
  },

  playGame() {
    this.displayWelcomeMessage();
    while (true) {
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
      console.clear();
      this.displayChoices(this.human.move, this.computer.move);
      const winner = this.compare(this.human.move, this.computer.move);
      if (winner === 'human') {
        this.human.addScore();
      } else if (winner === 'computer') {
        this.computer.addScore();
      }
      const stats = {};
      stats[this.computer.move] = winner === 'computer';
      this.computer.wins.push(stats);
      this.displayRoundWinner(winner);
    }
    this.displayGameWinner();
  },

};

RPSGame.playGame();
