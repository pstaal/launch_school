const readline = require('readline-sync');

const SUITS = ['H', 'D', 'S', 'C'];
const VALUES = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

const OUTCOMES  = { tie: 0, player: 1, dealer: 2 };
const MAX_SCORE = 5;

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

//initialize deck
function initializeDeck() {
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

function dealTwoFrom(deck) {
  return [deck.pop(), deck.pop()]; 
}

function displayEnding(dealerHand, playerHand, dealerTotal, playerTotal) {
  prompt(`Dealer has ${dealerHand}, for a total of: ${dealerTotal}`);
  prompt(`Player has ${playerHand}, for a total of: ${playerTotal}`);
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

function playAgain() {
  console.log('-------------');
  prompt('Do you want to play another game? (y or n)');
  let answer = readline.question();
  return answer.toLowerCase()[0] === 'y' || answer.toLowerCase() === 'yes';
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

function gameNotEnded(playerScore, dealerScore) {
  return playerScore < MAX_SCORE && dealerScore < MAX_SCORE;
}

function getPrintableHand(cards) {
  return cards.map(card => `${card[1]}${card[0]}`).join(' ');
}

function playerTurn(deck, playerHand, dealerHand) {
  while (true) {
    let playerChoice;
    while (true) {
      prompt('Would you like to (h)it or (s)tay?');
      playerChoice = readline.question().toLowerCase();
      if (['h', 's', 'hit', 'stay'].includes(playerChoice)) break;
      prompt("Sorry, must enter 'h','s','hit' or 'stay'");
    }

    if (playerChoice === 'h') {
      playerHand.push(deck.pop());
      console.clear();
      playerTotal = total(playerHand);
      prompt('You chose to hit!');
      prompt(`Your cards are now: ${getPrintableHand(playerHand)}`);
      prompt(`Your total is now: ${playerTotal}`);
    }

    if (playerChoice === 's' || busted(playerHand)) break;
  }

  if (busted(playerHand)) {
    let dealerTotal = total(dealerHand);
    let playerTotal = total(playerHand);
    displayResults(dealerTotal, playerTotal);
    return true;
   
  } else {
    prompt(`You stayed at ${total(playerHand)}`);
    return false;
  }
}

function dealerTurn(deck, dealerHand){
  console.clear();
  prompt('Dealer turn...');

  while (total(dealerHand) < 17) {
    prompt(`Dealer hits!`);
    dealerHand.push(deck.pop());
    dealerTotal = total(dealerHand);
    prompt(`Dealer's cards are now: ${getPrintableHand(dealerHand)}`);
  }
  
}
  
function compareScores(playerHand, dealerHand) {
  let dealerTotal = total(dealerHand);
  let playerTotal = total(playerHand);
  displayEnding(dealerHand, playerHand, dealerTotal, playerTotal);
  displayResults(dealerTotal, playerTotal);
  if (dealerTotal === playerTotal){
    return OUTCOMES.tie;
  } else if (dealerTotal > playerTotal) {
    return OUTCOMES.dealer;
  } else {
    return OUTCOMES.player;
  }
}

function farewellFromTwentyOne(){
  prompt("Thank you for playing 21, hope to see you again!")
}

function welcomeToTwentyOne() {
  prompt("Welcome to a game of 21!")
}


playTwentyOneGame();

//  new function
function playTwentyOneGame() {
  welcomeToTwentyOne(); 
 

  do playSingleGame();

  while (playAgain());

  farewellFromTwentyOne(); 
}

function reportGameOutcome(playerScore, dealerScore){
  console.log('-------------');
  let string = (playerScore === 5 || dealerScore === 5) ? "final" : "current";
  prompt(`The ${string} score is player: ${playerScore}, dealer: ${dealerScore}`);
  if(playerScore === 5) {
    prompt("player wins the game!")
  } else if (dealerScore === 5) {
    prompt("Dealer wins the game!")
  }
}

// new function
function playSingleGame() {
  let [ playerScore, dealerScore ] = resetScores();

  do {
    prompt(`This is round ${1 +playerScore + dealerScore} of Twenty-One! Whoever wins five times first, wins the game`);
    const roundWinner = playSingleRound();

    [ playerScore, dealerScore ] = 
      incrementScoreFor(
        roundWinner, 
        playerScore, 
        dealerScore
      );

    reportGameOutcome(playerScore, dealerScore); 

    
  } while (gameNotEnded(playerScore, dealerScore));
}

// new function
function resetScores() {
  return [ 0, 0 ];
}

// new function
function incrementScoreFor(participant, player, dealer) {
  let playerScore = player;
  let dealerScore = dealer;

  if (participant === OUTCOMES.player) playerScore++;
  if (participant === OUTCOMES.dealer) dealerScore++;

  return [ playerScore, dealerScore ];
}

// new function
function playSingleRound() {
  const deck = initializeDeck();

  const playerHand = dealTwoFrom(deck); 
  const dealerHand = dealTwoFrom(deck); 


  prompt(`Dealer has ${dealerHand[0]} and ?`);
  prompt(`You have: ${playerHand[0]} and ${playerHand[1]}, for a total of ${total(playerHand)}.`);

  const playerIsBust = playerTurn(deck, playerHand, dealerHand); 
  if (!playerIsBust)   dealerTurn(deck, dealerHand); 
  const dealerIsBust = busted(dealerHand);

  // The invocations of playerTurn and dealerTurn would have modified `deck` and their respective hands.

  if (playerIsBust) {
    return OUTCOMES.dealer;
  } else if (dealerIsBust) {
    prompt("Dealer busted. Players wins this round.")
    return OUTCOMES.player;
  } else {
    return compareScores(playerHand, dealerHand);
  }
}




