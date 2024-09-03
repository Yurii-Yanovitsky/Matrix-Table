import { MatrixRow } from "./MatrixRow";
import { useMatrix } from "./MatrixTableContext";

export const MatrixBody = () => {
  const { matrix } = useMatrix();

  return (
    <>
      {matrix.map((cells, rowIndex) => (
        <MatrixRow
          key={cells[0].id}
          rowId={cells[0].id}
          title={`Cell Value M=${rowIndex + 1}`}
          cells={cells}
        />
      ))}
    </>
  );
};
