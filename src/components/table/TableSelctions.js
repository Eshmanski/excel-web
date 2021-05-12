export default class TableSelections {
  constructor() {
    this.$cellsSelected = [];

    this.styleSelected = {
      border: 'none',
      outline: '2px solid #3c74ff',
      zIndex: '2',
    };

    this.styleClear = {
      border: '1px solid #e2e3e3',
      borderTop: 'none',
      borderLeft: 'none',
      outline: 'none',
      zIndex: '1',
    };
  }

  select($cell) {
    Object.keys(this.styleSelected).forEach((key) => $cell.style[key] = this.styleSelected[key]);

    this.$cellsSelected.push($cell);
  }

  selectGroup($cells) {
    $cells.forEach(($cell) => {
      this.select($cell);
    });
  }

  clear() {
    this.$cellsSelected.forEach(($cell) => {
      Object.keys(this.styleClear).forEach((key) => $cell.style[key] = this.styleClear[key]);
    });
  }
}
