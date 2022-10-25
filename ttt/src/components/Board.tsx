import { useState } from "react";
import Cell from "./Cell";
import { calculateWinner } from "./calculateWinner";
import "../App.css";
const Board = () => {
  type XorOorEmpty = "X" | "O" | "";

  console.log("rendered");

  const [squares, setSquares] = useState<string[]>(Array(9).fill(""));
  const [winner, setWinner] = useState<string>("");
  const [player, setPlayer] = useState<XorOorEmpty>("X");
  const [isOver, setIsOver] = useState<Boolean>(false);

  const handleClick = (i: number) => {
    if (squares[i] !== "") {
      return;
    }

    if (player === "X") {
      squares[i] = "X";
      setPlayer("O");
    } else if (player === "O") {
      squares[i] = "O";
      setPlayer("X");
    }

    setSquares(squares);
    // draw
    const isSquaresFull = squares.filter((s) => {
      return s === "";
    });
    console.log("isSquaresFull", isSquaresFull);
    if (isSquaresFull.length < 1) {
      setWinner("draw");
      setIsOver(true);
    }
    // anounce winner
    const winr = calculateWinner(squares);
    console.log("winr", winr);
    if (winr !== null) {
      setWinner(`${winr} wins`);
      setPlayer("");
      setIsOver(true);
    }
  };

  const handleCell = (i: number): JSX.Element => {
    return <Cell value={squares[i]} onClick={() => handleClick(i)} />;
  };

  const handleRestart = () => {
    setSquares(Array(9).fill(""));
    setIsOver(false);
    setPlayer("X");
    setWinner("");
  };

  return (
    <div className="board">
      <h2>TIC-TAC-TOE</h2>
      <h2> {winner !== "" && winner} </h2>

      <h3>{player !== "" && `${player} will play next`} </h3>
      {isOver && (
        <button
          className="btn"
          style={{ backgroundColor: "blue", marginBottom: "1rem" }}
          onClick={() => handleRestart()}
        >
          restart
        </button>
      )}
      <div className="board-row">
        {handleCell(0)}
        {handleCell(1)}
        {handleCell(2)}
      </div>
      <div className="board-row">
        {handleCell(3)}
        {handleCell(4)}
        {handleCell(5)}
      </div>
      <div className="board-row">
        {handleCell(6)}
        {handleCell(7)}
        {handleCell(8)}
      </div>
    </div>
  );
};

export default Board;
