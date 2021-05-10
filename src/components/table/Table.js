import { ExcelComponent } from '@core/ExcelComponent';
import { createTable } from './table.template';

export class Table extends ExcelComponent {
  static className = 'excel__table';

  constructor($root) {
    super($root, {
      listeners: ['mousedown', 'mouseup', 'mouseleave'],
    });
  }

  toHTML() {
    return createTable(100);
  }

  onMousedown(event) {
    const data = event.target.dataset;

    if (data.resize) {
      const $el = event.target;
      let $elResize;
      let sizeName;
      let size;
      let startPoint;

      switch (data.resize) {
        case 'row':
          $elResize = $el.closest('.row');
          sizeName = 'height';
          size = parseInt(getComputedStyle($elResize)[sizeName]);
          startPoint = event.pageY;
          break;
        case 'col':
          $elResize = $el.closest('.column');
          sizeName = 'width';
          size = parseInt(getComputedStyle($elResize)[sizeName]);
          startPoint = event.pageX;
          break;
      }

      this.addDOMListener(
        'mousemove',
        { $elResize, sizeName, size, startPoint }
      );
    }
  }

  onMouseup(event) {
    this.removeDOMListener('mousemove');
  }

  onMouseleave(event) {
    this.removeDOMListener('mousemove');
  }

  onMousemove(resizeData, event) {
    console.log('1');
    const { $elResize, sizeName, size, startPoint } = resizeData;

    const endPoint = sizeName === 'height'
      ? event.pageY
      : event.pageX;

    $elResize.style[sizeName] = String((endPoint - startPoint) + size) + 'px';

    console.log( String((endPoint - startPoint) + size) + 'px');
  }
}

// function resizeRow(event, $el, startY) {
//   const height = 24;
//   const delta = event.pageY - startY;

//   $el.style.height = (height + delta) + 'px';
// }
