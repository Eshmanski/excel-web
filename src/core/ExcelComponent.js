import { DomListener } from '@core/DomListener';

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners);

    this.name = options.name || '';

    this.emitter = options.emitter;

    this.unsubscribers = [];

    this.prepare();
  }

  // Настраиваем наш компонент до init
  prepare() {

  }

  // Возвращает шаблон компонента
  toHTML() {
    return '';
  }

  // Facade pattern
  // Уведомляем слушателей про событие event
  $emit(event, ...args) {
    this.emitter.emit(event, ...args);
  }

  // Подписываемся на события
  $on(event, fn) {
    const unsub = this.emitter.subscribe(event, fn);

    this.unsubscribers.push(unsub);
  }

  // Инициализируем компонент
  // добавляем DOM слушателей
  init() {
    this.initDOMListeners();
  }

  // Удаляем компонент
  // Чистим слушателеи
  destroy() {
    this.removeDOMListeners();

    this.unsubscribers.forEach((unsub) => unsub());
  }
}
