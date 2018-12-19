import { html, define } from 'hybrids';

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

const handleLoad = (host, e) => {
    host._length = parseInt(e.target.getAttribute('data-value'));
    host.list = generateData(host._length);
};

const PascalTriangle = {
    list: generateData(_length),
    _length: _length,
    render: ({ list }) => html`
        <div>
            <button data-value="10" onclick="${handleLoad}">Load 10</button>
            <button data-value="100" onclick="${handleLoad}">Load 100</button>
            <button data-value="500" onclick="${handleLoad}">Load 500</button>
        </div>
        <div>
            ${
                list.map(
                    line =>
                        html`
                            <div>
                                ${
                                    line.map(item =>
                                        html`<triangle-item text="${item}"></triangle-item>`.key(item)
                                    )
                                }
                            </div>
                        `
                )
            }
        </div>
    `
};

define('pascal-triangle', PascalTriangle);
