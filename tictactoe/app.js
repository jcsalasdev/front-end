import {boxes, cellElements, result, resetBtn, prevH, nextH,
 board, player1, player2, winningCombination} from "./src/constants.js"
import drawBoard from "./src/drawBoard.js"
import state from "./src/state.js"

drawBoard()
startGame()

function startGame() {
  state.isStarted = false;
  state.circleTurn = false;
  state.boardState = state.boardState.map(_ => "");
  state.moveLog = [[...state.boardState]];
  cellElements.forEach(cell => {
    cell.classList.remove(player1, player2, 'won')
    cell.addEventListener('click', handleClick, {once: true})
  })
  resetBtn.setAttribute("disabled", "true");
  result.innerText = "Tic-Tac-Toe"
  hideHistoryBtn() 
  setBoardHoverClass()
}
function handleClick(e) {
  const cell = e.target
  const currentClass = state.circleTurn ? player1: player2;
  state.boardState[cell.dataset.cell] = currentClass;
  updateBoard(state.boardState);
  saveMove(state.boardState);
  result.innerText = `${state.circleTurn ? "x turn": "circle turn"}`;
  if (!state.isStarted) {
    resetBtn.addEventListener('click', startGame)
    resetBtn.removeAttribute("disabled");
    state.isStarted = true;
  }

  if (checkWin(currentClass)) {
    endGame(false)
    state.moves = state.moveLog.length;
  } else if (isDraw()) {
    endGame(true)
    state.moves = state.moveLog.length;

  } else {
    state.circleTurn = !state.circleTurn
    setBoardHoverClass()
  }
}

function setBoardHoverClass() {
  board.classList.remove(player1)
  board.classList.remove(player2)
  if (state.circleTurn) {
    board.classList.add(player1)
  } else {
    board.classList.add(player2)
  }
}


function endGame(draw) {
  if (draw) {
    result.innerText = 'Draw!'
  } else {
    result.innerText = `${state.circleTurn ? "Circle" : "X"} Wins!`;
    boxes.forEach(cell => cell.removeEventListener("click", handleClick));
    board.classList.remove(player1, player2)
  }

  displayHistoryBtn()
}

function isDraw() {
  return [...cellElements].every(cell => {
    return cell.classList.contains(player1) || cell.classList.contains(player2)
   
  })
}

function checkWin(currentClass) {
  return winningCombination.some(combination => {
    const winStyle = combination.every(index => {
      return cellElements[index].classList.contains(currentClass)
    });

    if (winStyle) {
      combination.forEach(index => {
        cellElements[index].classList.add("won");
      });
      return true;
    } else {
      return false;
    }
  });
}

function displayHistoryBtn() {
  prevH.classList.remove('prev-btn')
  nextH.classList.remove('next-btn')
  prevH.addEventListener("click", displayPrev);
  nextH.addEventListener("click", displayNext); 
  nextH.setAttribute("disabled", "true");
  prevH.removeAttribute("disabled");
}

function hideHistoryBtn() {
  prevH.classList.add('prev-btn')
  nextH.classList.add('next-btn')
  prevH.removeEventListener("click", displayPrev);
  nextH.removeEventListener("click", displayNext);
}

function displayNext() {
  showLog(state.moveLog[state.moves++]);
  if (state.moves >= state.moveLog.length) {
    nextH.setAttribute("disabled", true);
  }
}

function displayPrev() {
  showLog(state.moveLog[--state.moves - 1]); 
  if (state.moves <= 1) {
    prevH.setAttribute("disabled", true);
  }
}

function showLog(snapshot) {
  cellElements.forEach(cell => {
    cell.classList.remove(player1, player2)});

  for (let i = 0; i <= snapshot.length - 1; i++) {
    if (snapshot[i] === "") {
      continue;
    } else {
      board.children[i].classList.add(snapshot[i]);
    }
  }
  if (state.moves < state.moveLog.length) {
    nextH.removeAttribute("disabled");
  }
  if (state.moves > 1) {
   prevH.removeAttribute("disabled");
  }
}

function saveMove(boardState) {
  state.moveLog.push([...boardState]);
}

function updateBoard(boardState) {
  for (let i = 0; i <= boardState.length - 1; i++) {
    if (boardState[i] === "") {
      continue;
    } else {
      board.children[i].classList.toggle(boardState[i], true);
    }
  }
}
