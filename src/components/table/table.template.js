const CODES = {
  A: 65,
  Z: 90,
};

// function toCell(row, col) {
//   return `
//   <div contenteditable class="cell" data-row="${row}" data-col="${toChar(null, col)}">
//   </div>`;
// }

function toCell(row) {
  return function(_, col) {
    return `
    <div contenteditable class="cell" data-id="${row}:${col}" data-type="cell" data-col="${col}">
    </div>`;
  };
}

function toColumn(col, index) {
  return `
  <div class="column" data-type="resizable" data-col="${index}">
    ${col}
    <div class="col-resize"  data-resize="col"></div>
  </div>`;
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index);
}

function createCol(colsCount, row = null) {
  let col = new Array(colsCount).fill('');

  if (row === null) col = col.map(toChar).map(toColumn);
  else col = col.map(toCell(row));

  return col.join('');
}

function createRow(index, content) {
  const contentRows = index
    ? `${index}<div data-resize="row" class="row-resize"></div>`
    : '';

  return `
    <div class="row" ${index ? `data-row=${index-1} data-type="resizable"` : ''}>
      <div class="row-info">
        ${contentRows}
      </div>
      <div class="row-data">${content}</div> 
    </div>
  `;
}


export function createTable(rowsCount = 15) {
  const colsCount = CODES.Z - CODES.A + 1;
  const rows = [];

  rows.push(createRow(null, createCol(colsCount)));

  for (let i = 0; i < rowsCount; i++) {
    rows.push(createRow(i + 1, createCol(colsCount, i )));
  }

  return rows.join('');
}
