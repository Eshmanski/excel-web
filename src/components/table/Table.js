import { $ } from '@core/dom';
import { ExcelComponent } from '@core/ExcelComponent';
import { shouldResize, isCell, matrix } from './table.functions';
import { resizeHandler } from './table.resize';
import { createTable } from './table.template';
import { TableSelection } from './TableSelection';

export class Table extends ExcelComponent {
  static className = 'excel__table';

  constructor($root) {
    super($root, {
      listeners: ['mousedown', 'keydown'],
    });
  }

  toHTML() {
    return createTable(100);
  }

  prepare() {
    this.selection = new TableSelection();
  }

  init() {
    super.init();

    const $cell = this.$root.find('[data-id="0:0"]');

    $cell.focus();

    this.selection.select($cell);
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      resizeHandler(this.$root, event);
    } else if (isCell(event)) {
      const $target = $(event.target);

      if (event.shiftKey) {
        const $cells = matrix($target, this.selection.current)
          .map((id) => this.$root
          .find(`[data-id="${id}"]`));

        this.selection.selectGroup($cells);
      } else {
        this.selection.select($target);
      }
    }
  }

  onKeydown(event) {
    const code = event.keyCode;

    const allowCodes = [37, 38, 39, 40, 13, 9];

    const isMoving = allowCodes.reduce((accum, current) => {
      return accum = accum || current === code;
    }, false);

    if (isMoving) {
      event.preventDefault();
      const id = $(event.target).id(true);
      const key = event.key;
      const delta = {row: 0, col: 0};

      switch (key) {
        case 'ArrowUp':
          delta.row = -1;
          break;
        case 'ArrowLeft':
          delta.col = -1;
          break;
        case 'Enter':
        case 'ArrowDown':
          delta.row = 1;
          break;
        case 'Tab':
        case 'ArrowRight':
          delta.col = 1;
          break;
      }

      const newIdRow = id.row + delta.row;
      const newIdCol = id.col + delta.col;

      if (newIdRow >= 0 && newIdCol >= 0) {
        const $cell = this.$root.find(`[data-id="${id.row + delta.row}:${id.col + delta.col}"]`);

        $cell.focus();

        this.selection.select($cell);
      } else {
        throw new Error('Cell is not exist');
      }
    }
  }
}
