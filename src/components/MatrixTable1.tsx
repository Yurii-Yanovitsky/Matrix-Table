import { Cell } from "../utils/generateMatrix";
import { MatrixTableProvider, useMatrix } from "./MatrixTableContext";
import { MatrixFooter } from "./MatrixFooter";
import { MatrixHeader } from "./MatrixHeader";
import { MatrixRow } from "./MatrixRow";

const MatrixBody = () => {
  const { matrix } = useMatrix();

  return (
    <>
      {matrix.map((cells, rowIndex) => (
        <MatrixRow key={rowIndex} rowIndex={rowIndex} cells={cells} />
      ))}
    </>
  );
};

const MatrixTable1 = ({
  matrix,
  highlightedAmount,
}: {
  matrix: Cell[][];
  highlightedAmount: number;
}) => {
  return (
    <MatrixTableProvider
      initMatrix={matrix}
      highlightedAmount={highlightedAmount}
    >
      <div className="grid-table">
        <MatrixHeader />
        <MatrixBody />
        <MatrixFooter />
      </div>
    </MatrixTableProvider>
  );
};

export default MatrixTable1;
