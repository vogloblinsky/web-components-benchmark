import { LitElement, html } from '../node_modules/@polymer/lit-element/lit-element.js';

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

    static get properties() {
        return {
            text: String
        };
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
