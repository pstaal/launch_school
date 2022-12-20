const readline = require('readline-sync');
const INITIAL_MARKER = ' ';
const HUMAN_MARKER = 'X';
const COMPUTER_MARKER = 'O';
const WIN_NUMBER = 5;
const CURRENT_PLAYER = 'player';

function displayBoard(board) {
    // console.clear();

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


  function findAtRiskSquare (board, defense = true) {
    let winningLines = [
        [1, 2, 3], [4, 5, 6], [7, 8, 9], // rows
        [1, 4, 7], [2, 5, 8], [3, 6, 9], // columns
        [1, 5, 9], [3, 5, 7]             // diagonals
      ];

      let marker = defense ? HUMAN_MARKER : COMPUTER_MARKER 
      for (let line = 0; line < winningLines.length; line++) {
        let optionArray = winningLines[line].filter((position) => {
          return board[position] !== marker;
        })
        if (optionArray.length === 1 && board[optionArray[0]] === INITIAL_MARKER) {
          return optionArray[0]; 
        } 
      }
    return null;
  }

  function computerChoosesSquare(board) {

   let square = findAtRiskSquare(board, false) ? findAtRiskSquare(board, false) : findAtRiskSquare(board) 

    
    if (square !== null) {
        board[square] = COMPUTER_MARKER;
    } else {
      if (board[5] === ' ') {
        board[5] = COMPUTER_MARKER;
      } else {
        let randomIndex = Math.floor(Math.random() * emptySquares(board).length);
        square = emptySquares(board)[randomIndex];
        board[square] = COMPUTER_MARKER;
      }
      
    }
    
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
        console.log("Who is going to start? Choose computer or player");
        let currentPlayer = readline.question().trim();
    
        if (!["computer", "player"].includes(currentPlayer)) {
           currentPlayer = CURRENT_PLAYER;
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
  
    console.log('Play again? (y or n)');
    let answer = readline.question().toLowerCase()[0];
    if (answer !== 'y')  break;
   
  }
  
  console.log('Thanks for playing Tic Tac Toe!');