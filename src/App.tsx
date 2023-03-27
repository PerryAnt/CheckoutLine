import { FormEvent, useRef, useState, useEffect } from "react";
import "./App.css";

function App() {
  const [lines, setLines] = useState<number[][]>(Array(5).fill([]));
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const interval = setInterval(processLines, 500);
    return () => clearInterval(interval);
  }, []);

  function processLines() {
    setLines((prevLines) =>
      prevLines.map((line) =>
        line[0] > 1 ? [line[0] - 1, ...line.slice(1)] : [...line.slice(1)]
      )
    );
  }

  function addNewShopper(e: FormEvent) {
    e.preventDefault();
    const current = inputRef.current;
    if (!current) return;
    let count = parseInt(current.value);
    if (!count) return;
    current.value = "";

    const shortestIndex = findShortestLine();

    setLines((prevLines) =>
      prevLines.map((line, index) =>
        index == shortestIndex ? [...line, count] : line
      )
    );
  }

  function findShortestLine() {
    const counts = lines.map((shoppers) =>
      shoppers.reduce((sum, count) => sum + count, 0)
    );
    return counts.indexOf(Math.min(...counts));
  }

  function openNewLine() {
    let newLines: number[][];
    newLines = [];
    for (let shoppers of lines) {
      newLines.push([...shoppers]);
    }
    newLines.push([]);
    setLines(newLines);
  }

  function closeEmptyLine() {
    let newLines: number[][];
    newLines = [];
    let closed = false;

    for (let shoppers of lines) {
      if (!closed && shoppers.length == 0) closed = true;
      else newLines.push([...shoppers]);
    }
    setLines(newLines);
  }

  return (
    <main className="App">
      <div className="outer">
        <form className="horizontal" onSubmit={(e) => addNewShopper(e)}>
          <input ref={inputRef}></input>
          <br />
          <br />
          <button type="submit">Add New Shopper</button>
        </form>
        <br />
        <br />
        <div className="lines">
          {lines.map((shoppers, index1) => (
            <div key={index1} className="line">
              <div className="square"></div>
              {shoppers.map((count, index2) => (
                <div key={index2} className="circle">
                  {count}
                </div>
              ))}
            </div>
          ))}
          <div className="vertical">
            <button className="button" onClick={openNewLine}>
              Open New Line
            </button>
            <button className="button" onClick={closeEmptyLine}>
              Close Empty Line
            </button>
          </div>
        </div>
        <p>
          This is my solution to the problem from{" "}
          <a href="https://www.youtube.com/watch?v=B9fmr1TpKHE ">this</a>{" "}
          youtube video{" "}
        </p>
      </div>
    </main>
  );
}

export default App;
