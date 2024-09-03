export const MatrixCell = ({
  value,
  backgroundColor,
  highlighted,
  onClick,
  onMouseEnter,
  onMouseLeave,
}: {
  value: string;
  backgroundColor: string;
  highlighted: boolean;
  onClick: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}) => {
  return (
    <div
      style={{
        backgroundColor,
      }}
      className={highlighted ? "table-cell highlighted-cell" : "table-cell"}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {value}
    </div>
  );
};
