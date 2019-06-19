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

import Element, {
    h
} from '@skatejs/element-lit-html';
export default class PascalTriangle extends Element {
    static get props() {
        return {
            list: Array
        };
    }
    constructor() {
        super();
        this.list = generateData(_length);
    }
    handleLoad(val) {
        this._length = parseInt(val);
        this.list = generateData(this._length);
    }
    render() {
        return h `
            <div>
                <button data-value="10" @click=${() => this.handleLoad(10)}>
                    Load 10
                </button>
                <button data-value="100" @click=${() => this.handleLoad(100)}>
                    Load 100
                </button>
                <button data-value="500" @click=${() => this.handleLoad(500)}>
                    Load 500
                </button>
            </div>
            <div>
                ${
                    this.list.map(
                        line =>
                            h`
                                <div>
                                    ${
                                        line.map(
                                            item =>
                                                h`
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