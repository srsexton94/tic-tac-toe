const prompt = require("prompt-sync")();

console.log("Tic Tac Toe");

// Model data
// Our game start variables
let board, turn, winner;

// Controller functions

// This function represents beginning of game
// will give our state variables "starting values"
function init() {
  board = [null, null, null, null, null, null, null, null, null];
  turn = "X";
  winner = null;
  render();
}

function gameplayLoop() {
  while (!winner) {
    const choice = prompt("Select a space to play using numbers 0-8: ");

    if (choice === "quit") break;

    const isValid = checkUserChoice(choice);
    if (isValid) {
      board[choice] = turn;
      changeTurn();
      render();
    }
  }
}

function checkUserChoice(choice) {
  return !isNaN(choice) && choice >= 0 && choice <= 8 && board[choice] === null;
}

function changeTurn() {
  turn = turn === "X" ? "O" : "X";
}

// View functions

function render() {
  renderBoard();
  renderMessage();
}

function renderBoard() {
  console.log(`  ${board[0] || " "}|${board[1] || " "}|${board[2] || " "}`);
  console.log(" --|-|--");
  console.log(`  ${board[3] || " "}|${board[4] || " "}|${board[5] || " "}`);
  console.log(" --|-|--");
  console.log(`  ${board[6] || " "}|${board[7] || " "}|${board[8] || " "}`);
}

function renderMessage() {
  console.log(`It is ${turn}'s turn, please choose a space.`);
}

// Start game
init();
gameplayLoop();
