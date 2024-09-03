export function parseInputNumValue(inputValue: string, maxLimit = 100) {
  const value = parseInt(inputValue) || 0;
  return value <= maxLimit ? value : maxLimit;
}
