import { useState } from "react";
import MatrixInputForm from "./components/MatrixInputForm";
import MatrixTable from "./components/MatrixTable";
import { Cell } from "./utils/generateMatrix";

import "./App.css";

function App() {
  const [matrix, setMatrix] = useState<Cell[][] | null>(null);

  return (
    <div className="container">
      {matrix ? (
        <MatrixTable matrix={matrix} />
      ) : (
        <MatrixInputForm onMatrixCreate={(value) => setMatrix(value)} />
      )}
    </div>
  );
}

export default App;
