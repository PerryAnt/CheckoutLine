import React, { useEffect, useState } from "react";
import "../css/Memory.css";

export default function Memory() {
  const [size, setSize] = useState(4);
  const [board, setBoard] = useState<number[][]>(
    Array(size)
      .fill(null)
      .map(() => Array(size).fill(0))
  );

  const [state, setState] = useState<("up" | "down" | "empty")[][]>(
    Array(size)
      .fill(null)
      .map(() => Array<"up" | "down" | "empty">(size).fill("down"))
  );

  function getNewBoard() {
    let newBoard = Array(size * size).fill(0);
    newBoard = newBoard.map(
      (value, index) => (index % ((size * size) / 2)) + 1
    );
    let j = 0;

    for (let i = newBoard.length - 1; i > 0; i--) {
      j = randomInt(i);
      swap(newBoard, i, j);
    }

    setBoard(array1Dto2D(newBoard));
    setState(
      Array(size)
        .fill(null)
        .map(() => Array<"up" | "down" | "empty">(size).fill("down"))
    );
  }

  function handleClick(rowIndex: number, colIndex: number) {
    const newState = [...state];
    const flipped: number[][] = [];

    // const emptyCount = state
    //   .map((row, rowIndex) => row.filter((value) => value === "empty").length)
    //   .reduce(sum, 0);

    // console.log(emptyCount);

    state.map((row, rowIndex) =>
      row.map((value, colIndex) => {
        if (value === "up") flipped.push([rowIndex, colIndex]);
      })
    );

    if (flipped.length === 2) return;

    if (flipped.length === 0) {
      if (state[rowIndex][colIndex] === "down")
        newState[rowIndex][colIndex] = "up";
    }

    if (flipped.length === 1) {
      const prevRow = flipped[0][0];
      const prevCol = flipped[0][1];

      if (rowIndex === prevRow && colIndex === prevCol) return;

      newState[rowIndex][colIndex] = "up";
      newState[prevRow][prevCol] = "up";

      if (board[rowIndex][colIndex] === board[prevRow][prevCol]) {
        setTimeout(() => {
          const newState = [...state];
          newState[rowIndex][colIndex] = "empty";
          newState[prevRow][prevCol] = "empty";
          setState(newState);
        }, 1000);
      } else {
        setTimeout(() => {
          const newState = [...state];
          newState[rowIndex][colIndex] = "down";
          newState[prevRow][prevCol] = "down";
          setState(newState);
        }, 1000);
      }
    }

    setState(newState);
  }

  useEffect(() => getNewBoard, []);
  return (
    <div>
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="horizontal">
          {row.map((number, colIndex) => (
            <div
              key={colIndex}
              className={`square-${state[rowIndex][colIndex]}`}
              onClick={(e) => handleClick(rowIndex, colIndex)}
            >
              <div>{number}</div>
            </div>
          ))}
        </div>
      ))}
      <button onClick={getNewBoard}>New Game</button>
    </div>
  );
}

function array1Dto2D(arr: number[]) {
  let size = Math.sqrt(arr.length);
  let newArr = Array(size)
    .fill(null)
    .map(() => Array(size).fill(0));

  return newArr.map((row, rowIndex) =>
    row.map((value, colIndex) => arr[size * rowIndex + colIndex])
  );
}

function swap(arr: any[], index1: number, index2: number) {
  let temp = arr[index1];
  arr[index1] = arr[index2];
  arr[index2] = temp;
}

function randomInt(max: number) {
  return Math.floor(Math.random() * max);
}

function sum(accumulator: number, currentValue: number) {
  return accumulator + currentValue;
}
