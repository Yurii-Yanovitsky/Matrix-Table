import { Fragment } from "react";
import { Cell } from "../utils/generateMatrix";

const MatrixTable = ({
  matrix,
  highlightedCellsSet,
  status,
  onCellClick,
  onCellEnter,
  onCellLeave,
}: {
  matrix: Cell[][];
  highlightedCellsSet: Set<number>;
  status: string;
  onCellEnter: (cell: Cell) => void;
  onCellLeave: () => void;
  onCellClick: (pointer: { rowIndex: number; columnIndex: number }) => void;
}) => {
  const numberOfRows = matrix.length;
  const numberOfColumns = matrix[0] ? matrix[0].length : 0;

  return (
    <div
      className="grid-table"
      style={{
        gridTemplateColumns: `repeat(${numberOfColumns + 2}, minmax(0, 1fr))`,
        gridTemplateRows: `repeat(${numberOfRows + 1}, minmax(0, 1fr))`,
      }}
    >
      <div className="header-cell">{status}</div>
      {Array.from({ length: numberOfColumns }).map((_, index) => {
        return (
          <div key={index + 1} className="header-cell">{`Cell Values N=${
            index + 1
          }`}</div>
        );
      })}
      <div className="header-cell">Sum values</div>
      {matrix.map((row, rowIndex) => {
        const rowSum = row.reduce(
          (accumulator, curr) => accumulator + curr.amount,
          0
        );

        return (
          <Fragment key={rowIndex + 1}>
            <div className="cell">{`Cell Value M=${rowIndex + 1}`}</div>
            {row.map((cell, columnIndex) => {
              const isHighlighted = highlightedCellsSet.has(cell.id);

              return (
                <div
                  key={cell.id}
                  className={isHighlighted ? "cell highlighted-cell" : "cell"}
                  onClick={() => onCellClick({ rowIndex, columnIndex })}
                  onMouseOver={() => onCellEnter(cell)}
                  onMouseLeave={() => onCellLeave()}
                >
                  {cell.amount}
                </div>
              );
            })}
            <div className="cell">{rowSum}</div>
          </Fragment>
        );
      })}
      <div className="cell">Average values</div>
      {Array.from({ length: numberOfColumns }).map((_, columnIndex) => {
        const columnSum = matrix.reduce(
          (accumulator, curr) => accumulator + curr[columnIndex].amount,
          0
        );
        const average = Math.round((columnSum / numberOfRows) * 10) / 10;

        return (
          <div key={columnIndex + 1} className="cell">
            {average}
          </div>
        );
      })}
      <div className="cell"></div>
    </div>
  );
};

export default MatrixTable;
