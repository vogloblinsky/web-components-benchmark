import { html, render } from '../node_modules/lit-html/lib/lit-extended.js';

class TriangleItem extends HTMLElement {
    constructor() {
        super();
        this._root = this.attachShadow({ mode: 'open' });
        this._text = '';
    }

    render() {
        return html`<span>${this._text}</span>`;
    }

    connectedCallback() {
        render(this.render(), this._root);
    }

    set text(val) {
        this._text = val;
    }

    get text() {
        return this._text;
    }
}

window.customElements.define('triangle-item', TriangleItem);
