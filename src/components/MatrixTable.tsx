import { Cell } from "../utils/generateMatrix";
import { MatrixTableProvider } from "./MatrixTableContext";
import { MatrixFooter } from "./MatrixFooter";
import { MatrixHeader } from "./MatrixHeader";
import { MatrixBody } from "./MatrixBody";

const MatrixTable = ({
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
      <div className="table-container">
        <MatrixHeader />
        <MatrixBody />
        <MatrixFooter />
      </div>
    </MatrixTableProvider>
  );
};

export default MatrixTable;
