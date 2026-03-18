// DOM display helpers

const resultEl     = document.getElementById('result');
const expressionEl = document.getElementById('expression');

export function updateDisplay(value) {
  resultEl.textContent = value;
  const len = value.toString().length;
  resultEl.className = 'result' + (len > 12 ? ' xsmall' : len > 9 ? ' small' : '');
}

export function setExpression(text) {
  expressionEl.textContent = text;
}

export function highlightOperator(op) {
  document.querySelectorAll('.btn.operator').forEach(b => b.classList.remove('active'));
  if (op) {
    document.querySelectorAll('.btn.operator[data-value]').forEach(b => {
      if (b.dataset.value === op) b.classList.add('active');
    });
  }
}
