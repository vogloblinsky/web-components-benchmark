import {
    PolymerElement, html
}
from '../node_modules/@polymer/polymer/polymer-element.js';

export class TriangleItem extends PolymerElement {
    static get is() {
        return 'triangle-item';
    }
    static get template() {
        return html`<span>{{text}}</span>`
    }
    static get properties() {
        return {
            text: {
                type: String,
                value: ''
            }
        }
    }

    ready() {
        super.ready();
    }
}

window.customElements.define(TriangleItem.is, TriangleItem);