import { useCallback } from "react";
import { useMatrix } from "./MatrixTableContext";

export const MatrixHeader = () => {
  const { status, numberOfColumns, addRow } = useMatrix();

  const handleAddRow = useCallback(() => {
    addRow();
  }, [addRow]);

  return (
    <>
      <div className="row-add-button">
        <button onClick={handleAddRow}>Add Row</button>
      </div>
      <div
        className="table-header"
        style={{
          gridTemplateColumns: `repeat(${numberOfColumns + 2}, minmax(0, 1fr))`,
        }}
      >
        <div className="table-cell">{status}</div>
        {Array.from({ length: numberOfColumns }).map((_, index) => {
          return (
            <div key={index + 1} className="table-cell">{`Cell Values N=${
              index + 1
            }`}</div>
          );
        })}
        <div className="table-cell">Sum values</div>
      </div>
    </>
  );
};
