import { $ } from '@core/dom';
import { ActiveRoute } from './ActiveRoute';

export class Router {
    constructor(selector, routes) {
        if (!selector) {
            throw new Error('Selectoris not provided in Router');
        }

        this.$placeholder = $(selector);
        this.routes = routes;
        this.page = null;

        this.changePageHadler = this.changePageHadler.bind(this);

        this.init();
    }

    init() {
        window.addEventListener('hashchange', this.changePageHadler);

        this.changePageHadler();
    }

    changePageHadler(event) {
        if (this.page) {
            this.page.destroy();
        }

        this.$placeholder.clear();

        const Page = ActiveRoute.path.includes('excel')
        ? this.routes.excel
        : this.routes.dashboard;

        this.page = new Page(ActiveRoute.param);

        this.$placeholder.append(this.page.getRoot());

        this.page.afterRender();
    }

    destroy() {
        window.removeEventListener('hashchange', this.changePageHadler);
    }
}
