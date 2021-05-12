import { $ } from '@core/dom';
import { getArrayOfIds } from './table.functions';

export function selectHandler(selection, event) {
  const target = $(event.target);
  const hasShift = event.shiftKey;
  const hasCtrl = event.ctrlKey;

  if (!hasShift && !hasCtrl) selection.select(target);
  else if (hasShift) {
    const firstEl = selection.getLast().data.id;
    const secondEl = target.data.id;

    const elIds = getArrayOfIds(firstEl, secondEl);

    const $els = elIds.slice(0).map((id) => {
      return $(document.querySelector(`[data-id="${id}"]`));
    });

    selection.selectGroup($els);
  } else if (hasCtrl) {
    const $els = selection.getAll();

    $els.push(target);

    selection.selectGroup($els);
  }
}
