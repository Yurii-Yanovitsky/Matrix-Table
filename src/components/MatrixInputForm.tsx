import { FormEvent, useCallback, useRef } from "react";
import { Cell, generateMatrix } from "../utils/generateMatrix";
import { parseInputNumValue } from "../utils/parseInputNumValue";

type MatrixInputFormProps = {
  onMatrixCreate: (matrix: Cell[][]) => void;
};

const MatrixInputForm: React.FC<MatrixInputFormProps> = ({
  onMatrixCreate,
}) => {
  const inputMRef = useRef<HTMLInputElement>(null);
  const inputNRef = useRef<HTMLInputElement>(null);

  const handleSubmitMatrix = useCallback(
    (e: FormEvent) => {
      e.preventDefault();

      if (inputMRef.current && inputNRef.current) {
        const m = parseInputNumValue(inputMRef.current.value);
        const n = parseInputNumValue(inputMRef.current.value);
        onMatrixCreate(generateMatrix(m, n));
      }
    },
    [onMatrixCreate]
  );

  return (
    <form className="input-container" onSubmit={handleSubmitMatrix}>
      <label htmlFor="M">M = </label>
      <input
        ref={inputMRef}
        id="M"
        type="number"
        placeholder="0-100"
        min={0}
        max={100}
      />
      <label htmlFor="N">N = </label>
      <input
        ref={inputNRef}
        id="N"
        type="number"
        placeholder="0-100"
        min={0}
        max={100}
      />
      <input type="submit" value="Create Matrix" />
    </form>
  );
};

export default MatrixInputForm;
