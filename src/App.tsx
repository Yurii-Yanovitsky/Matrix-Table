import { useState } from "react";
import MatrixTable from "./components/MatrixTable";
import { generateMatrix } from "./utils/generateMatrix";

import "./App.css";

function App() {
  const [matrix] = useState(generateMatrix(10, 10, 1000));

  return (
    <div className="container">
      <MatrixTable matrix={matrix} />
    </div>
  );
}

export default App;
