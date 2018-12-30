import { withComponent } from 'skatejs';
import withLitHtml from '@skatejs/renderer-lit-html';
import { html } from 'lit-html';
import { repeat } from 'lit-html/directives/repeat.js';

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

export class PascalTriangle extends withComponent(withLitHtml()) {
    state = {
        list: generateData(_length)
    };
    render() {
        return html`
            <div>
                <button data-value="10" on-click=${this._handleLoad}>
                    Load 10
                </button>
                <button data-value="100" on-click=${this._handleLoad}>
                    Load 100
                </button>
                <button data-value="500" on-click=${this._handleLoad}>
                    Load 500
                </button>
            </div>
            <div>
                ${
                    repeat(
                        this.state.list,
                        (line, index) => html`
                            <div>
                                ${
                                    repeat(
                                        line,
                                        (item, ind) =>
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
    handleLoad(e) {
        let length = parseInt(e.target.getAttribute('data-value'));
        this.state.list = generateData(length);
    }
}
