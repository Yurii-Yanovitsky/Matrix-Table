import React from "react";
import { Cell } from "../utils/generateMatrix";

const MatrixTable = ({ matrix }: { matrix: Cell[][] }) => {
  const numberOfRows = matrix.length;
  const numberOfColumns = matrix[0] ? matrix[0].length : 0;

  return (
    <div
      className="grid-table"
      style={{
        gridTemplateColumns: `repeat(${numberOfColumns + 1}, minmax(0, 1fr))`,
        gridTemplateRows: `repeat(${numberOfRows + 1}, minmax(0, 1fr))`,
      }}
    >
      <div className="header-cell"></div>
      {Array.from({ length: numberOfColumns }).map((_, index) => {
        return (
          <div key={index + 1} className="header-cell">{`Cell Values N=${
            index + 1
          }`}</div>
        );
      })}
      {matrix.map((row, rowIndex) => {
        return (
          <React.Fragment key={rowIndex + 1}>
            <div className="cell">{`Cell Value M=${rowIndex + 1}`}</div>
            {row.map((cell) => {
              return (
                <div key={cell.id} data-key={cell.id} className="cell">
                  {cell.amount}
                </div>
              );
            })}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default MatrixTable;
