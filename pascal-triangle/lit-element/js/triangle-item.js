import { LitElement, html } from '../node_modules/lit-element/lit-element.js';

class TriangleItem extends LitElement {
    static get properties() {
        return {
            text: {
                type: String
            }
        };
    }

    constructor() {
        super();
        this.text = '';
    }

    render() {
        const {text} = this;
        return html`<span>${text}</span>`;
    }

    ready() {
        super.ready();
    }
}

window.customElements.define('triangle-item', TriangleItem);
