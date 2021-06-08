const { Page } = require('../page/Page');
const { Router } = require('./Routes');

class DashboardPage extends Page {
    getRoot() {
        const root = document.createElement('div');
        root.innerHTML = 'dashboard';
        return root;
    }
}
class ExcelPage extends Page {}

describe('Router: ', () => {
    let router;
    let $root;

    beforeEach(() => {
        $root = document.createElement('div');
        router = new Router($root, {
            dashboard: DashboardPage,
            excel: ExcelPage,
        });
    });

    test('should be defined', () => {
        expect(router).toBeDefined();
    });

    test('should render Dashboard Page', async () => {
        await router.changePageHandler();

        const html = $root.innerHTML;

        expect(html).toBe('<div>dashboard</div>');
    });
});
