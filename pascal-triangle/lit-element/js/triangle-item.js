import { LitElement, html } from '../node_modules/@polymer/lit-element/lit-element.js';

class TriangleItem extends LitElement {
    constructor() {
        super();
        this.text = '';
    }

    static get properties() {
        return {
            text: String
        };
    }

    _render() {
        return html`<span>${this.text}</span>`;
    }

    ready() {
        super.ready();
    }
}

window.customElements.define('triangle-item', TriangleItem);
