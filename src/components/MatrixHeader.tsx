import { parseInputNumValue } from "../utils/parseInputNumValue";
import { useMatrix } from "./MatrixTableContext";

export const MatrixHeader = () => {
  const {
    status,
    numberOfRows,
    numberOfColumns,
    addRow,
    setHighlightCellsAmount,
  } = useMatrix();

  const maxAmount = numberOfColumns * numberOfRows;

  return (
    <>
      <div className="header-controlls">
        <div>
          <label htmlFor="X">Highlight nearest cells</label>
          <input
            id="X"
            type="number"
            placeholder={`0-${maxAmount}`}
            min={0}
            max={maxAmount}
            onChange={(e) =>
              setHighlightCellsAmount(
                parseInputNumValue(e.target.value, maxAmount)
              )
            }
          />
        </div>
        <div>
          <button className="row-add-button" onClick={() => addRow()}>
            Add Row
          </button>
        </div>
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
