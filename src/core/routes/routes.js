import { $ } from '@core/dom';
// import { ActiveRoute } from './ActiveRoute';

export class Router {
    constructor(selector, routes) {
        if (!selector) {
            throw new Error('Selectoris not provided in Router');
        }

        this.$placeholder = $(selector);
        this.routes = routes;

        this.changePageHadler = this.changePageHadler.bind(this);

        this.init();
    }

    init() {
        window.addEventListener('hashchange', this.changePageHadler);

        this.changePageHadler();
    }

    changePageHadler(event) {
        const Page = this.routes.excel;
        const page = new Page();

        this.$placeholder.append(page.getRoot());

        page.afterRender();
    }

    destroy() {
        window.removeEventListener('hashchange', this.changePageHadler);
    }
}
