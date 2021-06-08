export class Page {
    constructor(params) {
        this.id = params[0];
        this.preset = params[1] || 'new';
    }

    getRoot() {
        throw new Error('Method "getRoot" should be implemented');
    }

    afterRender() {}

    destroy() {}
}
