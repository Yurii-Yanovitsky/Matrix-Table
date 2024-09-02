import { useMatrix } from "./MatrixTableContext";

export const MatrixHeader = () => {
  const { status, numberOfColumns } = useMatrix();

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${numberOfColumns + 2}, minmax(0, 1fr))`,
      }}
    >
      <div className="header-cell">{status}</div>
      {Array.from({ length: numberOfColumns }).map((_, index) => {
        return (
          <div key={index + 1} className="header-cell">{`Cell Values N=${index + 1}`}</div>
        );
      })}
      <div className="header-cell">Sum values</div>
    </div>
  );
};
