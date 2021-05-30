import { changeTitle } from '@/redux/actions';
import { $ } from '@core/dom';
import { ExcelComponent } from '@core/ExcelComponent';
import { ActiveRoute } from '@core/routes/ActiveRoute';
import { debounce, storageDeleteExcel } from '@core/utils';

export class Header extends ExcelComponent {
  static className = 'excel__header';

  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input', 'click'],
      ...options,
    });
  }

  prepare() {
    this.onInput = debounce(this.onInput, 300);
  }

  toHTML() {
    const title = this.store.getState().title;

    return `
    <input type="text" class="input" value="${title}"/>
    <div>
      <div class="button" data-type="delete">
        <i class="material-icons" data-type="delete">delete</i>
      </div>
      <div class="button" data-type="exit">
        <i class="material-icons" data-type="exit">exit_to_app</i> 
      </div>
    </div>
    `;
  }

  onInput(event) {
    const $target = $(event.target);

    this.$dispatch(changeTitle($target.text()));
  }

  onClick(event) {
    const type = $(event.target).data.type;

    switch (type) {
      case 'exit':
        window.location.hash = '#dasboard';
        break;
      case 'delete':
        storageDeleteExcel(ActiveRoute.param);
        window.location.hash = '#dasboard';
    }
  }
}
