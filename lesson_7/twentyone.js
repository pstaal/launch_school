const readline = require('readline-sync');

const SUITS = ['H', 'D', 'S', 'C'];
const VALUES = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

let playerScore = 0;
let dealerScore = 0;

function prompt(message) {
  console.log(`=> ${message}`);
}

// shuffle an array
function shuffle(array) {
  for (let first = array.length - 1; first > 0; first--) {
    let second = Math.floor(Math.random() * (first + 1)); // random index from 0 to i
    [array[first], array[second]] = [array[second], array[first]]; // swap elements
  }

  return array;
}

function initalizeDeck() {
  let deck = [];

  for (let suitIndex = 0; suitIndex < SUITS.length; suitIndex++) {
    let suit = SUITS[suitIndex];

    for (let valueIndex = 0; valueIndex < VALUES.length; valueIndex++) {
      let value = VALUES[valueIndex];
      deck.push([suit, value]);
    }
  }

  return shuffle(deck);
}

function displayScores(playerScore, dealerScore) {
  prompt (`The current score is player: ${playerScore}, dealer: ${dealerScore}`)
}

function total(cards) {
  // cards = [['H', '3'], ['S', 'Q'], ... ]
  let values = cards.map(card => card[1]);

  let sum = 0;
  values.forEach(value => {
    if (value === "A") {
      sum += 11;
    } else if (['J', 'Q', 'K'].includes(value)) {
      sum += 10;
    } else {
      sum += Number(value);
    }
  });

  // correct for Aces
  values.filter(value => value === "A").forEach(_ => {
    if (sum > 21) sum -= 10;
  });

  return sum;
}

function busted(cards) {
  return total(cards) > 21;
}

function detectResult(dealerTotal, playerTotal) {

  if (playerTotal > 21) {
    return 'PLAYER_BUSTED';
  } else if (dealerTotal > 21) {
    return 'DEALER_BUSTED';
  } else if (dealerTotal < playerTotal) {
    return 'PLAYER';
  } else if (dealerTotal > playerTotal) {
    return 'DEALER';
  } else {
    return 'TIE';
  }
}

function displayResults(dealerTotal, playerTotal) {
  let result = detectResult(dealerTotal, playerTotal);

  switch (result) {
    case 'PLAYER_BUSTED':
      prompt('You busted! Dealer wins this round!');
      break;
    case 'DEALER_BUSTED':
      prompt('Dealer busted! You win this round!');
      break;
    case 'PLAYER':
      prompt('You win this round!');
      break;
    case 'DEALER':
      prompt('Dealer wins this round!');
      break;
    case 'TIE':
      prompt("It's a tie!");
  }
}

function displayEnding(dealerCards,playerCards,dealerTotal,playerTotal) {
  console.log('==============');
  prompt(`Dealer has ${dealerCards}, for a total of: ${dealerTotal}`);
  prompt(`Player has ${playerCards}, for a total of: ${playerTotal}`);
  displayScores(playerScore, dealerScore);
  console.log('==============');
}

function wonFiveGames(playerScore, dealerScore) {
  return playerScore <= 5 && dealerScore <= 5;
}

function playAgain() {
  console.log('-------------');
  prompt('Do you want to play again? (y or n)');
  let answer = readline.question();
  return answer.toLowerCase()[0] === 'y' || answer.toLowerCase() === 'yes';
}

function popTwoFromDeck(deck) {
  return [deck.pop(), deck.pop()];
}

function getPrintableHand(cards) {
  return cards.map(card => `${card[1]}${card[0]}`).join(' ');
}

while (wonFiveGames(playerScore, dealerScore)) {
  if (dealerScore === 5) {
     prompt("Dealer wins this game!");
    if (!playAgain()) {
      break;
    } else {
      dealerScore = 0;
      playerScore = 0;
      continue;
    }
  } else if (playerScore === 5) {
     prompt("Player wins this game!");
    if (!playAgain()) {
      break;
    } else {
      dealerScore = 0;
      playerScore = 0;
      continue;
    }

  }


  prompt(`This is round ${1 +playerScore + dealerScore} of Twenty-One! Whoever wins five times first, wins the game`);
  displayScores(playerScore, dealerScore);

  // declare and initialize vars
  let deck = initalizeDeck();
  let playerCards = [];
  let dealerCards = [];

  // initial deal
  playerCards.push(...popTwoFromDeck(deck));
  dealerCards.push(...popTwoFromDeck(deck));

  let playerTotal = total(playerCards);
  let dealerTotal = total(dealerCards);

  prompt(`Dealer has ${dealerCards[0]} and ?`);
  prompt(`You have: ${playerCards[0]} and ${playerCards[1]}, for a total of ${playerTotal}.`);

  // player turn
  while (true) {
    let playerTurn;
    while (true) {
      prompt('Would you like to (h)it or (s)tay?');
      playerTurn = readline.question().toLowerCase();
      if (['h', 's', 'hit', 'stay'].includes(playerTurn)) break;
      prompt("Sorry, must enter 'h','s','hit' or 'stay'");
    }

    if (playerTurn === 'h') {
      playerCards.push(deck.pop());
      console.clear();
      playerTotal = total(playerCards);
      prompt('You chose to hit!');
      prompt(`Your cards are now: ${getPrintableHand(playerCards)}`);
      prompt(`Your total is now: ${playerTotal}`);
    }

    if (playerTurn === 's' || busted(playerCards)) break;
  }

  if (busted(playerCards)) {
    console.clear();
    dealerScore += 1;
    displayResults(dealerTotal, playerTotal);
    displayEnding(dealerCards,playerCards,dealerTotal,playerTotal);
    if (playerScore >= 5 || dealerScore >= 5) {
      prompt(`${playerScore > dealerScore ? "Player" : "Dealer"} wins the game!`);
      if (!playAgain()) {
        break;
      } else {
        dealerScore = 0;
        playerScore = 0;
      }
    }
    continue;
  } else {
    prompt(`You stayed at ${total(playerCards)}`);
  }

  // dealer turn
  prompt('Dealer turn...');

  while (total(dealerCards) < 17) {
    prompt(`Dealer hits!`);
    dealerCards.push(deck.pop());
    dealerTotal = total(dealerCards);
    prompt(`Dealer's cards are now: ${getPrintableHand(dealerCards)}`);
  }

  if (busted(dealerCards)) {
    console.clear();
    playerScore += 1;
    displayResults(dealerTotal, playerTotal);
    displayEnding(dealerCards,playerCards,dealerTotal,playerTotal);
    if (playerScore >= 5 || dealerScore >= 5) {
      prompt(`${playerScore > dealerScore ? "Player" : "Dealer"} wins the game!`);
      if (!playAgain()) {
        break;
      } else {
        dealerScore = 0;
        playerScore = 0;
      }
    }
    continue;
  } else {
    prompt(`Dealer stays at ${total(dealerCards)}`);
  }

  // both player and dealer stays - compare cards!
  console.clear();
  if (dealerTotal > playerTotal) {
    dealerScore += 1;
  } else if (dealerTotal < playerTotal){
    playerScore += 1;
  }
  displayResults(dealerTotal, playerTotal);
  displayEnding(dealerCards,playerCards,dealerTotal,playerTotal);
  
}