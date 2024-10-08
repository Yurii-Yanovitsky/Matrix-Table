let counter = 0;

function generateUniqueId() {
  return ++counter;
}

export type Cell = {
  id: number;
  amount: number;
};

export function generateRow(size: number, range = 1000) {
  const row: Cell[] = [];
  for (let j = 0; j < size; j++) {
    const cell = {
      id: generateUniqueId(),
      amount: Math.floor(Math.random() * range),
    };

    row.push(cell);
  }

  return row;
}

export function generateMatrix(m: number, n: number, range = 1000) {
  const matrix: Cell[][] = [];

  for (let i = 0; i < m; i++) {
    matrix.push(generateRow(n, range));
  }

  return matrix;
}
