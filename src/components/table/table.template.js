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
    <div data-resize="col" class="col-resize"></div>
  </div>`;
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index);
}

function createCol(colsCount, options) {
  let col = new Array(colsCount).fill('');

  switch (options.type) {
    case 'header':
      col = col.map(toChar).map(toColumn);
      break;
    case 'content':
      col = col.map(toCell);
      break;
  }

  return col.join('');
}

function createRow(index, content) {
  const resize = index
    ? '<div data-resize="row" class="row-resize"></div>'
    : '';

  return `
    <div class="row">
      <div class="row-info">
        ${index ? index : ''}
        ${resize}
      </div>
      <div class="row-data">${content}</div> 
    </div>
  `;
}


export function createTable(rowsCount = 15) {
  const colsCount = CODES.Z - CODES.A + 1;
  const rows = [];

  rows.push(createRow(null, createCol(colsCount, { type: 'header' })));

  for (let i = 0; i < rowsCount; i++) {
    rows.push(createRow(i + 1, createCol(colsCount, { type: 'content' })));
  }
  return rows.join('');
}
