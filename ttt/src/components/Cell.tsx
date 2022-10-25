import React from "react";
import "../App.css";

const Cell = ({ onClick, value }: { onClick: () => void; value: string }) => {
  return (
    <button className="square" onClick={onClick}>
      {value}
    </button>
  );
};

export default Cell;
