// @jsx h

import Element, { h } from '@skatejs/element-preact';

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

export default class extends Element {
    constructor() {
        super();
        this.list = generateData(_length);
    }
    handleLoad = e => {
        let length = parseInt(e.target.getAttribute('data-value'));
        this.list = generateData(length);
    };
    render() {
        return (
            <div>
                <div>
                    <button data-value="10" onClick={this.handleLoad}>
                        Load 10
                    </button>
                    <button data-value="100" onClick={this.handleLoad}>
                        Load 100
                    </button>
                    <button data-value="500" onClick={this.handleLoad}>
                        Load 500
                    </button>
                </div>
                <div>
                    {this.list.map(line => (
                        <div>
                            {line.map(item => (
                                <triangle-item text={item} />
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}
