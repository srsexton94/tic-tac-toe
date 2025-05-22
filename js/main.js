/*--------------- Cached Elements ----------------*/
const boardEl = document.querySelector(".board");
const messageEl = document.querySelector(".message");
const resetEl = document.querySelector(".reset");

/*----------- Constant Lookup Variables -----------*/
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

/*--------------- State Variables ----------------*/
let board, turn, winner;

/*--------------- Event Listeners ----------------*/

boardEl.addEventListener("click", onBoardClick);
resetEl.addEventListener("click", init);

/*------------------ Functions -------------------*/

function init() {
  board = [null, null, null, null, null, null, null, null, null];
  turn = "X";
  winner = null;
  render();
}

function onBoardClick(event) {
  if (event.target !== boardEl && !winner) {
    const boardChildren = [...boardEl.children];
    const idx = boardChildren.indexOf(event.target);
    if (!board[idx]) {
      board[idx] = turn;
      changeTurn();
      winner = checkWinner();
      render();
    }
  }
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

// Render functions
function render() {
  renderBoard();
  renderMessage();
  renderButton();
}

function renderBoard() {
  board.forEach((cell, i) => {
    boardEl.children[i].innerText = cell || "";
    boardEl.children[i].setAttribute(
      "aria-label",
      cell ? `${cell}'s spot` : "Empty spot"
    );
  });
}

function renderMessage() {
  const message =
    winner === "T"
      ? "It's a tie game!"
      : winner
      ? `Congrats, Player ${winner} has won the game!`
      : `It is ${turn}'s turn, please choose a space.`;
  messageEl.innerText = message;
}

function renderButton() {
  resetEl.style.visibility = winner ? "visible" : "hidden";
}

/*---------------- Game Start -----------------*/
init();
