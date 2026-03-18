// Pure math operations and number formatting

export function calculate(a, op, b) {
  a = parseFloat(a);
  b = parseFloat(b);
  switch (op) {
    case '+': return a + b;
    case '-': return a - b;
    case '*': return a * b;
    case '/': return b === 0 ? 'Error' : a / b;
  }
}

export function formatNumber(n) {
  if (n === 'Error') return 'Error';
  return parseFloat(parseFloat(n).toPrecision(12)).toString();
}

export function displayOp(op) {
  return { '+': '+', '-': '−', '*': '×', '/': '÷' }[op] || op;
}
