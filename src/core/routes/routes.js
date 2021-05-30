import { $ } from '@core/dom';
import { ActiveRoute } from './ActiveRoute';

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
        if (this.page) this.clearPage();

        const namePage = ActiveRoute.page;
        const Page = this.routes[namePage];

        this.page = new Page();

        this.$placeholder.append(this.page.getRoot());

        this.page.afterRender();
    }

    clearPage() {
        this.page.destroy();
        this.$placeholder.html('');
    }

    destroy() {
        window.removeEventListener('hashchange', this.changePageHadler);
    }
}
