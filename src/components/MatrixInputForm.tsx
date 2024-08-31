type MatrixInputFormProps = {
  m: number;
  n: number;
  onMChange: (value: number) => void;
  onNChange: (value: number) => void;
};

const MatrixInputForm: React.FC<MatrixInputFormProps> = ({
  m,
  n,
  onMChange,
  onNChange,
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
        onChange={(e) => onMChange(parseInt(e.target.value) || 0)}
      />
      <label htmlFor="N">N = </label>
      <input
        id="N"
        type="number"
        placeholder="N"
        min={0}
        max={100}
        value={n}
        onChange={(e) => onNChange(parseInt(e.target.value) || 0)}
      />
    </div>
  );
};

export default MatrixInputForm;
