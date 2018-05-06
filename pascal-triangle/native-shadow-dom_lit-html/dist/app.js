
import { repeat } from '../node_modules/lit-html/lib/repeat.js';

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

class PascalTriangle extends HTMLElement {
    constructor() {
        super();
        this._root = this.attachShadow({ mode: 'open' });
        this._length = _length;
        this._list = generateData(_length);

        this._handleLoad = e => this.handleLoad(e);
    }

    handleLoad(e) {
        this._length = parseInt(e.target.getAttribute('data-value'));       
        this._list = generateData(this._length);
        this._render();
    }

    render() {
        return html`
<div>
    <button data-value="10" on-click=${this._handleLoad}>Load 10</button>
    <button data-value="100" on-click=${this._handleLoad}>Load 100</button>
    <button data-value="500" on-click=${this._handleLoad}>Load 500</button>
</div>
<div>
    ${repeat(
        this._list,
        (line, index) => html`<div>
                ${repeat(
                    line,
                    (item, ind) => html`<triangle-item text="${item}"></triangle-item>`
                )}
        </div>`
    )}
</div>
    `;
    }

    connectedCallback() {
        this._render();
    }

    _render() {
        render(this.render(), this._root);
    }
}

window.customElements.define('pascal-triangle', PascalTriangle);