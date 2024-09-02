import { useState, useMemo, useCallback } from "react";
import { Cell } from "../utils/generateMatrix";
import { MatrixCell } from "./MatrixCell";
import { useMatrix } from "./MatrixTableContext";

export const MatrixRow = ({
  rowIndex,
  cells,
}: {
  rowIndex: number;
  cells: Cell[];
}) => {
  const {
    handleCellClick,
    handleCellEnter,
    handleCellLeave,
    isCellHighlighted,
  } = useMatrix();

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

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${cells.length + 2}, minmax(0, 1fr))`,
      }}
    >
      <div className="cell">{`Cell Value M=${rowIndex + 1}`}</div>
      {cells.map((cell) => (
        <MatrixCell
          key={cell.id}
          cell={cell}
          percentFactor={percentFactor}
          highlighted={isCellHighlighted(cell)}
          onClick={() => handleCellClick(rowIndex, cell.id)}
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
    </div>
  );
};
