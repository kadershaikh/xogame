import React, { useState } from "react";
import "./App.css";

/*
X O game logic

- on clicking the cell create func handlecellclick

- check whether cell is filled or empty

- if filled, then return by doing nothing

- if empty and no winner yet declared, proceed to update grid by creating copy of current grid and modify clicked cell to contain the symbol of current player

- after updating grid, call function checkwinner to see if current player has won game and setWinner to true for that player

- checkwinner function will iterate over winningConditions array to check if symbols in cells match the winning condition
*/

//creates an array of 9 empty strings that will be used to represent the grid of cells in the game.
const initialGrid = Array(9).fill("");

function App() {
  const [player, setPlayer] = useState("X");
  const [winner, setWinner] = useState(null);
  const [grid, setGrid] = useState(initialGrid);

  const handleCellClick = (index) => {
    if (grid[index] !== "") {
      return;
    }

    const newGrid = [...grid];
    newGrid[index] = player;
    setGrid(newGrid);

    checkWinner(newGrid, player);

    setPlayer(player === "X" ? "O" : "X");
  };

  const checkWinner = (grid, player) => {
    const winningConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < winningConditions.length; i++) {
      const [a, b, c] = winningConditions[i];
      if (grid[a] === player && grid[b] === player && grid[c] === player) {
        setWinner(player);
        break;
      }
    }

    // Check if the game is a draw
    if (grid.every((cell) => cell !== "")) {
      setWinner("draw");
    }
  };

  const resetGame = () => {
    setGrid(initialGrid);
    setCurrentPlayer("X");
    setWinner(null);
  };

  const renderCell = (index) => {
    return (
      <td
        style={{ border: "1px solid black", padding: "15px" }}
        onClick={() => handleCellClick(index)}
      >
        {grid[index]}
      </td>
    );
  };

  return (
    <>
      <h1>X-O Game</h1>
      <div>
        Next Player : <span>{player}</span>
      </div>

      <div>
        <table>
          <tr>
            {grid.slice(0, 3).map((cell, index) => (
              <React.Fragment key={index}>{renderCell(index)}</React.Fragment>
            ))}
          </tr>
          <tr>
            {grid.slice(3, 6).map((cell, index) => (
              <React.Fragment key={index + 3}>
                {renderCell(index + 3)}
              </React.Fragment>
            ))}
          </tr>
          <tr>
            {grid.slice(6, 9).map((cell, index) => (
              <React.Fragment key={index + 6}>
                {renderCell(index + 6)}
              </React.Fragment>
            ))}
          </tr>
        </table>

        {winner && winner !== "draw" ? (
          <div style={{ color: "green" }}>
            <p>Player {winner} wins!</p>
          </div>
        ) : (
          <></>
        )}

        {winner === "draw" && <p>Game is a draw!</p>}

        <button style={{marginTop: "10px"}} onClick={resetGame}>Reset Game</button>
      </div>
    </>
  );
}

export default App;
