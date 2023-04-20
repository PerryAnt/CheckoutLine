import React from "react";
import { FormEvent, useRef, useState, useEffect } from "react";
import { ChangeEvent } from "react";
import "../css/Sudoku.css";

export default function Sudoku() {
  const [board, setBoard] = useState<number[][]>(
    Array(9)
      .fill(null)
      .map(() => Array(9).fill(0))
  );

  const [incorrectCells, setIncorrectCells] = useState<boolean[][]>(
    Array(9)
      .fill(null)
      .map(() => Array(9).fill(false))
  );

  const [startingBoard, setStartingBoard] = useState<number[][]>(
    Array(9)
      .fill(null)
      .map(() => Array(9).fill(0))
  );

  //set starting board when page first loads
  useEffect(() => {
    getNewPuzzle();

    fetch("sudoku.json")
      .then((response) => response.json())
      .then((response) => console.log(response));
  }, []);

  function getNewPuzzle() {
    //data.csv is in a different relative location if running locally vs running on github
    let csvLocation = window.location.href.includes("localhost")
      ? "sudoku.csv"
      : "https://perryant.github.io/ReactStuff/sudoku.csv";
    fetch(csvLocation)
      .then((response) => response.text())
      .then((data) => {
        return getRandomPuzzleFromCSV(data);
      })
      .then((newStartingBoard) => {
        //TO DO fix board and startingBoard being set to the same reference
        setStartingBoard(newStartingBoard);
        setBoard(newStartingBoard);
      })
      .catch((error) => console.log(error));
  }

  function handleBoardChange(
    rowIndex: number,
    columnIndex: number,
    value: number
  ) {
    if (startingBoard[rowIndex][columnIndex]) return;
    if (isNaN(value)) value = 0;
    if (value > 9) return;

    setBoard((prevBoard) =>
      board.map((row, idx) =>
        idx == rowIndex
          ? [...row.slice(0, columnIndex), value, ...row.slice(columnIndex + 1)]
          : [...row]
      )
    );
  }

  function resetBoard() {
    setBoard((prevBoard) =>
      board.map((row, rowIndex) => [...startingBoard[rowIndex]])
    );
  }

  //logic for finding repeated values in row/columns/boxes
  useEffect(() => {
    let newIncorrectCells = Array(9)
      .fill(null)
      .map(() => Array(9).fill(false));

    for (let rowIndex = 0; rowIndex < 9; rowIndex++) {
      for (let columnIndex = 0; columnIndex < 9; columnIndex++) {
        //check row for duplicates
        for (let rowIndex2 = rowIndex + 1; rowIndex2 < 9; rowIndex2++) {
          if (
            board[rowIndex][columnIndex] > 0 &&
            board[rowIndex][columnIndex] == board[rowIndex2][columnIndex]
          ) {
            newIncorrectCells[rowIndex][columnIndex] = true;
            newIncorrectCells[rowIndex2][columnIndex] = true;
          }

          //check column for duplicates
          for (
            let columnIndex2 = columnIndex + 1;
            columnIndex2 < 9;
            columnIndex2++
          ) {
            if (
              board[rowIndex][columnIndex] > 0 &&
              board[rowIndex][columnIndex] == board[rowIndex][columnIndex2]
            ) {
              newIncorrectCells[rowIndex][columnIndex] = true;
              newIncorrectCells[rowIndex][columnIndex2] = true;
            }
          }
        }

        //check box for duplicates
        let rowBox = Math.floor(rowIndex / 3);
        let columnBox = Math.floor(columnIndex / 3);
        let rowIndex2 = 0;
        let columnIndex2 = 0;
        for (let i = 0; i < 3; i++) {
          for (let j = 0; j < 3; j++) {
            rowIndex2 = 3 * rowBox + i;
            columnIndex2 = 3 * columnBox + j;

            if (rowIndex != rowIndex2 && columnIndex != columnIndex2)
              if (
                board[rowIndex][columnIndex] > 0 &&
                board[rowIndex][columnIndex] == board[rowIndex2][columnIndex2]
              ) {
                newIncorrectCells[rowIndex][columnIndex] = true;
                newIncorrectCells[rowIndex2][columnIndex2] = true;
              }
          }
        }
      }
    }

    setIncorrectCells(newIncorrectCells);
  }, [board]);

  //   useEffect(() => {
  //     //data.csv is in a different relative location if running locally vs running on github
  //     let csvLocation = window.location.href.includes("localhost")
  //       ? "data.csv"
  //       : "https://perryant.github.io/CheckoutLine/data.csv";
  //     fetch(csvLocation)
  //       .then((response) => response.text())
  //       .then((data) => data.split(/\r?\n|\r|\n/))
  //       .then((data) => {
  //         if (data.at(-1) === "") data.pop();
  //         return data;
  //       })
  //       .then((data) => console.log(data))
  //       .catch((error) => console.log(error));
  //   }, []);

  return (
    <>
      <div>
        <table>
          <tbody>
            {board.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((number, columnIndex) => (
                  <Square
                    key={columnIndex}
                    number={number}
                    wrong={incorrectCells[rowIndex][columnIndex]}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      handleBoardChange(
                        rowIndex,
                        columnIndex,
                        parseInt(e.target.value)
                      )
                    }
                  ></Square>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={getNewPuzzle}>New Puzzle</button>
        <button onClick={resetBoard}>Reset Puzzle</button>
        <p>
          This project is partially motivated by{" "}
          <a href="https://www.youtube.com/watch?v=dCCYALKSZEs">this</a> youtube
          video, the version in the video sends a partially complete Sudoku
          board to an API which sends back the solution, then fills the board
          with that solution. My version gets a random puzzle from a file and
          the user is meant to try to solve it.
        </p>
        <p>
          The puzzles are from{" "}
          <a href="https://www.kaggle.com/datasets/bryanpark/sudoku">this</a>{" "}
          kaggle dataset where someone generated a large number of Sudoku. I
          took a small number of those puzzles and a random one is selected when
          a new puzzle is needed.
        </p>
      </div>
    </>
  );
}

function getRandomPuzzleFromCSV(csvText: string) {
  let newPuzzleString = csvText.split(/\r?\n|\r|\n/);
  newPuzzleString =
    newPuzzleString.at(-1) === ""
      ? newPuzzleString.slice(1, -1)
      : newPuzzleString.slice(1);
  //text file has both puzzle and solution in the same row
  //this gets just the puzzle
  newPuzzleString = newPuzzleString.map((row) => {
    return row.split(",")[0];
  });
  //get random puzzle
  let puzzleIndex = Math.floor(Math.random() * newPuzzleString.length);

  return convertStringTo2DArray(newPuzzleString[puzzleIndex]);
}

function getRandomPuzzleFromJSON(json: Object) {}

function convertStringTo2DArray(text: string) {
  let arr = text.split("");
  let arrNumber = arr.map((value) => {
    return parseInt(value);
  });
  let arr2D: number[][] = [];

  for (let rowIndex = 0; rowIndex < 9; rowIndex++) {
    arr2D.push(arrNumber.slice(9 * rowIndex, 9 * (rowIndex + 1)));
  }
  return arr2D;
}

interface Props {
  number: number;
  wrong: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

function Square(props: Props) {
  return (
    <td>
      <input
        className={props.wrong ? "wrong" : "input"}
        value={props.number > 0 ? props.number : ""}
        onChange={props.onChange}
      ></input>
    </td>
  );
}
