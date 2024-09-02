import { useMemo } from "react";
import { useCallback, useState } from "react";
import { Cell } from "../utils/generateMatrix";
import { getColorForPercentage } from "../utils/getColorForPercentage";

const MatrixRow = ({
  row,
  rowIndex,
  highlightedCellsSet,
  onCellEnter,
  onCellLeave,
  onCellClick,
}: {
  row: Cell[];
  rowIndex: number;
  highlightedCellsSet: Set<number>;
  onCellEnter: (cell: Cell) => void;
  onCellLeave: () => void;
  onCellClick: (pointer: { rowIndex: number; columnIndex: number }) => void;
}) => {
  const [percentFactor, setPercentFactor] = useState<number | null>(null);

  const rowSum = useMemo(
    () => row.reduce((accumulator, curr) => accumulator + curr.amount, 0),
    [row]
  );

  const handleSumCellEntered = useCallback(() => {
    setPercentFactor(100 / rowSum);
  }, [rowSum]);

  const handleSumCellLeave = useCallback(() => {
    setPercentFactor(null);
  }, []);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${row.length + 2}, minmax(0, 1fr))`,
      }}
    >
      <div className="cell">{`Cell Value M=${rowIndex + 1}`}</div>
      {row.map((cell, columnIndex) => {
        const isHighlighted = highlightedCellsSet.has(cell.id);
        const backgroundColor = percentFactor
          ? getColorForPercentage(percentFactor * cell.amount)
          : "";
        const value = percentFactor
          ? `${Math.round(cell.amount * percentFactor)}%`
          : cell.amount;

        return (
          <div
            key={cell.id}
            style={{
              backgroundColor,
            }}
            className={isHighlighted ? "cell highlighted-cell" : "cell"}
            onClick={() => onCellClick({ rowIndex, columnIndex })}
            onMouseOver={() => onCellEnter(cell)}
            onMouseLeave={() => onCellLeave()}
          >
            {value}
          </div>
        );
      })}
      <div
        className="sum-cell"
        onMouseOver={handleSumCellEntered}
        onMouseLeave={handleSumCellLeave}
      >
        {rowSum}
      </div>
    </div>
  );
};

const MatrixHeader = ({
  status,
  numberOfColumns,
}: {
  status: string;
  numberOfColumns: number;
}) => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${numberOfColumns + 2}, minmax(0, 1fr))`,
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
    </div>
  );
};

const MatrixFooter = ({
  matrix,
  numberOfColumns,
  numberOfRows,
}: {
  matrix: Cell[][];
  numberOfColumns: number;
  numberOfRows: number;
}) => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${numberOfColumns + 2}, minmax(0, 1fr))`,
      }}
    >
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
        gridTemplateRows: `repeat(${numberOfRows + 1}, minmax(0, 1fr))`,
      }}
    >
      <MatrixHeader status={status} numberOfColumns={numberOfColumns} />
      {matrix.map((row, rowIndex) => (
        <MatrixRow
          key={rowIndex}
          row={row}
          rowIndex={rowIndex}
          highlightedCellsSet={highlightedCellsSet}
          onCellClick={onCellClick}
          onCellEnter={onCellEnter}
          onCellLeave={onCellLeave}
        />
      ))}
      <MatrixFooter
        matrix={matrix}
        numberOfColumns={numberOfColumns}
        numberOfRows={numberOfRows}
      />
    </div>
  );
};

export default MatrixTable;
