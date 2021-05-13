import { $ } from '@core/dom';
import { ExcelComponent } from '@core/ExcelComponent';

export class Formula extends ExcelComponent {
  static className = 'excel__formula';

  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'keydown', 'click'],
      ...options,
    });
  }

  toHTML() {
    return `
    <div class="info">fx</div>
    <div class="input" data-type="input" contenteditable spellcheck="false"></div>`;
  }

  onInput(event) {
    const text = event.target.textContent.trim();

    this.$emit('formula:input', text);
  }

  onKeydown(event) {
    const { key }= event;

    if (key === 'Enter') {
      event.preventDefault();

      this.$emit('formula:enter');

      event.target.textContent = '';
    }
  }

  onClick(event) {
    const $target = $(event.target);

    if ($target.data.type === 'input') {
      event.preventDefault();

      this.$emit('formula:focus', $target);

      $target.focus();
    }
  }
}
