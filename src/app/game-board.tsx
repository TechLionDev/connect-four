"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

const Game = require("connect-four");

function GameBoard() {
  const [game, setGame] = useState(new Game());
  const [board, setBoard] = useState<string[][]>([]);
  const [currentPlayer, setCurrentPlayer] = useState<string>("red");
  const [winner, setWinner] = useState<string | null>(null);

  useEffect(() => {
    const initialBoard: string[][] = Array.from({ length: 6 }, () =>
      Array(7).fill(null)
    );
    setBoard(initialBoard);
  }, [game]);

  useEffect(() => {
    const handlePlay = (
      player: string,
      { row, col }: { row: number; col: number }
    ) => {
      setBoard((prevBoard) => {
        const newBoard = prevBoard.map((row) => row.slice());
        newBoard[row][col] = player;
        return newBoard;
      });
    };

    const handleEnd = (winner: string | null) => {
      setWinner(winner);
    };

    game.on("play", handlePlay);
    game.on("end", handleEnd);

    return () => {
      game.off("play", handlePlay);
      game.off("end", handleEnd);
    };
  }, [game]);

  const playMove = (col: number) => {
    if (winner || !game.validMove(col)) return;

    game.play(currentPlayer, col);
    setCurrentPlayer((prevPlayer) => (prevPlayer === "red" ? "green" : "red"));
  };

  return (
    <div className='flex flex-col items-center'>
      <h1 className='text-2xl font-bold my-4'>Connect Four</h1>
      {winner ? (
        <h2 className='text-xl text-red-500 mb-4'>{winner} wins!</h2>
      ) : (
        <h2 className='text-xl mb-4'>Current Player: {currentPlayer}</h2>
      )}
      <div
        className='grid gap-1 bg-blue-500 p-2 rounded-md'
        style={{
          gridTemplateColumns: `repeat(${7}, 50px)`,
          gridAutoFlow: "dense"
        }}
      >
        {board
          .slice()
          .reverse()
          .map((row, rowIndex) =>
            row.map((cell, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                onClick={() => playMove(colIndex)}
                className={`w-12 h-12 flex items-center justify-center border-2 rounded-full ${
                  cell
                    ? cell === "red"
                      ? "bg-red-500"
                      : "bg-green-500"
                    : "bg-secondary"
                } cursor-pointer`}
              >
                {/* {cell} */}
              </div>
            ))
          )}
      </div>
      <Button
        className='mt-4'
        onClick={() => {
          setGame(new Game());
          setWinner(null);
          setCurrentPlayer("red");
        }}
      >
        Reset Game
      </Button>
    </div>
  );
}

export default GameBoard;
