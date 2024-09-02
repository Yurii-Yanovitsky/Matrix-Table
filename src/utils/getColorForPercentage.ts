const color = "#87ceeb";

const hexToRgb = (hex: string) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return [r, g, b];
};

export const getColorForPercentage = (percentage: number) => {
  const lightenColor = (color: string, factor: number) => {
    const [r, g, b] = hexToRgb(color).map((c) => Math.round(c * factor));
    return `rgb(${r}, ${g}, ${b})`;
  };
  const factor = 1 - percentage / 100;
  return lightenColor(color, factor);
};

