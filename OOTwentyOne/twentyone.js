let shuffle = require('shuffle-array');
let readline = require("readline-sync");

class Card {
  constructor(suit, rank) {
    this.suit = suit,
    this.rank = rank
  }

  getPoints(){
    if (this.rank === 'ace'){
        return 11
    } else if (Number(this.rank)){
        return Number(this.rank);
    } else {
        return 10
    }
  }

  displayCard() {
    return `${this.rank} of ${this.suit}`;
  }
}

class Deck {
    static SUITS = ["diamonds", "clubs", "hearts", "spades"];
    static RANKS = ["ace", "king", "queen", "jack", "10", "9", "8", "7", "6", "5", "4", "3", "2"];
    
  constructor() {

    this.reset();
    
  }

  reset() {
    this.createDeck();
    this.shuffle();
  }

  createDeck(){
    this.cards = [];
    Deck.SUITS.forEach(suit => {
        Deck.RANKS.forEach(rank => {
            this.cards.push(new Card(suit, rank))
        })
    })
  }

  shuffle(){
    shuffle(this.cards)
  }

  deal() {
    let hand = [];
    hand.push(this.cards.pop());
    hand.push(this.cards.pop());
    return hand;
  }

  getCard() {
    return this.cards.pop();
  }
}

class Participant {
  constructor() {

    this.reset();

  }

  reset() {
    this.score = 0;
    this.hand = [];
  }

  setScore() {
    this.score = 0;
    this.hand.forEach(card => {
        this.score += card.getPoints();
    });

    this.hand.filter(card => card.rank === "ace").forEach(_ => {
        if (this.score > 21) this.score -= 10;
    })
 }

  hit(hand) {
    this.hand = [...this.hand, ...hand];
    this.setScore();
  }

  addCard(card) {
    this.hand = [...this.hand, card];
    this.setScore();
  }

  displayHand() {
    let hand = [...this.hand];
    let lastCard = hand.pop();
    let string = '';
    hand.forEach(card => {
        string += `${card.rank} of ${card.suit}, `
    })
    return string +`and ${lastCard.rank} of ${lastCard.suit}`
  }

  getScore() {
    return this.score;
  }

  isBusted() {
    return this.score > 21;
  }
}



class TwentyOneGame {
  static PLAYER_WALLET = 5;
  constructor() {
    this.deck = new Deck();
    this.human = new Participant();
    this.computer = new Participant();
  }

  start() {
    this.displayWelcomeMessage();
    while(true){
        this.playGame()
        if (TwentyOneGame.PLAYER_WALLET === 0) {
            console.log("Unfortunately you ran out of money :(");
            break;
        }
        if (TwentyOneGame.PLAYER_WALLET === 10) {
            console.log("You are rich!!!");
            break;
        }
        if (!this.playAgain()) break;
        console.clear();
    }
    this.displayGoodbyeMessage();
  }

  playGame() {
    this.reset();
    this.displayWallet();
    this.dealCards();
    this.showCards();
    this.playerTurn();
    this.dealerTurn();
    this.displayResult();
    this.setWallet();
  }

  displayWallet() {
    console.log(`You now have ${TwentyOneGame.PLAYER_WALLET} Dollar. You can play till you get rich (10 Dollar) or broke (0 Dollar)`)
  }

  playAgain(){
    let answer

    while(true) {
    answer = readline.question("Do you want to play again? y(es) or n(o)?").toLowerCase();

      if (["y", "n"].includes(answer)) break;

      console.log("Sorry, that's not a valid choice.");
      console.log("");
    }

    return answer === 'y';
  }

  dealCards() {
    this.human.hit(this.deck.deal());
    this.computer.hit(this.deck.deal());
  }

  reset() {
    this.deck.reset();
    this.human.reset();
    this.computer.reset();
  }

  showCards() {
    console.log(`Player has ${this.human.displayHand()}`);
    console.log(`Computer has ${this.computer.hand[0].displayCard()} and ??`);
  }

  playerTurn() {
    while(true) {
    let choice;

    while (true) {
      choice = readline.question("Do you want to h(it) or s(tay)?").toLowerCase();

      if (["h", "s"].includes(choice)) break;

      console.log("Sorry, that's not a valid choice.");
      console.log("");
    }
    if (choice === "s") break;

    let card = this.deck.getCard();
    this.human.addCard(card);
    console.clear();
    this.displayCurrentScore(card, this.human);

    if (this.human.isBusted()) break;
    
   
    
   }

  }

  displayCurrentScore(card, player) {
    let pronoun = player === this.human ? "You" : "Dealer";
    console.log(`${pronoun} drew ${card.displayCard()}. ${pronoun} now ${pronoun === "You" ? "have" : "has"} ${player.displayHand()}`);
    console.log(`${pronoun === "You" ? "Your" : "Her"} total score is ${player.getScore()}`);   
  }

  dealerTurn() {
    if (this.human.isBusted()) {
        return;
    }

    console.log(`Dealer has ${this.computer.displayHand()}`);
    
    while (this.computer.score < 17) {
        let card = this.deck.getCard();
        this.computer.addCard(card);
        this.displayCurrentScore(card, this.computer);
    }
  }

  detectResult() {
        if (this.human.isBusted()) {
          return 'PLAYER_BUSTED';
        } else if (this.computer.isBusted()) {
          return 'DEALER_BUSTED';
        } else if (this.computer.score < this.human.score) {
          return 'PLAYER';
        } else if (this.computer.score > this.human.score) {
          return 'DEALER';
        } else {
          return 'TIE';
        }
  }

  setWallet() {
    let result = this.detectResult();

  switch (result) {
    case 'PLAYER_BUSTED':
      TwentyOneGame.PLAYER_WALLET -= 1;
      break;
    case 'DEALER_BUSTED':
      TwentyOneGame.PLAYER_WALLET += 1;
      break;
    case 'PLAYER':
    TwentyOneGame.PLAYER_WALLET += 1;
      break;
    case 'DEALER':
    TwentyOneGame.PLAYER_WALLET -= 1;
      break;
   }
  }
  

  displayWelcomeMessage() {
    console.clear();
    console.log("Welcome to a game of twentyone!")
  }

  displayGoodbyeMessage() {
    console.log("Thanks for playing Twenty One, hope to see you again soon!")
  }

  displayResult() {
    let result = this.detectResult();

  switch (result) {
    case 'PLAYER_BUSTED':
      console.log('You busted! Dealer wins this round!');
      break;
    case 'DEALER_BUSTED':
      console.log('Dealer busted! You win this round!');
      break;
    case 'PLAYER':
      console.log('You win this round!');
      break;
    case 'DEALER':
      console.log('Dealer wins this round!');
      break;
    case 'TIE':
      console.log("It's a tie!");
  }
  }
}

let game = new TwentyOneGame();
game.start();