import { ExcelComponent } from '@core/ExcelComponent';
import { shouldResize } from './table.functions';
import { resizeHandler } from './table.resize';
import { createTable } from './table.template';
import TableSelections from './TableSelctions';

export class Table extends ExcelComponent {
  static className = 'excel__table';

  constructor($root) {
    super($root, {
      listeners: ['mousedown', 'click'],
    });

    this.selectedCells = new TableSelections();
  }

  toHTML() {
    return createTable(100);
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      resizeHandler(this.$root, event);
    }
  }

  onClick(event) {
    this.selectedCells.clear();

    this.selectedCells.select(event.target);
  }
}
