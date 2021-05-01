const CODES = {
  A: 65,
  Z: 90,
};

function toCell() {
  return `
  <div contenteditable class="cell">
  </div>`;
}

function toColumn(col) {
  return `
  <div class="column">
    ${col}
  </div>
  `;
}

function createCol(colsCount, options) {
  const col = new Array(colsCount).fill('');

  if (options.type === 'header') {
    return col.map(toChar).map(toColumn).join('');
  } else if (options.type === 'content') {
    return col.map(toCell).map(toColumn).join('');
  }
}

function createRow(index, content) {
  return `
    <div class="row">
      <div class="row-info">${index ? index : ''}</div>
      <div class="row-data">${content}</div> 
    </div>
  `;
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index);
}

export function createTable(rowsCount = 15) {
  const colsCount = CODES.Z - CODES.A + 1;
  const rows = [];

  rows.push(
    createRow(null, createCol(colsCount, { type: 'header' }))
  );

  for (let i = 0; i < rowsCount; i++) {
    rows.push(
      createRow(i + 1, createCol(colsCount, { type: 'content' }))
    );
  }
  return rows.join('');
}
