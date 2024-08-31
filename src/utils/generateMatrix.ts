let counter = 0;

function generateUniqueId() {
  return ++counter;
}

export type Cell = {
  id: number;
  amount: number;
};

export function generateMatrix(m: number, n: number, range: number) {
  const matrix: Cell[][] = [];

  for (let i = 0; i < m; i++) {
    const row: Cell[] = [];
    for (let j = 0; j < n; j++) {
      const cell = {
        id: generateUniqueId(),
        amount: Math.floor(Math.random() * range),
      };

      row.push(cell);
    }

    matrix.push(row);
  }

  return matrix;
}
