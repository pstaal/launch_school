const readline = require('readline-sync');


function createPlayer() {
  return {
    move: null,
    score: null,
    moves: [],
  };
}

function createComputer() {
  let playerObject = createPlayer();

  let computerObject = {
    wins: [],

    createMove(array) {
        let newArray = [];
        let totalRounds = this.wins.length;
        array.forEach(choice => {
           let object = {};
           if (this.wins.some(item => item.hasOwnProperty(choice))){  
            let numberOfWins = this.wins.reduce((acc,val) => {
                if (val[choice]) {
                    return acc += 1;
                } else {
                    return acc;
                }
            }, 0);
            let winPercentage = (numberOfWins/totalRounds) * 100
            let weight = this.createRule(winPercentage);
            object[choice] = weight;
            newArray.push(object);
           } else {
            object[choice] = 1;
            newArray.push(object);
           }
        })
       
        let result = [];
        array.forEach((choice) => {
           if (newArray.some(item => item[choice] === 2)) {
            result.push(choice, choice)
           } else {
            result.push(choice);
           }
        })
        return result;
      },
      
    createRule(winPercentage) {
        if (winPercentage > 50){
            return 2;
        } else {
           return 1
        }
    },

    choose() {
        const choices = this.createMove(['rock', 'paper', 'scissors', 'spock', 'lizard']);
        let randomIndex = Math.floor(Math.random() * choices.length);
        this.move = choices[randomIndex];
        this.moves.push(this.move);
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
      this.moves.push(this.move);
    },
  };

  return Object.assign(playerObject, humanObject);
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
  let object = {};
  object[computerMove] = winner === 'computer';
  this.computer.wins.push(object);
  console.log(`${winner === 'tie' ? "It's a tie!" : winner + " wins the round!"}! Current score is you: ${this.human.score}, computer ${this.computer.score}`);
  console.log(`Previous moves player => ${this.human.moves.join(', ')}, previous moves computer => ${this.computer.moves.join(', ')}`)
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