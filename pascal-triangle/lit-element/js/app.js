import {
    LitElement,
    html
} from '../node_modules/@polymer/lit-element/lit-element.js';
import { repeat } from '../node_modules/lit-html/directives/repeat.js';

import './triangle-item.js';

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

class PascalTriangle extends LitElement {
    static get properties() {
        return {
            list: { 
                type: Array 
            }
        };
    }

    constructor() {
        super();
        this._length = _length;
        this.list = generateData(_length);

        this._handleLoad = e => this.handleLoad(e);
    }

    ready() {
        super.ready();
    }

    handleLoad(e) {
        this._length = parseInt(e.target.getAttribute('data-value'));
        this.list = generateData(this._length);
    }

    render() {
        return html`
            <div>
                <button data-value="10" on-click="${this._handleLoad}">
                    Load 10
                </button>
                <button data-value="100" on-click="${this._handleLoad}">
                    Load 100
                </button>
                <button data-value="500" on-click="${this._handleLoad}">
                    Load 500
                </button>
            </div>
            <div>
                ${
                    this.list.map(
                        line =>
                            html`
                                <div>
                                    ${
                                        line.map(
                                            item =>
                                                html`
                                                    <triangle-item
                                                        text="${item}"
                                                    ></triangle-item>
                                                `
                                        )
                                    }
                                </div>
                            `
                    )
                }
            </div>
        `;
    }
}

window.customElements.define('pascal-triangle', PascalTriangle);
