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
          <MatrixTable matrix={matrix} />
        </div>
      )}
    </div>
  );
}

export default App;
