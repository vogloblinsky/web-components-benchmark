import {
    PolymerElement, html
}
from '../node_modules/@polymer/polymer/polymer-element.js';
import '../node_modules/@polymer/polymer/lib/elements/dom-repeat.js';

let _length = 100;

function generateData(rows) {
    const n = rows;

    const data = [];
    data[0] = [1];
    data[1] = [1, 1];

    for (let row = 2; row < n; row++) {
        data[row] = [1];

        for (let col = 1; col <= row - 1; col++) {
            const prevRow = data[row - 1];
            data[row][col] = prevRow[col] + prevRow[col - 1];
            data[row].push(1);
        }
    }
    return data;
}

export class PascalTriangle extends PolymerElement {

    static get is() {
        return 'pascal-triangle';
    }

    static get template() {
        return html`
      <div>
        <button data-value="10" on-click="handleLoad">Load 10</button>
        <button data-value="100" on-click="handleLoad">Load 100</button>
        <button data-value="500" on-click="handleLoad">Load 500</button>
    </div>
        <template is="dom-repeat" items="{{list}}">
            <div>
                <template is="dom-repeat" items="{{item}}">
                    <triangle-item text="{{item}}"></triangle-item>
                </template>
            </div>
        </template>
      `
    }

    constructor() {
        super();
    }

    static get properties() {
        return {
            list: {
                type: Array,
                value: []
            },
            test: {
                type: String,
                value: 'yo'
            }
        }
    }

    handleLoad(e) {
        let length = parseInt(e.target.getAttribute('data-value'));
        this.set('list', generateData(length));
    }

    ready() {
        super.ready();
        this.set('list', generateData(_length));
    }
}

customElements.define(PascalTriangle.is, PascalTriangle);