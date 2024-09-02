import {
  createContext,
  FC,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  useTransition,
} from "react";
import { Cell } from "../utils/generateMatrix";

type MatrixTableContextType = {
  matrix: Cell[][];
  status: string;
  numberOfRows: number;
  numberOfColumns: number;
  isCellHighlighted: (cell: Cell) => boolean;
  handleCellClick: (rowIndex: number, cell: Cell) => void;
  handleCellEnter: (cell: Cell) => void;
  handleCellLeave: () => void;
};

const MatrixTableContext = createContext<MatrixTableContextType>({
  matrix: [],
  status: "",
  numberOfRows: 0,
  numberOfColumns: 0,
  isCellHighlighted: () => false,
  handleCellClick: () => {},
  handleCellEnter: () => {},
  handleCellLeave: () => {},
});

export const MatrixTableProvider: FC<
  PropsWithChildren<{ initMatrix: Cell[][]; highlightedAmount: number }>
> = ({ children, initMatrix, highlightedAmount }) => {
  const [matrix, setMatrix] = useState(initMatrix);
  const [highlightedCellsSet, setHighlightedCellsSet] = useState(
    new Set<number>()
  );

  useEffect(() => {
    setMatrix(initMatrix);
  }, [initMatrix]);

  const [isPending, startTransition] = useTransition();

  const handleCellClick = useCallback(
    (rowIndex: number, incrementedCell: Cell) => {
      setMatrix((prevMatrix) => {
        const newMatrix = prevMatrix.map((row, rIndex) => {
          if (rIndex === rowIndex) {
            return row.map((cell) => {
              if (cell.id === incrementedCell.id) {
                return {
                  ...cell,
                  amount: cell.amount + 1,
                };
              }

              return cell;
            });
          }

          return row;
        });
        return newMatrix;
      });
    },
    []
  );

  const handleCellEnter = useCallback(
    (cell: Cell) => {
      startTransition(() => {
        const nearestCells = matrix
          .flat()
          .sort(
            (a, b) =>
              Math.abs(a.amount - cell.amount) -
              Math.abs(b.amount - cell.amount)
          )
          .filter((c) => c.id !== cell.id)
          .slice(0, highlightedAmount);

        setHighlightedCellsSet(new Set(nearestCells.map((cell) => cell.id)));
      });
    },
    [matrix, highlightedAmount]
  );

  const handleCellLeave = useCallback(() => {
    startTransition(() => {
      setHighlightedCellsSet(new Set());
    });
  }, []);

  const isCellHighlighted = useCallback(
    (cell: Cell) => {
      return highlightedCellsSet.has(cell.id);
    },
    [highlightedCellsSet]
  );

  const value = useMemo(() => {
    return {
      matrix,
      status: isPending ? "Pending..." : "",
      numberOfRows: matrix.length,
      numberOfColumns: matrix[0] ? matrix[0].length : 0,
      isCellHighlighted,
      handleCellClick,
      handleCellEnter,
      handleCellLeave,
    };
  }, [
    matrix,
    isPending,
    isCellHighlighted,
    handleCellClick,
    handleCellEnter,
    handleCellLeave,
  ]);

  return (
    <MatrixTableContext.Provider value={value}>
      {children}
    </MatrixTableContext.Provider>
  );
};

export const useMatrix = () => {
  return useContext(MatrixTableContext);
};
