import { Cell } from "../utils/generateMatrix";
import { MatrixTableProvider } from "./MatrixTableContext";
import { MatrixFooter } from "./MatrixFooter";
import { MatrixHeader } from "./MatrixHeader";
import { MatrixBody } from "./MatrixBody";

const MatrixTable = ({ matrix }: { matrix: Cell[][] }) => {
  return (
    <MatrixTableProvider initMatrix={matrix}>
      <div className="table-container">
        <MatrixHeader />
        <MatrixBody />
        <MatrixFooter />
      </div>
    </MatrixTableProvider>
  );
};

export default MatrixTable;
