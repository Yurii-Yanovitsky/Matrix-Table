import { useState, useMemo, useCallback } from "react";
import { Cell } from "../utils/generateMatrix";
import { MatrixCell } from "./MatrixCell";
import { useMatrix } from "./MatrixTableContext";
import { getColorForPercentage } from "../utils/getColorForPercentage";

const getCellBgColor = (cellAmount: number, percentFactor: number | null) => {
  return percentFactor ? getColorForPercentage(cellAmount * percentFactor) : "";
};

const getCellValue = (cellAmount: number, percentFactor: number | null) => {
  return percentFactor
    ? `${Math.round(cellAmount * percentFactor)}%`
    : `${cellAmount}`;
};

export const MatrixRow = ({
  cells,
  rowId,
  title,
}: {
  cells: Cell[];
  rowId: number;
  title: string;
}) => {
  const {
    incrementCell,
    highlightNearestCells,
    resetHighlightedCells,
    isCellHighlighted,
    deleteRow,
  } = useMatrix();
  const [isEntered, setIsEntered] = useState(false);
  const [percentFactor, setPercentFactor] = useState<number | null>(null);
  const rowSum = useMemo(
    () => cells.reduce((accumulator, curr) => accumulator + curr.amount, 0),
    [cells]
  );

  return (
    <div
      onMouseEnter={() => setIsEntered(true)}
      onMouseLeave={() => setIsEntered(false)}
      className="table-row"
      style={{
        gridTemplateColumns: `repeat(${cells.length + 2}, minmax(0, 1fr))`,
      }}
    >
      <div className="table-cell">{title}</div>
      {cells.map((cell) => (
        <MatrixCell
          key={cell.id}
          value={getCellValue(cell.amount, percentFactor)}
          backgroundColor={getCellBgColor(cell.amount, percentFactor)}
          highlighted={isCellHighlighted(cell)}
          onClick={() => incrementCell(rowId, cell.id)}
          onMouseEnter={() => highlightNearestCells(cell)}
          onMouseLeave={() => resetHighlightedCells()}
        />
      ))}
      <div
        className="sum-cell"
        onMouseEnter={() => setPercentFactor(100 / rowSum)}
        onMouseLeave={() => setPercentFactor(null)}
      >
        {rowSum}
      </div>
      {isEntered && (
        <button className="row-delete-button" onClick={() => deleteRow(rowId)}>
          X
        </button>
      )}
    </div>
  );
};
