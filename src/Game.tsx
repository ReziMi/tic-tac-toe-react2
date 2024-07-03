import React, { useState, useEffect } from "react";
import Square from "./Square";

type Player = "X" | "O";
type Scores = { [key in Player]: number };

const INITIAL_GAME_STATE: string[] = ["", "", "", "", "", "", "", "", ""];
const INITIAL_SCORES: Scores = { X: 0, O: 0 };
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
  const [gameState, setGameState] = useState(INITIAL_GAME_STATE);
  const [currentPlayer, setCurrentPlayer] = useState<Player>("X");
  const [scores, setScores] = useState<Scores>(INITIAL_SCORES);

  useEffect(() => {
    const storedScores = localStorage.getItem("scores");
    if (storedScores) {
      setScores(JSON.parse(storedScores));
    }
  }, []);

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
      handleWin(currentPlayer);
      return;
    }

    if (!gameState.includes("")) {
      handleDraw();
    }
  };

  useEffect(() => {
    checkForWinner();
  }, [gameState]);

  const handleWin = (winner: Player) => {
    window.alert(`Congrats player ${winner}! You are the winner!`);

    const newPlayerScore = scores[winner] + 1;
    const newScores = { ...scores };
    newScores[winner] = newPlayerScore;
    setScores(newScores);

    localStorage.setItem("scores", JSON.stringify(newScores));

    resetBoard();
  };

  const handleDraw = () => {
    window.alert("The game ended in a draw");
    resetBoard();
  };

  const resetBoard = () => setGameState(INITIAL_GAME_STATE);

  const handleCellClick = (index: number) => {
    if (gameState[index] === "") {
      const newGameState = [...gameState];
      newGameState[index] = currentPlayer;
      setGameState(newGameState);

      const nextPlayer = currentPlayer === "X" ? "O" : "X";
      setCurrentPlayer(nextPlayer);
    }
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

      <div className="mx-auto w-96 text-2xl text-serif">
        <p className="text-white mt-5">
          Next Player: <span>{currentPlayer}</span>
        </p>
        <p>
          Player X wins: <span>{scores["X"]}</span>
        </p>
        <p>
          Player O wins: <span>{scores["O"]}</span>
        </p>
      </div>
    </div>
  );
};

export default Game;
