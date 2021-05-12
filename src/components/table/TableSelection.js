export class TableSelection {
  static className = 'selected';

  constructor() {
    this.group = [];
  }

  select($el) {
      this.clear();

      this.group.push($el);

      $el.addClass(TableSelection.className);
  }

  clear() {
    this.group.forEach(($el) => $el.removeClass(TableSelection.className));

    this.group = [];
  }

  selectGroup($els) {
    this.clear();

    $els.forEach(($el) => {
      this.group.push($el);

      $el.addClass(TableSelection.className);
    });
  }

  getAll() {
    return this.group.slice(0);
  }

  getLast() {
    return this.group[this.group.length - 1];
  }
}
