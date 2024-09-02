type MatrixInputFormProps = {
  m: number;
  n: number;
  x: number;
  onMChange: (value: number) => void;
  onNChange: (value: number) => void;
  onXChange: (value: number) => void;
};

const parseInputValue = (inputValue: string, maxLimit = 100) => {
  const value = parseInt(inputValue) || 0;
  return value <= maxLimit ? value : maxLimit;
};

const MatrixInputForm: React.FC<MatrixInputFormProps> = ({
  m,
  n,
  x,
  onMChange,
  onNChange,
  onXChange,
}) => {
  return (
    <div className="input-container">
      <label htmlFor="M">M = </label>
      <input
        id="M"
        type="number"
        placeholder="M"
        min={0}
        max={100}
        value={m}
        onChange={(e) => onMChange(parseInputValue(e.target.value))}
      />
      <label htmlFor="N">N = </label>
      <input
        id="N"
        type="number"
        placeholder="N"
        min={0}
        max={100}
        value={n}
        onChange={(e) => onNChange(parseInputValue(e.target.value))}
      />
      <label htmlFor="X">X = </label>
      <input
        id="X"
        type="number"
        placeholder="X"
        min={0}
        max={n * m}
        value={x}
        onChange={(e) => onXChange(parseInputValue(e.target.value, n * m))}
      />
    </div>
  );
};

export default MatrixInputForm;
