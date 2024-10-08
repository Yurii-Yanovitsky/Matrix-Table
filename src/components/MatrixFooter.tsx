import { useMatrix } from "./MatrixTableContext";

export const MatrixFooter = () => {
  const { matrix, numberOfColumns, numberOfRows } = useMatrix();

  return (
    <div
      className="table-footer"
      style={{
        gridTemplateColumns: `repeat(${numberOfColumns + 2}, minmax(0, 1fr))`,
      }}
    >
      <div className="table-cell">Average values</div>
      {Array.from({ length: numberOfColumns }).map((_, columnIndex) => {
        const columnSum = matrix.reduce(
          (accumulator, curr) => accumulator + curr[columnIndex].amount,
          0
        );
        const average = Math.round((columnSum / numberOfRows) * 10) / 10;

        return (
          <div key={columnIndex + 1} className="table-cell">
            {average}
          </div>
        );
      })}
      <div className="table-cell"></div>
    </div>
  );
};
