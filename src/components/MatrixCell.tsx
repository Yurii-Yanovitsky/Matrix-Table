import { Cell } from "../utils/generateMatrix";
import { getColorForPercentage } from "../utils/getColorForPercentage";

export const MatrixCell = ({
  cell,
  percentFactor,
  highlighted,
  onClick,
  onMouseEnter,
  onMouseLeave,
}: {
  cell: Cell;
  percentFactor: number | null;
  highlighted: boolean;
  onClick: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}) => {
  let backgroundColor = "";
  let value = `${cell.amount}`;

  if (percentFactor) {
    backgroundColor = getColorForPercentage(cell.amount * percentFactor);
    value = `${Math.round(cell.amount * percentFactor)}%`;
  }

  return (
    <div
      key={cell.id}
      style={{
        backgroundColor,
      }}
      className={highlighted ? "cell highlighted-cell" : "cell"}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {value}
    </div>
  );
};
