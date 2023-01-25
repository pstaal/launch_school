const readline = require('readline-sync');
const INITIAL_MARKER = ' ';
const HUMAN_MARKER = 'X';
const COMPUTER_MARKER = 'O';
const CURRENT_PLAYER = 'player';


// the main minimax function
function minimax(newBoard, player){
  
  //available spots
  let availSpots = emptySquares(newBoard);

  // checks for the terminal states such as win, lose, and tie 
  //and returning a value accordingly
  if (detectWinner(newBoard) === 'Player'){
    return {score:-10};
    }
    else if (detectWinner(newBoard) === 'Computer'){
      return {score:10};
    }
    else if (availSpots.length === 0){
      return {score:0};
  }


  // an array to collect all the objects
  const moves = [];

  // loop through available spots
  for (let i = 0; i < availSpots.length; i++){
    //create an object for each and store the index of that spot 
    const move = {};
  	move.index = availSpots[i];

    // set the empty spot to the current player
    newBoard[availSpots[i]] = player === 'computer' ? COMPUTER_MARKER : HUMAN_MARKER;

    /*collect the score resulted from calling minimax 
      on the opponent of the current player*/
    if (player === 'computer'){
      let result = minimax(newBoard, 'player');
      move.score = result.score;
    }
    else{
      let result = minimax(newBoard, 'computer');
      move.score = result.score;
    }

    // reset the spot to empty
    newBoard[availSpots[i]] = ' ';

    // push the object to the array
    moves.push(move);
  }

  // if it is the computer's turn loop over the moves and choose the move with the highest score
  let bestMove;
  if(player === 'computer'){
    let bestScore = -10000;
    for(let i = 0; i < moves.length; i++){
      if(moves[i].score > bestScore){
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  } else {
// else loop over the moves and choose the move with the lowest score
    let bestScore = 10000;
    for(let i = 0; i < moves.length; i++){
      if(moves[i].score < bestScore){
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  }

// return the chosen move (object) from the moves array
  return moves[bestMove];


}




function displayBoard(board) {
    console.clear();

    console.log(`You are ${HUMAN_MARKER}. Computer is ${COMPUTER_MARKER}`);

    console.log('');
    console.log('     |     |');
    console.log(`  ${board['1']}  |  ${board['2']}  |  ${board['3']}`);
    console.log('     |     |');
    console.log('-----+-----+-----');
    console.log('     |     |');
    console.log(`  ${board['4']}  |  ${board['5']}  |  ${board['6']}`);
    console.log('     |     |');
    console.log('-----+-----+-----');
    console.log('     |     |');
    console.log(`  ${board['7']}  |  ${board['8']}  |  ${board['9']}`);
    console.log('     |     |');
    console.log('');
}

function alternatePlayer(string) {
    return string === 'computer' ? "player" : "computer";
}

function chooseSquare(board, player) {
    if (player === 'player') {
        playerChoosesSquare(board) ;
    } else if (player === 'computer') {
        computerChoosesSquare(board);
    }
}

function initializeBoard() {
    let board = {};
  
    for (let square = 1; square <= 9; square++) {
        board[String(square)] = INITIAL_MARKER;
    }
  
    return board;
  }
  
  function emptySquares(board) {
    return Object.keys(board).filter(key => board[key] === INITIAL_MARKER);
  }

  function joinOr(array, firstSeperator = ", ", secondSeperator = "or") {
    if (array.length === 0) {
      return "";
    }
    if (array.length === 1) {
      return array[0];
    }
    if (array.length === 2) {
      return array[0] + " " + secondSeperator + " " + array[1];
    }
    
    let firstSection = array.slice(0, array.length -1);
    let lastSection = array.slice(array.length -1);
    let firstString = firstSection.join(firstSeperator);
    return firstString + firstSeperator + secondSeperator + " " + lastSection[0];
    
  }  
 
  
  function playerChoosesSquare(board) {
    let square;
   
    while (true) {
      console.log(`Choose a square (${joinOr(emptySquares(board))}):`);
      square = readline.question().trim();
  
      if (emptySquares(board).includes(square)) break;
  
      console.log("Sorry, that's not a valid choice.");
    }
  
    board[square] = HUMAN_MARKER;
  }




  function computerChoosesSquare(board) {

   const winningObject = minimax(board, 'computer');
   const square = winningObject.index;
   
   board[square] = COMPUTER_MARKER;

  }

  function boardFull(board) {
    return emptySquares(board).length === 0;
  }

  function detectWinner(board) {
    let winningLines = [
      [1, 2, 3], [4, 5, 6], [7, 8, 9], // rows
      [1, 4, 7], [2, 5, 8], [3, 6, 9], // columns
      [1, 5, 9], [3, 5, 7]             // diagonals
    ];
  
    for (let line = 0; line < winningLines.length; line++) {
      let [ sq1, sq2, sq3 ] = winningLines[line];
  
      if (
          board[sq1] === HUMAN_MARKER &&
          board[sq2] === HUMAN_MARKER &&
          board[sq3] === HUMAN_MARKER
      ) {
        return 'Player';
      } else if (
          board[sq1] === COMPUTER_MARKER &&
          board[sq2] === COMPUTER_MARKER &&
          board[sq3] === COMPUTER_MARKER
      ) {
        return 'Computer';
      }
    }
  
    return null;
  }

  function someoneWon(board) {
    return !!detectWinner(board);
  }

  while (true) {
    let board = initializeBoard();
    let currentPlayer;
    while (true) {
      console.log("Who is going to start? Choose computer or player");
      currentPlayer = readline.question().trim();
  
      if (["computer", "player"].includes(currentPlayer)) break;
  
      console.log("Sorry, that's not a valid choice.");
    }

    while (true) {
        displayBoard(board);
        chooseSquare(board, currentPlayer);
        currentPlayer = alternatePlayer(currentPlayer);
        if (someoneWon(board) || boardFull(board)) break;
    }

  
    if (someoneWon(board)) {
      console.log(`${detectWinner(board)} won!`);
    } else {
      console.log("It's a tie!");
    }
  
    let answer;
    while (true) {

    console.log('Play again? (y or n)');
    answer = readline.question().toLowerCase();
    if (["y", "n"].includes(answer)) break;
    console.log("Sorry, that's not a valid choice.");

    }
    if (answer !== 'y')  break;
   
  }
  
  console.log('Thanks for playing Tic Tac Toe!');