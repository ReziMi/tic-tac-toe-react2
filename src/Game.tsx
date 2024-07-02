import React, { useEffect, useState } from "react";
import Square from "./Square";

const INITIAL_GAME_STATE = ["", "", "", "", "", "", "", "", ""];
const WINNING_COMBOS: number[][] = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const Game: React.FC = () => {
  const [gameState, setGameState] = useState<string[]>(INITIAL_GAME_STATE);
  const [currentPlayer, setCurrentPlayer] = useState<string>("X");

  useEffect(() => {
    checkForWinner();
  }, [gameState]);

  const handleWin = () => {
    window.alert(`Congrats player ${currentPlayer}! You are the winner!`);
  };

  const handleDraw = () => {
    window.alert("The game ended in a draw");
  };

  const checkForWinner = () => {
    let roundWon = false;

    for (let i = 0; i < WINNING_COMBOS.length; i++) {
      const [a, b, c] = WINNING_COMBOS[i];

      if (
        gameState[a] &&
        gameState[a] === gameState[b] &&
        gameState[b] === gameState[c]
      ) {
        roundWon = true;
        break;
      }
    }

    if (roundWon) {
      setTimeout(() => handleWin(), 500);
      return;
    }

    if (!gameState.includes("")) {
      setTimeout(() => handleDraw(), 500);
    }
  };

  const handleCellClick = (index: number) => {
    if (gameState[index] === "") {
      const newGameState = [...gameState];
      newGameState[index] = currentPlayer;
      setGameState(newGameState);
      changePlayer();
    }
  };

  const changePlayer = () => {
    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
  };

  return (
    <div className="h-full p-8 text-slate-800 bg-gradient-to-r from-cyan-500 to-blue-500 flex flex-col items-center justify-center">
      <h1 className="text-center text-5xl mb-4 font-display text-white">
        Tic Tac Toe Game
      </h1>
      <div className="grid grid-cols-3 gap-3 mx-auto w-96">
        {gameState.map((player, index) => (
          <Square
            key={index}
            index={index}
            onClick={() => handleCellClick(index)}
            player={player}
          />
        ))}
      </div>
      <div className="mt-4 text-white">Score Goes Here</div>
    </div>
  );
};

export default Game;
