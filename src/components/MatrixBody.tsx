import { MatrixRow } from "./MatrixRow";
import { useMatrix } from "./MatrixTableContext";

export const MatrixBody = () => {
  const { matrix } = useMatrix();

  return (
    <>
      {matrix.map((cells, rowIndex) => (
        <MatrixRow key={rowIndex} rowIndex={rowIndex} cells={cells} />
      ))}
    </>
  );
};
