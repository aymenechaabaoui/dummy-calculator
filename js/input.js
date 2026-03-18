// State management and button event handling
import { calculate, formatNumber, displayOp } from './calc.js';
import { updateDisplay, setExpression, highlightOperator } from './display.js';

let current     = '0';
let previous    = null;
let operator    = null;
let freshResult = false;

document.querySelector('.buttons').addEventListener('click', e => {
  const btn = e.target.closest('.btn');
  if (!btn) return;

  const action = btn.dataset.action;
  const value  = btn.dataset.value;

  switch (action) {

    case 'digit':
      if (freshResult) { current = value; freshResult = false; }
      else current = current === '0' ? value : current + value;
      updateDisplay(current);
      break;

    case 'dot':
      if (freshResult) { current = '0.'; freshResult = false; }
      else if (!current.includes('.')) current += '.';
      updateDisplay(current);
      break;

    case 'operator':
      highlightOperator(value);
      if (operator && !freshResult) {
        const res = calculate(previous, operator, current);
        const fmt = formatNumber(res);
        setExpression(fmt + ' ' + displayOp(value));
        updateDisplay(fmt);
        previous = fmt;
      } else {
        previous = current;
        setExpression(current + ' ' + displayOp(value));
      }
      operator    = value;
      freshResult = true;
      break;

    case 'equals':
      if (operator && previous !== null) {
        const res = calculate(previous, operator, current);
        const fmt = formatNumber(res);
        setExpression(previous + ' ' + displayOp(operator) + ' ' + current + ' =');
        updateDisplay(fmt);
        current     = fmt;
        previous    = null;
        operator    = null;
        freshResult = true;
        highlightOperator(null);
      }
      break;

    case 'clear':
      current     = '0';
      previous    = null;
      operator    = null;
      freshResult = false;
      setExpression('');
      updateDisplay('0');
      highlightOperator(null);
      break;

    case 'sign':
      current = formatNumber(parseFloat(current) * -1);
      updateDisplay(current);
      break;

    case 'percent':
      current = formatNumber(parseFloat(current) / 100);
      updateDisplay(current);
      break;
  }
});

updateDisplay('0');