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
import { Cell, generateRow } from "../utils/generateMatrix";

type MatrixTableContextType = {
  matrix: Cell[][];
  status: string;
  numberOfRows: number;
  numberOfColumns: number;
  isCellHighlighted: (cell: Cell) => boolean;
  incrementCell: (rowId: number, cellId: number) => void;
  highlightNearestCells: (cell: Cell) => void;
  resetHighlightedCells: () => void;
  deleteRow: (rowId: number) => void;
  addRow: () => void;
};

const MatrixTableContext = createContext<MatrixTableContextType>({
  matrix: [],
  status: "",
  numberOfRows: 0,
  numberOfColumns: 0,
  isCellHighlighted: () => false,
  incrementCell: () => {},
  highlightNearestCells: () => {},
  resetHighlightedCells: () => {},
  deleteRow: () => {},
  addRow: () => {},
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

  const incrementCell = useCallback((rowId: number, cellId: number) => {
    setMatrix((prevMatrix) => {
      const newMatrix = prevMatrix.map((row) => {
        if (row[0].id === rowId) {
          return row.map((cell) => {
            if (cell.id === cellId) {
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
  }, []);

  const highlightNearestCells = useCallback(
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

  const resetHighlightedCells = useCallback(() => {
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

  const deleteRow = useCallback((rowId: number) => {
    startTransition(() => {
      setMatrix((prevMatrix) =>
        prevMatrix.filter((row) => row[0].id !== rowId)
      );
    });
  }, []);

  const addRow = useCallback(() => {
    startTransition(() => {
      setMatrix((prevMatrix) => {
        const newMatrix = [...prevMatrix];
        const newRow = generateRow(newMatrix[0]?.length ?? 0, 1000);
        newMatrix.push(newRow);
        return newMatrix;
      });
    });
  }, []);

  const value = useMemo(() => {
    return {
      matrix,
      status: isPending ? "Pending..." : "",
      numberOfRows: matrix.length,
      numberOfColumns: matrix[0] ? matrix[0].length : 0,
      isCellHighlighted,
      incrementCell,
      highlightNearestCells,
      resetHighlightedCells,
      deleteRow,
      addRow,
    };
  }, [
    matrix,
    isPending,
    isCellHighlighted,
    incrementCell,
    highlightNearestCells,
    resetHighlightedCells,
    deleteRow,
    addRow,
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
