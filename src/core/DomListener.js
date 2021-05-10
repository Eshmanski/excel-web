import { capitalize } from '@core/utils';

export class DomListener {
  constructor($root, listeners = []) {
    if (!$root) {
      throw new Error(`No $root porvided for DomListener`);
    }
    this.$root = $root;

    this.listeners = listeners;
  }

  initDOMListeners() {
    this.listeners.forEach((listener) => {
      const method = getMethodName(listener);

      if (!this[method]) {
        throw new Error(
          `Method ${method} is not declared in ${this.name} component`
        );
      }

      this.$root.on(listener, this[method].bind(this));
    });
  }

  removeDOMListenersAll() {
    this.listeners.forEach((listener) => {
      const method = getMethodName(listener);

      this.$root.off(listener, this[method]);
    });
  }

  addDOMListener(listener, ...arg) {
    const method = getMethodName(listener);

    if (!this[method]) {
      throw new Error(
        `Method ${method} is not declared in ${this.name} component`
      );
    }

    this.$root.on(listener, this[method].bind(this, ...arg));
  }

  removeDOMListener(listener) {
    this.$root.off(listener);
  }
}

function getMethodName(eventName) {
  return 'on' + capitalize(eventName);
}
