import { useCallback, useEffect, useState, useTransition } from "react";
import MatrixTable from "./components/MatrixTable";
import { Cell, generateMatrix } from "./utils/generateMatrix";

import "./App.css";
import MatrixInputForm from "./components/MatrixInputForm";
import MatrixTable1 from "./components/MatrixTable1";

function App() {
  const [m, setM] = useState(100);
  const [n, setN] = useState(100);
  const [x, setX] = useState(0);
  const [matrix, setMatrix] = useState(new Array<Array<Cell>>());
  const [highlightedCellsSet, setHighlightedCellsSet] = useState(
    new Set<number>()
  );
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    startTransition(() => {
      setX(20);
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
      <MatrixTable1 matrix={matrix} highlightedAmount={x} />
    </div>
  );
}

export default App;
