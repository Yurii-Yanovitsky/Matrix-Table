import { useCallback, useEffect, useState, useTransition } from "react";
import MatrixTable from "./components/MatrixTable";
import { Cell, generateMatrix } from "./utils/generateMatrix";

import "./App.css";
import MatrixInputForm from "./components/MatrixInputForm";

function App() {
  const [m, setM] = useState(3);
  const [n, setN] = useState(3);
  const [matrix, setMatrix] = useState(new Array<Array<Cell>>());
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setMatrix(generateMatrix(m, n, 10));
  }, [m, n]);

  const handleNChange = useCallback((value: number) => {
    startTransition(() => {
      setN(value);
    });
  }, []);
  const handleMChange = useCallback((value: number) => {
    startTransition(() => {
      setM(value);
    });
  }, []);

  const handleCellClick = useCallback(
    (pointer: { rowIndex: number; columnIndex: number }) => {
      startTransition(() => {
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
      });
    },
    []
  );

  return (
    <div className="container">
      <MatrixInputForm
        m={m}
        n={n}
        onMChange={handleMChange}
        onNChange={handleNChange}
      />
      {isPending ? (
        <div>Pending...</div>
      ) : (
        <div>
          <MatrixTable matrix={matrix} onCellClick={handleCellClick} />
        </div>
      )}
    </div>
  );
}

export default App;
