import { MatrixRow } from "./MatrixRow";
import { useMatrix } from "./MatrixTableContext";

export const MatrixBody = () => {
  const { matrix } = useMatrix();

  return (
    <>
      {matrix.map((cells, rowIndex) => {
        if (cells.length === 0) {
          return <></>;
        }

        return (
          <MatrixRow
            key={cells[0].id}
            rowId={cells[0].id}
            title={`Cell Value M=${rowIndex + 1}`}
            cells={cells}
          />
        );
      })}
    </>
  );
};
