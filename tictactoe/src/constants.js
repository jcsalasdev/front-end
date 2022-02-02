export const boxes = document.querySelectorAll(".cell");
export const boxesArray = Array.from(boxes);
export const cellElements = document.querySelectorAll('[data-cell]')
export const result = document.querySelector(".result");
export const resetBtn = document.querySelector(".reset-btn");
export const prevH = document.querySelector(".prev-btn");
export const nextH = document.querySelector(".next-btn");
export const board = document.getElementById("board");

export const player1 = "circle";
export const player2 = "x";
export const winningCombination = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]