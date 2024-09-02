import { useCallback, useEffect, useState, useTransition } from "react";
import MatrixTable from "./components/MatrixTable";
import { Cell, generateMatrix } from "./utils/generateMatrix";

import "./App.css";
import MatrixInputForm from "./components/MatrixInputForm";

function App() {
  const [m, setM] = useState(3);
  const [n, setN] = useState(3);
  const [x, setX] = useState(0);
  const [matrix, setMatrix] = useState(new Array<Array<Cell>>());
  const [highlightedCellsSet, setHighlightedCellsSet] = useState(
    new Set<number>()
  );
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    startTransition(() => {
      setX(0);
      setMatrix(generateMatrix(m, n, 999));
    });
  }, [m, n]);

  const handleNChange = useCallback((value: number) => {
    setN(value);
  }, []);
  const handleMChange = useCallback((value: number) => {
    setM(value);
  }, []);

  const handleXChange = useCallback((value: number) => {
    setX(value);
  }, []);

  const handleCellClick = useCallback(
    (pointer: { rowIndex: number; columnIndex: number }) => {
      setMatrix((prevMatrix) => {
        const newMatrix = prevMatrix.map((row, rIndex) =>
          rIndex === pointer.rowIndex
            ? row.map((cell, cIndex) =>
                cIndex === pointer.columnIndex
                  ? { ...cell, amount: cell.amount + 1 }
                  : cell
              )
            : row
        );
        return newMatrix;
      });
    },
    []
  );

  const handleCellEnter = useCallback(
    (cell: Cell) => {
      startTransition(() => {
        const nearestCells = matrix
          .flat()
          .sort(
            (a, b) =>
              Math.abs(a.amount - cell.amount) -
              Math.abs(b.amount - cell.amount)
          )
          .filter((c) => c.id !== cell.id)
          .slice(0, x);

        setHighlightedCellsSet(new Set(nearestCells.map((cell) => cell.id)));
      });
    },
    [matrix, x]
  );

  const handleCellLeave = useCallback(() => {
    setHighlightedCellsSet(new Set());
  }, []);

  return (
    <div className="container">
      <MatrixInputForm
        m={m}
        n={n}
        x={x}
        onMChange={handleMChange}
        onNChange={handleNChange}
        onXChange={handleXChange}
      />
      <MatrixTable
        status={isPending ? "Pending..." : ""}
        matrix={matrix}
        highlightedCellsSet={highlightedCellsSet}
        onCellEnter={handleCellEnter}
        onCellLeave={handleCellLeave}
        onCellClick={handleCellClick}
      />
    </div>
  );
}

export default App;
