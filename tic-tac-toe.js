const prompt = require("prompt-sync")();

console.log("Tic Tac Toe");

// Constant Reference Variables
const WINNING_COMBOS = [
  [0, 1, 2], // top row
  [3, 4, 5], // middle row
  [6, 7, 8], // bottom row
  [0, 3, 6], // left column
  [1, 4, 7], // middle column
  [2, 5, 8], // right column
  [0, 4, 8], // LTR diagonal
  [2, 4, 6], // RTL diagonal
];

// Model data
// Our game start variables
let board,
  turn,
  winner,
  replay = "y";

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
      winner = checkWinner();
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

function checkWinner() {
  for (let combo of WINNING_COMBOS) {
    if (
      board[combo[0]] &&
      board[combo[0]] === board[combo[1]] &&
      board[combo[1]] === board[combo[2]]
    ) {
      return board[combo[0]];
    }
  }
  return board.some((space) => space === null) ? null : "T";
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
  const message =
    winner === "T"
      ? "It's a tie game!"
      : winner
      ? `Congrats, Player ${winner} has won the game!`
      : `It is ${turn}'s turn, please choose a space.`;
  console.log(message);
}

// Start game
while (replay === "y") {
  init();
  gameplayLoop();
  replay = prompt("If you want to play again, enter a 'y' in the console: ");
}
console.log("Thanks for playing!");
