import { useState, useMemo, useCallback } from "react";
import { Cell } from "../utils/generateMatrix";
import { MatrixCell } from "./MatrixCell";
import { useMatrix } from "./MatrixTableContext";

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
    handleCellClick,
    handleCellEnter,
    handleCellLeave,
    isCellHighlighted,
    handleDeleteRow,
  } = useMatrix();
  const [isEntered, setIsEntered] = useState(false);
  const [percentFactor, setPercentFactor] = useState<number | null>(null);
  const rowSum = useMemo(
    () => cells.reduce((accumulator, curr) => accumulator + curr.amount, 0),
    [cells]
  );

  const handleSumCellEntered = useCallback(() => {
    setPercentFactor(100 / rowSum);
  }, [rowSum]);

  const handleSumCellLeave = useCallback(() => {
    setPercentFactor(null);
  }, []);

  const handleRowEnter = useCallback(() => {
    setIsEntered(true);
  }, []);

  const handleRowLeave = useCallback(() => {
    setIsEntered(false);
  }, []);

  return (
    <div
      onMouseEnter={handleRowEnter}
      onMouseLeave={handleRowLeave}
      className="row"
      style={{
        gridTemplateColumns: `repeat(${cells.length + 2}, minmax(0, 1fr))`,
      }}
    >
      <div className="cell">{title}</div>
      {cells.map((cell) => (
        <MatrixCell
          key={cell.id}
          cell={cell}
          percentFactor={percentFactor}
          highlighted={isCellHighlighted(cell)}
          onClick={() => handleCellClick(rowId, cell.id)}
          onMouseEnter={() => handleCellEnter(cell)}
          onMouseLeave={() => handleCellLeave()}
        />
      ))}
      <div
        className="sum-cell"
        onMouseOver={handleSumCellEntered}
        onMouseLeave={handleSumCellLeave}
      >
        {rowSum}
      </div>
      {isEntered && (
        <button
          className="delete-button"
          onClick={() => handleDeleteRow(rowId)}
        >
          X
        </button>
      )}
    </div>
  );
};
