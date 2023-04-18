import React from "react";
import { FormEvent, useRef, useState, useEffect } from "react";
import { ChangeEvent } from "react";
import "../css/Sudoku.css";
//import DATA from "../assets/data.csv";

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

  function handleBoardChange(
    rowIndex: number,
    columnIndex: number,
    value: number
  ) {
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
    setBoard(
      Array(9)
        .fill(null)
        .map(() => Array(9).fill(false))
    );
  }

  //logic for finding repeated values in row/columns/boxes
  useEffect(() => {
    let newIncorrectCells = Array(9)
      .fill(null)
      .map(() => Array(9).fill(false));

    for (let rowIndex = 0; rowIndex < 9; rowIndex++) {
      for (let columnIndex = 0; columnIndex < 9; columnIndex++) {
        for (let rowIndex2 = rowIndex + 1; rowIndex2 < 9; rowIndex2++) {
          if (
            board[rowIndex][columnIndex] > 0 &&
            board[rowIndex][columnIndex] == board[rowIndex2][columnIndex]
          ) {
            newIncorrectCells[rowIndex][columnIndex] = true;
            newIncorrectCells[rowIndex2][columnIndex] = true;
          }

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

  useEffect(() => {
    fetch("./data.csv")
      .then((response) => response.text())
      .then((data) => console.log(data.split("\r\n")))
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <div>
        <div>Sudoku</div>
        <table>
          {board.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((number, columnIndex) => (
                <Square
                  number={number}
                  wrong={incorrectCells[rowIndex][columnIndex]}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleBoardChange(
                      rowIndex,
                      columnIndex,
                      parseInt(e.target.value)
                    )
                  }
                  row={rowIndex}
                  column={columnIndex}
                ></Square>
              ))}
            </tr>
          ))}
        </table>
      </div>
    </>
  );
}

interface Props {
  number: number;
  wrong: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  row: number;
  column: number;
}

function Square(props: Props) {
  return (
    <td key={props.column}>
      <input
        className={props.wrong ? "wrong" : "input"}
        value={props.number > 0 ? props.number : ""}
        onChange={props.onChange}
      ></input>
    </td>
  );
}
