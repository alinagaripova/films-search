export class Data {
    constructor(url) {
        this.url = url;
    }

    get() {
        return fetch(`${this.url}`);
    }
}