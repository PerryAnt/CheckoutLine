import React, { useEffect, useState } from "react"

export default function ColorGuesser() {
  const [color, setColor] = useState(randomColorString())
  const [choices, setChoices] = useState(["0", "0", "0"])
  const [choiceCount, setChoiceCount] = useState(3)
  const [streak, setStreak] = useState(0)
  const [text, setText] = useState("\n")

  function handleGuess(guess: string) {
    if (guess === color) {
      setText("Correct")
      setStreak((value) => value + 1)
      getNewChoices()
    } else {
      setText("Wrong")
      setStreak(0)
    }
  }

  function getNewChoices() {
    let newColor = randomColorString()
    let newChoices = Array(choiceCount).fill("0")

    for (let i = 0; i < newChoices.length; i++)
      newChoices[i] = randomColorString()

    newChoices[Math.floor(Math.random() * 2)] = newColor

    setColor(newColor)
    setChoices(newChoices)
  }

  useEffect(() => getNewChoices(), [choiceCount])

  return (
    <>
      <div>
        <p>Correct Streak: {streak}</p>
        <p style={{ minHeight: "1.5rem" }}>{text}</p>
        Number of Choices:
        <select onChange={(e) => setChoiceCount(parseInt(e.target.value))}>
          {[3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
            <option value={value}>{value}</option>
          ))}
        </select>
        <div className="color-box" style={{ background: "#" + color }}></div>
        <div className="button-box">
          {choices.map((value, index) => (
            <button key={index} onClick={(e) => handleGuess(value)}>
              {value}
            </button>
          ))}
        </div>
      </div>
    </>
  )
}

function randomColorString() {
  return Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, "0")
}
