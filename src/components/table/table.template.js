import { defaultStyles } from '@/constants';
import { parse } from '@core/parse';
import { toInlineStyles } from '@core/utils';

const CODES = {
  A: 65,
  Z: 90,
};

const DEFAULT_WIDTH = 120;
const DEFAULT_HEIGHT = 24;

function getWidth(state = {}, index) {
  return (state[index] || DEFAULT_WIDTH) + 'px';
}

function getHeight(state = {}, index) {
  return (state[index] || DEFAULT_HEIGHT) + 'px';
}

// function toCell(row, col) {
//   return `
//   <div contenteditable class="cell" data-row="${row}" data-col="${toChar(null, col)}">
//   </div>`;
// }

function toCell(state, row) {
  return function(_, col) {
    const id = `${row}:${col}`;

    const width = getWidth(state.colState, col);

    const data = state.dataState[id];

    const styles = toInlineStyles({
      ...defaultStyles,
      ...state.stylesState[id],
    });

    return `
    <div 
    contenteditable 
    class="cell" 
    data-id="${id}"
    data-value="${data || ''}"
    data-type="cell" 
    data-col="${col}"
    style="${styles}; width: ${width}"
    >${parse(data) || ''}</div>`;
  };
}

function toColumn({ col, index, width }) {
  return `
  <div class="column" data-type="resizable" data-col="${index}" style="width: ${width}">
    ${col}
    <div class="col-resize"  data-resize="col"></div>
  </div>`;
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index);
}

function widthFromState(state) {
  return function(col, index) {
    return {
      col, index, width: getWidth(state, index),
    };
  };
}

function createCol(colsCount, state, row = null) {
  let col = new Array(colsCount).fill('');

  if (row === null) {
    col = col
    .map(toChar)
    .map(widthFromState(state.colState))
    .map(toColumn);
  } else col = col.map(toCell(state, row));

  return col.join('');
}

function createRow(index, content, state) {
  const resize = index
    ? '<div data-resize="row" class="row-resize"></div>'
    : '';

  const height = getHeight(state, index);

  return `
    <div 
    class="row" ${index ? 'data-type="resizable"' : ''} 
    data-row="${index}"
    style = "height: ${height}"
    > <div class="row-info">
        ${index ? index : ''}
        ${resize}
      </div>
      <div class="row-data">${content}</div> 
    </div>
  `;
}


export function createTable(rowsCount = 15, state = {}) {
  const colsCount = CODES.Z - CODES.A + 1;
  const rows = [];

  rows.push(
    createRow(
      null,
      createCol(colsCount, state),
      {}
    ));

  for (let i = 0; i < rowsCount; i++) {
    rows.push(
      createRow(
        i + 1,
        createCol(colsCount, state, i),
        state.rowState
    ));
  }
  return rows.join('');
}
